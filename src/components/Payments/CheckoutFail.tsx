import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function CheckoutFail() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <h2>{t('component.payments.checkout-fail.title')}</h2>
        <p>{`${t('component.payments.checkout-fail.error-code')}: ${searchParams.get('code')}`}</p>
        <p>{`${t('component.payments.checkout-fail.fail-reason')}: ${searchParams.get('message')}`}</p>
        <a>redirect: {window.location.origin + searchParams.get('redirect')}</a>
      </div>
    </div>
  );
}
