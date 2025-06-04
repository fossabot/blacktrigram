import React from "react";
import { KoreanText } from "./base/korean-text";
import type { EndScreenProps } from "../../types/components";

/**
 * End Screen Component for victory/defeat display
 */
export function EndScreen({
  winner,
  onRestart,
  onMenu,
}: EndScreenProps): React.JSX.Element {
  const isVictory = winner !== null;

  return (
    <div
      className="end-screen"
      style={{
        minHeight: "100vh",
        background: isVictory
          ? "linear-gradient(135deg, #001100 0%, #003300 100%)"
          : "linear-gradient(135deg, #110000 0%, #330000 100%)",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <KoreanText
          korean={isVictory ? "승리" : "패배"}
          english={isVictory ? "Victory" : "Defeat"}
          size="xxlarge"
          weight="bold"
          color={isVictory ? "#00ff00" : "#ff0000"}
          align="center"
        />

        {winner && (
          <div style={{ marginTop: "1rem" }}>
            <KoreanText
              korean={`우승자: ${winner}`}
              english={`Winner: ${winner}`}
              size="large"
              align="center"
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            background: "rgba(0, 255, 255, 0.2)",
            border: "2px solid #00ffff",
            color: "#00ffff",
            padding: "1rem 2rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1.1rem",
            minWidth: "150px",
          }}
          onClick={onMenu}
        >
          <KoreanText
            korean="메뉴로"
            english="To Menu"
            size="medium"
            align="center"
          />
        </button>

        <button
          style={{
            background: "rgba(255, 215, 0, 0.2)",
            border: "2px solid #ffd700",
            color: "#ffd700",
            padding: "1rem 2rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1.1rem",
            minWidth: "150px",
          }}
          onClick={onRestart}
        >
          <KoreanText
            korean="다시 시작"
            english="Play Again"
            size="medium"
            align="center"
          />
        </button>
      </div>

      <div style={{ marginTop: "3rem", textAlign: "center", opacity: 0.7 }}>
        <KoreanText
          korean="무술의 정신은 끝없는 수련에 있다"
          english="The spirit of martial arts lies in endless practice"
          size="medium"
          align="center"
        />
      </div>
    </div>
  );
}

export default EndScreen;
