import { Typography, Button, Input } from "@material-tailwind/react";
import { EnvelopeIcon, HeartIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { toast } from "react-toastify";


const Newsletter = () => {
  const subscribe = () => {
    toast.success("You have successfully subscribed")
  }
  
  return (
    <section className="py-16 bg-blue-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-blue-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left Content */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <Typography
                variant="h3"
                className="text-2xl sm:text-3xl font-bold mb-4 text-blue-gray-800 dark:text-white"
              >
                Join Our Pet Community
              </Typography>

              <Typography className="text-blue-gray-600 dark:text-blue-gray-300 mb-6 sm:mb-8">
                Subscribe to get heartwarming stories, pet care tips, and adoption updates straight to your inbox.
              </Typography>

              <form onSubmit={subscribe} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <Input
                      type="email"
                      label="Your email address"
                      icon={<EnvelopeIcon className="h-5 w-5" />}
                      className="dark:text-blue-gray-50"
                      color="amber"
                      size="lg"
                      required
                      containerProps={{ className: "min-w-[200px]" }}
                    />
                  </div>
                  <Button
                    type="submit"
                    color="amber"
                    size="lg"
                    className="flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
                  >
                    <HeartIcon className="h-5 w-5" />
                    Subscribe
                  </Button>
                </div>

                <Typography variant="small" className="text-blue-gray-500 dark:text-blue-gray-400 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </Typography>
              </form>
            </div>

            {/* Right Image - Hidden on mobile */}
            <motion.div
              className="hidden lg:block relative bg-amber-500 h-[350px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80"
                alt="Happy dog with mail"
                className="w-full h-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-gray-900/70 via-transparent to-transparent flex items-end p-6 md:p-8">
                <Typography className="text-white font-bold text-lg md:text-xl">
                  &quot;Our newsletter helped 500+ pets find homes last month!&quot;
                </Typography>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
