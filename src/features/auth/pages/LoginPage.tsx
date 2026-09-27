import { CircleAlert, CircleCheck } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Button, TextField } from '@/design-system';
import { httpStatus } from '@/shared/api/client';
import { focusFirstInvalid } from '@/shared/draft';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import {
  loginWithEmail,
  setAccessToken,
  useStartSession,
  type Session,
} from '../api';
import { AuthLayout } from '../components/AuthLayout';
import * as layout from '../components/AuthLayout.css';
import * as s from '../components/AuthForm.css';
import { PasswordField } from '../components/PasswordField';
import { RestoreAccount } from '../components/RestoreAccount';
import { SocialButtons, hasSocialLogin } from '../components/SocialButtons';
import { authPath, safeNext } from '../redirect';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { email?: string; password?: string };

/** 회원가입 직후에는 가입한 이메일을 채워서 보여줘요 (주소에는 넣지 않아요). */
type LoginState = { email?: string; signedUp?: boolean } | null;

/** 로그인 (/login?next=/돌아갈/주소) */
function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const state = location.state as LoginState;
  const { isLoggedIn } = useAuth();
  const startSession = useStartSession();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState(state?.email ?? '');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [deleted, setDeleted] = useState<Session | null>(null);

  useDocumentTitle(t('page.auth.login.title'));

  if (deleted) {
    return (
      <RestoreAccount
        session={deleted}
        next={next}
        onCancel={() => {
          setDeleted(null);
          setPassword('');
        }}
      />
    );
  }

  if (isLoggedIn) return <Navigate to={next} replace />;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    const nextErrors: Errors = {};
    if (!trimmed) nextErrors.email = t('page.auth.field.email-required');
    else if (!EMAIL_PATTERN.test(trimmed)) {
      nextErrors.email = t('page.auth.field.email-invalid');
    }
    if (!password) nextErrors.password = t('page.auth.field.password-required');
    setErrors(nextErrors);
    setFormError(null);
    if (nextErrors.email || nextErrors.password) {
      focusFirstInvalid(formRef.current);
      return;
    }

    setPending(true);
    try {
      const session = await loginWithEmail(trimmed, password);
      if (session.user.is_deleted) {
        // 복구 요청에 토큰이 필요해서 헤더만 먼저 넣어 둬요.
        setAccessToken(session.token);
        setDeleted(session);
        return;
      }
      startSession(session);
      navigate(next, { replace: true });
    } catch (error) {
      const status = httpStatus(error);
      // 없는 이메일(404)·틀린 비밀번호(400)·형식 오류(422)는 같은 문구로 알려요.
      setFormError(
        t(
          status === 400 || status === 404 || status === 422
            ? 'page.auth.login.invalid'
            : 'page.auth.login.failed'
        )
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthLayout
      title={t('page.auth.login.title')}
      subtitle={t('page.auth.login.subtitle')}
    >
      {state?.signedUp && (
        <p role='status' className={s.notice}>
          <CircleCheck aria-hidden='true' className={s.alertIcon} />
          {t('page.auth.login.signed-up')}
        </p>
      )}
      <form
        ref={formRef}
        noValidate
        className={s.form}
        onSubmit={(event) => void handleSubmit(event)}
      >
        <TextField
          label={t('page.login.email')}
          type='email'
          size='lg'
          autoComplete='email'
          inputMode='email'
          autoCapitalize='off'
          placeholder={t('page.auth.field.email-placeholder')}
          value={email}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordField
          label={t('page.login.password')}
          size='lg'
          autoComplete='current-password'
          placeholder={t('page.auth.field.password-placeholder')}
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {formError && (
          <p role='alert' className={s.alert}>
            <CircleAlert aria-hidden='true' className={s.alertIcon} />
            {formError}
          </p>
        )}
        <Button type='submit' size='lg' fullWidth loading={pending}>
          {t('page.login.login')}
        </Button>
      </form>

      {hasSocialLogin && (
        <>
          <p className={layout.divider}>{t('page.auth.social.login-title')}</p>
          <SocialButtons mode='login' next={next} centered />
        </>
      )}

      <p className={layout.switchText}>
        {t('page.auth.login.no-account')}{' '}
        <Link to={authPath('register', next)} className={layout.switchLink}>
          {t('page.login.register')}
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
