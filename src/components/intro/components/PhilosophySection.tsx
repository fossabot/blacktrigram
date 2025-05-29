import type { JSX } from "react";
import { KoreanText } from "../../ui/base/KoreanText";
import { KOREAN_COLORS } from "../../../types";

export function PhilosophySection(): JSX.Element {
  return (
    <pixiContainer x={window.innerWidth / 2} y={window.innerHeight - 120}>
      <KoreanText
        korean="🧘 도장에서 무예는 몸과 마음, 그리고 영혼의 조화이다"
        english="🥋 In the dojang, martial arts are the harmony of body, mind, and spirit"
        koreanStyle={{
          fontSize: 16,
          fill: KOREAN_COLORS.GRAY_MEDIUM,
          fontStyle: "italic",
          fontWeight: "300",
        }}
        englishStyle={{
          fontFamily: "serif",
          fontSize: 12,
          fill: KOREAN_COLORS.GRAY_DARK,
          fontStyle: "italic",
        }}
      />
    </pixiContainer>
  );
}
