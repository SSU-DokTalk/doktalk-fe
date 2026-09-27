import { useQueryClient } from '@tanstack/react-query';
import { CircleAlert } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/design-system';
import { userKeys, useMe } from '@/features/user/api';
import { FullPageSpinner } from '@/shared/components/FullPageSpinner';
import { focusFirstInvalid } from '@/shared/draft';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import { agreeToTerms } from '../api';
import { AgreementsFields } from '../components/AgreementsFields';
import { AuthLayout } from '../components/AuthLayout';
import * as form from '../components/AuthForm.css';
import { authPath, safeNext } from '../redirect';
import {
  hasRequiredAgreements,
  NO_AGREEMENTS,
  type Agreements,
} from '../signup';

/**
 * 약관 동의 (/agreements?next=…). 동의 기록 없이 가입한 예전 회원이 로그인하면 이 화면부터 거쳐요.
 * 동의하지 않으면 로그아웃할 수 있어요.
 */
function AgreementsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const queryClient = useQueryClient();
  const { user, isLoggedIn, logout } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const me = useMe(viewerId);
  const formRef = useRef<HTMLFormElement>(null);
  const [agreed, setAgreed] = useState<Agreements>(NO_AGREEMENTS);
  const [agreementError, setAgreementError] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);

  useDocumentTitle(t('page.auth.consent.title'));

  if (!isLoggedIn) return <Navigate to={authPath('login', next)} replace />;
  if (me.isPending) return <FullPageSpinner />;
  if (me.data && !me.data.needs_agreements) {
    return <Navigate to={next} replace />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const ok = hasRequiredAgreements(agreed);
    setAgreementError(ok ? null : t('page.auth.register.agreements-required'));
    setFailed(false);
    if (!ok) {
      focusFirstInvalid(formRef.current);
      return;
    }
    setPending(true);
    try {
      const updated = await agreeToTerms(agreed);
      queryClient.setQueryData(userKeys.me(viewerId), updated);
      navigate(next, { replace: true });
    } catch {
      setPending(false);
      setFailed(true);
    }
  };

  return (
    <AuthLayout
      width='wide'
      title={t('page.auth.consent.title')}
      subtitle={t('page.auth.consent.subtitle')}
    >
      <form
        ref={formRef}
        noValidate
        className={`${form.form} ${form.wideForm}`}
        onSubmit={(event) => void handleSubmit(event)}
      >
        <AgreementsFields
          value={agreed}
          onChange={setAgreed}
          error={agreementError ?? undefined}
        />
        {failed && (
          <p role='alert' className={form.alert}>
            <CircleAlert aria-hidden='true' className={form.alertIcon} />
            {t('page.auth.consent.failed')}
          </p>
        )}
        <Button type='submit' size='lg' fullWidth loading={pending}>
          {t('page.auth.consent.submit')}
        </Button>
        <Button
          type='button'
          variant='neutral'
          size='lg'
          fullWidth
          onClick={logout}
        >
          {t('page.auth.consent.decline')}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default AgreementsPage;
