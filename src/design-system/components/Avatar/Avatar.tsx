import clsx from 'clsx';
import { useState, type HTMLAttributes } from 'react';
import { avatar, image, type AvatarVariants } from './Avatar.css';

export type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> &
  AvatarVariants & {
    /** 이름 첫 글자를 사진이 없을 때 보여줘요. */
    name: string;
    src?: string | null;
    /** 지름(px) */
    size?: number;
    /**
     * 보통은 이름이 옆에 같이 나와서 장식으로 숨겨요.
     * 아바타만 단독으로 보일 때 true로 두면 이름을 읽어줘요.
     */
    labelled?: boolean;
  };

function Avatar({
  name,
  src,
  size = 40,
  tone,
  labelled = false,
  className,
  style,
  ...rest
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;
  const initial = Array.from(name.trim())[0] ?? '';

  return (
    <span
      {...rest}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? name : undefined}
      aria-hidden={labelled ? undefined : true}
      className={clsx(avatar({ tone }), className)}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.4),
        ...style,
      }}
    >
      {initial}
      {showImage && (
        <img
          src={src ?? undefined}
          alt=''
          className={image}
          onError={() => setFailedSrc(src ?? null)}
        />
      )}
    </span>
  );
}

export default Avatar;
