import { Link, NavLink } from "react-router-dom";
import icon from "../../assets/medicine.png";
import useAuth from "../../Hook/useAuth";
import { TiShoppingCart } from "react-icons/ti";
 import useCart from "../../Hook/useCart";

const Nav = () => {
    const {  user , logOut} = useAuth();

    // console.log(user);
    
  const [cart] = useCart();
 

  const handleLogOut = () => {
      logOut()
      .then(() => {})
      .catch(error =>{
        console.log(error)
      })
  }

 



  const navLinks = (
    <>
      <li className="font-semibold md:text-lg dark:text-black" data-tip="Tooltip for Home">
        <Link to="/">Home</Link>
      </li>
      <li className="font-semibold md:text-lg dark:text-black">
        <Link to="/shop">Shop</Link>
      </li>

      <Link to="/dashboard/cart" > <li> <button className=" bg-base-800 border border-purple-600 md:text-lg ">
      <TiShoppingCart className="w-8 h-8 text-purple-700 "/>
            <div className="badge text-purple-700 dark:text-white">+{cart.length}</div>
          </button>
        </li>
      </Link>

    </>
  );

  return (
    <div className="">
      <div className="navbar bg-purple-100 font-extrabold ">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
            >
              {navLinks}
            </ul>
          </div>
          <a className=" font-bold lg:text-2xl  sm:flex items-center justify-center text-purple-700 bg-clip-text">
            <span>
              <img src={icon} alt="" className="w-10 h-10 hidden lg:block " />
            </span>
           MediCorner
          </a>
        </div>
        <div className="navbar-center  hidden sm:block md:flex lg:flex">
          <ul className="menu menu-horizontal   px-1 gap-2">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
             
            <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full border border-purple-800">
                <img
                  src={
                     user?.photoURL ||
                    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-1  shadow bg-base-100 rounded-box w-40 z-[1]"
            >
              {/* <li>{user?.displayName}</li> */}
              <li className=" mb-2 font-semibold">
                <NavLink to="/updateProfile">Update Profile</NavLink>
              </li>
              <li className="font-semibold mb-2">
                <NavLink to="/dashboard">  
   
                   Dashboard 
                   </NavLink>
              </li>
              <li>
                <button
                  className="btn text-white bg-red-500 w-full"
                    onClick={handleLogOut}
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>

          ) : (
    

            <div className="flex ">
              <Link to="/login">
                <button className="btn bg-purple-500  text-white">
                  Join Us
                </button>
              </Link>
            </div>
          )}
        </div>

     
     
      </div>
    </div>
  );
};

export default Nav;
