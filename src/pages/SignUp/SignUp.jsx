import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import Social from "../Social/Social";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import img from "../../assets/bg.jpg"

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      // //update
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          console.log("user profile info updated");
          //create user entry in database
          const userInfo = {
            name: data.name,
            email: data.email,
            role: data.role,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                icon: "success",
                title: "Sign Up Successful",
                showConfirmButton: false,
                timer: 1500,
              });

              navigate(from, { replace: true });
              window.location.reload();
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      <Helmet>
        <title>Medi corner | sign up</title>
      </Helmet>
      <div
        className="hero"
        style={{
          backgroundImage:  `url(${img})`, 
          backgroundSize: 'fit',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-content flex-col">
          <div className="text-center ">
            <h1 className="md:text-5xl text-2xl font-bold text-black">
              SignUp now!
            </h1>
          </div>
          <div className="card  md:w-[400px]">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
              <div className="form-control ">
                <label className="label ">
                  <span className="label-text text-black text-lg font-semibold">Name:</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered "
                  name="name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-lg font-semibold">Photo URL:</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered "
                  name="photoURL"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-lg font-semibold">Email:</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-lg font-semibold">Password:</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>

              {/* role */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-lg font-semibold">Select Your Role:</span>
                </label>
                <select
                  defaultValue="default"
                  className="input input-bordered text-black dark:bg-slate-100"
                  name="role"
                  {...register("role", { required: true })}
                >
                  <option disabled value="default">
                    Select One
                  </option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
                {errors.role && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn bg-[#00157c] hover:border-2 hover:border-[#00157c] hover:bg-white text-white hover:text-[#00157c]"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className="text-center text-black font-semibold">
             
                Already have an account?
                <Link to="/login">
                <span className="underline font-bold text-base hover:text-blue-800 ml-1">
                    Login
                  </span>{" "}
                </Link>
             
            </p>
            <p className="text-center text-black font-semibold">Or,</p>
         
            <div className="mt-2 text-black text-center">
              <Social></Social>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
