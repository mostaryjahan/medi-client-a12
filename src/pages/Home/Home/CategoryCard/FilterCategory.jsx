
const FilterCategory = ({ items, title }) => {
  console.log(items, "items");

  return (
    <div className="pt-8">
      <h2 className="text-center text-xl font-bold mt-4">{title}</h2>

      <div className="overflow-x-auto">

        <table className="table">
          {/* head */}
          
         
          <thead className="bg-purple-800 text-white">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (

              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td></td>
              </tr>
             ))}
          </tbody> 

        </table>
       
      </div>

    </div>
  );
};

export default FilterCategory;
