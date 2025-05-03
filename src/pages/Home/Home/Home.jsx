import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import FeaturedCampaigns from "../FeaturedCampaigns/FeaturedCampaigns";
import FeaturedPets from "../FeaturedPets/FeaturedPets";
import HowItWorks from "../HowItWorks/HowItWorks";
import Newsletter from "../Newsletter/Newsletter";
import PetCare from "../PetCare/PetCare";
import PetsCategory from "../PetsCategory/PetsCategory";
import Testimonials from "../Testimonials/Testimonials";


const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedPets />
      <PetsCategory />
      <HowItWorks />
      <Testimonials />
      <FeaturedCampaigns />
      <PetCare />
      <Newsletter />
      <CallToAction />
    </div>
  );
};

export default Home;