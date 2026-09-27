import clsx from 'clsx';
import { ImagePlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, buttonStyles, IconButton } from '@/design-system';
import { useAuthHref } from '@/features/auth/redirect';
import { useAuth } from '@/shell/hooks';
import * as s from './WritePrompt.css';

export type WritePromptProps = {
  /** 입력칸이나 사진 버튼을 누르면 글쓰기 창을 열어요. */
  onOpen: () => void;
  /** 사진 추가 버튼도 같이 보여줘요 (홈). */
  withPhoto?: boolean;
  /** 모바일 위아래 회색 띠 없이 (다른 구역 사이에 끼울 때: 홈, 내 프로필) */
  flat?: boolean;
};

/**
 * "무슨 생각을 하고 있나요?" 줄. 로그인한 사람의 사진과 가짜 입력칸을 보여주고,
 * 로그아웃 상태면 로그인 안내로 바꿔요.
 */
export function WritePrompt({
  onOpen,
  withPhoto = false,
  flat = false,
}: WritePromptProps) {
  const { t } = useTranslation();
  const { user, isLoggedIn } = useAuth();
  const loginHref = useAuthHref();
  const name = user.name || t('component.user.unknown');

  return (
    <div className={clsx(s.prompt, flat && s.flat)}>
      {isLoggedIn ? (
        <>
          <Avatar name={name} src={user.profile} size={40} />
          <button
            type='button'
            aria-haspopup='dialog'
            className={s.field}
            onClick={onOpen}
          >
            {t('component.card.write-post.placeholder')}
          </button>
          {withPhoto && (
            <IconButton
              variant='ghost'
              aria-label={t('component.modal.write-post.button.add-photo')}
              aria-haspopup='dialog'
              onClick={onOpen}
            >
              <ImagePlus />
            </IconButton>
          )}
        </>
      ) : (
        <>
          <p className={s.loginText}>{t('page.post.login-prompt')}</p>
          <Link
            to={loginHref}
            className={buttonStyles({ variant: 'primary', size: 'sm' })}
          >
            {t('component.topnav.login')}
          </Link>
        </>
      )}
    </div>
  );
}
