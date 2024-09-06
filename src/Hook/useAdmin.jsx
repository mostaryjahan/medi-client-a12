import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";


const useAdmin = () => {
   const {user, loading} = useAuth();
   const axiosSecure = useAxiosSecure();

    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !loading,
        queryFn: async () =>{

         const res = await axiosSecure.get(`/users/admin/${user.email}`);
        //  console.log(res.data);
         return res.data?.admin;
        }
    });
    return [isAdmin, isAdminLoading]
};

export default useAdmin;