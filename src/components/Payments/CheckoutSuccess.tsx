import { useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useSearchParams } from 'react-router-dom';

export function CheckoutSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.

    const requestData = JSON.parse(
      decodeURI(atob(searchParams.get('tmp') ?? ''))
    );

    // TODO: 인증 절차는 추후 백엔드에서 구현 후 작업할 예정
    axios.post(`/api/purchase`, requestData).then(() => {
      navigate(searchParams.get('redirect') ?? '#');
    });
  }, []);

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <h2>결제 성공</h2>
        <p>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get('amount')
        ).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
        <a>redirect: {window.location.origin + searchParams.get('redirect')}</a>
      </div>
    </div>
  );
}
