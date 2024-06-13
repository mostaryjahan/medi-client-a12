// import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    // const [totalPaid, setTotalPaid] = useState(0); // Initialize as 0
    // const [totalPending, setTotalPending] = useState(0); // Initialize as 0

   

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
   });






    return (
        <div>
               <Helmet>
        <title>Medi corner | Admin Home</title>
      </Helmet>
            <h1 className="font-bold text-3xl text-center mt-10">Admin Dashboard</h1>

            <div className="flex justify-center mt-8">
                <div className="w-1/2 bg-white p-8 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4">Total Revenue Overview</h2>
                    <div className="flex justify-between mb-4">
                        <div>
                        <p className="text-lg font-semibold">Total Paid:</p>
                        <p className="text-lg">${stats?.revenue.toFixed(2)}</p>
                        </div>
                        <div>
                        <p className="text-lg font-semibold">Total Pending:</p>
                        <p className="text-lg">${stats?.totalPending}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;







// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hook/useAuth";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import { FaDollarSign,  FaFirstOrder,  FaMedkit,  FaUsers } from "react-icons/fa";



// const AdminHome = () => {

//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: stats } = useQuery({
//     queryKey: ["admin-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/admin-stats");
//       return res.data;
//     },
//   });


//     return (
//         <div>
//         <h2 className="text-center text-3xl">
//           <span>Hi , Welcome </span>
//           {user?.displayName ? user.displayName : "Back"}
//         </h2>
  
//         <div className="md:stats shadow ">
//         <div className="stat bg-gradient-to-r  from-purple-400 to-purple-200 text-white">
//             <div className="stat-figure text-white text-4xl">
//               <FaDollarSign></FaDollarSign>
//             </div>
//             <div className="stat-title">Revenue</div>
//             <div className="stat-value">{stats?.revenue.toFixed(2)}</div>
//           </div>
  
//            <div className="stat bg-gradient-to-r  from-orange-400 to-orange-200 text-white">
//              <div className="stat-figure text-white text-4xl">
//            <FaUsers></FaUsers>
//              </div>
//              <div className="stat-title"> Users</div>
//              <div className="stat-value">{stats?.users}</div>
//            </div>
  
//            <div className="stat bg-gradient-to-r  from-pink-400 to-pink-200 text-white">
//              <div className="stat-figure text-white text-4xl">
//              <FaFirstOrder></FaFirstOrder>
//              </div>
//              <div className="stat-title">Orders</div>
//              <div className="stat-value">{stats?.orders}</div>
//            </div>
  
//            <div className="stat bg-gradient-to-r  from-blue-400 to-blue-200 text-white">
//              <div className="stat-figure text-white text-4xl">
//               <FaMedkit></FaMedkit>
//              </div>
//              <div className="stat-title">Medicines</div>
//              <div className="stat-value">{stats?.menuItems}</div>
//            </div>
//          </div>
//       </div>
//     );
// };

//  export default AdminHome;