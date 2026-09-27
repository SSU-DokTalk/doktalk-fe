import { FileText, Image as ImageIcon, Paperclip, X } from 'lucide-react';
import { useId, useRef, useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@/design-system';
import type { AttachedFile } from '@/shared/api/models';
import {
  ATTACHMENT_EXTENSIONS,
  checkPicked,
  isImageName,
  MAX_ATTACHMENTS,
  MAX_FILE_MB,
} from '@/shared/files';
import { formatFileSize } from '@/shared/format';
import * as s from './FileAttachments.css';

export type FileAttachmentsProps = {
  /** 이미 올라가 있는 파일 (수정할 때) */
  existing: AttachedFile[];
  onExistingChange: (files: AttachedFile[]) => void;
  /** 새로 고른 파일. 저장할 때 올려요. */
  files: File[];
  onFilesChange: (files: File[]) => void;
  max?: number;
  maxSizeMb?: number;
  /** 확장자 목록 (.pdf 등) */
  accept?: string[];
};

function FileRow({
  name,
  size,
  onRemove,
}: {
  name: string;
  size?: number;
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  const Icon = isImageName(name) ? ImageIcon : FileText;
  return (
    <li className={s.row}>
      <Icon aria-hidden='true' />
      <span className={s.name}>{name}</span>
      {size !== undefined && (
        <span className={s.size}>{formatFileSize(size)}</span>
      )}
      <IconButton
        size='sm'
        aria-label={t('component.attachments.remove', { name })}
        onClick={onRemove}
      >
        <X />
      </IconButton>
    </li>
  );
}

/** 첨부 파일 고르기. 개수·크기·형식을 고를 때 바로 확인해요. */
export function FileAttachments({
  existing,
  onExistingChange,
  files,
  onFilesChange,
  max = MAX_ATTACHMENTS,
  maxSizeMb = MAX_FILE_MB,
  accept = ATTACHMENT_EXTENSIONS,
}: FileAttachmentsProps) {
  const { t } = useTranslation();
  const labelId = useId();
  const hintId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const count = existing.length + files.length;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(event.target.files ?? []);
    // 같은 파일을 다시 고를 수 있게 비워 둬요.
    event.target.value = '';
    if (picked.length === 0) return;

    const problem = checkPicked(picked, {
      count,
      max,
      extensions: accept,
      maxSizeMb,
    });
    if (problem) {
      setError(
        {
          'too-many': t('component.attachments.too-many', { max }),
          unacceptable: t('component.attachments.unacceptable'),
          'too-large': t('component.attachments.too-large', {
            size: maxSizeMb,
          }),
        }[problem]
      );
      return;
    }
    setError(null);
    onFilesChange([...files, ...picked]);
  };

  return (
    <div role='group' aria-labelledby={labelId} className={s.root}>
      <span id={labelId} className={s.label}>
        {t('component.attachments.label')}
      </span>
      <div className={s.addRow}>
        <button
          type='button'
          className={s.addButton}
          disabled={count >= max}
          aria-describedby={hintId}
          onClick={() => inputRef.current?.click()}
        >
          <Paperclip aria-hidden='true' />
          {t('component.attachments.add')}
          <span className={s.count}>
            {count}/{max}
          </span>
        </button>
        <span id={hintId} className={s.hint}>
          {t('component.attachments.hint', { max, size: maxSizeMb })}
        </span>
      </div>
      <input
        ref={inputRef}
        type='file'
        multiple
        accept={accept.join(',')}
        className={s.input}
        tabIndex={-1}
        aria-hidden='true'
        onChange={handleChange}
      />
      {error && (
        <p role='alert' className={s.error}>
          {error}
        </p>
      )}
      {count > 0 && (
        <ul className={s.list}>
          {existing.map((file) => (
            <FileRow
              key={file.url}
              name={file.name}
              onRemove={() =>
                onExistingChange(existing.filter((item) => item !== file))
              }
            />
          ))}
          {files.map((file, index) => (
            <FileRow
              key={`${file.name}-${file.size}-${index}`}
              name={file.name}
              size={file.size}
              onRemove={() =>
                onFilesChange(files.filter((_, i) => i !== index))
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}
