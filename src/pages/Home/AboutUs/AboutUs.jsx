import { motion } from "framer-motion";
import { InformationCircleIcon, LightBulbIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const AboutUs = () => {
  return (
    <section id="about" className="py-16">
      <div className="max-w-5xl mx-auto text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold"
        >
          About Our Platform
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-lg dark:text-gray-400 mt-4"
        >
          Our mission is to connect people with pets in need, making adoption easier, safer, and more accessible. 
          We provide a simple way for pet lovers to find their perfect companion while supporting animal welfare organizations.
        </motion.p>
      </div>

      {/* Key Features */}
      <div className="mt-12 grid gap-8 md:grid-cols-3 max-w-screen-2xl mx-auto px-4">
        {/* Feature 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="p-6 bg-white dark:bg-blue-gray-700 rounded-lg shadow-lg text-center"
        >
          <InformationCircleIcon className="w-12 h-12 mx-auto text-blue-500" />
          <h3 className="text-xl font-semibold mt-4">How It Works</h3>
          <p className="mt-2">
            Browse pets, learn about their needs, and connect with verified shelters or adopters.
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="p-6 bg-white dark:bg-blue-gray-700 rounded-lg shadow-lg text-center"
        >
          <LightBulbIcon className="w-12 h-12 mx-auto text-yellow-500" />
          <h3 className="text-xl font-semibold mt-4">Why We Built This</h3>
          <p className="mt-2">
            Many pets need a second chance. We created this platform to give every pet the opportunity to find a loving home.
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="p-6 bg-white dark:bg-blue-gray-700 rounded-lg shadow-lg text-center"
        >
          <GlobeAltIcon className="w-12 h-12 mx-auto text-green-500" />
          <h3 className="text-xl font-semibold mt-4">Join Our Community</h3>
          <p className="mt-2">
            Become a part of a caring community that values pet welfare and responsible adoption.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
