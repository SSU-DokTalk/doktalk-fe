import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import { store } from '@/stores/store.ts';
import { queryClient } from '@/shared/api/queryClient';

import '@/locales/i18n.ts';
// 디자인 토큰(--dt-*)과 글꼴, 전역 기본 스타일을 먼저 깔아 둬요.
import '@/design-system/tokens/theme.css';
import '@/design-system/styles/fonts.css';
import '@/design-system/styles/reset.css';

import App from '@/App.tsx';
import TokenRefresher from '@/TokenRefresher';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TokenRefresher>
          <App />
        </TokenRefresher>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
