import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CheckoutModal } from './CheckoutModal';
import { CheckoutAmount, CheckoutData, CheckoutKey } from './CheckoutType';

export function CheckoutButton({
  checkoutKey,
  checkoutAmount,
  checkoutData,
  tmp,
}: {
  checkoutKey: CheckoutKey;
  checkoutAmount: CheckoutAmount;
  checkoutData: CheckoutData;
  tmp: Object;
}) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className='checkout-container'>
        <span className='checkout-button' onClick={() => setShowModal(true)}>
          {t('component.payments.checkout-button')}
        </span>
        <CheckoutModal
          checkoutKey={checkoutKey}
          checkoutAmount={checkoutAmount}
          checkoutData={checkoutData}
          showModal={showModal}
          setShowModal={setShowModal}
          tmp={tmp}
        />
      </div>
    </>
  );
}
