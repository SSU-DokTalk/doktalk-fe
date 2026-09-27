import clsx from 'clsx';
import type { AttachedFile } from '@/shared/api/models';
import { visuallyHidden } from '@/design-system';
import * as s from './PhotoGrid.css';

type PhotoGridProps = {
  photos: AttachedFile[];
  /** feed: 목록 카드(최대 max장), detail: 상세 */
  size: 'feed' | 'detail';
  /** 보여줄 최대 장수. 넘치면 마지막 칸에 +N을 겹쳐요. */
  max?: number;
  altFor: (index: number) => string;
  /** 스크린 리더용: 사진 N장 더 있음 */
  moreLabel?: (count: number) => string;
};

/** 게시글 사진 격자. 한 장이면 넓게, 두 장부터 두 칸이에요. */
export function PhotoGrid({
  photos,
  size,
  max = photos.length,
  altFor,
  moreLabel,
}: PhotoGridProps) {
  if (photos.length === 0) return null;
  const shown = photos.slice(0, max);
  const hidden = photos.length - shown.length;

  return (
    <ul className={clsx(s.grid, shown.length === 1 && s.single)}>
      {shown.map((photo, index) => (
        <li key={photo.url} className={clsx(s.cell, s[size])}>
          <img
            src={photo.url}
            alt={altFor(index + 1)}
            loading='lazy'
            decoding='async'
            className={s.image}
          />
          {hidden > 0 && index === shown.length - 1 && (
            <span className={s.more}>
              <span aria-hidden='true'>+{hidden}</span>
              {moreLabel && (
                <span className={visuallyHidden}>{moreLabel(hidden)}</span>
              )}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
