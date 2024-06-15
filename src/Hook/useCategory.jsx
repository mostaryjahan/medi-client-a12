
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

import { useEffect } from "react";
import { useState } from "react";

const useCategory = () => {
  

  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);
  // console.log(category)

  useEffect(() => {
    fetch("https://medi-server-omega.vercel.app/category")
      .then((res) => res.json())
      .then((data) => {

        setCategories(data);
        // setLoading(false)
      });
  }, []);

  return [categories];

  // return [category, loading, refetch];
};

export default useCategory;
