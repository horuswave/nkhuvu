"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone } from "lucide-react";
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
   POLAROID PHOTO
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
      className={`absolute ${sizeClasses[size]} bg-white p-3 shadow-2xl transform hover:scale-105 hover:z-50 transition-all duration-300`}
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
        .bridgerton-glass {
          background: #FFFbf5;
          border: 1px solid rgba(107, 83, 68, 0.45);
          box-shadow:
            0 30px 70px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.6) inset;
        }
      `}</style>

      <section
        className="relative min-h-screen w-full flex items-center justify-center p-6 md:p-14 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImg}')` }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="bridgerton-glass relative z-10 w-full max-w-3xl rounded-2xl p-10 md:p-16 text-center my-12 border-[4px] border-double border-[#6B5344]/70">
          <CornerFlourish color={goldColor} className="top-4 left-4" />
          <CornerFlourish
            color={goldColor}
            className="top-4 right-4 rotate-90"
          />
          <CornerFlourish
            color={goldColor}
            className="bottom-4 right-4 rotate-180"
          />
          <CornerFlourish
            color={goldColor}
            className="bottom-4 left-4 -rotate-90"
          />

          <p
            className="text-[11px] md:text-xs uppercase tracking-[0.45em] text-[#3D2E24] font-semibold mb-5"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Caríssimo Leitor, é Cordialmente Convidado Para
          </p>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-[#1A1410] tracking-wide leading-[1.1]"
            style={{ fontFamily: event.fontDisplay || "'Cinzel', serif" }}
          >
            {event.title}
          </h1>

          <FloralDivider color={goldColor} />

          <p
            className="text-3xl md:text-5xl text-[#6B5344] mt-1 mb-1 italic leading-none"
            style={{ fontFamily: "'Alex Brush', cursive" }}
          >
            {event.coupleNames}
          </p>

          {guestName && (
            <div className="mt-10 inline-block px-8 py-3 rounded-full border-2 border-[#6B5344]/50 bg-[#F8F1E3]">
              <span
                className="text-[11px] md:text-xs text-[#1A1410] tracking-[0.2em] uppercase font-semibold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Convidado Ilustre:{" "}
                <strong className="text-[#6B5344]">{guestName}</strong>
              </span>
            </div>
          )}
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
    <section className="bg-[#F8F1E3] py-24 px-6 relative border-y-2 border-[#6B5344]/30">
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

        {/* Date, Time, Venue */}
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

        {/* Address */}
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

        {/* Dress Code */}
        {event.dressCode && (
          <div className="mt-6 bg-white p-6 rounded-2xl border-2 border-[#6B5344]/25 shadow-sm">
            <p
              className="text-[#1A1410] text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="font-semibold">Código de Vestimenta:</span> {event.dressCode}
            </p>
          </div>
        )}

        {/* Message */}
        {event.message && (
          <div className="mt-8 bg-[#6B5344] p-8 rounded-2xl shadow-md">
            <p
              className="text-white text-base md:text-lg leading-relaxed italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {event.message}
            </p>
          </div>
        )}

        {/* Rules */}
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

        {/* Contact */}
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
   ===================================================================== */
function ProgramSection({ event }: { event: ThemeProps["event"] }) {
  const items: ProgramItem[] = event.programItems ?? [];
  if (items.length === 0) return null;

  const goldColor = event.primaryColor || "#6B5344";

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

        <div className="relative border-l-[3px] border-[#6B5344]/50 ml-4 md:ml-24 space-y-12">
          {items.map((item) => (
            <div key={item.id} className="relative pl-10 md:pl-12">
              <div className="absolute -left-[19px] top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white border-[3px] border-[#6B5344] text-[#6B5344] shadow-md">
                {PROGRAM_ICONS[item.type] ?? PROGRAM_ICONS.CUSTOM}
              </div>

              <div className="bg-white p-7 rounded-2xl border-2 border-[#6B5344]/20 shadow-md">
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
    if (parts.length >= 2) return `${parts[0][0]} & ${parts[1][0]}`;
    return parts[0]?.[0] || "M";
  }, [coupleNames]);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => {
      setDestroyed(true);
      onOpen();
    }, 1100);
  };

  if (destroyed) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital@1&display=swap');
        .envelope-container {
          perspective: 1200px;
        }
        .flap-top {
          transform-origin: top center;
          transition: transform 0.85s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .flap-open {
          transform: rotateX(-180deg);
        }
        .seal-break {
          transition: opacity 0.35s ease, transform 0.55s ease;
          opacity: 0;
          transform: scale(1.25) translateY(-18px);
        }
      `}</style>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#12100E] p-6 transition-opacity duration-700 ${
          opening ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="envelope-container relative w-full max-w-md aspect-[4/3] bg-[#F8F1E3] rounded-2xl shadow-2xl border-2 border-[#6B5344]/40 flex flex-col justify-between overflow-hidden">
          {/* Top flap */}
          <div
            className={`flap-top absolute top-0 left-0 right-0 h-1/2 bg-[#EDE6D4] border-b-2 border-[#6B5344]/35 z-30 ${
              opening ? "flap-open" : ""
            }`}
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          />

          {/* Bottom flap */}
          <div
            className="absolute bottom-0 left-0 right-0 h-3/5 bg-[#E4DCC8] border-t border-[#6B5344]/30 z-20"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }}
          />

          {/* Letter content */}
          <div className="relative z-10 p-9 text-center my-auto">
            <span
              className="text-[10px] uppercase tracking-[0.4em] text-[#6B5344] font-semibold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Mensagem do Reino
            </span>
            <h1
              className="text-2xl md:text-3xl text-[#1A1410] mt-4 mb-1.5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {coupleNames}
            </h1>
            {weddingDate && (
              <p
                className="text-sm text-[#6B5344] tracking-widest italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {weddingDate}
              </p>
            )}
          </div>

          {/* Wax seal */}
          <button
            type="button"
            onClick={handleOpen}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-28 h-28 rounded-full bg-[#6B5344] flex items-center justify-center shadow-2xl border-[4px] border-[#4A3A2F] transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
              opening ? "seal-break" : ""
            }`}
          >
            <div className="w-22 h-22 rounded-full border-2 border-white/25 flex flex-col items-center justify-center">
              <span className="text-2xl text-white font-serif tracking-widest">
                {initials}
              </span>
              <span
                className="text-[9px] uppercase tracking-widest text-white/90 mt-1"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Abrir
              </span>
            </div>
          </button>

          <div className="absolute bottom-4 left-0 right-0 text-center z-30 pointer-events-none">
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-[#1A1410]/50 font-medium"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Clique no Selo de Cera
            </p>
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
    <main className="bridgerton-theme bg-[#F8F1E3] min-h-screen text-[#1A1410] relative">
      {/* Scattered Polaroid Photos */}
      {couplePhotos.length > 0 && (
        <>
          {couplePhotos[0] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[0]}
              rotation={-8}
              top="20%"
              left="5%"
              size="large"
            />
          )}
          {couplePhotos[1] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[1]}
              rotation={6}
              top="25%"
              right="5%"
              size="medium"
            />
          )}
          {couplePhotos[2] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[2]}
              rotation={-4}
              top="60%"
              left="3%"
              size="medium"
            />
          )}
          {couplePhotos[3] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[3]}
              rotation={10}
              top="65%"
              right="4%"
              size="large"
            />
          )}
          {couplePhotos[4] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[4]}
              rotation={-12}
              top="85%"
              left="10%"
              size="small"
            />
          )}
          {couplePhotos[5] && (
            <PolaroidPhoto
              imageUrl={couplePhotos[5]}
              rotation={8}
              top="90%"
              right="8%"
              size="small"
            />
          )}
        </>
      )}

      <BridgertonHero event={event} guestName={guestName} />
      <EventDetails event={event} />
      <ProgramSection event={event} />
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
