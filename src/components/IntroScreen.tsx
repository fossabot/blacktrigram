import React from "react";
import type { PlayerArchetype, TrigramStance } from "../types";
import { KoreanText } from "./ui/base/korean-text";
import { KOREAN_COLORS, ARCHETYPE_NAMES } from "../types/constants";

export interface IntroScreenProps {
  readonly onNext: () => void;
}

export function IntroScreen({ onNext }: IntroScreenProps): React.JSX.Element {
  return (
    <div
      style={{
        padding: "2rem",
        background:
          "linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)",
        color: "#ffffff",
        minHeight: "100vh",
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <KoreanText
          korean="흑괘"
          english="Black Trigram"
          size="xlarge"
          style={{
            color: `#${KOREAN_COLORS.GOLD.toString(16)}`,
            marginBottom: "2rem",
          }}
        />

        <KoreanText
          korean="한국 무술의 진수를 경험하세요"
          english="Experience the Essence of Korean Martial Arts"
          size="large"
          style={{ marginBottom: "3rem" }}
        />

        <div style={{ marginBottom: "2rem" }}>
          <h3>무도의 길 (The Way of Martial Arts)</h3>
          <p>팔괘의 힘을 통해 진정한 무사의 정신을 깨우세요.</p>
          <p>
            Awaken the true warrior spirit through the power of the Eight
            Trigrams.
          </p>
        </div>

        <button
          onClick={onNext}
          style={{
            padding: "1rem 2rem",
            background: `#${KOREAN_COLORS.GOLD.toString(16)}`,
            color: "#000000",
            border: "none",
            borderRadius: "4px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            fontFamily: '"Noto Sans KR", Arial, sans-serif',
          }}
        >
          시작하기 (Begin)
        </button>
      </div>
    </div>
  );
}
