import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hook/useAxiosPublic";


const Social = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user)
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        role: "user",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "LoggedIn successfully",
          showConfirmButton: false,
          timer: 1500,
        });
         navigate("/");
       });
     });
  };

  return (
    <div>
        <Helmet>
        <title>MediCorner | Google signIn</title>
      </Helmet>
      <div className="mb-4 gap-2 p-2 mx-6"> 
        <p className="text-base font-medium mb-2">Login With</p>
        <button onClick={handleGoogleSignIn} className="btn bg-primary w-full text-white  hover:bg-white hover:text-primary hover:border-primary hover:border-2 dark:text-white">
          Google
        </button>
      </div>
    </div>
  );
};


export default Social;