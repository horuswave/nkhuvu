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
import ContactForm from "@/components/landing/ContactForm";

import en from "@/messages/en.json";
import pt from "@/messages/pt.json";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = locale === "pt" ? pt : en;

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
      <ContactForm locale={locale} text={messages.landing.contact} />{" "}
      <FinalCTA />
      <Footer />
    </main>
  );
}