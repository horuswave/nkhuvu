"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Mail, Phone, Plus, Trash2 } from "lucide-react";
import type { EventData } from "@/types";

/* =====================================================================
   SHARED TYPES
   ===================================================================== */

interface ThemeProps {
  event: EventData & { themeConfig?: any };
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

export interface RsvpFields {
  companions: boolean;
  dietary: boolean;
  transport: boolean;
  message: boolean;
}

/* =====================================================================
   BRIDGERTON ORNAMENTS & ICONS
   ===================================================================== */

function FloralDivider({ color = "#D4AF37" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center my-4 opacity-80">
      <svg
        width="180"
        height="24"
        viewBox="0 0 180 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M90 12C70 12 60 2 40 2C20 2 10 12 0 12"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M90 12C110 12 120 2 140 2C160 2 170 12 180 12"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M90 12C70 12 60 22 40 22C20 22 10 12 0 12"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M90 12C110 12 120 22 140 22C160 22 170 12 180 12"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="90" cy="12" r="4" fill={color} />
        <circle cx="40" cy="12" r="2" fill={color} />
        <circle cx="140" cy="12" r="2" fill={color} />
      </svg>
    </div>
  );
}

function CornerFlourish({
  color = "#D4AF37",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={`w-8 h-8 absolute pointer-events-none ${className}`}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M2 38V12C2 6.47715 6.47715 2 12 2H38"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 38V16C6 10.4772 10.4772 6 16 6H38"
        stroke={color}
        strokeWidth="0.75"
        strokeDasharray="2 2"
      />
      <circle cx="12" cy="12" r="3" fill={color} />
    </svg>
  );
}

function PinIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      className="w-3.5 h-3.5 flex-shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const PROGRAM_ICONS: Record<ProgramItemType, React.ReactNode> = {
  COCKTAIL: <span className="text-xl">🍸</span>,
  CEREMONY: <span className="text-xl">👑</span>,
  RECEPTION: <span className="text-xl">🏛️</span>,
  DINNER: <span className="text-xl">🍽️</span>,
  SPEECHES: <span className="text-xl">📜</span>,
  FIRST_DANCE: <span className="text-xl">💃</span>,
  CAKE: <span className="text-xl">🎂</span>,
  MUSIC: <span className="text-xl">🎻</span>,
  PHOTO: <span className="text-xl">🖼️</span>,
  FIREWORKS: <span className="text-xl">✨</span>,
  BLESSING: <span className="text-xl">🕊️</span>,
  BRUNCH: <span className="text-xl">🫖</span>,
  GAMES: <span className="text-xl">♟️</span>,
  TRANSPORT: <span className="text-xl">🎠</span>,
  CUSTOM: <span className="text-xl">⚜️</span>,
};

/* =====================================================================
   BRIDGERTON HERO
   ===================================================================== */

function BridgertonHero({
  event,
  guestName,
}: {
  event: EventData & { themeConfig?: any };
  guestName?: string;
}) {
  const bgImg =
    event.backgroundImage ||
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000";
  const goldColor = event.primaryColor || "#D4AF37";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        .bridgerton-glass {
          background: rgba(253, 251, 247, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          box-shadow: 0 20px 50px rgba(27, 43, 75, 0.15), inset 0 0 30px rgba(212, 175, 55, 0.08);
        }
      `}</style>

      <section
        className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-10 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImg}')` }}
      >
        {/* Camada de tom azul regência */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b2b4b]/60 via-[#1e3a5f]/40 to-[#0f172a]/80" />

        {/* Cartão Principal */}
        <div className="bridgerton-glass relative z-10 w-full max-w-3xl rounded-xl p-8 md:p-16 text-center my-12 border-4 border-double border-[#d4af37]/60">
          <CornerFlourish color={goldColor} className="top-3 left-3" />
          <CornerFlourish
            color={goldColor}
            className="top-3 right-3 rotate-90"
          />
          <CornerFlourish
            color={goldColor}
            className="bottom-3 right-3 rotate-180"
          />
          <CornerFlourish
            color={goldColor}
            className="bottom-3 left-3 -rotate-90"
          />

          <p
            className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#1e3a5f] font-semibold mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Caríssimo Leitor, é Cordialmente Convidado Para
          </p>

          <h1
            className="text-4xl md:text-7xl font-normal text-[#1b2b4b] tracking-wide my-4"
            style={{ fontFamily: event.fontDisplay || "'Cinzel', serif" }}
          >
            {event.title}
          </h1>

          <FloralDivider color={goldColor} />

          <p
            className="text-3xl md:text-5xl text-[#8c6d23] my-4 italic"
            style={{ fontFamily: "'Alex Brush', cursive" }}
          >
            {event.coupleNames}
          </p>

          {guestName && (
            <div className="mt-8 inline-block px-6 py-2 rounded-full border border-[#d4af37]/40 bg-[#e8f0f8]/60 shadow-inner">
              <span
                className="text-xs md:text-sm text-[#1e3a5f] tracking-widest uppercase font-medium"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Convidado Ilustre:{" "}
                <strong className="text-[#8c6d23]">{guestName}</strong>
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* =====================================================================
   DETALHES DO EVENTO
   ===================================================================== */

function EventDetails({ event }: { event: EventData & { themeConfig?: any } }) {
  const rules = event.rules?.split("\n").filter(Boolean) ?? [];
  const goldColor = event.primaryColor || "#D4AF37";

  return (
    <section className="bg-[#f9f6f0] py-20 px-6 relative border-t-2 border-b-2 border-[#d4af37]/30">
      <div className="max-w-3xl mx-auto text-center">
        <span
          className="text-xs uppercase tracking-[0.3em] text-[#8c6d23]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Informações Relevantes
        </span>
        <h2
          className="text-3xl md:text-4xl text-[#1b2b4b] mt-2 mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {event.detailsSectionTitle || "Detalhes do Evento"}
        </h2>
        <FloralDivider color={goldColor} />

        {rules.length > 0 && (
          <div className="mt-8 bg-[#fdfbf7] p-8 md:p-12 rounded-lg border border-[#d4af37]/40 shadow-sm relative">
            <ul className="space-y-4 text-left">
              {rules.map((rule, i) => (
                <li
                  key={i}
                  className="text-[#2c3e50] text-base md:text-lg flex items-start gap-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <span className="text-[#d4af37] text-xl leading-none">⚜</span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(event.supportEmail || event.supportPhone) && (
          <div className="mt-12 p-6 bg-[#e8f0f8]/50 rounded-lg border border-[#1e3a5f]/20">
            <p
              className="text-[#1e3a5f] text-sm md:text-base mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {event.detailsContactText ||
                "Para qualquer esclarecimento adicional, por favor contacte os nossos correspondentes:"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {event.supportEmail && (
                <a
                  href={`mailto:${event.supportEmail}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4af37] bg-white px-5 py-2 text-xs uppercase tracking-widest text-[#1b2b4b] hover:bg-[#d4af37] hover:text-white transition-all shadow-sm"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  {event.supportEmail}
                </a>
              )}
              {event.supportPhone && (
                <a
                  href={`tel:${event.supportPhone}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4af37] bg-white px-5 py-2 text-xs uppercase tracking-widest text-[#1b2b4b] hover:bg-[#d4af37] hover:text-white transition-all shadow-sm"
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
   PROGRAMA
   ===================================================================== */

function ProgramSection({
  event,
}: {
  event: EventData & { programItems?: ProgramItem[] };
}) {
  const items: ProgramItem[] =
    (event.programItems as ProgramItem[] | undefined) ?? [];
  if (items.length === 0) return null;

  return (
    <section className="bg-[#eef4fa] py-24 px-6 border-b border-[#d4af37]/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-xs uppercase tracking-[0.3em] text-[#8c6d23]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Ordem dos Acontecimentos
          </span>
          <h2
            className="text-4xl md:text-5xl text-[#1b2b4b] mt-2"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {event.programSubtitle || "O Nosso Dia"}
          </h2>
          <FloralDivider color={event.primaryColor || "#D4AF37"} />
        </div>

        <div className="relative border-l-2 border-[#d4af37]/50 ml-4 md:ml-32 space-y-12">
          {items.map((item) => (
            <div key={item.id} className="relative pl-8 md:pl-12">
              <div className="absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#fdfbf7] border-2 border-[#d4af37] text-[#8c6d23] shadow">
                {PROGRAM_ICONS[item.type]}
              </div>

              <div className="bg-[#fdfbf7] p-6 rounded-lg border border-[#d4af37]/40 shadow-sm relative">
                <span
                  className="inline-block px-3 py-1 bg-[#1e3a5f] text-[#d4af37] text-xs font-semibold rounded tracking-widest mb-2"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {item.time}
                </span>
                <h3
                  className="text-2xl text-[#1b2b4b]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {item.label}
                </h3>
                {item.notes && (
                  <p
                    className="text-[#4a5568] text-base mt-2"
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
                    className="inline-flex items-center gap-1.5 mt-4 text-xs tracking-wider uppercase text-[#8c6d23] hover:underline"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    <PinIcon color="#8c6d23" />
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
   LISTA DE PRESENTES
   ===================================================================== */

function GiftListSection({
  event,
}: {
  event: EventData & { giftList?: GiftItem[] };
}) {
  const items: GiftItem[] = (event.giftList as GiftItem[] | undefined) ?? [];
  if (items.length === 0) return null;

  return (
    <section className="bg-[#f9f6f0] py-24 px-6 border-b border-[#d4af37]/30">
      <div className="max-w-4xl mx-auto text-center">
        <span
          className="text-xs uppercase tracking-[0.3em] text-[#8c6d23]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Lembranças e Gestos
        </span>
        <h2
          className="text-4xl text-[#1b2b4b] mt-2 mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Demonstrações de Afeto
        </h2>
        <FloralDivider color={event.primaryColor || "#D4AF37"} />

        <p
          className="text-[#4a5568] text-lg max-w-2xl mx-auto italic mb-12"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {event.giftListIntro ||
            "A vossa presença é a nossa maior honra. Caso desejem conceder-nos uma lembrança, contribuições monetárias para o nosso novo capítulo serão recebidas com profunda gratidão."}
        </p>

        <div className="grid gap-6 md:grid-cols-2 text-left">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#fdfbf7] p-8 rounded-lg border border-[#d4af37]/40 shadow-sm relative"
            >
              <h3
                className="text-xl text-[#1b2b4b] font-bold mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {item.name}
              </h3>
              {item.note && (
                <p
                  className="text-sm text-[#5a6a85] mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.note}
                </p>
              )}
              {item.type === "MONETARY" && item.bankIban && (
                <div className="p-4 bg-[#e8f0f8]/50 rounded border border-[#1e3a5f]/20 text-xs font-mono text-[#1e3a5f] space-y-1">
                  <div>
                    <strong>NIB/IBAN:</strong> {item.bankIban}
                  </div>
                  {item.bankAccountHolder && (
                    <div>
                      <strong>Titular:</strong> {item.bankAccountHolder}
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
   FORMULÁRIO RSVP
   ===================================================================== */

function RsvpForm({
  token,
  maxAllowed,
  event,
  existingRsvp,
  existingCompanions,
}: any) {
  const router = useRouter();
  const [attending, setAttending] = useState<boolean | null>(
    existingRsvp?.attending ?? null,
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attending === null) return;
    setSubmitting(true);
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
    setSubmitting(false);
  }

  return (
    <section className="bg-[#eef4fa] py-24 px-6">
      <div className="max-w-2xl mx-auto bg-[#fdfbf7] p-8 md:p-12 rounded-xl border-4 border-double border-[#d4af37]/60 shadow-xl text-center relative">
        <CornerFlourish color="#D4AF37" className="top-2 left-2" />
        <CornerFlourish color="#D4AF37" className="top-2 right-2 rotate-90" />
        <CornerFlourish
          color="#D4AF37"
          className="bottom-2 right-2 rotate-180"
        />
        <CornerFlourish
          color="#D4AF37"
          className="bottom-2 left-2 -rotate-90"
        />

        <span
          className="text-xs uppercase tracking-[0.3em] text-[#8c6d23]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Confirmação Solicitada
        </span>
        <h2
          className="text-3xl md:text-4xl text-[#1b2b4b] my-2"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Honrar-nos-á Com a Sua Presença?
        </h2>
        <FloralDivider color="#D4AF37" />

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`p-4 rounded border text-sm tracking-wider uppercase transition-all ${
                attending === true
                  ? "bg-[#1e3a5f] text-[#d4af37] border-[#1e3a5f]"
                  : "bg-white text-[#1b2b4b] border-[#d4af37]/50"
              }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Aceito com Todo o Prazer
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`p-4 rounded border text-sm tracking-wider uppercase transition-all ${
                attending === false
                  ? "bg-[#1e3a5f] text-[#d4af37] border-[#1e3a5f]"
                  : "bg-white text-[#1b2b4b] border-[#d4af37]/50"
              }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Lamento, Não Poderei Comparecer
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting || attending === null}
            className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#1b2b4b] font-bold uppercase tracking-[0.2em] rounded border border-[#8c6d23] shadow-md hover:brightness-105 transition-all disabled:opacity-50"
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
   ENVELOPE REALISTA QUE ABRE (ABAS & SELO DE CERA)
   ===================================================================== */

function EnvelopeOpening({
  coupleNames = "E & V",
  weddingDate = "10.05.2025",
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
    return "M";
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
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital@1&display=swap');

        .envelope-container {
          perspective: 1200px;
        }

        .flap-top {
          transform-origin: top center;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .flap-open {
          transform: rotateX(-180deg);
        }

        .seal-break {
          transition: opacity 0.4s ease, transform 0.6s ease;
          opacity: 0;
          transform: scale(1.3) translateY(-20px);
        }
      `}</style>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0e1726] p-4 transition-opacity duration-700 ${opening ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="envelope-container relative w-full max-w-lg aspect-[4/3] bg-[#f4eee0] rounded-lg shadow-2xl border border-[#d4af37]/40 flex flex-col justify-between overflow-hidden">
          {/* Aba Superior do Envelope */}
          <div
            className={`flap-top absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#fdfbf7] to-[#eae0cd] border-b-2 border-[#d4af37]/60 z-30 flex items-end justify-center ${opening ? "flap-open" : ""}`}
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          />

          {/* Aba Inferior do Envelope */}
          <div
            className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-[#f5ede0] to-[#e6d8c0] border-t border-[#d4af37]/40 z-20"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }}
          />

          {/* Conteúdo Interno / Carta Visível ao Abrir */}
          <div className="relative z-10 p-8 text-center my-auto">
            <span
              className="text-[10px] uppercase tracking-[0.4em] text-[#8c6d23] font-semibold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Mensagem do Reino
            </span>
            <h1
              className="text-3xl text-[#1b2b4b] mt-3 mb-1"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {coupleNames}
            </h1>
            <p
              className="text-xs text-[#8c6d23] tracking-widest italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {weddingDate}
            </p>
          </div>

          {/* Selo de Cera 3D Interativo */}
          <button
            type="button"
            onClick={handleOpen}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-24 h-24 rounded-full bg-gradient-to-br from-[#8b0000] via-[#a71d2a] to-[#5c0000] flex items-center justify-center shadow-2xl border-4 border-[#d4af37] transition-all hover:scale-110 active:scale-95 cursor-pointer ${opening ? "seal-break" : ""}`}
          >
            <div className="w-20 h-20 rounded-full border border-[#f3e5ab]/40 flex flex-col items-center justify-center">
              <span className="text-2xl text-[#f3e5ab] font-serif tracking-widest">
                {initials}
              </span>
              <span
                className="text-[8px] uppercase tracking-widest text-[#f3e5ab]/80 mt-0.5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Abrir
              </span>
            </div>
          </button>

          {/* Marca d'água de texto inferior */}
          <div className="absolute bottom-3 left-0 right-0 text-center z-30 pointer-events-none">
            <p
              className="text-[9px] uppercase tracking-[0.3em] text-[#1e3a5f]/50"
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
   EXPORTAÇÃO DO TEMA
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

  const weddingDate = useMemo(() => {
    if (!event.date) return "";
    return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(event.date));
  }, [event.date]);

  if (!envelopeOpened) {
    return (
      <EnvelopeOpening
        coupleNames={event.coupleNames}
        weddingDate={weddingDate}
        onOpen={() => setEnvelopeOpened(true)}
      />
    );
  }

  return (
    <main className="bridgerton-theme bg-[#faf7f2] min-h-screen text-[#1b2b4b]">
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
