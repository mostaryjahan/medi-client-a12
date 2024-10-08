import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Helmet } from "react-helmet-async";

const CheckOutPayment = () => {
     const stripePromise = loadStripe(import.meta.env.VITE_Payment);

    return (
        <div>
           

            <div>
            <Helmet>
        <title>Medi corner | checkOut</title>
      </Helmet>
                <h1 className="text-2xl md:4xl font-bold text-center mt-8 mb-8">Pay Your Bill</h1>
              <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
              </Elements>
            </div>
        </div>
    );
};

export default CheckOutPayment;