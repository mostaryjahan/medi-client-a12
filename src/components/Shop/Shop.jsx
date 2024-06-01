import { Link } from "react-router-dom";
import useCategory from "../../Hook/useCategory";
import { IoEye } from "react-icons/io5";


const Shop = () => {
    const [category] = useCategory();

    return (
        <div>
           <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">Shop</h1>

            <div className="overflow-x-auto ">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-purple-700 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Company Name</th>
              <th>Generic</th>
              <th>Price</th>
              <th>See more</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {category.map((shop, index) => (
              <tr className="font-bold" key={shop.id}>
                <th>{index + 1}</th>   
                <td>{shop.name}</td>
                <th>{shop.category}</th>
                <td>{shop.company_name}</td>
                <td>{shop.generic_name}</td>
                <td className="">${shop.price}</td>
                <Link to={`/detailsMedicine/${shop.id}`}>
                <th><IoEye className="w-8 h-6 text-purple-500"/></th>
                </Link>
               
                <th><button className="btn bg-purple-900 text-white">Select</button></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default Shop;