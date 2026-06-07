"use client";

import { useTranslations } from "@/i18n";
import { useRouter, usePathname } from "next/navigation";
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
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Navbar() {
  const t = useTranslations("landing");
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLocale = pathname.split("/")[1] || "pt";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const switchLocale = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("hero");
          }}
          className="flex items-center gap-2.5 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg"
          aria-label="Nkhuvu - Go to homepage"
        >
          <span className="text-3xl font-light tracking-tighter text-stone-900">
            Nkhuvu
          </span>
          <span className="hidden sm:inline text-xs font-medium tracking-widest text-amber-600 uppercase">
            {t("nav.tagline")}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-9 text-sm font-medium"
          aria-label="Main navigation"
        >
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("features");
            }}
            className="hover:text-stone-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 rounded px-2 py-1"
          >
            {t("nav.features")}
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("how-it-works");
            }}
            className="hover:text-stone-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 rounded px-2 py-1"
          >
            {t("nav.howItWorks")}
          </a>
          <a
            href="#solicitar-acesso"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("solicitar-acesso");
            }}
            className="hover:text-stone-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 rounded px-2 py-1"
          >
            {t("nav.contact")}
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div
            className="flex bg-stone-100 rounded-full p-1 text-xs font-medium"
            role="group"
            aria-label="Language selector"
          >
            {["en", "pt", "ch"].map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`px-4 py-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  currentLocale === locale
                    ? "bg-white shadow text-stone-900"
                    : "text-stone-500 hover:text-stone-700"
                }`}
                aria-pressed={currentLocale === locale}
                aria-label={`Switch to ${locale.toUpperCase()} language`}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#solicitar-acesso"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("solicitar-acesso");
            }}
            className="hidden sm:inline-flex bg-stone-900 hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900"
            aria-label="Request access to Nkhuvu"
          >
            {t("hero.ctaPrimary")}
            <ArrowRightIcon />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 text-stone-700 rounded-lg hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-stone-100 bg-white"
        >
          <nav
            className="px-6 py-8 flex flex-col gap-6 text-lg"
            aria-label="Mobile navigation"
          >
            {/* Mobile links with same structure as desktop */}
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("features");
              }}
              className="font-medium"
            >
              {t("nav.features")}
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("how-it-works");
              }}
              className="font-medium"
            >
              {t("nav.howItWorks")}
            </a>
            <a
              href="#solicitar-acesso"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("solicitar-acesso");
              }}
              className="font-medium"
            >
              {t("nav.contact")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
