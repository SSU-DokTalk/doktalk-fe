import { useState } from 'react';

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
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className='checkout-container'>
        <span className='checkout-button' onClick={() => setShowModal(true)}>
          결제하기 →
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
