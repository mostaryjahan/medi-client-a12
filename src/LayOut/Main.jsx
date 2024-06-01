import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import Nav from "../shared/Nav/Nav";

const Main = () => {
    return (
        <div>
             <div className="max-w-6xl mx-auto p-2">
        <Nav></Nav>
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>
      {/* <ToastContainer></ToastContainer> */}
      <Footer></Footer>
        </div>
    );
};

export default Main;