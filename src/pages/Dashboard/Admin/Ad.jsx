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
    <div className=" font-bold ">
     <Helmet>
      medi corner | approve banner
     </Helmet>
      <div className="overflow-x-auto p-2 w-full font-popins ">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
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
              <tr key={user._id} className="bg-base-200 my-3">
                <th>{index + 1}</th>
                <td>{user?.description}</td>
                <td>{user?.email}</td>
                <td>{user?.status}</td>
                <td>
                  <img
                    src={user?.photo}
                    className="w-[100px] h-[100px]"
                    alt=""
                  />
                </td>
                <td>
                  {user?.status === "pending" ? (
                    <button
                      onClick={() => handleApprove(user?._id)}
                      className="btn bg-primary text-white hover:bg-special-button-hover hover:text-black"
                    >
                 Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handlepending(user?._id)}
                      className="btn bg-primary text-white hover:bg-special-button-hover hover:text-black"
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
