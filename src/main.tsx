import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

import { store } from '@/stores/store.ts';

import '@/locales/i18n.ts';
// 디자인 토큰(--dt-*)을 가장 먼저 깔아 둬요. 기존 SCSS·Tailwind 색도 이 변수를 가리켜요.
import '@/design-system/tokens/theme.css';
import '@/design-system/styles/fonts.css';

import App from '@/App.tsx';
import TokenRefresher from '@/TokenRefresher';

createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider injectFirst>
    <CssBaseline />
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Provider store={store}>
        <TokenRefresher>
          <App />
        </TokenRefresher>
      </Provider>
    </BrowserRouter>
  </StyledEngineProvider>
);
