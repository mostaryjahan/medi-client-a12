import { useEffect } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";

const SellerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //get data
  const { data: salesData = {}, refetch } = useQuery({
    queryKey: ["seller-sales", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-sales/${user.email}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!user?.email,
  });

  const totalPaid = salesData.totalPaid || 0;
  const totalPending = salesData.totalPending || 0;

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user, refetch]);

  return (
    <div>
      <Helmet>
        <title>Medi corner | Seller Home</title>
      </Helmet>
      <div className="dark:bg-gray-100 dark:text-black p-8 min-h-screen">
        <h1 className="font-bold text-3xl text-center mt-10">
          Seller Dashboard
        </h1>

        <div className="flex justify-center mt-8">
          <div className="md:w-[400px] bg-white p-8 rounded shadow-md border-2">
            <h2 className="text-xl font-bold mb-4">
              Total Sales Revenue Overview
            </h2>
            <div className="flex justify-center gap-4 mb-4">
              <div className="bg-blue-400 p-4 rounded-xl">
                <p className="text-lg font-semibold">Total Paid:</p>
                <p className="text-lg">${totalPaid.toFixed(2)}</p>
              </div>
              <div className="bg-lime-400 p-4 rounded-xl">
                <p className="text-lg font-semibold">Total Pending:</p>
                <p className="text-lg">${totalPending.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
