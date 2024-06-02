import useCategory from "../../Hook/useCategory";
import { IoEye } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

const Shop = () => {
  const [category] = useCategory();

  const [selectedItem, setSelectedItem] = useState(null);
  //  console.log(selectedItem);
  const modalRef = useRef(null);

  
  const openModal = (shop) => {
    setSelectedItem(shop);
    document.getElementById('my_modal_5').showModal();
  };
  
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedItem]);


  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
        Shop
      </h1>

      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-purple-700 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>See Details</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {category.map((shop, index) => (
              <tr className="font-bold" key={shop.id}>
                <th>{index + 1}</th>
                <td>{shop.name}</td>
                <th>{shop.category}</th>
                <td className="">${shop.price}</td>
                <td>
                <IoEye
                    onClick={() => openModal(shop)
                    }
                    className="text-purple-500 h-8 w-4"
                  />
                </td>

                <th>
                  <button className="btn bg-purple-900 text-white">
                    Select
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* Modal */}
        {selectedItem && (
      <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between">
            <div>
                <img src={selectedItem.image} alt="image" />
            </div>
            <div className="">
            <h3 className="font-bold text-lg">Name: {selectedItem.name}</h3>
            <p className="py-4"><span className="font-bold">Price: </span>
            {selectedItem.price} $
          </p>
            <p className="py-4"><span className="font-bold">Category: </span>
            {selectedItem.category}
          </p>
          <p className="py-4"><span className="font-bold">Company: </span>
            {selectedItem.company_name}
          </p>
          <p className="py-4"><span className="font-bold">Description: </span>
            {selectedItem.description}
          </p>
          <p className="py-4"><span className="font-bold">Generic Name: </span>
            {selectedItem.generic_name}
          </p>
          <p className="py-4"><span className="font-bold">Price Per Unit: </span>
            {selectedItem.price_per_unit} $
          </p>
          <p className="py-4"><span className="font-bold">Item Mass Unit: </span>
            {selectedItem.item_mass_unit}
          </p>
          <p className="py-4"><span className="font-bold">Quantity: </span>
            {selectedItem.number_of_medicines_in_category} piece
          </p>
          <p className="py-4"><span className="font-bold">Discount: </span>
            {selectedItem.discount_medicine}
          </p>
          <p className="py-4"><span className="font-bold">Discount Percentage: </span>
            {selectedItem.discount_percentage} %
          </p>
            </div>
          </div>
         
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
        )}
    </div>
  );
};

export default Shop;

