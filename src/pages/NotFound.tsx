import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();
  return <div>{t('page.not-found.message')}</div>;
}

export default NotFound;
