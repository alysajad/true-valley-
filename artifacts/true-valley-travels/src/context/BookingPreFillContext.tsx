import React, { createContext, useContext, useState } from "react";

interface BookingPreFill {
  pkg: string;       // Contact form option value
  date: string;      // YYYY-MM-DD
  travelers: string; // Contact form option value
}

interface BookingPreFillContextValue {
  preFill: BookingPreFill | null;
  setPreFill: (data: BookingPreFill) => void;
}

const BookingPreFillContext = createContext<BookingPreFillContextValue>({
  preFill: null,
  setPreFill: () => {},
});

export function BookingPreFillProvider({ children }: { children: React.ReactNode }) {
  const [preFill, setPreFill] = useState<BookingPreFill | null>(null);
  return (
    <BookingPreFillContext.Provider value={{ preFill, setPreFill }}>
      {children}
    </BookingPreFillContext.Provider>
  );
}

export function useBookingPreFill() {
  return useContext(BookingPreFillContext);
}
