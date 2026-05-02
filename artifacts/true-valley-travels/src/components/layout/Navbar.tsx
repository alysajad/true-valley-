import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tour List", href: "#packages" },
  { label: "Tour Search", href: "#packages" },
  { label: "Destinations", href: "#destinations" },
  { label: "About", href: "#our-story" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white shadow-md"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-[72px]">

          {/* Left nav links */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.slice(0, 3).map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
          </nav>

          {/* Centered logo — real image */}
          <Link href="/">
            <motion.div
              className="flex flex-col items-center cursor-pointer select-none mx-6"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="/logo.jpeg"
                alt="True Valley Travels"
                className="h-[60px] w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              {/* Text fallback (hidden by default) */}
              <div className="hidden flex-col items-center">
                <span className="font-serif text-xl font-bold text-primary tracking-widest uppercase leading-none">
                  True Valley
                </span>
                <span className="text-[10px] tracking-[0.35em] text-secondary font-semibold uppercase mt-0.5">
                  Travels — Kashmir
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Right nav links */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.slice(3).map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
            <motion.a
              href="#contact"
              className="ml-4 bg-secondary text-white text-xs font-semibold uppercase tracking-wider px-5 py-3 hover:bg-primary transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Now
            </motion.a>
          </nav>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2 text-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="lg:hidden overflow-hidden bg-white border-t border-border"
          >
            <div className="container px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setIsOpen(false)}
                  className="py-2.5 px-3 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-secondary border-b border-border/50 transition-colors">
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="mt-3 bg-secondary text-white text-center py-3 font-semibold uppercase tracking-wider text-sm"
                onClick={() => setIsOpen(false)}>
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ link }: { link: { label: string; href: string } }) {
  return (
    <motion.a
      href={link.href}
      className="relative px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground hover:text-secondary transition-colors group"
    >
      {link.label}
      <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.a>
  );
}
