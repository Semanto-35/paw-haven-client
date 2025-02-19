import { Button, Typography } from '@material-tailwind/react';
import { HeartIcon, FaceSmileIcon, HomeIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center text-center text-blue-gray-100 my-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/mGqyMtt/ban-1.jpg"
          alt="Adopt a pet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8, delay: .6, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Why Adopt?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8, delay: .9, ease: "easeOut" }}
          className="text-lg md:text-xl mb-6"
        >
          Adopting a pet can transform lives – theirs and yours. Be the reason a pet finds its forever home and experience the joy of unconditional love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .9, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-2"
        >
          <Typography className="flex items-center gap-4">
            <HeartIcon className="text-pink-500 w-6 h-6" />
            <span className="text-lg font-medium">Save a Life</span>
          </Typography>
          <Typography className="flex items-center gap-4">
            <FaceSmileIcon className="text-yellow-500 w-6 h-6" />
            <span className="text-lg font-medium">Unconditional Love</span>
          </Typography>
          <Typography className="flex items-center gap-4">
            <HomeIcon className="text-green-500 w-6 h-6" />
            <span className="text-lg font-medium">Give Them a Home</span>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          className="mt-8"
        >
          <Button onClick={() => navigate('/pets')} color="pink" size="lg">
            Start Your Adoption Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;