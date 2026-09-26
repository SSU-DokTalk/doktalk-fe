import type { AttachedFile } from '@/shared/api/models';

const IMAGE = /\.(jpe?g|png|gif|webp)$/i;

/** 사진 파일인지 (이름이나 주소의 확장자로 판단해요) */
export function isImageFile(file: AttachedFile) {
  return IMAGE.test(file.name || file.url);
}

/** 첨부 파일 중 사진만 */
export function photosOf(files: AttachedFile[] | null | undefined) {
  return (files ?? []).filter(isImageFile);
}
