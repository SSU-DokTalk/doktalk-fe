import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

import { store } from '@/stores/store.ts';

import '@/locales/i18n.ts';

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
