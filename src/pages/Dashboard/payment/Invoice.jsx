import { Helmet } from 'react-helmet-async';
import useAuth from '../../../Hook/useAuth';
import logo from '../../../assets/medicine.png';

import { Link, useLocation } from 'react-router-dom';


const Invoice = () => {

    const location = useLocation();
    const { transactionId, totalPrice, cart } = location.state;
    const {user} = useAuth();

    const printInvoice = () => {
        window.print();
    }


    
    return (
        <div>
     <Helmet>
        <title>Medi corner | Invoice</title>
      </Helmet>
            <h1 className='text-center mt-4 mb-4 font-bold text-2xl'>Invoice of your payment</h1>
            <div className='flex items-center justify-center'>
            <img src={logo} alt="" className="w-16 h-12 " />
            </div>
            <div className='text-center'>
                <p><span className='font-bold'>Your Transaction ID:</span> {transactionId}</p>
                <p><span className='font-bold'>Total Price:</span> ${totalPrice}</p>
            </div>
            <div className='text-center mt-4'>
                <button className="btn bg-orange-400 text-white" onClick={printInvoice}>Print Invoice</button>
            </div>
            <div className='mt-4'>
                <h2 className='text-center font-bold'>Purchase Details:</h2>
                <ul className='text-center font-semibold'>
                    {cart.map(item => (
                        <li key={item._id}>
                            <li>Medicine Name: {item.name}</li>
                            <li>Price : {item.price} $</li>
                            <li>Quantity: {item.count}</li>
                           
                        </li>
                    ))}
                    <li>Customer name: {user.displayName}</li>
                    <li>Email : {user.email}</li>
                </ul>
                <Link to='/'>
                <p className='text-center mt-6 text-blue-600'>Go back</p>
                </Link>
            </div>
        </div>
    );
};

export default Invoice;
