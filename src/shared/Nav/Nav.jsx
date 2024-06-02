import { Link, NavLink } from "react-router-dom";
// import useAuth from "../Hook/useAuth";
// import { renderToString } from "react-dom/server";
import { useEffect, useState } from "react";
//  import ReactTooltip from 'react-tooltip';
import icon from "../../assets/medicine.png";
import useAuth from "../../Hook/useAuth";
import { FaCartPlus } from "react-icons/fa6";

const Nav = () => {
  //  const {  user } = useAuth();

  //  console.log(user);




  const navLinks = (
    <>
      <li className="font-semibold " data-tip="Tooltip for Home">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="/shop">Shop</NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="/categoryDetails/Capsule">Category Details</NavLink>
      </li>
      {/* {user && ( */}
        <li className="font-semibold">
          <NavLink to="/cart"><FaCartPlus className="w-6 h-8 text-red-500"/></NavLink>
        </li>
      {/* )} */}

     
   

    </>
  );

  return (
    <div className="">
      <div className="navbar bg-purple-300  border-b-2 border-blue-500">
        <div className="navbar-start ">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost sm:hidden "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className=" font-bold lg:text-2xl  sm:flex items-center justify-center text-purple-800 bg-clip-text">
            <span>
              <img src={icon} alt="" className="w-10 h-10 hidden lg:block " />
            </span>
           Medi Corner
          </a>
        </div>
        <div className="navbar-center  hidden sm:block md:flex lg:flex">
          <ul className="menu menu-horizontal   px-1 gap-2">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {/* {user ? ( */}
             
            <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <img
                  src={
                    // user?.photoURL ||
                    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-1  shadow bg-base-100 rounded-box  -mr-16"
            >
              <li className=" mb-2">
                <NavLink to="/updateProfile">Update Profile</NavLink>
              </li>
              <li className=" mb-2">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <button
                  className="btn text-white bg-red-500 w-full"
                  //  onClick={logOut}
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>

          {/* ) : ( */}
    

            <div className="flex ">
              <Link to="/login">
                <button className="btn bg-purple-500  text-white">
                  Join Us
                </button>
              </Link>
              {/* <Link to="/register">
                <button className="btn bg-purple-500 text-white">
                  Register
                </button>
              </Link> */}
            </div>
          {/* )} */}
        </div>
     
      </div>
    </div>
  );
};

export default Nav;
