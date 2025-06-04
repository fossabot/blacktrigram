import React from "react";
import { useAudio } from "../../audio/AudioProvider"; // Fix: Use AudioProvider
import { KOREAN_COLORS } from "../../types";
import { KoreanText } from "./base/korean-text";

interface EndScreenProps {
  readonly winner: string;
  readonly onReturnToMenu: () => void;
  readonly onPlayAgain?: () => void;
  readonly finalScore?: {
    player1: number;
    player2: number;
  };
}

export function EndScreen({
  winner,
  onReturnToMenu,
  onPlayAgain,
  finalScore,
}: EndScreenProps): React.JSX.Element {
  const audio = useAudio(); // Now properly typed

  React.useEffect(() => {
    // Play victory or defeat sound based on winner
    if (winner) {
      audio.playSFX("victory");
    } else {
      audio.playSFX("defeat");
    }
  }, [winner, audio]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #${KOREAN_COLORS.BLACK.toString(
          16
        ).padStart(6, "0")} 0%, #${KOREAN_COLORS.DOJANG_BLUE.toString(
          16
        ).padStart(6, "0")} 100%)`,
        color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Noto Sans KR, Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          border: `2px solid #${KOREAN_COLORS.GOLD.toString(16).padStart(
            6,
            "0"
          )}`,
          borderRadius: "12px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <KoreanText
          korean="경기 종료"
          english="Match Finished"
          size="xlarge"
          weight="bold"
          color={`#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`}
        />

        <div style={{ margin: "2rem 0" }}>
          <KoreanText
            korean={`승자: ${winner}`}
            english={`Winner: ${winner}`}
            size="large"
            weight="semibold"
            color={`#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`}
          />
        </div>

        {finalScore && (
          <div style={{ margin: "1rem 0" }}>
            <div>
              Score: {finalScore.player1} - {finalScore.player2}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <button
            onClick={onReturnToMenu}
            style={{
              padding: "1rem 2rem",
              backgroundColor: `#${KOREAN_COLORS.TRADITIONAL_RED.toString(
                16
              ).padStart(6, "0")}`,
              color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              fontFamily: "Noto Sans KR, Arial, sans-serif",
            }}
            onMouseEnter={() => audio.playSFX("menu_hover")}
            onClick={() => {
              audio.playSFX("menu_select");
              onReturnToMenu();
            }}
          >
            메인 메뉴 (Main Menu)
          </button>

          {onPlayAgain && (
            <button
              onClick={onPlayAgain}
              style={{
                padding: "1rem 2rem",
                backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(
                  16
                ).padStart(6, "0")}`,
                color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
                fontFamily: "Noto Sans KR, Arial, sans-serif",
              }}
              onMouseEnter={() => audio.playSFX("menu_hover")}
              onClick={() => {
                audio.playSFX("menu_select");
                onPlayAgain();
              }}
            >
              다시 플레이 (Play Again)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EndScreen;
