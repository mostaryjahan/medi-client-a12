
import { useParams } from "react-router-dom";
import FilterCategory from "./FilterCategory";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const CategoryDetails = () => {

  const { category } = useParams();

   
    //  console.log(category )



       const [medicines, setMedicines] = useState([]);

       useEffect(() => {
         fetch("https://medi-server-omega.vercel.app/category")
      //  fetch("http://localhost:5000/category")
        .then((res) => res.json())
          .then((data) => setMedicines(data));
      }, [category]);


      const filteredMedicines = medicines.filter(medicine => medicine.category === category);

      
        //  console.log("Filtered medicines:", filteredMedicines); 


  const capsule = filteredMedicines.filter(item => item.category === "Capsule");
  const injection = filteredMedicines.filter(item => item.category === "Injection");
  const tablet = filteredMedicines.filter(item => item.category === "Tablet");
  const syrup = filteredMedicines.filter(item => item.category === "Syrup");

  return (
    <div>
          <Helmet>
        <title>Medi corner | Home </title>
      </Helmet>
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
