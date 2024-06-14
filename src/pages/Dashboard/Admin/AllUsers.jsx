
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
// import { FaTrashAlt } from "react-icons/fa";

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
        <title>Medi corner | All Users</title>
      </Helmet>
            <h1 className="text-center text-3xl">Manage All Users</h1>
            <p>Total Users: {users.length}</p>

            {/*  */}
            <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-purple-400">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((user,index) =>   <tr key={user._id}>
                   
                    <th>{index + 1}</th>
                    <td> {user.name} </td>
                    <td> {user.email}</td>
                    <td>

                         {user.role !== "admin" && (
                      <button onClick={() => updateUserRole(user, "admin")} className="btn bg-orange-400">
                        Make Admin
                      </button>
                    )}
                    {user.role !== "seller" && (
                      <button onClick={() => updateUserRole(user, "seller")} className="btn bg-orange-400">
                        Make Seller
                      </button>
                    )}
                    {user.role !== "user" && (
                      <button onClick={() => updateUserRole(user, "user")} className="btn bg-orange-400">
                        Make User
                      </button>
                    )}
                    </td>
                    {/* <th>
                      <button 
                      onClick={() => handleDelete(user)}
                       className="btn btn-ghost btn-lg">
                        <FaTrashAlt className="text-red-700 w-6 h-6">
                        </FaTrashAlt>
                        </button>
                    </th> */}
                  </tr>)
            }
          
         
           
          </tbody>
         
        </table>
      </div>
        </div>
    );
};

export default AllUsers;