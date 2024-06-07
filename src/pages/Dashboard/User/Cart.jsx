 import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../../Hook/useCart";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();
//   console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  const axiosSecure = useAxiosSecure();

    //  cart items by their unique identifier and calculate quantity
    const groupCartItems = (cart) => {
      const groupedItems = cart.reduce((medicines, item) => {
        const existingItem = medicines.find(i => i.menuId === item.menuId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          medicines.push({ ...item, quantity: 1 });
        }
        return medicines;
      }, []);
      return groupedItems;
    };
  
    const groupedCartItems = groupCartItems(cart);



   
    const handleIncreaseQuantity = (id) => {
      // Check if the item already exists in the cart
      const existingItem = cart.find(item => item._id === id);
      
      if (existingItem) {
        // If the item exists, send a PUT request to increase its quantity
        axiosSecure.put(`/carts/increase/${id}`, { quantity: existingItem.quantity + 1 })
          .then(res => {
            if (res.status === 200) {
              refetch();
            } else {
              console.error("Failed to increase quantity:", res.data.message);
              // Handle error
            }
          })
          .catch(err => {
            console.error("Error increasing quantity:", err);
            // Handle error
          });
      } else {
        // If the item doesn't exist, send a POST request to add it to the cart with quantity 1
        axiosSecure.post(`/carts/${id}`, { quantity: 1 })
          .then(res => {
            if (res.status === 200) {
              refetch();
            } else {
              console.error("Failed to add item to cart:", res.data.message);
              // Handle error
            }
          })
          .catch(err => {
            console.error("Error adding item to cart:", err);
            // Handle error
          });
      }
    };
    
    

  

  //decrease
  const handleDecreaseQuantity = (id) => {
    axiosSecure.delete(`/carts/decrease/${id}`)
      .then(res => {
        if (res.data.deletedCount > 0) {
          refetch();
        }
      });
  };



//delete
  const handleDelete = (menuId) =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
        
          axiosSecure.delete(`/carts/${menuId}`)
          .then(res => {
            if(res.data.deletedCount > 0){
                //refresh data
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
               }          
            })
       
        }
      });
  }


  //clear cart
  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete('/carts')
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Cleared!",
                text: "All items have been removed from your cart.",
                icon: "success"
              });
            }
          });
      }
    });
  };


  return (
    <div>
             <Helmet>
        <title>Medi corner | cart</title>
       </Helmet>
     
      <h1 className="text-3xl font-bold text-center mb-4">Want to Add More?</h1>
      <hr />
      <div className="flex justify-evenly mt-4">
        <h2 className="lg:text-3xl">Total Medicines: {groupedCartItems.length}</h2>
        <h2 className="lg:text-3xl">Total Prices: {totalPrice} $</h2>

        {groupedCartItems.length ?
      <Link to='/dashboard/payment'>
      <button  className="btn bg-orange-400 text-white">Checkout</button>
      </Link>
      :
      <button disabled className="btn bg-orange-400 text-white">Checkout</button>
    }

            <button onClick={handleClearCart} className="btn bg-red-500 text-white">Clear Cart</button>


      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
               groupedCartItems.map((item,index) =>   <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt=""
                            />
                          </div>
                        </div>
                      
                      </div>
                    </td>
                    <td>
                     {
                        item.name
                     }
                    </td>
                    <td>{item.company}</td>
                    <td>$ {item.price_per_unit}</td>
                  

                    <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDecreaseQuantity(item._id)} className="btn btn-sm bg-red-500">-</button>
                    {item.quantity}
                    
                    <button onClick={() => handleIncreaseQuantity(item._id)} className="btn btn-sm bg-green-400">+</button>
                  </div>
                </td>

                    <td>
                      <button 
                      onClick={() => handleDelete(item.menuId)}
                       className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-700 w-6 h-6"></FaTrashAlt></button>
                    </td>
                  </tr>)
            }
          
         
           
          </tbody>
         
        </table>
      </div>
    </div>
  );
};

export default Cart;

//tapox@mailinator.com
//fepedi@mailinator.com