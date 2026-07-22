import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import FounderStory from "@/components/landing/FounderStory";
import Testimonial from "@/components/landing/Testimonial";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import LandingTracker from "@/components/landing/LandingTracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-canvas font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
      <LandingTracker />
      <Navbar />
      {/* Conversion funnel: Hero → proof → value → trust → convert */}
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <FounderStory />
      <Testimonial />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
