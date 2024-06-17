import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';

const SellerPayment = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  
  const { data: sales = [] } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-payments/${user.email}`);
      return res.data;
    },
  });
//  console.log(sales);



  return (
    <div>
      <Helmet>
        <title>Medi corner | Payment</title>
      </Helmet>
      <h2 className='font-bold text-2xl text-center'>Seller Payment History</h2>
      <table className="table">
        <thead>
          <tr className='bg-purple-700 text-white'>
            <th>Medicine</th>
            <th>Buyer Email</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {sales.map(payment => (
            <tr key={payment?._id}>
              <td>{payment?.nameOfMedicine}</td>
              <td>{payment?.email}</td>
              <td>{payment?.transactionId}</td>
              <td>${parseFloat(payment?.price).toFixed(2)}</td>
              <td>{payment?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPayment;


