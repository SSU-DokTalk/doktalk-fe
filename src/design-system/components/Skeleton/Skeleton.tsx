import clsx from 'clsx';
import type { CSSProperties, HTMLAttributes } from 'react';
import { skeleton } from './Skeleton.css';

export type SkeletonProps = HTMLAttributes<HTMLSpanElement> & {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  radius?: CSSProperties['borderRadius'];
};

/**
 * 처음 불러오는 동안 자리를 잡아 두는 회색 블록이에요.
 * 묶음 바깥에 role="status"와 aria-label을 달고, 블록들은 읽지 않게 숨겨요.
 */
function Skeleton({
  width = '100%',
  height = 12,
  radius = 6,
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <span
      aria-hidden='true'
      {...rest}
      className={clsx(skeleton, className)}
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}

export default Skeleton;
