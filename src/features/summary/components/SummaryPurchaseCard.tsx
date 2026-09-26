import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  buttonStyles,
  Skeleton,
  visuallyHidden,
} from '@/design-system';
import type { Summary } from '@/shared/api/models';
import { useFormat } from '@/shared/format';
import type { SummaryAccess } from '../useSummaryAccess';
import * as s from './SummaryDetail.css';

/** 오른쪽 칸의 구매 카드 (xl 이상) */
export function SummaryPurchaseCard({
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
  const headingId = useId();
  const free = summary.price <= 0;

  const renderBody = () => {
    if (access.isOwner) {
      return (
        <>
          <Badge tone='brand' size='md'>
            {t('page.summary-detail.badge.own')}
          </Badge>
          <p className={s.purchaseNote}>
            {t('page.summary-detail.owner.note')}
          </p>
        </>
      );
    }

    if (access.checking) return <Skeleton height={96} radius={12} />;

    if (access.unlocked) {
      const purchase = access.purchase.data;
      return (
        <>
          <Badge tone='brand' size='md'>
            {free
              ? t('page.summary-detail.badge.free')
              : t('page.summary-detail.rail.purchased')}
          </Badge>
          {purchase && !free && (
            <p className={s.purchaseNote}>
              {t('page.summary-detail.rail.purchased-note', {
                date: format.date(purchase.created),
                price: format.price(purchase.price * purchase.quantity),
              })}
            </p>
          )}
          <Link
            to='/mypage/library'
            className={buttonStyles({ variant: 'tonal', fullWidth: true })}
          >
            {t('page.summary-detail.rail.library-link')}
          </Link>
          {!free && (
            <Link
              to='/mypage?tab=payment'
              className={buttonStyles({ variant: 'outline', fullWidth: true })}
            >
              {t('page.summary-detail.rail.payments-link')}
            </Link>
          )}
        </>
      );
    }

    return (
      <>
        <p className={s.purchaseLabel}>{t('page.summary-detail.rail.full')}</p>
        <p className={s.purchasePrice}>
          {free ? t('component.stats.free') : format.price(summary.price)}
        </p>
        {!access.isLoggedIn ? (
          <Link
            to='/login'
            className={buttonStyles({ size: 'lg', fullWidth: true })}
          >
            {t('component.topnav.login')}
          </Link>
        ) : free ? (
          <Button
            size='lg'
            fullWidth
            loading={access.unlock.isPending}
            onClick={() => access.unlock.mutate()}
          >
            {t('page.summary-detail.paywall.read-free')}
          </Button>
        ) : (
          <Button size='lg' fullWidth onClick={onPay}>
            {t('page.summary-detail.paywall.pay')}
          </Button>
        )}
        {!free && (
          <p className={s.purchaseNote}>
            {t('page.summary-detail.rail.toss-note')}
          </p>
        )}
      </>
    );
  };

  return (
    <section aria-labelledby={headingId} className={s.purchaseCard}>
      <h2 id={headingId} className={visuallyHidden}>
        {t('page.summary-detail.rail.label')}
      </h2>
      {renderBody()}
    </section>
  );
}
