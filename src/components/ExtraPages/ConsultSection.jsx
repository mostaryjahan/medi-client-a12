import img from "../../assets/doctor.png";
const ConsultSection = () => {
  return (
    <div className="sm:flex justify-center items-center bg-blue-200 dark:text-black px-0 md:px-6 mt-10 lg:mt-16">
        
      <div className=" space-y-2 p-8">
        <h1 className="text-2xl md:text-4xl font-bold">Hello!!</h1>
        <p className="text-lg md:text-2xl font-medium">Consult your doctor through us & get discount for buy anything from us.</p>
        <input
          id="email"
          type="text"
          className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded sm:mx-2 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring "
          placeholder="Email Address"
        />

        <button className="px-6 py-2 text-sm text-white  bg-primary rounded sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-500">
          Get Started
        </button>
      </div>

      <div className="md:w-1/2">
        <img src={img} alt="doctor" className="pr-10 h-[300px]" />
      </div>
    </div>
  );
};

export default ConsultSection;
