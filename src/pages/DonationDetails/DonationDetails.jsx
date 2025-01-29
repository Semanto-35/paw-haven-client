import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Loader from "../../components/shared/Loader/Loader";
import { Button, Card, CardBody, CardHeader, Chip, Dialog, DialogBody, DialogHeader, IconButton, Typography } from "@material-tailwind/react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
console.log(stripePromise);

const DonationDetails = () => {

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);


  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ["campaigns", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-campaigns/${id}`);
      return data;
    },
  });

  const { data: recommandedCampaigns } = useQuery({
    queryKey: ["recommandedCampaigns"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/limited-campaigns`);
      return data;
    },
  });

  const { maxDonation, lastDate, petImage, currentDonation, petName, isPaused, shortDescription, addedBy } = campaigns || {};

  const currentDate = new Date().toISOString().split('T')[0];



  if (isLoading) return <Loader />
  if (error) return <Typography color="red">Error: {error.message}</Typography>;


  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <Card shadow={false} className="w-full flex-col lg:flex-row gap-8 rounded-none  dark:bg-gray-700 dark:text-gray-100">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 lg:w-1/2 lg:h-[460px] shrink-0"
        >
          <img
            src={petImage}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h2" >
            Meet <span className="text-orange-600">{petName}</span>
          </Typography>
          <Typography variant="paragraph"  className="mb-6">
            Added By <span className="text-orange-600">{addedBy}</span>
          </Typography>

          <div className=" mb-4">
            <Typography variant="h5"  className="mb-2">
              Max Donation: <span className="font-light">${maxDonation}</span>
            </Typography>
            <Typography variant="h5"  className="mb-2">
              Donation: <span className="font-light">${currentDonation}</span>
            </Typography>
            <Typography variant="h5"  className="flex items-center gap-2 mb-2">
              Status: <Chip size="sm" variant="ghost" value={isPaused ? 'Paused' : 'Can Donate'} className="rounded-full"
                color={isPaused ? "red" : "green"}
              />
            </Typography>
            <Typography variant="h5"  className="mb-2">
              Last Date: <span className="font-light">{lastDate}</span>
            </Typography>
          </div>
          <Typography  className="mb-8 font-normal">
            {shortDescription}
          </Typography>
          <Button onClick={openModal} variant="filled" color="green"
            disabled={isPaused || currentDate > lastDate || currentDonation >= maxDonation}
          >
            Donate now
          </Button>
        </CardBody>
      </Card>

      <div className="border space-y-4 my-16 p-10 rounded-xl bg-deep-orange-50">
        <Typography variant="h5" color="blue-gray" className="flex items-center gap-3">
          <PaperClipIcon className="w-5 h-5" /> Donation Rules
        </Typography>
        <Typography variant="paragraph" color="blue-gray">
          Adopting a pet is a meaningful commitment to providing love and care. Adopters must be at least 18 years old and able to demonstrate the ability to meet the pet’s needs, including providing a safe home, proper food, and veterinary care. The process typically involves an application, interview, and sometimes a home visit to ensure compatibility. All adopted pets must be spayed or neutered to prevent overpopulation. If an adopter can no longer care for the pet, it must be returned to the agency. Adoption ensures every pet finds a loving, responsible, and permanent home for a happy life.
        </Typography>
      </div>

      <div className="mt-32">
        <Typography variant="h2" >
          Explore more campaigns
        </Typography>
        <div className="my-16 space-y-6">
          {recommandedCampaigns?.length > 0 ? recommandedCampaigns?.map((camp) => (
            <Card shadow={false} key={camp._id} className="w-full flex-col lg:flex-row gap-12 rounded-none bg-gray-200">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 lg:w-2/5 lg:h-[330px] shrink-0"
              >
                <img
                  src={camp.petImage}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h2" color="blue-gray" className="mb-6">
                  Meet <span className="text-orange-600">{camp.petName}</span>
                </Typography>

                <div className=" mb-4">
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Max Donation: <span className="font-light">${camp.maxDonation}</span>
                  </Typography>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Last Date: <span className="font-light">{camp.lastDate}</span>
                  </Typography>
                </div>
                <Typography color="gray" className="mb-8 font-normal">
                  {camp.shortDescription}
                </Typography>

                <Link to={`/campaigns/${camp._id}`}>
                  <Button size="md">
                    view details
                  </Button>
                </Link>
              </CardBody>
            </Card>)
          ) : (
            <Typography variant="paragraph">No campaigns founds.</Typography>
          )}
        </div>
      </div>

      <Dialog size="sm" open={open} handler={closeModal} className="p-4">
        <DialogHeader className="relative m-0 block text-center">
          <Typography variant="h3">Make a Donation</Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Complete the form below with your card details to link your card and make a donation.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={closeModal}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm campaigns={campaigns} closeModal={closeModal} donation={currentDonation} />
          </Elements>
        </DialogBody>
      </Dialog>

    </div>
  );
};

export default DonationDetails;