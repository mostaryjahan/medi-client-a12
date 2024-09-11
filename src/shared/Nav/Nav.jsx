import { Link, NavLink } from "react-router-dom";
import icon from "../../assets/medicine.png";
import useAuth from "../../Hook/useAuth";
import { TiShoppingCart } from "react-icons/ti";
import useCart from "../../Hook/useCart";

const Nav = () => {
  const { user, logOut } = useAuth();

  // console.log(user);

  const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = (
    <>
    <li className="font-semibold md:text-lg text-primary hover:underline">
      <NavLink 
        to="/" 
        className={({ isActive }) =>
          isActive ? " underline" : ""
        }
      >
        Home
      </NavLink>
    </li>
    
    <li className="font-semibold text-primary md:text-lg hover:underline">
      <NavLink 
        to="/shop" 
        className={({ isActive }) =>
          isActive ? " underline" : ""
        }
      >
        Shop
      </NavLink>
    </li>
  
    <NavLink to="/dashboard/cart">
      <li>
        <button className="bg-base-800 border-white md:text-lg hover:text-white hover:underline flex items-center">
          <TiShoppingCart className="w-8 h-8 text-primary" />
          <span className="badge text-primary">
            +{cart.length}
          </span>
        </button>
      </li>
    </NavLink>
  </>
  
  );

  return (
    <div className=" ">
      <div className="navbar w-full fixed top-0 z-10 bg-base-100 font-extrabold ">
        <div className="navbar-start ">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost sm:hidden text-primary "
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
              className="dropdown-content mt-1 z-[1] p-2 shadow bg-white  rounded-box w-32"
            >
              {navLinks}
            </ul>
          </div>

          <Link
            to="/"
            className="font-bold md:text-xl lg:text-2xl sm:flex items-center justify-center text-primary bg-clip-text"
          >
            <img src={icon} alt="icon" className="w-10 h-10 hidden md:block " />
            <span>MediCorner</span>
          </Link>
        </div>
        <div className="navbar-center  hidden sm:block md:flex lg:flex ml-10">
          <ul className="flex justify-center items-center px-8 gap-12 ">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end dark:text-black">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full border-white border-2">
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
                className="p-2 dropdown-content mt-1   bg-base-100 rounded-box w-32 z-[1]"
              >
                <li className=" mb-2 font-semibold">
                  <NavLink to="/updateProfile">Update Profile</NavLink>
                </li>
                <li className="font-semibold mb-2">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button
                    className="btn text-white bg-red-500 hover:bg-red-700  w-full"
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
                <button className="btn border-2 border-primary rounded bg-transparent text-primary hover:bg-primary hover:text-white ">
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
