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
        <title>Medi corner | google sign in</title>
      </Helmet>
      <div> <h3>Login with </h3>
        <button onClick={handleGoogleSignIn} className="btn w-3/4 mb-2 bg-purple-700 text-white">
          Google
        </button>
      </div>
    </div>
  );
};


export default Social;