import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useCart from '../../../Hook/useCart.jsx';
import useAuth from "../../../Hook/useAuth.jsx";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const CheckOutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const {user} = useAuth();
    const [transactionId, setTransactionId] = useState('');

    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const count = parseInt(item.count) || 1;
      return total + price * count;
    }, 0).toFixed(2);



    
    useEffect(() => {
      if(totalPrice > 0){
        axiosSecure.post('/payment-intent', {price: totalPrice})
        .then(res => {
         console.log(res.data.clientSecret);
         setClientSecret(res.data.clientSecret)
        })
      }
 

     }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();
       
        if(!stripe|| !elements){
          return
      }
      const card = elements.getElement(CardElement)

      if(card === null){
          return
      }
      const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card
      })
      if(error){
          console.log('payment error',error);
           setError(error.message)
      }
     else{
      console.log('payment method',paymentMethod);
       setError('')
     }

     //confirm

     const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
          card: card,
          billing_details: {
              email: user?.email || 'anonymous',
              name: user?.displayName || 'anonymous'
          }
      }
     })

     if(confirmError){
      console.log('confirm error')
     }else{
      console.log('payment intent', paymentIntent)
      if(paymentIntent.status === 'succeeded'){
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // save payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: cart.map(item => item._id),
          menuItemIds: cart.map(item => item.menuId),
          status: 'pending'
         }
       const res = await axiosSecure.post('/payments', payment);
         console.log('payment saved',res.data);
         refetch();
         if(res.data?.paymentResult?.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment successful",
            showConfirmButton: false,
            timer: 1500
          });
          //added
          navigate('/invoice', { state: { transactionId: paymentIntent.id, totalPrice, cart } });

         }
      }
     }

    }
    return (
        <div>
             <Helmet>
        <title>Medi corner | Payment</title>
      </Helmet>
                <form onSubmit={handleSubmit}>
       <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    {/* <Link to='/invoice'> */}
    <button className="btn bg-orange-400 text-whit my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    {/* </Link> */}
      <p className="text-red-500">{error}</p>
      {transactionId && <p className="text-green-600">Your Transaction id: {transactionId}</p>}
       </form>
        </div>
    );
};

export default CheckOutForm;