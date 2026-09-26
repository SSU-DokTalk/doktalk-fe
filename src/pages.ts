import { lazy, type ComponentType } from 'react';

/**
 * 라우트에 연결하는 페이지들이에요. 화면마다 따로 조각(JS·CSS)으로 나뉘어서,
 * 첫 화면은 앱 틀(셸)과 지금 보는 페이지만 받아요. 새 페이지도 여기에 추가해요.
 */
const loaders: Array<() => Promise<unknown>> = [];

function page<P extends object>(
  load: () => Promise<{ default: ComponentType<P> }>
) {
  loaders.push(load);
  return lazy(load);
}

export const HomePage = page(() => import('@/features/home/pages/HomePage'));

export const DebateListPage = page(
  () => import('@/features/debate/pages/DebateListPage')
);
export const DebateDetailPage = page(
  () => import('@/features/debate/pages/DebateDetailPage')
);
export const DebateCreatePage = page(
  () => import('@/features/debate/pages/DebateCreatePage')
);
export const DebateEditPage = page(
  () => import('@/features/debate/pages/DebateEditPage')
);

export const SummaryListPage = page(
  () => import('@/features/summary/pages/SummaryListPage')
);
export const SummaryDetailPage = page(
  () => import('@/features/summary/pages/SummaryDetailPage')
);
export const SummaryCreatePage = page(
  () => import('@/features/summary/pages/SummaryCreatePage')
);
export const SummaryEditPage = page(
  () => import('@/features/summary/pages/SummaryEditPage')
);

export const PostFeedPage = page(
  () => import('@/features/post/pages/PostFeedPage')
);
export const PostDetailPage = page(
  () => import('@/features/post/pages/PostDetailPage')
);

export const BookSearchPage = page(
  () => import('@/features/search/pages/BookSearchPage')
);
export const IntegratedSearchPage = page(
  () => import('@/features/search/pages/IntegratedSearchPage')
);

export const MyPage = page(() => import('@/features/profile/pages/MyPage'));
export const UserProfilePage = page(
  () => import('@/features/profile/pages/UserProfilePage')
);
export const MyLibraryPage = page(
  () => import('@/features/library/pages/MyLibraryPage')
);
export const SettingsPage = page(
  () => import('@/features/settings/pages/SettingsPage')
);
export const CheckoutResultPage = page(
  () => import('@/features/payment/pages/CheckoutResultPage')
);

export const LoginPage = page(() => import('@/features/auth/pages/LoginPage'));
export const RegisterPage = page(
  () => import('@/features/auth/pages/RegisterPage')
);
export const AuthCallbackPage = page(
  () => import('@/features/auth/pages/AuthCallbackPage')
);

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

let preloadStarted = false;

/**
 * 첫 화면을 그린 뒤 브라우저가 한가할 때 나머지 페이지 조각을 하나씩 미리 받아 둬요.
 * 그 뒤로는 화면을 옮겨도 기다리지 않아요. 데이터 절약 모드나 2G에서는 받지 않아요.
 */
export function preloadPagesWhenIdle() {
  if (preloadStarted) return;
  preloadStarted = true;

  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;
  if (connection?.saveData || /2g$/.test(connection?.effectiveType ?? '')) {
    return;
  }

  const queue = [...loaders];
  const whenIdle = (callback: () => void) => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(callback, { timeout: 3000 });
    } else {
      setTimeout(callback, 300);
    }
  };
  const next = () => {
    const load = queue.shift();
    if (!load) return;
    // 실패해도 여기서는 넘어가요. 그 화면으로 갈 때 RouteBoundary가 새로고침해서 다시 받아요.
    load().then(
      () => whenIdle(next),
      () => whenIdle(next)
    );
  };
  whenIdle(next);
}
