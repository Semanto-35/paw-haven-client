import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";


const PetsCategory = () => {
  const navigate = useNavigate();

  const categories = [
    { "id": 1, "name": "Cats", "image": "https://i.ibb.co.com/YFYD5hRK/2133.jpg" },
    { "id": 2, "name": "Dogs", "image": "https://i.ibb.co.com/BMPWmGQ/27259.jpg" },
    { "id": 3, "name": "Birds", "image": "https://i.ibb.co.com/6775TH83/60183.jpg" },
    { "id": 4, "name": "Fish", "image": "https://i.ibb.co.com/hJjDQCfr/7799.jpg" },
    { "id": 5, "name": "Rabbits", "image": "https://i.ibb.co.com/PGLvTLMf/6353.jpg" }
  ]

  return (
    <section className="max-w-screen-2xl mx-auto py-16 px-4 relative">
      {/* title */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold  mb-3"
        >
          Browse by Pet Category
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:text-lg max-w-3xl mx-auto"
        >
          Choose a category to find your perfect pet.
        </motion.p>
      </div>

      {/* carousel */}
      <Swiper
        slidesPerView={2}
        spaceBetween={24}
        loop
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        modules={[Navigation]}
        className="w-full h-full"
      >
        <div>
          {categories.map((category) => (
            <SwiperSlide key={category.id} >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: category.id * 0.2 }}
              >
                <Card className="relative group overflow-hidden bg-white dark:bg-blue-gray-700 text-black dark:text-blue-gray-100 shadow-md rounded-lg hover:shadow-lg transition duration-300 cursor-pointer mb-12"
                  onClick={() => navigate(`/pets`)}
                >
                  <CardHeader floated={false} className="h-48">
                    <img src={category.image} alt="profile-picture"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </CardHeader>
                  <CardBody className="text-center">
                    <Typography variant="h4" className="mb-2 group-hover:text-pink-500 transition-transform duration-300 ">
                      {category.name}
                    </Typography>
                  </CardBody>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute bottom-16 z-50 left-1/2 -translate-x-1/2 flex gap-4">
        <button className="custom-prev p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition">
          <ArrowLongLeftIcon className="w-6" />
        </button>
        <button className="custom-next p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition">
          <ArrowLongRightIcon className="w-6" />
        </button>
      </div>
    </section >
  );
};

export default PetsCategory;