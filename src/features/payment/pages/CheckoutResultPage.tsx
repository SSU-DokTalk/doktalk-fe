import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { Check, ReceiptText, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, buttonStyles, Spinner } from '@/design-system';
import { api, httpStatus } from '@/shared/api/client';
import { useFormat } from '@/shared/format';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { purchaseKeys } from '../api';
import {
  decodePurchase,
  productPath,
  safeProductPath,
  type PendingPurchase,
} from '../checkout';
import * as s from './CheckoutResultPage.css';

type Row = { label: string; value: ReactNode };

function ResultCard({
  tone,
  title,
  lead,
  rows,
  actions,
}: {
  tone: 'success' | 'fail';
  title: string;
  lead: string;
  rows: Row[];
  actions: ReactNode;
}) {
  return (
    <div className={s.card}>
      <span
        aria-hidden='true'
        className={clsx(
          s.icon,
          tone === 'success' ? s.iconSuccess : s.iconFail
        )}
      >
        {tone === 'success' ? <Check /> : <X />}
      </span>
      <div className={s.texts}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.lead}>{lead}</p>
      </div>
      {rows.length > 0 && (
        <dl className={s.details}>
          {rows.map((row) => (
            <div key={row.label} className={s.detail}>
              <dt className={s.term}>{row.label}</dt>
              <dd className={s.value}>{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className={s.actions}>{actions}</div>
    </div>
  );
}

/** 결제 성공: 구매 기록을 만든 뒤 결과를 보여줘요. 새로고침해도 한 번만 남아요(409). */
function SuccessResult({ purchase }: { purchase: PendingPurchase }) {
  const { t } = useTranslation();
  const format = useFormat();
  const [params] = useSearchParams();
  const queryClient = useQueryClient();
  const [paidAt] = useState(() => new Date());
  const started = useRef(false);
  const record = useMutation({
    mutationFn: async () => {
      try {
        await api.post('/purchase', { body: purchase });
      } catch (error) {
        if (httpStatus(error) !== 409) throw error;
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
      void queryClient.invalidateQueries({
        queryKey: [purchase.product_type === 'D' ? 'debates' : 'summaries'],
      });
    },
  });

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    record.mutate();
  }, [record]);

  const product = productPath(purchase.product_type, purchase.product_id);
  const target = safeProductPath(params.get('redirect'), product);
  const amount = Number(params.get('amount') ?? purchase.price);

  if (record.isPending || record.isIdle) {
    return (
      <div className={s.card}>
        <Spinner label={t('page.checkout.result.checking')} showLabel />
      </div>
    );
  }

  if (record.isError) {
    return (
      <ResultCard
        tone='fail'
        title={t('page.checkout.result.record-error-title')}
        lead={t('page.checkout.result.record-error-lead')}
        rows={[
          { label: t('page.checkout.result.item'), value: purchase.content },
          {
            label: t('page.checkout.result.order'),
            value: params.get('orderId') ?? '–',
          },
        ]}
        actions={
          <>
            <Button size='lg' fullWidth onClick={() => record.mutate()}>
              {t('page.debate.item.retry')}
            </Button>
            <Link
              to='/contact'
              className={buttonStyles({ variant: 'neutral', size: 'lg' })}
            >
              {t('footer.support.contact')}
            </Link>
          </>
        }
      />
    );
  }

  return (
    <ResultCard
      tone='success'
      title={t('page.checkout.result.success-title')}
      lead={t(`page.checkout.result.success-lead.${purchase.product_type}`)}
      rows={[
        { label: t('page.checkout.result.item'), value: purchase.content },
        {
          label: t('page.checkout.result.amount'),
          value: format.price(amount),
        },
        {
          label: t('page.checkout.result.date'),
          value: `${format.date(paidAt)} ${format.time(paidAt)}`,
        },
        {
          label: t('page.checkout.result.order'),
          value: params.get('orderId') ?? '–',
        },
      ]}
      actions={
        <>
          <Link
            to={target}
            replace
            className={buttonStyles({ size: 'lg', fullWidth: true })}
          >
            {t(
              purchase.product_type === 'D'
                ? 'page.checkout.result.go-debate'
                : 'page.checkout.result.read-summary'
            )}
          </Link>
          <Link
            to='/mypage?tab=payment'
            className={buttonStyles({
              variant: 'neutral',
              size: 'lg',
              fullWidth: true,
            })}
          >
            {t('page.checkout.result.payments')}
          </Link>
        </>
      }
    />
  );
}

function FailResult({ purchase }: { purchase: PendingPurchase | null }) {
  const { t } = useTranslation();
  const format = useFormat();
  const [params] = useSearchParams();
  const fallback = purchase
    ? productPath(purchase.product_type, purchase.product_id)
    : '/';
  const target = safeProductPath(params.get('redirect'), fallback);
  const rows: Row[] = [];
  if (purchase) {
    rows.push(
      { label: t('page.checkout.result.item'), value: purchase.content },
      {
        label: t('page.checkout.result.amount'),
        value: format.price(purchase.price),
      }
    );
  }
  rows.push(
    {
      label: t('page.checkout.result.reason'),
      value: params.get('message') ?? '–',
    },
    { label: t('page.checkout.result.code'), value: params.get('code') ?? '–' }
  );

  return (
    <ResultCard
      tone='fail'
      title={t('page.checkout.result.fail-title')}
      lead={t('page.checkout.result.fail-lead')}
      rows={rows}
      actions={
        <>
          {/* 상세 화면으로 돌아가면서 결제 창을 바로 다시 열어요. */}
          <Link
            to={target}
            replace
            state={{ openCheckout: true }}
            className={buttonStyles({ size: 'lg', fullWidth: true })}
          >
            {t('page.checkout.result.retry')}
          </Link>
          <Link
            to={target}
            replace
            className={buttonStyles({
              variant: 'neutral',
              size: 'lg',
              fullWidth: true,
            })}
          >
            {t('page.checkout.result.back')}
          </Link>
        </>
      }
    />
  );
}

/** 결제 결과 (/checkout/success · /checkout/fail). 토스 결제 창에서 돌아와요. */
function CheckoutResultPage({ result }: { result: 'success' | 'fail' }) {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [purchase] = useState(() => decodePurchase(params.get('tmp')));

  useDocumentTitle(
    t(
      result === 'success'
        ? 'page.checkout.result.success-title'
        : 'page.checkout.result.fail-title'
    )
  );

  if (result === 'fail') return <FailResult purchase={purchase} />;

  if (!purchase) {
    return (
      <ResultCard
        tone='fail'
        title={t('page.checkout.result.missing-title')}
        lead={t('page.checkout.result.missing-lead')}
        rows={[]}
        actions={
          <Link
            to='/mypage?tab=payment'
            className={buttonStyles({ size: 'lg', fullWidth: true })}
          >
            <ReceiptText aria-hidden='true' />
            {t('page.checkout.result.payments')}
          </Link>
        }
      />
    );
  }

  return <SuccessResult purchase={purchase} />;
}

export default CheckoutResultPage;
