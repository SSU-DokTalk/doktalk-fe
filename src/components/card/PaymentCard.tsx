import { getDate } from "@/functions";
import { PaymentType } from "@/types/data";

function PaymentCard({ payment }: { payment: PaymentType }) {
  return (
    <div id="payment-card">
      <div className="created-date">{getDate(payment.created)}</div>
      <div className="detailed-info">
        <div className="detail">{payment.content}</div>
        <div className="price">{payment.price * payment.quantity}원</div>
      </div>
    </div>
  );
}

export default PaymentCard;
