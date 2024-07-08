import { Helmet } from "react-helmet-async";
import ExtraOne from "../ExtraPages/ExtraOne";
// import ExtraTwo from "../ExtraPages/ExtraTwo";
import Banner from "./Banner/Banner";
import CategoryCard from "./CategoryCard/CategoryCard";
import Discount from "./Discount/Discount";
import Contract from "../ExtraPages/Contract";

const Home = () => {
    return (
        <div>
       <Helmet>
        <title>Medi corner | Home</title>
      </Helmet>
           
            <Banner></Banner>
            <CategoryCard></CategoryCard>
            <Discount></Discount>
            <ExtraOne></ExtraOne>
            {/* <ExtraTwo></ExtraTwo> */}
            <Contract></Contract>
           
          
        
            
        </div>
    );
};

export default Home;