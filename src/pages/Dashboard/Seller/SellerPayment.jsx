


import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useCart from '../../../Hook/useCart';
import { Helmet } from 'react-helmet-async';

const SellerPayment = () => {
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();

    useEffect(() => {
        if (cart.user_email) {
            fetchSellerPayments();
        }
    }, []);

    const fetchSellerPayments = async () => {
        try {
            const response = await axiosSecure.get(`/seller-payments/${cart.user_email}`);
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
            <h2 className='font-bold text-2xl'>Seller Payment History</h2>
            <table className="table">
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

