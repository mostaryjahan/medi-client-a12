// import "./slide.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
 import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Helmet } from "react-helmet-async";

const Banner = () => {

const axiosPublic=useAxiosPublic()
  const { data: advertisementb = []} = useQuery({
    queryKey: ["advertisementb"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/slider`);
      return res.data;
    },
  });

// console.log(advertisementb);

const approvedItems = advertisementb.filter(item => item.status === "approve");



  return (
    <div>
  

       <Helmet>
        <title>Medi corner | Home</title>
       </Helmet>
            
            <Carousel autoPlay  infiniteLoop >
          
             {approvedItems.map((item, index) => (
                     <div className="relative w-full" key={index}>
                         <img className="w-full object-cover  " src={item.photo} alt={`Banner ${index}`} />
                         <div className="rounded-md text-white md:p-6 absolute  top-5 left-1/2  bg-white sm:bg-opacity-0 bg-opacity-50 -translate-x-1/2">
                         <p className=" md:text-2xl font-bold capitalize text-purple-800">{item.description}</p>
                         <p className="text-black">Banner By : {item.email}</p>
                         </div>
                      
                    </div>
                    
                ))}          
   </Carousel>
    </div>
  );
};

export default Banner;




        

