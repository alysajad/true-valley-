import React from "react";
import Hero from "@/components/sections/Hero";
import Packages from "@/components/sections/Packages";
import Destinations from "@/components/sections/Destinations";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Packages />
        <Destinations />
        <WhyChooseUs />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
