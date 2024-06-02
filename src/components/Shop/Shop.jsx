import useCategory from "../../Hook/useCategory";
import { IoEye } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

const Shop = () => {
  const [category] = useCategory();

  const [selectedItem, setSelectedItem] = useState(null);
  //  console.log(selectedItem);
  const modalRef = useRef(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

   // Sorting state
   const [sortOrder, setSortOrder] = useState("asc");

   // Search state
   const [searchQuery, setSearchQuery] = useState("");


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  // Sorting logic
  const sortedItems = [...currentItems].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  // Search logic
  const filteredItems = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.generic_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openModal = (shop) => {
    setSelectedItem(shop);
    document.getElementById("my_modal_5").showModal();
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
         {/* Search Input */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
          {/* Sort Button */}
          <div className="flex justify-end my-4">
        <button
          className="btn bg-purple-700 text-white"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
        </button>
      </div>

      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-purple-700 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th>See Details</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((shop, index) => (
              <tr className="font-bold" key={shop.id}>
                <th>{index + 1}</th>
                <td>{shop.name}</td>
                <th>{shop.company_name}</th>
                <td className="">${shop.price}</td>
                <td>
                  <IoEye
                    onClick={() => openModal(shop)}
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
      {/* Pagination */}
      <div className="flex justify-center my-4">
        {Array.from(
          { length: Math.ceil(category.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              className={`btn ${currentPage === i + 1 ? "btn-active bg-purple-700 text-white" : "bg-white text-purple-700"}`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
      {/* Modal */}
      {selectedItem && (
        <dialog
          ref={modalRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="md:flex justify-between">
              <div>
                <img src={selectedItem.image} alt="image" />
              </div>
              <div className="">
                <h3 className="font-bold text-lg">Name: {selectedItem.name}</h3>
                <p className="py-4">
                  <span className="font-bold">Price: </span>
                  {selectedItem.price} $
                </p>
                <p className="py-4">
                  <span className="font-bold">Category: </span>
                  {selectedItem.category}
                </p>
                <p className="py-4">
                  <span className="font-bold">Company: </span>
                  {selectedItem.company_name}
                </p>
                <p className="py-4">
                  <span className="font-bold">Description: </span>
                  {selectedItem.description}
                </p>
                <p className="py-4">
                  <span className="font-bold">Generic Name: </span>
                  {selectedItem.generic_name}
                </p>
                <p className="py-4">
                  <span className="font-bold">Price Per Unit: </span>
                  {selectedItem.price_per_unit} $
                </p>
                <p className="py-4">
                  <span className="font-bold">Item Mass Unit: </span>
                  {selectedItem.item_mass_unit}
                </p>
                <p className="py-4">
                  <span className="font-bold">Quantity: </span>
                  {selectedItem.number_of_medicines_in_category} piece
                </p>
                <p className="py-4">
                  <span className="font-bold">Discount: </span>
                  {selectedItem.discount_medicine}
                </p>
                <p className="py-4">
                  <span className="font-bold">Discount Percentage: </span>
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
