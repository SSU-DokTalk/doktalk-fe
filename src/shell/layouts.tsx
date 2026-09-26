import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import ChatbotFloatingButton from '@/components/floating/ChatbotFloatingButton';
import BottomTabs from './BottomTabs';
import LandingFooter from './LandingFooter';
import { useAuth, useHtmlLang } from './hooks';
import MobileTopBar from './MobileTopBar';
import SideColumn from './SideColumn';
import SiteLinks from './SiteLinks';
import TopNav from './TopNav';
import * as s from './shell.css';

/**
 * 앱 전체 틀: 상단 내비(데스크톱) / 모바일 상단 바, 본문, 모바일 하단 탭, 챗봇 버튼.
 * 로그인·회원가입·결제 결과 화면은 이 틀 밖에 있어요.
 */
/** 글쓰기 화면은 아래에 저장 버튼 줄이 붙어서 챗봇 버튼을 숨겨요. */
const FORM_ROUTE = /\/(create|update)\/?$/;

export function AppShell() {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();
  useHtmlLang();

  return (
    <div className={s.app}>
      <a href='#main-content' className={s.skipLink}>
        {t('component.shell.skip-to-content')}
      </a>
      <TopNav />
      <MobileTopBar />
      <div
        id='main-content'
        tabIndex={-1}
        className={clsx(s.content, isLoggedIn && s.withBottomTabs)}
      >
        <Outlet />
      </div>
      {isLoggedIn && <BottomTabs />}
      {!FORM_ROUTE.test(pathname) && <ChatbotFloatingButton />}
    </div>
  );
}

/** 왼쪽 칼럼 + 본문. 목록·상세·작성 화면이 이 틀을 써요. */
export function SideColumnLayout() {
  return (
    <div className={s.columns}>
      <SideColumn className={s.side} />
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
}

/** 마이페이지·프로필·설정·결제 결과·404. 왼쪽 칼럼 없이 가운데 880px 틀이에요. */
export function PageLayout() {
  return (
    <>
      <main className={s.centered}>
        <Outlet />
      </main>
      <SiteLinks variant='bar' />
    </>
  );
}

/** 로그아웃 랜딩. 넓은 구역들 아래에 어두운 푸터가 붙어요. */
export function LandingLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <LandingFooter />
    </>
  );
}
