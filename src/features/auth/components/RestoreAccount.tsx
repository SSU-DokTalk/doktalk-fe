import { CircleAlert } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/design-system';
import { api } from '@/shared/api/client';
import {
  clearTokens,
  restoreAccount,
  useStartSession,
  type Session,
} from '../api';
import { AuthLayout } from './AuthLayout';
import * as s from './AuthForm.css';

/**
 * 탈퇴한 계정으로 로그인했을 때. 서버는 탈퇴한 사람도 로그인은 받아 주지만
 * 복구하기 전에는 다른 요청을 모두 거절해서, 여기서 먼저 복구할지 물어요.
 */
export function RestoreAccount({
  session,
  next,
  onCancel,
}: {
  session: Session;
  next: string;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const startSession = useStartSession();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  const restore = async () => {
    setPending(true);
    setFailed(false);
    try {
      await restoreAccount();
      const user = await api.get('/user/me');
      startSession({ token: session.token, user });
      navigate(next, { replace: true });
    } catch {
      setFailed(true);
      setPending(false);
    }
  };

  return (
    <AuthLayout
      title={t('page.auth.restore.title')}
      subtitle={t('page.auth.restore.description')}
    >
      {failed && (
        <p role='alert' className={s.alert}>
          <CircleAlert aria-hidden='true' className={s.alertIcon} />
          {t('page.auth.restore.failed')}
        </p>
      )}
      <div className={s.actions}>
        <Button size='lg' fullWidth loading={pending} onClick={restore}>
          {t('page.auth.restore.submit')}
        </Button>
        <Button
          variant='neutral'
          size='lg'
          fullWidth
          onClick={() => {
            clearTokens();
            onCancel();
          }}
        >
          {t('page.auth.restore.cancel')}
        </Button>
      </div>
    </AuthLayout>
  );
}
