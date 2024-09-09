import { FaAd, FaHome, FaList, FaMoneyBill, FaUsers } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hook/useCart";
import { Helmet } from "react-helmet-async";
import { FaKitMedical, FaShop, FaStairs } from "react-icons/fa6";
import useAuth from "../Hook/useAuth";
import { MdPayments } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Dashboard = () => {
  const [cart] = useCart();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="flex">
      <Helmet>
        <title>Medi corner | Dashboard</title>
      </Helmet>

      {/* Sidebar */}
      <div
        className={`${
          !isSidebarOpen ? "hidden" : "block"
        } lg:w-64 min-h-screen text-white dark:text-white bg-primary lg:block`}
      >
        <h2 className="text-3xl text-center p-2 mt-[72px] lg:mt-6 font-bold">MediCorner</h2>

        <ul className="menu">
          {user.role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome className="w-4 h-4" />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers className="w-4 h-4" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCategory/category">
                  <FaKitMedical className="w-4 h-4" />
                  Manage Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentManage">
                  <FaMoneyBill className="w-4 h-4" />
                  Payment Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/sales">
                  <FaStairs className="w-4 h-4" />
                  Sales Report
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/ad">
                  <FaAd className="w-4 h-4" />
                  Manage Banner
                </NavLink>
              </li>
            </>
          )}
          {user.role === "seller" && (
            <>
              <li>
                <NavLink to="/dashboard/sellerHome">
                  <FaHome className="w-4 h-4" />
                  Seller Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageProducts">
                  <FaList className="w-4 h-4" />
                  Manage Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/sellerPayment">
                  <MdPayments className="w-4 h-4" />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/ask">
                  <FaAd className="w-4 h-4" />
                  Advertisement
                </NavLink>
              </li>
            </>
          )}

          {user.role === "user" && (
            <>
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
            </>
          )}

          <div className="divider border-b border-gray-300 dark:border-gray-300"></div>

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

      {/* Hamburger Button */}
      <button
        className="lg:hidden fixed top-4 left-4 p-2 text-white z-50 bg-primary rounded shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <GiHamburgerMenu className="w-6 h-6" />
      </button>

      {/* Dashboard content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
