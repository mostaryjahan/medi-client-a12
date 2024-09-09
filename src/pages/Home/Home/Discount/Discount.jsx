import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Typewriter } from 'react-simple-typewriter';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Discount = () => {
  const axiosPublic = useAxiosPublic();

  const handleDone = () => {
    // console.log(`Done after 100000 loops!`);
  };

  const { data: medicines = [] } = useQuery({
    queryKey: ['discount-home'],
    queryFn: async () => {
      const res = await axiosPublic.get('/category');
      return res.data;
    },
  });

  const filteredMedicines = medicines.filter(medicine => medicine.discount_medicine === "discount");

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,

    responsive: [
        {
          breakpoint: 1024, 
          settings: {
            slidesToShow: 4, 
          },
        },
        {
          breakpoint: 768, 
          settings: {
            slidesToShow: 3, 
          },
        },
        {
          breakpoint: 640, 
          settings: {
            slidesToShow: 2, 
          },
        },
      ],
    
  };

  return (
    <div className='text-black'>
      <Helmet>
        <title>MediCorner | Home</title>
      </Helmet>

      <h1 className="text-center font-semibold lg:text-4xl text-2xl mt-14 text-black">
        <span style={{ color: '', fontWeight: 'bold' }}>
          <Typewriter
            words={['Discount Medicines']}
            loop={1000000}
            cursor
            cursorStyle='...'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={handleDone}
          />
        </span>
      </h1>

      {/* Slick Slider with discount medicines */}
      <div className="mt-6 mb-4 slider-container max-w-7xl mx-auto ">
        <Slider {...sliderSettings}>
          {filteredMedicines.map((medicine) => (
            <div key={medicine._id} className="p-4 border-4 border-white bg-blue-200 ">
              <img src={medicine.image} alt={medicine.name} className="h-24 w-32 mx-auto" />
              <h2 className="md:block hidden md:text-xl font-bold mt-4 text-center">{medicine.name}</h2>
              <p className="text-center font-medium mt-2">Price: ${medicine.price}</p>
              <p className="text-center font-semibold text-sm mt-2">Discount: {medicine.discount_percentage}%</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Discount;
