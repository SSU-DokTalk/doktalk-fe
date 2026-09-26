import clsx from 'clsx';
import { MessageCircle, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, IconButton, mq } from '@/design-system';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useAuth } from '@/shell/hooks';
import { useChatbot } from '../api';
import { ChatbotPanel } from './ChatbotPanel';
import * as s from './Chatbot.css';

/**
 * 오른쪽 아래 AI 챗봇 버튼과 창. 데스크톱은 버튼 위에 뜨는 창, 모바일은 아래 시트예요.
 * 대화는 이 컴포넌트가 들고 있어서 창을 닫았다 열거나 다른 화면으로 옮겨도 남아요.
 */
export function ChatbotLauncher() {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  const isDesktop = useMediaQuery(mq.md);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chat = useChatbot();

  return (
    <>
      <IconButton
        variant='solid'
        size='fab'
        elevated
        aria-haspopup='dialog'
        aria-expanded={open}
        aria-label={t(
          open
            ? 'component.floating.chatbot.aria.close-chat'
            : 'component.floating.chatbot.aria.open-chat'
        )}
        className={clsx(s.fab, isLoggedIn && s.fabAboveTabs)}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden='true' /> : <MessageCircle aria-hidden='true' />}
      </IconButton>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content
          placement={isDesktop ? 'corner' : 'bottom'}
          className={isDesktop ? undefined : s.sheet}
          initialFocus={inputRef}
        >
          <ChatbotPanel inputRef={inputRef} chat={chat} />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
