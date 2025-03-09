import { Outlet } from 'react-router-dom';
import FloatingUserProfile from '../components/floating/FloatingUserProfile';
import { useEffect } from 'react';
import { updateGlobalState } from '@/stores/globalStates';
import { useAppDispatch } from '@/stores/hooks';

function ContentMainLayout({ children }: { children?: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateGlobalState({ isFollowerUpdated: true, isLibraryUpdated: true })
    );
  });

  return (
    <div id='content-main-layout'>
      <div className='hidden md:block'>
        <FloatingUserProfile />
      </div>

      <div className='upper-container md:pl-72!'>{children}</div>
      <div className='lower-container md:pl-72!'>
        <Outlet />
      </div>
    </div>
  );
}

export default ContentMainLayout;
