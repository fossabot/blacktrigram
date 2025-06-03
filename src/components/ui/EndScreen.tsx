import React from "react";
import type { EndScreenProps } from "../../types";
import { KOREAN_COLORS } from "../../types";
import { KoreanText } from "./base/korean-text/KoreanText";

export function EndScreen({
  winnerId,
  onRestart,
  onMenu,
  loser,
  onGamePhaseChange,
  matchStats,
}: EndScreenProps): React.ReactElement {
  const isVictory = winnerId !== null;

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: `linear-gradient(135deg, #${KOREAN_COLORS.TRADITIONAL_BLUE.toString(
      16
    ).padStart(6, "0")} 0%, #${KOREAN_COLORS.BLACK.toString(16).padStart(
      6,
      "0"
    )} 100%)`,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "Noto Sans KR, Arial, sans-serif",
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <KoreanText
          korean={isVictory ? "승리" : "패배"}
          english={isVictory ? "VICTORY" : "DEFEAT"}
          size="xxlarge"
          weight={900}
          emphasis="glow"
          style={{
            marginBottom: "2rem",
            color: isVictory
              ? `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`
              : `#${KOREAN_COLORS.TRADITIONAL_RED.toString(16).padStart(
                  6,
                  "0"
                )}`,
          }}
        />

        {winnerId && (
          <KoreanText
            korean={`승자: ${winnerId}`}
            english={`Winner: ${winnerId.toUpperCase()}`}
            size="large"
            style={{ marginBottom: "1rem" }}
          />
        )}

        {loser && (
          <KoreanText
            korean={`패자: ${loser.name}`}
            english={`Defeated: ${loser.archetype.toUpperCase()}`}
            size="medium"
            style={{ marginBottom: "2rem", opacity: 0.7 }}
          />
        )}

        {matchStats && (
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              padding: "1.5rem",
              borderRadius: "8px",
              border: `1px solid #${KOREAN_COLORS.GOLD.toString(16).padStart(
                6,
                "0"
              )}`,
              marginBottom: "2rem",
            }}
          >
            <h3>경기 통계 (Match Statistics)</h3>
            {/* Add match statistics display here */}
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={onRestart}
            style={{
              padding: "1rem 2rem",
              backgroundColor: `#${KOREAN_COLORS.GOLD.toString(16).padStart(
                6,
                "0"
              )}`,
              color: `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`,
              border: "none",
              borderRadius: "4px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            다시 하기 (Restart)
          </button>

          <button
            onClick={onMenu}
            style={{
              padding: "1rem 2rem",
              backgroundColor: "transparent",
              color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
              border: `1px solid #${KOREAN_COLORS.WHITE.toString(16).padStart(
                6,
                "0"
              )}`,
              borderRadius: "4px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            메뉴 (Menu)
          </button>
        </div>
      </div>
    </div>
  );
}
