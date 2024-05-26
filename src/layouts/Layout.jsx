import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";

function Layout() {
  return (
    <div className="w-full">
      <Header />
      <div className="w-full min-h-[84vh] mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
