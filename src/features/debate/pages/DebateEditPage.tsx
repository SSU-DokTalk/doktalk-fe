import { ChevronLeft, Lock, LogIn, SearchX } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, buttonStyles, Spinner } from '@/design-system';
import { httpStatus } from '@/shared/api/client';
import { PageState } from '@/shared/components/PageState';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import { UploadError, useDebate, useUpdateDebate } from '../api';
import { DebateForm } from '../components/DebateForm';
import { debateToForm, formToRequest, type DebateFormValues } from '../form';
import * as s from '@/shared/components/FormPage.css';
import { useAuthHref } from '@/features/auth/redirect';

/** 토론방 수정 (/debate/:debate_id/update). 개설자만 들어올 수 있어요. */
function DebateEditPage() {
  const { t } = useTranslation();
  const loginHref = useAuthHref();
  const navigate = useNavigate();
  const { debate_id } = useParams();
  const id = Number(debate_id);
  const valid = Number.isInteger(id) && id > 0;
  const { user, isLoggedIn } = useAuth();
  const query = useDebate(valid && isLoggedIn ? id : 0);
  const update = useUpdateDebate(id);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // 처음 불러온 값으로만 폼을 채워요. 다시 불러와도 고치던 내용이 지워지지 않게요.
  const initialRef = useRef<DebateFormValues | null>(null);
  if (!initialRef.current && query.data) {
    initialRef.current = debateToForm(query.data);
  }

  useDocumentTitle(t('page.update-debate.title'));

  const toList = (
    <Link to='/debate' className={buttonStyles({ variant: 'secondary' })}>
      {t('page.debate-detail.state.to-list')}
    </Link>
  );
  const notFound = (
    <PageState
      icon={<SearchX />}
      title={t('page.debate-detail.state.not-found-title')}
      description={t('page.debate-detail.state.not-found-description')}
      actions={toList}
    />
  );
  const loginRequired = (
    <PageState
      icon={<LogIn />}
      title={t('page.debate-detail.state.login-title')}
      description={t('page.debate-detail.state.login-description')}
      actions={
        <Link to={loginHref} className={buttonStyles({ variant: 'primary' })}>
          {t('component.topnav.login')}
        </Link>
      }
    />
  );

  if (!valid) return notFound;
  if (!isLoggedIn) return loginRequired;
  if (query.isPending) {
    return (
      <PageState
        icon={<Spinner />}
        title={t('component.base.infinite-scroll.loading')}
      />
    );
  }
  if (query.isError) {
    const status = httpStatus(query.error);
    if (status === 401) return loginRequired;
    if (status === 404 || status === 422) return notFound;
    return (
      <PageState
        tone='danger'
        icon={<SearchX />}
        title={t('page.debate.item.error')}
        description={t('page.debate.item.error-description')}
        actions={
          <Button variant='outline' onClick={() => void query.refetch()}>
            {t('page.debate.item.retry')}
          </Button>
        }
      />
    );
  }
  if (query.data.user.id !== user.id || !initialRef.current) {
    return (
      <PageState
        icon={<Lock />}
        title={t('page.create-debate.state.forbidden-title')}
        description={t('page.create-debate.state.forbidden-description')}
        actions={
          <Link
            to={`/debate/${id}`}
            className={buttonStyles({ variant: 'secondary' })}
          >
            {t('page.create-debate.state.to-debate')}
          </Link>
        }
      />
    );
  }

  const handleSubmit = async (values: DebateFormValues, files: File[]) => {
    setSubmitError(null);
    try {
      await update.mutateAsync({
        files,
        toRequest: (uploaded) => formToRequest(values, uploaded ?? []),
      });
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
        <Link to={`/debate/${id}`} className={s.backLink}>
          <ChevronLeft aria-hidden='true' />
          {query.data.title}
        </Link>
        <h1 className={s.title}>{t('page.update-debate.title')}</h1>
      </header>
      <DebateForm
        mode='edit'
        initialValues={initialRef.current}
        submitting={update.isPending}
        submitError={submitError}
        onSubmit={handleSubmit}
        cancelAction={
          <Link
            to={`/debate/${id}`}
            className={buttonStyles({ variant: 'secondary', size: 'lg' })}
          >
            {t('page.create-debate.button.cancel')}
          </Link>
        }
      />
    </div>
  );
}

export default DebateEditPage;
