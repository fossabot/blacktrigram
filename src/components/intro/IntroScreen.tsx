import React, { useState, useCallback } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text, Sprite } from "pixi.js";
import type { PlayerArchetype } from "../../types";
import { KoreanPixiText } from "../ui/base/korean-text/components/KoreanPixiTextUtils";
import { KOREAN_COLORS, KOREAN_FONTS, FONT_SIZES } from "../../types/constants";

// Extend @pixi/react with the Pixi components we want to use
extend({
  Container,
  Graphics,
  Text,
  Sprite,
});

// Declare the extended components for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: any;
      pixiGraphics: any;
      pixiText: any;
      pixiSprite: any;
    }
  }
}

interface IntroScreenProps {
  readonly onStartTraining: () => void;
  readonly onStartCombat: () => void;
  readonly onArchetypeSelect: (archetype: PlayerArchetype) => void;
  readonly selectedArchetype: PlayerArchetype;
}

const PLAYER_ARCHETYPES: Array<{
  id: PlayerArchetype;
  korean: string;
  english: string;
  description: string;
  philosophy: string;
}> = [
  {
    id: "musa",
    korean: "무사",
    english: "Traditional Warrior",
    description: "Honor through strength, disciplined combat",
    philosophy: "존중과 규율의 길 - Path of respect and discipline",
  },
  {
    id: "amsalja",
    korean: "암살자",
    english: "Shadow Assassin",
    description: "Efficiency through invisibility, one perfect strike",
    philosophy: "그림자의 길 - Path of shadows",
  },
  {
    id: "hacker",
    korean: "해커",
    english: "Cyber Warrior",
    description: "Information as power, technological advantage",
    philosophy: "정보의 길 - Path of information",
  },
  {
    id: "jeongbo_yowon",
    korean: "정보요원",
    english: "Intelligence Operative",
    description: "Knowledge through observation, strategic thinking",
    philosophy: "지혜의 길 - Path of wisdom",
  },
  {
    id: "jojik_pokryeokbae",
    korean: "조직폭력배",
    english: "Organized Crime",
    description: "Survival through ruthlessness, practical violence",
    philosophy: "생존의 길 - Path of survival",
  },
];

export function IntroScreen({
  onStartTraining,
  onStartCombat,
  onArchetypeSelect,
  selectedArchetype,
}: IntroScreenProps): React.JSX.Element {
  const [showArchetypes, setShowArchetypes] = useState(false);

  const selectedArchetypeData = PLAYER_ARCHETYPES.find(
    (a) => a.id === selectedArchetype
  );

  const handleArchetypeToggle = useCallback(() => {
    setShowArchetypes(!showArchetypes);
  }, [showArchetypes]);

  const handleArchetypeSelect = useCallback(
    (archetype: PlayerArchetype) => {
      onArchetypeSelect(archetype);
      setShowArchetypes(false);
    },
    [onArchetypeSelect]
  );

  return (
    <Application
      width={window.innerWidth}
      height={window.innerHeight}
      backgroundColor={KOREAN_COLORS.BLACK}
      antialias={true}
      resizeTo={window}
      data-testid="intro-screen"
    >
      <pixiContainer>
        {/* Background Graphics */}
        <pixiGraphics
          draw={(g) => {
            g.clear();
            // Cyberpunk gradient background
            g.beginFill(KOREAN_COLORS.BLACK);
            g.drawRect(0, 0, window.innerWidth, window.innerHeight);
            g.endFill();

            // Neon accent lines
            g.lineStyle(2, KOREAN_COLORS.CYAN, 0.8);
            g.moveTo(100, 100);
            g.lineTo(window.innerWidth - 100, 100);
            g.moveTo(100, window.innerHeight - 100);
            g.lineTo(window.innerWidth - 100, window.innerHeight - 100);
          }}
        />

        {/* Title Section */}
        <pixiContainer x={window.innerWidth / 2} y={150}>
          <KoreanPixiText
            text={{
              korean: "흑괘 무술 도장",
              english: "Black Trigram Martial Arts",
            }}
            style={{
              fontFamily: KOREAN_FONTS.PRIMARY,
              fontSize: FONT_SIZES.TITLE,
              fill: KOREAN_COLORS.CYAN,
              align: "center",
              dropShadow: true,
            }}
            anchor={[0.5, 0]}
            data-testid="main-title"
          />
          <KoreanPixiText
            text={{
              korean: "정밀 격투 시뮬레이터",
              english: "Precision Combat Simulator",
            }}
            style={{
              fontFamily: KOREAN_FONTS.PRIMARY,
              fontSize: FONT_SIZES.LARGE,
              fill: KOREAN_COLORS.WHITE,
              align: "center",
            }}
            anchor={[0.5, 0]}
            position={[0, 60]}
            data-testid="subtitle"
          />
        </pixiContainer>

        {/* Trigram Philosophy Section */}
        <pixiContainer x={window.innerWidth / 2} y={280}>
          <KoreanPixiText
            text={{ korean: "팔괘의 길", english: "Path of Eight Trigrams" }}
            style={{
              fontFamily: KOREAN_FONTS.TRADITIONAL,
              fontSize: FONT_SIZES.XLARGE,
              fill: KOREAN_COLORS.GOLD,
              align: "center",
              dropShadow: true,
            }}
            anchor={[0.5, 0]}
            data-testid="philosophy-title"
          />
          <pixiText
            text="☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷"
            style={{
              fontFamily: KOREAN_FONTS.TRADITIONAL,
              fontSize: FONT_SIZES.XLARGE,
              fill: KOREAN_COLORS.GOLD,
              align: "center",
              letterSpacing: 20,
              dropShadow: true,
            }}
            anchor={0.5}
            x={0}
            y={50}
            data-testid="trigram-symbols"
          />
        </pixiContainer>

        {/* Archetype Selection */}
        <pixiContainer x={window.innerWidth / 2} y={450}>
          {/* Archetype Toggle Button */}
          <pixiGraphics
            draw={(g: any) => {
              g.clear();
              g.lineStyle(2, KOREAN_COLORS.CYAN);
              g.beginFill(
                showArchetypes ? KOREAN_COLORS.CYAN : 0x000000,
                showArchetypes ? 0.2 : 0
              );
              g.drawRoundedRect(-150, -25, 300, 50, 8);
              g.endFill();
            }}
            interactive={true}
            cursor="pointer"
            onClick={handleArchetypeToggle}
            data-testid="archetype-toggle"
          />
          <KoreanPixiText
            korean={selectedArchetypeData?.korean || "무사"}
            english={selectedArchetypeData?.english || "Traditional Warrior"}
            style={{
              fontFamily: KOREAN_FONTS.PRIMARY,
              fontSize: FONT_SIZES.LARGE,
              fill: KOREAN_COLORS.CYAN,
              align: "center",
              fontWeight: "bold",
            }}
            anchor={[0.5, 0.5]}
            data-testid="selected-archetype"
          />

          {/* Archetype List */}
          {showArchetypes && (
            <pixiContainer x={0} y={80}>
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  g.beginFill(KOREAN_COLORS.BLACK, 0.9);
                  g.lineStyle(1, KOREAN_COLORS.CYAN, 0.5);
                  g.drawRoundedRect(
                    -250,
                    0,
                    500,
                    PLAYER_ARCHETYPES.length * 80,
                    8
                  );
                  g.endFill();
                }}
                data-testid="archetype-list"
              />
              {PLAYER_ARCHETYPES.map((archetype, index) => (
                <pixiContainer key={archetype.id} x={0} y={index * 80}>
                  <pixiGraphics
                    draw={(g) => {
                      g.clear();
                      const isSelected = selectedArchetype === archetype.id;
                      g.beginFill(
                        isSelected ? KOREAN_COLORS.CYAN : 0x000000,
                        isSelected ? 0.2 : 0
                      );
                      g.drawRect(-250, 0, 500, 80);
                      g.endFill();
                    }}
                    interactive={true}
                    onClick={() => handleArchetypeSelect(archetype.id)}
                    data-testid={`archetype-option-${archetype.id}`}
                  />
                  <KoreanPixiText
                    korean={archetype.korean}
                    english={archetype.english}
                    style={{
                      fontFamily: KOREAN_FONTS.PRIMARY,
                      fontSize: FONT_SIZES.MEDIUM,
                      fill: KOREAN_COLORS.WHITE,
                      align: "left",
                      fontWeight:
                        selectedArchetype === archetype.id ? "bold" : "normal",
                    }}
                    anchor={[0, 0]}
                    position={[-240, 10]}
                    data-testid={`archetype-name-${archetype.id}`}
                  />
                  <pixiText
                    text={archetype.description}
                    style={{
                      fontFamily: KOREAN_FONTS.PRIMARY,
                      fontSize: FONT_SIZES.SMALL,
                      fill: KOREAN_COLORS.WHITE,
                      wordWrap: true,
                      wordWrapWidth: 480,
                    }}
                    anchor={0} // Fixed: Use single number instead of array
                    x={-240} // Fixed: Use separate x,y instead of position array
                    y={35}
                  />
                  <pixiText
                    text={archetype.philosophy}
                    style={{
                      fontFamily: KOREAN_FONTS.PRIMARY,
                      fontSize: FONT_SIZES.SMALL,
                      fill: KOREAN_COLORS.GOLD,
                      wordWrap: true,
                      wordWrapWidth: 480,
                    }}
                    anchor={0} // Fixed: Use single number instead of array
                    x={-240} // Fixed: Use separate x,y instead of position array
                    y={55}
                  />
                </pixiContainer>
              ))}
            </pixiContainer>
          )}
        </pixiContainer>

        {/* Action Buttons */}
        <pixiContainer x={window.innerWidth / 2} y={650}>
          {/* Training Button */}
          <pixiContainer x={-120} y={0}>
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.lineStyle(2, KOREAN_COLORS.CYAN);
                g.beginFill(0x000000, 0);
                g.drawRoundedRect(-90, -25, 180, 50, 8);
                g.endFill();
              }}
              interactive={true}
              onClick={onStartTraining}
              data-testid="training-button"
            />
            <KoreanPixiText
              korean="수련 시작"
              english="Begin Training"
              style={{
                fontFamily: KOREAN_FONTS.PRIMARY,
                fontSize: FONT_SIZES.MEDIUM,
                fill: KOREAN_COLORS.CYAN,
                align: "center",
              }}
              anchor={[0.5, 0.5]}
            />
          </pixiContainer>

          {/* Combat Button */}
          <pixiContainer x={120} y={0}>
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.lineStyle(2, KOREAN_COLORS.RED);
                g.beginFill(0x000000, 0);
                g.drawRoundedRect(-90, -25, 180, 50, 8);
                g.endFill();
              }}
              interactive={true}
              onClick={onStartCombat}
              data-testid="combat-button"
            />
            <KoreanPixiText
              korean="실전 격투"
              english="Enter Combat"
              style={{
                fontFamily: KOREAN_FONTS.PRIMARY,
                fontSize: FONT_SIZES.MEDIUM,
                fill: KOREAN_COLORS.RED,
                align: "center",
              }}
              anchor={[0.5, 0.5]}
            />
          </pixiContainer>
        </pixiContainer>

        {/* Korean Martial Arts Quote */}
        <pixiContainer x={window.innerWidth / 2} y={window.innerHeight - 120}>
          <KoreanPixiText
            korean="흑괘의 길을 걸어라"
            english="Walk the Path of the Black Trigram"
            style={{
              fontFamily: KOREAN_FONTS.TRADITIONAL,
              fontSize: FONT_SIZES.LARGE,
              fill: KOREAN_COLORS.GOLD,
              align: "center",
              fontStyle: "italic",
              dropShadow: true,
              dropShadowColor: KOREAN_COLORS.GOLD,
              dropShadowBlur: 8,
            }}
            anchor={[0.5, 0]}
            data-testid="closing-quote"
          />
        </pixiContainer>
      </pixiContainer>
    </Application>
  );
}

export default IntroScreen;
