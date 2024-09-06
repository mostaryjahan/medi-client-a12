import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useCart from "../../../Hook/useCart.jsx";
import useAuth from "../../../Hook/useAuth.jsx";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  const [transactionId, setTransactionId] = useState("");

  const navigate = useNavigate();

  const totalPrice = cart
    .reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const count = parseInt(item.count) || 1;
      return total + price * count;
    }, 0)
    .toFixed(2);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post("/payment-intent", { price: totalPrice }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    //confirm

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log('confirm error')
    } else {
      // console.log('payment intent', paymentIntent)
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // save payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
          //edited
          seller_email: cart.map((item) => item.email),
          nameOfMedicine: cart.map((item) => item.name),
        };
        const res = await axiosSecure.post("/payments", payment);
        //  console.log('payment saved',res.data);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment successful",
            showConfirmButton: false,
            timer: 1500,
          });
          //added
          navigate("/invoice", {
            state: { transactionId: paymentIntent.id, totalPrice, cart },
          });
        }
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Medi corner | Payment</title>
      </Helmet>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4 mt-10 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Complete Your Payment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="border border-gray-600 rounded-lg p-4 mb-2">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <button
            className="w-full mt-6 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay Now
          </button>
          <p className="text-red-500 mt-4">{error}</p>
          {transactionId && (
            <p className="text-green-600 mt-4">
              Your Transaction ID: {transactionId}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
