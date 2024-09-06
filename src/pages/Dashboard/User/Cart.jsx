import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../../Hook/useCart";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();

  //   console.log(cart);

  const axiosSecure = useAxiosSecure();

  const totalPrice = cart
    .reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const count = parseInt(item.count) || 1;
      return total + price * count;
    }, 0)
    .toFixed(2);

  const groupCartItems = (cart) => {
    const groupedItems = cart.reduce((medicines, item) => {
      const existingItem = medicines.find((i) => i.menuId === item.menuId);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        medicines.push({ ...item, count: item.count || 1 });
      }
      return medicines;
    }, []);
    return groupedItems;
  };
  const groupedCartItems = groupCartItems(cart);
  // console.log(groupedCartItems);

  const handleIncreaseQuantity = async (id) => {
    try {
      console.log(id);
      const response = await axiosSecure.put(`/carts/increase/${id}`);
      console.log("Response from server:", response);

      refetch();
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  const handleDecreaseQuantity = async (id) => {
    try {
      console.log(id);
      const response = await axiosSecure.put(`/carts/decrease/${id}`);
      console.log("Response from server:", response);

      refetch();
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  //delete
  const handleDelete = (menuId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${menuId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            //refresh data
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  //clear cart
  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete("/carts").then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Cleared!",
              text: "All items have been removed from your cart.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-blue-100 p-4 dark:text-black min-h-screen">
      <Helmet>
        <title>MediCorner | cart</title>
      </Helmet>

      <h1 className="text-2xl font-bold text-center  mb-4">Want to Add More?</h1>
      <hr className=""/>
      <div className="flex justify-evenly mt-4">
        <h2 className="lg:text-3xl font-medium">Total Prices: {totalPrice} $</h2>

        <button onClick={handleClearCart} className="btn bg-red-500 border-none text-white">
          Clear Cart
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto mt-4 ">
        <table className="table mb-4">
          {/* head */}
          <thead>
            <tr className="text-white bg-primary border border-primary">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border border-black">
            {groupedCartItems.map((item, index) => (
              <tr key={item._id} className="even:bg-purple-100 border border-black">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>$ {item.price_per_unit}</td>

                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item._id)}
                      className="btn btn-sm bg-white border-2 border-red-600 text-red-600"
                    >
                      -
                    </button>

                    {item.count}

                    <button
                      onClick={() => handleIncreaseQuantity(item._id)}
                      className="btn btn-sm bg-white border-2 border-green-600 text-green-600 "
                    >
                      +
                    </button>
                  </div>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(item.menuId)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-700 w-6 h-6"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {groupedCartItems.length ? (
          <Link to="/payment">
            <button className="btn border-none text-white bg-green-500 hover:bg-green-700">Checkout</button>
          </Link>
        ) : (
          <button  className="btn border-none hover:bg-orange-700 text-white bg-orange-500">
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
