
import { useParams } from "react-router-dom";
import FilterCategory from "./FilterCategory";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const CategoryDetails = () => {

  //  const { categoryCard } = useParams();
  const { category } = useParams();

   
    //  console.log(categoryCard )



       const [medicines, setMedicines] = useState([]);

       useEffect(() => {
        fetch("http://localhost:5000/category")
        .then((res) => res.json())
          .then((data) => setMedicines(data));
      }, [category]);


      // useEffect(() => {
      //   fetch("http://localhost:5000/categoryCard")
      //   .then((res) => res.json())
      //     .then((data) => setMedicines(data));
      // }, [categoryCard ]);

      // const filteredMedicines = medicines.filter(medicine => medicine.category === categoryCard );

      const filteredMedicines = medicines.filter(medicine => medicine.category === category);

      
        //  console.log("Filtered medicines:", filteredMedicines); 


  const capsule = filteredMedicines.filter(item => item.category === "Capsule");
  const injection = filteredMedicines.filter(item => item.category === "Injection");
  const tablet = filteredMedicines.filter(item => item.category === "Tablet");
  const syrup = filteredMedicines.filter(item => item.category === "Syrup");

  return (
    <div>
          <Helmet>
        <title>Medi corner | category section</title>
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
