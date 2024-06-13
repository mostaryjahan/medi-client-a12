// import { useState, useEffect } from 'react';
// import useAuth from '../../../Hook/useAuth';
// import useAxiosSecure from '../../../Hook/useAxiosSecure';

// const SellerPayment = () => {
//     const [payments, setPayments] = useState([]);
//     const {user} = useAuth();
//     const axiosSecure = useAxiosSecure()

//     useEffect(() => {
//         fetchSellerPayments();
//     }, []);

//     const fetchSellerPayments = async () => {
//         try {
//             const response = await axiosSecure.get(`/seller-payments/${user.email}`);
//             setPayments(response.data);
//         } catch (error) {
//             console.error('Error fetching seller payments:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Seller Payment History</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Payment ID</th>
//                         <th>Amount</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {payments.map(payment => (
//                         <tr key={payment._id}>
//                             <td>{payment._id}</td>
//                             <td>${payment.price.toFixed(2)}</td> {/* Assuming price is stored as numeric */}
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


import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useCart from '../../../Hook/useCart';
import { Helmet } from 'react-helmet-async';

const SellerPayment = () => {
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();

    useEffect(() => {
        if (cart.seller_email) {
            fetchSellerPayments();
        }
    }, [cart.seller_email]);

    const fetchSellerPayments = async () => {
        try {
            const response = await axiosSecure.get(`/seller-payments/${cart.seller_email}`);
            console.log('Fetched payments:', response.data);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching seller payments:', error);
        }
    };

    return (
        <div>
               <Helmet>
        <title>Medi corner | Payment</title>
      </Helmet>
            <h2>Seller Payment History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment._id}>
                            <td>{payment._id}</td>
                            <td>${payment.price.toFixed(2)}</td>
                            <td>{payment.status}</td>
                            {/* Add more columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellerPayment;

