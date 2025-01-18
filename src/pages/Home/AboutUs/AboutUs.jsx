import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


const AboutUs = () => {
  return (
    <section className="max-w-screen-2xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We are dedicated to connecting pets with loving homes. Our platform
          ensures a safe and easy adoption process, helping over 500 pets find
          their forever families.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Our Mission
          </h3>
          <p className="text-gray-700 mb-6">
            We aim to create a world where every pet has a loving home. Our
            platform bridges the gap between pet lovers and pets in need,
            making it easier to adopt, foster, or donate to animal shelters.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-teal-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold mr-4">1</span>
              <p className="text-gray-600">
                Ensure safe and reliable pet adoptions.
              </p>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold mr-4">2</span>
              <p className="text-gray-600">Connect loving families with pets in need.</p>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold mr-4">3</span>
              <p className="text-gray-600">Promote verified and ethical adoptions.</p>
            </li>
          </ul>
        </div>
        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{ delay: 2500 }}
            navigation
            loop
            modules={[Navigation]}
            className="w-full h-96 rounded-lg shadow-lg overflow-hidden"
          >
            <SwiperSlide>
              <img
                src="https://i.ibb.co.com/5KWRV77/dog-1.jpg"
                alt="Happy Owner and Pet"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://i.ibb.co.com/5nQ4sh4/dog-2.jpg"
                alt="Adopted Dog"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://i.ibb.co.com/5nQ4sh4/dog-2.jpg"
                alt="Adopted Cat"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;