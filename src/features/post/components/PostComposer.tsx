import { useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, mq, TextField, Textarea } from '@/design-system';
import type { AttachedFile, Post } from '@/shared/api/models';
import { createDraftStore } from '@/shared/draft';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { PostUploadError, useCreatePost, useUpdatePost } from '../api';
import { PhotoPicker } from './PhotoPicker';
import * as s from './PostComposer.css';

type Draft = { title: string; content: string };
const EMPTY: Draft = { title: '', content: '' };
const draftStore = createDraftStore<Draft>('doktalk:post-draft:v1', EMPTY);

type PostComposerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 수정할 글. 없으면 새로 써요. */
  post?: Post;
  /** 저장한 뒤 (새 글 id) */
  onSaved?: (id: number) => void;
};

/**
 * 게시글 쓰기·수정 창. 데스크톱은 가운데 창, 모바일은 아래에서 올라오는 시트예요.
 * 쓰던 내용이 있으면 닫기 전에 한 번 물어봐요.
 */
export function PostComposer({
  open,
  onOpenChange,
  post,
  onSaved,
}: PostComposerProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const editing = post !== undefined;
  const create = useCreatePost();
  const update = useUpdatePost(post?.id ?? 0);
  const saving = create.isPending || update.isPending;

  const [initial, setInitial] = useState<Draft>(EMPTY);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [existing, setExisting] = useState<AttachedFile[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [titleError, setTitleError] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // 창을 열 때마다 처음 값으로 채워요.
  useEffect(() => {
    if (!open) return;
    const draft = editing ? null : draftStore.load();
    const start = editing
      ? { title: post.title, content: post.content ?? '' }
      : (draft ?? EMPTY);
    setInitial(start);
    setTitle(start.title);
    setContent(start.content);
    setExisting(editing ? (post.files ?? []) : []);
    setFiles([]);
    setTitleError(false);
    setSubmitError(null);
    setRestored(draft !== null);
    setDraftSaved(false);
  }, [open, editing, post]);

  const dirty =
    title !== initial.title ||
    content !== initial.content ||
    files.length > 0 ||
    existing.length !== (post?.files?.length ?? 0);

  const requestClose = (next: boolean) => {
    if (next) return onOpenChange(true);
    if (saving) return;
    if (
      dirty &&
      !window.confirm(t('component.post-composer.discard-confirm'))
    ) {
      return;
    }
    onOpenChange(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    setSubmitError(null);
    const input = { title, content, existingFiles: existing, files };
    try {
      // 창을 먼저 닫고 나서 이동해요 (닫기가 주소를 고치기 때문이에요).
      if (editing) {
        await update.mutateAsync(input);
        onOpenChange(false);
        onSaved?.(post.id);
      } else {
        const id = await create.mutateAsync(input);
        draftStore.clear();
        onOpenChange(false);
        onSaved?.(id);
      }
    } catch (error) {
      setSubmitError(
        t(
          error instanceof PostUploadError
            ? 'component.form.upload'
            : 'component.form.submit'
        )
      );
    }
  };

  const heading = editing
    ? t('component.post-composer.title-edit')
    : t('component.post-composer.title-create');

  return (
    <Dialog.Root open={open} onOpenChange={requestClose}>
      <Dialog.Content
        placement={isDesktop ? 'center' : 'bottom'}
        width={640}
        className={s.popup}
      >
        <Dialog.Header
          title={heading}
          closeLabel={t('component.dialog.close')}
          divider
        />
        <form noValidate className={s.form} onSubmit={handleSubmit}>
          <Dialog.Body className={s.body}>
            {restored && (
              <p role='status' className={s.notice}>
                {t('component.draft.restored')}
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    draftStore.clear();
                    setInitial(EMPTY);
                    setTitle('');
                    setContent('');
                    setRestored(false);
                  }}
                >
                  {t('component.draft.discard')}
                </Button>
              </p>
            )}
            <TextField
              label={t('component.post-composer.title-label')}
              hideLabel
              size='lg'
              placeholder={t('component.modal.write-post.placeholder.title')}
              value={title}
              maxLength={255}
              autoFocus
              error={
                titleError
                  ? t('component.post-composer.title-required')
                  : undefined
              }
              onChange={(event) => {
                setTitle(event.target.value);
                if (event.target.value.trim()) setTitleError(false);
              }}
            />
            <Textarea
              label={t('component.post-composer.content-label')}
              hideLabel
              rows={9}
              placeholder={t('component.modal.write-post.placeholder.content')}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <PhotoPicker
              existing={existing}
              onExistingChange={setExisting}
              files={files}
              onFilesChange={setFiles}
            />
            {submitError && (
              <p role='alert' className={s.alert}>
                {submitError}
              </p>
            )}
          </Dialog.Body>
          <Dialog.Footer>
            <span role='status' className={s.status}>
              {draftSaved ? t('component.draft.saved') : ''}
            </span>
            {!editing && (
              <Button
                variant='secondary'
                disabled={saving}
                onClick={() =>
                  setDraftSaved(draftStore.save({ title, content }))
                }
              >
                {t('component.modal.write-post.button.temp-save')}
              </Button>
            )}
            <Button type='submit' loading={saving}>
              {editing
                ? t('component.modal.update-post.button.submit')
                : t('component.modal.write-post.button.submit')}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
