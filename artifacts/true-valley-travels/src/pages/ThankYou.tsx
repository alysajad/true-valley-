import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Google Ads Conversion Config ────────────────────────────────────────────
// Replace these with your actual values from Google Ads:
//   Google Ads → Tools → Conversions → New conversion action → Website
//   Copy the Conversion ID and Label from the generated tag snippet.
const GA_CONVERSION_ID    = "AW-XXXXXXXXX";   // e.g. "AW-123456789"
const GA_CONVERSION_LABEL = "XXXXXXXXXXXX";   // e.g. "AbCdEfGhIjKlMnOp"
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

export default function ThankYou() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    // Fire Google Ads conversion event
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: `${GA_CONVERSION_ID}/${GA_CONVERSION_LABEL}`,
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 bg-muted/20">
        <motion.div
          className="max-w-lg w-full text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Checkmark */}
          <motion.div
            className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.2 }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          <motion.p
            className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          >
            Enquiry Received
          </motion.p>

          <motion.h1
            className="font-serif text-3xl md:text-4xl font-bold text-primary uppercase tracking-wide mb-5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          >
            Thank You!
          </motion.h1>

          <motion.p
            className="text-muted-foreground leading-relaxed mb-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            We've received your enquiry and our Kashmir travel expert will get back to you within <strong>a few hours</strong>.
          </motion.p>

          <motion.p
            className="text-muted-foreground text-sm mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          >
            Check your inbox (and spam folder) for a confirmation. In the meantime, feel free to browse our packages.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          >
            <Link
              href="/"
              className="bg-primary text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
            >
              Explore More Packages
            </Link>
            <a
              href={`https://wa.me/918899177826?text=${encodeURIComponent("Hi! I just submitted an enquiry on your website and would love to chat.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#1ebe5d] hover:bg-[#25D366] hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.775L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.29 19.38c-.397-.2-2.354-1.161-2.718-1.294-.365-.133-.63-.2-.896.2-.266.397-1.03 1.294-1.263 1.56-.232.265-.465.3-.862.1-.397-.2-1.676-.617-3.192-1.97-1.18-1.052-1.977-2.35-2.209-2.748-.233-.397-.025-.611.175-.808.18-.177.397-.465.596-.697.2-.232.265-.397.397-.662.133-.265.066-.497-.033-.697-.1-.2-.896-2.16-1.228-2.958-.323-.776-.65-.671-.896-.684-.232-.012-.497-.015-.763-.015-.265 0-.696.1-1.061.497-.365.397-1.394 1.362-1.394 3.32s1.427 3.851 1.626 4.116c.2.265 2.808 4.287 6.805 6.013.951.41 1.693.655 2.27.839.954.304 1.822.261 2.508.158.766-.114 2.354-.962 2.686-1.89.332-.928.332-1.724.232-1.89-.1-.165-.365-.265-.762-.464z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
