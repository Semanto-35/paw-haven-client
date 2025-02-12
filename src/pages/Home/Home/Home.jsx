import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import PetsCategory from "../PetsCategory/PetsCategory";


const Home = () => {
  return (
    <div>
      <Banner/>
      <PetsCategory/>
      <CallToAction/>
      <AboutUs/>
    </div>
  );
};

export default Home;