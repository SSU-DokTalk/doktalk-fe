import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { type AxiosAdapter } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vars } from '@/design-system';
import userReducer from '@/stores/user';
import { ChatbotLauncher } from './ChatbotLauncher';

type Reply = 'answer' | 'slow' | 'fail';

const ANSWER =
  '부담 없이 읽기 좋은 책을 몇 권 골라 봤어요.\n\n· 아몬드 — 손원평\n· 불편한 편의점 — 김호연\n· 달러구트 꿈 백화점 — 이미예\n\n세 권 모두 장이 짧아서 출퇴근길에 조금씩 읽기 좋아요.';

/** 스토리에서는 서버 대신 챗봇 답을 흉내 내요 (운영 AI를 부르지 않아요). */
function fakeChatbot(reply: Reply): AxiosAdapter {
  return async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, reply === 'slow' ? 60_000 : 900)
    );
    return {
      data:
        reply === 'fail'
          ? { message: '오류', success: false }
          : { message: ANSWER, success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  };
}

function Preview({ reply }: { reply: Reply }) {
  const [ready, setReady] = useState(false);
  const { client, store } = useMemo(
    () => ({
      client: new QueryClient({
        defaultOptions: { mutations: { retry: false } },
      }),
      store: configureStore({ reducer: { user: userReducer } }),
    }),
    []
  );

  useEffect(() => {
    const previous = axios.defaults.adapter;
    axios.defaults.adapter = fakeChatbot(reply);
    setReady(true);
    return () => {
      axios.defaults.adapter = previous;
    };
  }, [reply]);

  if (!ready) return null;
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <div style={{ minHeight: '100vh', background: vars.color.canvas }} />
          <ChatbotLauncher />
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

const meta = {
  title: 'Features/Chatbot',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { reply: 'answer' },
  argTypes: {
    reply: { control: 'inline-radio', options: ['answer', 'slow', 'fail'] },
  },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 오른쪽 아래 버튼을 누르면 창이 열려요. 추천 질문을 누르면 바로 보내요. */
export const Default: Story = {};

/** 답을 기다리는 동안 점 세 개가 깜빡여요. */
export const WaitingForReply: Story = { args: { reply: 'slow' } };

/** 서버가 실패를 알리면 말풍선 안에서 다시 시도해요. */
export const Failure: Story = { args: { reply: 'fail' } };

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
