"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="transition-transform group-hover:translate-x-1"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Navbar() {
  const router = useRouter();
  const loginUrl = "/admin/login";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Handle scroll state for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/80 backdrop-blur-xl border-b border-stone-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("hero");
          }}
          className="flex items-center gap-2.5 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
          aria-label="Nkhuvu - Go to homepage"
        >
          <span className="text-2xl font-semibold tracking-tight text-stone-900 group-hover:opacity-80 transition-opacity">
            Nkhuvu
          </span>
          <span className="hidden sm:inline text-[10px] font-bold tracking-[0.2em] text-amber-600 uppercase px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100">
            Wedding Invitations
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          aria-label="Main navigation"
        >
          {["features", "howItWorks", "pricing"].map((item) => {
            const sectionId =
              item === "howItWorks"
                ? "how-it-works"
                : item === "pricing"
                  ? "pricing"
                  : item;
            const label =
              item === "features"
                ? "Features"
                : item === "howItWorks"
                  ? "How It Works"
                  : "Pricing";
            return (
              <a
                key={item}
                href={`#${sectionId}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(sectionId);
                }}
                className="text-stone-500 hover:text-stone-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-2 py-1"
              >
                {label}
              </a>
            );
          })}
          <Link
            href={loginUrl}
            className="text-stone-500 hover:text-stone-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-2 py-1"
          >
            Login
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* CTA Button */}
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("pricing");
            }}
            className="group hidden sm:inline-flex bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-[0_4px_14px_0_rgba(28,28,28,0.2)] hover:shadow-[0_6px_20px_rgba(28,28,28,0.23)] hover:-translate-y-0.5 items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-900"
            aria-label="Request access to Nkhuvu"
          >
            <span>Get Started</span>
            <ArrowRightIcon />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 rounded-full hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-stone-200/50 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 text-base font-medium">
            {["features", "howItWorks", "pricing"].map((item) => {
              const sectionId =
                item === "howItWorks"
                  ? "how-it-works"
                  : item === "pricing"
                    ? "pricing"
                    : item;
              const label =
                item === "features"
                  ? "Features"
                  : item === "howItWorks"
                    ? "How It Works"
                    : "Pricing";
              return (
              <a
                key={item}
                href={`#${sectionId}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(sectionId);
                }}
                className="text-stone-600 hover:text-amber-600 transition-colors"
              >
                {label}
              </a>
              );
            })}
            <Link
              href={loginUrl}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-stone-600 hover:text-amber-600 transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
