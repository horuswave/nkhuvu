"use client";

import { useTranslations } from "@/i18n";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
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
    <section className="py-20 px-6 bg-stone-50/40">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
        <blockquote className="text-xl md:text-2xl text-stone-700 leading-relaxed font-light">
          “{t("testimonial.quote")}”
        </blockquote>
        <div className="mt-8">
          <p className="font-medium text-stone-900">
            {t("testimonial.author")}
          </p>
          <p className="text-sm text-stone-400 mt-1">{t("testimonial.role")}</p>
        </div>
      </div>
    </section>
  );
}
