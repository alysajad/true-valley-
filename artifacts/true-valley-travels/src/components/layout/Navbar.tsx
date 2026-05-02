import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-primary/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-white tracking-wide">
          True Valley
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {["Destinations", "Packages", "Our Story", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium text-white/90 hover:text-secondary transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </nav>

        <button className="md:hidden text-white p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
