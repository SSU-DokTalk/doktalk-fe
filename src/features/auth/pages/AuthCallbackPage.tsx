import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { buttonStyles } from '@/design-system';
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

type Status = 'loading' | 'failed';

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
  const [status, setStatus] = useState<Status>('loading');
  const [deleted, setDeleted] = useState<Session | null>(null);
  const started = useRef(false);

  useDocumentTitle(
    t(
      status === 'failed'
        ? 'page.auth.callback.failed-title'
        : 'page.auth.callback.loading'
    )
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
      setStatus('failed');
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
      .catch(() => setStatus('failed'));
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

  if (status === 'failed') {
    return (
      <AuthLayout
        title={t('page.auth.callback.failed-title')}
        subtitle={t('page.auth.callback.failed-description')}
      >
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
