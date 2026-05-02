import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SearchBar from "@/components/sections/SearchBar";
import ActivitiesTicker from "@/components/ui/ActivitiesTicker";
import Packages from "@/components/sections/Packages";
import Stats from "@/components/sections/Stats";
import Destinations from "@/components/sections/Destinations";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <SearchBar />
          <ActivitiesTicker />
          <Packages />
          <Stats />
          <Destinations />
          <WhyChooseUs />
          <Team />
          <Testimonials />
          <Newsletter />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
