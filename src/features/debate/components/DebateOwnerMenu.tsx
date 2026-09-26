import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dialog, iconButtonStyles, Menu } from '@/design-system';
import type { Debate } from '@/shared/api/models';
import { useDeleteDebate } from '../api';
import * as s from './DebateOwnerMenu.css';

/** 개설자 메뉴: 수정, 삭제(확인 창). */
export function DebateOwnerMenu({ debate }: { debate: Debate }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const remove = useDeleteDebate();

  const handleDelete = () => {
    remove.mutate(debate.id, {
      onSuccess: () => {
        setConfirmOpen(false);
        navigate('/debate', { replace: true });
      },
    });
  };

  return (
    <>
      <Menu.Root modal={false}>
        <Menu.Trigger
          aria-label={t('page.debate-detail.options')}
          className={iconButtonStyles({ variant: 'ghost', size: 'md' })}
        >
          <MoreHorizontal aria-hidden='true' />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.LinkItem render={<Link to={`/debate/${debate.id}/update`} />}>
            <Pencil aria-hidden='true' />
            {t('page.debate-detail.button.edit')}
          </Menu.LinkItem>
          <Menu.Item
            className={s.danger}
            onClick={() => {
              remove.reset();
              setConfirmOpen(true);
            }}
          >
            <Trash2 aria-hidden='true' />
            {t('page.debate-detail.button.delete')}
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>

      <Dialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <Dialog.Content width={400}>
          <Dialog.Header
            title={t('page.debate-detail.delete-dialog.title')}
            closeLabel={t('component.dialog.close')}
          />
          <Dialog.Body>
            <Dialog.Description className={s.description}>
              {t('page.debate-detail.delete-dialog.description')}
            </Dialog.Description>
            {remove.isError && (
              <p role='alert' className={s.alert}>
                {t('page.debate-detail.delete-dialog.error')}
              </p>
            )}
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close
              render={
                <Button variant='neutral'>
                  {t('page.debate-detail.delete-dialog.cancel')}
                </Button>
              }
            />
            <Button
              variant='danger'
              loading={remove.isPending}
              onClick={handleDelete}
            >
              {t('page.debate-detail.delete-dialog.confirm')}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
