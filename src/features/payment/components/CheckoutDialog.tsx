import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { BookCover, Button, Dialog, mq, Spinner } from '@/design-system';
import { useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { encodePurchase, type ProductType } from '../checkout';
import * as s from './CheckoutDialog.css';

/**
 * 토스 공식 문서의 테스트 키라서 실제 결제는 되지 않아요.
 * 운영 키로 바꾸는 일은 서버 결제 확인 작업과 같이 해요.
 */
const TOSS_TEST_KEYS = {
  clientKey: 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm',
  customerKey: 'GSpd_oQzjDH9sGptWJQSg',
};

const METHOD_ID = 'checkout-payment-method';
const AGREEMENT_ID = 'checkout-agreement';

export type CheckoutProduct = {
  type: ProductType;
  id: number;
  title: string;
  price: number;
  /** 주문 상품 칸의 표지 */
  cover?: { title: string; src?: string | null };
  /** 작성자 · 책 제목 */
  meta?: string;
};

type WidgetState = 'loading' | 'ready' | 'error';

/** 결제 위젯을 그려요. 창을 열 때마다 새로 만들고 닫으면 정리해요. */
function useTossWidgets(product: CheckoutProduct) {
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [state, setState] = useState<WidgetState>('loading');

  useEffect(() => {
    let cancelled = false;
    const rendered: { destroy: () => Promise<void> }[] = [];

    (async () => {
      try {
        const toss = await loadTossPayments(TOSS_TEST_KEYS.clientKey);
        const next = toss.widgets({ customerKey: TOSS_TEST_KEYS.customerKey });
        await next.setAmount({ value: product.price, currency: 'KRW' });
        if (cancelled) return;
        const [methods, agreement] = await Promise.all([
          next.renderPaymentMethods({
            selector: `#${METHOD_ID}`,
            variantKey: 'DEFAULT',
          }),
          next.renderAgreement({
            selector: `#${AGREEMENT_ID}`,
            variantKey: 'AGREEMENT',
          }),
        ]);
        rendered.push(methods, agreement);
        if (cancelled) return;
        setWidgets(next);
        setState('ready');
      } catch {
        if (!cancelled) setState('error');
      }
    })();

    return () => {
      cancelled = true;
      for (const widget of rendered) void widget.destroy().catch(() => {});
    };
  }, [product.price]);

  return { widgets, state };
}

function CheckoutBody({ product }: { product: CheckoutProduct }) {
  const { t } = useTranslation();
  const format = useFormat();
  const { pathname } = useLocation();
  const { widgets, state } = useTossWidgets(product);
  const [requestFailed, setRequestFailed] = useState(false);
  const price = format.price(product.price);

  const pay = async () => {
    if (!widgets) return;
    setRequestFailed(false);
    const purchase = encodePurchase({
      product_type: product.type,
      product_id: product.id,
      content: product.title,
      price: product.price,
      quantity: 1,
    });
    const back = (result: 'success' | 'fail') =>
      `${window.location.origin}/checkout/${result}?${new URLSearchParams({
        redirect: pathname,
        tmp: purchase,
      }).toString()}`;
    try {
      await widgets.requestPayment({
        // 결제마다 달라야 해요 (영문·숫자·-·_ 6~64자)
        orderId: `${product.type === 'D' ? 'debate' : 'summary'}-${product.id}-${Date.now()}`,
        orderName: product.title.slice(0, 100),
        successUrl: back('success'),
        failUrl: back('fail'),
      });
    } catch (error) {
      // 구매자가 결제 창을 닫은 경우는 알리지 않아요.
      const code = (error as { code?: string } | null)?.code;
      if (code !== 'USER_CANCEL') setRequestFailed(true);
    }
  };

  return (
    <>
      <div className={s.body}>
        <section aria-label={t('page.checkout.item')} className={s.item}>
          {product.cover && (
            <BookCover
              title={product.cover.title}
              src={product.cover.src}
              width={52}
            />
          )}
          <span className={s.itemText}>
            <span className={s.itemType}>
              {t(`page.checkout.type.${product.type}`)}
            </span>
            <span className={s.itemTitle}>{product.title}</span>
            {product.meta && <span className={s.itemMeta}>{product.meta}</span>}
          </span>
          <span className={s.itemPrice}>{price}</span>
        </section>

        <section>
          <h3 className={s.methodTitle}>{t('page.checkout.method')}</h3>
          {state === 'loading' && (
            <div className={s.widgetState}>
              <Spinner label={t('page.checkout.widget-loading')} showLabel />
            </div>
          )}
          {state === 'error' && (
            <p role='alert' className={s.widgetState}>
              {t('page.checkout.widget-error')}
            </p>
          )}
          {/* 토스 위젯이 이 두 칸에 결제 수단과 약관을 그려요. */}
          <div id={METHOD_ID} className={state === 'ready' ? s.widget : ''} />
          <div
            id={AGREEMENT_ID}
            className={state === 'ready' ? s.agreement : ''}
          />
        </section>

        <div className={s.total}>
          <span className={s.totalLabel}>{t('page.checkout.total')}</span>
          <span className={s.totalValue}>{price}</span>
        </div>
      </div>

      <div className={s.footer}>
        {requestFailed && (
          <p role='alert' className={s.error}>
            {t('page.checkout.request-error')}
          </p>
        )}
        <Button
          size='lg'
          fullWidth
          disabled={state !== 'ready'}
          onClick={() => void pay()}
        >
          {t('page.checkout.pay', { price })}
        </Button>
        <p className={s.note}>{t(`page.checkout.note.${product.type}`)}</p>
      </div>
    </>
  );
}

/** 결제 창. 데스크톱은 가운데, 모바일은 아래에서 올라와요. */
export function CheckoutDialog({
  product,
  open,
  onOpenChange,
}: {
  product: CheckoutProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content placement={isDesktop ? 'center' : 'bottom'} width={520}>
        <Dialog.Header
          title={t('page.checkout.title')}
          closeLabel={t('component.dialog.close')}
          divider
        />
        <CheckoutBody product={product} />
      </Dialog.Content>
    </Dialog.Root>
  );
}
