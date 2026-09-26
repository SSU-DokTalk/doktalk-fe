import { useTranslation } from 'react-i18next';
import type { Post } from '@/shared/api/models';
import { OwnerMenu } from '@/shared/components/OwnerMenu';
import { useDeletePost } from '../api';

/** 작성자 메뉴: 수정(창), 삭제(확인 창). */
export function PostOwnerMenu({
  post,
  onEdit,
  onDeleted,
}: {
  post: Post;
  onEdit: () => void;
  onDeleted?: () => void;
}) {
  const { t } = useTranslation();
  const remove = useDeletePost();

  return (
    <OwnerMenu
      onEdit={onEdit}
      labels={{
        options: t('page.post.options'),
        edit: t('page.post-detail.button.edit'),
        delete: t('page.post-detail.button.delete'),
        dialogTitle: t('page.post.delete-dialog.title'),
        dialogDescription: t('page.post.delete-dialog.description'),
        cancel: t('page.debate-detail.delete-dialog.cancel'),
        confirm: t('page.debate-detail.delete-dialog.confirm'),
        error: t('page.debate-detail.delete-dialog.error'),
      }}
      onDelete={() => remove.mutateAsync(post.id)}
      onDeleted={() => onDeleted?.()}
    />
  );
}
