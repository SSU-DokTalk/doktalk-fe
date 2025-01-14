import { Outlet } from "react-router-dom";
import FloatingUserProfile from "../components/floating/FloatingUserProfile";

function ContentMainLayout({ children }: { children?: React.ReactNode }) {
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
