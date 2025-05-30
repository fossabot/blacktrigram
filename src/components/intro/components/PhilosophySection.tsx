import React from "react";
// import { Container } from "@pixi/react"; // Assuming Container is used
import { KoreanText } from "../../ui/base/KoreanText";
import { KOREAN_COLORS } from "../../../types";
import type { TextStyle } from "pixi.js";

interface PhilosophySectionProps {
  readonly onBack: () => void; // Keep if it will be used, otherwise remove
}

export function PhilosophySection({}: /* onBack, */ // Commented out if not used
PhilosophySectionProps): React.JSX.Element {
  return (
    <>
      <KoreanText
        text="팔괘 철학 (Trigram Philosophy)"
        anchor={{ x: 0.5, y: 0.5 }}
        style={
          {
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 32,
            fill: KOREAN_COLORS.GOLD, // Corrected casing
            fontStyle: "italic",
            fontWeight: "bold",
          } as Partial<TextStyle>
        }
      />
      <KoreanText
        text="각 괘는 우주의 근본적인 힘을 나타냅니다..."
        anchor={{ x: 0.5, y: 0.5 }}
        y={80}
        style={
          {
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 18,
            fill: KOREAN_COLORS.LIGHT_GREY, // Corrected casing, ensure LIGHT_GREY is in KOREAN_COLORS
            // wordWrap: true, // wordWrap is a PIXI.TextStyle property
            // wordWrapWidth: 700, // Example width
          } as Partial<TextStyle>
        }
      />
      {/* ... other philosophy text ... */}
      <KoreanText
        text="뒤로가기 (Back)"
        anchor={{ x: 0.5, y: 0.5 }}
        y={250}
        style={
          {
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 24,
            fill: KOREAN_COLORS.YELLOW, // Corrected casing, ensure YELLOW is in KOREAN_COLORS
          } as Partial<TextStyle>
        }
        // interactive={true} // Removed
        // pointertap={onBack} // Removed, if onBack is unused or handle click differently
      />
    </>
  );
}
