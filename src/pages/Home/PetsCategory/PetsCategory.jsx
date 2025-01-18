import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Pagination, Navigation} from 'swiper/modules';


const PetsCategory = () => {
  const categories = [
    { "id": 1, "name": "Cats", "image": "/images/cats.jpg" },
    { "id": 2, "name": "Dogs", "image": "/images/dogs.jpg" },
    { "id": 3, "name": "Birds", "image": "/images/birds.jpg" },
    { "id": 4, "name": "Fish", "image": "/images/fish.jpg" },
    { "id": 5, "name": "Rabbits", "image": "/images/rabbits.jpg" }
  ]

  return (
    <div className="max-w-screen-2xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Pet Categories</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Find the perfect pet for you</p>
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
              <Card className="relative group overflow-hidden shadow-md rounded-lg hover:shadow-lg transition duration-300 cursor-pointer mb-12"
              >
                <CardHeader floated={false} className=" rounded-full">
                  <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h4" color="blue-gray" className="mb-2 group-hover:text-deep-orange-500 transition-transform duration-300 ">
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