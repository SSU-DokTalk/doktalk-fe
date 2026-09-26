import { CheckoutModal } from '@/components/Payments/CheckoutModal';
import type { Debate } from '@/shared/api/models';

/**
 * 기존 토스 결제 창을 그대로 써요. 결제 화면은 마지막 단계(인증·설정·결제)에서 새로 만들어요.
 * 키는 토스 공식 문서의 테스트 키라서 실제 결제는 되지 않아요.
 */
const TOSS_TEST_KEYS = {
  clientKey: 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm',
  customerKey: 'GSpd_oQzjDH9sGptWJQSg',
};

export function DebateCheckout({
  debate,
  open,
  onOpenChange,
}: {
  debate: Debate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <CheckoutModal
      checkoutKey={TOSS_TEST_KEYS}
      checkoutAmount={{ value: debate.price, currency: 'KRW' }}
      checkoutData={{
        // 결제마다 달라야 해요 (영문·숫자·-·_ 6~64자)
        orderId: `debate-${debate.id}-${Date.now()}`,
        orderName: debate.title.slice(0, 100),
      }}
      showModal={open}
      setShowModal={(value) =>
        onOpenChange(typeof value === 'function' ? value(open) : value)
      }
      tmp={{
        product_type: 'D',
        product_id: debate.id,
        content: debate.title,
        price: debate.price,
        quantity: 1,
      }}
    />
  );
}
