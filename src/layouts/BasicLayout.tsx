import { Outlet } from 'react-router-dom';
import Topnav from '@/components/navigation/Topnav';

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
    </div>
  );
}

export default BasicLayout;
