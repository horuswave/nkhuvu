"use client";

import { useTranslations } from "@/i18n";
import { useEffect, useRef } from "react";

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function FinalCTA() {
  const t = useTranslations("landing");
  const sessionIdRef = useRef<string>(
    `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  );
  const startTimeRef = useRef(Date.now());
  const hasTrackedRef = useRef(false);

  // Device & Browser Detection
  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    let mobileBrand = null;
    let deviceModel = null;
    let phoneSpec = null;

    if (isMobile) {
      if (/iPhone/i.test(ua)) mobileBrand = "Apple";
      else if (/Samsung/i.test(ua)) mobileBrand = "Samsung";
      else if (/Huawei/i.test(ua)) mobileBrand = "Huawei";
      else if (/Xiaomi/i.test(ua)) mobileBrand = "Xiaomi";

      phoneSpec = navigator.platform || "";
    }

    // Simple browser detection
    let browser = "Unknown";
    if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome"))
      browser = "Safari";
    else if (ua.includes("Edg")) browser = "Edge";

    const os = ua.includes("Windows")
      ? "Windows"
      : ua.includes("Mac")
        ? "macOS"
        : ua.includes("Linux")
          ? "Linux"
          : ua.includes("Android")
            ? "Android"
            : "iOS";

    return {
      deviceType: isMobile ? "mobile" : "desktop",
      isMobile,
      mobileBrand,
      deviceModel,
      phoneSpec,
      browser,
      browserVersion:
        ua.match(/Chrome\/(\d+)/)?.[1] ||
        ua.match(/Safari\/(\d+)/)?.[1] ||
        undefined,
      os,
      userAgent: ua.slice(0, 500),
    };
  };

  const sendLeadData = async (extraData: any = {}) => {
    if (hasTrackedRef.current) return;

    const deviceInfo = getDeviceInfo();
    const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000);

    try {
      await fetch("/api/landing-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          referrer: document.referrer,
          landingPageUrl: window.location.pathname,
          ...deviceInfo,
          timeOnPage,
          scrolledPercent: Math.round(
            ((window.scrollY + window.innerHeight) /
              document.body.scrollHeight) *
              100,
          ),
          ...extraData,
        }),
      });
      hasTrackedRef.current = true;
    } catch (e) {
      console.error("Failed to track landing lead", e);
    }
  };

  // Track on mount + CTA clicks
  useEffect(() => {
    sendLeadData();

    const handleBeforeUnload = () => {
      sendLeadData({
        timeOnPage: Math.floor((Date.now() - startTimeRef.current) / 1000),
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handlePrimaryClick = () => {
    sendLeadData({ action: "primary_cta_clicked" });
  };

  return (
    <section className="py-24 px-6 bg-stone-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
          {t("finalCTA.title")}
        </h2>
        <p className="text-stone-300 text-lg mb-10 max-w-2xl mx-auto">
          {t("finalCTA.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#solicitar-acesso"
            onClick={handlePrimaryClick}
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-medium px-10 py-4 rounded-full text-lg transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:-translate-y-0.5"
          >
            {t("finalCTA.buttonPrimary")} <ArrowRightIcon />
          </a>
          <a
            href="/convite"
            className="inline-flex items-center justify-center border border-white/30 text-white font-medium px-10 py-4 rounded-full text-lg hover:bg-white/10 transition-all"
          >
            {t("finalCTA.buttonSecondary")}
          </a>
        </div>
        <p className="text-stone-400 text-sm mt-8">{t("finalCTA.footnote")}</p>
      </div>
    </section>
  );
}
