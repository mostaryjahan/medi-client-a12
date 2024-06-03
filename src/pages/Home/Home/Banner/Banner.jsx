import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../../assets/banner/banner3.jpg"
import img2 from "../../../../assets/banner/banner4.jpg"
import img3 from "../../../../assets/banner/banner5.jpg"
import img4 from "../../../../assets/banner/banner6.jpg"

const Banner = () => {
    return (
        <div className="">
            
            <Carousel autoPlay  infiniteLoop >
          
          <div>
          <img  src={img1} />
      </div>
      <div>
          <img src={img2} />
      </div>
      <div>
          <img src={img3} />
      </div>
      <div>
          <img src={img4} />
      </div>
     
         
     
  </Carousel>
        </div>
    );
};

export default Banner;