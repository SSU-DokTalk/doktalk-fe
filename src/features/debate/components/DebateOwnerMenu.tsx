import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Debate } from '@/shared/api/models';
import { OwnerMenu } from '@/shared/components/OwnerMenu';
import { useDeleteDebate } from '../api';

/** 개설자 메뉴: 수정, 삭제(확인 창). */
export function DebateOwnerMenu({ debate }: { debate: Debate }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const remove = useDeleteDebate();

  return (
    <OwnerMenu
      editTo={`/debate/${debate.id}/update`}
      labels={{
        options: t('page.debate-detail.options'),
        edit: t('page.debate-detail.button.edit'),
        delete: t('page.debate-detail.button.delete'),
        dialogTitle: t('page.debate-detail.delete-dialog.title'),
        dialogDescription: t('page.debate-detail.delete-dialog.description'),
        cancel: t('page.debate-detail.delete-dialog.cancel'),
        confirm: t('page.debate-detail.delete-dialog.confirm'),
        error: t('page.debate-detail.delete-dialog.error'),
      }}
      onDelete={() => remove.mutateAsync(debate.id)}
      onDeleted={() => navigate('/debate', { replace: true })}
    />
  );
}
