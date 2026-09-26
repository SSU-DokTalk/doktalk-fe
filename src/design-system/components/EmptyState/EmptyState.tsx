import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';
import * as s from './EmptyState.css';

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  icon?: ReactNode;
  /** 오류일 때는 danger로 바꿔요. */
  tone?: 'brand' | 'danger';
  title: ReactNode;
  description?: ReactNode;
  /** 다음 행동 버튼 */
  actions?: ReactNode;
  /** 제목 태그. 페이지 구조에 맞게 골라요. */
  titleAs?: 'h1' | 'h2' | 'h3' | 'p';
};

/** 목록이 비었거나 불러오지 못했을 때 이유와 다음 행동을 알려줘요. */
function EmptyState({
  icon,
  tone = 'brand',
  title,
  description,
  actions,
  titleAs: Title = 'p',
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div {...rest} className={clsx(s.root, className)}>
      {icon && (
        <span aria-hidden='true' className={clsx(s.icon, s.iconTone[tone])}>
          {icon}
        </span>
      )}
      <Title className={s.title}>{title}</Title>
      {description && <p className={s.description}>{description}</p>}
      {actions && <div className={s.actions}>{actions}</div>}
    </div>
  );
}

export default EmptyState;
