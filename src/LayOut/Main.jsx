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
      
    <span className="loading mx-auto flex justify-center items-center loading-bars text-purple-700 loading-lg"></span>
);
  }


    return (
        <div>
             <div className="max-w-7xl mx-auto p-2">
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