import React, { useState, useRef, useEffect } from 'react';
import type { JSX } from 'react';
import { Dialog, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faTimes,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';

/**
 * @interface Message
 * @description 채팅 메시지의 구조를 정의합니다.
 */
interface Message {
  text: string;
  sender: 'user' | 'ai';
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: '아쉽게도 아직은 테스트중이라 동작하지 않아요', sender: 'ai' },
    // { text: '안녕하세요! 무엇이든 물어보세요 👋', sender: 'ai' },
  ]);
  const [inputValue, setInputValue] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const examplePrompts: string[] = [
    '뭐하는 사이트야?',
    '넌 뭘 할 수 있어?',
    '추천하는 책 있어?',
  ];

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

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage: Message = { text: inputValue, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');

      // TODO: Gemini API 호출 로직으로 교체
      setTimeout(() => {
        const aiMessage: Message = {
          text: '아직 지원되지 않습니다 ㅠㅠ',
          sender: 'ai',
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);
    }
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={handleToggleChat}
        className='fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-brand1 text-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-110 md:bottom-10 md:right-10'
        aria-label='채팅 열기'
      >
        <FontAwesomeIcon icon={faRobot} size='2x' />
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
            <FontAwesomeIcon icon={faRobot} size='2x' />
            <p className='text-xs opacity-90'>DokTalk AI</p>
            <IconButton
              aria-label='채팅 닫기'
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
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* 2. 메시지 패딩 조정 */}
                  <div
                    className={`max-w-xs rounded-2xl px-3! py-2! shadow-sm lg:max-w-md ${msg.sender === 'user' ? 'rounded-br-none bg-brand1 text-white' : 'rounded-bl-none bg-gray-100 text-gray-800'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </main>

          {/* ✨ 예시 질문 영역 추가 */}
          <div className='border-t border-gray-200 bg-white px-4! pt-3! pb-1!'>
            <p className='text-center text-xs text-gray-500 mb-2!'>
              이렇게 물어보세요!
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
                placeholder='메시지를 입력해주세요...'
                className='flex-1 rounded-full border-gray-300 bg-gray-50 px-5 py-3 focus:border-brand1/50 focus:outline-none focus:ring-2 focus:ring-brand1/50'
                aria-label='채팅 입력'
              />
              <button
                type='submit'
                className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand1 text-white transition-colors duration-200 hover:bg-brand1/90 focus:outline-none focus:ring-4 focus:ring-brand1/50'
                aria-label='메시지 전송'
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
