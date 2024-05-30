import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";

const Homepage = async () =>{

  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />  
    </>
  );
}

export default Homepage;
