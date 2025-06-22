import type { Texture } from "pixi.js";
import React from "react";
import { KOREAN_COLORS } from "../../types/constants";
import { PlayerArchetype } from "../../types/enums";
import { ResponsivePixiContainer } from "./base/ResponsivePixiComponents";

export interface ArchetypeDisplayProps {
  readonly archetype: PlayerArchetype;
  readonly isSelected?: boolean;
  readonly onSelect?: (archetype: PlayerArchetype) => void;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly screenWidth: number;
  readonly screenHeight: number;
}

const ARCHETYPE_INFO = {
  [PlayerArchetype.MUSA]: {
    korean: "무사",
    english: "Warrior",
    description: "전통 무사 - 힘을 통한 명예",
    englishDescription: "Traditional Warrior - Honor through strength",
    color: KOREAN_COLORS.TRIGRAM_GEON_PRIMARY,
    symbol: "☰",
  },
  [PlayerArchetype.AMSALJA]: {
    korean: "암살자",
    english: "Assassin",
    description: "그림자 암살자 - 은밀함을 통한 효율성",
    englishDescription: "Shadow Assassin - Efficiency through stealth",
    color: KOREAN_COLORS.TRIGRAM_SON_PRIMARY,
    symbol: "☴",
  },
  [PlayerArchetype.HACKER]: {
    korean: "해커",
    english: "Hacker",
    description: "사이버 전사 - 정보를 통한 힘",
    englishDescription: "Cyber Warrior - Power through information",
    color: KOREAN_COLORS.PRIMARY_CYAN,
    symbol: "☲",
  },
  [PlayerArchetype.JEONGBO_YOWON]: {
    korean: "정보요원",
    english: "Agent",
    description: "정보 요원 - 관찰을 통한 지식",
    englishDescription: "Intelligence Agent - Knowledge through observation",
    color: KOREAN_COLORS.TRIGRAM_TAE_PRIMARY,
    symbol: "☱",
  },
  [PlayerArchetype.JOJIK_POKRYEOKBAE]: {
    korean: "조직폭력배",
    english: "Gangster",
    description: "조직 폭력배 - 무자비함을 통한 생존",
    englishDescription: "Organized Crime - Survival through ruthlessness",
    color: KOREAN_COLORS.TRIGRAM_JIN_PRIMARY,
    symbol: "☳",
  },
};

const ArchetypeDisplay: React.FC<{
  archetype: (typeof ARCHETYPE_INFO)[PlayerArchetype];
  texture: Texture | null;
  total: number;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  width: number;
  isMobile: boolean;
}> = React.memo(
  ({ archetype, texture, total, index, onPrev, onNext, width, isMobile }) => (
    <ResponsivePixiContainer
      x={0}
      y={0}
      screenWidth={width}
      screenHeight={isMobile ? 300 : 400}
      data-testid={`archetype-display-${archetype}`}
    >
      <pixiContainer
        layout={{
          width,
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: 24,
        }}
        aria-label="Archetype selection"
      >
        {texture && (
          <pixiSprite
            texture={texture}
            width={isMobile ? 120 : 180}
            height={isMobile ? 200 : 300}
            anchor={0.5}
            x={isMobile ? width / 2 : 90}
            y={isMobile ? 110 : 150}
          />
        )}
        <pixiContainer
          layout={{
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            gap: 8,
          }}
        >
          <pixiText
            text={`${archetype.korean} - ${archetype.english}`}
            style={{
              fontSize: 18,
              fill: archetype.color,
              fontWeight: "bold",
              fontFamily: "Noto Sans KR, NanumGothic, sans-serif",
            }}
          />
          <pixiText
            text={archetype.description}
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              wordWrap: true,
              wordWrapWidth: width * 0.6,
            }}
          />
          <pixiText
            text={`${index + 1} / ${total}`}
            style={{
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
          />
          <pixiContainer layout={{ flexDirection: "row", gap: 12 }}>
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.8);
                g.roundRect(0, 0, 40, 40, 8);
                g.endFill();
              }}
              interactive
              onPointerDown={onPrev}
              tabIndex={0}
              aria-label="Previous archetype"
            />
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.8);
                g.roundRect(0, 0, 40, 40, 8);
                g.endFill();
              }}
              interactive
              onPointerDown={onNext}
              tabIndex={0}
              aria-label="Next archetype"
            />
          </pixiContainer>
        </pixiContainer>
      </pixiContainer>
    </ResponsivePixiContainer>
  )
);

export default ArchetypeDisplay;
