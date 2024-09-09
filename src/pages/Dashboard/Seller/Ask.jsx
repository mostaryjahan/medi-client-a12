import useCart from "../../../Hook/useCart";
// import "ka-table/style.css";

import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Modaln from "./Modaln";
import { Helmet } from "react-helmet-async";

const Ask = () => {
  const [, refetch] = useCart();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: advertisement = [], refetch: refetchAds } = useQuery({
    queryKey: ["advertisement"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/slider/${user?.email}`);
      refetch();
      return res.data;
    },
    enabled: !!user?.email,
  });
  //   console.log(advertisement);

  const handleRefetch = () => {
    refetchAds();
    refetch();
  };

  return (
    <div className="dark:bg-gray-100 dark:text-black p-4 min-h-screen">
      <Helmet>
        <title>MediCorner | Add Advertisement</title>
      </Helmet>
      <h1 className="text-2xl font-semibold text-center">
        Add Advertisement For Banner
      </h1>

      <div className=" flex justify-center           items-center  my-8">
        <Modaln refetch={handleRefetch}></Modaln>
      </div>

      <div className="overflow-x-auto font-medium  max-w-4xl mx-auto">
        <table className="table">
          <thead>
            <tr className="bg-primary text-white border border-primary text-center">
              <th>#</th>
              <th>Image</th>
              <th>Description</th>
              <th>Status</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {advertisement.map((item, index) => (
              <tr
                key={item._id}
                className="border border-black even:bg-purple-200"
              >
                <th>{index + 1}</th>
                <th>
                  <img
                    src={item.photo}
                    alt="banner"
                    className="md:w-28 w-14 h-12  lg:h-16 rounded-md"
                  />
                </th>

                <td>{item.description}</td>
                <td>{item.status}</td>
                <td> {item.email} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ask;
