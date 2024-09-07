import { Helmet } from "react-helmet-async";
import img1 from "../../assets/pic1.avif";
import img2 from "../../assets/pic2.png";
import img3 from "../../assets/pic3.png";

const WorkSection = () => {
  return (
    <div className="mt-12 lg:mt-20 bg-base-100 dark:text-black ">
      <Helmet>
        <title>Medi corner | Home</title>
      </Helmet>
      <h3 className="font-medium md:text-xl text-center pt-4">To know more</h3>
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        How MediCorner Works
      </h1>

      <div className="flex flex-col lg:flex-row justify-around items-center gap-10 py-10 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <img src={img1} alt="Compare Prices" className="w-32 h-32 mb-4" />
          <h3 className="text-2xl font-semibold mb-1">Compare prices</h3>
          <p className="text-gray-800 font-medium w-[250px] lg:w-auto">
            Drug prices vary by pharmacy. Use GoodRx to find current prices and
            discounts.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={img2} alt="Get Free Coupons" className="w-32 h-32 mb-4" />
          <h3 className="text-2xl font-semibold mb-1">Get free coupons</h3>
          <p className="text-gray-800 font-medium  w-[250px] lg:w-auto">
            GoodRx coupons can help you pay less than the cash price for your
            prescription.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={img3} alt="Show to Pharmacist" className="w-32 h-32 mb-4" />
          <h3 className="text-2xl font-semibold mb-1">
            Show to your pharmacist
          </h3>
          <p className="text-gray-800 font-medium  w-[250px] lg:w-auto">
            It is easy. Just bring your free coupon to the pharmacy when picking
            up your prescription.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
