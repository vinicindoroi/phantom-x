import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { SystemPreview } from "@/components/landing/SystemPreview";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-brand-black flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SystemPreview />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
