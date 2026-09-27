import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosError, type AxiosAdapter } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Button } from '@/design-system';
import { AppShell, PageLayout } from '@/shell';
import userReducer from '@/stores/user';
import { encodePurchase } from '../checkout';
import { CheckoutDialog } from '../components/CheckoutDialog';
import CheckoutResultPage from './CheckoutResultPage';

const purchase = encodePurchase({
  product_type: 'S',
  product_id: 31,
  content: '선택을 설계하는 법: 넛지 핵심 정리',
  price: 4900,
});

const PATHS = {
  // 토스가 성공 주소 뒤에 paymentKey·orderId·amount를 붙여 줘요.
  success: `/checkout/success?redirect=%2Fsummary%2F31&tmp=${encodeURIComponent(purchase)}&paymentKey=tgen_20260927000000abcd1&orderId=summary-31-1790000000000&amount=4900`,
  fail: `/checkout/fail?redirect=%2Fsummary%2F31&tmp=${encodeURIComponent(purchase)}&code=PAY_PROCESS_CANCELED&message=${encodeURIComponent('사용자에 의해 결제가 취소되었습니다.')}`,
  missing: '/checkout/success',
};

/** 결제 확인(POST /purchase/confirm)에 서버가 줄 응답 */
const CONFIRM_RESPONSES = {
  ok: { status: 200, data: 12 },
  declined: {
    status: 402,
    data: {
      detail: {
        code: 'REJECT_CARD_COMPANY',
        message: '카드사에서 결제를 거절했어요. 다른 카드로 시도해 주세요.',
      },
    },
  },
  error: { status: 502, data: { detail: 'PAYMENT_GATEWAY_ERROR' } },
};
type ConfirmOutcome = keyof typeof CONFIRM_RESPONSES;

/** 스토리에는 서버가 없어서 결제 확인 요청에 정한 응답을 돌려줘요. */
const fakeConfirm =
  (outcome: ConfirmOutcome): AxiosAdapter =>
  async (config) => {
    const { status, data } = CONFIRM_RESPONSES[outcome];
    const response = { data, status, statusText: '', headers: {}, config };
    if (status >= 400) {
      throw new AxiosError(
        `Request failed with status code ${status}`,
        AxiosError.ERR_BAD_RESPONSE,
        config,
        null,
        response
      );
    }
    return response;
  };

function ResultPreview({
  path,
  confirm = 'ok',
}: {
  path: keyof typeof PATHS;
  confirm?: ConfirmOutcome;
}) {
  const [ready, setReady] = useState(false);
  const { client, store } = useMemo(
    () => ({
      client: new QueryClient({
        defaultOptions: { queries: { retry: false } },
      }),
      store: configureStore({
        reducer: { user: userReducer },
        preloadedState: {
          user: { id: 3, name: '김지현', role: 'USER' as const },
        },
      }),
    }),
    []
  );

  useEffect(() => {
    const previous = axios.defaults.adapter;
    axios.defaults.adapter = fakeConfirm(confirm);
    setReady(true);
    return () => {
      axios.defaults.adapter = previous;
    };
  }, [confirm]);

  if (!ready) return null;
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[PATHS[path]]}>
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<PageLayout />}>
                <Route
                  path='/checkout/success'
                  element={<CheckoutResultPage result='success' />}
                />
                <Route
                  path='/checkout/fail'
                  element={<CheckoutResultPage result='fail' />}
                />
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

const meta = {
  title: 'Features/Payment/Checkout',
  component: ResultPreview,
  parameters: { layout: 'fullscreen' },
  args: { path: 'success', confirm: 'ok' },
  argTypes: {
    path: { control: 'inline-radio', options: ['success', 'fail', 'missing'] },
    confirm: {
      control: 'inline-radio',
      options: Object.keys(CONFIRM_RESPONSES),
    },
  },
} satisfies Meta<typeof ResultPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 결제 성공: 서버가 결제를 확인하고 구매 기록을 만든 뒤 결과와 다음 행동을 보여줘요. */
export const Success: Story = {};

/** 결제 실패: 토스가 준 사유와 코드, 다시 결제하기 */
export const Fail: Story = { args: { path: 'fail' } };

/** 토스 결제 창은 통과했지만 승인에서 거절됐을 때 (결제 실패와 같은 화면) */
export const Declined: Story = { args: { confirm: 'declined' } };

/** 결제 확인 요청이 실패했을 때: 결제가 됐는지 모르니 다시 확인하게 해요. */
export const ConfirmError: Story = { args: { confirm: 'error' } };

/** 결과 주소에 결제 정보가 없을 때 */
export const Missing: Story = { args: { path: 'missing' } };

/**
 * 결제 창. 토스 결제 위젯은 토스 서버에서 불러와요 (테스트 키라 실제 결제는 안 돼요).
 */
export const Dialog: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <MemoryRouter initialEntries={['/summary/31']}>
        <div style={{ padding: 24 }}>
          <Button onClick={() => setOpen(true)}>결제 창 열기</Button>
          <CheckoutDialog
            open={open}
            onOpenChange={setOpen}
            product={{
              type: 'S',
              id: 31,
              title: '선택을 설계하는 법: 넛지 핵심 정리',
              price: 4900,
              cover: { title: '넛지' },
              meta: '박서연 · 넛지',
            }}
          />
        </div>
      </MemoryRouter>
    );
  },
};
