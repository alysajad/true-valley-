import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const WA_NUMBER = "918899177826";
const WA_MESSAGE = "Hi! I'd like to enquire about a Kashmir tour.";

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.775L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.773-1.853l-.485-.287-5.01 1.195 1.234-4.877-.318-.503A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.29-9.953c-.397-.2-2.354-1.161-2.718-1.294-.365-.133-.63-.2-.896.2-.266.397-1.03 1.294-1.263 1.56-.232.265-.465.3-.862.1-.397-.2-1.676-.617-3.192-1.97-1.18-1.052-1.977-2.35-2.209-2.748-.233-.397-.025-.611.175-.808.18-.177.397-.465.596-.697.2-.232.265-.397.397-.662.133-.265.066-.497-.033-.697-.1-.2-.896-2.16-1.228-2.958-.323-.776-.65-.671-.896-.684-.232-.012-.497-.015-.763-.015-.265 0-.696.1-1.061.497-.365.397-1.394 1.362-1.394 3.32s1.427 3.851 1.626 4.116c.2.265 2.808 4.287 6.805 6.013.951.41 1.693.655 2.27.839.954.304 1.822.261 2.508.158.766-.114 2.354-.962 2.686-1.89.332-.928.332-1.724.232-1.89-.1-.165-.365-.265-.762-.464z" />
    </svg>
  );
}

export default function WhatsAppFloatButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Delay entrance so it doesn't compete with page load animations
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-5 z-40 flex items-center justify-end gap-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          {/* Hover label — desktop only */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="hidden md:flex items-center gap-2 bg-white border border-border shadow-lg px-4 py-2 rounded-sm pointer-events-none"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground whitespace-nowrap">
                  Chat with us
                </span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  · Typically replies in hours
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB button */}
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with True Valley Travels on WhatsApp"
            className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl cursor-pointer select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.1, boxShadow: "0 8px 32px rgba(37,211,102,0.45)" }}
            whileTap={{ scale: 0.93 }}
          >
            {/* Pulse ring — draws attention without being intrusive */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", repeatDelay: 0.5 }}
            />
            <WhatsAppIcon size={26} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
