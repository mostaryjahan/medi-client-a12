import {
    FaAd,
    FaBook,
    FaHome,
    FaList,
   
    FaSearch,
    FaUsers,
    FaUtensilSpoon,
    FaVoicemail,
  } from "react-icons/fa";
  import { TiShoppingCart } from "react-icons/ti";
  import { NavLink, Outlet } from "react-router-dom";
//   import useAdmin from "../hooks/useAdmin";
import useCart from "../Hook/useCart"
import { Helmet } from "react-helmet-async";
import { FaShop } from "react-icons/fa6";
  
  const Dashboard = () => {
     const [cart] = useCart();
  
    // const [isAdmin] = useAdmin();
  
    return (
      <div className="flex">
         <Helmet>
        <title>Medi corner | Dashboard</title>
      </Helmet>
        {/* side bar */}
        <div className="w-64 min-h-screen bg-purple-400">
          <h2 className="text-3xl text-center p-2 font-bold">Medi Corner</h2>
         
          <ul className="menu "> 
          <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome className="w-4 h-4" />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <TiShoppingCart className="w-4 h-4" />
                  My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList className="w-4 h-4" />
                  Payment History
                </NavLink>
              </li>

              <div className="divider "></div>

               {/* shared links */}
              <li>
                <NavLink to="/">
                  <FaHome className="w-4 h-4" />
                   Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop">
                  <FaShop className="w-4 h-4" />
                   Shop
                </NavLink>
              </li>
          </ul>
      </div>
       

       {/* dashboard content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      </div>

    );
  };
  
  export default Dashboard;
  