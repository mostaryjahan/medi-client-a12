import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import CategoryCard from "./CategoryCard/CategoryCard";
import Discount from "./Discount/Discount";
import AboutSection from "../../../components/ExtraPages/AboutSection";
import WorkSection from "../../../components/ExtraPages/WorkSection";
import ConsultSection from "../../../components/ExtraPages/ConsultSection";
// import Contract from "../ExtraPages/Contract";

const Home = () => {
    return (
        <div>
       <Helmet>
        <title>Medi corner | Home</title>
      </Helmet>
           
            <Banner></Banner>
            <CategoryCard></CategoryCard>
            <Discount></Discount>
            <AboutSection></AboutSection>
            <ConsultSection></ConsultSection>

            <WorkSection></WorkSection>
            {/* <Contract></Contract> */}
           
          
        
            
        </div>
    );
};

export default Home; 