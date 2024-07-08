import img from "../../../assets/about.jpg"
const ExtraOne = () => {
  return (
    
    <div className="hero mt-8">
    <div className="hero-content flex-col lg:flex-row">
      <img
        src={img}
        className="sm:w-1/2 rounded-lg mt-6" />
      <div className="text-center">
        <h3 className="font-medium md:text-xl">To know more</h3>
        <h1 className="md:text-5xl text-3xl  font-bold">About Us</h1>
        <p className="py-6">
        Welcome to Medi Corner, your trusted online pharmacy. We are dedicated to providing 
            a wide range of medicines and health products from various reputable vendors, all 
            in one convenient location. Our mission is to make healthcare more accessible and 
            hassle-free for everyone.
      
            At Medi Corner, we prioritize customer satisfaction and safety, ensuring secure 
            transactions and fast delivery. Our user-friendly interface makes it easy to find 
            and purchase the products you need. Join us in revolutionizing the way you shop 
            for health products online.
        </p>
      </div>
    </div>
  </div>
  );
};

export default ExtraOne;
