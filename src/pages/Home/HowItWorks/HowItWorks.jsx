import { Card, CardBody, Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const steps = [
  { title: "Browse Available Pets", description: "Explore our listings to find your perfect companion." },
  { title: "Submit an Adoption Request", description: "Fill out a quick adoption form and wait for approval." },
  { title: "Meet Your New Friend", description: "Schedule a visit to meet the pet and finalize adoption." },
];

const HowItWorks = () => {
  return (
    <div className="py-24 max-w-screen-2xl mx-auto px-4 text-center">
      <Typography variant="h3" className="font-bold ">
        How It Works
      </Typography>
      <Typography variant="paragraph" className="mt-2 max-w-2xl mx-auto">
        Adopting a pet has never been easier! Follow these simple steps.
      </Typography>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="shadow-md p-6">
            <CardBody className="flex flex-col items-center">
              <CheckCircleIcon className="h-12 w-12 text-teal-500 mb-4" />
              <Typography variant="h5" className="font-semibold">{step.title}</Typography>
              <Typography className="text-gray-600 mt-2">{step.description}</Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
