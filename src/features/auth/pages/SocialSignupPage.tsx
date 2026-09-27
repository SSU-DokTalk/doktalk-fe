import { CircleAlert } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, buttonStyles } from '@/design-system';
import { apiErrorCode, httpStatus } from '@/shared/api/client';
import { focusFirstInvalid } from '@/shared/draft';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import {
  completeSocialSignup,
  useStartSession,
  type SocialSignup,
} from '../api';
import { AgreementsFields } from '../components/AgreementsFields';
import { AuthLayout } from '../components/AuthLayout';
import * as form from '../components/AuthForm.css';
import { ProfileExtrasFields } from '../components/ProfileExtrasFields';
import { authPath, safeNext } from '../redirect';
import {
  checkBirthdate,
  EMPTY_EXTRAS,
  hasRequiredAgreements,
  NO_AGREEMENTS,
  type Agreements,
  type BirthdateError,
  type ProfileExtras,
} from '../signup';

/** 가입을 마치지 못한 이유. restart면 소셜 로그인부터 다시 해야 해요. */
type Failure = { message: string; restart: boolean };

/**
 * 소셜 로그인으로 처음 온 사람의 가입 마무리 (/register/social).
 * 콜백 화면이 가입 토큰을 넘겨줘요. 약관에 동의해야 서버가 계정을 만들어요.
 */
function SocialSignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const startSession = useStartSession();
  const formRef = useRef<HTMLFormElement>(null);
  const state = location.state as {
    signup?: SocialSignup;
    next?: string;
  } | null;
  const signup = state?.signup;
  const next = safeNext(state?.next);
  const [agreed, setAgreed] = useState<Agreements>(NO_AGREEMENTS);
  const [extras, setExtras] = useState<ProfileExtras>(EMPTY_EXTRAS);
  const [agreementError, setAgreementError] = useState<string | null>(null);
  const [birthdateError, setBirthdateError] = useState<BirthdateError | null>(
    null
  );
  const [failure, setFailure] = useState<Failure | null>(null);
  const [pending, setPending] = useState(false);

  useDocumentTitle(t('page.auth.social-signup.title'));

  if (isLoggedIn) return <Navigate to={next} replace />;

  if (!signup) {
    return (
      <AuthLayout
        title={t('page.auth.social-signup.missing-title')}
        subtitle={t('page.auth.social-signup.missing-description')}
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

  const failureFor = (error: unknown): Failure => {
    const status = httpStatus(error);
    const code = apiErrorCode(error);
    if (status === 401) {
      return { message: t('page.auth.social-signup.expired'), restart: true };
    }
    if (code === 'EMAIL_TAKEN') {
      return {
        message: t('page.auth.social-signup.email-taken'),
        restart: true,
      };
    }
    if (code === 'ALREADY_REGISTERED') {
      return {
        message: t('page.auth.social-signup.already-registered'),
        restart: true,
      };
    }
    return { message: t('page.auth.social-signup.failed'), restart: false };
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextBirthdateError = checkBirthdate(extras.birthdate);
    const agreementsOk = hasRequiredAgreements(agreed);
    setBirthdateError(nextBirthdateError);
    setAgreementError(
      agreementsOk ? null : t('page.auth.register.agreements-required')
    );
    setFailure(null);
    if (nextBirthdateError || !agreementsOk) {
      focusFirstInvalid(formRef.current);
      return;
    }

    setPending(true);
    try {
      const session = await completeSocialSignup({
        token: signup.token,
        agreements: agreed,
        extras,
      });
      startSession(session);
      navigate(next, { replace: true });
    } catch (error) {
      setPending(false);
      setFailure(failureFor(error));
    }
  };

  return (
    <AuthLayout
      width='wide'
      title={t('page.auth.social-signup.title')}
      subtitle={
        signup.email
          ? t('page.auth.social-signup.subtitle', { email: signup.email })
          : t('page.auth.social-signup.subtitle-no-email')
      }
    >
      <form
        ref={formRef}
        noValidate
        className={`${form.form} ${form.wideForm}`}
        onSubmit={(event) => void handleSubmit(event)}
      >
        <ProfileExtrasFields
          value={extras}
          onChange={setExtras}
          birthdateError={birthdateError}
        />
        <AgreementsFields
          value={agreed}
          onChange={setAgreed}
          error={agreementError ?? undefined}
        />

        {failure && (
          <p role='alert' className={form.alert}>
            <CircleAlert aria-hidden='true' className={form.alertIcon} />
            {failure.message}
          </p>
        )}
        {failure?.restart ? (
          <Link
            to={authPath('login', next)}
            replace
            className={buttonStyles({ size: 'lg', fullWidth: true })}
          >
            {t('page.auth.callback.back')}
          </Link>
        ) : (
          <Button type='submit' size='lg' fullWidth loading={pending}>
            {t('page.auth.social-signup.submit')}
          </Button>
        )}
      </form>
    </AuthLayout>
  );
}

export default SocialSignupPage;
