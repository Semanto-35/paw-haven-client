import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import HowItWorks from "../HowItWorks/HowItWorks";
import Newsletter from "../Newsletter/Newsletter";
import PetCare from "../PetCare/PetCare";
import PetsCategory from "../PetsCategory/PetsCategory";
import Testimonials from "../Testimonials/Testimonials";


const Home = () => {
  return (
    <div>
      <Banner />
      <PetsCategory />
      <CallToAction />
      <AboutUs />
      <PetCare />
      <Testimonials />
      <HowItWorks />
      <Newsletter />
    </div>
  );
};

export default Home;