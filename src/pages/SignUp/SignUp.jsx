import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import Social from "../Social/Social";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import img from "../../assets/login.jpg"
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [show, setShow] = useState(false);
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

  const imgbbApiKey = import.meta.env.VITE_Image_Hosting_key;
  const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.photoURL[0]);

    // Upload the image to ImgBB
    fetch(imgbbUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imageUrl = imgResponse.data.url;
          console.log("Image URL:", imageUrl);

          // Create the user with email and password
          createUser(data.email, data.password).then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);

            // Update the user profile with name and uploaded image URL
            updateUserProfile(data.name, imageUrl)
              .then(() => {
                console.log("User profile info updated");

                // Create user entry in database
                const userInfo = {
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  imageUrl: imageUrl,
                };
                axiosPublic.post("/users", userInfo).then((res) => {
                  if (res.data.insertedId) {
                    console.log("User added to the database");
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
                console.log("Error updating profile:", error);
              });
          });
        }
      })
      .catch((error) => {
        console.log("Image upload failed:", error);
      });
  };

  return (
    <div>
      <Helmet>
        <title>MediCorner | Sign Up</title>
      </Helmet>
      <div
        className="hero"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'fit',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="md:text-5xl text-2xl font-bold text-primary">
              Sign Up now!
            </h1>
          </div>
          <div className="card md:w-[400px]  bg-slate-200 opacity-90 dark:text-black">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-lg font-semibold">Name:</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered dark:bg-slate-100 border border-primary"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-lg font-semibold">Photo:</span>
                </label>
                <input
                  type="file"
                  className="input input-bordered dark:bg-slate-100 px-1 py-2 border border-primary"
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
                  className="input input-bordered dark:bg-slate-100 border border-primary"
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
                  type={show ? "text" : "password"}
                  placeholder="password"
                  className="relative input input-bordered dark:bg-slate-100 border border-primary"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                  <span
                  onClick={() => setShow(!show)}
                  className="absolute ml-64 md:ml-72 mt-14"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-lg font-semibold">Select Your Role:</span>
                </label>
                <select
                  defaultValue="default"
                  className="input input-bordered text-black dark:bg-slate-100 border border-primary"
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

              <div className="form-control mt-2">
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
                </span>
              </Link>
            </p>

            <p className="text-center text-black font-semibold">Or,</p>

            <div className="mt-2 text-black text-center">
              <Social />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
