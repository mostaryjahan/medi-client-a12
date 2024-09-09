import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PaymentManage = () => {
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Get data
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payment-manage-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  
  const totalPages = Math.floor(payments.length / itemsPerPage) + (payments.length % itemsPerPage === 0 ? 0 : 1);

  // Get the payments for the current page
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

  // Handle Accept Payment
  const handleAcceptPayment = async (id) => {
    try {
      await axiosSecure.patch(`/payments/${id}`, { status: "paid" });
      refetch();
    } catch (error) {
      console.error("Error updating payment status", error);
    }
  };

  // Pagination functions
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-4xl mx-auto dark:bg-gray-100 dark:text-black">
      <Helmet>
        <title>MediCorner | Payment Management</title>
      </Helmet>

      <div className="p-4">
        <h1 className="font-bold text-2xl text-center mb-4">Payment Management</h1>

        <table className="min-w-full table">
          <thead>
            <tr className="bg-primary border border-primary text-white text-center">
              <th>SL</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th className="py-2 border border-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment, index) => (
              <tr key={payment._id} className="text-center">
                <td className="border border-gray-800 font-medium px-4 py-2">{indexOfFirstPayment + index + 1}</td>
                <td className="border border-gray-800 font-medium px-4 py-2">{payment.email}</td>
                <td className="border border-gray-800 font-medium px-4 py-2">${payment.price}</td>
                <td className="border border-gray-800 font-medium px-4 py-2">{payment.status}</td>
                <td className="border border-gray-800 font-medium px-4 py-2">
                  {payment.status === "pending" ? (
                    <button
                      className="bg-green-500 text-white py-1 px-2 rounded"
                      onClick={() => handleAcceptPayment(payment._id)}
                    >
                      Accept Payment
                    </button>
                  ) : (
                    "Paid"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-6 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } transition duration-300 ease-in-out`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } transition duration-300 ease-in-out`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentManage;
