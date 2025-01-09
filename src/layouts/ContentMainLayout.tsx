import { Outlet } from "react-router-dom";
import FloatingUserProfile from "../components/floating/FloatingUserProfile";
import { useState } from "react";

function ContentMainLayout({ children }: { children?: React.ReactNode }) {
  const [isUserUpdated, setIsUserUpdated] = useState(true);
  const [isLibraryUpdated, setIsLibraryUpdated] = useState(true);

  return (
    <div id="content-main-layout">
      <FloatingUserProfile
        isUserUpdated={isUserUpdated}
        setIsUserUpdated={setIsUserUpdated}
        isLibraryUpdated={isLibraryUpdated}
        setIsLibraryUpdated={setIsLibraryUpdated}
      />
      <div className="upper-container">{children}</div>
      <div className="lower-container">
        <Outlet />
      </div>
    </div>
  );
}

export default ContentMainLayout;
