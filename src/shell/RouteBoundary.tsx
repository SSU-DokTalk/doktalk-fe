import clsx from 'clsx';
import { RefreshCw } from 'lucide-react';
import { Component, Suspense, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Button, EmptyState, Spinner } from '@/design-system';
import * as s from './RouteBoundary.css';

/** 페이지 조각(JS·CSS 파일)을 받지 못했을 때 브라우저·Vite가 내는 오류 */
const CHUNK_ERROR =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS/i;
const RELOAD_KEY = 'doktalk:chunk-reload';

/**
 * 새 버전이 배포되면 예전 페이지 조각 파일이 사라져서, 열어 둔 탭에서 다른 화면으로 가면 받지 못해요.
 * 그럴 때 한 번만 새로고침해서 새 버전을 받아요. 방금 새로고침했는데도 안 되면 오류 화면을 보여줘요.
 */
function reloadOnceForChunkError(error: unknown) {
  if (!(error instanceof Error) || !CHUNK_ERROR.test(error.message)) {
    return false;
  }
  if (!navigator.onLine) return false;
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
    if (Date.now() - last < 10_000) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

type BoundaryProps = {
  /** 이 값이 바뀌면(다른 화면으로 가면) 오류 화면을 걷어요. */
  resetKey: string;
  fullPage: boolean;
  children: ReactNode;
};

type BoundaryState = { failed: boolean; reloading: boolean };

class RouteErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false, reloading: false };

  static getDerivedStateFromError(): Partial<BoundaryState> {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (reloadOnceForChunkError(error)) this.setState({ reloading: true });
  }

  componentDidUpdate(prev: BoundaryProps) {
    if (this.state.failed && prev.resetKey !== this.props.resetKey) {
      this.setState({ failed: false, reloading: false });
    }
  }

  render() {
    const { fullPage, children } = this.props;
    if (this.state.reloading) return <RouteLoading fullPage={fullPage} />;
    if (this.state.failed) return <RouteError fullPage={fullPage} />;
    return children;
  }
}

/** 페이지 조각을 받는 동안. 금방 끝나면 깜빡이지 않게 조금 뒤에 보여요. */
export function RouteLoading({ fullPage = false }: { fullPage?: boolean }) {
  const { t } = useTranslation();
  return (
    <div className={clsx(s.loading, fullPage && s.fullPage)}>
      <Spinner size='lg' label={t('component.base.infinite-scroll.loading')} />
    </div>
  );
}

/** 페이지를 그리지 못했을 때 (조각을 못 받았거나 화면 오류) */
export function RouteError({ fullPage = false }: { fullPage?: boolean }) {
  const { t } = useTranslation();
  return (
    <div className={clsx(s.error, fullPage && s.fullPage)}>
      <EmptyState
        tone='danger'
        icon={<RefreshCw />}
        title={t('component.shell.route-error.title')}
        description={t('component.shell.route-error.description')}
        actions={
          <Button variant='outline' onClick={() => window.location.reload()}>
            {t('component.shell.route-error.reload')}
          </Button>
        }
      />
    </div>
  );
}

/**
 * 라우트 페이지를 감싸요. 페이지 조각을 받는 동안 로딩을, 그리다 오류가 나면
 * 셸(내비·하단 탭)은 그대로 두고 이 자리에만 오류 화면을 보여줘요.
 */
export function RouteBoundary({
  children,
  fullPage = false,
}: {
  children: ReactNode;
  /** 셸 밖 화면(로그인·회원가입)에서는 화면 전체를 채워요. */
  fullPage?: boolean;
}) {
  const { pathname } = useLocation();
  return (
    <RouteErrorBoundary resetKey={pathname} fullPage={fullPage}>
      <Suspense fallback={<RouteLoading fullPage={fullPage} />}>
        {children}
      </Suspense>
    </RouteErrorBoundary>
  );
}
