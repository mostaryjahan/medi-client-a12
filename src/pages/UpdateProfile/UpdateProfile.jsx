
import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const UPdateProfile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(user.displayName || "");
    setEmail(user.email || "")
    setPhotoURL(user.photoURL || "");

  }, [user]);

  const handleUpdateProfile = () => {
    const auth = getAuth();


    if (!auth.currentUser) return;


    const profileUpdates = {};
    if (name) {
      profileUpdates.displayName = name;
    }
    if (email) {
      profileUpdates.email = email;
    }
    if (photoURL) {
      profileUpdates.photoURL = photoURL;
    }
 

      updateProfile(auth.currentUser, {
        displayName: name,
          photoURL: photoURL,
      }).then(() => {
        Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        setUser({
          ...auth.currentUser,
          displayName: name || auth.currentUser.displayName,
          photoURL: photoURL || auth.currentUser.photoURL,
       });

      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };
// console.log(user)

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePhotoURLChange = (e) => {
    e.preventDefault();
    setPhotoURL(e.target.value);
  };

  return (
    <div>
      <Helmet>
        <title>Medi corner | update profile</title>
      </Helmet>
      <div className="mx-auto bg-cyan-100 md:w-[400px] h-[400px] p-4 border-2 mt-4 mb-4  rounded-xl border-sky-500 ">
        <h2 className=" text-3xl text-center">Update Profile</h2>
        <div className="flex flex-col mt-4 gap-2">
          <span>Name: </span>
          <input
            className="w-full h-10 p-2  rounded-md border-2"
            type="text"
            placeholder="Update your name"
            value={name}
            onChange={handleNameChange}
          />
          <span>Email: (You can not change your email)</span>
          <input
            className="w-full h-10 p-2  rounded-md border-2"
            type="email"
            placeholder="Update your email"
            readOnly
            value={email}
            onChange={handleEmailChange}
          />
          <span>Photo URL: </span>
          <input
            className="w-full h-10 p-2  rounded-md border-2"
            type="text"
            placeholder="Update photoURL"
            value={photoURL}
            onChange={handlePhotoURLChange}
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
