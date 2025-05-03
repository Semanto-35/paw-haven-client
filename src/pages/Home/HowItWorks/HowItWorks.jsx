import { Typography } from "@material-tailwind/react";
import { 
  MagnifyingGlassIcon,
  HeartIcon,
  HomeIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MagnifyingGlassIcon className="w-6 h-6" />,
      title: "Browse Pets",
      description: "Explore our gallery of pets available for adoption"
    },
    {
      icon: <HeartIcon className="w-6 h-6" />,
      title: "Submit Application",
      description: "Complete our simple adoption application form"
    },
    {
      icon: <HomeIcon className="w-6 h-6" />,
      title: "Meet & Greet",
      description: "Schedule a visit to meet your potential new pet"
    },
    {
      icon: <CheckBadgeIcon className="w-6 h-6" />,
      title: "Finalize Adoption",
      description: "Complete paperwork and bring your pet home"
    }
  ];

  return (
    <section className="py-20 bg-blue-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <Typography 
            variant="h2" 
            className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white"
          >
            Simple Adoption Process
          </Typography>
          <Typography 
            variant="lead" 
            className="text-lg text-blue-gray-600 dark:text-blue-gray-300 max-w-2xl mx-auto"
          >
            Our streamlined process makes finding your new companion easy and stress-free
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-blue-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-500 dark:text-amber-300 p-4 flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 bg-amber-500 dark:bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <Typography 
                variant="h5" 
                className="mb-3 text-blue-gray-800 dark:text-white"
              >
                {step.title}
              </Typography>
              <Typography 
                className="text-blue-gray-600 dark:text-blue-gray-300"
              >
                {step.description}
              </Typography>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;