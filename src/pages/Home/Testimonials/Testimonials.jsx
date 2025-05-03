import { Card, Typography, Avatar, Button } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/solid";

const Testimonials = () => {
  const stories = [
    {
      id: 1,
      name: "The Johnson Family",
      pet: "Max (Golden Retriever)",
      story: "Adopting Max was the best decision we ever made. He's brought so much joy to our home and has become an inseparable part of our family. His gentle nature makes him perfect with our kids!",
      image: "https://images.unsplash.com/photo-1601758003122-53c40e686a19",
      familyImage: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "Adopted June 2023"
    },
    {
      id: 2,
      name: "The Martinez Family",
      pet: "Luna (Siamese Cat)",
      story: "Luna has transformed our quiet apartment into a home full of love and playful energy. She greets us every morning and has the most adorable way of showing affection.",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      familyImage: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "Adopted March 2023"
    },
    {
      id: 3,
      name: "Sarah Williams",
      pet: "Buddy (Parakeet)",
      story: "As a first-time bird owner, I was nervous, but Buddy has been the perfect companion. His cheerful singing brightens my days and he's surprisingly affectionate!",
      image: "https://images.unsplash.com/photo-1555169062-013468b47731",
      familyImage: "https://randomuser.me/api/portraits/women/68.jpg",
      date: "Adopted January 2024"
    },
    {
      id: 4,
      name: "The Thompson Family",
      pet: "Bella (Labrador Mix)",
      story: "Bella was a shy rescue when we brought her home. Now she's the most confident, loving dog who enjoys hiking with us and cuddling on rainy days.",
      image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80",
      familyImage: "https://randomuser.me/api/portraits/women/63.jpg",
      date: "Adopted September 2022"
    },
    {
      id: 5,
      name: "David Chen",
      pet: "Oliver (Persian Cat)",
      story: "Oliver has been my work-from-home companion for a year now. His calm presence and occasional keyboard walks remind me to take breaks and appreciate the little things.",
      image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803",
      familyImage: "https://randomuser.me/api/portraits/men/75.jpg",
      date: "Adopted November 2023"
    }
  ];

  return (
    <section className="py-16 bg-blue-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white">
            Happy Tails
          </Typography>
          <Typography variant="lead" className="text-lg text-blue-gray-600 dark:text-blue-gray-300 max-w-2xl mx-auto">
            Heartwarming stories from families who found their perfect companions
          </Typography>
        </motion.div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index, className) => {
                return `<span class="${className} bg-amber-500 opacity-50 hover:opacity-100 transition-opacity"></span>`;
              }
            }}
            navigation={{
              nextEl: '.testimonial-next',
              prevEl: '.testimonial-prev',
            }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2, centeredSlides: true },
              768: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Card className="overflow-hidden shadow-xl h-full border border-blue-gray-100 dark:border-blue-gray-800 group hover:shadow-2xl transition-shadow duration-300 dark:bg-blue-gray-800">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.pet}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-gray-900/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Typography variant="h5" className="text-white font-bold">
                          {story.pet}
                        </Typography>
                        <Typography variant="small" className="text-amber-300">
                          {story.date}
                        </Typography>
                      </div>
                      <HeartIcon className="absolute top-4 right-4 w-8 h-8 text-amber-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <Avatar
                          src={story.familyImage}
                          alt={story.name}
                          size="md"
                          className="border-2 border-amber-500 shadow-md"
                          withBorder
                        />
                        <div className="ml-4">
                          <Typography variant="h6" className="text-blue-gray-800 dark:text-white">
                            {story.name}
                          </Typography>
                          <Typography variant="small" className="text-amber-500">
                            Happy Pet Parent
                          </Typography>
                        </div>
                      </div>
                      <Typography className="text-blue-gray-600 dark:text-blue-gray-300 italic mb-6">
                      &quot;{story.story}&quot;
                      </Typography>
                      <Button
                        variant="outlined"
                        color="amber"
                        size="sm"
                        className="mt-auto"
                      >
                        Read Full Story
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button className="testimonial-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white dark:bg-blue-gray-800 p-3 rounded-full shadow-lg hover:bg-amber-50 dark:hover:bg-blue-gray-700 transition-colors hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-amber-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="testimonial-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white dark:bg-blue-gray-800 p-3 rounded-full shadow-lg hover:bg-amber-50 dark:hover:bg-blue-gray-700 transition-colors hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-amber-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;