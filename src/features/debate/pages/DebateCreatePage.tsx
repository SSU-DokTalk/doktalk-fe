import { ChevronLeft, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button, buttonStyles } from '@/design-system';
import { PageState } from '@/shared/components/PageState';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import { UploadError, useCreateDebate } from '../api';
import { DebateForm } from '../components/DebateForm';
import { notice as noticeStyle } from '../components/DebateForm.css';
import {
  clearDebateDraft,
  EMPTY_DEBATE_FORM,
  formToRequest,
  loadDebateDraft,
  saveDebateDraft,
  type DebateFormValues,
} from '../form';
import * as s from './DebateFormPage.css';

/** 토론방 만들기 (/debate/create) */
function DebateCreatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const create = useCreateDebate();
  const [draft] = useState(loadDebateDraft);
  const [initialValues, setInitialValues] = useState<DebateFormValues>(
    draft ?? EMPTY_DEBATE_FORM
  );
  const [restored, setRestored] = useState(draft !== null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useDocumentTitle(t('page.create-debate.title'));

  if (!isLoggedIn) {
    return (
      <PageState
        icon={<LogIn />}
        title={t('page.create-debate.state.login-title')}
        description={t('page.create-debate.state.login-description')}
        actions={
          <Link to='/login' className={buttonStyles({ variant: 'primary' })}>
            {t('component.topnav.login')}
          </Link>
        }
      />
    );
  }

  const handleSubmit = async (values: DebateFormValues, files: File[]) => {
    setSubmitError(null);
    try {
      const id = await create.mutateAsync({
        files,
        toRequest: (uploaded) => formToRequest(values, uploaded ?? []),
      });
      clearDebateDraft();
      navigate(`/debate/${id}`, { replace: true });
    } catch (error) {
      setSubmitError(
        t(
          error instanceof UploadError
            ? 'page.create-debate.error.upload'
            : 'page.create-debate.error.submit'
        )
      );
    }
  };

  return (
    <div className={s.page}>
      <header className={s.header}>
        <Link to='/debate' className={s.backLink}>
          <ChevronLeft aria-hidden='true' />
          {t('component.topnav.debate')}
        </Link>
        <h1 className={s.title}>{t('page.create-debate.title')}</h1>
      </header>
      <DebateForm
        mode='create'
        initialValues={initialValues}
        submitting={create.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
        onSaveDraft={saveDebateDraft}
        notice={
          restored && (
            <p role='status' className={noticeStyle}>
              {t('page.create-debate.draft.restored')}
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  clearDebateDraft();
                  setInitialValues(EMPTY_DEBATE_FORM);
                  setRestored(false);
                }}
              >
                {t('page.create-debate.draft.discard')}
              </Button>
            </p>
          )
        }
      />
    </div>
  );
}

export default DebateCreatePage;
