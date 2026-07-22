import { EventData } from "@/types";

export default function ModernHero({
  event,
  guestName,
}: {
  event: EventData & { themeConfig?: any };
  guestName: string;
}) {
  const isDark = event.backgroundStyle !== "LIGHT";
  const textPrimary = isDark ? "#f7f1e8" : "#0f172a";
  const textSecondary = isDark ? "#d8cfc3" : "#64748b";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=DM+Sans:wght@400;500&display=swap');

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .slide-left { opacity: 0; animation: slideInLeft 0.8s ease forwards; }
        .slide-right { opacity: 0; animation: slideInRight 0.8s ease forwards; }
        .fade-up { opacity: 0; animation: fadeInUp 0.6s ease forwards; }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left side - Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem 3rem",
            background: isDark
              ? `linear-gradient(135deg, ${event.accentColor} 0%, #1e293b 100%)`
              : "#ffffff",
          }}
        >
          <div className="slide-left" style={{ animationDelay: "0.2s" }}>
            <p
              style={{
                fontFamily: event.fontBody,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: event.primaryColor,
                marginBottom: "1.5rem",
                fontWeight: 500,
              }}
            >
              Wedding Invitation
            </p>

            <h1
              style={{
                fontFamily: event.fontDisplay,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 600,
                color: textPrimary,
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              {event.coupleNames}
            </h1>

            <div
              style={{
                width: "60px",
                height: "3px",
                background: event.primaryColor,
                marginBottom: "2rem",
              }}
            />

            <p
              style={{
                fontFamily: event.fontBody,
                fontSize: "1rem",
                color: textSecondary,
                lineHeight: 1.6,
                marginBottom: "2rem",
                maxWidth: "400px",
              }}
            >
              {event.heroSubtitle || "We invite you to celebrate our special day"}
            </p>

            {event.message && (
              <div
                style={{
                  padding: "1.5rem",
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "#f8fafc",
                  borderLeft: `3px solid ${event.primaryColor}`,
                  marginBottom: "2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: event.fontBody,
                    fontSize: "0.85rem",
                    color: textSecondary,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ fontWeight: 500, color: textPrimary }}>
                    Dear {guestName},
                  </span>
                  <br />
                  {event.message}
                </p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
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
                    fontWeight: 500,
                  }}
                >
                  Date
                </p>
                <p
                  style={{
                    fontFamily: event.fontDisplay,
                    fontSize: "1.1rem",
                    color: textPrimary,
                    margin: 0,
                    fontWeight: 500,
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
                  height: "40px",
                  background: isDark ? "#334155" : "#e2e8f0",
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
                    fontWeight: 500,
                  }}
                >
                  Time
                </p>
                <p
                  style={{
                    fontFamily: event.fontDisplay,
                    fontSize: "1.1rem",
                    color: textPrimary,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {event.time}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Visual element */}
        <div
          className="slide-right"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 3rem",
            background: isDark
              ? "#0f172a"
              : `linear-gradient(135deg, ${event.accentColor}22 0%, ${event.primaryColor}11 100%)`,
            animationDelay: "0.4s",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              aspectRatio: "1",
              position: "relative",
            }}
          >
            {/* Geometric decoration */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: `2px solid ${event.primaryColor}`,
                transform: "rotate(45deg)",
                opacity: 0.3,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "20px",
                border: `1px solid ${event.primaryColor}`,
                transform: "rotate(45deg)",
                opacity: 0.2,
              }}
            />

            {/* Center content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: event.fontDisplay,
                  fontSize: "clamp(3rem, 8vw, 5rem)",
                  fontWeight: 600,
                  color: event.primaryColor,
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                &
              </p>
              <p
                style={{
                  fontFamily: event.fontBody,
                  fontSize: "0.8rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: textSecondary,
                  marginTop: "1rem",
                  margin: "1rem 0 0 0",
                }}
              >
                Forever
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="fade-up"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            animationDelay: "1s",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: event.fontBody,
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: textSecondary,
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "20px",
              height: "30px",
              border: `2px solid ${event.primaryColor}`,
              borderRadius: "10px",
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
                top: "6px",
                left: "50%",
                transform: "translateX(-50%)",
                animation: "fadeInUp 1.5s ease infinite",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
