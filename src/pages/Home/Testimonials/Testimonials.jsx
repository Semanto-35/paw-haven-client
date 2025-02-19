import { Card, Avatar, Typography } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Emily Johnson",
    role: "Pet Lover",
    message: "This platform made it so easy to find and adopt my furry friend! The experience was seamless and heartwarming.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Smith",
    role: "Donor",
    message: "I love supporting animal welfare! The donation process was smooth, and I know my contributions are making a difference.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Davis",
    role: "Volunteer",
    message: "Volunteering for this platform has been a rewarding journey. Seeing rescued pets find loving homes is amazing!",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="py-24 px-4 bg-gray-100 text-center">
      <Typography variant="h3" className="font-bold text-gray-800 text-3xl md:text-4xl">
        What Our Users Say
      </Typography>
      <Typography variant="paragraph" className="mt-2 text-gray-600 max-w-2xl mx-auto">
        Hear from our amazing users who have found their furry companions, donated, or volunteered with us.
      </Typography>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        className="mt-8 max-w-2xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Card className="p-6 shadow-lg">
              <Avatar src={testimonial.image} size="lg" className="mx-auto mb-4" />
              <Typography variant="h5" className="font-semibold">{testimonial.name}</Typography>
              <Typography variant="small" className="text-gray-500">{testimonial.role}</Typography>
              <Typography className="mt-4 text-gray-700 italic">"{testimonial.message}"</Typography>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
