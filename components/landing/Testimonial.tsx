"use client";

import { useTranslations } from "@/i18n";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-amber-400"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Testimonial() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 lg:py-32 px-6 bg-white overflow-hidden relative">
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-amber-50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
          <div className="flex gap-1.5 p-3 rounded-2xl bg-white shadow-sm border border-stone-100">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
        
        <blockquote className="text-2xl md:text-3xl lg:text-4xl text-stone-800 leading-snug font-medium tracking-tight mb-12">
          "{t("testimonial.quote")}"
        </blockquote>
        
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 mb-4 border-4 border-white shadow-md"></div>
          <p className="font-bold text-stone-900 tracking-tight text-lg">
            {t("testimonial.author")}
          </p>
          <p className="text-sm font-semibold uppercase tracking-widest text-stone-400 mt-1">
            {t("testimonial.role")}
          </p>
        </div>
      </div>
    </section>
  );
}
