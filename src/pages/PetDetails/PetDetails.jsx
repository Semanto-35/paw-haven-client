import {
  Card,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input
} from "@material-tailwind/react";
import {
  MapPinIcon,
  CalendarDaysIcon,
  HeartIcon,
  UserIcon,
  PhoneIcon,
  HomeIcon,
  PaperClipIcon,
  XMarkIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader/Loader";


const PetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);

  // Fetch pet data
  const { data: pet, isLoading, error } = useQuery({
    queryKey: ["pets", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pets/${id}`);
      return data;
    },
  });

  // Form handling
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      requesterName: user?.displayName || '',
      requesterEmail: user?.email || '',
      phoneNumber: '',
      address: '',
      experience: '',
      notes: ''
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be at least 10 digits'),
      address: Yup.string().required('Address is required'),
      experience: Yup.string()
        .required('Please describe your experience with pets'),
    }),
    onSubmit: async (values) => {
      try {
        const adoptionData = {
          petId: pet._id,
          petName: pet.petName,
          petImage: pet.petImage,
          ...values,
          status: 'pending',
          addedBy: pet.addedBy,
          date: new Date().toISOString()
        };

        await axiosSecure.post('/adopted-pet', adoptionData);
        toast.success('Adoption request submitted!');
        setOpen(false);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Submission failed');
      }
    },
  });

  if (isLoading) return <Loader />
  if (error) return <div className="text-center py-32 text-red-500">Error loading pet details</div>;
  if (!pet) return <div className="text-center py-32">Pet not found</div>;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 pt-28 pb-16 bg-blue-gray-50 dark:bg-blue-gray-900 min-h-screen">
      {/* Back Button */}
      <Button
        variant="text"
        className="flex items-center gap-2 mb-6 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back to Pets
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Pet Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden rounded-xl shadow-lg border border-blue-gray-100 dark:border-blue-gray-800">
            <div className="rounded-xl lg:h-[450px]">
              <img
                src={pet.petImage}
                alt={pet.petName}
                className="h-full w-full object-cover"
              />
            </div>
          </Card>
        </div>

        {/* Pet Info */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <Typography
                variant="h1"
                className="text-3xl md:text-4xl font-bold text-blue-gray-800 dark:text-white"
              >
                Meet <span className="text-amber-600 dark:text-amber-400">{pet.petName}</span>
              </Typography>
              <div className="flex items-center gap-2 mt-2 text-blue-gray-600 dark:text-blue-gray-300">
                <MapPinIcon className="h-5 w-5" />
                <Typography variant="paragraph">{pet.petLocation}</Typography>
              </div>
            </div>
            <Chip
              size="lg"
              value={pet.adopted ? 'Adopted' : 'Available'}
              color={pet.adopted ? 'red' : 'green'}
              className="rounded-full"
            />
          </div>

          {/* Pet Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-blue-gray-800 p-3 rounded-lg border border-blue-gray-100 dark:border-blue-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <CalendarDaysIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <Typography variant="small" className="font-semibold text-blue-gray-800 dark:text-blue-gray-200">
                  Age
                </Typography>
              </div>
              <Typography variant="paragraph" className="text-blue-gray-700 dark:text-blue-gray-100">
                {pet.petAge < 1 ? `${Math.round(pet.petAge * 12)} months` : `${pet.petAge} years`}
              </Typography>
            </div>

            <div className="bg-white dark:bg-blue-gray-800 p-3 rounded-lg border border-blue-gray-100 dark:border-blue-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <HeartIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <Typography variant="small" className="font-semibold text-blue-gray-800 dark:text-blue-gray-200">
                  Breed
                </Typography>
              </div>
              <Typography variant="paragraph" className="text-blue-gray-700 dark:text-blue-gray-100">
                {pet.petCategory}
              </Typography>
            </div>

            <div className="bg-white dark:bg-blue-gray-800 p-3 rounded-lg border border-blue-gray-100 dark:border-blue-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <UserIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <Typography variant="small" className="font-semibold text-blue-gray-800 dark:text-blue-gray-200">
                  Owner
                </Typography>
              </div>
              <Typography variant="paragraph" className="text-blue-gray-700 dark:text-blue-gray-100 text-xs uppercase">
                {pet?.addedBy?.split('@')[0]}
              </Typography>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-blue-gray-800 p-6 rounded-xl border border-blue-gray-100 dark:border-blue-gray-700 shadow-sm">
            <Typography variant="h5" className="mb-4 flex items-center gap-2 text-blue-gray-800 dark:text-white">
              <HeartIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              About {pet.petName}
            </Typography>
            <Typography className="text-blue-gray-700 dark:text-blue-gray-300">
              {pet.longDescription || pet.shortDescription}
            </Typography>
          </div>

          {/* Adoption Button */}
          <div className="pt-2">
            <Button
              fullWidth
              size="lg"
              color="amber"
              onClick={() => setOpen(true)}
              disabled={pet.adopted || !user}
              className="flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20"
            >
              {pet.adopted ? (
                'Already Adopted'
              ) : !user ? (
                'Login to Adopt'
              ) : (
                <>
                  <HeartIcon className="h-5 w-5" />
                  Adopt {pet.petName}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Adoption Guidelines */}
      <div className="mt-12 p-8 rounded-xl bg-white dark:bg-blue-gray-800 border border-blue-gray-100 dark:border-blue-gray-700 shadow-sm">
        <Typography variant="h4" className="mb-6 text-center text-blue-gray-800 dark:text-white">
          <span className="inline-flex items-center gap-2">
            <PaperClipIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            Adoption Process
          </span>
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-gray-50 dark:bg-blue-gray-700 p-6 rounded-lg">
            <Typography variant="h6" className="mb-3 text-blue-gray-800 dark:text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-600 dark:text-amber-400">
                <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
              Requirements
            </Typography>
            <ul className="space-y-3 text-blue-gray-700 dark:text-blue-gray-300">
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 text-sm font-bold">1</span>
                Must be at least 18 years old
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 text-sm font-bold">2</span>
                Provide valid identification
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 text-sm font-bold">3</span>
                Proof of residence
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 text-sm font-bold">4</span>
                Landlord approval if renting
              </li>
            </ul>
          </div>

          <div className="bg-blue-gray-50 dark:bg-blue-gray-700 p-6 rounded-lg">
            <Typography variant="h6" className="mb-3 text-blue-gray-800 dark:text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-600 dark:text-amber-400">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              What to Expect
            </Typography>
            <ul className="space-y-3 text-blue-gray-700 dark:text-blue-gray-300">
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 text-sm font-bold">1</span>
                Application review (1-3 days)
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 text-sm font-bold">2</span>
                Possible home visit
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 text-sm font-bold">3</span>
                Meet & greet with pet
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 text-sm font-bold">4</span>
                Adoption fee may apply
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Adoption Modal */}
      <Dialog size="md" open={open} handler={() => setOpen(false)} className="bg-blue-gray-50 dark:bg-blue-gray-900">
        <DialogHeader className="relative border-b border-blue-gray-200 dark:border-blue-gray-800 bg-white dark:bg-blue-gray-800 rounded-t-xl">
          <div className="flex items-center gap-3">
            <Avatar src={pet.petImage} alt={pet.petName} size="lg" className="border-2 border-amber-500" />
            <div>
              <Typography variant="h3" className="text-blue-gray-800 dark:text-white">
                Adopt {pet.petName}
              </Typography>
              <Typography className="font-normal text-blue-gray-600 dark:text-blue-gray-300">
                Please complete the form below
              </Typography>
            </div>
          </div>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3 top-3 text-blue-gray-700 dark:text-blue-gray-300"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="py-6 bg-white dark:bg-blue-gray-800">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Full Name"
                  name="requesterName"
                  icon={<UserIcon className="h-5 w-5" />}
                  value={formik.values.requesterName}
                  onChange={formik.handleChange}
                  disabled
                  className="text-blue-gray-800 dark:text-white"
                  color="amber"
                />
              </div>
              <div>
                <Input
                  label="Email"
                  name="requesterEmail"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>}
                  value={formik.values.requesterEmail}
                  onChange={formik.handleChange}
                  disabled
                  className="text-blue-gray-800 dark:text-white"
                  color="amber"
                />
              </div>
            </div>

            <Input
              label="Phone Number"
              name="phoneNumber"
              icon={<PhoneIcon className="h-5 w-5" />}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              className="text-blue-gray-800 dark:text-white"
              color="amber"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Typography variant="small" color="red" className="mt-1">
                {formik.errors.phoneNumber}
              </Typography>
            )}

            <Input
              label="Address"
              name="address"
              icon={<HomeIcon className="h-5 w-5" />}
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              className="text-blue-gray-800 dark:text-white"
              color="amber"
            />
            {formik.touched.address && formik.errors.address && (
              <Typography variant="small" color="red" className="mt-1">
                {formik.errors.address}
              </Typography>
            )}

            <div>
              <label className="block text-sm font-medium text-blue-gray-800 dark:text-white mb-1">
                Pet Experience *
              </label>
              <textarea
                name="experience"
                rows={3}
                className="w-full px-3 py-2 border border-blue-gray-200 dark:border-blue-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-blue-gray-900 text-blue-gray-800 dark:text-white"
                placeholder="Tell us about your experience with pets..."
                value={formik.values.experience}
                onChange={formik.handleChange}
              />
              {formik.touched.experience && formik.errors.experience && (
                <Typography variant="small" color="red" className="mt-1">
                  {formik.errors.experience}
                </Typography>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-gray-800 dark:text-white mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows={2}
                className="w-full px-3 py-2 border border-blue-gray-200 dark:border-blue-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-blue-gray-900 text-blue-gray-800 dark:text-white"
                placeholder="Anything else we should know?"
                value={formik.values.notes}
                onChange={formik.handleChange}
              />
            </div>

            <DialogFooter className="border-t border-blue-gray-200 dark:border-blue-gray-700 pt-4">
              <Button
                variant="text"
                color="blue-gray"
                onClick={() => setOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="amber"
                disabled={formik.isSubmitting}
                className="flex items-center gap-2 shadow-lg hover:shadow-amber-500/20"
              >
                {formik.isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <HeartIcon className="h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default PetDetails;


// import { Card, CardHeader, CardBody, Typography, Button, Dialog, DialogHeader, IconButton, DialogBody, Input, DialogFooter, Chip, } from "@material-tailwind/react";
// import useAuth from "../../hooks/useAuth";
// import { useParams } from "react-router-dom";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";
// import Loader from "../../components/shared/Loader/Loader";


// const PetDetails = () => {
//   const { user } = useAuth();
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const [open, setOpen] = useState(false);
//   const openModal = () => setOpen(true);
//   const closeModal = () => setOpen(false);

//   const { data: pet, isLoading, error } = useQuery({
//     queryKey: ["pets", id],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/pets/${id}`);
//       return data;
//     },
//   });
// console.log(user);
//   const { petCategory, petAge, petImage, petLocation, petName, adopted, shortDescription, longDescription, addedBy } = pet || {};

//   const formik = useFormik({
//     initialValues: {
//       requesterName: user?.displayName,
//       requesterEmail: user?.email,
//       phoneNumber: '',
//       address: '',
//     },
//     validationSchema: Yup.object({
//       phoneNumber: Yup.string()
//         .matches(/^\d+$/, "Phone number must contain only digits")
//         .min(9, "Phone number must be at least 9 digits")
//         .max(11, "Phone number must not exceed 11 digits")
//         .required("Phone number is required"),
//       address: Yup.string().required('Address is required'),
//     }),
//     onSubmit: async (values) => {
//       try {

//         const requester = {
//           petId: id,
//           petName: petName,
//           petImage: petImage,
//           ...values,
//           addedBy,
//         }
//         console.log(requester);
//         // formik.resetForm();
//         // await axiosSecure.post(`/adopted-pet`, requester);
//         // closeModal();
//         toast.success('Adoption Successfull')
//       } catch (error) {
//         toast.error(error.message);
//       }
//     },
//   });

//   if (isLoading) return <Loader />
//   if (error) return <Typography color="red">Error: {error.message}</Typography>;


//   return (
//     <div className="max-w-screen-2xl mx-auto px-4 py-16 mt-[72px]">
//       <Card shadow={false} className="w-full flex-col lg:flex-row gap-8 rounded-md dark:bg-blue-gray-700 dark:text-blue-gray-100">
//         <CardHeader
//           shadow={false}
//           floated={false}
//           className="m-0 lg:w-1/2 shrink-0 "
//         >
//           <img
//             src={petImage}
//             alt="card-image"
//             className="h-full w-full object-cover rounded-md"
//           />
//         </CardHeader>
//         <CardBody>
//           <Typography variant="h2">
//             Meet <span className="text-pink-400">{petName}</span>
//           </Typography>
//           <Typography variant="paragraph"  className="mb-6">
//             Added By <span className="text-pink-400">{addedBy}</span>
//           </Typography>
//           <div className="grid grid-cols-2 justify-between lg:gap-12 mb-4">
//             <div>
//               <Typography variant="h5"  className="mb-2">
//                 Category: <span className="font-light">{petCategory}</span>
//               </Typography>
//               <Typography variant="h5"  className="mb-2">
//                 Location: <span className="font-light">{petLocation}</span>
//               </Typography>
//               <Typography variant="h5"  className="mb-2">
//                 Age: <span className="font-light">
//                   {petAge < 1 ? `${Math.round(petAge * 10)} months` : `${petAge} years`}
//                 </span>
//               </Typography>
//             </div>
//             <div>
//               <Typography variant="h5"  className="flex items-center gap-2">
//                 Status: <Chip size="sm" variant="ghost" value={adopted ? 'Adopted' : 'Available'} className="rounded-full"
//                   color={adopted ? "red" : "green"}
//                 />
//               </Typography>
//             </div>
//           </div>
//           <Typography className="mb-8 font-normal">
//             {shortDescription}
//           </Typography>
//           <Button onClick={openModal} variant="filled"
//           color="green"
//             disabled={adopted}
//           >
//             Adopt now
//           </Button>
//         </CardBody>
//       </Card>

//       <div className=" space-y-4 my-10 py-4">
//         <Typography variant="h3" >
//           More About <span className="text-pink-400">{petName}</span>
//         </Typography>
//         <Typography>
//           {longDescription}
//         </Typography>
//       </div>
//       <div className="border space-y-4 my-10 p-10 rounded-xl bg-deep-orange-50">
//         <Typography variant="h5" color="blue-gray" className="flex items-center gap-3">
//           <PaperClipIcon className="w-5 h-5" /> Adoption Rules
//         </Typography>
//         <Typography variant="paragraph" color="blue-gray">
//           Adopting a pet is a meaningful commitment to providing love and care. Adopters must be at least 18 years old and able to demonstrate the ability to meet the pet’s needs, including providing a safe home, proper food, and veterinary care. The process typically involves an application, interview, and sometimes a home visit to ensure compatibility. All adopted pets must be spayed or neutered to prevent overpopulation. If an adopter can no longer care for the pet, it must be returned to the agency. Adoption ensures every pet finds a loving, responsible, and permanent home for a happy life.
//         </Typography>
//       </div>

//       <Dialog size="sm" open={open} className="p-4 dark:bg-blue-gray-900 dark:text-blue-gray-100 text-black bg-white">
//         <DialogHeader className="relative m-0 block">
//           <Typography variant="h3" className="dark:text-blue-gray-100">
//             Adopt <span className="text-pink-500">{petName}</span>
//           </Typography>
//           <Typography className="mt-1 font-normal text-gray-600">
//             Keep your records up-to-date and organized.
//           </Typography>
//           <IconButton
//             size="sm"
//             variant="text"
//             className="!absolute right-3.5 top-3.5 dark:text-blue-gray-100 text-black"
//             onClick={closeModal}
//           >
//             <XMarkIcon className="h-6 w-6 stroke-2" />
//           </IconButton>
//         </DialogHeader>
//         <DialogBody className="space-y-4 pb-6">
//           <form onSubmit={formik.handleSubmit}>

//             <div className="mb-4">
//               <Input
//                 label="Full Name"
//                 name="requesterName"
//                 value={formik.values.requesterName}
//                 onChange={formik.handleChange}
//                 disabled
//               />
//             </div>

//             <div className="mb-4">
//               <Input
//                 label="Email"
//                 name="requesterEmail"
//                 value={formik.values.requesterEmail}
//                 onChange={formik.handleChange}
//                 disabled
//               />
//             </div>

//             <div className="mb-4">
//               <Input
//                 label="Phone Number"
//                 name="phoneNumber"
//                 type="tel"
//                 inputMode="numeric"
//                 value={formik.values.phoneNumber}
//                 onChange={formik.handleChange}
//                 error={formik.touched.phoneNumber && formik.errors.phoneNumber}
//               />
//               {formik.touched.phoneNumber && formik.errors.phoneNumber && (
//                 <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
//               )}
//             </div>

//             <div className="mb-4">
//               <Input
//                 label="Address"
//                 name="address"
//                 type="text"
//                 value={formik.values.address}
//                 onChange={formik.handleChange}
//                 error={formik.touched.address && formik.errors.address}
//               />
//               {formik.touched.address && formik.errors.address && (
//                 <div className="text-red-500 text-sm">{formik.errors.address}</div>
//               )}
//             </div>

//             <DialogFooter>
//               <Button
//                 type="submit"
//                 variant="filled"
//                 color="pink"
//                 disabled={formik.isSubmitting}
//               >
//                 {formik.isSubmitting ? "Submiting" : "Submit Adoption Request"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogBody>
//       </Dialog>
//     </div>
//   );
// };

// export default PetDetails;