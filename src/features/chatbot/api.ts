import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import { api } from '@/shared/api/client';
import type { components } from '@/shared/api/schema';

type ChatMessage = components['schemas']['ChatMessage'];

/** 질문 하나와 그 답. 답을 기다리는 중이거나 실패했을 수 있어요. */
export type Exchange = {
  id: number;
  question: string;
  answer?: string;
  status: 'pending' | 'done' | 'error';
};

/** 서버에 함께 보내는 이전 대화 수 (질문·답 합쳐서). 요청이 너무 커지지 않게 줄여요. */
const HISTORY_LIMIT = 20;

/** 답을 받은 대화만 이전 대화로 보내요. 실패한 질문이 섞이면 질문이 연달아 가서요. */
function historyOf(exchanges: Exchange[]): ChatMessage[] {
  return exchanges
    .filter((exchange) => exchange.status === 'done' && exchange.answer)
    .flatMap((exchange): ChatMessage[] => [
      { role: 'user', message: exchange.question },
      { role: 'model', message: exchange.answer! },
    ])
    .slice(-HISTORY_LIMIT);
}

/**
 * 챗봇 대화 상태. 인사말은 화면에만 두고 서버에는 실제로 주고받은 말만 보내요.
 * 창을 닫았다 열어도 대화가 남도록 앱 틀에서 한 번만 만들어 써요.
 */
export function useChatbot() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const nextId = useRef(1);

  const reply = useMutation({
    mutationFn: async (input: { message: string; history: ChatMessage[] }) => {
      const res = await api.post('/chatbot', {
        body: { message: input.message, chat_history: input.history },
      });
      // 서버는 AI 오류도 200으로 주고 success만 false로 알려요.
      if (!res.success) throw new Error('chatbot failed');
      return res.message;
    },
  });

  const ask = useCallback(
    (id: number, message: string, history: ChatMessage[]) => {
      reply.mutate(
        { message, history },
        {
          onSuccess: (answer) =>
            setExchanges((current) =>
              current.map((exchange) =>
                exchange.id === id
                  ? { ...exchange, answer, status: 'done' }
                  : exchange
              )
            ),
          onError: () =>
            setExchanges((current) =>
              current.map((exchange) =>
                exchange.id === id ? { ...exchange, status: 'error' } : exchange
              )
            ),
        }
      );
    },
    [reply]
  );

  /** 새 질문 보내기. 답을 기다리는 동안에는 받지 않아요. */
  const send = useCallback(
    (text: string) => {
      const message = text.trim();
      if (!message || reply.isPending) return false;
      const id = nextId.current++;
      const history = historyOf(exchanges);
      setExchanges((current) => [
        ...current,
        { id, question: message, status: 'pending' },
      ]);
      ask(id, message, history);
      return true;
    },
    [ask, exchanges, reply.isPending]
  );

  /** 실패한 마지막 질문을 다시 보내요. */
  const retry = useCallback(() => {
    const last = exchanges[exchanges.length - 1];
    if (!last || last.status !== 'error' || reply.isPending) return;
    setExchanges((current) =>
      current.map((exchange) =>
        exchange.id === last.id ? { ...exchange, status: 'pending' } : exchange
      )
    );
    ask(last.id, last.question, historyOf(exchanges.slice(0, -1)));
  }, [ask, exchanges, reply.isPending]);

  return { exchanges, send, retry, isPending: reply.isPending };
}

export type Chatbot = ReturnType<typeof useChatbot>;
