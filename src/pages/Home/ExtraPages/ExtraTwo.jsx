import { Helmet } from "react-helmet-async";

const ExtraTwo = () => {
  return (
    <section className="mt-14 bg-purple-100 dark:text-gray-800">
         <Helmet>
        <title>Medi corner | Home</title>
      </Helmet>
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <h2 className="text-2xl text-center font-semibold sm:text-4xl">
        Frequently Asked Questions
        </h2>
        <p className="mt-4 mb-8 text-center dark:text-gray-600">
        Here are some common questions about Medi Corner. If you do not find your answer, feel free to reach out to us.

        </p>
        <div className="space-y-4">
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 font-semibold focus:outline-none focus-visible:dark:ring-violet-600">
            How do I place an order on Medi Corner?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
            To place an order, log in to your Medi Corner account, browse through our product categories, select the medicine or product you need, and add it to your cart. Once you have added all the items, proceed to checkout, fill in your delivery details, and complete the payment process.

            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 font-semibold py-6 focus:outline-none focus-visible:dark:ring-violet-600">
            Can I cancel or modify my order after placing it?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
            You can cancel or modify your order within a certain timeframe after placing it. To do this, go to your order history, select the order you wish to change, and follow the instructions to cancel or modify it. Please note that once the order is processed for shipping, it cannot be canceled or modified.
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 font-semibold focus:outline-none focus-visible:dark:ring-violet-600">
            What payment methods does Medi Corner accept?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
            Medi Corner accepts a variety of payment methods, including credit/debit cards, net banking, and popular e-wallets. All transactions are securely processed to ensure the safety of your payment information.
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 font-semibold focus:outline-none focus-visible:dark:ring-violet-600">
             Are there any discounts or loyalty programs available?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
            Yes, Medi Corner frequently offers discounts and promotions on various products. Additionally, we have a loyalty program where you can earn points with each purchase, which can be redeemed for discounts on future orders.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default ExtraTwo;
