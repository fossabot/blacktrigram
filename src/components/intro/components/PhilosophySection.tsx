import type { JSX } from "react";
import { KoreanText } from "../../ui/base/KoreanText";

const KOREAN_COLORS = {
  GRAY_MEDIUM: 0x6c757d,
  GRAY_DARK: 0x2c2c2c,
} as const;

interface PhilosophySectionProps {
  readonly x: number;
  readonly y: number;
}

export function PhilosophySection({
  x,
  y,
}: PhilosophySectionProps): JSX.Element {
  return (
    <pixiContainer x={x} y={y}>
      <KoreanText
        text="🧘 도장에서 무예는 몸과 마음, 그리고 영혼의 조화이다"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: KOREAN_COLORS.GRAY_MEDIUM,
          fontStyle: "italic",
          fontWeight: "300",
        }}
      />
      <KoreanText
        text="In the dojang, martial arts are the harmony of body, mind, and spirit"
        anchor={{ x: 0.5, y: 0.5 }}
        y={35}
        style={{
          fontFamily: "Arial",
          fontSize: 14,
          fill: KOREAN_COLORS.GRAY_DARK,
          fontStyle: "italic",
        }}
      />
    </pixiContainer>
  );
}
