import React from "react";
import { KoreanHeader } from "./KoreanHeader";
import { KOREAN_COLORS } from "../../types";

interface EndScreenProps {
  readonly winnerId: string | null;
  readonly onRestart: () => void;
  readonly onMenu: () => void;
}

export function EndScreen({
  winnerId,
  onRestart,
  onMenu,
}: EndScreenProps): React.ReactElement {
  const isVictory = winnerId !== null;

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, #${KOREAN_COLORS.BLACK.toString(
      16
    ).padStart(6, "0")}, #${KOREAN_COLORS.DARK_BLUE.toString(16).padStart(
      6,
      "0"
    )})`,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    textAlign: "center",
  };

  const resultStyle: React.CSSProperties = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: isVictory
      ? `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`
      : `#${KOREAN_COLORS.TRADITIONAL_RED.toString(16).padStart(6, "0")}`,
    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
    marginBottom: "2rem",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "1rem 2rem",
    margin: "0.5rem",
    fontSize: "1.2rem",
    backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(
      6,
      "0"
    )}`,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      <KoreanHeader
        title="흑괘 무술 도장"
        subtitle="Black Trigram Martial Arts"
        level={2}
      />

      <div style={resultStyle}>
        {isVictory ? "승리! (Victory!)" : "패배! (Defeat!)"}
      </div>

      {winnerId && (
        <div
          style={{
            fontSize: "1.5rem",
            marginBottom: "2rem",
            opacity: 0.9,
          }}
        >
          승자: {winnerId}
          <br />
          <span style={{ fontSize: "1rem" }}>Winner: {winnerId}</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button
          style={buttonStyle}
          onClick={onRestart}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = `#${KOREAN_COLORS.CYAN.toString(
              16
            ).padStart(6, "0")}`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = `#${KOREAN_COLORS.DOJANG_BLUE.toString(
              16
            ).padStart(6, "0")}`;
          }}
        >
          다시 시작 (Restart)
        </button>

        <button
          style={buttonStyle}
          onClick={onMenu}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = `#${KOREAN_COLORS.ACCENT_BLUE.toString(
              16
            ).padStart(6, "0")}`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = `#${KOREAN_COLORS.DOJANG_BLUE.toString(
              16
            ).padStart(6, "0")}`;
          }}
        >
          메뉴로 돌아가기 (Return to Menu)
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          opacity: 0.6,
          fontSize: "0.9rem",
        }}
      >
        <p>무예의 길은 승부를 넘어선다</p>
        <p>The martial way transcends victory and defeat</p>
      </div>
    </div>
  );
}
