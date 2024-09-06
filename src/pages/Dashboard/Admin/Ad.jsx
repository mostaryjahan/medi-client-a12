import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Ad = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [approve, setApprove] = useState(false);

  const {
    data: advertisemente = [],
   
    refetch,
  } = useQuery({
    queryKey: ["advertisemente"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/slider`);
      return res.data;
    },
  });
  const handleApprove = (id) => {
    setApprove(!approve);
    console.log(approve, id);
    axiosSecure.patch(`/slider/approve/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Admin make approval for advertisement`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    });
  };
  const handlepending = (id) => {
    setApprove(!approve);
    console.log(approve, id);
    axiosSecure.patch(`/slider/pending/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Admin make pending for advertisement`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    });
  };

  return (
    <div className="p-4 font-bold dark:bg-gray-100 dark:text-black">
         <Helmet>
        <title>Medi corner | Manage Banner</title>
      </Helmet>
     <h1 className="text-2xl md:text-3xl font-bold text-center">Manage Advertisement</h1>
      <div className="overflow-x-auto p-2 w-full mt-6">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="bg-primary border border-primary text-white">
              <th>SL</th>
              <th>description</th>
              <th>Email</th>
              <th>status</th>
              <th>photo</th>
              <th>Status Change</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {advertisemente?.map((user, index) => (
              <tr key={user._id} className="even:bg-purple-200 my-3">
                <td className="border border-black">{index + 1}</td>
                <td className="border border-black">{user?.description}</td>
                <td className="border border-black">{user?.email}</td>
                <td className="border border-black">{user?.status}</td>
                <td className="border border-black min-w-28 md:min-w-12 md:max-w-16">
                  <img
                    src={user?.photo}
                    className="size-full rounded"
                    alt=""
                  />
                </td>
                <td className="border border-black">
                  {user?.status === "pending" ? (
                    <button
                      onClick={() => handleApprove(user?._id)}
                      className="btn bg-green-500 text-white hover:bg-special-button-hover hover:text-black"
                    >
                 Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handlepending(user?._id)}
                      className="btn bg-red-500 text-white hover:bg-special-button-hover hover:text-black"
                    >
                      InActive
                    </button>
                  )}
                </td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ad;
  