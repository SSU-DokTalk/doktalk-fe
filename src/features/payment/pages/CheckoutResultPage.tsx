import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
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
  useDocumentTitle(title);
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

function CheckingCard() {
  const { t } = useTranslation();
  useDocumentTitle(t('page.checkout.result.checking'));
  return (
    <div className={s.card}>
      <Spinner label={t('page.checkout.result.checking')} showLabel />
    </div>
  );
}

/** 토스가 결제 성공 주소에 붙여 주는 값 */
type TossRedirect = { paymentKey: string; orderId: string; amount: number };

function readTossRedirect(params: URLSearchParams): TossRedirect | null {
  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amount = Number(params.get('amount'));
  if (!paymentKey || !orderId || !Number.isInteger(amount) || amount <= 0) {
    return null;
  }
  return { paymentKey, orderId, amount };
}

type Declined = { code: string | null; message: string | null };

/**
 * 서버가 결제를 승인하지 않았으면(400·402·404) 이유를 꺼내요. 토스가 거절했으면 토스의 코드와 문구가 와요.
 * 그 밖의 실패(네트워크·5xx)는 결제가 됐는지 모르는 상태라 다시 확인하게 해요.
 */
function declinedReason(error: unknown): Declined | null {
  const status = httpStatus(error);
  if (status !== 400 && status !== 402 && status !== 404) return null;
  const data: unknown = isAxiosError(error) ? error.response?.data : undefined;
  const detail = (data as { detail?: unknown } | undefined)?.detail;
  if (typeof detail === 'string') return { code: detail, message: null };
  const { code, message } = (detail ?? {}) as {
    code?: unknown;
    message?: unknown;
  };
  return {
    code: typeof code === 'string' ? code : null,
    message: typeof message === 'string' ? message : null,
  };
}

/**
 * 결제 성공 주소로 돌아오면 서버에 결제 확인을 요청해요.
 * 서버가 금액을 확인하고 토스에 승인을 요청한 뒤 구매 기록을 남겨요. 새로고침해도 한 번만 남아요.
 */
function SuccessResult({
  purchase,
  payment,
}: {
  purchase: PendingPurchase;
  payment: TossRedirect;
}) {
  const { t } = useTranslation();
  const format = useFormat();
  const [params] = useSearchParams();
  const queryClient = useQueryClient();
  const [paidAt] = useState(() => new Date());
  const started = useRef(false);
  const confirmPayment = useMutation({
    mutationFn: async () => {
      try {
        await api.post('/purchase/confirm', {
          body: {
            product_type: purchase.product_type,
            product_id: purchase.product_id,
            payment_key: payment.paymentKey,
            order_id: payment.orderId,
            amount: payment.amount,
          },
        });
      } catch (error) {
        // 이미 산 상품이에요 (같은 결제를 두 번 확인한 경우 포함).
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
    confirmPayment.mutate();
  }, [confirmPayment]);

  const product = productPath(purchase.product_type, purchase.product_id);
  const target = safeProductPath(params.get('redirect'), product);

  if (confirmPayment.isPending || confirmPayment.isIdle)
    return <CheckingCard />;

  if (confirmPayment.isError) {
    const declined = declinedReason(confirmPayment.error);
    if (declined) {
      return (
        <FailResult
          purchase={purchase}
          code={declined.code}
          reason={declined.message}
        />
      );
    }
    return (
      <ResultCard
        tone='fail'
        title={t('page.checkout.result.confirm-error-title')}
        lead={t('page.checkout.result.confirm-error-lead')}
        rows={[
          { label: t('page.checkout.result.item'), value: purchase.content },
          {
            label: t('page.checkout.result.order'),
            value: payment.orderId,
          },
        ]}
        actions={
          <>
            <Button size='lg' fullWidth onClick={() => confirmPayment.mutate()}>
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
          value: format.price(payment.amount),
        },
        {
          label: t('page.checkout.result.date'),
          value: `${format.date(paidAt)} ${format.time(paidAt)}`,
        },
        {
          label: t('page.checkout.result.order'),
          value: payment.orderId,
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

/** 결제 실패. 토스 결제 창의 실패(주소의 code·message)와 서버가 승인하지 않은 경우에 보여줘요. */
function FailResult({
  purchase,
  code,
  reason,
}: {
  purchase: PendingPurchase | null;
  code: string | null;
  reason: string | null;
}) {
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
    { label: t('page.checkout.result.reason'), value: reason ?? '–' },
    { label: t('page.checkout.result.code'), value: code ?? '–' }
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
  const [payment] = useState(() => readTossRedirect(params));

  if (result === 'fail') {
    return (
      <FailResult
        purchase={purchase}
        code={params.get('code')}
        reason={params.get('message')}
      />
    );
  }

  if (!purchase || !payment) {
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

  return <SuccessResult purchase={purchase} payment={payment} />;
}

export default CheckoutResultPage;
