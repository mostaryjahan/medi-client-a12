import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure(`/payments/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
         <Helmet>
        <title>MediCorner | Payment History</title>
      </Helmet>
      <div className="dark:bg-slate-100 dark:text-black p-4">
      <h1 className="text-xl font-medium text-center mb-4">Your Total Payment: {payments.length}</h1>

      <div className="overflow-x-auto ">
        <table className="table">
          {/* head */}
          <thead className="bg-primary text-white ">
            <tr className="text-center border border-black">
              <th>SL</th>
              <th>Price</th>
              <th>Transaction Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="border border-black text-center">
                <th className="border border-black">{index + 1}</th>
                <td className="">${payment.price}</td>
                <td className="border border-black">{payment.transactionId}</td>
                <td className="border border-black">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default PaymentHistory;
