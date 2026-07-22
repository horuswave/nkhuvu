import { EventData } from "@/types";

export default function MinimalHero({
  event,
  guestName,
}: {
  event: EventData & { themeConfig?: any };
  guestName: string;
}) {
  const textPrimary = "#171717";
  const textSecondary = "#737373";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Lato:wght@300;400&display=swap');

        @keyframes simpleFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .simple-fade { opacity: 0; animation: simpleFade 1.2s ease forwards; }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem 2rem",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div className="simple-fade" style={{ animationDelay: "0.3s" }}>
            <p
              style={{
                fontFamily: event.fontBody,
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: textSecondary,
                marginBottom: "3rem",
                fontWeight: 300,
              }}
            >
              Invitation
            </p>

            <h1
              style={{
                fontFamily: event.fontDisplay,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                color: textPrimary,
                lineHeight: 1.3,
                marginBottom: "2rem",
                letterSpacing: "-0.01em",
              }}
            >
              {event.coupleNames}
            </h1>

            <div
              style={{
                width: "1px",
                height: "60px",
                background: "#e5e5e5",
                margin: "0 auto 3rem",
              }}
            />

            <p
              style={{
                fontFamily: event.fontBody,
                fontSize: "0.95rem",
                color: textSecondary,
                lineHeight: 1.8,
                marginBottom: "3rem",
                fontWeight: 300,
              }}
            >
              {event.heroSubtitle || "request the pleasure of your company"}
            </p>

            {event.message && (
              <p
                style={{
                  fontFamily: event.fontBody,
                  fontSize: "0.9rem",
                  color: textPrimary,
                  lineHeight: 1.7,
                  marginBottom: "3rem",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                "{event.message}"
              </p>
            )}

            <div
              className="simple-fade"
              style={{
                animationDelay: "0.6s",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: event.fontBody,
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: textSecondary,
                  margin: 0,
                  fontWeight: 400,
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
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: textSecondary,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {event.time}
              </p>
            </div>
          </div>
        </div>

        {/* Minimal decorative line at bottom */}
        <div
          className="simple-fade"
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "2rem",
            right: "2rem",
            height: "1px",
            background: "#f5f5f5",
            animationDelay: "0.9s",
          }}
        />
      </section>
    </>
  );
}
