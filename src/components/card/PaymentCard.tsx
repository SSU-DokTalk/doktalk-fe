import { getDate } from '@/functions';
import { PaymentType } from '@/types/data';
import { useTranslation } from 'react-i18next';

function PaymentCard({ payment }: { payment: PaymentType }) {
  const { t } = useTranslation();

  return (
    <div id='payment-card'>
      <div className='created-date'>{getDate(new Date(payment.created))}</div>
      <div className='detailed-info'>
        <div className='detail'>
          {payment.content}{' '}
          {payment.is_deleted ? t('component.card.payment.cancelled') : ''}
        </div>
        <div className='price'>
          {payment.price * payment.quantity}
          {t('component.card.payment.currency')}
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
