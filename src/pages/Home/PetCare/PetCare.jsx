import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";

const PetCare = () => {
  const [open, setOpen] = useState(0);
  const tips = [
    {
      title: "Nutrition Guidance",
      content: "Learn about balanced diets, portion control, and special dietary needs for different pets. Discover which foods are toxic to pets and how to create a feeding schedule that works for your lifestyle.",
      icon: "🥕"
    },
    {
      title: "Training Basics",
      content: "Essential training techniques to help your new pet adjust to their home. From potty training to basic commands, we cover positive reinforcement methods that build trust and good behavior.",
      icon: "🐾"
    },
    {
      title: "Health & Wellness",
      content: "Understand vaccination schedules, parasite prevention, and when to visit the vet. Learn to recognize early signs of illness and maintain your pet's optimal health through all life stages.",
      icon: "❤️"
    },
    {
      title: "Behavioral Insights",
      content: "How to interpret your pet's behavior and address common issues. Understand separation anxiety, destructive behaviors, and how to create a stimulating environment for your pet.",
      icon: "🧠"
    }
  ];

  return (
    <section className="py-16 bg-blue-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white">
              Pet Care Resources
            </Typography>
            <Typography variant="lead" className="text-lg text-blue-gray-600 dark:text-blue-gray-300 max-w-2xl mx-auto">
              Essential information to help you care for your new companion
            </Typography>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2 w-full">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6 last:mb-0"
              >
                <Accordion 
                  open={open === index}
                  className="border border-blue-gray-100 dark:border-blue-gray-700 rounded-lg overflow-hidden bg-white dark:bg-blue-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionHeader 
                    className="px-6 py-5 dark:text-blue-gray-50 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    onClick={() => setOpen(open === index ? null : index)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{tip.icon}</span>
                      <Typography variant="h5" className="font-semibold text-left">
                        {tip.title}
                      </Typography>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="px-6 pb-6 pt-2 text-blue-gray-600 dark:text-blue-gray-300">
                    {tip.content}
                  </AccordionBody>
                </Accordion>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="lg:w-1/2 w-full hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[480px] rounded-xl overflow-hidden shadow-xl border border-blue-gray-100 dark:border-blue-gray-700">
              <img
                src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Happy woman with her dog"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-gray-900/70 via-transparent to-transparent flex items-end p-8">
                <div>
                  <Typography variant="h4" className="text-white font-bold mb-2">
                    Personalized Care Advice
                  </Typography>
                  <Typography className="text-blue-gray-200">
                    Our team of veterinarians and pet experts can provide customized guidance for your specific pet&apos;s needs.
                  </Typography>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PetCare;