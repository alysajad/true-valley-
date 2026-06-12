import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useEnquiryPopup } from "@/context/EnquiryPopupContext";

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
                    Failed to send. Please try again or call us directly at +91 88991 77826.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-secondary hover:bg-primary disabled:opacity-60 text-white font-bold uppercase tracking-widest py-4 rounded-sm text-sm transition-colors"
                >
                  {status === "sending" ? "Sending…" : "Send Booking Enquiry"}
                </button>

                <p className="text-center text-[11px] text-gray-400">
                  We'll get back to you within a few hours. Your details are kept private.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
