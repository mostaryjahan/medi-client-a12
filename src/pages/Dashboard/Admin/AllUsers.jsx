import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const totalPages = Math.ceil(users.length / usersPerPage);

  // Get the current users for the page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Update role function
  const updateUserRole = (user, role) => {
    axiosSecure
      .patch(`/users/${user._id}/role`, { role })
      .then((res) => {
        if (res.data.message === "Role updated successfully") {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${user.name} is now a ${role}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error("Error updating user role:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to update role",
          text: err.message,
        });
      });
  };

  // Pagination functions
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dark:bg-slate-100 dark:text-black">
      <Helmet>
        <title>MediCorner | All Users</title>
      </Helmet>
      <div className="p-8 lg:p-4 max-w-5xl mx-auto">
        <h1 className="text-center text-3xl font-bold">Manage All Users</h1>
        <p className="text-base font-medium text-center mt-4 mb-2">
          ( Total Users: {users.length} )
        </p>

        <div className="dark:text-black">
          <table className="min-w-full table font-medium">
            <thead>
              <tr className="bg-primary border border-primary text-center text-white">
                <th className="py-2">#</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id} className="even:bg-purple-200">
                  <td className="border border-gray-700 px-4 py-2">
                    {indexOfFirstUser + index + 1}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {user.role}
                  </td>
                  <td className="border border-gray-700 space-x-1 space-y-1">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => updateUserRole(user, "admin")}
                        className="btn text-white bg-blue-500 hover:bg-blue-700 rounded-md px-2 py-1 text-sm font-semibold"
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role !== "seller" && (
                      <button
                        onClick={() => updateUserRole(user, "seller")}
                        className="btn text-white bg-green-500 hover:bg-green-600 rounded-md px-2 py-1 text-sm font-semibold"
                      >
                        Make Seller
                      </button>
                    )}
                    {user.role !== "user" && (
                      <button
                        onClick={() => updateUserRole(user, "user")}
                        className="btn text-white bg-orange-500 hover:bg-orange-600 rounded-md px-2 py-1 text-sm font-semibold"
                      >
                        Make User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Beautiful Pagination Controls */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition duration-300 ease-in-out`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition duration-300 ease-in-out`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
