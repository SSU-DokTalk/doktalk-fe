import { useSearchParams } from 'react-router-dom';

export function CheckoutFail() {
  const [searchParams] = useSearchParams();

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <h2>결제 실패</h2>
        <p>{`에러 코드: ${searchParams.get('code')}`}</p>
        <p>{`실패 사유: ${searchParams.get('message')}`}</p>
        <a>redirect: {window.location.origin + searchParams.get('redirect')}</a>
      </div>
    </div>
  );
}
