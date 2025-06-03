import React from "react";
import type { EndScreenProps } from "../../types/components";
import { KoreanText } from "./base/korean-text/KoreanText";
import { KOREAN_COLORS } from "../../types/constants";

export function EndScreen({
  winnerId,
  onRestart,
  onMenu,
  className = "",
  style = {},
}: EndScreenProps): JSX.Element {
  const isVictory = winnerId === "player1"; // Assume player1 is human player

  return (
    <div
      className={`end-screen ${className}`}
      style={{
        backgroundColor: `#${KOREAN_COLORS.TRADITIONAL_BLUE.toString(
          16
        ).padStart(6, "0")}`,
        padding: "2rem",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <div className="end-screen-header">
        {isVictory ? (
          <KoreanText
            korean="승리"
            english="Victory"
            variant="title"
            size="xxlarge"
            color={KOREAN_COLORS.DANCHEONG_GOLD}
          />
        ) : (
          <KoreanText
            korean="패배"
            english="Defeat"
            variant="title"
            size="xxlarge"
            color={KOREAN_COLORS.TRADITIONAL_RED}
          />
        )}
      </div>

      <div className="end-screen-message">
        {isVictory ? (
          <KoreanText
            korean="무술의 길에서 한 걸음 더 나아갔습니다"
            english="You have taken another step on the martial path"
            variant="body"
            size="large"
            color={KOREAN_COLORS.HANBOK_WHITE}
          />
        ) : (
          <KoreanText
            korean="패배는 성장의 기회입니다"
            english="Defeat is an opportunity for growth"
            variant="body"
            size="large"
            color={KOREAN_COLORS.HANBOK_WHITE}
          />
        )}
      </div>

      <div className="end-screen-philosophy">
        <KoreanText
          korean="무술은 끝없는 수련의 길입니다"
          english="Martial arts is the path of endless cultivation"
          variant="body"
          size="medium"
          color={KOREAN_COLORS.HANBOK_WHITE}
        />
      </div>

      <div className="end-screen-actions">
        <button
          onClick={onRestart}
          className="end-screen-btn primary"
          style={{
            margin: "0.5rem",
            padding: "1rem 2rem",
            backgroundColor: `#${KOREAN_COLORS.GEON_GOLD.toString(16).padStart(
              6,
              "0"
            )}`,
            color: `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`,
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          <KoreanText
            korean="다시 도전"
            english="Try Again"
            variant="body"
            size="medium"
          />
        </button>

        <button
          onClick={onMenu}
          className="end-screen-btn secondary"
          style={{
            margin: "0.5rem",
            padding: "1rem 2rem",
            backgroundColor: `#${KOREAN_COLORS.GAN_BROWN.toString(16).padStart(
              6,
              "0"
            )}`,
            color: `#${KOREAN_COLORS.HANBOK_WHITE.toString(16).padStart(
              6,
              "0"
            )}`,
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          <KoreanText
            korean="메뉴로"
            english="To Menu"
            variant="body"
            size="medium"
          />
        </button>
      </div>
    </div>
  );
}
