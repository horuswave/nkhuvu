"use client";

import { useTranslations } from "@/i18n";
import { SectionShell } from "@/components/ui/section-shell";

export default function Stats() {
  const t = useTranslations("landing");

  const stats = [
    { value: "98%", key: "responseRate" },
    { value: "+280", key: "eventsDone" },
    { value: "24h", key: "prioritySupport" },
    { value: "5★", key: "avgRating" },
  ];

  return (
    <SectionShell variant="canvas" className="!py-12 lg:!py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="card-interactive p-6 sm:p-8 text-center flex flex-col justify-center items-center"
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 mb-2">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-500">
              {t(`stats.${stat.key}`)}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
