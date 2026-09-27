import type { AttachedFile } from '@/shared/api/models';

/* ---------- 올리는 파일 규칙 ---------- */

/** 한 파일 크기 한도(MB). 서버(nginx)도 10MB까지 받아요. */
export const MAX_FILE_MB = 10;
/** 게시글 사진 개수 한도 */
export const MAX_PHOTOS = 10;
/** 토론방·요약 첨부 개수 한도 */
export const MAX_ATTACHMENTS = 5;

/** 올릴 수 있는 사진 (파일 고르기 창과 이름 검사) */
export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];
/** 같은 사진 형식 (브라우저가 알려 주는 파일 형식으로 검사할 때) */
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
/** 토론방·요약 첨부: 사진과 PDF */
export const ATTACHMENT_EXTENSIONS = [...IMAGE_EXTENSIONS, '.pdf'];

export function extensionOf(name: string) {
  const dot = name.lastIndexOf('.');
  return dot < 0 ? '' : name.slice(dot).toLowerCase();
}

export type PickProblem = 'too-many' | 'unacceptable' | 'too-large';

/** 새로 고른 파일이 개수·형식·크기 규칙에 맞는지. 맞지 않으면 처음 걸린 이유를 돌려줘요. */
export function checkPicked(
  picked: File[],
  {
    count,
    max,
    extensions,
    maxSizeMb = MAX_FILE_MB,
  }: {
    /** 이미 고른 개수 */
    count: number;
    max: number;
    extensions: string[];
    maxSizeMb?: number;
  }
): PickProblem | null {
  if (count + picked.length > max) return 'too-many';
  if (picked.some((file) => !extensions.includes(extensionOf(file.name)))) {
    return 'unacceptable';
  }
  if (picked.some((file) => file.size > maxSizeMb * 1024 * 1024)) {
    return 'too-large';
  }
  return null;
}

/* ---------- 이미 올라간 파일 ---------- */

/** 예전에 올라간 webp도 있어서, 보여줄 때는 webp도 사진으로 봐요. */
const IMAGE_NAME = /\.(jpe?g|png|gif|webp)$/i;

/** 이름(또는 주소)의 확장자로 사진인지 판단해요. */
export function isImageName(name: string) {
  return IMAGE_NAME.test(name);
}

/** 사진인지 (이름이나 주소의 확장자로 판단해요) */
export function isImageFile(file: AttachedFile) {
  return isImageName(file.name || file.url);
}

/** 첨부 파일 중 사진만 */
export function photosOf(files: AttachedFile[] | null | undefined) {
  return (files ?? []).filter(isImageFile);
}
