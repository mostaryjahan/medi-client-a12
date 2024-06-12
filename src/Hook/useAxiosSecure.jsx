import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth"


 const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

 const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logOut} = useAuth();


  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    // console.log('request stopped by interceptors', token)
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    return Promise.reject(error)
  });
  //intercepts 401 and 403 status
  axiosSecure.interceptors.request.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      console.log("status error", status);
      return Promise.reject(error);
    }
  );

  
  return axiosSecure;
};

export default useAxiosSecure;