import { Check, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  visuallyHidden,
  type IconButtonProps,
} from '@/design-system';
import { useShare } from '@/shared/hooks/useShare';

type ShareButtonProps = Pick<IconButtonProps, 'size' | 'className'> & {
  title: string;
  /** 공유할 주소. 없으면 지금 페이지 주소 */
  url?: string;
};

/** 공유 버튼. 주소를 복사하면 아이콘이 잠깐 체크로 바뀌고 스크린 리더에 알려요. */
export function ShareButton({ title, url, size, className }: ShareButtonProps) {
  const { t } = useTranslation();
  const { share, status } = useShare();

  return (
    <>
      <IconButton
        aria-label={t('component.share.share')}
        size={size}
        className={className}
        onClick={() => void share({ title, url: url ?? window.location.href })}
      >
        {status === 'copied' ? <Check /> : <Share2 />}
      </IconButton>
      <span role='status' className={visuallyHidden}>
        {status === 'copied' && t('component.share.copied')}
        {status === 'failed' && t('component.share.failed')}
      </span>
    </>
  );
}
