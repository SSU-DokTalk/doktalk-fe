import { Outlet } from 'react-router-dom';
import Topnav from '@/components/navigation/Topnav';
import ChatbotFloatingButton from '@/components/floating/ChatbotFloatingButton';
import Footer from '@/components/footers/Footer';

function BasicLayout() {
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <Topnav />
      <Outlet />
      <Footer />
      <ChatbotFloatingButton />
    </div>
  );
}

export default BasicLayout;
