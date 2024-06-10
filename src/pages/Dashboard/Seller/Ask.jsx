import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../Hook/useAuth";
import Swal from "sweetalert2";

const Ask = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [sliderRequests, setSliderRequests] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const image_hosting_key = import.meta.env.VITE_Image_Hosting_key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      // Upload the image to the image hosting service
      const uploadResponse = await axios.post(image_hosting_api, formData);
      const imageUrl = uploadResponse.data.data.url;

      // Use the imageUrl in the slider request
      await axios.post("http://localhost:5000/slider", {
        sellerEmail: user.email,
        medicineImage: imageUrl,
        description,
      });
      setDescription("");
      setImageFile(null);
      Swal.fire({
        icon: "success",
        title: "Slider requested successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Fetch updated slider requests
      fetchSliderRequests();
    } catch (error) {
      console.error("Error requesting slider:", error);
    }
  };

  const fetchSliderRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/slider/${user.email}`
      );
      console.log("Fetched slider requests:", response.data); // Debugging log

      setSliderRequests(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching slider requests:", error);
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "Failed to fetch slider requests. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchSliderRequests();
  }, [user.email]);

  const handleUpdateStatus = async (id, isUsedInSlider) => {
    try {
      await axios.put(`http://localhost:5000/slider/${id}`, {
        isUsedInSlider: !isUsedInSlider,
      });
      fetchSliderRequests();
    } catch (error) {
      console.error("Error updating slider status:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl md:text-3xl">
        Ask for Slider
      </h1>
      <form onSubmit={handleSubmit} className="w-[500px] mx-auto">
        <div className="flex flex-col">
          <label className="font-semibold">Medicine Image:</label>
          <input
            className="border-2"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Description:</label>
          <textarea
            className="border-2"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button className="btn bg-purple-700 text-white" type="submit">
          Submit
        </button>
      </form>

      <h2 className="text-center font-bold text-xl md:text-2xl mt-8">
        Slider Requests
      </h2>

      {sliderRequests.map((request) => (
        <div key={request._id}>
          <img src={request.medicineImage} alt="Medicine" />
          <p>{request.description}</p>
          <button
            onClick={() =>
              handleUpdateStatus(request._id, request.isUsedInSlider)
            }
          >
            {request.isUsedInSlider ? "Remove from Slider" : "Add to Slider"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Ask;
