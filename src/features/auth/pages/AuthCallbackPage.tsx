import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { buttonStyles } from '@/design-system';
import { apiErrorCode } from '@/shared/api/client';
import { FullPageSpinner } from '@/shared/components/FullPageSpinner';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import {
  loginWithProvider,
  setAccessToken,
  useStartSession,
  type Session,
} from '../api';
import { AuthLayout } from '../components/AuthLayout';
import { RestoreAccount } from '../components/RestoreAccount';
import { authPath, safeNext } from '../redirect';
import {
  clearPendingSocialLogin,
  isProvider,
  readPendingSocialLogin,
} from '../social';

/** 로그인하지 못한 이유. 서버가 알려 준 이유가 없으면 generic이에요. */
type Failure =
  | 'generic'
  | 'email-in-use'
  | 'email-not-verified'
  | 'email-required';

const FAILURE_BY_CODE: Record<string, Failure> = {
  // 같은 이메일로 가입한 계정이 있어요. 서버는 이메일만 보고 계정을 잇지 않아요.
  EMAIL_IN_USE: 'email-in-use',
  // 소셜 서비스가 이메일을 인증하지 않았다고 알려 줬어요.
  EMAIL_NOT_VERIFIED: 'email-not-verified',
  // 이메일 제공에 동의하지 않았어요.
  EMAIL_REQUIRED: 'email-required',
};

const failureKeys = (failure: Failure) =>
  failure === 'generic'
    ? {
        title: 'page.auth.callback.failed-title',
        description: 'page.auth.callback.failed-description',
      }
    : {
        title: `page.auth.callback.${failure}-title`,
        description: `page.auth.callback.${failure}-description`,
      };

/**
 * 소셜 로그인에서 돌아오는 곳 (/auth/:provider?code=…&state=…).
 * 떠날 때 남겨 둔 state와 같은지 확인한 뒤 서버에 code를 넘겨 로그인해요.
 * 처음 온 사람은 약관 동의 화면(/register/social)에서 가입을 마쳐요.
 */
function AuthCallbackPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { provider } = useParams();
  const [params] = useSearchParams();
  const startSession = useStartSession();
  const [pending] = useState(readPendingSocialLogin);
  const next = safeNext(pending?.next);
  const [failure, setFailure] = useState<Failure | null>(null);
  const [deleted, setDeleted] = useState<Session | null>(null);
  const started = useRef(false);

  useDocumentTitle(
    t(failure ? failureKeys(failure).title : 'page.auth.callback.loading')
  );

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const code = params.get('code');
    const state = params.get('state') ?? '';
    const valid =
      isProvider(provider) &&
      code &&
      !params.get('error') &&
      pending?.provider === provider &&
      pending.state === state;
    clearPendingSocialLogin();

    if (!valid) {
      setFailure('generic');
      return;
    }

    loginWithProvider(provider, code, state)
      .then((result) => {
        if (result.kind === 'signup') {
          navigate('/register/social', {
            replace: true,
            state: { signup: result.signup, next },
          });
          return;
        }
        const { session } = result;
        if (session.user.is_deleted) {
          setAccessToken(session.token);
          setDeleted(session);
          return;
        }
        startSession(session);
        navigate(next, { replace: true });
      })
      .catch((error: unknown) =>
        setFailure(FAILURE_BY_CODE[apiErrorCode(error) ?? ''] ?? 'generic')
      );
  }, [navigate, next, params, pending, provider, startSession]);

  if (deleted) {
    return (
      <RestoreAccount
        session={deleted}
        next={next}
        onCancel={() => navigate(authPath('login', next), { replace: true })}
      />
    );
  }

  if (failure) {
    const keys = failureKeys(failure);
    return (
      <AuthLayout title={t(keys.title)} subtitle={t(keys.description)}>
        <Link
          to={authPath('login', next)}
          className={buttonStyles({ size: 'lg', fullWidth: true })}
        >
          {t('page.auth.callback.back')}
        </Link>
      </AuthLayout>
    );
  }

  return <FullPageSpinner label={t('page.auth.callback.loading')} showLabel />;
}

export default AuthCallbackPage;
