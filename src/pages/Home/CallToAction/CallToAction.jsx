import { motion } from 'framer-motion';
import { Button } from '@material-tailwind/react';
import { HeartIcon, FaceSmileIcon, HomeIcon } from '@heroicons/react/24/outline';


const CallToAction = () => {
  return (
    <section className="relative max-w-screen-2xl mx-auto px-4 py-16">
      <div className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://i.ibb.co.com/mGqyMtt/ban-1.jpg')" }}
      ></div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <motion.div
          className="w-full rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://i.ibb.co.com/mGqyMtt/ban-1.jpg"
            alt="Happy owner with their pet"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Why Adopt?</h2>
          <p className="text-lg leading-relaxed">
            Adopting a pet can transform lives – theirs and yours. Be the reason a pet finds its forever home and experience the joy of unconditional love.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <HeartIcon className="text-pink-500 w-6 h-6" />
              <p className="text-lg font-medium">Save a Life</p>
            </div>
            <div className="flex items-center gap-4">
              <FaceSmileIcon className="text-yellow-500 w-6 h-6" />
              <p className="text-lg font-medium">Unconditional Love</p>
            </div>
            <div className="flex items-center gap-4">
              <HomeIcon className="text-green-500 w-6 h-6" />
              <p className="text-lg font-medium">Give Them a Home</p>
            </div>
          </div>
          <Button color="blue" size="lg" className="mt-6">
            Start Your Adoption Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
