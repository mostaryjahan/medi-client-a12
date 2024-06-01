
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

import { useEffect } from "react";
import { useState } from "react";

const useCategory = () => {
  // const axiosPublic = useAxiosPublic();

  // const {
  //   data: category = [],
  //   isPending: loading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["category"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get("/category");
  //     return res.data;
  //   },
  // });

  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);
  // console.log(category)

  useEffect(() => {
    fetch("/category.json")
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
