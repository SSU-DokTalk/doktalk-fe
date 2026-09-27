import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Dialog, iconButtonStyles, Menu } from '@/design-system';
import * as s from './OwnerMenu.css';

export type OwnerMenuLabels = {
  /** 메뉴 버튼 이름 (토론방 옵션) */
  options: string;
  edit: string;
  delete: string;
  dialogTitle: string;
  dialogDescription: string;
  cancel: string;
  confirm: string;
  /** 삭제 실패 문구 */
  error: string;
};

type OwnerMenuProps = {
  /** 수정 화면 주소. 창으로 고치면 onEdit을 넘겨요. */
  editTo?: string;
  onEdit?: () => void;
  labels: OwnerMenuLabels;
  /** 삭제 요청. 성공하면 onDeleted로 이동해요. */
  onDelete: () => Promise<unknown>;
  onDeleted: () => void;
};

/** 작성자 메뉴: 수정 링크, 삭제(확인 창). */
export function OwnerMenu({
  editTo,
  onEdit,
  labels,
  onDelete,
  onDeleted,
}: OwnerMenuProps) {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    setFailed(false);
    try {
      await onDelete();
      setConfirmOpen(false);
      onDeleted();
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Menu.Root modal={false}>
        <Menu.Trigger
          aria-label={labels.options}
          className={iconButtonStyles({ variant: 'ghost', size: 'md' })}
        >
          <MoreHorizontal aria-hidden='true' />
        </Menu.Trigger>
        <Menu.Content>
          {editTo ? (
            <Menu.LinkItem render={<Link to={editTo} />}>
              <Pencil aria-hidden='true' />
              {labels.edit}
            </Menu.LinkItem>
          ) : (
            <Menu.Item onClick={onEdit}>
              <Pencil aria-hidden='true' />
              {labels.edit}
            </Menu.Item>
          )}
          <Menu.Item
            tone='danger'
            onClick={() => {
              setFailed(false);
              setConfirmOpen(true);
            }}
          >
            <Trash2 aria-hidden='true' />
            {labels.delete}
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>

      <Dialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <Dialog.Content width={400}>
          <Dialog.Header
            title={labels.dialogTitle}
            closeLabel={t('component.dialog.close')}
          />
          <Dialog.Body>
            <Dialog.Description className={s.description}>
              {labels.dialogDescription}
            </Dialog.Description>
            {failed && (
              <p role='alert' className={s.alert}>
                {labels.error}
              </p>
            )}
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close
              render={<Button variant='neutral'>{labels.cancel}</Button>}
            />
            <Button
              variant='danger'
              loading={pending}
              onClick={() => void handleDelete()}
            >
              {labels.confirm}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
