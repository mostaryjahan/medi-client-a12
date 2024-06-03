import { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";

const FilterCategory = ({ items, title }) => {
  // console.log(items, "items");

  const [selectedItem, setSelectedItem] = useState(null);
  // console.log(selectedItem);
  const modalRef = useRef(null);

  
  const openModal = (item) => {
    setSelectedItem(item);
    document.getElementById('my_modal_5').showModal();
  };
  
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedItem]);


  if (items.length === 0) {
    return null;
  }

  return (
    <div className="pt-8">
      <h2 className="text-center text-xl font-bold mt-4">{title}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}

          <thead className="bg-purple-800 text-white">
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>See Details</th>
              <th>Add to Cart</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <th><img className="w-10 h-10 rounded" src={item.image} alt="" /></th>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <FaEye
                    onClick={() => openModal(item)
                    }
                    className="text-purple-500 h-8 w-4"
                  />
                </td>
                <td>
                  <button className="btn bg-purple-900 text-white">
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {selectedItem && (
      <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="">
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
              <button className="btn bg-red-400">Close</button>
            </form>
          </div>
        </div>
      </dialog>
        )}
    </div>
  );
};

export default FilterCategory;
