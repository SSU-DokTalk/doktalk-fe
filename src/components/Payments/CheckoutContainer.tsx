import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CheckoutButton } from './CheckoutButton';
import { CheckoutAmount, CheckoutData, CheckoutKey } from './CheckoutType';

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
  return (
    <div className='payment__container'>
      <pre className='content__text charged-content'>{charged_content}</pre>
      <div className='payment__box '>
        <p className='payment__box__title'>
          이어서 읽으시려면 결제가 필요합니다.
        </p>

        <div className='payment__box__info'>
          <button className='box into-cart'>
            <FontAwesomeIcon icon={faCartPlus} />
            {''} 찜
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
