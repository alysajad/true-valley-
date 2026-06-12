import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useEnquiryPopup } from "@/context/EnquiryPopupContext";

const WA_NUMBER = "918899177826";

function buildWAURL(fields: {
  name: string; email: string; phone: string; date: string; pkg: string; message: string;
}) {
  const parts = [
    "Hello True Valley Travels!",
    "",
    fields.pkg ? `Package: ${fields.pkg}` : "I want to enquire about a Kashmir tour.",
    fields.date ? `Travel Date: ${fields.date}` : "",
    "",
    "My Details:",
    `Name: ${fields.name}`,
    fields.email ? `Email: ${fields.email}` : "",
    fields.phone ? `Phone: +91 ${fields.phone}` : "",
    fields.message ? `\nMessage: ${fields.message}` : "",
    "",
    "Sent via True Valley Travels website.",
  ];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(parts.filter(Boolean).join("\n"))}`;
}

async function sendEnquiry(fields: {
  name: string; email: string; phone: string; date: string; pkg: string; message: string;
}): Promise<void> {
  const res = await fetch("/api/send-enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error(`Send failed: ${res.status}`);
}

export default function ContactPopup() {
  const { isOpen, preFillPkg, closePopup } = useEnquiryPopup();
  const [, setLocation] = useLocation();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", pkg: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  // Pre-fill package whenever popup opens with a package
  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({ ...prev, pkg: preFillPkg }));
      setStatus("idle");
    }
  }, [isOpen, preFillPkg]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendEnquiry(form);
      closePopup();
      setLocation("/thank-you");
    } catch {
      setStatus("error");
    }
  };

  const handleWhatsApp = () => {
    window.open(buildWAURL(form), "_blank", "noopener,noreferrer");
    closePopup();
    setLocation("/thank-you");
  };

  const inputCls =
    "w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition bg-white";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          />

          {/* Sheet — bottom on mobile, centered modal on desktop */}
          <motion.div
            className={[
              "fixed z-[9999] bg-white shadow-2xl overflow-y-auto",
              // Mobile: full-width bottom sheet
              "bottom-0 left-0 right-0 rounded-t-2xl max-h-[92vh]",
              // Desktop: centered modal
              "md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
              "md:rounded-xl md:w-full md:max-w-md md:max-h-[90vh]",
            ].join(" ")}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-4 pb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  Where Do You Want To Go?
                </h2>
                {form.pkg && (
                  <p className="text-xs text-blue-600 mt-0.5 font-medium truncate max-w-[220px]">
                    {form.pkg}
                  </p>
                )}
              </div>
              <button
                onClick={closePopup}
                className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded ml-4 shrink-0 hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>

            <div className="px-5 pb-6">
              <form className="space-y-3.5" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label className={labelCls}>Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <input required type="text" placeholder="Enter Your Name" value={form.name} onChange={set("name")} className={`${inputCls} pl-9`} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls}>Email</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </span>
                    <input type="email" placeholder="Enter Your Email" value={form.email} onChange={set("email")} className={`${inputCls} pl-9`} />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label className={labelCls}>Mobile No <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 border border-gray-300 rounded px-2.5 py-2 bg-gray-50 shrink-0 text-sm">
                      <span>🇮🇳</span>
                      <span className="text-gray-600 text-xs">+91</span>
                    </div>
                    <input required type="tel" placeholder="10 digit mobile number" value={form.phone} onChange={set("phone")} maxLength={10} pattern="[0-9]{10}" className={`${inputCls} flex-1`} />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className={labelCls}>Date Of Travel</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </span>
                    <input type="date" value={form.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} className={`${inputCls} pl-9`} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={labelCls}>Message</label>
                  <textarea rows={3} placeholder="Write a description of your tour so we can design the best package for you!" value={form.message} onChange={set("message")} className={`${inputCls} resize-none`} />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-xs text-center">
                    Email send failed. Please try WhatsApp below or email us directly.
                  </p>
                )}

                {/* Primary CTA — email */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold uppercase tracking-widest py-3.5 rounded text-sm transition-colors"
                >
                  {status === "sending" ? "Sending…" : "Send Me Details"}
                </button>

                {/* Secondary CTA — WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#1ebe5d] hover:bg-[#25D366] hover:text-white font-bold uppercase tracking-widest py-3 rounded text-xs transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.775L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.773-1.853l-.485-.287-5.01 1.195 1.234-4.877-.318-.503A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.29-9.953c-.397-.2-2.354-1.161-2.718-1.294-.365-.133-.63-.2-.896.2-.266.397-1.03 1.294-1.263 1.56-.232.265-.465.3-.862.1-.397-.2-1.676-.617-3.192-1.97-1.18-1.052-1.977-2.35-2.209-2.748-.233-.397-.025-.611.175-.808.18-.177.397-.465.596-.697.2-.232.265-.397.397-.662.133-.265.066-.497-.033-.697-.1-.2-.896-2.16-1.228-2.958-.323-.776-.65-.671-.896-.684-.232-.012-.497-.015-.763-.015-.265 0-.696.1-1.061.497-.365.397-1.394 1.362-1.394 3.32s1.427 3.851 1.626 4.116c.2.265 2.808 4.287 6.805 6.013.951.41 1.693.655 2.27.839.954.304 1.822.261 2.508.158.766-.114 2.354-.962 2.686-1.89.332-.928.332-1.724.232-1.89-.1-.165-.365-.265-.762-.464z"/>
                  </svg>
                  Or Send via WhatsApp
                </button>

                <p className="text-center text-[11px] text-gray-400">
                  We assure the privacy of your contact data.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
