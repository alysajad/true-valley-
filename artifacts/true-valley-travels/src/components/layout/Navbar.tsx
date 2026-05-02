import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useSeason } from "@/context/SeasonContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { season, toggleSeason, isSummer } = useSeason();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Destinations", href: "#destinations" },
    { label: "Packages", href: "#packages" },
    { label: "Our Story", href: "#our-story" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-6">
        <Link href="/">
          <motion.span
            className={`text-xl font-serif font-bold tracking-wide cursor-pointer ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            True Valley Travels
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium relative group uppercase tracking-widest ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Season Toggle */}
          <motion.button
            onClick={toggleSeason}
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-500 ${
              isScrolled
                ? isSummer
                  ? "border-secondary text-secondary hover:bg-secondary hover:text-white"
                  : "border-secondary text-secondary hover:bg-secondary hover:text-white"
                : "border-white/60 text-white hover:bg-white/20"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            title={`Switch to ${isSummer ? "Winter" : "Summer"} mode`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={season}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.3 }}
                className="text-base"
              >
                {isSummer ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="20" y2="6"/><line x1="12" y1="2" x2="4" y2="6"/><line x1="12" y1="22" x2="20" y2="18"/><line x1="12" y1="22" x2="4" y2="18"/></svg>
                )}
              </motion.span>
            </AnimatePresence>
            <span>{isSummer ? "Summer" : "Winter"}</span>
          </motion.button>

          <motion.a
            href="#contact"
            className="bg-secondary text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-secondary/90 transition-colors"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Book Now
          </motion.a>
        </div>

        <button
          className={`md:hidden p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white overflow-hidden absolute top-full left-0 w-full shadow-xl"
          >
            <div className="flex flex-col px-4 py-6 gap-3">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground font-medium uppercase tracking-wider hover:text-secondary p-2 border-b border-border"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={toggleSeason}
                  className="flex-1 border border-secondary text-secondary px-4 py-3 rounded-md font-medium text-sm"
                >
                  {isSummer ? "Switch to Winter" : "Switch to Summer"}
                </button>
                <a
                  href="#contact"
                  className="flex-1 bg-secondary text-white px-4 py-3 rounded-md font-medium text-sm text-center"
                >
                  Book Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
