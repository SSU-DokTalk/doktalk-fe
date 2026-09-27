import { ChevronLeft, ChevronRight, ReceiptText } from 'lucide-react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  EmptyState,
  IconButton,
  Skeleton,
  visuallyHidden,
} from '@/design-system';
import type { Purchase } from '@/shared/api/models';
import { parseServerDate, useFormat } from '@/shared/format';
import { useMonthlyPurchases } from '../api';
import * as s from './PaymentHistory.css';

type Month = { year: number; month: number };

const shiftMonth = ({ year, month }: Month, delta: number): Month => {
  const date = new Date(year, month + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
};

function PaymentRow({ purchase }: { purchase: Purchase }) {
  const { t } = useTranslation();
  const format = useFormat();
  const state = purchase.is_deleted ? 'cancelled' : 'paid';
  const amount = purchase.price * purchase.quantity;
  const created = parseServerDate(purchase.created);
  const to =
    purchase.product_type === 'D'
      ? `/debate/${purchase.product_id}`
      : `/summary/${purchase.product_id}`;

  return (
    <li className={s.row}>
      <span className={s.text}>
        <span className={s.badges}>
          <Badge
            tone={purchase.product_type === 'D' ? 'brand' : 'info'}
            size='sm'
          >
            {t(`page.profile.payments.type.${purchase.product_type}`)}
          </Badge>
          {purchase.is_deleted && (
            <Badge tone='danger' size='sm'>
              {t('page.profile.payments.cancelled')}
            </Badge>
          )}
        </span>
        <Link to={to} className={s.title[state]}>
          {purchase.content?.trim() || t('page.profile.payments.untitled')}
        </Link>
        <time dateTime={created.toISOString()} className={s.date}>
          {format.meetingDateTime(created)}
        </time>
      </span>
      <span className={s.price[state]}>
        {amount > 0 ? format.price(amount) : t('component.stats.free')}
      </span>
    </li>
  );
}

function PaymentsSkeleton() {
  const { t } = useTranslation();
  return (
    <ul
      role='status'
      aria-label={t('component.base.infinite-scroll.loading')}
      className={s.list}
    >
      {[0, 1, 2].map((index) => (
        <li key={index} className={s.row}>
          <span className={s.text}>
            <Skeleton width={48} height={20} />
            <Skeleton width='70%' height={18} />
            <Skeleton width={110} height={14} />
          </span>
          <Skeleton width={72} height={20} />
        </li>
      ))}
    </ul>
  );
}

/** 결제 내역. 달마다 보고, 합계에서는 취소한 결제를 빼요. */
export function PaymentHistory({ viewerId }: { viewerId: number }) {
  const { t } = useTranslation();
  const format = useFormat();
  const [today] = useState(() => new Date());
  const [month, setMonth] = useState<Month>({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const query = useMonthlyPurchases(viewerId, month.year, month.month);
  const monthId = useId();
  const listId = useId();
  const isCurrentMonth =
    month.year === today.getFullYear() && month.month === today.getMonth();

  const labelOf = ({ year, month: index }: Month) =>
    t('page.profile.payments.month-label', {
      year,
      month: t(`function.time.months.${index + 1}`),
    });
  const label = labelOf(month);
  const purchases = query.data ?? [];
  const total = purchases
    .filter((purchase) => !purchase.is_deleted)
    .reduce((sum, purchase) => sum + purchase.price * purchase.quantity, 0);

  const renderList = () => {
    if (query.isPending) return <PaymentsSkeleton />;
    if (query.isError && !query.data) {
      return (
        <div className={s.state}>
          <EmptyState
            tone='danger'
            icon={<ReceiptText />}
            title={t('page.profile.payments.error')}
            description={t('page.profile.state.error-description')}
            actions={
              <Button variant='outline' onClick={() => void query.refetch()}>
                {t('page.debate.item.retry')}
              </Button>
            }
          />
        </div>
      );
    }
    if (purchases.length === 0) {
      return (
        <div className={s.state}>
          <EmptyState
            icon={<ReceiptText />}
            title={t('page.profile.payments.empty')}
          />
        </div>
      );
    }
    return (
      <>
        <ul className={s.list}>
          {purchases.map((purchase) => (
            <PaymentRow key={purchase.id} purchase={purchase} />
          ))}
        </ul>
        <p className={s.note}>{t('page.profile.payments.cancelled-note')}</p>
      </>
    );
  };

  return (
    <>
      <section aria-labelledby={monthId} className={s.monthCard}>
        <div className={s.monthNav}>
          <IconButton
            variant='ghost'
            aria-label={t('page.profile.payments.previous-month', {
              label: labelOf(shiftMonth(month, -1)),
            })}
            onClick={() => setMonth((current) => shiftMonth(current, -1))}
          >
            <ChevronLeft />
          </IconButton>
          <h2 id={monthId} aria-live='polite' className={s.month}>
            {label}
          </h2>
          <IconButton
            variant='ghost'
            // 이번 달이면 다음 달로 갈 수 없어요. disabled는 포커스를 잃어서 aria-disabled를 써요.
            aria-disabled={isCurrentMonth}
            aria-label={t('page.profile.payments.next-month', {
              label: labelOf(shiftMonth(month, 1)),
            })}
            onClick={() => {
              if (!isCurrentMonth) {
                setMonth((current) => shiftMonth(current, 1));
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        </div>
        <div className={s.total}>
          <span className={s.totalLabel}>
            {t('page.profile.payments.total')}
          </span>
          <span className={s.totalValue}>
            {query.data ? format.price(total) : '–'}
          </span>
        </div>
      </section>

      <section
        aria-labelledby={listId}
        aria-busy={query.isPlaceholderData || undefined}
        className={s.listCard}
      >
        <h2 id={listId} className={visuallyHidden}>
          {t('page.profile.payments.list', { label })}
        </h2>
        {renderList()}
      </section>
    </>
  );
}
