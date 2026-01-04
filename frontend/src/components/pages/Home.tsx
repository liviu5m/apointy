import Hero from "../elements/home/Hero";
import SectionBuilt from "../elements/home/SectionBuilt";
import SectionNeed from "../elements/home/SectionNeed";
import BodyLayout from "../layouts/BodyLayout";

const Home = () => {
  
  return (
    <BodyLayout>
      <Hero />
      <SectionBuilt />
      <SectionNeed />
    </BodyLayout>
  );
};

export default Home;
