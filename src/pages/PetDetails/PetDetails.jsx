import { Card, CardHeader, CardBody, Typography, Button, Dialog, DialogHeader, IconButton, DialogBody, Input, DialogFooter, Chip, } from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loader from "../../components/shared/Loader/Loader";


const PetDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const { data: pet, isLoading, error } = useQuery({
    queryKey: ["pets", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pets/${id}`);
      return data;
    },
  });

  const { petCategory, petAge, petImage, petLocation, petName, adopted, shortDescription, longDescription, addedBy } = pet || {};

  const formik = useFormik({
    initialValues: {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      phoneNumber: '',
      address: '',
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone number must contain only digits")
        .min(9, "Phone number must be at least 9 digits")
        .max(11, "Phone number must not exceed 11 digits")
        .required("Phone number is required"),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: async (values) => {
      try {

        const requester = {
          petId: id,
          petName: petName,
          petImage: petImage,
          ...values,
          addedBy,
        }
        console.log(requester);
        formik.resetForm();
        await axiosSecure.post(`/adopted-pet`, requester);
        closeModal();
        toast.success('Adoption Successfull')
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  if (isLoading) return <Loader />
  if (error) return <Typography color="red">Error: {error.message}</Typography>;


  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 mt-[72px]">
      <Card shadow={false} className="w-full flex-col lg:flex-row gap-8 rounded-md dark:bg-blue-gray-700 dark:text-blue-gray-100">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 lg:w-1/2 shrink-0 "
        >
          <img
            src={petImage}
            alt="card-image"
            className="h-full w-full object-cover rounded-md"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h2">
            Meet <span className="text-pink-400">{petName}</span>
          </Typography>
          <Typography variant="paragraph"  className="mb-6">
            Added By <span className="text-pink-400">{addedBy}</span>
          </Typography>
          <div className="grid grid-cols-2 justify-between lg:gap-12 mb-4">
            <div>
              <Typography variant="h5"  className="mb-2">
                Category: <span className="font-light">{petCategory}</span>
              </Typography>
              <Typography variant="h5"  className="mb-2">
                Location: <span className="font-light">{petLocation}</span>
              </Typography>
              <Typography variant="h5"  className="mb-2">
                Age: <span className="font-light">
                  {petAge < 1 ? `${Math.round(petAge * 10)} months` : `${petAge} years`}
                </span>
              </Typography>
            </div>
            <div>
              <Typography variant="h5"  className="flex items-center gap-2">
                Status: <Chip size="sm" variant="ghost" value={adopted ? 'Adopted' : 'Available'} className="rounded-full"
                  color={adopted ? "red" : "green"}
                />
              </Typography>
            </div>
          </div>
          <Typography className="mb-8 font-normal">
            {shortDescription}
          </Typography>
          <Button onClick={openModal} variant="filled"
          color="green"
            disabled={adopted}
          >
            Adopt now
          </Button>
        </CardBody>
      </Card>

      <div className=" space-y-4 my-10 py-4">
        <Typography variant="h3" >
          More About <span className="text-pink-400">{petName}</span>
        </Typography>
        <Typography>
          {longDescription}
        </Typography>
      </div>
      <div className="border space-y-4 my-10 p-10 rounded-xl bg-deep-orange-50">
        <Typography variant="h5" color="blue-gray" className="flex items-center gap-3">
          <PaperClipIcon className="w-5 h-5" /> Adoption Rules
        </Typography>
        <Typography variant="paragraph" color="blue-gray">
          Adopting a pet is a meaningful commitment to providing love and care. Adopters must be at least 18 years old and able to demonstrate the ability to meet the pet’s needs, including providing a safe home, proper food, and veterinary care. The process typically involves an application, interview, and sometimes a home visit to ensure compatibility. All adopted pets must be spayed or neutered to prevent overpopulation. If an adopter can no longer care for the pet, it must be returned to the agency. Adoption ensures every pet finds a loving, responsible, and permanent home for a happy life.
        </Typography>
      </div>

      <Dialog size="sm" open={open} className="p-4 dark:bg-blue-gray-900 dark:text-blue-gray-100 text-black bg-white">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h3" className="dark:text-blue-gray-100">
            Adopt <span className="text-pink-500">{petName}</span>
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5 dark:text-blue-gray-100 text-black"
            onClick={closeModal}
          >
            <XMarkIcon className="h-6 w-6 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <form onSubmit={formik.handleSubmit}>

            <div className="mb-4">
              <Input
                label="Full Name"
                name="requesterName"
                value={formik.values.requesterName}
                onChange={formik.handleChange}
                disabled
              />
            </div>

            <div className="mb-4">
              <Input
                label="Email"
                name="requesterEmail"
                value={formik.values.requesterEmail}
                onChange={formik.handleChange}
                disabled
              />
            </div>

            <div className="mb-4">
              <Input
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                inputMode="numeric"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
              )}
            </div>

            <div className="mb-4">
              <Input
                label="Address"
                name="address"
                type="text"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && formik.errors.address}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm">{formik.errors.address}</div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="submit"
                variant="filled"
                color="pink"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submiting" : "Submit Adoption Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default PetDetails;