import { useState, useEffect } from "react";

import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();

  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // console.log(editingCategory)

  const [newCategory, setNewCategory] = useState({
    
    category: "",
    image: "",
     number_of_medicine: "",
  
  });

  const image_hosting_key = import.meta.env.VITE_Image_Hosting_key;

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.data.display_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const file = e.target.elements.image.files[0];
    const imageUrl = await handleImageUpload(file);

    if (!imageUrl) {
      Swal.fire({
        icon: "error",
        title: "Failed to upload image",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {
      await axiosSecure.post("/categoryCard", {
        ...newCategory,
        image: imageUrl,
      });
      fetchCategories();
      setNewCategory({
  
        image: "",
        category: "",
         number_of_medicine: "",
       
      });
      Swal.fire({
        icon: "success",
        title: "category has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("addCategoryModal").close();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosSecure.get("/categoryCard");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //delete
  const handleDeleteCategory = async (id) => {
    try {
      await axiosSecure.delete(`/categoryCard/${id}`);
      fetchCategories();
      Swal.fire({
        icon: "success",
        title: "Category has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };


 

  const handleUpdateCategorySubmit = async (e) => {
    e.preventDefault();
  
    const file = e.target.elements.image.files[0];
    let imageUrl = editingCategory.image;
  
    if (file) {
      imageUrl = await handleImageUpload(file);
      if (!imageUrl) {
        Swal.fire({
          icon: "error",
          title: "Failed to upload image",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    }
  
    try {
      const formData = new FormData();
      formData.append("image", imageUrl); // append the file directly
      formData.append("category", editingCategory.category);
      formData.append("number_of_medicine", editingCategory.number_of_medicine);
      formData.append("imageUrl", imageUrl); // include the image URL
  
      await axiosSecure.put(`/categoryCard/${editingCategory._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      fetchCategories();
      setEditingCategory(null);
      Swal.fire({
        icon: "success",
        title: "Category has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
  
      document.getElementById("editCategoryModal").close();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  




  const handleEditCategory = (category) => {
    setEditingCategory(category);
    document.getElementById("editCategoryModal").showModal();
  };

  return (
    <div>
         <Helmet>
        <title>Medi corner | Manage Category</title>
      </Helmet>
      <h1 className="text-center text-3xl">Manage Category</h1>
      {/* <p>Total category: {categories.length}</p> */}

      <button
        className="btn mt-4 bg-green-400 "
        onClick={() => document.getElementById("addCategoryModal").showModal()}
      >
        Add New Category
      </button>

      {/*  */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-purple-800 text-white">
              <th>#</th>
              <th>Image</th>
              <th>Categories</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <th>
                  <img
                    src={item.image}
                    alt="image"
                    className="w-12 h-12 rounded"
                  />
                </th>
                <td>{item.category}</td>
                <td>
                <button className="btn bg-slate-500" onClick={() => handleEditCategory(item)}>
                    <FaEdit className="text-white" />
                  </button>
                </td>
                <td>
                <button className="btn" onClick={() => handleDeleteCategory(item._id)}>
                    <FaTrash className="text-red-500 w-12 h-6"></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* add category modal */}

      <dialog id="addCategoryModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Category</h3>
          <form onSubmit={handleAddCategory}>

        

            <div className="form-control">
              <label className="label ">Category Name: </label>
              <select
                                className="border-2 border-gray-300 rounded p-2"
                                name="category"
                                value={newCategory.category}
                                onChange={(e) =>
                                  setNewCategory({ ...newCategory, category: e.target.value })
                                }
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Capsule">Capsule</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Syrup">Syrup</option>
                                <option value="Injection">Injection</option>
                                <option value="others">Others</option>
                            </select>
              
            </div>

          

            <div className="form-control">
              <label className="label "> Quantity :</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2"
                value={newCategory.number_of_medicine}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, number_of_medicine: e.target.value })
                }
                required
              />
            </div> 


            <div className="form-control">
              <label className="label">Category Image </label>
              <input type="file" name="image" required />
            </div>


            <div className="modal-action">
              <button type="submit" className="btn">
                Add Category
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("addCategoryModal").close()
                }
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="editCategoryModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Category</h3>
          <form onSubmit={handleUpdateCategorySubmit}>
            <div className="form-control">
              <label className="label">Category Name:</label>
              <select
                className="border-2 border-gray-300 rounded p-2"
                value={editingCategory?.category || ""}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Capsule">Capsule</option>
                <option value="Tablet">Tablet</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">Quantity:</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2"
                value={editingCategory?.number_of_medicine || ""}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, number_of_medicine: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">Category Image:</label>
              <input type="file" name="image" />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn">Update Category</button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("editCategoryModal").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

    </div>
  );
};

export default ManageCategory;
