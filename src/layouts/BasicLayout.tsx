import { Outlet } from "react-router-dom";
import Topnav from "@/components/Topnav";

function BasicLayout() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Topnav />
      <Outlet />
    </div>
  );
}

export default BasicLayout;
