"use client";

import { useState } from "react";
import InvitationHero from "@/components/invitation/InvitationHero";
import EventDetails from "@/components/invitation/EventDetails";
import ProgramSection, {
  ProgramItem,
} from "@/components/invitation/ProgramSection";
import GiftListSection from "@/components/invitation/Giftlistsection";
import type {
  GiftItem,
  GiftItemType,
} from "@/app/admin/(protected)/settings/GiftListEditor";

/**
 * /convite – demo page that showcases the full invitation layout with
 * rich placeholder data. Uses a mock RSVP handler for demonstration purposes.
 * No server calls are made.
 */

const placeholderEvent = {
  id: "demo-event-id",
  title: "Casamento Ana & Miguel",
  coupleNames: "Ana Carolina & Miguel Alberto",
  date: new Date("2026-10-15T18:00:00"),
  time: "18:00",
  venue: "Quinta das Oliveiras",
  address: "Estrada Nacional 4, Km 12, Maputo, Moçambique",
  mapUrl: "https://maps.google.com/?q=Quinta+das+Oliveiras+Maputo",
  dressCode: "Traje formal • Casual elegante",
  message:
    "A sua presença tornará este dia ainda mais especial. Confirmar presença até 30 de Setembro.",
  rules:
    "Por favor, confirme a sua presença até à data indicada. Crianças são bem-vindas. Estacionamento disponível no local.",
  supportEmail: "ola@nkhuvu.co.mz",
  supportPhone: "+258 84 123 4567",
  primaryColor: "#c8890e",
  accentColor: "#0e0b07",
  backgroundStyle: "DARK" as const,
  fontDisplay: "Cormorant Garamond",
  fontBody: "Jost",
  themeId: "classic",
  backgroundImage:
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop",
  logoUrl: undefined,
  rsvpFields: {
    companions: true,
    dietary: true,
    transport: true,
    message: true,
  },
  programItems: [
    {
      id: "ceremony",
      type: "CEREMONY" as const,
      label: "Cerimónia Religiosa",
      time: "17:30",
      notes: "Igreja de São Miguel",
      locationLabel: "Igreja de São Miguel",
      locationUrl: "https://maps.google.com/?q=Igreja+São+Miguel+Maputo",
    },
    {
      id: "cocktail",
      type: "COCKTAIL" as const,
      label: "Cocktail de Boas-Vindas",
      time: "18:30",
      notes: "Quinta das Oliveiras - Jardim",
      locationLabel: "Jardim Principal",
      locationUrl: undefined,
    },
    {
      id: "dinner",
      type: "DINNER" as const,
      label: "Jantar",
      time: "20:00",
      notes: "Menu com opções de carne, peixe e vegetariano",
      locationLabel: "Salão Nobre",
      locationUrl: undefined,
    },
    {
      id: "party",
      type: "PARTY" as const,
      label: "Festa & Música ao Vivo",
      time: "22:00",
      notes: "DJ e Banda ao vivo até às 02:00",
      locationLabel: "Salão Nobre",
      locationUrl: undefined,
    },
  ] as ProgramItem[],
  giftList: [
    {
      id: "gift-honeymoon",
      name: "Lua de Mel",
      type: "MONETARY" as GiftItemType,
      suggestedAmount: 500,
      currency: "MZN",
      note: "Ajude-nos a realizar a viagem dos nossos sonhos para a Ilha de Moçambique",
      bankName: "BCI",
      bankAccountHolder: "Ana Carolina & Miguel Alberto",
      bankIban: "MZ5900012345678901234567890",
      bankReference: "LUA DE MEL",
      mobileWalletProvider: "M-Pesa",
      mobileWalletNumber: "84 123 4567",
      mobileWalletHolderName: "Miguel Alberto",
    },
    {
      id: "gift-kitchen",
      name: "Batedeira KitchenAid",
      type: "ITEM" as GiftItemType,
      store: "Loja do Lar",
      storeUrl: "https://www.lojadolar.co.mz/kitchenaid",
      note: "Cor vermelha, por favor",
    },
    {
      id: "gift-furniture",
      name: "Conjunto de Sala",
      type: "ITEM" as GiftItemType,
      store: "Belo Lar",
      storeUrl: "https://www.belolar.co.mz/salas",
      note: "Modelo Lisboa - cor cinza",
    },
    {
      id: "gift-oven",
      name: "Forno Elétrico",
      type: "ITEM" as GiftItemType,
      store: "Eletro Lar",
      storeUrl: undefined,
      note: "Marca Bosch ou Electrolux",
    },
    {
      id: "gift-cash",
      name: "Contribuição Livre",
      type: "MONETARY" as GiftItemType,
      suggestedAmount: 250,
      currency: "MZN",
      note: "Qualquer valor é bem-vindo para ajudar com os custos do casamento",
      bankName: "BCI",
      bankAccountHolder: "Ana Carolina & Miguel Alberto",
      bankIban: "MZ5900012345678901234567890",
      bankReference: "CASAMENTO",
      mobileWalletProvider: "M-Pesa",
      mobileWalletNumber: "84 123 4567",
      mobileWalletHolderName: "Miguel Alberto",
    },
  ] as GiftItem[],
  // Invitation text customizations
  heroSubtitle: "Celebramos cinco décadas de amor, cumplicidade e elegância",
  anniversaryLabel: "Bodas de Ouro",
  heroFooterText: null,
  // Section titles and descriptions
  programTitle: "Programa",
  programSubtitle: "O Nosso Dia",
  programDescription: "Um percurso desenhado com momentos especiais",
  giftListIntro: "A vossa presença honra-nos profundamente. Caso deseje oferecer um presente, pedimos gentilmente que seja em numerário, através das contas abaixo indicadas. Estará igualmente disponível, no salão, uma caixa para o efeito.",
  giftListPhysicalTitle: "Ideias de presentes",
  giftListMonetaryTitle: "Contribuições monetárias",
  // RSVP form text
  rsvpTitle: "Confirmação de Presença",
  rsvpSubtitle: "Vai Estar Presente?",
  rsvpDescription: "Pedimos a gentileza da sua resposta para prepararmos cada detalhe com o cuidado que a ocasião merece.",
  rsvpAttendingLabel: "Sim, estarei presente",
  rsvpNotAttendingLabel: "Infelizmente não poderei comparecer",
  rsvpCompanionsLabel: "Acompanhantes",
  rsvpAddCompanionLabel: "Adicionar acompanhante",
  rsvpDietaryLabel: "Restrições alimentares",
  rsvpTransportLabel: "Notas de transporte ou logística",
  rsvpMessageLabel: "Uma mensagem para os noivos",
  rsvpSubmitAttending: "Confirmar Presença",
  rsvpSubmitNotAttending: "Confirmar Presença",
  rsvpUpdateButton: "Atualizar Confirmação",
  rsvpAlreadyResponded: "Já respondeu anteriormente. Pode atualizar a sua resposta abaixo.",
  // Event details section
  detailsSectionTitle: "Informações Úteis",
  detailsContactText: "Para qualquer questão adicional, teremos todo o gosto em ajudar.",
};

// Mock RSVP Form Component for demo only (no server calls)
function MockRsvpForm({ maxAllowed }: { maxAllowed: number }) {
  const [step, setStep] = useState<"choice" | "form" | "confirmed">("choice");
  const [attending, setAttending] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    totalAttending: 1,
    dietaryRestrictions: "",
    transportNotes: "",
    coupleMessage: "",
  });

  const handleAttend = (value: boolean) => {
    setAttending(value);
    if (value) {
      setStep("form");
    } else {
      setStep("confirmed");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
  };

  const reset = () => {
    setStep("choice");
    setAttending(true);
    setFormData({
      totalAttending: 1,
      dietaryRestrictions: "",
      transportNotes: "",
      coupleMessage: "",
    });
  };

  if (step === "confirmed") {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-emerald-800 mb-2">
          {attending ? "Presença Confirmada!" : "Presença Declinada"}
        </h3>
        <p className="text-emerald-700">
          {attending
            ? "Muito obrigado pela sua confirmação. Esperamos celebrar consigo!"
            : "Sentiremos a sua falta. Obrigado por nos informar."}
        </p>
        <button
          onClick={reset}
          className="mt-6 text-sm text-emerald-600 underline hover:text-emerald-800"
        >
          Voltar ao formulário
        </button>
      </div>
    );
  }

  if (step === "choice") {
    return (
      <div className="rounded-xl bg-white border border-stone-200 p-6">
        <h2 className="text-2xl font-light text-stone-800 mb-6 text-center">
          Confirmar Presença
        </h2>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleAttend(true)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition"
          >
            Sim, vou comparecer
          </button>
          <button
            onClick={() => handleAttend(false)}
            className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium py-3 rounded-lg transition"
          >
            Não poderei comparecer
          </button>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 text-center">
          <p className="text-amber-700 text-sm">
            Este é um ambiente de demonstração. Num cenário real, este
            formulário enviaria a sua confirmação para os organizadores do
            evento.
          </p>
        </div>
      </div>
    );
  }

  // Form step
  return (
    <div className="rounded-xl bg-white border border-stone-200 p-6">
      <h2 className="text-2xl font-light text-stone-800 mb-6">
        Detalhes da sua confirmação
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Número de pessoas (incluindo você)
          </label>
          <select
            value={formData.totalAttending}
            onChange={(e) =>
              setFormData({
                ...formData,
                totalAttending: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            {[...Array(maxAllowed)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? "pessoa" : "pessoas"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Restrições alimentares
          </label>
          <textarea
            value={formData.dietaryRestrictions}
            onChange={(e) =>
              setFormData({ ...formData, dietaryRestrictions: e.target.value })
            }
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Ex: Alergia a frutos do mar, vegetariano, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Necessidades de transporte
          </label>
          <textarea
            value={formData.transportNotes}
            onChange={(e) =>
              setFormData({ ...formData, transportNotes: e.target.value })
            }
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Ex: Preciso de transporte, virei de carro próprio, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Mensagem para os noivos
          </label>
          <textarea
            value={formData.coupleMessage}
            onChange={(e) =>
              setFormData({ ...formData, coupleMessage: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Deixe uma mensagem especial..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-lg transition"
        >
          Confirmar presença
        </button>

        <button
          type="button"
          onClick={() => setStep("choice")}
          className="w-full text-stone-500 text-sm py-2 hover:text-stone-700 transition"
        >
          ← Voltar
        </button>
      </form>

      <div className="mt-6 bg-amber-50 rounded-lg p-3 text-center">
        <p className="text-amber-700 text-xs">
          Este é um ambiente de demonstração. As respostas não serão salvas.
        </p>
      </div>
    </div>
  );
}

export default function ConviteDemoPage() {
  const event = placeholderEvent;
  const guestName = "Família Silva";
  const maxAllowed = 5;

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <InvitationHero event={event} guestName={guestName} />

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <EventDetails event={event} />

        <ProgramSection event={event} />

        <GiftListSection event={event} />

        <MockRsvpForm maxAllowed={maxAllowed} />
      </div>
    </main>
  );
}
