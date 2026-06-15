"use client";

import { useTranslations } from "@/i18n";

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
    className="transition-transform group-hover:translate-x-1"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckCircleIcon = () => (
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
    className="text-emerald-500"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function Hero() {
  const t = useTranslations("landing");

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#fafaf9] pt-28 pb-20 md:pt-36 md:pb-32"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[400px] h-[400px] bg-amber-300 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[10%] right-[20%] w-[350px] h-[350px] bg-rose-200 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-[20%] left-[40%] w-[450px] h-[450px] bg-orange-100 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Content */}
          <div className="flex-1 max-w-2xl lg:max-w-[540px] xl:max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-stone-200/50 px-4 py-1.5 rounded-full text-stone-700 text-xs font-semibold tracking-wide mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {t("hero.badge")}
            </div>
            
            <h1 className="text-display-xl text-stone-900 mb-6">
              {t("hero.title1")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 mt-1 pb-2">
                {t("hero.titleHighlight")}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-stone-500 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0 font-medium">
              {t("hero.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="#pricing" className="group btn-primary w-full sm:w-auto !px-8 !py-4 !text-base">
                {t("hero.ctaPrimary")} <ArrowRightIcon />
              </a>
              <a href="/convite" className="btn-secondary w-full sm:w-auto !px-8 !py-4 !text-base">
                {t("hero.ctaSecondary")}
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-12 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 border-2 border-white flex items-center justify-center text-stone-500 text-xs font-bold shadow-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-stone-500">
                <span className="text-stone-900 font-bold">
                  +250 {t("hero.familiesWord")}
                </span>{" "}
                {t("hero.familiesText")}
              </div>
            </div>
          </div>

          {/* Right Content - 3D Floating Card */}
          <div className="flex-1 w-full max-w-lg perspective-[2000px]">
            <div className="relative w-full transition-transform duration-700 ease-out hover:rotate-y-[-5deg] hover:rotate-x-[5deg] group">
              {/* Decorative back card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-rose-50 rounded-[2rem] transform rotate-3 scale-[0.98] opacity-70 blur-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-100"></div>
              
              <div className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white overflow-hidden flex flex-col">
                {/* Header pattern */}
                <div className="h-32 bg-stone-900 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  <div className="relative z-10 text-center text-white space-y-1">
                    <div className="text-[10px] tracking-[0.3em] font-semibold text-amber-400 uppercase">
                      {t("hero.invite.joy")}
                    </div>
                    <div className="text-3xl font-serif italic opacity-90">
                      Helena & Alberto
                    </div>
                  </div>
                </div>
                
                <div className="p-8 pb-10 space-y-6">
                  <div className="text-center space-y-1">
                    <div className="text-stone-500 font-medium text-sm">
                      {t("hero.invite.date")}
                    </div>
                    <div className="text-stone-400 text-xs">
                      {t("hero.invite.venue")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-y border-stone-100">
                    <span className="text-stone-500 font-medium text-sm">
                      {t("hero.invite.status")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold">
                      <CheckCircleIcon /> {t("hero.invite.open")}
                    </span>
                  </div>
                  
                  <div className="bg-[#fafaf9] border border-stone-100 rounded-2xl p-5 text-center shadow-inner">
                    <p className="text-stone-600 text-sm leading-relaxed font-medium">
                      {t("hero.invite.message")}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <div className="flex-1 bg-amber-600 text-white text-center py-3 rounded-xl text-sm font-semibold shadow-[0_4px_14px_0_rgba(217,119,6,0.39)] cursor-pointer">
                      {t("hero.invite.confirmBtn")}
                    </div>
                    <div className="flex-1 bg-white border-2 border-stone-100 text-stone-600 text-center py-3 rounded-xl text-sm font-semibold cursor-pointer">
                      {t("hero.invite.detailsBtn")}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating notification badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-stone-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900">RSVP Confirmed</div>
                  <div className="text-xs text-stone-500 font-medium">Just now</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
