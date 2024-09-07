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
    <div className="dark:bg-gray-100 dark:text-black p-4 min-h-screen">
      <Helmet>
        <title>MediCorner | Payment</title>
      </Helmet>
      <h2 className='font-bold text-2xl text-center mb-4'>Seller Payment History</h2>
      <table className="table font-medium">
        <thead>
          <tr className='bg-primary border border-primary text-white'>
            <th>Medicine</th>
            <th>Buyer Email</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {sales.map(payment => (
            <tr key={payment?._id} className='border border-black'>
              <td className='border border-black'>{payment?.nameOfMedicine}</td>
              <td className='border border-black'>{payment?.email}</td>
              <td className='border border-black'>{payment?.transactionId}</td>
              <td className='border border-black'>${parseFloat(payment?.price).toFixed(2)}</td>
              <td className='border border-black'>{payment?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPayment;


