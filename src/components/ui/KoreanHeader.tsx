import React from "react";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../types";

export interface KoreanHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly currentRound?: number;
  readonly timeRemaining?: number;
}

export function KoreanHeader({
  title,
  subtitle,
  currentRound,
  timeRemaining,
}: KoreanHeaderProps): React.ReactElement {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header
      style={{
        background: `linear-gradient(90deg, ${KOREAN_COLORS.BLACK}, ${KOREAN_COLORS.DARK_BLUE})`,
        padding: "1rem 2rem",
        borderBottom: `2px solid ${KOREAN_COLORS.GOLD}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: KOREAN_FONT_FAMILY,
      }}
    >
      <div>
        <h1
          style={{
            color: KOREAN_COLORS.GOLD,
            fontSize: "1.8rem",
            margin: 0,
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              color: KOREAN_COLORS.WHITE,
              fontSize: "1rem",
              margin: "0.25rem 0 0 0",
              opacity: 0.9,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ textAlign: "right" }}>
        {currentRound !== undefined && (
          <div
            style={{
              color: KOREAN_COLORS.CYAN,
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            라운드 {currentRound}
          </div>
        )}
        {timeRemaining !== undefined && (
          <div
            style={{
              color:
                timeRemaining <= 10
                  ? KOREAN_COLORS.CRITICAL_RED
                  : KOREAN_COLORS.WHITE,
              fontSize: "1.5rem",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            {formatTime(timeRemaining)}
          </div>
        )}
      </div>
    </header>
  );
}

export default KoreanHeader;
