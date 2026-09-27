import { Download, FileText, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { downloadAttachment } from '@/shared/api/download';
import type { AttachedFile } from '@/shared/api/models';
import * as s from './Attachments.css';

const IMAGE_FILE = /\.(jpe?g|png|gif|webp)$/i;

function FileDownload({ file }: { file: AttachedFile }) {
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const Icon = IMAGE_FILE.test(file.name || file.url) ? ImageIcon : FileText;

  return (
    <button
      type='button'
      className={s.fileButton}
      aria-label={t('page.debate-detail.download', { name: file.name })}
      disabled={pending}
      onClick={async () => {
        setPending(true);
        try {
          await downloadAttachment(file);
        } finally {
          setPending(false);
        }
      }}
    >
      <Icon aria-hidden='true' />
      <span className={s.fileName}>{file.name}</span>
      <Download aria-hidden='true' />
    </button>
  );
}

/** 첨부 파일 목록. 누르면 원래 이름으로 내려받아요. */
export function Attachments({ files }: { files: AttachedFile[] }) {
  const { t } = useTranslation();
  if (files.length === 0) return null;

  return (
    <ul aria-label={t('page.debate-detail.files')} className={s.files}>
      {files.map((file) => (
        <li key={file.url}>
          <FileDownload file={file} />
        </li>
      ))}
    </ul>
  );
}
