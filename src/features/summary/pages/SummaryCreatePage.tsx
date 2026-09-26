import { ChevronLeft, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button, buttonStyles } from '@/design-system';
import { notice as noticeStyle } from '@/shared/components/Form.css';
import * as s from '@/shared/components/FormPage.css';
import { PageState } from '@/shared/components/PageState';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import { SummaryUploadError, useCreateSummary } from '../api';
import { SummaryForm } from '../components/SummaryForm';
import {
  clearSummaryDraft,
  EMPTY_SUMMARY_FORM,
  loadSummaryDraft,
  saveSummaryDraft,
  summaryFormToRequest,
  type SummaryFormValues,
} from '../form';
import { useAuthHref } from '@/features/auth/redirect';

/** 요약 쓰기 (/summary/create) */
function SummaryCreatePage() {
  const { t } = useTranslation();
  const loginHref = useAuthHref();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const create = useCreateSummary();
  const [draft] = useState(loadSummaryDraft);
  const [initialValues, setInitialValues] = useState<SummaryFormValues>(
    draft ?? EMPTY_SUMMARY_FORM
  );
  const [restored, setRestored] = useState(draft !== null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useDocumentTitle(t('page.create-summary.title'));

  if (!isLoggedIn) {
    return (
      <PageState
        icon={<LogIn />}
        title={t('page.create-summary.state.login-title')}
        description={t('page.create-summary.state.login-description')}
        actions={
          <Link to={loginHref} className={buttonStyles({ variant: 'primary' })}>
            {t('component.topnav.login')}
          </Link>
        }
      />
    );
  }

  const handleSubmit = async (values: SummaryFormValues, files: File[]) => {
    setSubmitError(null);
    try {
      const id = await create.mutateAsync({
        files,
        toRequest: (uploaded) => summaryFormToRequest(values, uploaded),
      });
      clearSummaryDraft();
      navigate(`/summary/${id}`, { replace: true });
    } catch (error) {
      setSubmitError(
        t(
          error instanceof SummaryUploadError
            ? 'component.form.upload'
            : 'component.form.submit'
        )
      );
    }
  };

  return (
    <div className={s.page}>
      <header className={s.header}>
        <Link to='/summary' className={s.backLink}>
          <ChevronLeft aria-hidden='true' />
          {t('component.topnav.summary')}
        </Link>
        <h1 className={s.title}>{t('page.create-summary.title')}</h1>
      </header>
      <SummaryForm
        mode='create'
        initialValues={initialValues}
        submitting={create.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
        onSaveDraft={saveSummaryDraft}
        notice={
          restored && (
            <p role='status' className={noticeStyle}>
              {t('component.draft.restored')}
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  clearSummaryDraft();
                  setInitialValues(EMPTY_SUMMARY_FORM);
                  setRestored(false);
                }}
              >
                {t('component.draft.discard')}
              </Button>
            </p>
          )
        }
      />
    </div>
  );
}

export default SummaryCreatePage;
