import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import google from "../../assets/google.png"


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
      <div className="mb-4 flex justify-center items-center gap-2"> 
        <p className="text-base font-medium">Login With <span></span></p>
        <button onClick={handleGoogleSignIn} className="">
          <img src={google} alt="Google" className="w-6 h-6"/>
        </button>
      </div>
    </div>
  );
};


export default Social;