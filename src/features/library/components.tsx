import { BookmarkCheck, BookmarkPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Badge, Button, buttonStyles, type ButtonProps } from '@/design-system';
import { useToggleLibrary } from './api';
import { useAuthHref } from '@/features/auth/redirect';

type LibraryActionsProps = {
  isbn: number;
  title: string;
  inLibrary: boolean;
  viewerId: number;
  size?: ButtonProps['size'];
  /** 좁은 칸(격자)에서는 담김 표시 없이 버튼 하나만 */
  compact?: boolean;
};

/**
 * 내 서재 담기·빼기. 담긴 책은 "서재에 담김" 표시와 빼기 버튼을 보여줘요.
 * 로그아웃이면 로그인으로 보내요.
 */
export function LibraryActions({
  isbn,
  title,
  inLibrary,
  viewerId,
  size = 'md',
  compact = false,
}: LibraryActionsProps) {
  const { t } = useTranslation();
  const loginHref = useAuthHref();
  const toggle = useToggleLibrary(viewerId);

  if (viewerId <= 0) {
    return (
      <Link
        to={loginHref}
        className={buttonStyles({ variant: 'secondary', size })}
      >
        <BookmarkPlus aria-hidden='true' />
        {t('component.card.book.button.add-to-library')}
      </Link>
    );
  }

  const addLabel = t('component.card.book.button.add-to-library');

  // 좁은 칸: 누른 상태(aria-pressed)로 담김을 알리는 토글 하나
  if (compact) {
    return (
      <Button
        variant={inLibrary ? 'tonal' : 'secondary'}
        size={size}
        fullWidth
        aria-pressed={inLibrary}
        aria-label={`${addLabel}: ${title}`}
        disabled={toggle.isPending}
        onClick={() => toggle.mutate({ isbn, add: !inLibrary })}
      >
        {inLibrary ? (
          <BookmarkCheck aria-hidden='true' />
        ) : (
          <BookmarkPlus aria-hidden='true' />
        )}
        {addLabel}
      </Button>
    );
  }

  if (inLibrary) {
    return (
      <>
        <Badge
          tone='brand'
          size='lg'
          icon={<BookmarkCheck aria-hidden='true' />}
        >
          {t('page.search.library.added')}
        </Badge>
        <Button
          variant='plain'
          size={size}
          aria-label={`${t('component.card.book.button.remove-from-library')}: ${title}`}
          disabled={toggle.isPending}
          onClick={() => toggle.mutate({ isbn, add: false })}
        >
          {t('component.card.book.button.remove-from-library')}
        </Button>
      </>
    );
  }

  return (
    <Button
      variant='secondary'
      size={size}
      aria-label={`${addLabel}: ${title}`}
      disabled={toggle.isPending}
      onClick={() => toggle.mutate({ isbn, add: true })}
    >
      <BookmarkPlus aria-hidden='true' />
      {addLabel}
    </Button>
  );
}
