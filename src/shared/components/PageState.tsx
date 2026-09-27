import type { ReactNode } from 'react';
import { EmptyState } from '@/design-system';
import * as s from './PageState.css';

type PageStateProps = {
  icon: ReactNode;
  tone?: 'brand' | 'danger';
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
};

/** 페이지 전체를 대신하는 안내 (로그인 필요, 찾을 수 없음, 오류). 제목이 페이지의 h1이에요. */
export function PageState({
  icon,
  tone,
  title,
  description,
  actions,
}: PageStateProps) {
  return (
    <div className={s.root}>
      <EmptyState
        titleAs='h1'
        icon={icon}
        tone={tone}
        title={title}
        description={description}
        actions={actions}
      />
    </div>
  );
}
