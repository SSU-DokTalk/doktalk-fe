import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Summary } from '@/shared/api/models';
import { OwnerMenu } from '@/shared/components/OwnerMenu';
import { useDeleteSummary } from '../api';

/** 작성자 메뉴: 수정, 삭제(확인 창). */
export function SummaryOwnerMenu({ summary }: { summary: Summary }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const remove = useDeleteSummary();

  return (
    <OwnerMenu
      editTo={`/summary/${summary.id}/update`}
      labels={{
        options: t('page.summary-detail.options'),
        edit: t('page.debate-detail.button.edit'),
        delete: t('page.debate-detail.button.delete'),
        dialogTitle: t('page.summary-detail.delete-dialog.title'),
        dialogDescription: t('page.summary-detail.delete-dialog.description'),
        cancel: t('page.debate-detail.delete-dialog.cancel'),
        confirm: t('page.debate-detail.delete-dialog.confirm'),
        error: t('page.debate-detail.delete-dialog.error'),
      }}
      onDelete={() => remove.mutateAsync(summary.id)}
      onDeleted={() => navigate('/summary', { replace: true })}
    />
  );
}
