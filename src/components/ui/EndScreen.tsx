import React from "react";
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
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    textAlign: "center",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "3rem",
    color: winnerId
      ? `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`
      : `#${KOREAN_COLORS.TRADITIONAL_RED.toString(16).padStart(6, "0")}`,
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
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        {winnerId ? "승리! (Victory!)" : "무승부 (Draw)"}
      </h1>

      {winnerId && (
        <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
          승자: {winnerId}
        </p>
      )}

      <div>
        <button style={buttonStyle} onClick={onRestart}>
          다시 시작 (Restart)
        </button>
        <button style={buttonStyle} onClick={onMenu}>
          메뉴로 (Menu)
        </button>
      </div>
    </div>
  );
}
