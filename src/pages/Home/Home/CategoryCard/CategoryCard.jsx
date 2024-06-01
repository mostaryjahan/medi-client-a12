// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCategory from "../../../../Hook/useCategory";

const CategoryCard = () => {
  const [categories] = useCategory();
  //   const [loading, setLoading] = useState(true);

 

  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
        Category of Medicines
      </h1>
    
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
        {categories.slice(0, 6).map((card) => (
            <Link to={`/categoryDetails/${card.category}`}
            key={card.id}
            className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50text-gray-900"
          >
            <img
              src={card.image}
              alt={card.name}
              className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
            />
            <div className="mt-6 mb-2">
              <h2 className="text-xl font-semibold tracking-wide">
                {card.name}
              </h2>
              <h2 className="font-semibold tracking-wide">
                {card.category}
              </h2>
            </div>
            <p className="text-gray-800">
              Quantity Medicines in this category: {card.number_of_medicines_in_category} pieces
            </p>
            </Link>
        ))}
      </div>
      
    </div>
  );
};

export default CategoryCard;
