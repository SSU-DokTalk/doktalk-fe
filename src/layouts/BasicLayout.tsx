import { Outlet } from 'react-router-dom';
import Topnav from '@/components/navigation/Topnav';
import ChatbotFloatingButton from '@/components/floating/ChatbotFloatingButton';

function BasicLayout() {
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <Topnav />
      <Outlet />
      <div
        className='footer'
        style={{
          height: '70px',
        }}
      />
      <ChatbotFloatingButton />
    </div>
  );
}

export default BasicLayout;
