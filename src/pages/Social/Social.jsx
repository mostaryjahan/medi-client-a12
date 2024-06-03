import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";


const Social = () => {
    const { googleSignIn } = useAuth();
//   const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
    //   const userInfo = {
    //     email: result.user?.email,
    //     name: result.user?.displayName,
    //   };
    //   axiosPublic.post("/users", userInfo).then((res) => {
    //     console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "LoggedIn successfully",
          showConfirmButton: false,
          timer: 1500,
        });
         navigate("/");
    //   });
     });
  };
  return (
    <div>
      <div>
        <button onClick={handleGoogleSignIn} className="btn w-3/4 mb-2 bg-blue-600 text-white">
          Google
        </button>
      </div>
    </div>
  );
};


export default Social;