// app/page.tsx
"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import AccessRequest from "@/components/landing/AccessRequest";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import FounderStory from "@/components/landing/FounderStory";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonial from "@/components/landing/Testimonial";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <Hero />
      <AccessRequest />
      <Stats />
      <Features />
      <FounderStory />
      <HowItWorks />
      <Testimonial />
      <FinalCTA />
      <Footer />
    </main>
  );
}
