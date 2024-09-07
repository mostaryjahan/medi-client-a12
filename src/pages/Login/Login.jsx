import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import Social from "../Social/Social";
import { Helmet } from "react-helmet-async";
import img1 from "../../assets/login.jpg";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);


  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "LoggedIn Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <Helmet>
        <title>MediCorner | Login</title>
      </Helmet>
      <div
        className="hero"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "fit",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content flex-col">
          <div className="text-center md:w-2/3 lg:text-left">
            <h1 className="lg:text-5xl text-3xl font-bold text-primary">
              Login Now!
            </h1>
          </div>
          <div className="card md:w-[400px] text-black bg-slate-200 opacity-80">
            <form onSubmit={handleLogin} className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-lg font-semibold">
                    Email:
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered dark:bg-slate-100 border border-primary"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-lg font-semibold">
                    Password:
                  </span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  className="relative input input-bordered dark:bg-slate-100  border border-primary"
                  name="password"
                  required
                />
                    <span
                  onClick={() => setShow(!show)}
                  className="absolute ml-44 md:ml-72 mt-14"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <div className="form-control mt-2">
                <input
                  className=" btn w-full mx-auto bg-[#00157c] hover:border-2 hover:bg-white hover:border-[#00157c] text-white hover:text-[#00157c]"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="text-center font-semibold text-black">
              New here?{" "}
              <Link to="/signUp">
                {" "}
                <span className="underline font-bold text-base hover:text-blue-800">
                  Sign Up
                </span>{" "}
              </Link>
            </p>

            <p className="text-center text-black font-semibold">Or,</p>
            <div className=" text-center text-black">
              <Social></Social>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
 