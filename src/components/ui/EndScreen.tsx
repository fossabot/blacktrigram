import React from "react";
import type { EndScreenProps } from "../../types/components";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY_PRIMARY } from "../../types";

const endScreenStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: `linear-gradient(135deg, #${KOREAN_COLORS.DARK_BLUE.toString(
    16
  ).padStart(6, "0")}, #${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")})`,
  color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
  fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
  padding: "20px",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "3rem",
  marginBottom: "20px",
  color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 24px",
  margin: "10px",
  fontSize: "1.2rem",
  backgroundColor: `#${KOREAN_COLORS.TRADITIONAL_RED.toString(16).padStart(
    6,
    "0"
  )}`,
  color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
};

export function EndScreen({
  winnerId,
  onRestart,
  onMenu,
}: EndScreenProps): React.ReactElement {
  const isVictory = winnerId !== null;
  const titleText = isVictory ? "승리! (Victory!)" : "패배 (Defeat)";

  return (
    <div style={endScreenStyle}>
      <h1 style={titleStyle}>{titleText}</h1>

      {winnerId && (
        <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>
          승자: {winnerId === "player1" ? "플레이어 1" : "플레이어 2"}
        </p>
      )}

      <div>
        <button
          style={buttonStyle}
          onClick={onRestart}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = `#${KOREAN_COLORS.GOLD.toString(
              16
            ).padStart(6, "0")}`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = `#${KOREAN_COLORS.TRADITIONAL_RED.toString(
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
            e.currentTarget.style.backgroundColor = `#${KOREAN_COLORS.DOJANG_BLUE.toString(
              16
            ).padStart(6, "0")}`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = `#${KOREAN_COLORS.TRADITIONAL_RED.toString(
              16
            ).padStart(6, "0")}`;
          }}
        >
          메뉴로 (To Menu)
        </button>
      </div>
    </div>
  );
}
