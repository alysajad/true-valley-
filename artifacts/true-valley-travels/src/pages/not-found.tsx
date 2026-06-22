import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen min-w-0 w-full overflow-x-clip">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 min-w-0">
        <p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3">404</p>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wide mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md text-sm leading-relaxed">
          The page you're looking for doesn't exist or may have moved. Head back to explore our Kashmir packages.
        </p>
        <Link
          href="/"
          className="bg-primary text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
        >
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
