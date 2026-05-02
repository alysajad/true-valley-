import React from "react";
import { useSeason } from "@/context/SeasonContext";

const summerItems = [
  {
    label: "Shikara Rides",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    label: "Mughal Gardens",
    icon: "M12 22V12M12 12C12 12 7 9.5 7 5.5C7 3 9 2 12 2C15 2 17 3 17 5.5C17 9.5 12 12 12 12Z",
  },
  {
    label: "Houseboat Stay",
    icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  },
  {
    label: "Valley Trekking",
    icon: "M3 17l4-8 4 4 4-6 4 10",
  },
  {
    label: "Gondola Ride",
    icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
  },
  {
    label: "Pahalgam River Walk",
    icon: "M1.5 8.5c3.5-3.5 9.5-3.5 13 0M8.5 15.5c3.5-3.5 9.5-3.5 13 0M5 12c3-3 7.5-3.5 11 0M2 19h20",
  },
  {
    label: "Sonamarg Trek",
    icon: "M8 3l4 8 5-5 5 15H2L8 3z",
  },
  {
    label: "Wazwan Dining",
    icon: "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3",
  },
  {
    label: "Tulip Garden",
    icon: "M12 22V12M12 12C12 12 7 9.5 7 5.5C7 3 9 2 12 2C15 2 17 3 17 5.5C17 9.5 12 12 12 12Z",
  },
  {
    label: "Photography Tours",
    icon: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  },
];

const winterItems = [
  {
    label: "Gulmarg Skiing",
    icon: "M12 2L2 7l10 5 10-5-10-5z",
  },
  {
    label: "Gondola Phase II",
    icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
  },
  {
    label: "Snowboarding",
    icon: "M3 17l4-8 4 4 4-6 4 10",
  },
  {
    label: "Frozen Lake Walk",
    icon: "M1.5 8.5c3.5-3.5 9.5-3.5 13 0M8.5 15.5c3.5-3.5 9.5-3.5 13 0",
  },
  {
    label: "Snow Trekking",
    icon: "M8 3l4 8 5-5 5 15H2L8 3z",
  },
  {
    label: "Apharwat Peak",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    label: "Igloo Experience",
    icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  },
  {
    label: "Kashmiri Kehwa",
    icon: "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z",
  },
  {
    label: "Sledding",
    icon: "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5",
  },
  {
    label: "Winter Photography",
    icon: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  },
];

function TickerItem({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-0 flex-shrink-0 group cursor-default">
      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300 flex-shrink-0">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={icon} />
        </svg>
      </div>
      <span className="text-sm font-semibold text-foreground whitespace-nowrap group-hover:text-secondary transition-colors duration-300">
        {label}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-secondary/30 ml-3 flex-shrink-0" />
    </div>
  );
}

export default function ActivitiesTicker() {
  const { isSummer, season } = useSeason();
  const items = isSummer ? summerItems : winterItems;
  const doubled = [...items, ...items];

  return (
    <div className="bg-background border-y border-border py-5 overflow-hidden relative">
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        key={season}
        className="flex items-center"
        style={{
          animation: "ticker-scroll 35s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <TickerItem key={`${season}-${i}`} label={item.label} icon={item.icon} />
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
