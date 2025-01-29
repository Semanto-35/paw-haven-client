import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Pagination, Navigation} from 'swiper/modules';


const PetsCategory = () => {
  const categories = [
    { "id": 1, "name": "Cats", "image": "https://i.ibb.co.com/YFYD5hRK/2133.jpg" },
    { "id": 2, "name": "Dogs", "image": "https://i.ibb.co.com/BMPWmGQ/27259.jpg" },
    { "id": 3, "name": "Birds", "image": "https://i.ibb.co.com/6775TH83/60183.jpg" },
    { "id": 4, "name": "Fish", "image": "https://i.ibb.co.com/hJjDQCfr/7799.jpg" },
    { "id": 5, "name": "Rabbits", "image": "https://i.ibb.co.com/PGLvTLMf/6353.jpg" }
  ]

  return (
    <div className="max-w-screen-2xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold  mb-4">Explore Pet Categories</h2>
        <p className="text-lg max-w-3xl mx-auto">Find the perfect pet for you</p>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={24}
        loop
        navigation
        pagination={{
          clickable: true,
        }}
        style={{
          '--swiper-navigation-color': '#2f27ce',
          '--swiper-pagination-color': '#2f27ce',
        }}
        autoplay={{
          delay: 4000,
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
        modules={[Navigation, Pagination]}
        className="w-full h-full"
      >
        <div className="">
          {categories.map((category) => (
            <SwiperSlide key={category.id} >
              <Card className="relative group overflow-hidden bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md rounded-lg hover:shadow-lg transition duration-300 cursor-pointer mb-12"
              >
                <CardHeader floated={false} className="h-48 rounded-full">
                  <img src={category.image} alt="profile-picture"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h4"  className="mb-2 group-hover:text-deep-orange-500 transition-transform duration-300 ">
                    {category.name}
                  </Typography>
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default PetsCategory;