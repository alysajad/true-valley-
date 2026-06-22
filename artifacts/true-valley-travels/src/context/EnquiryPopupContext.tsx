import React, { createContext, useContext, useState, useEffect } from "react";

interface EnquiryPopupContextValue {
  isOpen: boolean;
  preFillPkg: string;
  openPopup: (pkg?: string) => void;
  closePopup: () => void;
}

const EnquiryPopupContext = createContext<EnquiryPopupContextValue>({
  isOpen: false,
  preFillPkg: "",
  openPopup: () => {},
  closePopup: () => {},
});

export function EnquiryPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preFillPkg, setPreFillPkg] = useState("");

  useEffect(() => {
    // Auto-open every time the homepage is loaded/refreshed
    if (window.location.pathname === "/" || window.location.pathname === import.meta.env.BASE_URL) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const openPopup = (pkg = "") => {
    setPreFillPkg(pkg);
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  return (
    <EnquiryPopupContext.Provider value={{ isOpen, preFillPkg, openPopup, closePopup }}>
      {children}
    </EnquiryPopupContext.Provider>
  );
}

export function useEnquiryPopup() {
  return useContext(EnquiryPopupContext);
}
