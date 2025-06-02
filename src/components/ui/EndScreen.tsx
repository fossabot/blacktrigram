import React from "react";
import type { EndScreenProps } from "../../types/components";
import { KOREAN_COLORS } from "../../types";

export function EndScreen({
  winnerId,
  onRestart,
  onMenu,
}: EndScreenProps): React.ReactElement {
  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "3rem",
    color: winnerId
      ? `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`
      : `#${KOREAN_COLORS.TRADITIONAL_RED.toString(16).padStart(6, "0")}`,
    marginBottom: "2rem",
    textAlign: "center",
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
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        {winnerId ? "승리! (Victory!)" : "패배! (Defeat!)"}
      </h1>

      <div>
        <button style={buttonStyle} onClick={onRestart}>
          다시 시작 (Restart)
        </button>
        <button style={buttonStyle} onClick={onMenu}>
          메뉴 (Menu)
        </button>
      </div>
    </div>
  );
}
