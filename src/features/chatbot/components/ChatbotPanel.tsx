import { Send, Sparkles, X } from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  IconButton,
  TextField,
  visuallyHidden,
} from '@/design-system';
import type { Chatbot } from '../api';
import * as s from './Chatbot.css';

const PROMPTS = [
  'component.floating.chatbot.prompt1',
  'component.chatbot.prompt2',
  'component.chatbot.prompt3',
];

/** 누가 한 말인지 스크린 리더에 먼저 알려요 (말풍선 모양은 눈으로만 구분돼서). */
function Speaker({ name }: { name: string }) {
  return <span className={visuallyHidden}>{name}: </span>;
}

/**
 * 챗봇 창 내용: 머리(제목·닫기), 대화 기록, 입력칸.
 * 입력칸 ref를 받아서 창이 열리면 바로 입력할 수 있게 해요.
 */
export function ChatbotPanel({
  chat,
  inputRef,
}: {
  chat: Chatbot;
  inputRef: RefObject<HTMLInputElement>;
}) {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const logRef = useRef<HTMLDivElement>(null);
  const botName = t('component.chatbot.title');
  const myName = t('component.chatbot.me');
  const last = chat.exchanges[chat.exchanges.length - 1];

  // 새 말이 오면 맨 아래로 내려요.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [chat.exchanges]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (chat.send(text)) setText('');
  };

  return (
    <>
      <header className={s.header}>
        <span aria-hidden='true' className={s.headerIcon}>
          <Sparkles />
        </span>
        <span className={s.headerText}>
          <Dialog.Title className={s.title}>{botName}</Dialog.Title>
          <span className={s.subtitle}>{t('component.chatbot.subtitle')}</span>
        </span>
        <Dialog.Close
          render={
            <IconButton
              variant='onBrand'
              aria-label={t('component.floating.chatbot.aria.close-chat')}
            >
              <X />
            </IconButton>
          }
        />
      </header>

      <div
        ref={logRef}
        role='log'
        aria-label={t('component.chatbot.log')}
        className={s.log}
      >
        <p className={s.botBubble}>
          <Speaker name={botName} />
          {t('component.chatbot.greeting')}
        </p>

        {chat.exchanges.length === 0 && (
          <div className={s.suggestions}>
            <p className={s.suggestionsLabel}>
              {t('component.floating.chatbot.ask-like-this')}
            </p>
            {PROMPTS.map((key) => (
              <button
                key={key}
                type='button'
                className={s.suggestion}
                onClick={() => {
                  // 누른 추천 질문 버튼이 사라지니 입력칸으로 포커스를 옮겨요.
                  if (chat.send(t(key))) inputRef.current?.focus();
                }}
              >
                {t(key)}
              </button>
            ))}
          </div>
        )}

        {chat.exchanges.map((exchange) => (
          <div key={exchange.id} className={s.exchange}>
            <p className={s.myBubble}>
              <Speaker name={myName} />
              {exchange.question}
            </p>
            {exchange.status === 'done' && (
              <p className={s.botBubble}>
                <Speaker name={botName} />
                {exchange.answer}
              </p>
            )}
            {exchange.status === 'error' && (
              <div className={s.errorBubble}>
                <p className={s.errorText}>
                  <Speaker name={botName} />
                  {t('component.chatbot.error')}
                </p>
                {exchange === last && (
                  <Button variant='outline' size='sm' onClick={chat.retry}>
                    {t('page.debate.item.retry')}
                  </Button>
                )}
              </div>
            )}
            {exchange.status === 'pending' && (
              <p className={s.typing}>
                <span className={visuallyHidden}>
                  {t('component.chatbot.typing')}
                </span>
                <span aria-hidden='true' className={s.dot} />
                <span aria-hidden='true' className={s.dot} />
                <span aria-hidden='true' className={s.dot} />
              </p>
            )}
          </div>
        ))}
      </div>

      <form className={s.form} onSubmit={submit}>
        <div className={s.inputRow}>
          <TextField
            ref={inputRef}
            label={t('component.floating.chatbot.aria.input')}
            hideLabel
            variant='filled'
            shape='pill'
            autoComplete='off'
            enterKeyHint='send'
            placeholder={t('component.floating.chatbot.placeholder')}
            value={text}
            onChange={(event) => setText(event.target.value)}
            fieldClassName={s.inputField}
          />
          <IconButton
            type='submit'
            variant='solid'
            size='lg'
            aria-label={t('component.floating.chatbot.aria.send')}
            aria-disabled={chat.isPending || !text.trim() || undefined}
          >
            <Send />
          </IconButton>
        </div>
        <p className={s.disclaimer}>{t('component.chatbot.disclaimer')}</p>
      </form>
    </>
  );
}
