import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";

import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: advertisement = [] } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/slider`);
      return res.data;
    },
  });

  // console.log(advertisements);

  const approvedItems = advertisement.filter(
    (item) => item.status === "approve"
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div>
      <Helmet>
        <title>MediCorner | Home</title>
      </Helmet>

      <div className="slider-container mb-6">
        <Slider {...settings}>
          {approvedItems.map((item, index) => (
            <div className="relative " key={index}>
              <img
                className="w-full h-[200px] sm:h-[300px] lg:h-[480px]  "
                src={item.photo}
                alt={`Banner ${index}`}
              />
              <div className="text-white ">
                <p className="text-red-600 absolute bottom-4 right-2 font-medium">
                  {item.description}
                </p>
                <p className="text-red-600 absolute bottom-0 right-2 font-medium"> <span className="text-blue-800">Advertisement By:</span> {item.email}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
