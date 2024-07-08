import React from "react";
import HeroSection from "../component/home/heroSection";
import Services from "../component/home/services";
import Navbar from "../component/common/Navbar";
import Footer from "../component/common/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Services />
      <Footer />
    </>
  );
};

export default HomePage;
