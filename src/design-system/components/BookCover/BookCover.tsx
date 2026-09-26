import clsx from 'clsx';
import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { coverTones } from '../../tokens/palette';
import * as s from './BookCover.css';

/** 표지 이미지가 없을 때 쓰는 색. 제목으로 골라서 같은 책은 늘 같은 색이에요. */
function toneFor(title: string) {
  let hash = 0;
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return coverTones[hash % coverTones.length];
}

export type BookCoverProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: string;
  author?: string;
  src?: string | null;
  /**
   * 너비(px). 높이는 비율로 정해져요.
   * 'fill'이면 칸 너비를 다 채우고, 글자 크기도 표지 너비에 맞춰 줄고 늘어요 (서재 그리드).
   */
  width: number | 'fill';
  /** 높이 ÷ 너비. 국내 도서 평균에 맞춰 1.45가 기본이에요. */
  ratio?: number;
  /**
   * 대체 텍스트. 제목이 옆에 같이 보이면 비워 두세요(장식으로 처리).
   * 표지만 단독으로 보일 때만 넣어요.
   */
  alt?: string;
  /** 표지 위에 겹치는 요소 (삭제 버튼 등). 표지를 장식으로 숨겨도 이건 읽혀요. */
  children?: ReactNode;
};

/**
 * 책 표지예요. 네이버·구글 이미지가 없거나 불러오지 못하면
 * 제목과 저자를 적은 색 표지로 바꿔 보여줘요.
 */
function BookCover({
  title,
  author,
  src,
  width,
  ratio = 1.45,
  alt = '',
  className,
  style,
  children,
  ...rest
}: BookCoverProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;
  const tone = toneFor(title);
  const fill = width === 'fill';
  /** 고정 너비일 때 너비에 비례한 크기(px). 'fill'은 CSS(cqw)가 맡아요. */
  const scaled = ({ percent, min }: { percent: number; min: number }) =>
    fill ? undefined : Math.max(min, Math.round((width * percent) / 100));

  return (
    <div
      {...rest}
      className={clsx(s.cover, fill && s.fill, className)}
      style={{
        width: fill ? '100%' : width,
        height: fill ? undefined : Math.round(width * ratio),
        aspectRatio: fill ? `1 / ${ratio}` : undefined,
        backgroundColor: tone.bg,
        color: tone.ink,
        ...style,
      }}
    >
      {/* 그림 부분만 숨기거나 이름을 붙여요. 위에 겹친 버튼은 그대로 읽히게 두어요. */}
      <span
        className={s.art}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        style={{ padding: scaled(s.proportions.padding) }}
      >
        {showImage ? (
          <img
            src={src ?? undefined}
            alt=''
            loading='lazy'
            decoding='async'
            className={s.image}
            onError={() => setFailedSrc(src ?? null)}
          />
        ) : (
          <>
            <span
              className={s.fallbackTitle}
              style={{ fontSize: scaled(s.proportions.title) }}
            >
              {title}
            </span>
            {author && (
              <span
                className={s.fallbackAuthor}
                style={{ fontSize: scaled(s.proportions.author) }}
              >
                {author}
              </span>
            )}
          </>
        )}
      </span>
      {children}
    </div>
  );
}

export default BookCover;
