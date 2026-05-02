import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.mergeOptions({ icon: DefaultIcon });

const destinations = [
  {
    id: "dal-lake",
    name: "Dal Lake",
    image: "/images/dest-dal-lake.png",
    coords: [34.1100, 74.8722],
    distance: "0 km from Srinagar",
    desc: "The jewel of Srinagar, Dal Lake is a sprawling, mirror-like body of water reflecting the Pir Panjal mountains. Life here moves at the gentle pace of a shikara oar. Wake up early to witness the vibrant floating vegetable market, a tradition that has continued for centuries.",
    nearby: ["Shankaracharya Temple", "Hazratbal Shrine", "Nigeen Lake"],
  },
  {
    id: "gulmarg",
    name: "Gulmarg",
    image: "/images/dest-gulmarg.png",
    coords: [34.0484, 74.3805],
    distance: "56 km from Srinagar",
    desc: "The 'Meadow of Flowers' transforms into Asia's premier ski destination in winter. Take the legendary Gulmarg Gondola to Mt. Apharwat for sweeping views of the Himalayas. In summer, it offers world-class trekking and the highest green golf course globally.",
    nearby: ["Apharwat Peak", "Alather Lake", "Khilanmarg"],
  },
  {
    id: "pahalgam",
    name: "Pahalgam",
    image: "/images/dest-pahalgam.png",
    coords: [34.0150, 75.3150],
    distance: "95 km from Srinagar",
    desc: "Situated at the confluence of the streams flowing from Sheshnag Lake and the Lidder River. Pahalgam is a pristine valley of unspoiled beauty. It serves as the base camp for the Amarnath Yatra and offers some of the most scenic trout fishing and trekking routes.",
    nearby: ["Betaab Valley", "Aru Valley", "Baisaran"],
  },
  {
    id: "sonamarg",
    name: "Sonamarg",
    image: "/images/dest-sonamarg.png",
    coords: [34.3015, 75.2973],
    distance: "87 km from Srinagar",
    desc: "The 'Meadow of Gold' sits against a backdrop of snowy mountains and clear blue skies. The Sindh River meanders through the valley, abundant with trout. It's the gateway to Ladakh and the starting point for trekking to the Thajiwas Glacier.",
    nearby: ["Thajiwas Glacier", "Zoji La Pass", "Vishansar Lake"],
  },
  {
    id: "yusmarg",
    name: "Yusmarg",
    image: "/images/dest-yusmarg.png",
    coords: [33.8322, 74.6644],
    distance: "47 km from Srinagar",
    desc: "A quiet, lesser-known meadow surrounded by dense pine and fir forests. Yusmarg is perfect for those seeking absolute tranquility away from tourist crowds. The gentle slopes are ideal for picnicking and long, reflective walks.",
    nearby: ["Doodh Ganga", "Nilnag Lake", "Charari Sharief"],
  }
];

export default function Destinations() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const selectedDest = destinations[selectedIndex];

  return (
    <section id="destinations" className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-secondary font-medium tracking-widest uppercase text-sm block mb-4">
              Explore the Valley
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Iconic Destinations
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Discover the most breathtaking locations in Kashmir, each with its own unique charm and story.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => emblaApi?.scrollPrev()}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:text-white hover:border-secondary transition-colors"
            >
              ←
            </button>
            <button 
              onClick={() => emblaApi?.scrollNext()}
              className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary/90 transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing pb-8" ref={emblaRef}>
          <div className="flex -ml-4">
            {destinations.map((dest, index) => (
              <div 
                key={dest.id} 
                className="flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_40%] pl-4"
                onClick={() => emblaApi?.scrollTo(index)}
              >
                <div className={`relative h-[60vh] rounded-xl overflow-hidden bg-white shadow-md transition-all duration-500 border-b-4 ${selectedIndex === index ? 'opacity-100 scale-100 border-secondary' : 'opacity-70 scale-95 border-transparent'}`}>
                  <div className="h-[55%] relative">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 h-[45%] flex flex-col">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{dest.name}</h3>
                    <p className="text-secondary font-medium mb-4 text-sm uppercase tracking-wide">{dest.distance}</p>
                    <p className="text-muted-foreground line-clamp-3 text-sm">{dest.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedDest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white rounded-xl shadow-lg p-8 md:p-12 border border-border"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3 text-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span className="font-medium tracking-wide">{selectedDest.distance}</span>
              </div>
              <h4 className="text-3xl font-serif font-bold text-foreground">{selectedDest.name} Overview</h4>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {selectedDest.desc}
              </p>
              
              <div className="pt-6">
                <h5 className="font-bold text-foreground uppercase tracking-widest text-sm mb-4">Nearby Attractions</h5>
                <div className="flex flex-wrap gap-3">
                  {selectedDest.nearby.map(place => (
                    <span key={place} className="px-4 py-2 rounded-full border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      {place}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-64 lg:h-full rounded-xl overflow-hidden bg-muted relative z-0">
              <MapContainer 
                center={selectedDest.coords as [number, number]} 
                zoom={10} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={selectedDest.coords as [number, number]}>
                  <Popup>{selectedDest.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
