import { Lock } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, buttonStyles } from '@/design-system';
import type { Summary } from '@/shared/api/models';
import { useFormat } from '@/shared/format';
import type { SummaryAccess } from '../useSummaryAccess';
import * as s from './SummaryDetail.css';

/** 본문 안의 결제 안내. 로그인 전·유료·무료에 따라 버튼이 달라요. */
export function SummaryPaywall({
  summary,
  access,
  onPay,
}: {
  summary: Summary;
  access: SummaryAccess;
  onPay: () => void;
}) {
  const { t } = useTranslation();
  const format = useFormat();
  const titleId = useId();
  const free = summary.price <= 0;

  return (
    <section aria-labelledby={titleId} className={s.paywall}>
      <span className={s.paywallIcon} aria-hidden='true'>
        <Lock />
      </span>
      <h2 id={titleId} className={s.paywallTitle}>
        {!access.isLoggedIn
          ? t('page.summary-detail.paywall.login')
          : free
            ? t('page.summary-detail.paywall.free-title')
            : t('page.summary-detail.paywall.title')}
      </h2>
      {access.isLoggedIn && (
        <p className={s.paywallNote}>
          {free
            ? t('page.summary-detail.paywall.free-note')
            : t('page.summary-detail.paywall.note')}
        </p>
      )}
      <p className={s.paywallPrice}>
        {free ? t('component.stats.free') : format.price(summary.price)}
      </p>
      <div className={s.paywallActions}>
        {!access.isLoggedIn ? (
          <Link to='/login' className={buttonStyles({ size: 'lg' })}>
            {t('component.topnav.login')}
          </Link>
        ) : free ? (
          <Button
            size='lg'
            loading={access.unlock.isPending}
            onClick={() => access.unlock.mutate()}
          >
            {t('page.summary-detail.paywall.read-free')}
          </Button>
        ) : (
          <Button size='lg' onClick={onPay}>
            {t('page.summary-detail.paywall.pay')}
          </Button>
        )}
      </div>
      {access.unlock.isError && (
        <p role='alert' className={s.alert}>
          {t('page.summary-detail.paywall.error')}
        </p>
      )}
    </section>
  );
}
