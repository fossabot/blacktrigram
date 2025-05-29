import type { JSX } from "react";
import { KoreanText } from "../../ui/base/KoreanText";
import { KOREAN_COLORS } from "../../../types";

export function ControlsSection(): JSX.Element {
  return (
    <pixiContainer x={window.innerWidth / 2} y={window.innerHeight - 60}>
      <KoreanText
        korean="🎮 ← → 또는 A/D 선택 | ⚡ 스페이스/엔터 확인 | 🎯 1-대련, 2-수련"
        english="🎮 Arrow Keys/A-D to Select | ⚡ Space/Enter to Confirm | 🏃 Alt for Training"
        koreanStyle={{
          fontSize: 11,
          fill: 0x555555,
          letterSpacing: 1,
        }}
        englishStyle={{
          fontFamily: "monospace",
          fontSize: 9,
          fill: KOREAN_COLORS.GRAY_DARK,
          letterSpacing: 1,
        }}
      />
    </pixiContainer>
  );
}
