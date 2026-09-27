import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import { LandingHome } from '../components/landing/LandingHome';
import { MainHome } from '../components/main/MainHome';

/** 첫 화면 (/). 로그아웃이면 소개 랜딩, 로그인하면 내 홈이에요. */
function HomePage() {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  useDocumentTitle(isLoggedIn ? t('component.topnav.main-page') : undefined);

  return isLoggedIn ? <MainHome /> : <LandingHome />;
}

export default HomePage;
