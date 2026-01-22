import React, { useState, useRef, useEffect } from 'react';
import type { JSX } from 'react';
import { Dialog, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faTimes,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

/**
 * @interface Message
 * @description 채팅 메시지의 구조를 정의합니다.
 */
interface Message {
  message: string;
  role: 'user' | 'model';
}

/**
 * @description MUI Dialog의 Slide-up 트랜지션을 위한 컴포넌트입니다.
 */
const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

/**
 * @function ChatbotFloatingButton
 * @description 사용자의 피드백을 반영하여 개선된 AI 챗봇 컴포넌트입니다.
 * @returns {JSX.Element} 개선된 챗봇 컴포넌트
 */
const ChatbotFloatingButton = (): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { message: t('component.floating.chatbot.test-message'), role: 'model' },
  ]);
  const [inputValue, setInputValue] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const examplePrompts: string[] = [t('component.floating.chatbot.prompt1')];

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleToggleChat = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleExamplePromptClick = (prompt: string): void => {
    setInputValue(prompt);
  };

  const handleSendMessage = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const currentMessage = inputValue.trim();
    if (currentMessage) {
      const userMessage: Message = { message: currentMessage, role: 'user' };
      const history = messages;
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');

      try {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: currentMessage,
            chat_history: history,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error('API response indicates failure');
        }

        const aiMessage: Message = {
          message:
            data.message || t('component.floating.chatbot.not-supported'),
          role: 'model',
        };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error('Chatbot API error:', error);
        const errorMessage: Message = {
          message: t('component.floating.chatbot.error-occurred'),
          role: 'model',
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={handleToggleChat}
        className='fixed bottom-20 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-brand1 text-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-110 md:bottom-10 md:right-10'
        aria-label={t('component.floating.chatbot.aria.open-chat')}
      >
        <FontAwesomeIcon className='pt-1' icon={faMessage} size='xl' />
      </button>

      {/* 채팅 Dialog (MUI) */}
      <Dialog
        open={isOpen}
        onClose={handleToggleChat}
        TransitionComponent={SlideTransition}
        PaperProps={{
          sx: {
            margin: 0,
            padding: 0,
            position: 'fixed',
            overflow: 'hidden',
            // 모바일 (기본)
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '70%',
            borderTopLeftRadius: '1.5rem',
            borderTopRightRadius: '1.5rem',
            // 데스크톱
            '@media (min-width: 768px)': {
              bottom: '6.5rem',
              right: '2.5rem',
              left: 'auto',
              top: 'auto',
              height: 'min(70vh, 700px)',
              width: '400px',
              borderRadius: '1rem',
            },
          },
        }}
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
      >
        <div className='flex h-full flex-col bg-white'>
          {/* 4. 헤더 수정 */}
          <header className='relative flex! flex-row items-center gap-4 bg-brand1 p-4! text-white shadow-md'>
            <FontAwesomeIcon icon={faMessage} />
            <p className='text-xs opacity-90'>DokTalk AI</p>
            <IconButton
              aria-label={t('component.floating.chatbot.aria.close-chat')}
              onClick={handleToggleChat}
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </header>

          {/* 메시지 영역 */}
          <main className='flex-1 overflow-y-auto p-6'>
            <div className='space-y-5!'>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* 2. 메시지 패딩 조정 */}
                  <div
                    className={`max-w-xs rounded-2xl px-3! py-2! shadow-sm lg:max-w-md ${msg.role === 'user' ? 'rounded-br-none bg-brand1 text-white' : 'rounded-bl-none bg-gray-100 text-gray-800'}`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </main>

          {/* ✨ 예시 질문 영역 추가 */}
          <div className='border-t border-gray-200 bg-white px-4! pt-3! pb-1!'>
            <p className='text-center text-xs text-gray-500 mb-2!'>
              {t('component.floating.chatbot.ask-like-this')}
            </p>
            <div className='flex flex-wrap justify-center gap-2'>
              {examplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleExamplePromptClick(prompt)}
                  className='rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200'
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* 3. 입력 폼 마진/패딩 조정 */}
          <footer className='bg-white p-4!'>
            <form
              onSubmit={handleSendMessage}
              className='flex items-center space-x-3!'
            >
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('component.floating.chatbot.placeholder')}
                className='flex-1 rounded-full border-gray-300 bg-gray-50 px-5 py-3 focus:border-brand1/50 focus:outline-none focus:ring-2 focus:ring-brand1/50'
                aria-label={t('component.floating.chatbot.aria.input')}
              />
              <button
                type='submit'
                className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand1 text-white transition-colors duration-200 hover:bg-brand1/90 focus:outline-none focus:ring-4 focus:ring-brand1/50'
                aria-label={t('component.floating.chatbot.aria.send')}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </footer>
        </div>
      </Dialog>
    </>
  );
};

export default ChatbotFloatingButton;
