"use client";

import { useTranslations } from "@/i18n";

export default function Stats() {
  const t = useTranslations("landing");

  const stats = [
    { value: "98%", key: "responseRate" },
    { value: "+280", key: "eventsDone" },
    { value: "24h", key: "prioritySupport" },
    { value: "5★", key: "avgRating" },
  ];

  return (
    <div className="border-y border-stone-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl font-light text-stone-800">
                {stat.value}
              </div>
              <div className="text-sm text-stone-500 mt-1">
                {t(`stats.${stat.key}`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
