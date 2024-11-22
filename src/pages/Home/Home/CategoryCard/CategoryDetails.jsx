import { useParams } from "react-router-dom";
import FilterCategory from "./FilterCategory";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const CategoryDetails = () => {
  const { category } = useParams();

  const axiosPublic = useAxiosPublic();


const {  data: medicines = []} = useQuery({
  queryKey: ['discount-home'],
  queryFn: async () => {
    const res = await axiosPublic.get('/category');
    return res.data
  }
})
const filteredMedicines = medicines.filter(
  (medicine) => medicine.category.toLowerCase() === category.toLowerCase()
);
 

  const capsule = filteredMedicines.filter(
    (item) => item.category === "Capsule"
  );
  const injection = filteredMedicines.filter(
    (item) => item.category === "Injection"
  );
  const tablet = filteredMedicines.filter((item) => item.category === "Tablet");
  const syrup = filteredMedicines.filter((item) => item.category === "Syrup");
  const others = filteredMedicines.filter((item) => item.category === "others" || item.category === "Others");

  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>Medi corner | Home </title>
      </Helmet>
      <h1 className="text-center text-2xl md:text-3xl dark:text-black font-bold pt-6">
        Details of Category Medicine
      </h1>

      <div>
        <FilterCategory items={capsule} title="Capsule"></FilterCategory>

        <FilterCategory items={injection} title="Injection"></FilterCategory>

        <FilterCategory items={tablet} title="Tablet"></FilterCategory>

        <FilterCategory items={syrup} title="Syrup"></FilterCategory>

        <FilterCategory items={others} title="Others"></FilterCategory>
      </div>
    </div>
  );
};

export default CategoryDetails;
