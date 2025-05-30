import React from "react";
import { KoreanPixiContainer, Text } from "../../ui/base"; // Corrected imports
import { KOREAN_TEXT_STYLE, KOREAN_COLORS } from "../../ui/base"; // KOREAN_COLORS might be used for styling

// Define props if IntroScreen passes any, e.g., for navigation
export interface PhilosophySectionProps {
  readonly onNext?: () => void;
  readonly onPrev?: () => void;
}

export function PhilosophySection({}: /* onNext, onPrev */ PhilosophySectionProps): React.ReactElement {
  const philosophyText = `
  흑괘 (黑卦) - 어둠의 팔괘

  "어둠 속에서, 진정한 힘이 드러난다."

  흑괘 무술은 단순한 전투 기술이 아닙니다.
  그것은 우주의 근본적인 힘, 음양의 조화,
  그리고 팔괘의 심오한 철학에 뿌리를 둔 길입니다.

  각 괘는 자연의 힘과 인간 정신의 특정 측면을 나타냅니다.
  건(乾)은 하늘의 창조적 힘을,
  곤(坤)은 땅의 수용적 본질을 상징합니다.
  감(坎)은 물의 위험한 흐름을,
  리(離)는 불의 명료한 빛을 나타냅니다.

  이러한 원리를 이해하고 신체와 정신에 통합함으로써,
  흑괘 수련자는 내면의 잠재력을 발휘하고,
  정밀함, 효율성, 그리고 무시무시한 힘으로 움직일 수 있습니다.

  "상대가 움직이기 전에 그의 의도를 읽으십시오.
  상대가 공격하기 전에 그의 중심을 부수십시오."

  이것이 흑괘의 길입니다.
  `;
  // Removed unused KOREAN_COLORS and KoreanHeader if not used directly here.
  // KOREAN_TEXT_STYLE is used by Text component by default if not overridden.

  return (
    <KoreanPixiContainer x={50} y={50} width={700} height={500}>
      <Text
        text="무술 철학 (Martial Philosophy)"
        x={0}
        y={10}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 28,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />
      <Text
        text={philosophyText}
        x={10}
        y={70}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 16,
          fill: KOREAN_COLORS.WHITE,
          wordWrap: true,
          wordWrapWidth: 680,
          lineHeight: 24,
        }}
      />
    </KoreanPixiContainer>
  );
}
