import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useCart from '../../../Hook/useCart';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../Hook/useAuth';

const SellerPayment = () => {
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const {user} = useAuth();

  useEffect(() => {
    if (user.email) {
      fetchSellerPayments();
    }
  }, []);

  const fetchSellerPayments = async () => {
    try {
      const response = await axiosSecure.get(`/seller/${user.email}`);
    //   console.log('Fetched payments:', response.data);
      setPayments(response.data.payments);
    } catch (error) {
      console.error('Error fetching seller payments:', error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Medi corner | Payment</title>
      </Helmet>
      <h2 className='font-bold text-2xl text-center'>Seller Payment History</h2>
      <table className="table">
        <thead>
          <tr className='bg-purple-700 text-white'>
            <th>Email</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td>{payment.email}</td>
              <td>{payment.transactionId}</td>
              <td>${parseFloat(payment.price).toFixed(2)}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPayment;



// import { useState, useEffect } from 'react';
// import useAxiosSecure from '../../../Hook/useAxiosSecure';
// import useCart from '../../../Hook/useCart';
// import { Helmet } from 'react-helmet-async';

// const SellerPayment = () => {
//     const [payments, setPayments] = useState([]);
//     const axiosSecure = useAxiosSecure();
//     const [cart] = useCart();

//     useEffect(() => {
//         if (cart.user_email) {
//             fetchSellerPayments();
//         }
//     }, []);

//     const fetchSellerPayments = async () => {
//         try {
//             const response = await axiosSecure.get(`/seller-sales/${cart.user_email}`);
//             console.log('Fetched payments:', response.data);
//             setPayments(response.data);
//         } catch (error) {
//             console.error('Error fetching seller payments:', error);
//         }
//     };

//     return (
//         <div>
//                <Helmet>
//         <title>Medi corner | Payment</title>
//       </Helmet>
//             <h2 className='font-bold text-2xl'>Seller Payment History</h2>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Payment ID</th>
//                         <th>Amount</th>
//                         <th>Status</th>
//                         {/* Add more columns as needed */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {payments.map(payment => (
//                         <tr key={payment._id}>
//                             <td>{payment._id}</td>
//                             <td>${payment.price.toFixed(2)}</td>
//                             <td>{payment.status}</td>
//                             {/* Add more columns as needed */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default SellerPayment;

