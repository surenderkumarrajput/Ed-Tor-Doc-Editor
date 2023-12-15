import Navbar from "@/components/Navbar/Navbar";
import Heading from "./_components/Heading";
import HeroImage from "./_components/HeroImage";
import Footer from "./_components/Footer";

function LandingPage() {
  return (
    <div className="relative min-h-full w-full">
      <Navbar />
      <div
        className="
        min-h-screen
       flex flex-col
       items-center
       justify-center
       gap-2"
      >
        <Heading />
        <HeroImage />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
