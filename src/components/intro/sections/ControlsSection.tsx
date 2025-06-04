import React from "react";
import { Container } from "@pixi/react";
import { KoreanTitle, KoreanText } from "../../ui/base/korean-text";
import { COMBAT_CONTROLS, KOREAN_COLORS } from "../../../types";

interface ControlsSectionProps {}

export const ControlsSection: React.FC<ControlsSectionProps> = () => {
  let currentYPosition = 0;

  const renderControlCategory = (
    titleKorean: string,
    titleEnglish: string,
    controls: Record<string, any>,
    isStance: boolean = false
  ) => {
    const categoryContainerY = currentYPosition;
    let itemsHeight = 0;

    const controlItems = Object.entries(controls).map(([key, value], index) => {
      const textY = 30 + index * 25;
      itemsHeight = textY + 20;
      let controlTextKorean: string;
      let controlTextEnglish: string;

      if (
        isStance &&
        typeof value === "object" &&
        value !== null &&
        "korean" in value &&
        "technique" in value &&
        "stance" in value
      ) {
        controlTextKorean = `${key}: ${value.korean} (${value.technique})`;
        controlTextEnglish = `${key}: ${value.stance} (${value.technique})`;
      } else if (typeof value === "string") {
        controlTextKorean = `${key}: ${value}`;
        controlTextEnglish = `${key}: ${value}`;
      } else {
        controlTextKorean = `${key}: 정보 없음`;
        controlTextEnglish = `${key}: No information`;
      }

      return (
        <KoreanText
          key={key}
          korean={controlTextKorean}
          english={controlTextEnglish}
          size="medium"
          // WORKAROUND: Cast to 'any' because KOREAN_COLORS.CYAN (number)
          // is not assignable to the current 'Fill' type.
          // The 'Fill' type in korean-text.ts should ideally support numeric hex.
          style={{ fill: KOREAN_COLORS.CYAN as any }}
          y={textY}
        />
      );
    });

    currentYPosition += itemsHeight + 40 + 20;

    return (
      <Container y={categoryContainerY}>
        <KoreanTitle
          korean={titleKorean}
          english={titleEnglish}
          size="large"
          // WORKAROUND: Cast to 'any' for KOREAN_COLORS.WHITE
          style={{ fill: KOREAN_COLORS.WHITE as any }}
          y={0}
        />
        {controlItems}
      </Container>
    );
  };

  const sectionPadding = 60;
  currentYPosition = sectionPadding;

  const sections = [
    {
      titleKorean: "자세 조작",
      titleEnglish: "Stance Controls",
      controls: COMBAT_CONTROLS.stanceControls,
      isStance: true,
    },
    {
      titleKorean: "이동",
      titleEnglish: "Movement",
      controls: COMBAT_CONTROLS.movement,
      isStance: false,
    },
    {
      titleKorean: "전투",
      titleEnglish: "Combat Actions",
      controls: COMBAT_CONTROLS.combat,
      isStance: false,
    },
    {
      titleKorean: "시스템",
      titleEnglish: "System Controls",
      controls: COMBAT_CONTROLS.system,
      isStance: false,
    },
  ];

  currentYPosition = 80;

  return (
    <Container>
      <KoreanTitle
        korean="조작법 안내"
        english="Controls Guide"
        size="xlarge"
        // WORKAROUND: Cast to 'any' for KOREAN_COLORS.GOLD
        style={{ fill: KOREAN_COLORS.GOLD as any }}
        y={20}
      />
      {sections.map((section) =>
        renderControlCategory(
          section.titleKorean,
          section.titleEnglish,
          section.controls,
          section.isStance
        )
      )}
    </Container>
  );
};

export default ControlsSection;
