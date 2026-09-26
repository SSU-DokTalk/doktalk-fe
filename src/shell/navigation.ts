import {
  FileText,
  Home,
  MessagesSquare,
  PenLine,
  Search,
  UserRound,
  type LucideIcon,
} from 'lucide-react';

export type NavItem = {
  key: string;
  labelKey: string;
  to: string;
  icon: LucideIcon;
  /** true면 경로가 정확히 같을 때만 활성 (홈) */
  end?: boolean;
};

/** 상단 내비·모바일 메뉴에 나오는 주요 메뉴 */
export const MAIN_NAV: NavItem[] = [
  {
    key: 'debate',
    labelKey: 'component.topnav.debate',
    to: '/debate',
    icon: MessagesSquare,
  },
  {
    key: 'summary',
    labelKey: 'component.topnav.summary',
    to: '/summary',
    icon: FileText,
  },
  {
    key: 'post',
    labelKey: 'component.topnav.post',
    to: '/post',
    icon: PenLine,
  },
  {
    key: 'search',
    labelKey: 'component.topnav.search',
    to: '/search',
    icon: Search,
  },
];

/** 모바일 하단 탭 (로그인했을 때) */
export const BOTTOM_TABS: NavItem[] = [
  {
    key: 'home',
    labelKey: 'component.topnav.main-page',
    to: '/',
    icon: Home,
    end: true,
  },
  {
    key: 'debate',
    labelKey: 'component.topnav.debate',
    to: '/debate',
    icon: MessagesSquare,
  },
  {
    key: 'summary',
    labelKey: 'component.topnav.summary',
    to: '/summary',
    icon: FileText,
  },
  {
    key: 'post',
    labelKey: 'component.topnav.post',
    to: '/post',
    icon: PenLine,
  },
  {
    key: 'my',
    labelKey: 'component.topnav.dropdown.mypage',
    to: '/mypage',
    icon: UserRound,
  },
];

/** 왼쪽 칼럼 '내 활동'. 마이페이지의 탭으로 바로 가요. */
export const ACTIVITY_LINKS = [
  {
    key: 'debate',
    labelKey: 'component.floating.text.debate',
    to: '/mypage?tab=debate',
  },
  {
    key: 'post',
    labelKey: 'component.floating.text.post',
    to: '/mypage?tab=post',
  },
  {
    key: 'summary',
    labelKey: 'component.floating.text.summary',
    to: '/mypage?tab=summary',
  },
  {
    key: 'payment',
    labelKey: 'component.section.profile.tab.my-tab.payment',
    to: '/mypage?tab=payment',
  },
] as const;

/** 약관·고객지원 링크. 아직 페이지가 없는 주소도 기존 푸터와 똑같이 둬요. */
export const SITE_LINKS = [
  { key: 'terms', labelKey: 'footer.support.terms', to: '/terms' },
  {
    key: 'privacy',
    labelKey: 'footer.support.privacy',
    to: '/privacy',
    emphasis: true,
  },
  { key: 'faq', labelKey: 'footer.support.faq', to: '/faq' },
  { key: 'notice', labelKey: 'footer.support.notice', to: '/notice' },
  { key: 'contact', labelKey: 'footer.support.contact', to: '/contact' },
] as const;

export const APP_VERSION = '2.0.0';
