import { Check, CircleAlert, Dot } from 'lucide-react';
import { useId, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Checkbox, TextField, visuallyHidden } from '@/design-system';
import { NAME_MAX } from '@/features/user/api';
import { httpStatus } from '@/shared/api/client';
import { focusFirstInvalid } from '@/shared/draft';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import { loginWithEmail, registerWithEmail, useStartSession } from '../api';
import { AuthLayout } from '../components/AuthLayout';
import * as layout from '../components/AuthLayout.css';
import * as form from '../components/AuthForm.css';
import { PasswordField } from '../components/PasswordField';
import { SocialButtons, hasSocialLogin } from '../components/SocialButtons';
import { authPath, safeNext } from '../redirect';
import * as s from './RegisterPage.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPECIAL_CHARACTERS = '!@#$%^*+=&';

/** 서버의 비밀번호 규칙과 같아요 (8~30자, 영문·숫자·특수문자 하나 이상). */
const PASSWORD_RULES = [
  {
    key: 'length',
    test: (value: string) => value.length >= 8 && value.length <= 30,
  },
  { key: 'letter', test: (value: string) => /[A-Za-z]/.test(value) },
  { key: 'digit', test: (value: string) => /\d/.test(value) },
  { key: 'special', test: (value: string) => /[!@#$%^*+=&]/.test(value) },
] as const;

type Values = {
  email: string;
  name: string;
  password: string;
  confirm: string;
};
type Errors = Partial<Record<keyof Values | 'agreements', string>>;

/**
 * 회원가입 (/register?next=…).
 * 서버가 저장하는 이메일·닉네임·비밀번호만 받아요. 기존 화면의 생년월일·성별·관심분야·본인인증은
 * 서버에 저장되지 않거나(성별은 형식이 달라 가입이 실패했어요) 실제 인증이 없어서 뺐어요.
 */
function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const { isLoggedIn } = useAuth();
  const startSession = useStartSession();
  const rulesId = useId();
  const agreementErrorId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({
    email: '',
    name: '',
    password: '',
    confirm: '',
  });
  const [agreed, setAgreed] = useState({ terms: false, privacy: false });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useDocumentTitle(t('page.auth.register.title'));

  if (isLoggedIn) return <Navigate to={next} replace />;

  const set = (key: keyof Values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  const validate = (): Errors => {
    const next: Errors = {};
    const email = values.email.trim();
    const name = values.name.trim();
    if (!email) next.email = t('page.auth.field.email-required');
    else if (!EMAIL_PATTERN.test(email)) {
      next.email = t('page.auth.field.email-invalid');
    }
    if (!name) next.name = t('page.auth.register.nickname-required');
    else if (name.length > NAME_MAX) {
      next.name = t('page.profile.edit.name-too-long', { max: NAME_MAX });
    }
    if (!values.password) {
      next.password = t('page.auth.field.password-required');
    } else if (!PASSWORD_RULES.every((rule) => rule.test(values.password))) {
      next.password = t('page.auth.register.password-invalid');
    }
    if (!values.confirm) {
      next.confirm = t('page.auth.register.password-confirm-required');
    } else if (values.confirm !== values.password) {
      next.confirm = t('page.auth.register.password-mismatch');
    }
    if (!agreed.terms || !agreed.privacy) {
      next.agreements = t('page.auth.register.agreements-required');
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(formRef.current);
      return;
    }

    const email = values.email.trim();
    setPending(true);
    try {
      await registerWithEmail({
        email,
        password: values.password,
        name: values.name.trim(),
      });
    } catch (error) {
      setPending(false);
      if (httpStatus(error) === 409) {
        setErrors({ email: t('page.auth.register.email-taken') });
        focusFirstInvalid(formRef.current);
      } else {
        setFormError(t('page.auth.register.failed'));
      }
      return;
    }

    // 가입하면 바로 로그인해요. 로그인만 실패하면 로그인 화면에서 이어서 해요.
    try {
      startSession(await loginWithEmail(email, values.password));
      navigate(next, { replace: true });
    } catch {
      navigate(authPath('login', next), {
        replace: true,
        state: { email, signedUp: true },
      });
    }
  };

  const allAgreed = agreed.terms && agreed.privacy;

  return (
    <AuthLayout
      width='wide'
      title={t('page.auth.register.title')}
      subtitle={t('page.register.welcome')}
    >
      {hasSocialLogin && (
        <>
          <div className={s.social}>
            <p className={s.socialTitle}>{t('page.auth.social.start-title')}</p>
            <SocialButtons mode='start' next={next} />
          </div>
          <p className={layout.divider}>
            {t('page.auth.register.email-divider')}
          </p>
        </>
      )}

      <form
        ref={formRef}
        noValidate
        className={`${form.form} ${form.wideForm}`}
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
          value={values.email}
          error={errors.email}
          onChange={set('email')}
        />
        <TextField
          label={t('page.register.form.nickname')}
          size='lg'
          autoComplete='nickname'
          maxLength={NAME_MAX}
          placeholder={t('page.auth.register.nickname-placeholder')}
          value={values.name}
          error={errors.name}
          onChange={set('name')}
        />
        <div className={s.passwordGroup}>
          <PasswordField
            label={t('page.login.password')}
            size='lg'
            autoComplete='new-password'
            maxLength={30}
            placeholder={t('page.auth.field.password-placeholder')}
            value={values.password}
            error={errors.password}
            aria-describedby={rulesId}
            onChange={set('password')}
          />
          <ul
            id={rulesId}
            aria-label={t('page.auth.register.password-rules')}
            className={s.rules}
          >
            {PASSWORD_RULES.map((rule) => {
              const met = rule.test(values.password);
              return (
                <li
                  key={rule.key}
                  className={`${s.rule} ${met ? s.ruleMet : ''}`}
                >
                  {met ? (
                    <Check aria-hidden='true' className={s.ruleIcon} />
                  ) : (
                    <Dot aria-hidden='true' className={s.ruleIcon} />
                  )}
                  {t(`page.auth.register.rule.${rule.key}`, {
                    chars: SPECIAL_CHARACTERS,
                  })}
                  <span className={visuallyHidden}>
                    {' '}
                    {t(
                      met
                        ? 'page.auth.register.rule.met'
                        : 'page.auth.register.rule.unmet'
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <PasswordField
          label={t('page.register.form.password-confirm')}
          size='lg'
          autoComplete='new-password'
          maxLength={30}
          placeholder={t('page.auth.register.password-confirm-placeholder')}
          value={values.confirm}
          error={errors.confirm}
          onChange={set('confirm')}
        />

        <fieldset className={s.agreements}>
          <legend className={visuallyHidden}>
            {t('page.auth.register.agreements')}
          </legend>
          <div className={s.agreeAll}>
            <Checkbox
              label={
                <span className={s.agreeAllLabel}>
                  {t('page.register.form.all-agreements')}
                </span>
              }
              checked={allAgreed}
              onChange={(event) =>
                setAgreed({
                  terms: event.target.checked,
                  privacy: event.target.checked,
                })
              }
            />
          </div>
          {(['terms', 'privacy'] as const).map((key) => (
            <div key={key} className={s.agreement}>
              <Checkbox
                label={
                  <span className={s.agreementLabel}>
                    <span className={s.requiredTag}>
                      {t('page.auth.register.required-tag')}
                    </span>{' '}
                    {t(`page.auth.register.${key}`)}
                  </span>
                }
                checked={agreed[key]}
                aria-invalid={
                  errors.agreements && !agreed[key] ? true : undefined
                }
                aria-describedby={
                  errors.agreements && !agreed[key]
                    ? agreementErrorId
                    : undefined
                }
                onChange={(event) =>
                  setAgreed((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
              />
              <Link
                to={key === 'terms' ? '/terms' : '/privacy'}
                target='_blank'
                className={s.viewLink}
              >
                <span aria-hidden='true'>{t('page.register.form.view')}</span>
                <span className={visuallyHidden}>
                  {t(`page.auth.register.view-${key}`)}
                </span>
              </Link>
            </div>
          ))}
          {errors.agreements && (
            <p id={agreementErrorId} className={s.agreementError}>
              {errors.agreements}
            </p>
          )}
        </fieldset>

        {formError && (
          <p role='alert' className={form.alert}>
            <CircleAlert aria-hidden='true' className={form.alertIcon} />
            {formError}
          </p>
        )}
        <Button type='submit' size='lg' fullWidth loading={pending}>
          {t('page.auth.register.submit')}
        </Button>
      </form>

      <p className={layout.switchText}>
        {t('page.auth.register.has-account')}{' '}
        <Link to={authPath('login', next)} className={layout.switchLink}>
          {t('page.auth.login.title')}
        </Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
