import React from "react";

// Custom SVG icons
const EnvelopeIcon = () => (
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
    className="text-stone-700"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

const ChecklistIcon = () => (
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
    className="text-stone-700"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
    <path d="M8 6h8" />
    <path d="M8 10h6" />
    <path d="M8 14h4" />
  </svg>
);

const GiftIcon = () => (
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
    className="text-stone-700"
  >
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-amber-600"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-amber-400"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

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

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-emerald-600"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const QuoteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-amber-200/50"
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2-1 0-3 0-3 2 0 2 2 2 3 2z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4-1 0-3 0-3 2 0 2 2 2 3 2z" />
  </svg>
);

const PaintPaletteIcon = () => (
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
    className="text-stone-700"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const CalendarIcon = () => (
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
    className="text-stone-700"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

const UsersIcon = () => (
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
    className="text-stone-700"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MapPinIcon = () => (
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
    className="text-stone-700"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DatabaseIcon = () => (
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
    className="text-stone-700"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12v4c0 1.66 4 3 9 3s9-1.34 9-3v-4" />
  </svg>
);

const PhoneIcon = () => (
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
    className="text-stone-700"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TableIcon = () => (
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
    className="text-stone-700"
  >
    <path d="M3 6h18" />
    <path d="M3 12h18" />
    <path d="M3 18h18" />
    <path d="M8 6v12" />
    <path d="M16 6v12" />
  </svg>
);

const LockIcon = () => (
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
    className="text-stone-700"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const WhatsAppIcon = () => (
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
    className="text-stone-700"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
            {/* Left column Hero text */}
            <div className="flex-1 max-w-2xl lg:max-w-xl">
              <div className="inline-flex items-center gap-2 bg-amber-100/70 backdrop-blur-sm px-4 py-1.5 rounded-full text-amber-800 text-sm font-medium tracking-wide mb-6">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                Nkhuvu • Celebração em Changana
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-stone-900 leading-[1.1] mb-6">
                Convites que
                <span className="font-normal text-amber-600 block mt-2">
                  honram cada celebração
                </span>
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8 max-w-lg">
                Crie convites digitais elegantes, gerencie confirmações em tempo
                real e ofereça uma experiência inesquecível aos seus convidados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#solicitar-acesso"
                  className="group inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg shadow-stone-900/10 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Solicitar acesso
                  <ArrowRightIcon />
                </a>
                <a
                  href="/convite"
                  className="inline-flex items-center justify-center border-2 border-stone-300 hover:border-stone-400 text-stone-700 font-medium px-8 py-4 rounded-full text-lg transition-all duration-200 hover:bg-stone-50"
                >
                  Ver demonstração
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-4">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center text-stone-600 text-sm font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-stone-500">
                  <span className="font-semibold text-stone-800">
                    +250 famílias
                  </span>{" "}
                  já escolheram a Nkhuvu
                </div>
              </div>
            </div>

            {/* Right column Invitation mockup */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl shadow-stone-200/50 overflow-hidden border border-stone-100 transition-all duration-300 hover:shadow-3xl">
                  <div className="bg-gradient-to-r from-stone-50 to-white px-8 pt-8 pb-6 border-b border-stone-100">
                    <div className="text-center">
                      <div className="text-xs tracking-[0.3em] text-amber-600 uppercase mb-2">
                        Com muita alegria
                      </div>
                      <div className="text-2xl font-light tracking-wide text-stone-800">
                        Helena & Alberto
                      </div>
                      <div className="w-12 h-px bg-amber-200 mx-auto my-4"></div>
                      <div className="text-stone-500 text-sm">
                        15 de Outubro, 2026
                      </div>
                      <div className="text-stone-400 text-xs mt-1">
                        Quinta das Oliveiras, Maputo
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-500">Status</span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-medium">
                        <CheckCircleIcon />
                        Aberto para RSVP
                      </span>
                    </div>
                    <div className="bg-amber-50/40 rounded-xl p-4 text-center">
                      <p className="text-stone-600 text-sm leading-relaxed">
                        "A sua presença tornará este dia ainda mais especial.
                        Confirme até 30 de Setembro."
                      </p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <div className="flex-1 bg-stone-800 text-white text-center py-2.5 rounded-lg text-sm font-medium">
                        Confirmar presença
                      </div>
                      <div className="flex-1 border border-stone-300 text-stone-600 text-center py-2.5 rounded-lg text-sm">
                        Ver detalhes
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-50 px-8 py-3 text-center border-t border-stone-100">
                    <span className="text-xs text-stone-400">
                      Convite digital com RSVP em tempo real
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-100/50 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Request Section */}
      <section
        id="solicitar-acesso"
        className="py-16 px-6 bg-amber-50/60 border-b border-amber-100"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-1.5 rounded-full text-amber-700 text-sm font-medium mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Acesso Restrito
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-3">
            Administradores e Organizadores
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto mb-6">
            A plataforma Nkhuvu é gerida por administradores autorizados. Se é
            organizador de um evento e precisa de acesso, solicite a sua conta.
          </p>
          <a
            href="mailto:ola@nkhuvu.co.mz?subject=Solicitação%20de%20Acesso%20Nkhuvu&body=Olá,%20gostaria%20de%20solicitar%20acesso%20à%20plataforma%20Nkhuvu%20para%20gerir%20o%20meu%20evento.%0A%0ANome:%0AEvento:%0AData%20do%20Evento:"
            className="inline-flex items-center gap-2 bg-white border border-amber-300 hover:border-amber-400 text-amber-700 font-medium px-6 py-3 rounded-full text-sm transition-all duration-200 hover:bg-amber-50"
          >
            <MailIcon />
            Solicitar acesso
            <ArrowRightIcon />
          </a>
          <p className="text-xs text-stone-400 mt-4">
            Apenas administradores autorizados têm acesso ao dashboard. Solicite
            a sua conta através do email acima.
          </p>
        </div>
      </section>

      {/* Stats bar Social proof */}
      <div className="border-y border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-light text-stone-800">98%</div>
              <div className="text-sm text-stone-500 mt-1">
                taxa de confirmação
              </div>
            </div>
            <div>
              <div className="text-3xl font-light text-stone-800">+280</div>
              <div className="text-sm text-stone-500 mt-1">
                eventos realizados
              </div>
            </div>
            <div>
              <div className="text-3xl font-light text-stone-800">24h</div>
              <div className="text-sm text-stone-500 mt-1">
                suporte prioritário
              </div>
            </div>
            <div>
              <div className="text-3xl font-light text-stone-800">5★</div>
              <div className="text-sm text-stone-500 mt-1">avaliação média</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-stone-100 px-4 py-1.5 rounded-full text-stone-600 text-sm tracking-wide mb-4">
              <span className="w-1 h-1 bg-stone-400 rounded-full"></span>
              Funcionalidades completas
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-900">
              Tudo o que precisa para o seu evento
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto mt-4 text-lg">
              Uma plataforma completa que cuida de cada detalhe, do convite à
              confirmação final.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Convites Digitais */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <EnvelopeIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Convites Digitais
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Design totalmente personalizável com cores, fontes e estilo do
                seu evento. Link único para cada convidado.
              </p>
            </div>

            {/* Gestão de Convidados */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <UsersIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Gestão de Convidados
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Adicione, edite e organize todos os convidados. Controle quem
                confirmou presença ou declinou.
              </p>
            </div>

            {/* RSVP em Tempo Real */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <ChecklistIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                RSVP em Tempo Real
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Acompanhe confirmações instantaneamente, gerencie acompanhantes
                e preferências alimentares.
              </p>
            </div>

            {/* Lista de Presentes */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <GiftIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Lista de Presentes
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Crie lista de presentes físicos e contribuições monetárias com
                IBAN, M-Pesa e referências bancárias.
              </p>
            </div>

            {/* Programa do Evento */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <CalendarIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Programa do Evento
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Adicione horários e atividades da cerimónia, cocktail, jantar e
                festa.
              </p>
            </div>

            {/* Gestão de Mesas */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <TableIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Gestão de Mesas
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Crie mesas, defina capacidade e organize os convidados por lugar
                sentado.
              </p>
            </div>

            {/* Envio de Convites por SMS/WhatsApp */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <WhatsAppIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Envio Multicanal
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Envie convites por SMS, WhatsApp ou email. Agendamento de
                lembretes automáticos.
              </p>
            </div>

            {/* Personalização Visual */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <PaintPaletteIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Personalização Visual
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Cores primária e de destaque. Fundo escuro, claro ou imagem.
                Fontes personalizáveis.
              </p>
            </div>

            {/* Dashboard Administrativo */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <DatabaseIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Dashboard Administrativo
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Painel completo com estatísticas em tempo real: total de
                convidados, confirmações e headcount.
              </p>
            </div>

            {/* Mapa e Localização */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <MapPinIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Mapa e Localização
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Adicione URL do Google Maps para facilitar a chegada dos seus
                convidados.
              </p>
            </div>

            {/* Suporte Prioritário */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <PhoneIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Suporte Prioritário
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Email e telefone de suporte disponíveis para todas as dúvidas
                dos convidados.
              </p>
            </div>

            {/* Segurança e Controlo */}
            <div className="group p-6 rounded-2xl bg-stone-50/40 hover:bg-stone-50 transition-all duration-300">
              <div className="mb-5">
                <LockIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                Segurança e Controlo
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Tokens únicos por convidado. Múltiplos administradores por
                evento com níveis de acesso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-24 px-6 bg-stone-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-1.5 rounded-full text-amber-800 text-sm font-medium tracking-wide mb-6">
                <HeartIcon />A nossa história
              </div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-900 mb-6">
                Nasceu de uma história familiar
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-5">
                Anderson Macuche criou a Nkhuvu após ver a sua família enfrentar
                dificuldades na organização do aniversário de 50 anos dos seus
                avós.
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                A tarefa de enviar convites, controlar confirmações e organizar
                os convidados tornou-se um desafio enorme. Foi ali que surgiu a
                ideia: uma plataforma digital que tornasse cada celebração mais
                simples, organizada e memorável.
              </p>
              <p className="text-stone-600 leading-relaxed">
                <span className="font-semibold text-stone-800">Nkhuvu</span>{" "}
                significa{" "}
                <span className="italic text-amber-700">"celebração"</span> em
                Changana, a língua que embala as tradições e une as famílias. É
                mais do que uma plataforma: é uma ferramenta para honrar
                momentos que ficam para sempre.
              </p>
              <div className="mt-8 pt-4 border-t border-stone-200">
                <p className="text-stone-500 text-sm">
                  Anderson Macuche, Fundador
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center shadow-xl">
                  <span className="text-7xl font-light text-stone-500">
                    A.M.
                  </span>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 max-w-[200px]">
                  <QuoteIcon />
                  <p className="text-stone-700 text-sm mt-2 italic">
                    "Celebrar é estar junto. Facilitar é o nosso propósito."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-tight text-stone-900">
              Como funciona
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto mt-4">
              Em três passos simples, o seu evento ganha vida digital
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-2xl font-medium mb-6">
                1
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">
                Escolha um modelo
              </h3>
              <p className="text-stone-500">
                Selecione entre designs elegantes e adapte ao seu estilo
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-2xl font-medium mb-6">
                2
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">
                Personalize os detalhes
              </h3>
              <p className="text-stone-500">
                Adicione informações do evento, local, data e lista de presentes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-2xl font-medium mb-6">
                3
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">
                Partilhe e acompanhe
              </h3>
              <p className="text-stone-500">
                Envie o link e veja confirmações em tempo real
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6 bg-stone-50/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>
          <blockquote className="text-xl md:text-2xl text-stone-700 leading-relaxed font-light">
            “A Nkhuvu transformou completamente a gestão do nosso casamento. Os
            convites são lindos e o sistema de confirmações poupou horas de
            trabalho. Recomendo a todas as famílias.”
          </blockquote>
          <div className="mt-8">
            <p className="font-medium text-stone-900">Mariana & Rafael</p>
            <p className="text-sm text-stone-400 mt-1">
              Casamento, Novembro 2025
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
            Pronto para celebrar de forma memorável?
          </h2>
          <p className="text-stone-300 text-lg mb-10 max-w-2xl mx-auto">
            Comece hoje. Crie o convite digital perfeito para o seu evento em
            poucos minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#solicitar-acesso"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-medium px-10 py-4 rounded-full text-lg transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Solicitar acesso
              <ArrowRightIcon />
            </a>
            <a
              href="/convite"
              className="inline-flex items-center justify-center border border-white/30 text-white font-medium px-10 py-4 rounded-full text-lg hover:bg-white/10 transition-all"
            >
              Ver demonstração ao vivo
            </a>
          </div>
          <p className="text-stone-400 text-sm mt-8">
            Acesso mediante solicitação • Suporte prioritário
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="md:col-span-2">
              <div className="text-white text-xl font-light tracking-wide mb-2">
                Nkhuvu
              </div>
              <div className="text-amber-500 text-xs tracking-wider mb-3">
                Celebração em Changana
              </div>
              <p className="text-sm text-stone-500 max-w-md">
                Plataforma elegante para casamentos e eventos especiais em
                Moçambique. Tecnologia e design para celebrar os melhores
                momentos.
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">
                Links rápidos
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#solicitar-acesso"
                    className="hover:text-white transition"
                  >
                    Solicitar acesso
                  </a>
                </li>
                <li>
                  <a href="/convite" className="hover:text-white transition">
                    Convite exemplo
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ola@nkhuvu.co.mz"
                    className="hover:text-white transition"
                  >
                    Suporte
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>Maputo, Moçambique</li>
                <li>ola@nkhuvu.co.mz</li>
                <li>Anderson Macuche, Fundador</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs text-stone-600">
            © {currentYear} Nkhuvu. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
