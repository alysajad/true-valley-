import { useLocation } from "wouter";

const HEADER_H = 64; // matches the fixed header height

/** Smooth-scroll to an in-page anchor, offset for the fixed header. */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_H;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

/** Poll for a (possibly lazy-loaded) section, then scroll to it. */
function scrollWhenReady(hash: string, tries = 0) {
  if (document.querySelector(hash)) {
    scrollToHash(hash);
    return;
  }
  if (tries < 14) {
    setTimeout(() => scrollWhenReady(hash, tries + 1), 150);
  }
}

/**
 * Returns a click handler for hash links that works from any route:
 *  - on the home page, it smooth-scrolls to the section
 *  - on a sub-page (package detail / legal), it routes home first,
 *    then scrolls once the (lazy) section has mounted.
 */
export function useHashNav() {
  const [location, setLocation] = useLocation();
  return (href: string, onNavigate?: () => void) => {
    onNavigate?.();
    if (!href.startsWith("#")) return;
    if (location !== "/") {
      setLocation("/");
      scrollWhenReady(href);
    } else {
      scrollToHash(href);
    }
  };
}
