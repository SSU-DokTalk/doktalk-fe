import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';
import { badgeStyles, type BadgeVariants } from './Badge.css';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  BadgeVariants & {
    icon?: ReactNode;
  };

/** 상태나 분류를 짧게 보여주는 표시예요. 누를 수 있는 요소에는 쓰지 마세요. */
function Badge({
  tone,
  size,
  shape,
  icon,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={clsx(badgeStyles({ tone, size, shape }), className)}
    >
      {icon}
      {children}
    </span>
  );
}

export default Badge;
