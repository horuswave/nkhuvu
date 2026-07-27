"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Volume2, VolumeX } from "lucide-react";
import type { EventData } from "@/types";

/* =====================================================================
   SHARED TYPES
   ===================================================================== */
interface ThemeProps {
  event: EventData & {
    themeConfig?: any;
    heroImageUrl?: string | null;
    backgroundImage?: string | null;
    couplePhotos?: any[] | null;
    programItems?: ProgramItem[];
    giftList?: GiftItem[];
    primaryColor?: string;
    fontDisplay?: string;
    detailsSectionTitle?: string | null;
    detailsContactText?: string | null;
    programSubtitle?: string | null;
    giftListIntro?: string | null;
  };
  guestName: string;
  token: string;
  maxAllowed: number;
  existingRsvp: any;
  existingCompanions: any;
}

export interface GiftItem {
  id: string;
  type: "ITEM" | "MONETARY";
  name: string;
  note?: string;
  store?: string;
  storeUrl?: string;
  suggestedAmount?: number;
  currency?: string;
  bankName?: string;
  bankIban?: string;
  bankAccountHolder?: string;
  bankReference?: string;
  mobileWalletProvider?: string;
  mobileWalletNumber?: string;
  mobileWalletHolderName?: string;
}

export type ProgramItemType =
  | "COCKTAIL"
  | "CEREMONY"
  | "RECEPTION"
  | "DINNER"
  | "SPEECHES"
  | "FIRST_DANCE"
  | "CAKE"
  | "MUSIC"
  | "PHOTO"
  | "FIREWORKS"
  | "BLESSING"
  | "BRUNCH"
  | "GAMES"
  | "TRANSPORT"
  | "CUSTOM";

export interface ProgramItem {
  id: string;
  type: ProgramItemType;
  label: string;
  time: string;
  notes?: string;
  locationLabel?: string;
  locationUrl?: string;
}

/* =====================================================================
   ORNAMENTS & ICONS
   ===================================================================== */
function FloralDivider({ color = "#6B5344" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center my-6">
      <svg
        width="220"
        height="30"
        viewBox="0 0 220 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M110 15C86 15 72 3 48 3C24 3 12 15 0 15"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M110 15C134 15 148 3 172 3C196 3 208 15 220 15"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M110 15C86 15 72 27 48 27C24 27 12 15 0 15"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M110 15C134 15 148 27 172 27C196 27 208 15 220 15"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="110" cy="15" r="5" fill={color} />
        <circle cx="48" cy="15" r="2.8" fill={color} />
        <circle cx="172" cy="15" r="2.8" fill={color} />
      </svg>
    </div>
  );
}

function CornerFlourish({
  color = "#6B5344",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={`w-10 h-10 absolute pointer-events-none ${className}`}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M2 38V12C2 6.47715 6.47715 2 12 2H38"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 38V16C6 10.4772 10.4772 6 16 6H38"
        stroke={color}
        strokeWidth="0.9"
        strokeDasharray="2.5 2"
      />
      <circle cx="12" cy="12" r="3.5" fill={color} />
    </svg>
  );
}

function PinIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      className="w-3.5 h-3.5 flex-shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const PROGRAM_ICONS: Record<ProgramItemType, React.ReactNode> = {
  COCKTAIL: <span className="text-lg">🍸</span>,
  CEREMONY: <span className="text-lg">👑</span>,
  RECEPTION: <span className="text-lg">🏛️</span>,
  DINNER: <span className="text-lg">🍽️</span>,
  SPEECHES: <span className="text-lg">📜</span>,
  FIRST_DANCE: <span className="text-lg">💃</span>,
  CAKE: <span className="text-lg">🎂</span>,
  MUSIC: <span className="text-lg">🎻</span>,
  PHOTO: <span className="text-lg">🖼️</span>,
  FIREWORKS: <span className="text-lg">✨</span>,
  BLESSING: <span className="text-lg">🕊️</span>,
  BRUNCH: <span className="text-lg">🫖</span>,
  GAMES: <span className="text-lg">♟️</span>,
  TRANSPORT: <span className="text-lg">🎠</span>,
  CUSTOM: <span className="text-lg">⚜️</span>,
};

/* =====================================================================
   POLAROID PHOTO (desktop absolute decoration)
   ===================================================================== */
function PolaroidPhoto({
  imageUrl,
  rotation,
  top,
  left,
  right,
  bottom,
  size = "medium",
}: {
  imageUrl: string;
  rotation: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: "small" | "medium" | "large";
}) {
  const sizeClasses = {
    small: "w-32 h-40",
    medium: "w-48 h-56",
    large: "w-64 h-72",
  };

  return (
    <div
      className={`absolute ${sizeClasses[size]} bg-white p-3 shadow-2xl pointer-events-none z-20 transition-transform duration-300`}
      style={{
        transform: `rotate(${rotation}deg)`,
        top,
        left,
        right,
        bottom,
      }}
    >
      <div className="w-full h-full bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt="Couple photo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

/* =====================================================================
   INLINE POLAROID (mobile timeline — in flow)
   ===================================================================== */
function InlinePolaroid({
  imageUrl,
  rotation = -3,
  align = "left",
}: {
  imageUrl: string;
  rotation?: number;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`relative flex ${
        align === "right" ? "justify-end pr-2" : "justify-start pl-2"
      }`}
    >
      <div
        className="w-40 h-48 bg-white p-2.5 shadow-xl"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="w-full h-full bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt="Couple photo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   BACKGROUND MUSIC
   Put the file at: public/music/all-my-life.mp3
   ===================================================================== */
function BackgroundMusic({ enabled }: { enabled: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!enabled || !audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.45;

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    tryPlay();
  }, [enabled]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const next = !muted;
    audioRef.current.muted = next;
    setMuted(next);

    if (!next && !playing) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  if (!enabled) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/all-my-life.mp3"
        loop
        preload="auto"
        playsInline
      />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Ativar música" : "Silenciar música"}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#6B5344]/40 bg-[#F8F1E3]/95 text-[#6B5344] shadow-lg backdrop-blur-sm transition hover:bg-[#6B5344] hover:text-white"
      >
        {muted || !playing ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>
    </>
  );
}

/* =====================================================================
   HERO
   ===================================================================== */
function BridgertonHero({
  event,
  guestName,
}: {
  event: ThemeProps["event"];
  guestName?: string;
}) {
  const bgImg =
    event.heroImageUrl ||
    event.backgroundImage ||
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000";

  const goldColor = event.primaryColor || "#6B5344";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&display=swap');

        .hero-scrim {
          background:
            linear-gradient(
              to top,
              rgba(10, 8, 7, 0.92) 0%,
              rgba(10, 8, 7, 0.78) 18%,
              rgba(10, 8, 7, 0.45) 40%,
              rgba(10, 8, 7, 0.08) 72%,
              rgba(10, 8, 7, 0.00) 100%
            );
        }

        .hero-copy {
          text-shadow:
            0 2px 10px rgba(0,0,0,0.5),
            0 1px 1px rgba(0,0,0,0.3);
        }

        .guest-pill {
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          background: rgba(248, 241, 227, 0.78);
          box-shadow:
            0 10px 30px rgba(0,0,0,0.12),
            inset 0 0 0 1px rgba(107, 83, 68, 0.18);
        }
      `}</style>

      <section
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url('${bgImg}')` }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 hero-scrim" />

        <div className="relative z-10 min-h-screen flex items-end justify-center px-6 md:px-14 pb-48 md:pb-8">
          <div className="w-full max-w-5xl text-center hero-copy -translate-y-4 md:-translate-y-6">
            <p
              className="text-[10px] md:text-[11px] uppercase tracking-[0.45em] text-[#F6EBDD]/85 font-semibold mb-4"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Caríssimo Leitor, é Cordialmente Convidado Para
            </p>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-normal text-[#FFF7EF] tracking-wide leading-[1.05] drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
              style={{ fontFamily: event.fontDisplay || "'Cinzel', serif" }}
            >
              {event.title}
            </h1>

            <div className="mt-4">
              <FloralDivider color={goldColor} />
            </div>

            <p
              className="text-3xl md:text-5xl text-[#F4DCC7] mt-3 italic leading-none"
              style={{ fontFamily: "'Alex Brush', cursive" }}
            >
              {event.coupleNames}
            </p>

            {guestName && (
              <div className="mt-6 inline-block px-5 py-2.5 rounded-full guest-pill border border-[#6B5344]/20">
                <span
                  className="text-[10px] md:text-[11px] text-[#1A1410] tracking-[0.2em] uppercase font-semibold"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Convidado Ilustre:{" "}
                  <strong className="text-[#6B5344]">{guestName}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* =====================================================================
   EVENT DETAILS
   ===================================================================== */
function EventDetails({ event }: { event: ThemeProps["event"] }) {
  const rules = event.rules?.split("\n").filter(Boolean) ?? [];
  const goldColor = event.primaryColor || "#6B5344";

  const formattedDate = event.date
    ? new Intl.DateTimeFormat("pt-PT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(event.date))
    : "";

  return (
    <section className="bg-[#F8F1E3] py-24 px-6 border-y-2 border-[#6B5344]/30">
      <div className="max-w-3xl mx-auto text-center">
        <span
          className="text-[11px] uppercase tracking-[0.35em] text-[#6B5344] font-semibold"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Informações Relevantes
        </span>
        <h2
          className="text-3xl md:text-4xl text-[#1A1410] mt-3 mb-2"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {event.detailsSectionTitle || "Detalhes do Evento"}
        </h2>
        <FloralDivider color={goldColor} />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl border-2 border-[#6B5344]/25 shadow-sm">
            <div className="text-[#6B5344] text-2xl mb-2">📅</div>
            <p
              className="text-[#1A1410] text-lg font-semibold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Data
            </p>
            <p
              className="text-[#3D2E24] text-base mt-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {formattedDate}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border-2 border-[#6B5344]/25 shadow-sm">
            <div className="text-[#6B5344] text-2xl mb-2">🕐</div>
            <p
              className="text-[#1A1410] text-lg font-semibold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Hora
            </p>
            <p
              className="text-[#3D2E24] text-base mt-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {event.time}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border-2 border-[#6B5344]/25 shadow-sm">
            <div className="text-[#6B5344] text-2xl mb-2">📍</div>
            <p
              className="text-[#1A1410] text-lg font-semibold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Local
            </p>
            <p
              className="text-[#3D2E24] text-base mt-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {event.venue}
            </p>
          </div>
        </div>

        {event.address && (
          <div className="mt-8 bg-white p-6 rounded-2xl border-2 border-[#6B5344]/25 shadow-sm">
            <p
              className="text-[#1A1410] text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {event.address}
            </p>
            {event.mapUrl && (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[#6B5344] text-sm font-semibold hover:underline"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <PinIcon color="#6B5344" />
                Ver no Mapa
              </a>
            )}
          </div>
        )}

        {event.dressCode && (
          <div className="mt-6 bg-white p-6 rounded-2xl border-2 border-[#6B5344]/25 shadow-sm">
            <p
              className="text-[#1A1410] text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="font-semibold">Código de Vestimenta:</span>{" "}
              {event.dressCode}
            </p>
          </div>
        )}

        {event.message && (
          <div className="mt-8 bg-[#6B5344] p-8 rounded-2xl shadow-md">
            <div
              className="text-white text-base md:text-lg leading-relaxed italic space-y-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {event.message
                .split(/\n+/)
                .map((line) => line.trim())
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
            </div>
          </div>
        )}

        {rules.length > 0 && (
          <div className="mt-12 bg-white p-9 md:p-12 rounded-2xl border-2 border-[#6B5344]/25 shadow-md">
            <h3
              className="text-xl text-[#1A1410] mb-6 text-center"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Regras do Evento
            </h3>
            <ul className="space-y-5 text-left">
              {rules.map((rule, i) => (
                <li
                  key={i}
                  className="text-[#1A1410] text-base md:text-lg flex items-start gap-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <span className="text-[#6B5344] text-xl leading-none mt-0.5 shrink-0">
                    ⚜
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(event.supportEmail || event.supportPhone) && (
          <div className="mt-14 p-8 bg-white rounded-2xl border-2 border-[#6B5344]/20 shadow-sm">
            <p
              className="text-[#1A1410] text-base md:text-lg mb-6 leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {event.detailsContactText ||
                "Para qualquer esclarecimento adicional, por favor contacte os nossos correspondentes:"}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {event.supportEmail && (
                <a
                  href={`mailto:${event.supportEmail}`}
                  className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#6B5344] bg-[#F8F1E3] px-6 py-3 text-[11px] uppercase tracking-widest text-[#1A1410] font-semibold hover:bg-[#6B5344] hover:text-white transition-colors"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  {event.supportEmail}
                </a>
              )}
              {event.supportPhone && (
                <a
                  href={`tel:${event.supportPhone}`}
                  className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#6B5344] bg-[#F8F1E3] px-6 py-3 text-[11px] uppercase tracking-widest text-[#1A1410] font-semibold hover:bg-[#6B5344] hover:text-white transition-colors"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  {event.supportPhone}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* =====================================================================
   PROGRAM
   Desktop: classic timeline
   Mobile: card → polaroid → card → polaroid …
   ===================================================================== */
function ProgramSection({
  event,
  couplePhotos = [],
}: {
  event: ThemeProps["event"];
  couplePhotos?: string[];
}) {
  const items: ProgramItem[] = event.programItems ?? [];
  if (items.length === 0) return null;

  const goldColor = event.primaryColor || "#6B5344";
  const rotations = [-4, 5, -6, 3, -5, 7];

  return (
    <section className="bg-[#F8F1E3] py-24 px-6 border-b-2 border-[#6B5344]/25">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.35em] text-[#6B5344] font-semibold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Ordem dos Acontecimentos
          </span>
          <h2
            className="text-3xl md:text-4xl text-[#1A1410] mt-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {event.programSubtitle || "O Nosso Dia"}
          </h2>
          <FloralDivider color={goldColor} />
        </div>

        {/* ── Desktop timeline ── */}
        <div className="relative hidden md:block border-l-[3px] border-[#6B5344]/50 ml-24 space-y-12">
          {items.map((item) => (
            <div key={item.id} className="relative pl-12">
              <div className="absolute -left-[19px] top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white border-[3px] border-[#6B5344] text-[#6B5344] shadow-md z-10">
                {PROGRAM_ICONS[item.type] ?? PROGRAM_ICONS.CUSTOM}
              </div>

              <div className="bg-white p-7 rounded-2xl border-2 border-[#6B5344]/20 shadow-md relative z-10">
                <span
                  className="inline-block px-3.5 py-1.5 bg-[#1A1410] text-white text-[11px] font-semibold rounded tracking-widest mb-3"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {item.time}
                </span>
                <h3
                  className="text-xl md:text-2xl text-[#1A1410] font-medium"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {item.label}
                </h3>
                {item.notes && (
                  <p
                    className="text-[#3D2E24] text-base mt-2.5 leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.notes}
                  </p>
                )}
                {item.locationUrl && (
                  <a
                    href={item.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-[11px] tracking-wider uppercase text-[#6B5344] font-semibold hover:underline"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    <PinIcon color="#6B5344" />
                    {item.locationLabel?.trim() || "Ver Localização"}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile: alternate card / polaroid ── */}
        <div className="md:hidden relative border-l-[3px] border-[#6B5344]/50 ml-4 space-y-10">
          {items.map((item, index) => {
            const photo =
              couplePhotos[index % Math.max(couplePhotos.length, 1)];
            const showPolaroid =
              couplePhotos.length > 0 && index < couplePhotos.length * 2;

            return (
              <div key={item.id} className="space-y-10">
                {/* Program card */}
                <div className="relative pl-10">
                  <div className="absolute -left-[19px] top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white border-[3px] border-[#6B5344] text-[#6B5344] shadow-md z-10">
                    {PROGRAM_ICONS[item.type] ?? PROGRAM_ICONS.CUSTOM}
                  </div>

                  <div className="bg-white p-6 rounded-2xl border-2 border-[#6B5344]/20 shadow-md relative z-10">
                    <span
                      className="inline-block px-3 py-1.5 bg-[#1A1410] text-white text-[11px] font-semibold rounded tracking-widest mb-3"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {item.time}
                    </span>
                    <h3
                      className="text-xl text-[#1A1410] font-medium"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {item.label}
                    </h3>
                    {item.notes && (
                      <p
                        className="text-[#3D2E24] text-base mt-2 leading-relaxed"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {item.notes}
                      </p>
                    )}
                    {item.locationUrl && (
                      <a
                        href={item.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-[11px] tracking-wider uppercase text-[#6B5344] font-semibold hover:underline"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        <PinIcon color="#6B5344" />
                        {item.locationLabel?.trim() || "Ver Localização"}
                      </a>
                    )}
                  </div>
                </div>

                {/* Polaroid after every card (when photos exist) */}
                {showPolaroid && photo && (
                  <div className="relative pl-10">
                    {/* small gold dot on the timeline */}
                    <div className="absolute -left-[11px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-[#6B5344]/40 border-2 border-[#6B5344] z-10" />
                    <InlinePolaroid
                      imageUrl={photo}
                      rotation={rotations[index % rotations.length]}
                      align={index % 2 === 0 ? "left" : "right"}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   GIFT LIST
   ===================================================================== */
function GiftListSection({ event }: { event: ThemeProps["event"] }) {
  const items: GiftItem[] = event.giftList ?? [];
  if (items.length === 0) return null;

  const goldColor = event.primaryColor || "#6B5344";

  return (
    <section className="bg-[#F8F1E3] py-24 px-6 border-b-2 border-[#6B5344]/25">
      <div className="max-w-4xl mx-auto text-center">
        <span
          className="text-[11px] uppercase tracking-[0.35em] text-[#6B5344] font-semibold"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Lembranças e Gestos
        </span>
        <h2
          className="text-3xl md:text-4xl text-[#1A1410] mt-3 mb-2"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Demonstrações de Afeto
        </h2>
        <FloralDivider color={goldColor} />

        <p
          className="text-[#3D2E24] text-lg max-w-2xl mx-auto italic mb-14 leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {event.giftListIntro ||
            "A vossa presença é a nossa maior honra. Caso desejem conceder-nos uma lembrança, contribuições monetárias para o nosso novo capítulo serão recebidas com profunda gratidão."}
        </p>

        <div className="grid gap-7 md:grid-cols-2 text-left">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl border-2 border-[#6B5344]/20 shadow-md"
            >
              <h3
                className="text-xl text-[#1A1410] font-semibold mb-2.5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {item.name}
              </h3>
              {item.note && (
                <p
                  className="text-sm text-[#3D2E24] mb-5 leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.note}
                </p>
              )}
              {item.type === "MONETARY" && item.bankIban && (
                <div className="p-4 bg-[#F8F1E3] rounded-xl border border-[#6B5344]/25 text-xs font-mono text-[#1A1410] space-y-1.5">
                  <div>
                    <strong className="font-sans tracking-wide">
                      NIB/IBAN:
                    </strong>{" "}
                    {item.bankIban}
                  </div>
                  {item.bankAccountHolder && (
                    <div>
                      <strong className="font-sans tracking-wide">
                        Titular:
                      </strong>{" "}
                      {item.bankAccountHolder}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   RSVP FORM
   ===================================================================== */
function RsvpForm({
  token,
  existingRsvp,
}: {
  token: string;
  maxAllowed: number;
  event: ThemeProps["event"];
  existingRsvp: any;
  existingCompanions: any;
}) {
  const router = useRouter();
  const [attending, setAttending] = useState<boolean | null>(
    existingRsvp?.attending ?? null,
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attending === null) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          attending,
          totalAttending: attending ? 1 : 0,
        }),
      });

      if (res.ok) {
        router.push(attending ? `/confirmed/${token}` : `/declined/${token}`);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-[#F8F1E3] py-24 px-6">
      <div className="max-w-2xl mx-auto bg-white p-10 md:p-14 rounded-2xl border-[4px] border-double border-[#6B5344]/60 shadow-xl text-center relative">
        <CornerFlourish color="#6B5344" className="top-4 left-4" />
        <CornerFlourish color="#6B5344" className="top-4 right-4 rotate-90" />
        <CornerFlourish
          color="#6B5344"
          className="bottom-4 right-4 rotate-180"
        />
        <CornerFlourish
          color="#6B5344"
          className="bottom-4 left-4 -rotate-90"
        />

        <span
          className="text-[11px] uppercase tracking-[0.35em] text-[#6B5344] font-semibold"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Confirmação Solicitada
        </span>
        <h2
          className="text-2xl md:text-3xl text-[#1A1410] mt-3 mb-1"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Honrar-nos-á Com a Sua Presença?
        </h2>
        <FloralDivider color="#6B5344" />

        <form onSubmit={handleSubmit} className="mt-9 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`p-4.5 rounded-xl border-2 text-[12px] tracking-wider uppercase font-semibold transition-colors ${
                attending === true
                  ? "bg-[#1A1410] text-white border-[#1A1410]"
                  : "bg-[#F8F1E3] text-[#1A1410] border-[#6B5344]/40 hover:border-[#6B5344]"
              }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Aceito com Todo o Prazer
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`p-4.5 rounded-xl border-2 text-[12px] tracking-wider uppercase font-semibold transition-colors ${
                attending === false
                  ? "bg-[#1A1410] text-white border-[#1A1410]"
                  : "bg-[#F8F1E3] text-[#1A1410] border-[#6B5344]/40 hover:border-[#6B5344]"
              }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Lamento, Não Poderei Comparecer
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting || attending === null}
            className="w-full py-4.5 bg-[#6B5344] text-white font-semibold uppercase tracking-[0.2em] rounded-xl border-2 border-[#4A3A2F] shadow-lg hover:bg-[#5A4638] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {submitting ? "A Enviar Resposta..." : "Enviar Confirmação"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* =====================================================================
   ENVELOPE OPENING
   ===================================================================== */
const WAX_NOISE_TEXTURE =
  "https://www.transparenttextures.com/patterns/dark-dotted-2.png";
const PAPER_GRAIN_TEXTURE =
  "https://www.transparenttextures.com/patterns/cream-paper.png";

function EnvelopeOpening({
  coupleNames = "E & V",
  weddingDate = "",
  onOpen = () => {},
}: {
  coupleNames?: string;
  weddingDate?: string;
  onOpen?: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const [destroyed, setDestroyed] = useState(false);

  const initials = useMemo(() => {
    const parts = coupleNames
      .split(/\s*(?:&|\+|\be\b|\bE\b)\s*/i)
      .filter(Boolean);

    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
    return parts[0]?.[0] || "M";
  }, [coupleNames]);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => {
      setDestroyed(true);
      onOpen();
    }, 1200);
  };

  if (destroyed) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

        .envelope-scene {
          perspective: 1400px;
          -webkit-perspective: 1400px;
        }

        .envelope {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 420px;
          aspect-ratio: 5 / 3.4;
          transform-style: preserve-3d;
          filter: drop-shadow(0 25px 50px rgba(0,0,0,0.6));
        }

        .paper-texture {
          position: absolute;
          inset: 0;
          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E"),
            url("${PAPER_GRAIN_TEXTURE}");
          pointer-events: none;
          z-index: 50;
          mix-blend-mode: multiply;
          border-radius: inherit;
          opacity: 0.7;
        }

        .envelope-body {
          position: absolute;
          inset: 0;
          background: linear-gradient(165deg, #1b1917 0%, #11100f 50%, #191715 100%);
          border-radius: 5px;
          overflow: hidden;
          box-shadow:
            inset 0 0 0 1px rgba(210, 175, 110, 0.08),
            inset 0 2px 10px rgba(0,0,0,0.35);
        }

        .flap-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 52%;
          background: linear-gradient(180deg, #23201d 0%, #131110 100%);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          transform-origin: top center;
          transition: transform 0.95s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 30;
        }

        .flap-open {
          transform: rotateX(-168deg);
        }

        .flap-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, #171513 0%, #10100f 100%);
          clip-path: polygon(0 0, 100% 38%, 100% 100%, 0 100%);
          z-index: 15;
        }

        .flap-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(-90deg, #171513 0%, #10100f 100%);
          clip-path: polygon(0 38%, 100% 0, 100% 100%, 0 100%);
          z-index: 15;
        }

        .flap-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 62%;
          background: linear-gradient(0deg, #191715 0%, #10100f 100%);
          clip-path: polygon(0 100%, 100% 100%, 50% 0);
          z-index: 20;
        }

        .letter {
          position: absolute;
          inset: 12% 8% 18% 8%;
          background: linear-gradient(180deg, #f8f4ec 0%, #ece4d6 100%);
          border-radius: 2px;
          box-shadow:
            0 2px 8px rgba(0,0,0,0.28),
            inset 0 0 0 1px rgba(0,0,0,0.05);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
          text-align: center;
        }

        .seal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 40;
          width: 96px;
          height: 96px;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .seal:hover {
          transform: translate(-50%, -50%) scale(1.03);
        }

        .seal:active {
          transform: translate(-50%, -50%) scale(0.98);
        }

        .seal-wax {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background:
            radial-gradient(circle at 35% 28%, rgba(255,255,255,0.16) 0%, transparent 26%),
            radial-gradient(circle at 68% 72%, rgba(75,50,15,0.12) 0%, transparent 42%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 55%),
            linear-gradient(145deg, #d5af63 0%, #c19443 36%, #aa7624 70%, #8d6220 100%);
          box-shadow:
            0 7px 16px rgba(0,0,0,0.24),
            inset 0 1px 2px rgba(255,255,255,0.18),
            inset 0 -2px 4px rgba(0,0,0,0.16);
          overflow: hidden;
        }

        .seal-wax::before {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          box-shadow:
            inset 0 0 0 1px rgba(255,235,190,0.12),
            inset 0 0 0 2px rgba(86,56,14,0.10);
          pointer-events: none;
        }

        .seal-wax::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background-image: url("${WAX_NOISE_TEXTURE}");
          background-size: 120px;
          opacity: 0.10;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .seal-botanical {
          position: absolute;
          left: 9px;
          top: 9px;
          bottom: 9px;
          width: 34px;
          opacity: 0.88;
          background:
            radial-gradient(circle at 20% 18%, transparent 0 7px, rgba(90,60,15,0.9) 7px 7.5px, transparent 7.5px),
            radial-gradient(circle at 26% 30%, transparent 0 6.5px, rgba(90,60,15,0.86) 6.5px 7px, transparent 7px),
            radial-gradient(circle at 31% 41%, transparent 0 6.5px, rgba(90,60,15,0.86) 6.5px 7px, transparent 7px);
          transform: rotate(-18deg);
          filter: drop-shadow(0 0 0.5px rgba(0,0,0,0.28));
        }

        .seal-monogram {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          color: rgba(88, 58, 16, 0.96);
          text-shadow:
            0.7px 0.7px 0 rgba(255,240,210,0.28),
            -0.7px -0.7px 0 rgba(60,40,10,0.18);
        }

        .seal-letter {
          font-size: 28px;
          font-weight: 600;
          line-height: 1;
        }

        .seal-amp {
          font-size: 18px;
          font-weight: 600;
          line-height: 1;
          margin: 0 6px;
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .seal-pressed {
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          box-shadow:
            inset 0 1px 2px rgba(255,255,255,0.12),
            inset 0 -1px 2px rgba(0,0,0,0.12);
          pointer-events: none;
        }

        .seal-break {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.2) translateY(-18px) !important;
          transition: opacity 0.35s ease, transform 0.5s ease;
          pointer-events: none;
        }

        .gold-edge {
          position: absolute;
          inset: 0;
          border-radius: 5px;
          pointer-events: none;
          z-index: 45;
          box-shadow: inset 0 0 0 1px rgba(210, 175, 110, 0.16);
        }

        @media (max-width: 640px) {
          .envelope-wrapper {
            padding: 0 !important;
            align-items: stretch !important;
            justify-content: stretch !important;
          }

          .envelope {
            max-width: none;
            width: 100%;
            height: 100%;
            aspect-ratio: auto;
            border-radius: 0;
            filter: none;
          }

          .envelope-body,
          .gold-edge {
            border-radius: 0;
          }

          .letter {
            inset: 14% 6% 20% 6%;
          }

          .seal {
            width: 104px;
            height: 104px;
          }
        }
      `}</style>

      <div
        className={`envelope-wrapper fixed inset-0 z-50 flex items-center justify-center bg-[#0a0908] transition-opacity duration-700 ${
          opening ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="envelope-scene w-full h-full flex items-center justify-center p-4 sm:p-6">
          <div className="envelope">
            <div className="envelope-body">
              <div className="paper-texture" />
              <div className="flap-left" />
              <div className="flap-right" />
              <div className="flap-bottom" />
              <div className={`flap-top ${opening ? "flap-open" : ""}`} />

              <div className="letter">
                <span
                  className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#6b5344] font-semibold"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Mensagem do Reino
                </span>
                <h1
                  className="text-xl sm:text-2xl md:text-3xl text-[#1a1410] mt-3 mb-1 leading-tight"
                  style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}
                >
                  {coupleNames}
                </h1>
                {weddingDate && (
                  <p
                    className="text-sm text-[#6b5344] tracking-widest italic mt-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {weddingDate}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleOpen}
                aria-label="Abrir envelope"
                className={`seal ${opening ? "seal-break" : ""}`}
              >
                <div className="seal-wax">
                  <div className="seal-botanical" />
                  <div className="seal-monogram">
                    <span className="seal-letter">{initials[0] || "M"}</span>
                    <span className="seal-amp">&amp;</span>
                    <span className="seal-letter">{initials[1] || ""}</span>
                  </div>
                  <div className="seal-pressed" />
                </div>
              </button>

              <div className="gold-edge" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =====================================================================
   MAIN THEME EXPORT
   ===================================================================== */
export default function BridgertonTheme({
  event,
  guestName,
  token,
  maxAllowed,
  existingRsvp,
  existingCompanions,
}: ThemeProps) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const couplePhotos = (event.couplePhotos as string[]) || [];

  const weddingDate = useMemo(() => {
    if (!event.date) return "";
    try {
      return new Intl.DateTimeFormat("pt-PT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(event.date));
    } catch {
      return "";
    }
  }, [event.date]);

  if (!envelopeOpened) {
    return (
      <EnvelopeOpening
        coupleNames={event.coupleNames || "Os Noivos"}
        weddingDate={weddingDate}
        onOpen={() => setEnvelopeOpened(true)}
      />
    );
  }

  return (
    <main className="bridgerton-theme bg-[#F8F1E3] min-h-screen text-[#1A1410] relative overflow-x-hidden">
      <BackgroundMusic enabled={envelopeOpened} />

      {/* Desktop-only scattered polaroids */}
      {couplePhotos.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
          {couplePhotos[0] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[0]}
              rotation={-8}
              top="18%"
              left="3%"
              size="large"
            />
          )}
          {couplePhotos[1] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[1]}
              rotation={6}
              top="22%"
              right="3%"
              size="medium"
            />
          )}
          {couplePhotos[2] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[2]}
              rotation={-4}
              top="55%"
              left="2%"
              size="medium"
            />
          )}
          {couplePhotos[3] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[3]}
              rotation={10}
              top="58%"
              right="2%"
              size="large"
            />
          )}
          {couplePhotos[4] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[4]}
              rotation={-12}
              top="82%"
              left="6%"
              size="small"
            />
          )}
          {couplePhotos[5] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[5]}
              rotation={8}
              top="88%"
              right="5%"
              size="small"
            />
          )}
        </div>
      )}

      <BridgertonHero event={event} guestName={guestName} />
      <EventDetails event={event} />
      <ProgramSection event={event} couplePhotos={couplePhotos} />
      <GiftListSection event={event} />
      <RsvpForm
        token={token}
        maxAllowed={maxAllowed}
        event={event}
        existingRsvp={existingRsvp}
        existingCompanions={existingCompanions}
      />
    </main>
  );
}
