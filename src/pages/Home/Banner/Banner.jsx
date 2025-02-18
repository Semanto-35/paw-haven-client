import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Banner = () => {
const navigate = useNavigate();

  return (
    <section className="w-full h-full py-6 mt-[72px] mb-10">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-center flex-col-reverse md:flex-row gap-10 px-4">

        {/* Left Side: Text */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: .6, ease: "easeOut" }}
            className="text-4xl lg:text-6xl font-bold leading-tight"
          >
            Find Your <span className="text-pink-400">Perfect Companion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: .9, ease: "easeOut" }}
            className="text-lg dark:text-gray-300 mt-3"
          >
            Adopt a pet today and give them the love and home they deserve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .9, delay: 1.2, ease: "easeOut" }}
            className="mt-6"
          >
            <Button
            onClick={()=>navigate('/pets')}
              color="pink"
              size="lg"
              className=" shadow-lg"
            >
              Explore Pets
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        <motion.div
          className="w-full sm:h-[350px] md:h-[400px] lg:h-[450px]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        >
          <img src="https://i.ibb.co.com/Z6gPVdQW/bgImg.png" alt="Pet Adoption" className="w-full h-full object-contain" />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;