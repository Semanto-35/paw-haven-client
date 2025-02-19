import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-screen-2xl mx-auto px-4 text-white"
        >
          <Typography variant="h3" className="font-bold text-3xl md:text-4xl">
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="paragraph" className="mt-2 text-lg">
            Get the latest updates, special offers, and exclusive content delivered straight to your inbox.
          </Typography>

          <Card className="mt-6 p-4 bg-white dark:bg-blue-gray-800 dark:text-white rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between max-w-2xl mx-auto">
            <Input
              type="email"
              label="Enter your email..."
              className="flex-1 px-4 py-2 text-gray-700 dark:text-white focus:outline-none"
            />
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button color="pink" className="mt-4 md:mt-0 md:ml-4">
                Subscribe
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
