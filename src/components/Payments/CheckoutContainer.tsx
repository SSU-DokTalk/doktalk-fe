import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import { CheckoutButton } from './CheckoutButton';
import { CheckoutAmount, CheckoutData } from './CheckoutType';

import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

export function CheckoutContainer({
  charged_content,
  checkoutAmount,
  checkoutData,
  tmp,
}: {
  charged_content: string;
  checkoutAmount: CheckoutAmount;
  checkoutData: CheckoutData;
  tmp: Object;
}) {
  const { t } = useTranslation();

  return (
    <div className='payment__container'>
      <pre className='content__text charged-content  whitespace-pre-wrap break-words'>
        {charged_content}
      </pre>
      <div className='payment__box '>
        <p className='payment__box__title'>
          {t('component.payments.checkout-container.message')}
        </p>

        <div className='payment__box__info'>
          <button className='box into-cart'>
            <FontAwesomeIcon icon={faCartPlus} />
            {''} {t('component.payments.checkout-container.wishlist')}
          </button>
          <div className='box purchase'>
            <span className='price'>
              {checkoutAmount.value} {checkoutAmount.currency}
            </span>

            <CheckoutButton
              checkoutAmount={checkoutAmount}
              checkoutData={checkoutData}
              // TODO: key는 따로 관리하기
              checkoutKey={{
                clientKey: 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm', // 공식문서에 있는 테스트용 키
                customerKey: 'GSpd_oQzjDH9sGptWJQSg', // 공식문서에 있는 테스트용 키
              }}
              tmp={tmp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
