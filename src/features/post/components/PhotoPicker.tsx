import { ImagePlus, X } from 'lucide-react';
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, visuallyHidden } from '@/design-system';
import type { AttachedFile } from '@/shared/api/models';
import {
  checkPicked,
  IMAGE_EXTENSIONS,
  MAX_FILE_MB,
  MAX_PHOTOS,
} from '@/shared/files';
import * as s from './PhotoPicker.css';

type PhotoPickerProps = {
  existing: AttachedFile[];
  onExistingChange: (files: AttachedFile[]) => void;
  files: File[];
  onFilesChange: (files: File[]) => void;
  max?: number;
  maxSizeMb?: number;
};

/** 게시글 사진 고르기. 미리보기 칸과 "사진 추가" 칸을 나란히 보여줘요. */
export function PhotoPicker({
  existing,
  onExistingChange,
  files,
  onFilesChange,
  max = MAX_PHOTOS,
  maxSizeMb = MAX_FILE_MB,
}: PhotoPickerProps) {
  const { t } = useTranslation();
  const labelId = useId();
  const hintId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const count = existing.length + files.length;

  // 새로 고른 사진은 브라우저 안 주소로 미리 보여주고, 바뀌면 정리해요.
  const previews = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files]
  );
  useEffect(
    () => () => previews.forEach((url) => URL.revokeObjectURL(url)),
    [previews]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (picked.length === 0) return;
    const problem = checkPicked(picked, {
      count,
      max,
      extensions: IMAGE_EXTENSIONS,
      maxSizeMb,
    });
    if (problem) {
      setError(
        {
          'too-many': t('component.post-composer.too-many', { max }),
          unacceptable: t('component.post-composer.unacceptable'),
          'too-large': t('component.post-composer.too-large', {
            size: maxSizeMb,
          }),
        }[problem]
      );
      return;
    }
    setError(null);
    onFilesChange([...files, ...picked]);
  };

  const tiles = [
    ...existing.map((file, index) => ({
      key: file.url,
      src: file.url,
      remove: () => onExistingChange(existing.filter((_, i) => i !== index)),
    })),
    ...files.map((file, index) => ({
      key: `${file.name}-${file.size}-${index}`,
      src: previews[index],
      remove: () => onFilesChange(files.filter((_, i) => i !== index)),
    })),
  ];

  return (
    <div
      role='group'
      aria-labelledby={labelId}
      aria-describedby={hintId}
      className={s.root}
    >
      <span id={labelId} className={visuallyHidden}>
        {t('component.post-composer.photos-label')}
      </span>
      <ul className={s.thumbs}>
        {tiles.map((tile, index) => (
          <li key={tile.key} className={s.thumb}>
            <img
              src={tile.src}
              alt={t('component.post-composer.photo-alt', { index: index + 1 })}
              className={s.image}
            />
            <IconButton
              variant='overlay'
              size='sm'
              className={s.remove}
              aria-label={t('component.post-composer.remove', {
                index: index + 1,
              })}
              onClick={tile.remove}
            >
              <X />
            </IconButton>
          </li>
        ))}
        {count < max && (
          <li>
            <button
              type='button'
              className={s.add}
              onClick={() => inputRef.current?.click()}
            >
              <ImagePlus aria-hidden='true' />
              {t('component.post-composer.add')}
              <span className={s.count}>
                {count}/{max}
              </span>
            </button>
          </li>
        )}
      </ul>
      <p id={hintId} className={s.hint}>
        {t('component.post-composer.hint', { max, size: maxSizeMb })}
      </p>
      {error && (
        <p role='alert' className={s.error}>
          {error}
        </p>
      )}
      <input
        ref={inputRef}
        type='file'
        multiple
        accept={IMAGE_EXTENSIONS.join(',')}
        className={s.input}
        tabIndex={-1}
        aria-hidden='true'
        onChange={handleChange}
      />
    </div>
  );
}
