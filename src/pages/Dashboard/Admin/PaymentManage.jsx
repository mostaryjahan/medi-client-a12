import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const PaymentManage = () => {
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axiosSecure.get('/payments');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments', error);
        }
    };
    
    const handleAcceptPayment = async (id) => {
        try {
            await axiosSecure.patch(`/payments/${id}`, { status: 'paid' });
            fetchPayments();
        } catch (error) {
            console.error('Error updating payment status', error);
        }
    };


    return (
        <div>
               <Helmet>
        <title>Medi corner | Payment Manage</title>
      </Helmet>
            <h1 className="font-bold text-3xl text-center mt-10">Payment Management</h1>

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Email</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment._id}>
                            <td className="border px-4 py-2">{payment.email}</td>
                            <td className="border px-4 py-2">${payment.price}</td>
                            <td className="border px-4 py-2">{payment.status}</td>
                            <td className="border px-4 py-2">
                                {payment.status === 'pending' ? (
                                    <button
                                        className="bg-green-500 text-white py-1 px-3 rounded"
                                        onClick={() => handleAcceptPayment(payment._id)}
                                    >
                                        Accept Payment
                                    </button>
                                     ) : (
                                        'Paid'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentManage;