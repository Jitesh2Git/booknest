import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <main className="root-container">
      <div className="w-full max-w-7xl mx-auto px-5 min-[480px]:px-10 md:px-16">
        <Header />
        <div className="mt-20 pb-20">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
