import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full h-full pt-28 pb-16 bg-blue-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-center flex-col-reverse md:flex-row gap-8 lg:gap-16 px-4">

        {/* Left Side: Text */}
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-blue-gray-800 dark:text-white"
          >
            Find Your <span className="text-amber-500">Perfect Companion</span> 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="text-lg md:text-xl text-blue-gray-600 dark:text-blue-gray-300 mt-4 mb-6"
          >
            Adopt a pet today and give them the loving home they deserve. 
            <span className="block mt-2 flex items-center gap-1">
              <HeartIcon className="w-5 h-5 text-amber-500" /> 
              Every adoption saves a life
            </span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: "easeOut" }}
            className="flex gap-4"
          >
            <Button
              onClick={() => navigate('/pets')}
              color="amber" 
              size="lg"
              className="shadow-lg hover:shadow-amber-500/20"
            >
              Explore Pets
            </Button>
            <Button
              onClick={() => navigate('/donations')}
              variant="outlined"
              color="blue-gray" 
              size="lg"
              className="border-blue-gray-200 dark:border-blue-gray-600 text-blue-gray-700 dark:text-white"
            >
              Support Us
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        >
          <img 
            src="https://i.ibb.co.com/Z6gPVdQW/bgImg.png" 
            alt="Happy dog and cat together" 
            className="w-full h-auto object-contain rounded-lg shadow-sm"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;