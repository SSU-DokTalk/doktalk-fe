import { ImagePlus } from 'lucide-react';
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  Dialog,
  mq,
  Textarea,
  TextField,
} from '@/design-system';
import {
  INTRODUCTION_MAX,
  NAME_MAX,
  ProfileUploadError,
  useUpdateProfile,
} from '@/features/user/api';
import type { User } from '@/shared/api/models';
import { focusFirstInvalid } from '@/shared/draft';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import * as s from './ProfileEditDialog.css';

const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const PHOTO_MAX_BYTES = 10 * 1024 * 1024;

type FieldErrors = { name?: string; introduction?: string };

function ProfileEditForm({ user, onDone }: { user: User; onDone: () => void }) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const update = useUpdateProfile(user.id);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const changePhotoRef = useRef<HTMLButtonElement>(null);
  const photoHintId = useId();
  const [name, setName] = useState(user.name ?? '');
  const [introduction, setIntroduction] = useState(user.introduction ?? '');
  const [photo, setPhoto] = useState<File | null>(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 새로 고른 사진은 브라우저 안 주소로 미리 보여주고, 바뀌면 정리해요.
  const preview = useMemo(
    () => (photo ? URL.createObjectURL(photo) : null),
    [photo]
  );
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview]
  );

  const shownPhoto = preview ?? (removePhoto ? null : (user.profile ?? null));
  const displayName = name.trim() || user.name || t('component.user.unknown');

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0];
    event.target.value = '';
    if (!picked) return;
    if (!PHOTO_TYPES.includes(picked.type)) {
      setPhotoError(t('page.profile.edit.photo-type-error'));
      return;
    }
    if (picked.size > PHOTO_MAX_BYTES) {
      setPhotoError(t('page.profile.edit.photo-size-error'));
      return;
    }
    setPhotoError(null);
    setPhoto(picked);
    setRemovePhoto(false);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setRemovePhoto(true);
    setPhotoError(null);
    // 삭제 버튼이 사라지니 포커스를 사진 변경 버튼으로 옮겨요.
    changePhotoRef.current?.focus();
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    const trimmed = name.trim();
    if (!trimmed) next.name = t('page.profile.edit.name-required');
    else if (trimmed.length > NAME_MAX) {
      next.name = t('page.profile.edit.name-too-long', { max: NAME_MAX });
    }
    if (introduction.trim().length > INTRODUCTION_MAX) {
      next.introduction = t('page.profile.edit.introduction-too-long', {
        max: INTRODUCTION_MAX,
      });
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setSubmitError(null);
    if (next.name || next.introduction) {
      focusFirstInvalid(formRef.current);
      return;
    }
    try {
      await update.mutateAsync({
        name,
        introduction,
        currentPhoto: user.profile ?? null,
        photo,
        removePhoto,
      });
      onDone();
    } catch (error) {
      setSubmitError(
        t(
          error instanceof ProfileUploadError
            ? 'page.profile.edit.upload-error'
            : 'component.form.submit'
        )
      );
    }
  };

  return (
    <form
      ref={formRef}
      noValidate
      className={s.form}
      onSubmit={(event) => void handleSubmit(event)}
    >
      <Dialog.Body className={s.body}>
        <div className={s.photoRow}>
          <Avatar
            name={displayName}
            src={shownPhoto}
            size={isDesktop ? 96 : 104}
          />
          <div className={s.photoControls}>
            <div className={s.photoButtons}>
              <Button
                ref={changePhotoRef}
                variant='neutral'
                startIcon={<ImagePlus aria-hidden='true' />}
                aria-describedby={photoHintId}
                onClick={() => fileRef.current?.click()}
              >
                {t('page.profile.edit.change-photo')}
              </Button>
              {shownPhoto && (
                <Button variant='plain' onClick={handleRemovePhoto}>
                  {t('page.profile.edit.remove-photo')}
                </Button>
              )}
            </div>
            <p id={photoHintId} className={s.hint}>
              {t('page.profile.edit.photo-hint')}
            </p>
            {photoError && (
              <p role='alert' className={s.photoError}>
                {photoError}
              </p>
            )}
            <input
              ref={fileRef}
              type='file'
              accept={PHOTO_TYPES.join(',')}
              hidden
              onChange={handlePhoto}
            />
          </div>
        </div>

        <TextField
          label={t('component.modal.edit-profile.label.nickname')}
          labelSuffix={
            <span className={s.required}>{t('component.form.required')}</span>
          }
          size='lg'
          value={name}
          maxLength={NAME_MAX}
          autoComplete='nickname'
          required
          placeholder={t('page.profile.edit.name-placeholder')}
          error={errors.name}
          onChange={(event) => setName(event.target.value)}
        />
        <Textarea
          label={t('component.modal.edit-profile.label.introduction')}
          value={introduction}
          maxLength={INTRODUCTION_MAX}
          rows={5}
          placeholder={t(
            'component.modal.edit-profile.placeholder.introduction'
          )}
          helperText={t('component.form.counter', {
            count: introduction.length,
            max: INTRODUCTION_MAX,
          })}
          error={errors.introduction}
          onChange={(event) => setIntroduction(event.target.value)}
        />
        {submitError && (
          <p role='alert' className={s.alert}>
            {submitError}
          </p>
        )}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close render={<Button variant='neutral' />}>
          {t('component.form.cancel')}
        </Dialog.Close>
        <Button type='submit' loading={update.isPending}>
          {t('page.profile.edit.save')}
        </Button>
      </Dialog.Footer>
    </form>
  );
}

/** 프로필 편집 창. 데스크톱은 가운데, 모바일은 화면 전체예요. */
export function ProfileEditDialog({
  user,
  open,
  onOpenChange,
}: {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        placement={isDesktop ? 'center' : 'full'}
        width={520}
        className={s.popup}
      >
        <Dialog.Header
          title={t('component.modal.edit-profile.title')}
          closeLabel={t('component.dialog.close')}
          divider
        />
        <ProfileEditForm user={user} onDone={() => onOpenChange(false)} />
      </Dialog.Content>
    </Dialog.Root>
  );
}
