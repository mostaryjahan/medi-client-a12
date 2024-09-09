import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import Nav from "../shared/Nav/Nav";
import useAuth from "../Hook/useAuth";

const Main = () => {
  const { loading } = useAuth();
  const location = useLocation();
  const noNavFooterRoutes = ["/invoice"];

  const shouldHideNavFooter = noNavFooterRoutes.includes(location.pathname);

  if (loading) {
    return (
    
      <div className="loader mx-auto mt-28 "></div>
    );
  }

  return (
    <div>
      <div className="max-w-8xl mx-auto  dark:text-gray-200">
        {!shouldHideNavFooter && <Nav />}

      <div className="mt-[64px]">
          <Outlet></Outlet>
        </div>
      </div>
      {!shouldHideNavFooter && <Footer />}
    </div>
  );
};

export default Main;
