import type { JSX } from "react";
import { KoreanText } from "../../ui/base/KoreanText";

interface ControlsSectionProps {
  readonly x: number;
  readonly y: number;
}

export function ControlsSection({ x, y }: ControlsSectionProps): JSX.Element {
  return (
    <pixiContainer x={x} y={y}>
      <KoreanText
        text="🎮 ← → 또는 A/D 선택 | ⚡ 스페이스/엔터 확인 | 🎯 1-대련, 2-수련"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: 0x2c2c2c,
          letterSpacing: 1,
        }}
      />
    </pixiContainer>
  );
}
