"use client";

import { useTranslations } from "@/i18n";

export default function Footer() {
  const t = useTranslations("landing");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-400 py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="md:col-span-2">
            <div className="text-white text-3xl font-semibold tracking-tighter mb-2 flex items-center justify-center md:justify-start gap-2">
              Nkhuvu
            </div>
            <div className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-5">
              {t("footer.tagline")}
            </div>
            <p className="text-sm font-medium text-stone-500 max-w-md mx-auto md:mx-0 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-6">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a
                  href="#pricing"
                  className="text-stone-400 hover:text-white transition-colors duration-200"
                >
                  {t("footer.access")}
                </a>
              </li>
              <li>
                <a href="/convite" className="text-stone-400 hover:text-white transition-colors duration-200">
                  {t("footer.demo")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:ola@nkhuvu.co.mz"
                  className="text-stone-400 hover:text-white transition-colors duration-200"
                >
                  {t("footer.support")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-6">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="text-stone-400">{t("footer.address")}</li>
              <li>
                <a href="mailto:ola@nkhuvu.co.mz" className="text-stone-400 hover:text-white transition-colors duration-200">
                  ola@nkhuvu.co.mz
                </a>
              </li>
              <li className="text-stone-400">{t("footer.founder")}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-medium text-stone-500">
            © {currentYear} Nkhuvu. {t("footer.copyright")}
          </div>
          <div className="flex gap-4 text-xs font-medium text-stone-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
