import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";
import { useBookingPreFill } from "@/context/BookingPreFillContext";

const PACKAGES = [
  { id: "budget-explorer",       label: "Budget Explorer",        nights: 4,  season: "both"   },
  { id: "classic-delight",       label: "Classic Delight",        nights: 9,  season: "both"   },
  { id: "royal-summer-paradise", label: "Royal Summer Paradise",  nights: 11, season: "summer" },
  { id: "adventure-seekers",     label: "Adventure Seekers",      nights: 7,  season: "both"   },
  { id: "winter-special",        label: "Winter Special",         nights: 5,  season: "winter" },
  { id: "custom",                label: "Custom Package Needed",  nights: 0,  season: "both"   },
];

function toInputDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

const inputClass =
  "w-full border border-border bg-muted/30 px-3 py-3 text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition rounded-sm";
const labelClass = "text-[10px] font-bold text-muted-foreground uppercase tracking-widest";

// Maps SearchBar pkg id + season to the Contact form's select option value
const PKG_TO_CONTACT: Record<string, { summer: string; winter: string }> = {
  "budget-explorer":        { summer: "Budget Explorer (₹6,999/pax)",        winter: "Budget Explorer Winter (₹6,999/pax)" },
  "classic-delight":        { summer: "Classic Delight (₹11,999/pax)",        winter: "Classic Delight Winter (₹11,999/pax)" },
  "royal-summer-paradise":  { summer: "Royal Summer Paradise (₹19,999/pax)",  winter: "Royal Summer Paradise (₹19,999/pax)" },
  "adventure-seekers":      { summer: "Adventure Seekers (₹24,999/pax)",      winter: "Adventure Seekers Winter (₹24,999/pax)" },
  "winter-special":         { summer: "Winter Special (₹17,999/pax)",          winter: "Winter Special (₹17,999/pax)" },
  "custom":                 { summer: "Custom / Not sure yet",                 winter: "Custom / Not sure yet" },
};

// Normalise travellers string to match Contact form options
function normalisetravelers(t: string) {
  if (t === "2 Adults, 0 Children") return "2 Adults";
  return t;
}

export default function SearchBar() {
  const { isSummer } = useSeason();
  const { setPreFill } = useBookingPreFill();
  const today = toInputDate(new Date());

  const [pkg, setPkg]           = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate]   = useState("");
  const [travelers, setTravelers] = useState("2 Adults, 0 Children");

  const selectedPkg = PACKAGES.find((p) => p.id === pkg);
  const isCustom    = pkg === "custom";
  const nights      = selectedPkg?.nights ?? 0;

  useEffect(() => {
    if (!isCustom && startDate && nights > 0) {
      setEndDate(toInputDate(addDays(new Date(startDate), nights)));
    }
  }, [startDate, pkg, nights, isCustom]);

  const minEnd = startDate
    ? toInputDate(addDays(new Date(startDate), isCustom ? 1 : nights))
    : today;

  const filteredPackages = PACKAGES.filter(
    (p) => p.season === "both" || p.season === (isSummer ? "summer" : "winter")
  );

  return (
    <section className="bg-white relative z-10 py-0">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="bg-white border border-border rounded-sm shadow-2xl px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-xl font-bold text-foreground uppercase tracking-widest mb-6 text-center">
            Book Your Tour
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* Package selector */}
            <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
              <label className={labelClass}>Select Package</label>
              <select
                value={pkg}
                onChange={(e) => { setPkg(e.target.value); setStartDate(""); setEndDate(""); }}
                className={inputClass}
              >
                <option value="">Choose a package…</option>
                {filteredPackages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}{p.nights > 0 ? ` (${p.nights + 1}D/${p.nights}N)` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Start date */}
            <div className="space-y-1.5">
              <label className={labelClass}>Start Date</label>
              <input
                type="date"
                value={startDate}
                min={today}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={!pkg}
                className={`${inputClass} ${!pkg ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>

            {/* End date */}
            <div className="space-y-1.5">
              <label className={labelClass}>
                End Date{!isCustom && nights > 0 ? <span className="ml-1 text-secondary normal-case font-normal">auto</span> : ""}
              </label>
              <input
                type="date"
                value={endDate}
                min={minEnd}
                onChange={(e) => setEndDate(e.target.value)}
                readOnly={!isCustom}
                disabled={!startDate || !pkg}
                className={`${inputClass} ${(!startDate || !pkg) ? "opacity-50 cursor-not-allowed" : ""} ${!isCustom ? "bg-muted/50 text-muted-foreground" : ""}`}
              />
              {!isCustom && nights > 0 && startDate && (
                <p className="text-[10px] text-muted-foreground">{nights + 1} days / {nights} nights</p>
              )}
            </div>

            {/* Travelers */}
            <div className="space-y-1.5">
              <label className={labelClass}>Travellers</label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className={inputClass}
              >
                <option>1 Adult</option>
                <option>2 Adults, 0 Children</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
                <option>Group (5+)</option>
              </select>
            </div>

            {/* Search button */}
            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <motion.button
                type="button"
                onClick={() => {
                  setPreFill({
                    pkg: pkg ? (PKG_TO_CONTACT[pkg]?.[isSummer ? "summer" : "winter"] ?? "") : "",
                    date: startDate,
                    travelers: normalisetravelers(travelers),
                  });
                  const el = document.getElementById("enquiry-form");
                  if (el) {
                    const offset = 80;
                    const top = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className="w-full bg-secondary hover:bg-primary text-white py-3 text-sm font-bold uppercase tracking-widest transition-colors rounded-sm text-center block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isCustom ? "Get Custom Quote" : "Book Now"}
              </motion.button>
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-2 self-center">Popular:</span>
            {(isSummer
              ? ["Dal Lake", "Mughal Gardens", "Pahalgam", "Sonamarg", "Gulmarg Golf"]
              : ["Gulmarg Skiing", "Gondola Ride", "Snow Trek", "Frozen Lake", "Apharwat"]
            ).map((tag) => (
              <motion.button
                key={tag}
                className="text-[11px] font-semibold border border-border hover:border-secondary hover:text-secondary px-3 py-1 rounded-full transition-colors text-muted-foreground"
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
