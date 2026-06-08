import React, { useEffect } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatButton from "@/components/ui/WhatsAppFloatButton";

/** Shared chrome for the static legal pages (Terms, Privacy). */
export default function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <WhatsAppFloatButton />
      <Navbar />

      <main className="flex-1">
        {/* Header band */}
        <section className="bg-primary text-white py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-1.5 text-[11px] text-white/60 uppercase tracking-widest mb-5">
              <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white/85">{title}</span>
            </nav>
            <p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3">{eyebrow}</p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide">{title}</h1>
            <div className="w-12 h-0.5 bg-secondary mt-5" />
            {updated && <p className="text-white/50 text-xs mt-4">Last updated: {updated}</p>}
          </div>
        </section>

        {/* Body */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto legal-prose">{children}</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* Small typographic helpers so both legal pages read consistently. */
export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="mb-9">
      <h2 className="font-serif text-xl font-bold text-primary uppercase tracking-wide mb-3">{heading}</h2>
      <div className="space-y-3 text-muted-foreground text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-muted-foreground text-[15px] leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 bg-secondary shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
