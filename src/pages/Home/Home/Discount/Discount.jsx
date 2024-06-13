import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './discount.css'
import '../../../../index.css'
import { Helmet } from "react-helmet-async";

const Discount = () => {
    const { discount} = useParams();
    // const [categories] = useCategory();
    // console.log(categories);


const [medicines, setMedicines] = useState([]);


useEffect(() => {
  fetch("http://localhost:5000/category")
  .then((res) => res.json())
    .then((data) => setMedicines(data));
}, [discount]);

const filteredMedicines = medicines.filter(medicine => medicine.discount_medicine === "discount");

// console.log(filteredMedicines)




    return (
        <div>
               <Helmet>
        <title>Medi corner |  Home</title>
      </Helmet>
             
            <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold mt-8">Discount Section</h1>
          
            <div className="mt-8 mb-4">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {filteredMedicines.map((medicine) => (
                        <SwiperSlide key={medicine._id} className="p-4 border rounded-lg ">
                            <img src={medicine.image} alt={medicine.name} className="h-24 w-24 mx-auto"/>
                            <h2 className="md:block hidden md:text-xl font-bold mt-4 text-center">{medicine.name}</h2>
                           
                            <p className="text-center mt-2">Price: ${medicine.price}</p>
                            <p className="text-center text-sm mt-2 ">Discount: {medicine.discount_percentage}%</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
};

export default Discount;