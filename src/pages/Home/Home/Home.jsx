import ExtraOne from "../ExtraPages/ExtraOne";
import ExtraTwo from "../ExtraPages/ExtraTwo";
import Banner from "./Banner/Banner";
import CategoryCard from "./CategoryCard/CategoryCard";

const Home = () => {
    return (
        <div>
           
            <Banner></Banner>
            <CategoryCard></CategoryCard>
            <ExtraOne></ExtraOne>
            <ExtraTwo></ExtraTwo>
        </div>
    );
};

export default Home;