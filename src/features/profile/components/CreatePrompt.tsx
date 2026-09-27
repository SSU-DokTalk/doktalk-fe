import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { buttonStyles } from '@/design-system';
import * as s from './ProfileSections.css';

type CreatePromptProps = {
  icon: ReactNode;
  /** 버튼 앞 아이콘 */
  actionIcon: ReactNode;
  title: string;
  description: string;
  to: string;
  label: string;
  /** 모바일에서 쓸 짧은 이름 (몽골어처럼 긴 이름이 설명을 좁히지 않게) */
  shortLabel?: string;
};

/** 탭 맨 위의 쓰기·만들기 안내 (토론방 만들기, 요약 쓰기) */
export function CreatePrompt({
  icon,
  actionIcon,
  title,
  description,
  to,
  label,
  shortLabel,
}: CreatePromptProps) {
  return (
    <div className={s.prompt}>
      <span aria-hidden='true' className={s.promptIcon}>
        {icon}
      </span>
      <div className={s.promptText}>
        <p className={s.promptTitle}>{title}</p>
        <p className={s.promptDescription}>{description}</p>
      </div>
      <Link
        to={to}
        // 짧은 이름도 전체 이름 안에 들어 있어서, 읽을 때는 전체 이름을 써요.
        aria-label={shortLabel ? label : undefined}
        className={`${buttonStyles({ variant: 'primary' })} ${s.promptAction}`}
      >
        {actionIcon}
        {shortLabel ? (
          <>
            <span className={s.fullLabel}>{label}</span>
            <span className={s.shortLabel}>{shortLabel}</span>
          </>
        ) : (
          label
        )}
      </Link>
    </div>
  );
}
