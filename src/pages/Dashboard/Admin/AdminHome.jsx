import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      //   console.log('Admin stats:', res.data);
      return res.data;
    },
    //
  });

  return (
    <div>
      <Helmet>
        <title>MediCorner | Admin Home</title>
      </Helmet>
      <div className="dark:bg-gray-100 dark:text-black p-8 min-h-screen">

      
      <h1 className="font-bold text-3xl text-center mt-10">
        Admin Dashboard
      </h1>

      <div className="flex justify-center mt-8">
        <div className="md:w-[400px] bg-white p-8 border-2 rounded shadow-xl dark:text-gray-800">
          <h2 className="text-xl font-bold mb-4 text-center">Total Revenue Overview</h2>
          <div className=" gap-4 ">
            <div className="flex justify-center items-center gap-4">
            <div className="bg-green-500 p-4 rounded-xl">
              <p className="text-lg font-semibold">Total Paid:</p>

              <p className="text-lg">${stats?.totalPaid?.toFixed(2)}</p>

            </div>
            
              <div className="bg-orange-400 p-4 rounded-xl">
              <p className="text-lg font-semibold">Total Pending:</p>
             
           
             <p className="text-lg">${stats?.totalPending?.toFixed(2)}</p>
             </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminHome;
