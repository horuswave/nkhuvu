"use client";

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const QuoteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-stone-200"
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2-1 0-3 0-3 2 0 2 2 2 3 2z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4-1 0-3 0-3 2 0 2 2 2 3 2z" />
  </svg>
);

export default function FounderStory() {
  return (
    <section className="py-24 lg:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full text-rose-600 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
              <HeartIcon /> Our Story
            </div>
            
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-8 leading-tight">
              Built with Love for Your Special Day
            </h2>
            
            <div className="space-y-6 text-lg text-stone-500 font-medium leading-relaxed">
              <p>I started Nkhuvu after planning my own wedding and realizing how difficult it was to manage guest lists and RSVPs.</p>
              <p>I wanted to create something beautiful that would make the entire process easier for couples like us.</p>
              <p>Every feature we build is designed with love and care to help you celebrate your perfect day.</p>
            </div>
            
            <div className="mt-10 pt-6 border-t border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center font-bold text-stone-600 tracking-tighter">
                AM
              </div>
              <div>
                <p className="text-stone-900 font-bold tracking-tight">
                  Ana Martins
                </p>
                <p className="text-xs font-semibold tracking-widest uppercase text-stone-400">Founder</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center shadow-[0_20px_50px_rgb(0,0,0,0.06)] border-8 border-white overflow-hidden relative group">
                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-500"></div>
                <span className="text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-stone-400 to-stone-500">
                  AM
                </span>
              </div>
              
              {/* Floating Quote Card */}
              <div className="absolute -bottom-8 -left-4 md:-left-12 bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-stone-100 p-6 max-w-[260px] transform hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -top-5 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100">
                  <QuoteIcon />
                </div>
                <p className="text-stone-700 text-sm font-medium leading-relaxed italic mt-2">
                  "Making wedding dreams come true, one invitation at a time."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
