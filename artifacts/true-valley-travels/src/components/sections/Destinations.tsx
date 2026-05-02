import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSeason } from "@/context/SeasonContext";

let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.mergeOptions({ icon: DefaultIcon });

const destinations = [
  {
    id: "dal-lake",
    name: "Dal Lake",
    coords: [34.1100, 74.8722] as [number, number],
    distance: "0 km from Srinagar",
    desc: "The jewel of Srinagar — a sprawling, mirror-like body of water reflecting the Pir Panjal mountains. Life here moves at the gentle pace of a shikara oar. Wake up early to witness the vibrant floating vegetable market, a centuries-old tradition.",
    nearby: ["Shankaracharya Temple", "Hazratbal Shrine", "Nigeen Lake"],
    summerImg: "/destinations/dal_summer.jpg",
    winterImg: "/destinations/dal_winter.jpg",
    summerTag: "Shikara & Houseboats",
    winterTag: "Misty Winter Mornings",
  },
  {
    id: "gulmarg",
    name: "Gulmarg",
    coords: [34.0484, 74.3805] as [number, number],
    distance: "56 km from Srinagar",
    desc: "The Meadow of Flowers transforms into Asia's premier ski destination each winter. Ride the legendary Gulmarg Gondola to Mt. Apharwat for sweeping Himalayan views. In summer it offers world-class trekking and the world's highest green golf course.",
    nearby: ["Apharwat Peak", "Alather Lake", "Khilanmarg Meadow"],
    summerImg: "/destinations/gulmarg_summer.jpg",
    winterImg: "/destinations/gulmarg_winter.jpg",
    summerTag: "Meadows & Trekking",
    winterTag: "Skiing & Gondola",
  },
  {
    id: "pahalgam",
    name: "Pahalgam",
    coords: [34.0150, 75.3150] as [number, number],
    distance: "95 km from Srinagar",
    desc: "Situated at the confluence of mountain streams from Sheshnag Lake and the Lidder River, Pahalgam is a pristine valley of unspoiled beauty — the base for the Amarnath Yatra and home to the most scenic trout fishing routes in India.",
    nearby: ["Betaab Valley", "Aru Valley", "Baisaran"],
    summerImg: "/destinations/pahalgam_summer.jpg",
    winterImg: "/destinations/pahalgam_winter.jpg",
    summerTag: "River & Meadows",
    winterTag: "Snow-Covered Valleys",
  },
  {
    id: "sonamarg",
    name: "Sonamarg",
    coords: [34.3015, 75.2973] as [number, number],
    distance: "87 km from Srinagar",
    desc: "The Meadow of Gold sits against a backdrop of snowy mountains and clear blue skies. The Sindh River meanders through the valley, abundant with trout. It is the gateway to Ladakh and the starting point for the trek to Thajiwas Glacier.",
    nearby: ["Thajiwas Glacier", "Zoji La Pass", "Vishansar Lake"],
    summerImg: "/destinations/sonamarg_summer.jpg",
    winterImg: "/destinations/sonamarg_winter.jpg",
    summerTag: "Alpine Meadow",
    winterTag: "Frozen Wilderness",
  },
  {
    id: "yusmarg",
    name: "Yusmarg",
    coords: [33.8322, 74.6644] as [number, number],
    distance: "47 km from Srinagar",
    desc: "A quiet, lesser-known meadow surrounded by dense pine and fir forests — perfect for those seeking absolute tranquility away from tourist crowds. The gentle slopes are ideal for picnicking and long, reflective walks.",
    nearby: ["Doodh Ganga", "Nilnag Lake", "Charari Sharief"],
    summerImg: "/destinations/yusmarg_summer.jpg",
    winterImg: "/destinations/yusmarg_winter.jpg",
    summerTag: "Pine Forest Trails",
    winterTag: "Untouched Snow",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Destinations() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const { isSummer, season } = useSeason();
  const dirRef = useRef<number>(1);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  /* Auto-scroll ping-pong every 2.5 s */
  useEffect(() => {
    if (!emblaApi) return;
    autoRef.current = setInterval(() => {
      setSelectedIndex(prev => {
        const next = prev + dirRef.current;
        const clamped = Math.max(0, Math.min(next, destinations.length - 1));
        if (next >= destinations.length - 1) dirRef.current = -1;
        if (next <= 0) dirRef.current = 1;
        emblaApi.scrollTo(clamped);
        return clamped;
      });
    }, 2500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [emblaApi]);

  /* Pause auto-scroll while a card is clicked / user is interacting */
  const handleCardClick = (index: number) => {
    setClickedIndex(prev => (prev === index ? null : index));
    emblaApi?.scrollTo(index);
    setSelectedIndex(index);
  };

  const scrollPrev = useCallback(() => { emblaApi?.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback(() => { emblaApi?.scrollNext(); }, [emblaApi]);

  const clickedDest = clickedIndex !== null ? destinations[clickedIndex] : null;

  return (
    <section id="destinations" className="py-14 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="text-secondary font-semibold tracking-widest uppercase text-sm block mb-4"
            >
              {isSummer ? "Explore in Summer" : "Explore in Winter"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif font-bold text-foreground"
            >
              Iconic Destinations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground mt-4 text-base"
            >
              {isSummer
                ? "Discover Kashmir in bloom — lush meadows, garden terraces, and shimmering lakes."
                : "Kashmir under snow is a different world — silent forests, frozen falls, slopes of pure white."}
            </motion.p>
          </div>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center text-foreground hover:border-secondary hover:text-secondary transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </motion.button>
            <motion.button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary/90 transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing pb-6" ref={emblaRef}>
          <motion.div
            className="flex -ml-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {destinations.map((dest, index) => {
              const isActive = selectedIndex === index;
              const img = isSummer ? dest.summerImg : dest.winterImg;
              const tag = isSummer ? dest.summerTag : dest.winterTag;
              return (
                <motion.div
                  key={dest.id}
                  className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33%] pl-4"
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  onClick={() => handleCardClick(index)}
                >
                  <motion.div
                    className="relative rounded-xl overflow-hidden bg-white shadow-md border-b-4 transition-all duration-500 cursor-pointer"
                    style={{ borderColor: clickedIndex === index ? "hsl(var(--secondary))" : isActive ? "hsl(var(--secondary)/0.4)" : "transparent" }}
                    animate={{ opacity: isActive ? 1 : 0.62, scale: isActive ? 1 : 0.96 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: isActive ? 1.01 : 0.98, opacity: 0.85 }}
                  >
                    <div className="h-56 relative overflow-hidden">
                      <motion.img
                        src={img}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.5 }}
                        onError={(e) => { e.currentTarget.src = isSummer ? dest.summerImg : dest.winterImg; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-4 left-4 bg-secondary/90 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-serif font-bold text-foreground mb-1">{dest.name}</h3>
                      <p className="text-secondary font-semibold text-xs uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {dest.distance}
                      </p>
                      <p className="text-muted-foreground text-sm line-clamp-2">{dest.desc}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {destinations.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="rounded-full transition-all duration-300"
              animate={{
                width: selectedIndex === i ? 28 : 8,
                backgroundColor: selectedIndex === i ? "hsl(var(--secondary))" : "hsl(var(--border))",
                height: 8,
              }}
            />
          ))}
        </div>

        {/* Prompt when nothing is clicked yet */}
        <AnimatePresence>
          {clickedIndex === null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6 text-muted-foreground text-sm flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-secondary"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
              Click any destination card above to explore details &amp; map
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail panel — only shown when a card is clicked */}
        <AnimatePresence mode="wait">
          {clickedDest && (
          <motion.div
            key={`${clickedDest.id}-${season}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 bg-white rounded-2xl shadow-xl p-5 sm:p-8 md:p-10 border border-border"
          >
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="font-semibold text-sm">{clickedDest.distance}</span>
                </div>
                <button onClick={() => setClickedIndex(null)} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Close
                </button>
              </div>
              <h4 className="text-3xl font-serif font-bold text-foreground">{clickedDest.name}</h4>
              <p className="text-muted-foreground leading-relaxed">{clickedDest.desc}</p>
              <div className="pt-2">
                <h5 className="font-bold text-foreground text-xs uppercase tracking-widest mb-3">Nearby Attractions</h5>
                <div className="flex flex-wrap gap-2">
                  {clickedDest.nearby.map((place) => (
                    <motion.span
                      key={place}
                      className="px-4 py-1.5 rounded-full border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      whileHover={{ scale: 1.04 }}
                    >
                      {place}
                    </motion.span>
                  ))}
                </div>
              </div>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-md text-sm font-semibold mt-2"
                whileHover={{ scale: 1.03, x: 2 }}
                whileTap={{ scale: 0.97 }}
              >
                Plan a Trip Here
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </motion.a>
            </div>

            <div className="h-64 lg:h-auto rounded-xl overflow-hidden border border-border relative z-0 min-h-[220px]">
              <MapContainer
                center={clickedDest.coords}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={clickedDest.coords}>
                  <Popup>{clickedDest.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
