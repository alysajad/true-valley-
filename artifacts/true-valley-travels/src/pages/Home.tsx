import React, { Suspense, lazy } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SearchBar from "@/components/sections/SearchBar";
import ActivitiesTicker from "@/components/ui/ActivitiesTicker";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatButton from "@/components/ui/WhatsAppFloatButton";

const Packages = lazy(() => import("@/components/sections/Packages"));
const Stats = lazy(() => import("@/components/sections/Stats"));
const Destinations = lazy(() => import("@/components/sections/Destinations"));
const WhyChooseUs = lazy(() => import("@/components/sections/WhyChooseUs"));
const TourismRegistration = lazy(() => import("@/components/sections/TourismRegistration"));
const Team = lazy(() => import("@/components/sections/Team"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const Newsletter = lazy(() => import("@/components/sections/Newsletter"));
const Contact = lazy(() => import("@/components/sections/Contact"));

const SectionFallback = () => <div className="min-h-50" />;

export default function Home() {
  return (
    <>
      <WhatsAppFloatButton />
      <div className="flex flex-col min-h-screen min-w-0 w-full overflow-x-clip season-transition">
        <Navbar />
        <main className="flex-1 min-w-0 w-full overflow-x-clip">
          <Hero />
          <SearchBar />
          <ActivitiesTicker />
          <Suspense fallback={<SectionFallback />}><Packages /></Suspense>
          <Suspense fallback={<SectionFallback />}><Stats /></Suspense>
          <Suspense fallback={<SectionFallback />}><Destinations /></Suspense>
          <Suspense fallback={<SectionFallback />}><WhyChooseUs /></Suspense>
          <Suspense fallback={<SectionFallback />}><TourismRegistration /></Suspense>
          <Suspense fallback={<SectionFallback />}><Team /></Suspense>
          <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
          <Suspense fallback={<SectionFallback />}><Newsletter /></Suspense>
          <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
