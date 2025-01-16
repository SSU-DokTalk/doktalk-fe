import { Outlet } from "react-router-dom";
import FloatingUserProfile from "../components/floating/FloatingUserProfile";
import { useEffect } from "react";
import { updateGlobalState } from "@/stores/globalStates";
import { useAppDispatch } from "@/stores/hooks";

function ContentMainLayout({ children }: { children?: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateGlobalState({ isFollowerUpdated: true, isLibraryUpdated: true })
    );
  });

  return (
    <div id="content-main-layout">
      <FloatingUserProfile />
      <div className="upper-container">{children}</div>
      <div className="lower-container">
        <Outlet />
      </div>
    </div>
  );
}

export default ContentMainLayout;
