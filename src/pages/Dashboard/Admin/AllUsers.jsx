
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data: users =[], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{

         const res = await axiosSecure.get('/users');
         return res.data;
        }
    });


    //update role
    const updateUserRole = (user, role) => {
        axiosSecure.patch(`/users/${user._id}/role`, { role })
          .then(res => {
            if (res.data.message === "Role updated successfully") {
              refetch();
              Swal.fire({
                icon: "success",
                title: `${user.name} is now a ${role}`,
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
          .catch(err => {
            console.error("Error updating user role:", err);
            Swal.fire({
              icon: "error",
              title: "Failed to update role",
              text: err.message,
            });
          });
      }



    // const handleDelete = (user) =>{
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //       }).then((result) => {
    //         if (result.isConfirmed) {
            
    //           axiosSecure.delete(`users/${user._id}`)
    //           .then(res => {
    //             if(res.data.deletedCount > 0){
    //                 //refresh data
    //                 refetch();
    //                 Swal.fire({
    //                     title: "Deleted!",
    //                     text: "Your file has been deleted.",
    //                     icon: "success"
    //                   });
    //                }          
    //             })
           
    //         }
    //       });
    //   }
    
    return (
        <div>
             <Helmet>
        <title>MediCorner | All Users</title>
      </Helmet>
      <div className="p-4 dark:bg-slate-100 dark:text-black">

     
            <h1 className="text-center text-3xl ">Manage All Users</h1>
            <p className="text-base font-medium text-center mt-4 mb-2">( Total Users: {users.length} )</p>

            <div className=" dark:text-black ">
        <table className="min-w-full table font-medium ">
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
            {
                users.map((user,index) =>   <tr key={user._id} className="even:bg-purple-200">
                   
                    <td className="border border-gray-700 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-700 px-4 py-2"> {user.name} </td>
                    <td className="border border-gray-700 px-4 py-2"> {user.email}</td>
                    <td className="border border-gray-700 px-4 py-2">{user.role}</td>
                    <td className="border border-gray-700 space-x-1 space-y-1">

                         {user.role !== "admin" && (
                      <button onClick={() => updateUserRole(user, "admin")} className="btn border-none text-black bg-blue-500 hover:bg-blue-700">
                        Make Admin
                      </button>
                    )}
                    {user.role !== "seller" && (
                      <button onClick={() => updateUserRole(user, "seller")} className="btn border-none text-black bg-green-500 hover:bg-green-500">
                        Make Seller
                      </button>
                    )}
                    {user.role !== "user" && (
                      <button onClick={() => updateUserRole(user, "user")} className="btn border-none text-black bg-orange-500 hover:bg-orange-700">
                        Make User
                      </button>
                    )}
                    </td>
              
                  </tr>)
            }
          
         
           
          </tbody>
         
        </table>
      </div>
        </div>
        </div>
    );
};

export default AllUsers;