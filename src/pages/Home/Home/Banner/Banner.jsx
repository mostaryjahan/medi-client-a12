 import { Swiper, SwiperSlide } from "swiper/react";
// import "./slide.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
 import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Helmet } from "react-helmet-async";

const Banner = () => {

const axiosPublic=useAxiosPublic()
  const { data: advertisementb = [], isPending,refetch } = useQuery({
    queryKey: ["advertisementb"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/slider`);
      return res.data;
    },
  });

console.log(advertisementb);

const approvedItems = advertisementb.filter(item => item.status === "approve");



  return (
    <div>
      {/* <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper1"
      >
       
        {
          approvedItems.map(item=><SwiperSlide key={item._id}>
            <div className="w-full h-full">
              {" "}
              <img className="" src={item.photo} alt="" />
            </div>
            <div>
                <h1>Description: {item.description}</h1>
            </div>
          </SwiperSlide>)
        }
      
      </Swiper> */}

                       <Helmet>
        <title>Medi corner | Home</title>
       </Helmet>
            
            <Carousel autoPlay  infiniteLoop >
          
             {approvedItems.map((item, index) => (
                     <div key={index}>
                         <img className="relative w-full h-fit" src={item.photo} alt={`Banner ${index}`} />
                        <p className="absolute bottom-50 left-0 w-full bg-black bg-opacity-50 text-white p-2">{item.description}</p>
                         <p className="absolute bottom-20 left-0 w-full bg-black bg-opacity-100 text-white p-2">{item.email}</p>
                    </div>
                    
                ))}          
   </Carousel>
    </div>
  );
};

export default Banner;

//  import "react-responsive-carousel/lib/styles/carousel.min.css"; 
//  import { Carousel } from 'react-responsive-carousel';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import useAuth from "../../../../Hook/useAuth";
// import { Helmet } from "react-helmet-async";


// const Banner = () => {
//     const [images, setImages] = useState([]);
//     const {user} = useAuth();

//     // console.log(images)

//     useEffect(() => {
//         const fetchImages = async () => {
//             try {
//                 const response = await axios.get('https://medi-server-omega.vercel.app/slider'); 
//                 setImages(response.data);
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//             }
//         };

//         fetchImages();
//     }, []);

//     return (
        
//         <div className="">
//                 <Helmet>
//         <title>Medi corner | Home</title>
//       </Helmet>
            
//             <Carousel autoPlay  infiniteLoop >
          
//             {images.map((item, index) => (
//                     <div key={index}>
//                         <img className="relative" src={item.medicineImage} alt={`Banner ${index}`} />
//                         <p className="absolute bottom-10 left-0 w-full bg-black bg-opacity-50 text-white p-2">{item.description}</p>
//                         <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2">{item.sellerEmail}</p>
//                     </div>
//                 ))}          
//   </Carousel>
//         </div>
//     );
// };

// export default Banner;
