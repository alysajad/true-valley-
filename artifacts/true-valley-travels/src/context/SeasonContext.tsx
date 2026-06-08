import React, { createContext, useContext, useState, useEffect } from "react";

export type Season = "summer" | "winter";

interface SeasonContextType {
  season: Season;
  toggleSeason: () => void;
  isSummer: boolean;
  isWinter: boolean;
}

const SeasonContext = createContext<SeasonContextType | null>(null);

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState<Season>("summer");

  useEffect(() => {
    document.documentElement.setAttribute("data-season", season);
  }, [season]);

  const toggleSeason = () => {
    setSeason((prev) => (prev === "summer" ? "winter" : "summer"));
  };

  return (
    <SeasonContext.Provider
      value={{ season, toggleSeason, isSummer: season === "summer", isWinter: season === "winter" }}
    >
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error("useSeason must be used within SeasonProvider");
  return ctx;
}
