import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";


const useSeller = () => {
   const {user, loading} = useAuth();
   const axiosSecure = useAxiosSecure();

    const {data: isSeller, isPending: isSellerLoading} = useQuery({
        queryKey: [user?.email, "isSeller"],
        enabled: !loading,
        queryFn: async () =>{

         const res = await axiosSecure.get(`/users/seller/${user.email}`);
         console.log(res.data);
         return res.data?.seller;
        }
    });
    return [isSeller, isSellerLoading]
};

export default useSeller;