import { EventData } from "@/types";

export default function OutonoHero({
  event,
  guestName,
}: {
  event: EventData & { themeConfig?: any };
  guestName?: string;
}) {
  const bgImg =
    event.backgroundImage || "https://picsum.photos/id/1015/2000/1200";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .hero-animate-1 { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s; }
        .hero-animate-2 { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.4s; }
        .hero-animate-3 { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.6s; }
        .hero-animate-4 { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.8s; }
        .hero-float { animation: floatSlow 6s ease-in-out infinite; }
      `}</style>

      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url('${bgImg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Layer 1: Warm autumn color-tint gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(44, 24, 16, 0.65) 0%, rgba(20, 15, 12, 0.75) 50%, rgba(10, 8, 6, 0.88) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* Layer 2: Vignette + Golden accent highlights */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 30%, rgba(220, 150, 90, 0.15) 0%, rgba(0, 0, 0, 0.6) 80%)",
          }}
        />

        {/* Hero Card Container */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "90%",
            maxWidth: "850px",
            padding: "3.5rem 2rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.45)",
          }}
        >
          {/* Subtle Decorative Line */}
          {/* <div
            className="hero-animate-1"
            style={{
              opacity: 0,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: "30px",
                height: "1px",
                background: "rgba(255,255,255,0.4)",
              }}
            />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: event.primaryColor || "#e2b17a",
                fontWeight: 500,
              }}
            >
              { || "Save The Date"}
            </span>
            <span
              style={{
                width: "30px",
                height: "1px",
                background: "rgba(255,255,255,0.4)",
              }}
            />
          </div> */}

          {/* Main Title */}
          <h1
            className="hero-animate-2"
            style={{
              opacity: 0,
              fontFamily: event.fontDisplay || "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#ffffff",
              margin: 0,
              textShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            {event.title}
          </h1>

          {/* Couple Names / Secondary Highlight */}
          <p
            className="hero-animate-3"
            style={{
              opacity: 0,
              fontFamily: event.fontDisplay || "'Cormorant Garamond', serif",
              fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.2,
              color: event.primaryColor || "#f3d2a2",
              margin: "1rem 0 0",
              textShadow: "0 8px 24px rgba(0,0,0,0.35)",
            }}
          >
            {event.coupleNames}
          </p>

          {/* Optional Personalization Tag */}
          {guestName && (
            <div
              className="hero-animate-4"
              style={{
                opacity: 0,
                marginTop: "2rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "50px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.85rem",
                  color: "#e0e0e0",
                  letterSpacing: "0.05em",
                }}
              >
                Convidado Especial: <strong>{guestName}</strong>
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
