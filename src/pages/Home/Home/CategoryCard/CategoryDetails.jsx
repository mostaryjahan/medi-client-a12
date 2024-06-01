
import { useParams } from "react-router-dom";
import useCategory from "../../../../Hook/useCategory";
import FilterCategory from "./FilterCategory";
import { useEffect, useState } from "react";

const CategoryDetails = () => {

   const { category } = useParams();

   
  //  console.log(category)

    // const [selectedMedicine, setSelectedMedicine] = useState(null);

      //  const [categories] = useCategory();

       const [medicines, setMedicines] = useState([]);


      useEffect(() => {
        fetch("/category.json")
        .then((res) => res.json())
          .then((data) => setMedicines(data));
      }, [category]);

      const filteredMedicines = medicines.filter(medicine => medicine.category === category);
      
      // console.log("Filtered medicines:", filteredMedicines); 


  // const handleSelectMedicine = (medicine) => {
  //   setSelectedMedicine(medicine);
   
  // };

  // const handleCloseModal = () => {
  //   setSelectedMedicine(null);
  // };

  const capsule = filteredMedicines.filter(item => item.category === "Capsule");
  const injection = filteredMedicines.filter(item => item.category === "Injection");
  const tablet = filteredMedicines.filter(item => item.category === "Tablet");
  const syrup = filteredMedicines.filter(item => item.category === "Syrup");

  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold mt-4">
        Details of Category Medicine
      </h1>


      <div>
      
         <FilterCategory items={capsule} title= "Capsule"></FilterCategory>

    
         <FilterCategory items={injection} title="Injection" ></FilterCategory>

       
         <FilterCategory items={tablet} title="Tablet" ></FilterCategory>

       
         <FilterCategory items={syrup} title="Syrup" ></FilterCategory>  
        </div>



    </div>
  );
};

export default CategoryDetails;
