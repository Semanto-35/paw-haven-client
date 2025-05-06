import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Loader from "../../components/shared/Loader/Loader";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography
} from "@material-tailwind/react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const { data: campaign, isLoading, error } = useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-campaigns/${id}`);
      return data;
    },
  });

  const { data: recommendedCampaigns } = useQuery({
    queryKey: ["recommendedCampaigns", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/limited-campaigns`, { params: { id } });
      return data;
    },
  });

  const {
    maxDonation,
    lastDate,
    petImage,
    currentDonation,
    petName,
    isPaused,
    shortDescription,
    longDescription,
    addedBy
  } = campaign || {};

  const progressPercentage = Math.min(100, (currentDonation / maxDonation) * 100);
  const daysRemaining = Math.ceil((new Date(lastDate) - new Date()) / (1000 * 60 * 60 * 24));
  const isActive = !isPaused && daysRemaining > 0 && currentDonation < maxDonation;

  if (isLoading) return <Loader />;
  if (error) return <Typography color="red">Error: {error.message}</Typography>;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 pb-16 pt-32 bg-blue-gray-50 dark:bg-blue-gray-900">
      {/* Main Campaign Card */}
      <Card className="flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-blue-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader
          shadow={false}
          floated={false}
          className="lg:w-1/2 h-64 md:h-96 lg:h-[500px] m-0"
        >
          <img
            src={petImage}
            alt={petName}
            className="h-full w-full object-cover"
          />
        </CardHeader>

        <CardBody className="lg:w-1/2 p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Typography variant="h3" className="mb-1 text-blue-gray-900 dark:text-white">
                Help <span className="text-amber-600 dark:text-amber-400">{petName}</span>
              </Typography>
              <Typography color="blue-gray" className="font-medium dark:text-blue-gray-300">
                Organized by {addedBy}
              </Typography>
            </div>
            <Chip
              value={isActive ? "Active" : "Closed"}
              color={isActive ? "amber" : "red"}
              className="rounded-full"
            />
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <Typography variant="small" className="dark:text-blue-gray-200">
                ${currentDonation} raised
              </Typography>
              <Typography variant="small" className="dark:text-blue-gray-200">
                ${maxDonation} goal
              </Typography>
            </div>
            <div className="w-full bg-blue-gray-200 dark:bg-blue-gray-700 rounded-full h-2.5">
              <div
                className="bg-amber-500 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <Typography variant="small" className="mt-1 text-right text-blue-gray-600 dark:text-blue-gray-300">
              {progressPercentage.toFixed(1)}% funded
            </Typography>
          </div>

          {/* Campaign Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-gray-100 dark:bg-blue-gray-700 p-3 rounded-lg">
              <Typography variant="h6" className="text-blue-gray-800 dark:text-blue-gray-100">
                Days Remaining
              </Typography>
              <Typography variant="paragraph" className="text-amber-600 dark:text-amber-400 font-bold">
                {daysRemaining > 0 ? daysRemaining : 'Ended'}
              </Typography>
            </div>
            <div className="bg-blue-gray-100 dark:bg-blue-gray-700 p-3 rounded-lg">
              <Typography variant="h6" className="text-blue-gray-800 dark:text-blue-gray-100">
                Supporters
              </Typography>
              <Typography variant="paragraph" className="text-amber-600 dark:text-amber-400 font-bold">
                {campaign?.donors || 0}
              </Typography>
            </div>
          </div>

          <Typography className="mb-8 text-blue-gray-800 dark:text-blue-gray-200">
            {shortDescription}
          </Typography>

          <Button
            onClick={openModal}
            color="amber"
            size="lg"
            disabled={!isActive}
            className="w-full hover:shadow-amber-300/40 hover:shadow-lg transition-all"
          >
            {isActive ? "Donate Now" : "Campaign Closed"}
          </Button>
        </CardBody>
      </Card>

      {/* Campaign Details Section */}
      <div className="mt-12 bg-white dark:bg-blue-gray-800 p-6 md:p-8 rounded-xl shadow-md">
        <Typography variant="h4" className="mb-6 text-blue-gray-900 dark:text-white">
          About This Campaign
        </Typography>
        <div className="text-blue-gray-800 dark:text-blue-gray-200">
          {longDescription}
        </div>
      </div>

      {/* Donation Guidelines */}
      <div className="mt-12 bg-blue-gray-100 dark:bg-blue-gray-700 rounded-xl p-6 md:p-8 shadow-md">
        <Typography variant="h5" className="flex items-center gap-2 mb-4 text-blue-gray-900 dark:text-white">
          <PaperClipIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Donation Guidelines
        </Typography>
        <ul className="list-disc pl-5 space-y-2 text-blue-gray-800 dark:text-blue-gray-200">
          <li>All donations are processed securely through Stripe</li>
          <li>Your donation will help provide food, shelter, and medical care</li>
          <li>Donations are non-refundable</li>
          <li>You'll receive a receipt for tax purposes</li>
          <li>Minimum donation amount is $1</li>
        </ul>
      </div>

      {/* Recommended Campaigns */}
      {recommendedCampaigns?.length > 0 && (
        <div className="mt-16">
          <Typography variant="h3" className="mb-8 text-blue-gray-900 dark:text-white">
            Other Pets Needing Help
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCampaigns.map((camp) => {
              const campProgress = Math.min(100, (camp.currentDonation / camp.maxDonation) * 100);
              const campDaysRemaining = Math.ceil((new Date(camp.lastDate) - new Date()) / (1000 * 60 * 60 * 24));
              const campIsActive = !camp.isPaused && campDaysRemaining > 0 && camp.currentDonation < camp.maxDonation;

              return (
                <Card
                  key={camp._id}
                  className="hover:shadow-lg transition-shadow bg-white dark:bg-blue-gray-800"
                >
                  <CardHeader floated={false} className="h-48 m-0">
                    <img
                      src={camp.petImage}
                      alt={camp.petName}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" className="mb-2 text-blue-gray-900 dark:text-white">
                      Help <span className="text-amber-600 dark:text-amber-400">{camp.petName}</span>
                    </Typography>
                    <div className="flex justify-between items-center mb-3">
                      <Typography variant="small" className="dark:text-blue-gray-200">
                        ${camp.currentDonation} raised
                      </Typography>
                      <Typography variant="small" className="dark:text-blue-gray-200">
                        {campDaysRemaining > 0 ?
                          `${campDaysRemaining} days left` :
                          'Ended'}
                      </Typography>
                    </div>
                    <div className="w-full bg-blue-gray-200 dark:bg-blue-gray-700 rounded-full h-1.5 mb-4">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full"
                        style={{ width: `${campProgress}%` }}
                      ></div>
                    </div>
                    <Link to={`/campaigns/${camp._id}`}>
                      <Button
                        color="amber"
                        size="sm"
                        fullWidth
                        className="hover:shadow-amber-300/40"
                      >
                        View Details
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Donation Modal */}
      <Dialog
        size="md"
        open={open}
        handler={closeModal}
        className="bg-blue-gray-50 dark:bg-blue-gray-900"
      >
        <DialogHeader className="relative border-b border-blue-gray-200 dark:border-blue-gray-700 bg-white dark:bg-blue-gray-800">
          <div className="text-center w-full">
            <Typography variant="h3" className="text-blue-gray-900 dark:text-white">
              Support <span className="text-amber-600 dark:text-amber-400">{petName}</span>
            </Typography>
          </div>
          <IconButton
            size="sm"
            variant="text"
            color="blue-gray"
            className="!absolute right-4 top-4 hover:bg-blue-gray-100 dark:hover:bg-blue-gray-700"
            onClick={closeModal}
          >
            <XMarkIcon className="h-5 w-5 text-blue-gray-500 dark:text-blue-gray-300" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="p-0 bg-blue-gray-50 dark:bg-blue-gray-900">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              campaign={campaign}
              closeModal={closeModal}
              maxAmount={maxDonation - currentDonation}
            />
          </Elements>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default DonationDetails;



// import { loadStripe } from "@stripe/stripe-js";
// import { useQuery } from "@tanstack/react-query";
// import { Link, useParams } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useState } from "react";
// import Loader from "../../components/shared/Loader/Loader";
// import { Button, Card, CardBody, CardHeader, Chip, Dialog, DialogBody, DialogHeader, IconButton, Typography } from "@material-tailwind/react";
// import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
// import { Elements } from "@stripe/react-stripe-js";

// import CheckoutForm from "./CheckoutForm";


// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


// const DonationDetails = () => {

//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const [open, setOpen] = useState(false);
//   const openModal = () => setOpen(true);
//   const closeModal = () => setOpen(false);


//   const { data: campaigns, isLoading, error } = useQuery({
//     queryKey: ["campaigns", id],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/donation-campaigns/${id}`);
//       return data;
//     },
//   });

//   const { data: recommandedCampaigns } = useQuery({
//     queryKey: ["recommandedCampaigns"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/limited-campaigns`);
//       return data;
//     },
//   });

//   const { maxDonation, lastDate, petImage, currentDonation, petName, isPaused, shortDescription, addedBy } = campaigns || {};

//   const currentDate = new Date().toISOString().split('T')[0];



//   if (isLoading) return <Loader />
//   if (error) return <Typography color="red">Error: {error.message}</Typography>;


//   return (
//     <div className="max-w-screen-2xl mx-auto px-4 mt-[72px] py-16">
//       <Card shadow={false} className="w-full flex-col lg:flex-row gap-8 rounded-lg pb-0 dark:bg-blue-gray-700 dark:text-blue-gray-100">
//         <CardHeader
//           shadow={false}
//           floated={false}
//           className="m-0 lg:w-1/2 lg:h-[460px] shrink-0"
//         >
//           <img
//             src={petImage}
//             alt="card-image"
//             className="h-full w-full object-cover"
//           />
//         </CardHeader>
//         <CardBody>
//           <Typography variant="h2" >
//             Meet <span className="text-pink-500">{petName}</span>
//           </Typography>
//           <Typography variant="paragraph"  className="mb-6">
//             Added By <span className="text-pink-500">{addedBy}</span>
//           </Typography>

//           <div className=" mb-4">
//             <Typography variant="h5"  className="mb-2">
//               Max Donation: <span className="font-light">${maxDonation}</span>
//             </Typography>
//             <Typography variant="h5"  className="mb-2">
//               Donation: <span className="font-light">${currentDonation}</span>
//             </Typography>
//             <Typography variant="h5"  className="flex items-center gap-2 mb-2">
//               Status: <Chip size="sm" variant="ghost" value={isPaused ? 'Paused' : 'Can Donate'} className="rounded-full"
//                 color={isPaused ? "red" : "green"}
//               />
//             </Typography>
//             <Typography variant="h5"  className="mb-2">
//               Last Date: <span className="font-light">{lastDate}</span>
//             </Typography>
//           </div>
//           <Typography  className="mb-8 font-normal">
//             {shortDescription}
//           </Typography>
//           <Button onClick={openModal} variant="filled" color="green"
//             disabled={isPaused || currentDate > lastDate || currentDonation >= maxDonation}
//           >
//             Donate now
//           </Button>
//         </CardBody>
//       </Card>

//       <div className="border space-y-4 my-16 p-10 rounded-xl bg-deep-orange-50">
//         <Typography variant="h5" color="blue-gray" className="flex items-center gap-3">
//           <PaperClipIcon className="w-5 h-5" /> Donation Rules
//         </Typography>
//         <Typography variant="paragraph" color="blue-gray">
//           Adopting a pet is a meaningful commitment to providing love and care. Adopters must be at least 18 years old and able to demonstrate the ability to meet the pet’s needs, including providing a safe home, proper food, and veterinary care. The process typically involves an application, interview, and sometimes a home visit to ensure compatibility. All adopted pets must be spayed or neutered to prevent overpopulation. If an adopter can no longer care for the pet, it must be returned to the agency. Adoption ensures every pet finds a loving, responsible, and permanent home for a happy life.
//         </Typography>
//       </div>

//       <div className="mt-32">
//         <Typography variant="h2" >
//           Explore more campaigns
//         </Typography>
//         <div className="my-16 space-y-6">
//           {recommandedCampaigns?.length > 0 ? recommandedCampaigns?.map((camp) => (
//             <Card shadow={false} key={camp._id} className="w-full flex-col lg:flex-row gap-12 rounded-xl bg-gray-200">
//               <CardHeader
//                 shadow={false}
//                 floated={false}
//                 className="m-0 lg:w-2/5 lg:h-[330px] shrink-0"
//               >
//                 <img
//                   src={camp.petImage}
//                   alt="card-image"
//                   className="h-full w-full object-cover rounded-lg"
//                 />
//               </CardHeader>
//               <CardBody>
//                 <Typography variant="h2" color="blue-gray" className="mb-6">
//                   Meet <span className="text-pink-600">{camp.petName}</span>
//                 </Typography>

//                 <div className=" mb-4">
//                   <Typography variant="h5" color="blue-gray" className="mb-2">
//                     Max Donation: <span className="font-light">${camp.maxDonation}</span>
//                   </Typography>
//                   <Typography variant="h5" color="blue-gray" className="mb-2">
//                     Last Date: <span className="font-light">{camp.lastDate}</span>
//                   </Typography>
//                 </div>
//                 <Typography color="gray" className="mb-8 font-normal">
//                   {camp.shortDescription}
//                 </Typography>

//                 <Link to={`/campaigns/${camp._id}`}>
//                   <Button color="green" size="md">
//                     view details
//                   </Button>
//                 </Link>
//               </CardBody>
//             </Card>)
//           ) : (
//             <Typography variant="paragraph">No campaigns founds.</Typography>
//           )}
//         </div>
//       </div>

//       <Dialog size="sm" open={open} handler={closeModal} className="p-4">
//         <DialogHeader className="relative m-0 block text-center">
//           <Typography variant="h3">Make a Donation</Typography>
//           <Typography className="mt-1 font-normal text-gray-600">
//             Complete the form below with your card details to link your card and make a donation.
//           </Typography>
//           <IconButton
//             size="sm"
//             variant="text"
//             className="!absolute right-3.5 top-3.5"
//             onClick={closeModal}
//           >
//             <XMarkIcon className="h-4 w-4 stroke-2" />
//           </IconButton>
//         </DialogHeader>
//         <DialogBody className="space-y-4 pb-6">
//           <Elements stripe={stripePromise}>
//             <CheckoutForm campaigns={campaigns} closeModal={closeModal} donation={currentDonation} />
//           </Elements>
//         </DialogBody>
//       </Dialog>

//     </div>
//   );
// };

// export default DonationDetails;