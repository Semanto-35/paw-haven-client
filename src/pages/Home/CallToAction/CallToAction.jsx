import { Typography, Button } from "@material-tailwind/react";
import { HeartIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-amber-500 dark:bg-amber-600">
      <div className="max-w-screen-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Typography
            variant="h2"
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Ready to Make a Difference?
          </Typography>

          <Typography
            variant="lead"
            className="text-xl text-white mb-10 max-w-3xl mx-auto"
          >
            Join our community of pet lovers and help give animals the loving homes they deserve
          </Typography>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
              onClick={() => navigate('/pets')}
                color="white"
                className="flex items-center gap-2 text-amber-600 dark:text-amber-700 font-bold"
              >
                Adopt a Pet Today
                <ArrowRightIcon className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                color="white"
                className="flex items-center gap-2 font-bold"
                onClick={() => navigate('/donations')}
              >
                <HeartIcon className="w-5 h-5" />
                Donate to Support
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;