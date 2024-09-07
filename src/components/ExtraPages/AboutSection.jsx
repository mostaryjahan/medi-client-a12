import img from "../../assets/about.jpg"
const AboutSection = () => {
  return (
    
    <div className="hero mt-8 lg:mt-16 dark:bg-slate-100 dark:text-black max-w-6xl mx-auto">
    <div className="hero-content flex-col lg:flex-row">
      <img
        src={img}
        className="sm:w-1/2 lg:h-[280px] rounded-lg mt-6" />
      <div className="">
        <h3 className="font-medium md:text-xl text-center">To know more</h3>
        <h1 className="md:text-4xl text-3xl  font-bold text-center">About Us</h1>
        <p className="py-6">
        Welcome to MediCorner, your trusted online pharmacy. We are dedicated to providing 
            a wide range of medicines and health products from various reputable vendors, all 
            in one convenient location. Our mission is to make healthcare more accessible and 
            hassle-free for everyone.
      
            At MediCorner, we prioritize customer satisfaction and safety, ensuring secure 
            transactions and fast delivery. Our user-friendly interface makes it easy to find 
            and purchase the products you need. Join us in revolutionizing the way you shop 
            for health products online.
        </p>
      </div>
    </div>
  </div>
  );
};

export default AboutSection;
