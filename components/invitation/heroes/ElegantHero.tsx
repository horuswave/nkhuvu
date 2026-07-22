import { EventData } from "@/types";

export default function ElegantHero({
  event,
  guestName,
}: {
  event: EventData & { themeConfig?: any };
  guestName: string;
}) {
  const isDark = event.backgroundStyle !== "LIGHT";
  const textPrimary = isDark ? "#f7f1e8" : "#831843";
  const textSecondary = isDark ? "#d8cfc3" : "#be185d";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Nunito:wght@300;400;500&display=swap');

        @keyframes elegantFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes petalFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .elegant-fade { opacity: 0; animation: elegantFade 1s ease forwards; }
        .petal { animation: petalFloat 4s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, ${event.primaryColor} 0%, #fff 50%, ${event.primaryColor} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "6rem 2rem",
          background: isDark
            ? `linear-gradient(180deg, ${event.accentColor} 0%, #581c87 100%)`
            : `linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)`,
        }}
      >
        {/* Floating decorative petals */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              position: "absolute",
              width: "30px",
              height: "30px",
              background: `${event.primaryColor}15`,
              borderRadius: "50% 0 50% 50%",
              top: `${10 + i * 15}%`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "700px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div className="elegant-fade" style={{ animationDelay: "0.2s" }}>
            {/* Decorative top element */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: event.primaryColor,
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  border: `1px solid ${event.primaryColor}`,
                  borderRadius: "50%",
                  transform: "rotate(45deg)",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: event.primaryColor,
                  opacity: 0.5,
                }}
              />
            </div>

            <p
              style={{
                fontFamily: event.fontBody,
                fontSize: "0.8rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: event.primaryColor,
                marginBottom: "2rem",
                fontWeight: 400,
              }}
            >
              With love and joy
            </p>

            <h1
              className="shimmer-text"
              style={{
                fontFamily: event.fontDisplay,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 500,
                lineHeight: 1.2,
                marginBottom: "2rem",
                letterSpacing: "0.02em",
              }}
            >
              {event.coupleNames}
            </h1>

            <p
              style={{
                fontFamily: event.fontBody,
                fontSize: "1.1rem",
                color: textSecondary,
                lineHeight: 1.8,
                marginBottom: "2.5rem",
                fontWeight: 300,
              }}
            >
              {event.heroSubtitle || "invite you to celebrate their love"}
            </p>

            {event.message && (
              <div
                style={{
                  padding: "2rem",
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.6)",
                  borderRadius: "20px",
                  marginBottom: "2.5rem",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${event.primaryColor}20`,
                }}
              >
                <p
                  style={{
                    fontFamily: event.fontBody,
                    fontSize: "0.9rem",
                    color: textSecondary,
                    margin: 0,
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}
                >
                  Dearest {guestName},
                  <br />
                  <br />
                  {event.message}
                </p>
              </div>
            )}

            {/* Date and time */}
            <div
              className="elegant-fade"
              style={{
                animationDelay: "0.5s",
                display: "inline-flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1.5rem 2.5rem",
                borderRadius: "50px",
                background: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.8)",
                border: `1px solid ${event.primaryColor}30`,
              }}
            >
              <p
                style={{
                  fontFamily: event.fontDisplay,
                  fontSize: "1.3rem",
                  color: textPrimary,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p
                style={{
                  fontFamily: event.fontBody,
                  fontSize: "0.85rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: event.primaryColor,
                  margin: 0,
                }}
              >
                {event.time}
              </p>
            </div>

            {/* Decorative bottom element */}
            <div
              className="elegant-fade"
              style={{
                animationDelay: "0.7s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "3rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: event.primaryColor,
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  border: `1px solid ${event.primaryColor}`,
                  borderRadius: "50%",
                  transform: "rotate(45deg)",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: event.primaryColor,
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div
          className="elegant-fade"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            animationDelay: "1s",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "40px",
              border: `2px solid ${event.primaryColor}40`,
              borderRadius: "12px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "8px",
                background: event.primaryColor,
                borderRadius: "2px",
                position: "absolute",
                top: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                animation: "elegantFade 1.5s ease infinite",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
