import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, mq } from '@/design-system';
import { FollowButton } from '@/features/user/components/FollowButton';
import type { UserBrief } from '@/shared/api/models';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import * as s from './AuthorRow.css';

type AuthorRowProps = {
  author: UserBrief;
  /** 이름 아래 작은 글씨 (2일 전 · 토론방 개설) */
  meta: ReactNode;
  /** 로그인한 사용자 id. 다른 사람이면 팔로우 버튼이 보여요. */
  viewerId: number;
  /** 오른쪽 끝 버튼 (공유·옵션) */
  actions?: ReactNode;
};

/** 상세 화면의 작성자 줄: 아바타, 이름(프로필 링크), 팔로우, 공유·옵션 */
export function AuthorRow({ author, meta, viewerId, actions }: AuthorRowProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const name = author.name || t('component.user.unknown');

  return (
    <div className={s.row}>
      <Avatar name={name} src={author.profile} size={40} />
      <Link to={`/user/${author.id}`} className={s.link}>
        <span className={s.name}>{name}</span>
        <span className={s.meta}>{meta}</span>
      </Link>
      <FollowButton
        targetId={author.id}
        viewerId={viewerId}
        size={isDesktop ? 'sm' : 'md'}
      />
      <span className={s.spacer} />
      {actions && <div className={s.actions}>{actions}</div>}
    </div>
  );
}
