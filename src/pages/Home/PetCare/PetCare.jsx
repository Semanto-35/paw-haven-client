import { Accordion, AccordionHeader, AccordionBody, Typography } from "@material-tailwind/react";
import { useState } from "react";

const tips = [
  { title: "Proper Nutrition", content: "Ensure your pet gets a balanced diet with the right nutrients." },
  { title: "Regular Vet Visits", content: "Schedule annual check-ups to keep your pet healthy and happy." },
  { title: "Exercise & Playtime", content: "Give your pet daily exercise and interactive play to keep them active." },
];

const PetCare = () => {
  const [open, setOpen] = useState(0);

  return (
    <div className="py-16 px-4  text-center">
      <Typography variant="h3" className="font-bold text-3xl md:text-4xl">
        Essential Pet Care Tips
      </Typography>
      <Typography variant="paragraph" className="mt-2 max-w-2xl mx-auto">
        Keep your furry friend happy and healthy with these expert care tips.
      </Typography>

      <div className="mt-6 max-w-2xl mx-auto">
        {tips.map((tip, index) => (
          <Accordion key={index} open={open === index} className="mb-2 text-black dark:text-white">
            <AccordionHeader onClick={() => setOpen(open === index ? null : index)}>
              {tip.title}
            </AccordionHeader>
            <AccordionBody>
              <Typography className="">{tip.content}</Typography>
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default PetCare;
