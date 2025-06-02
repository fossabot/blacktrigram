import React from "react";
import { KoreanHeader } from "./base/KoreanHeader";
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
  const isVictory = Boolean(winnerId);

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

  const resultColor = isVictory
    ? KOREAN_COLORS.GOLD
    : KOREAN_COLORS.TRADITIONAL_RED;

  return (
    <div style={containerStyle}>
      <KoreanHeader korean="경기 종료" subtitle="Match Complete" level={1} />

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <p
          style={{
            fontSize: "1.5rem",
            color: `#${resultColor.toString(16).padStart(6, "0")}`,
          }}
        >
          {isVictory
            ? "무술의 길에서 승리하였습니다"
            : "더 많은 수련이 필요합니다"}
        </p>
        <p style={{ fontSize: "1rem", opacity: 0.8 }}>
          {isVictory
            ? "You have achieved victory on the martial path"
            : "More training is needed"}
        </p>
      </div>

      <div style={{ marginTop: "3rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={onRestart}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(
              16
            ).padStart(6, "0")}`,
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          다시 시작 (Restart)
        </button>

        <button
          onClick={onMenu}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: `#${KOREAN_COLORS.ACCENT_BLUE.toString(
              16
            ).padStart(6, "0")}`,
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          메뉴 (Menu)
        </button>
      </div>
    </div>
  );
}
