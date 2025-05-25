import { useState } from 'react';

import { CheckoutModal } from './CheckoutModal';

export function CheckoutButton({}: {}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className='checkout-container'>
        <span className='checkout-button' onClick={() => setShowModal(true)}>
          결제하기 →
        </span>
        <CheckoutModal
          data={{
            clientKey: 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm', // 공식문서에 있는 테스트용 키
            customerKey: 'GSpd_oQzjDH9sGptWJQSg', // 공식문서에 있는 테스트용 키
            amount: {
              currency: 'KRW',
              value: 100,
            },
          }}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </>
  );
}
