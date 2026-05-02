import React from "react";
import Hero from "@/components/sections/Hero";
import Packages from "@/components/sections/Packages";
import Stats from "@/components/sections/Stats";
import Destinations from "@/components/sections/Destinations";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";
import ActivitiesTicker from "@/components/ui/ActivitiesTicker";
import MountainDivider from "@/components/ui/MountainDivider";

export default function Home() {
  return (
    <>
      <PageLoader />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <ActivitiesTicker />
          <Packages />
          <MountainDivider color="hsl(var(--primary))" />
          <Stats />
          <MountainDivider flipped color="hsl(var(--primary))" />
          <Destinations />
          <WhyChooseUs />
          <MountainDivider color="hsl(var(--muted) / 0.2)" />
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
