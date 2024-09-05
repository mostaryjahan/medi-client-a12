import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UPdateProfile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null); // To store the selected file
  const imgbbApiKey = import.meta.env.VITE_Image_Hosting_key; // ImgBB API key

  useEffect(() => {
    setName(user.displayName || "");
    setEmail(user.email || "");
  }, [user]);

  const handleUpdateProfile = () => {
    const auth = getAuth();
    if (!auth.currentUser) return;

    if (selectedPhoto) {
      // Create form data for image upload
      const formData = new FormData();
      formData.append("image", selectedPhoto);

      // Upload the image to ImgBB
      fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgResponse) => {
          if (imgResponse.success) {
            const uploadedImageURL = imgResponse.data.url;

            // Update the user's profile with the uploaded image URL
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: uploadedImageURL,
            })
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Updated Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });

                // Update the local user state
                setUser({
                  ...auth.currentUser,
                  displayName: name || auth.currentUser.displayName,
                  photoURL: uploadedImageURL,
                });
              })
              .catch((error) => {
                console.error("Error updating profile:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error uploading image to ImgBB:", error);
        });
    } else {
      // If no new image is selected, just update the name
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setUser({
            ...auth.currentUser,
            displayName: name || auth.currentUser.displayName,
          });
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePhotoChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedPhoto(file); // Set the selected photo
  };

  return (
    <div>
      <Helmet>
        <title>MediCorner | Update Profile</title>
      </Helmet>
      <div className="mx-auto bg-cyan-100 md:w-[400px] h-[400px] p-4 border-2 mt-4 mb-4 rounded-xl border-sky-500 dark:text-gray-800">
        <h2 className="text-3xl text-center font-semibold">Update Profile</h2>
        <div className="flex flex-col mt-4 gap-2">
          <span>Name: </span>
          <input
            className="w-full h-10 p-2 rounded-md border-2"
            type="text"
            placeholder="Update your name"
            value={name}
            onChange={handleNameChange}
          />
          <span>Email: (You cannot change your email)</span>
          <input
            className="w-full h-10 p-2 rounded-md border-2"
            type="email"
            readOnly
            value={email}
            onChange={handleEmailChange}
          />
          <span>Photo: </span>
          <input
            className="w-full h-10 p-2 rounded-md border-2 bg-white px-2 py-1"
            type="file"
            onChange={handlePhotoChange}
          />

          <button
            onClick={handleUpdateProfile}
            className="btn bg-cyan-500 text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UPdateProfile;
