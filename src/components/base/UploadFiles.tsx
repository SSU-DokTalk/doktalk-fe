import { getFileTypeFromUrl } from '@/functions';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import PDFThumbnail from '@/assets/images/pdf-thumbnail.svg';
import {
  ACCEPTABLE,
  ACCEPTABLE_IMAGE,
  ACCEPTABLE_FILE,
} from '@/common/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faLink, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FileType } from '@/types/data';
import { useTranslation } from 'react-i18next';

/**
 * 파일 업로드 및 미리보기
 * @description 파일을 저장할 state를 설정하는 함수
 * @param setFiles
 * @description 파일 업로드 버튼 텍스트
 * @param buttonText "파일 첨부"
 * @description 파일 업로드 버튼 아이콘
 * @param buttonIcon Chain
 * @description 업로드 가능한 파일 형식(comma separated)
 * @param accept ACCEPTABLE
 * @description 업로드 가능한 파일 최대 크기
 * @param maxSize 10 * 1024 * 1024
 * @description 업로드 가능한 파일 최대 개수
 * @param limit 20
 * @description 파일 미리보기 크기
 * @param previewSize 114
 * @description 파일 미리보기 간격
 * @param itemMargin 5
 */

function UploadFiles({
  setFiles,
  uploadedFiles, // update시 이미 서버에 저장된 파일들을 다루기 위한 param
  setUploadedFiles,
  buttonText,
  buttonIcon = faLink,
  buttonIconImage = undefined,
  accept = ACCEPTABLE.join(),
  maxSize = 10 * 1024 * 1024,
  limit = 20,
  previewSize = 114,
  itemMargin = 5,
}: {
  setFiles: Dispatch<SetStateAction<File[]>>;
  uploadedFiles?: FileType[];
  setUploadedFiles?: Dispatch<SetStateAction<FileType[]>>;
  buttonText?: string;
  buttonIcon?: IconDefinition;
  buttonIconImage?: string;
  accept?: string;
  maxSize?: number;
  limit?: number;
  previewSize?: number;
  itemMargin?: number;
}) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hasTooManyFiles, setHasTooManyFiles] = useState<boolean>(false);
  const [hasTooLargeFile, setHasTooLargeFile] = useState<boolean>(false);
  const [hasUnacceptableFile, setHasUnacceptableFile] =
    useState<boolean>(false);
  const [previews, setPreviews] = useState<FileType[]>([]);

  const fitImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalHeight, naturalWidth } = e.currentTarget;
    if (naturalHeight > naturalWidth) {
      e.currentTarget.style.height = 'auto';
      e.currentTarget.style.width = '100%';
    } else {
      e.currentTarget.style.height = '100%';
      e.currentTarget.style.width = 'auto';
    }
  };

  const previewComponent = (ext: string, preview: FileType) => {
    if (ACCEPTABLE_IMAGE.includes(ext)) {
      return (
        <img
          src={preview.url}
          alt='preview'
          className='preview-image'
          onLoad={fitImage}
        />
      );
    } else if (ACCEPTABLE_FILE.includes(ext)) {
      return (
        <div className='preview-file'>
          <a
            href={preview.url}
            download={preview.name}
            className='download-file'
          >
            <img src={PDFThumbnail} alt='' width={36} height={36} />
            <div className='preview-filename'>
              <div className='preview-filename-text'>{preview.name}</div>
            </div>
          </a>
        </div>
      );
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasTooManyFiles(false);
    setHasTooLargeFile(false);
    setHasUnacceptableFile(false);

    let fileList = Array.from(e.target.files ?? []);

    if (fileList.length == 0) return;

    if (previews.length + fileList.length > limit) {
      setHasTooManyFiles(true);
      return;
    }

    if (fileList.some((file) => file.size > maxSize)) {
      setHasTooLargeFile(true);
      return;
    }

    if (
      fileList.some(
        (file) =>
          !accept
            .split(',')
            .reduce<string[]>((acc, cur) => acc.concat(cur.trim()), [])
            .includes(`.${getFileTypeFromUrl(file.name)}`)
      )
    ) {
      setHasUnacceptableFile(true);
      return;
    }
    setPreviews((prev) =>
      prev.concat(
        fileList.reduce<FileType[]>((acc, file) => {
          return acc.concat({
            url: URL.createObjectURL(file),
            name: file.name,
          });
        }, [])
      )
    );
    setFiles((prev) => prev.concat(fileList));
  };

  const removeFile = (index: number) => {
    setPreviews((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
    setFiles((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
  };

  const removeUploadedFile = (index: number) => {
    if (setUploadedFiles) {
      setUploadedFiles((prev) =>
        prev.slice(0, index).concat(prev.slice(index + 1))
      );
    }
  };

  useEffect(() => {}, [previews]);

  return (
    <div id='upload-files'>
      <input
        type='file'
        multiple
        accept={accept}
        ref={inputRef}
        onChange={handleFileChange}
      />
      <button
        className='upload-button'
        onClick={() => inputRef.current?.click()}
      >
        <span>{buttonText || t('component.base.upload-file.attach')}</span>
        {buttonIconImage ? (
          <img
            src={buttonIconImage}
            alt='attach file'
            className='button-icon'
          />
        ) : buttonIcon ? (
          <FontAwesomeIcon icon={buttonIcon} className='button-icon' />
        ) : null}
      </button>
      {hasTooManyFiles && (
        <div className='input-alert'>
          {t('component.base.upload-files.error.too-many', { limit })}
        </div>
      )}
      {hasTooLargeFile && (
        <div className='input-alert'>
          {t('component.base.upload-files.error.too-large', {
            size: Math.trunc(maxSize / 1024 / 1024),
          })}
        </div>
      )}
      {hasUnacceptableFile && (
        <div className='input-alert'>
          {t('component.base.upload-files.error.unacceptable', {
            types: accept
              .split(',')
              .reduce<string[]>((acc, cur) => acc.concat(cur.trim()), [])
              .join(', '),
          })}
        </div>
      )}
      <div className='preview-container'>
        {// 이미 올라간 파일들 (update시 사용될)
        uploadedFiles?.map((uploaded, index) => {
          let ext = `.${getFileTypeFromUrl(uploaded.name)}`;
          return (
            <div
              className='content-container'
              key={'serverf' + index}
              style={{
                margin: `5px ${itemMargin}px`,
                width: `${previewSize}px`,
                height: `${previewSize}px`,
              }}
            >
              <div className='content'>{previewComponent(ext, uploaded)}</div>
              <button
                className='delete-content-button'
                onClick={() => removeUploadedFile(index)}
              >
                <FontAwesomeIcon icon={faX} className='delete-content-icon' />
              </button>
            </div>
          );
        })}

        {
          // 아직 안 올라간 파일들
          previews.map((preview, index) => {
            let ext = `.${getFileTypeFromUrl(preview.name)}`;
            return (
              <div
                className='content-container'
                key={'uf' + index}
                style={{
                  margin: `5px ${itemMargin}px`,
                  width: `${previewSize}px`,
                  height: `${previewSize}px`,
                }}
              >
                <div className='content'>{previewComponent(ext, preview)}</div>
                <button
                  className='delete-content-button'
                  onClick={() => removeFile(index)}
                >
                  <FontAwesomeIcon icon={faX} className='delete-content-icon' />
                </button>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default UploadFiles;
