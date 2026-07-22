"use client";

import { useState } from "react";

interface EnvelopeOpeningProps {
  coupleNames?: string;
  weddingDate?: string;
  onOpen?: () => void;
  onGiftClick?: () => void;
  onLiveClick?: () => void;
}

function getInitials(coupleNames: string): string {
  const parts = coupleNames
    .split(/\s*(?:&|\+|,|\bx\b|\be\b|\band\b)\s*/i)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return parts
      .slice(0, 2)
      .map((p) => p.charAt(0).toUpperCase())
      .join(" & ");
  }

  // No recognizable separator — fall back to first/last word of a single string
  const words = coupleNames.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0].charAt(0).toUpperCase()} & ${words[words.length - 1]
      .charAt(0)
      .toUpperCase()}`;
  }

  return coupleNames.trim().slice(0, 2).toUpperCase() || "♥";
}

export default function EnvelopeOpening({
  coupleNames = "E & V",
  weddingDate = "10.05.2025",
  onOpen = () => {},
  onGiftClick = () => {},
  onLiveClick = () => {},
}: EnvelopeOpeningProps) {
  const [isOpen, setIsOpen] = useState(false);

  const initials = getInitials(coupleNames);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        onOpen();
      }, 1000);
    }
  };

  if (isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Cinzel:wght@400;500;600&display=swap');

        @keyframes envelopeFadeOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.06); }
        }

        @keyframes flapLift {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-58deg); }
        }

        @keyframes contentSink {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }

        .envelope-wrapper {
          perspective: 1400px;
        }

        .envelope-closing {
          animation: envelopeFadeOut 0.85s cubic-bezier(0.4, 0, 0.2, 1) 0.35s forwards;
        }

        .flap-top-open {
          animation: flapLift 0.55s cubic-bezier(0.6, 0, 0.4, 1) forwards;
        }

        .content-closing {
          animation: contentSink 0.4s ease forwards;
        }

        .seam-glow {
          animation: shimmer 3.4s ease-in-out infinite;
        }

        .action-button {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(138, 109, 63, 0.28);
          background: linear-gradient(135deg, #b08d57 0%, #8a6d3f 100%) !important;
          color: #fbf7ef !important;
        }

        .action-button:hover .action-icon {
          filter: brightness(0) invert(1);
        }

        .action-button:active {
          transform: translateY(0);
        }

        .prompt-hint:hover .chevron-icon {
          transform: translateY(2px);
        }

        .chevron-icon {
          transition: transform 0.3s ease;
        }
      `}</style>

      <div
        className="envelope-wrapper"
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          overflow: "hidden",
          fontFamily: "'Cormorant Garamond', serif",
          userSelect: "none",
        }}
      >
        <div
          className={isOpen ? "envelope-closing" : ""}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, #fbf7ef 0%, #f1e9d8 62%, #e4d6b8 100%)",
          }}
        />

        {/* Faint linen texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.5,
            background:
              "repeating-linear-gradient(115deg, rgba(139,109,63,0.03) 0px, rgba(139,109,63,0.03) 1px, transparent 1px, transparent 4px)",
            zIndex: 1,
          }}
        />

        {/* Top Flap */}
        <div
          className={isOpen ? "flap-top-open" : ""}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "55%",
            background:
              "linear-gradient(178deg, #fefcf7 0%, #f1e7d2 78%, #e6d7b8 100%)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            filter: "drop-shadow(0 18px 16px rgba(90, 70, 40, 0.16))",
            zIndex: 3,
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* gold hairline trim tracing the fold */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "transparent",
              boxShadow: "inset 0 0 0 1000px transparent",
              border: "1px solid rgba(176,141,87,0.35)",
              borderTop: "none",
            }}
          />
        </div>

        {/* Bottom Flap */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background:
              "linear-gradient(2deg, #fefcf7 0%, #f1e7d2 78%, #e6d7b8 100%)",
            clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
            filter: "drop-shadow(0 -12px 14px rgba(90, 70, 40, 0.1))",
            zIndex: 2,
          }}
        />

        {/* Seam glow where the two flaps meet */}
        <div
          className="seam-glow"
          style={{
            position: "absolute",
            top: "calc(45% - 1px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "180px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(176,141,87,0.65) 50%, transparent 100%)",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />

        {/* Central Content Column */}
        <div
          className={isOpen ? "content-closing" : ""}
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "360px",
            padding: "0 20px",
          }}
        >
          {/* Top Instruction Prompt */}
          <div
            onClick={handleClick}
            className="prompt-hint"
            style={{
              cursor: "pointer",
              textAlign: "center",
              marginBottom: "22px",
            }}
          >
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.72rem",
                letterSpacing: "0.4em",
                fontWeight: 500,
                color: "#8a6d3f",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Clique Abaixo
            </p>

            <svg
              className="chevron-icon"
              width="15"
              height="9"
              viewBox="0 0 16 10"
              fill="none"
              style={{ opacity: 0.8, marginTop: "8px" }}
            >
              <path
                d="M1 1L8 8L15 1"
                stroke="#b08d57"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Gilded Wax Seal */}
          <div
            onClick={handleClick}
            style={{
              cursor: "pointer",
              width: "94px",
              height: "94px",
              borderRadius: "50% 46% 49% 51% / 49% 51% 46% 50%",
              background:
                "radial-gradient(circle at 33% 30%, #f6e8c8 0%, #d9b871 38%, #b08d57 72%, #8a6d3f 100%)",
              boxShadow: `
                0 14px 26px rgba(120, 92, 46, 0.32),
                inset 0 2px 4px rgba(255,248,230,0.85),
                inset 0 -4px 8px rgba(90, 66, 30, 0.45)
              `,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "6px 0 20px 0",
              border: "1px solid rgba(255,248,230,0.5)",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                border: "1px solid rgba(90,66,30,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.7rem",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#4a3820",
                  textShadow: "0 1px 1px rgba(255,248,230,0.6)",
                  display: "inline-block",
                  textAlign: "center",
                  lineHeight: 1,
                  transform: "translateX(2px)",
                }}
              >
                {initials}
              </span>
            </div>
          </div>

          {/* Full Names */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "1.5rem",
              color: "#3b2f22",
              letterSpacing: "0.03em",
              margin: "0 0 16px 0",
              textAlign: "center",
              lineHeight: 1.3,
              maxWidth: "280px",
            }}
          >
            {coupleNames}
          </h1>

          {/* Flourish Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #b08d57)",
              }}
            />
            <span
              style={{
                width: "5px",
                height: "5px",
                transform: "rotate(45deg)",
                background: "#b08d57",
                display: "inline-block",
              }}
            />
            <span
              style={{
                width: "28px",
                height: "1px",
                background: "linear-gradient(90deg, #b08d57, transparent)",
              }}
            />
          </div>

          {/* Date Display */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.1rem",
              fontWeight: 400,
              color: "#3b2f22",
              letterSpacing: "0.12em",
              margin: "0 0 34px 0",
            }}
          >
            {weddingDate}
          </h2>

          {/* Pill Action Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "13px",
              width: "100%",
              maxWidth: "210px",
            }}
          >
            {/* <button
              className="action-button"
              onClick={(e) => {
                e.stopPropagation();
                onGiftClick();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
                padding: "12px 22px",
                backgroundColor: "#fefcf7",
                border: "1px solid rgba(176,141,87,0.55)",
                borderRadius: "30px",
                boxShadow: "0 4px 15px rgba(90,66,30,0.08)",
                cursor: "pointer",
                color: "#4a3820",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              <span className="action-icon" style={{ fontSize: "0.9rem" }}>
                🎁
              </span>
              Presentes
            </button> */}

            {/* <button
              className="action-button"
              onClick={(e) => {
                e.stopPropagation();
                onLiveClick();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
                padding: "12px 22px",
                backgroundColor: "#fefcf7",
                border: "1px solid rgba(176,141,87,0.55)",
                borderRadius: "30px",
                boxShadow: "0 4px 15px rgba(90,66,30,0.08)",
                cursor: "pointer",
                color: "#4a3820",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              <span className="action-icon" style={{ fontSize: "0.8rem" }}>
                📷
              </span>
              Live
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
