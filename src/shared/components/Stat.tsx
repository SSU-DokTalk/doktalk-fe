import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { visuallyHidden } from '@/design-system';
import * as s from './Stat.css';

export type StatProps = {
  icon: LucideIcon;
  /** 스크린 리더가 읽는 문장 (예: 좋아요 3개) */
  label: string;
  /** 화면에 보이는 숫자 */
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

/** 좋아요·댓글 수. 아이콘과 숫자만 보여주고, 스크린 리더는 label을 읽어요. */
export function Stat({
  icon: Icon,
  label,
  children,
  size = 'md',
  className,
}: StatProps) {
  return (
    <span className={clsx(s.stat, s.size[size], className)}>
      <Icon aria-hidden='true' className={s.icon[size]} />
      <span className={visuallyHidden}>{label}</span>
      <span aria-hidden='true'>{children}</span>
    </span>
  );
}
