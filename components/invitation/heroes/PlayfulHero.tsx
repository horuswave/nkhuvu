import { EventData } from "@/types";

export default function PlayfulHero({
  event,
  guestName,
}: {
  event: EventData & { themeConfig?: any };
  guestName: string;
}) {
  const isDark = event.backgroundStyle !== "LIGHT";
  const textPrimary = isDark ? "#f7f1e8" : "#1f2937";
  const textSecondary = isDark ? "#d8cfc3" : "#6b7280";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Jost:wght@400;500;600&display=swap');

        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3) translateY(-50px); }
          50% { transform: scale(1.05) translateY(0); }
          70% { transform: scale(0.9) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes colorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(0); }
          80% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

        .bounce-in { opacity: 0; animation: bounceIn 0.8s ease forwards; }
        .wiggle { animation: wiggle 2s ease-in-out infinite; }
        .pop-in { opacity: 0; animation: popIn 0.5s ease forwards; }
        .rainbow-bg {
          background: linear-gradient(90deg, ${event.primaryColor}, ${event.accentColor}, ${event.primaryColor});
          background-size: 200% 200%;
          animation: colorShift 3s ease infinite;
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
          padding: "5rem 2rem",
          background: isDark
            ? `linear-gradient(135deg, ${event.accentColor} 0%, #4c1d95 100%)`
            : `linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%)`,
        }}
      >
        {/* Playful background shapes */}
        <div
          className="wiggle"
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            background: `${event.primaryColor}20`,
            borderRadius: "50%",
            top: "10%",
            left: "5%",
          }}
        />
        <div
          className="wiggle"
          style={{
            position: "absolute",
            width: "150px",
            height: "150px",
            background: `${event.accentColor}20`,
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            bottom: "15%",
            right: "10%",
          }}
        />
        <div
          className="wiggle"
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            background: `${event.primaryColor}15`,
            borderRadius: "50%",
            top: "60%",
            left: "15%",
          }}
        />

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "650px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div className="bounce-in" style={{ animationDelay: "0.2s" }}>
            {/* Fun badge */}
            <div
              className="rainbow-bg"
              style={{
                display: "inline-block",
                padding: "0.5rem 1.5rem",
                borderRadius: "50px",
                marginBottom: "2rem",
              }}
            >
              <span
                style={{
                  fontFamily: event.fontBody,
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: isDark ? "#fff" : "#1f2937",
                  fontWeight: 600,
                }}
              >
                🎉 You're Invited! 🎉
              </span>
            </div>

            <h1
              style={{
                fontFamily: event.fontDisplay,
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 600,
                color: textPrimary,
                lineHeight: 1.2,
                marginBottom: "1.5rem",
                textShadow: isDark ? "0 0 30px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {event.coupleNames}
            </h1>

            <p
              style={{
                fontFamily: event.fontBody,
                fontSize: "1.2rem",
                color: textSecondary,
                lineHeight: 1.6,
                marginBottom: "2rem",
                fontWeight: 400,
              }}
            >
              {event.heroSubtitle || "are getting married!"}
            </p>

            {event.message && (
              <div
                className="pop-in"
                style={{
                  animationDelay: "0.4s",
                  padding: "1.5rem 2rem",
                  background: isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.8)",
                  borderRadius: "20px",
                  marginBottom: "2rem",
                  transform: "rotate(-1deg)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                <p
                  style={{
                    fontFamily: event.fontBody,
                    fontSize: "1rem",
                    color: textSecondary,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  Hey {guestName}! 👋
                  <br />
                  {event.message}
                </p>
              </div>
            )}

            {/* Fun date card */}
            <div
              className="pop-in"
              style={{
                animationDelay: "0.6s",
                display: "inline-flex",
                gap: "1rem",
                padding: "1.5rem 2.5rem",
                borderRadius: "30px",
                background: isDark
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(255,255,255,0.9)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                transform: "rotate(2deg)",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: event.fontBody,
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: event.primaryColor,
                    margin: "0 0 0.5rem 0",
                    fontWeight: 600,
                  }}
                >
                  📅 Save the Date
                </p>
                <p
                  style={{
                    fontFamily: event.fontDisplay,
                    fontSize: "1.4rem",
                    color: textPrimary,
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div
                style={{
                  width: "1px",
                  background: isDark ? "rgba(255,255,255,0.2)" : "#e5e7eb",
                }}
              />

              <div>
                <p
                  style={{
                    fontFamily: event.fontBody,
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: event.primaryColor,
                    margin: "0 0 0.5rem 0",
                    fontWeight: 600,
                  }}
                >
                  ⏰ Time
                </p>
                <p
                  style={{
                    fontFamily: event.fontDisplay,
                    fontSize: "1.4rem",
                    color: textPrimary,
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {event.time}
                </p>
              </div>
            </div>

            {/* Fun decorative elements */}
            <div
              className="pop-in"
              style={{
                animationDelay: "0.8s",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              <span style={{ fontSize: "2rem" }}>✨</span>
              <span style={{ fontSize: "2rem" }}>🎊</span>
              <span style={{ fontSize: "2rem" }}>💕</span>
              <span style={{ fontSize: "2rem" }}>🎈</span>
              <span style={{ fontSize: "2rem" }}>✨</span>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div
          className="bounce-in"
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: event.fontBody,
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: textSecondary,
                fontWeight: 500,
              }}
            >
              Let's Party! ↓
            </span>
            <div
              style={{
                width: "30px",
                height: "50px",
                border: `3px solid ${event.primaryColor}`,
                borderRadius: "15px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "10px",
                  background: event.primaryColor,
                  borderRadius: "3px",
                  position: "absolute",
                  top: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  animation: "bounceIn 1s ease infinite",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
