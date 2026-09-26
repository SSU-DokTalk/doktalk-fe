import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import ChatbotFloatingButton from '@/components/floating/ChatbotFloatingButton';
import Footer from '@/components/footers/Footer';
import BottomTabs from './BottomTabs';
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
export function AppShell() {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
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
      <ChatbotFloatingButton />
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

/**
 * 마이페이지·프로필·설정. 아직 기존 페이지가 폭을 스스로 정해서 틀은 넓이를 건드리지 않아요.
 * 페이지를 새로 만들 때 가운데 880px 틀로 옮겨요.
 */
export function PageLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <SiteLinks variant='bar' />
    </>
  );
}

/** 랜딩. 기존 푸터를 그대로 써요. */
export function LandingLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
