import { Link } from "react-router-dom";
import error from "../assets/404.png";
import { Helmet } from "react-helmet-async";

const Error = () => {
  return (
    <div>
         <Helmet>
        <title>Medi corner | error</title>
      </Helmet>
      <img
        src={error}
        alt=""
        className="md:w-[550px] h-[300px] border-2 mt-4 rounded-lg mb-4 mx-auto p-4"
      />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center font-bold lg:text-5xl mb-4">
          Page not founded <br /> Enter the right path
        </h1>
        <Link to="/">
          <button className="btn bg-purple-500 text-white">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
