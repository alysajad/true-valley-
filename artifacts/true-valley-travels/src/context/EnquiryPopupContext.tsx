import React, { createContext, useContext, useState } from "react";

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
