import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import Nav from "../shared/Nav/Nav";
import useAuth from "../Hook/useAuth";

const Main = () => {
  const {loading} = useAuth();
  const location = useLocation();
  const noNavFooterRoutes = ['/invoice'];

  const shouldHideNavFooter = noNavFooterRoutes.includes(location.pathname);



  if(loading){
    return ( 
      <div className="w-16 h-16 mx-auto mt-20 border-4 border-dashed rounded-full animate-spin border-purple-600"></div>
   
);
  }


    return (
        <div>
             <div className="max-w-8xl mx-auto md:p-4 p-2 dark:text-gray-200">
             {!shouldHideNavFooter && <Nav />}

        {/* <Nav></Nav> */}
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>
      {!shouldHideNavFooter && <Footer />}

      {/* <Footer></Footer> */}
        </div>
    );
};

export default Main;