 import "react-responsive-carousel/lib/styles/carousel.min.css"; 
 import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../Hook/useAuth";
import { Helmet } from "react-helmet-async";


const Banner = () => {
    const [images, setImages] = useState([]);
    const {user} = useAuth();

    // console.log(images)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/slider'); 
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        
        <div className="">
                <Helmet>
        <title>Medi corner | Home</title>
      </Helmet>
            
            <Carousel autoPlay  infiniteLoop >
          
            {images.map((item, index) => (
                    <div key={index}>
                        <img className="relative" src={item.medicineImage} alt={`Banner ${index}`} />
                        <p className="absolute bottom-10 left-0 w-full bg-black bg-opacity-50 text-white p-2">{item.description}</p>
                        <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2">{item.sellerEmail}</p>
                    </div>
                ))}

         
     
  </Carousel>
        </div>
    );
};

export default Banner;
