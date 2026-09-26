import { ChevronLeft, FileText, Lock, LogIn, SearchX } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, buttonStyles, Spinner } from '@/design-system';
import { httpStatus } from '@/shared/api/client';
import { alert as alertStyle } from '@/shared/components/Form.css';
import * as s from '@/shared/components/FormPage.css';
import { PageState } from '@/shared/components/PageState';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import {
  maskLanguageFor,
  SummaryUploadError,
  useChargedContent,
  useSummary,
  useUpdateSummary,
} from '../api';
import { SummaryForm } from '../components/SummaryForm';
import {
  summaryFormToRequest,
  summaryToForm,
  type SummaryFormValues,
} from '../form';

/** 요약 수정 (/summary/:summary_id/update). 작성자만 들어올 수 있어요. */
function SummaryEditPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { summary_id } = useParams();
  const id = Number(summary_id);
  const valid = Number.isInteger(id) && id > 0;
  const { user, isLoggedIn } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const query = useSummary(valid ? id : 0, maskLanguageFor(i18n.language));
  const isOwner = query.data !== undefined && query.data.user.id === viewerId;
  // 유료 내용은 따로 받아요. 서버가 작성자에게 아직 안 주면(null) 다시 입력하게 해요.
  const charged = useChargedContent(id, viewerId, isOwner);
  const update = useUpdateSummary(id);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const initialRef = useRef<SummaryFormValues | null>(null);
  if (!initialRef.current && query.data && isOwner && !charged.isLoading) {
    initialRef.current = summaryToForm(query.data, charged.data ?? null);
  }

  useDocumentTitle(t('page.update-summary.title'));

  const notFound = (
    <PageState
      icon={<SearchX />}
      title={t('page.summary-detail.state.not-found-title')}
      description={t('page.debate-detail.state.not-found-description')}
      actions={
        <Link to='/summary' className={buttonStyles({ variant: 'secondary' })}>
          {t('page.summary-detail.state.to-list')}
        </Link>
      }
    />
  );

  if (!valid) return notFound;
  if (!isLoggedIn) {
    return (
      <PageState
        icon={<LogIn />}
        title={t('page.create-summary.state.login-title')}
        description={t('page.create-summary.state.login-description')}
        actions={
          <Link to='/login' className={buttonStyles({ variant: 'primary' })}>
            {t('component.topnav.login')}
          </Link>
        }
      />
    );
  }
  if (query.isPending || (isOwner && charged.isLoading)) {
    return (
      <PageState
        icon={<Spinner />}
        title={t('component.base.infinite-scroll.loading')}
      />
    );
  }
  if (query.isError) {
    const status = httpStatus(query.error);
    if (status === 404 || status === 422) return notFound;
    return (
      <PageState
        tone='danger'
        icon={<FileText />}
        title={t('page.summary.item.error')}
        description={t('page.summary.item.error-description')}
        actions={
          <Button variant='outline' onClick={() => void query.refetch()}>
            {t('page.debate.item.retry')}
          </Button>
        }
      />
    );
  }
  if (!isOwner || !initialRef.current) {
    return (
      <PageState
        icon={<Lock />}
        title={t('page.create-summary.state.forbidden-title')}
        description={t('page.create-summary.state.forbidden-description')}
        actions={
          <Link
            to={`/summary/${id}`}
            className={buttonStyles({ variant: 'secondary' })}
          >
            {t('page.create-summary.state.to-summary')}
          </Link>
        }
      />
    );
  }

  const chargedMissing = typeof charged.data !== 'string';

  const handleSubmit = async (values: SummaryFormValues, files: File[]) => {
    setSubmitError(null);
    try {
      await update.mutateAsync({
        files,
        toRequest: (uploaded) => summaryFormToRequest(values, uploaded),
      });
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
        <Link to={`/summary/${id}`} className={s.backLink}>
          <ChevronLeft aria-hidden='true' />
          {query.data.title}
        </Link>
        <h1 className={s.title}>{t('page.update-summary.title')}</h1>
      </header>
      <SummaryForm
        mode='edit'
        initialValues={initialRef.current}
        submitting={update.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
        requireCharged={chargedMissing}
        chargedNotice={
          chargedMissing && (
            <p role='note' className={alertStyle}>
              {t('page.create-summary.charged-unavailable')}
            </p>
          )
        }
        cancelAction={
          <Link
            to={`/summary/${id}`}
            className={buttonStyles({ variant: 'secondary', size: 'lg' })}
          >
            {t('component.form.cancel')}
          </Link>
        }
      />
    </div>
  );
}

export default SummaryEditPage;
