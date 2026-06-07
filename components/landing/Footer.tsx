"use client";

import { useTranslations } from "@/i18n";

export default function Footer() {
  const t = useTranslations("landing");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-2">
            <div className="text-white text-xl font-light tracking-wide mb-2">
              Nkhuvu
            </div>
            <div className="text-amber-500 text-xs tracking-wider mb-3">
              {t("footer.tagline")}
            </div>
            <p className="text-sm text-stone-500 max-w-md">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-medium mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#solicitar-acesso"
                  className="hover:text-white transition"
                >
                  {t("footer.access")}
                </a>
              </li>
              <li>
                <a href="/convite" className="hover:text-white transition">
                  {t("footer.demo")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:ola@nkhuvu.co.mz"
                  className="hover:text-white transition"
                >
                  {t("footer.support")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-medium mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>{t("footer.address")}</li>
              <li>ola@nkhuvu.co.mz</li>
              <li>{t("footer.founder")}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs text-stone-600">
          © {currentYear} Nkhuvu. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
