import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative max-w-7xl mx-auto w-full h-[500px] bg-blue-100 flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        alt="Banner"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative text-center text-white">
        <motion.h2 className="font-bold text-4xl"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{
            y: 0, opacity: 1, transition: { duration: 1.2, delay: 0.2, ease: 'easeOut' }
          }}
          viewport={{ once: true }}
        >
          Welcome to Pet Haven
        </motion.h2>
        <motion.p className="mt-4 text-lg font-medium"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{
            y: 0, opacity: 1, transition: { duration: 1.2, delay: 0.5, ease: 'easeOut' }
          }}
          viewport={{ once: true }}
        >
          Your journey to finding a loving companion starts here.
        </motion.p>
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{
            y: 0, opacity: 1, transition: { duration: 1.2, delay: 0.9, ease: 'easeOut' }
          }}
          viewport={{ once: true }}
        >
          <Button className="mt-6" color="blue" size="lg">
            Explore Pets
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;