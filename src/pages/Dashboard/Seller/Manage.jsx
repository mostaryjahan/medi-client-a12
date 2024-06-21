import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import { Helmet } from "react-helmet-async";




const Manage = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const image_hosting_key = import.meta.env.VITE_Image_Hosting_key;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


 
    const {data: medicines =[], refetch} = useQuery({
        queryKey: ['category', user.email],
        queryFn: async () =>{

         const res = await axiosSecure.get(`/category/${user.email}`);
        //  console.log(user.email)
         return res.data;
        }
    });
  
    const [formData, setFormData] = useState({
      name: '',
      generic_name: '',
      description: '',
      image: null,
      category: '',
      company_name: '',
      item_mass_unit: '',
      number_of_medicines_in_category: '',
      price: 0,
      price_per_unit: 0,
      discount_percentage: 0,
      seller_email: user.email
  });


const [isSubmitting, setIsSubmitting] = useState(false);

useEffect(() => {
  if (isSubmitting) {
      const addMedicine = async () => {
          try {
              const res = await axiosSecure.post('/category', formData);
              console.log(res)
              refetch();
              Swal.fire({
                icon: "success",
                title: "Medicine has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              closeModal();
          } catch (error) {
              Swal.fire('Error', 'Failed to add medicine', 'error');
          } finally {
              setIsSubmitting(false);
          }
      };

      addMedicine();
    }
  }, [isSubmitting, axiosSecure, formData, refetch]);

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const res = await fetch(image_hosting_api, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        return data.data.url;
    } catch (error) {
        console.error("Image upload failed:", error);
        Swal.fire('Error', 'Image upload failed', 'error');
        return null;
    }
};



  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
        setFormData({ ...formData, [name]: files[0] });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.image) {
        const imageUrl = await handleImageUpload(formData.image);
        if (imageUrl) {
            setFormData({ ...formData, image: imageUrl });
            setIsSubmitting(true);
        }
    } else {
        setIsSubmitting(true);
    }
};

const openModal = () => document.getElementById('my_modal_1').showModal();
const closeModal = () => document.getElementById('my_modal_1').close();




 

    return (
        <div>
               <Helmet>
        <title>Medi corner | Manage Medicine</title>
      </Helmet>
            <h1 className="text-center font-bold text-xl md:text-3xl">Manage Medicines</h1>
           <div className="flex gap-6 mt-8 mb-6 px-6 items-center">
           <p>Total Medicines: {medicines.length}</p>

            <button onClick={openModal}
             className="btn bg-green-400">   Add Medicine
          </button>
           </div>

            {/*  */}
            <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-purple-700 text-white">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Company</th>
              <th>Generic</th>
              <th>Category</th>
              <th>Details</th>
              <th>Price</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Mass Unit</th>
              <th>Discount</th>
           
            </tr>
          </thead>
          <tbody>
            {
                medicines.map((item,index) =>   <tr key={item._id}>
                   
                    <th>{index + 1}</th>
                    <th><img src={item.image} alt="medicine" className="w-12 h-12 rounded-md" /></th>
                    <td> {item.name} </td>
                    <td> {item.company_name}</td>
                    <td>{item.generic_name}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td> {item.price} </td>
                    <td> {item.price_per_unit} </td>
                    <td>
                    {item.number_of_medicines_in_category}
                    </td>
                    <td>{item.item_mass_unit}</td>
                    <td>{item.discount_percentage}</td>
                   
                  </tr>)
            }
          
         
           
          </tbody>
         
        </table>
      </div>

      
            {/* Modal for adding new medicine */}
           
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Medicine</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="font-semibold">Item Name:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Generic Name:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="text"
                                name="generic_name"
                                value={formData.generic_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Description:</label>
                            <textarea
                                className="border-2 border-gray-300 rounded p-2"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Image:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="file"
                                name="image"
                                onChange={handleChange}
                                // required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Category:</label>
                            <select
                                className="border-2 border-gray-300 rounded p-2"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="capsule">Capsule</option>
                                <option value="tablet">Tablet</option>
                                <option value="syrup">Syrup</option>
                                <option value="injection">Injection</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Company:</label>
                            <select
                                className="border-2 border-gray-300 rounded p-2"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Company</option>
                                <option value="lifeLine">LifeLine</option>
                                <option value="mediLife">MediLife</option>
                                <option value="healthMed">HealthMed</option>
                                <option value="vitalCare">VitalCare</option>
                                <option value="bioGen">BioGen</option>
                                <option value="wellnessLabs">WellnessLab</option>
                                <option value="pharmaCop">PharmaCop</option>
                                <option value="cureWell">CureWell</option>
                                <option value="pureHealth">PureHealth</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Mass Unit(mg or ml): </label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="item_mass_unit"
                                value={formData.item_mass_unit}
                                onChange={handleChange}
                                required
                            />
                           
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Price:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Price per Unit:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="price_per_unit"
                                value={formData.price_per_unit}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Quantity:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="number_of_medicines_in_category"
                                value={formData.number_of_medicines_in_category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Discount Percentage:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="discount_percentage"
                                value={formData.discount_percentage}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn bg-green-500 text-white py-2 rounded">Add Medicine</button>
                    </form>
                    <div className="modal-action">
                        <button className="btn bg-red-500 text-white py-2 mt-4 rounded" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </dialog>
      

        </div>
    );
};

export default Manage;
