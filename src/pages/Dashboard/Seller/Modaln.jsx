import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useAuth from "../../../Hook/useAuth";
import { Helmet } from "react-helmet-async";

const img_hosting_key = import.meta.env.VITE_Image_Hosting_key;
//   console.log(img_hosting_key);
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Modaln = ({ refetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //   console.log(data);
    const photo = { image: data.photo[0] };
    // console.log(photo);
    const response = await axiosPublic.post(img_hosting_api, photo, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const photos = response.data.data.display_url;
    //   console.log(photo);

    const a = {
      description: data.description,
      photo: photos,
      status: "pending",
      email: user?.email,
    };
    //   console.log(a);

    await axiosPublic.post("/slider", a).then((res) => {
      // console.log(res);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Advertisement Added ",
          showClass: {
            popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
          },
          hideClass: {
            popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
          },
        });
      }
      refetch();
    });
  };

  const handleMedicine = () => {};
  return (
    <div>
      <Helmet>Medi corner | modal</Helmet>
      <Button
        onPress={onOpen}
        color="primary"
        className="bg-green-500 hover:bg-special-button-hover text-white hover:text-black rounded-lg font-bold "
      >
        Add Advertisement
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 dark:text-black">
                Advertisement
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    autoFocus
                    {...register("description")}
                    label="Text"
                    placeholder="Enter your description"
                    
                  />

                  <input
                    type="file"
                    {...register("photo", { required: true })}
                    className="file-input mt-3 file-input-bordered file-input-primary w-full max-w-xs"
                  />
                  {errors.photo && (
                    <p className="text-red-500">Photo is required</p>
                  )}
                  <div className="form-control mt-6">
                    <button className="btn border-none bg-primary text-white hover:bg-blue-600">
                      Add Advertise
                    </button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={handleMedicine}
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Modaln;
