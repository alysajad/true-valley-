import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useRoute, useLocation } from "wouter";
import { Check, X, Clock, MapPin, Users, ArrowLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatButton from "@/components/ui/WhatsAppFloatButton";
import { getPackageBySlug, packageOptionLabel } from "@/data/packages";
import { useBookingPreFill } from "@/context/BookingPreFillContext";
import { useEnquiryPopup } from "@/context/EnquiryPopupContext";
import { useHashNav } from "@/lib/useHashNav";

const TIER_BADGE: Record<string, string> = {
  "Budget": "bg-emerald-600",
  "Premium": "bg-primary",
  "Luxury": "bg-violet-700",
  "Ultra-Luxury": "bg-secondary",
};

export default function PackageDetail() {
  const [, params] = useRoute("/packages/:slug");
  const [, setLocation] = useLocation();
  const { setPreFill } = useBookingPreFill();
  const { openPopup } = useEnquiryPopup();
  const hashNav = useHashNav();
  const pkg = params?.slug ? getPackageBySlug(params.slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [params?.slug]);

  const handleEnquire = () => {
    if (!pkg) return;
    openPopup(packageOptionLabel(pkg));
  };

  if (!pkg) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
          <h1 className="font-serif text-3xl font-bold text-primary uppercase tracking-wide mb-3">Package Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            We couldn't find that tour. Browse our full range of Kashmir packages instead.
          </p>
          <Link href="/" className="bg-primary text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-colors">
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <WhatsAppFloatButton />
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = pkg.fallback; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/45 to-primary/25" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 md:px-6 pb-8 md:pb-10">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-[11px] text-white/70 uppercase tracking-widest mb-4">
                <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
                <ChevronRight size={12} />
                <button onClick={() => hashNav("#packages")} className="hover:text-secondary transition-colors uppercase tracking-widest">Packages</button>
                <ChevronRight size={12} />
                <span className="text-white/90">{pkg.title}</span>
              </nav>

              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 text-white mb-3 ${TIER_BADGE[pkg.tier] ?? "bg-primary"}`}>
                {pkg.tier}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-wide leading-tight max-w-3xl">
                {pkg.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-white/90 text-sm">
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-secondary" />{pkg.duration}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-secondary" />{pkg.route}</span>
                <span className="flex items-center gap-1.5"><Users size={14} className="text-secondary" />{pkg.minPax}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Left column — content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-primary uppercase tracking-wide mb-4">Tour Overview</h2>
                  <div className="w-12 h-0.5 bg-secondary mb-5" />
                  <p className="text-muted-foreground leading-relaxed">{pkg.overview}</p>
                </div>

                {/* Itinerary */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-primary uppercase tracking-wide mb-4">Day-by-Day Itinerary</h2>
                  <div className="w-12 h-0.5 bg-secondary mb-7" />
                  <ol className="relative border-l-2 border-border ml-3 space-y-8">
                    {pkg.itinerary.map((d, idx) => (
                      <motion.li
                        key={d.day}
                        className="ml-7"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.45, delay: idx * 0.04 }}
                      >
                        {/* Day marker */}
                        <span className="absolute -left-[14px] flex items-center justify-center w-7 h-7 bg-primary text-white text-[11px] font-bold">
                          {d.day}
                        </span>
                        <h3 className="font-serif font-bold text-foreground uppercase tracking-wide text-sm mb-1.5">
                          Day {d.day} — {d.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Inclusions / Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border border-border p-6">
                    <h3 className="font-serif font-bold text-primary uppercase tracking-wide text-sm mb-4 flex items-center gap-2">
                      <Check size={16} className="text-emerald-600" /> Inclusions
                    </h3>
                    <ul className="space-y-2.5">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-[13px] leading-snug">
                          <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-border p-6">
                    <h3 className="font-serif font-bold text-primary uppercase tracking-wide text-sm mb-4 flex items-center gap-2">
                      <X size={16} className="text-red-500" /> Exclusions
                    </h3>
                    <ul className="space-y-2.5">
                      {pkg.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-[13px] leading-snug">
                          <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                          {exc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right column — sticky price / booking card */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-4">
                  <div className="border border-border bg-white shadow-sm">
                    {/* Price */}
                    <div className="bg-primary text-white p-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/60">Starting from</span>
                        <span className="text-sm text-white/50 line-through">₹{pkg.originalPrice}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-4xl font-bold text-secondary">₹{pkg.price}</span>
                        <span className="text-xs text-white/70">/ per pax</span>
                      </div>
                      <span className="inline-block mt-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                        You save ₹{pkg.save}
                      </span>
                    </div>

                    {/* Quick facts */}
                    <div className="p-6 space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Clock size={14} className="text-secondary" />Duration</span>
                        <span className="font-semibold text-foreground">{pkg.duration}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-muted-foreground flex items-center gap-2 shrink-0"><MapPin size={14} className="text-secondary" />Route</span>
                        <span className="font-semibold text-foreground text-right text-[13px]">{pkg.route}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Users size={14} className="text-secondary" />Group</span>
                        <span className="font-semibold text-foreground">{pkg.minPax}</span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="p-6 pt-0 space-y-3">
                      <motion.button
                        onClick={handleEnquire}
                        className="w-full bg-secondary text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Enquire About This Tour
                      </motion.button>
                      <a
                        href={`https://wa.me/918899177826?text=${encodeURIComponent(
                          `Hi True Valley Travels! I'm interested in the ${pkg.title} (${pkg.duration}, ₹${pkg.price}/pax). Please share availability and details.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center border border-[#25D366] text-[#1ebe5d] py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#25D366] hover:text-white transition-colors"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => hashNav("#packages")}
                    className="flex w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary transition-colors py-2"
                  >
                    <ArrowLeft size={14} /> Back to all packages
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
