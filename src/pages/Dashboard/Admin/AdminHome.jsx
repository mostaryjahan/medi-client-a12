// import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

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
        <title>Medi corner | Admin Home</title>
      </Helmet>
            <h1 className="font-bold text-3xl text-center mt-10">Admin Dashboard</h1>

            <div className="flex justify-center mt-8">
                <div className="md:w-1/2 bg-white p-8 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4">Total Revenue Overview</h2>
                    <div className="flex justify-between gap-4 mb-4">
                        <div>
                        <p className="text-lg font-semibold">Total Paid:</p>
                        
                        <p className="text-lg">${stats?.totalPaid?.toFixed(2)}</p>
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




