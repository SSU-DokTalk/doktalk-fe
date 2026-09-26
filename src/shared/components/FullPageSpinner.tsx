import { useTranslation } from 'react-i18next';
import { Spinner } from '@/design-system';
import * as s from './FullPageSpinner.css';

/** 화면 전체를 기다릴 때 (앱 시작 시 로그인 확인 등) */
export function FullPageSpinner({
  label,
  showLabel = false,
}: {
  label?: string;
  showLabel?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className={s.root}>
      <Spinner
        size='lg'
        showLabel={showLabel}
        label={label ?? t('component.base.infinite-scroll.loading')}
      />
    </div>
  );
}
