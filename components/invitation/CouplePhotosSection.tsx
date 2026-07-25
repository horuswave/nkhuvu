import { EventData } from "@/types";

export default function CouplePhotosSection({
  event,
}: {
  event: EventData & { themeConfig?: any };
}) {
  const photos = Array.isArray(event.couplePhotos) ? event.couplePhotos : [];
  
  if (photos.length === 0) {
    return null;
  }

  const isDark = event.backgroundStyle !== "LIGHT";
  const textPrimary = isDark ? "#f7f1e8" : "#201a17";
  const textSecondary = isDark ? "#d8cfc3" : "#6c6259";

  return (
    <section
      style={{
        padding: "5rem 1.5rem",
        backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#faf9f7",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: event.fontDisplay,
            fontSize: "2rem",
            color: textPrimary,
            textAlign: "center",
            marginBottom: "0.5rem",
            fontWeight: 400,
          }}
        >
          Our Journey
        </h2>
        <p
          style={{
            fontFamily: event.fontBody,
            fontSize: "0.9rem",
            color: textSecondary,
            textAlign: "center",
            marginBottom: "3rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Moments We Cherish
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {photos.map((url, index) => (
            <div
              key={index}
              style={{
                aspectRatio: "1",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: isDark
                  ? "0 4px 20px rgba(0,0,0,0.3)"
                  : "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <img
                src={url}
                alt={`Couple photo ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
