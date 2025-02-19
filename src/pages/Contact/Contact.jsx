import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { FaFacebook, FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-blue-gray-900 flex items-center justify-center p-6 mt-[72px]">
      <Card className="w-full max-w-4xl bg-white dark:bg-blue-gray-800 shadow-lg rounded-xl">
        <CardBody className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 flex flex-col justify-center space-y-4"
          >
            <Typography variant="h3" className="text-gray-800 dark:text-white font-bold">
              Get in Touch
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-300">
              Have questions or want to work together? Reach out to us!
            </Typography>

            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500" size={20} />
              <Typography className="text-gray-700 dark:text-gray-300">123 Main Street, Mymensingh, Bangladesh</Typography>
            </div>

            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-green-500" size={20} />
              <Typography className="text-gray-700 dark:text-gray-300">+8801997119871</Typography>
            </div>

            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-red-500" size={20} />
              <Typography className="text-gray-700 dark:text-gray-300">sabbirhossainsemanto@gmail.com</Typography>
            </div>

            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebook size={28} /></a>
              <a href="#" className="text-blue-500 hover:text-blue-700"><FaTwitter size={28} /></a>
              <a href="#" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={28} /></a>
            </div>
          </motion.div>

          {/* Right Section: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Typography className="text-gray-700 dark:text-gray-300">Full Name</Typography>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Enter your name"
                  required
                  className="mt-1 w-full"
                />
              </div>

              <div>
                <Typography className="text-gray-700 dark:text-gray-300">Email Address</Typography>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Enter your email"
                  required
                  className="mt-1 w-full"
                />
              </div>

              <div>
                <Typography className="text-gray-700 dark:text-gray-300">Your Message</Typography>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  label="Type your message..."
                  required
                  className="mt-1 w-full"
                />
              </div>

              <Button type="submit" fullWidth  color="pink">
                Send Message
              </Button>
            </form>
          </motion.div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Contact;
