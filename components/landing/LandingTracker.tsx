"use client";

import { useEffect, useRef } from "react";

export default function LandingTracker() {
  const sessionIdRef = useRef(
    `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  );
  const startTimeRef = useRef(Date.now());
  const hasTrackedRef = useRef(false);

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    let mobileBrand: string | null = null;
    if (isMobile) {
      if (/iPhone/i.test(ua)) mobileBrand = "Apple";
      else if (/Samsung/i.test(ua)) mobileBrand = "Samsung";
      else if (/Huawei/i.test(ua)) mobileBrand = "Huawei";
      else if (/Xiaomi/i.test(ua)) mobileBrand = "Xiaomi";
    }

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
      browser,
      browserVersion:
        ua.match(/Chrome\/(\d+)/)?.[1] ||
        ua.match(/Safari\/(\d+)/)?.[1] ||
        undefined,
      os,
      userAgent: ua.slice(0, 500),
    };
  };

  const sendLeadData = async (extraData: Record<string, unknown> = {}) => {
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
        keepalive: true,
      });
    } catch {
      // silent — analytics should not block UX
    }
  };

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      sendLeadData();
    }

    const handleBeforeUnload = () => {
      sendLeadData({
        timeOnPage: Math.floor((Date.now() - startTimeRef.current) / 1000),
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendLeadData({
          timeOnPage: Math.floor((Date.now() - startTimeRef.current) / 1000),
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
