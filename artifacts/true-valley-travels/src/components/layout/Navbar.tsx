import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

const HEADER_H = 64; // px — matches h-16 below

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tour List", href: "#packages" },
  { label: "Tour Search", href: "#packages" },
  { label: "Destinations", href: "#destinations" },
  { label: "About", href: "#our-story" },
  { label: "Contact", href: "#contact" },
];

/** Shared smooth-scroll handler used by both mobile and desktop links */
function scrollToHash(href: string) {
  if (!href.startsWith("#")) return;
  const target = document.querySelector(href);
  if (target) {
    const y = target.getBoundingClientRect().top + window.scrollY - HEADER_H;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop width
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsOpen(false);
      // Wait for the collapse animation (280 ms) before scrolling so the
      // layout has settled and the offset calculation is accurate.
      setTimeout(() => scrollToHash(href), 310);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Fixed header — stays pinned on top while page scrolls */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
        style={{ height: HEADER_H }}
      >
        {/* Full-bleed inner — no horizontal container padding on mobile */}
        <div className="h-full flex items-center justify-between px-4 md:px-6 lg:container lg:mx-auto">

          {/* Left nav links — desktop only */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.slice(0, 3).map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
          </nav>

          {/* Centered logo + brand name */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-2.5 cursor-pointer select-none"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/logo.jpeg"
                alt="True Valley Travels"
                className="h-[44px] w-auto object-contain shrink-0"
                style={{ mixBlendMode: "multiply" }}
              />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-base font-bold text-primary tracking-wide uppercase leading-none">
                  True Valley
                </span>
                <span className="font-serif text-base font-bold text-primary tracking-wide uppercase leading-none">
                  Travels
                </span>
                <span className="text-[8px] tracking-[0.28em] text-secondary font-bold uppercase mt-0.5">
                  Kashmir
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Right nav links + Book Now — desktop only */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.slice(3).map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToHash("#contact"); }}
              className="ml-4 bg-secondary text-white text-xs font-semibold uppercase tracking-wider px-5 py-3 hover:bg-primary transition-colors cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Now
            </motion.a>
          </nav>

          {/* Mobile hamburger toggle */}
          <button
            className="lg:hidden p-2 -mr-1 text-primary rounded focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((o) => !o)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile drop-down menu ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 overflow-hidden bg-white border-t border-border shadow-lg lg:hidden"
              style={{ maxHeight: "calc(100dvh - 64px)", overflowY: "auto" }}
            >
              <div className="px-4 py-3 flex flex-col gap-0">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleMobileNavClick(e, link.href)}
                    className="py-3 px-2 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-secondary border-b border-border/40 transition-colors last:border-b-0"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => handleMobileNavClick(e, "#contact")}
                  className="mt-3 mb-1 bg-secondary text-white text-center py-3.5 rounded font-semibold uppercase tracking-wider text-sm active:scale-95 transition-transform"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer — prevents content from hiding under the fixed header */}
      <div style={{ height: HEADER_H }} aria-hidden="true" />
    </>
  );
}

function NavLink({ link }: { link: { label: string; href: string } }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (link.href.startsWith("#")) {
      e.preventDefault();
      scrollToHash(link.href);
    }
  };
  return (
    <motion.a
      href={link.href}
      onClick={handleClick}
      className="relative px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground hover:text-secondary transition-colors group cursor-pointer"
    >
      {link.label}
      <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.a>
  );
}
