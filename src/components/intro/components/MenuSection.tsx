import React from "react";
import type { MenuSectionProps } from "../../../types/components";
import { KOREAN_COLORS } from "../../../types/constants";
import { GameMode } from "../../../types/enums";
import * as PIXI from "pixi.js";

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedMode,
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  x = 0,
  y = 0,
  width = 400,
  height = 500,
}) => {
  const menuItems = [
    { mode: GameMode.VERSUS, korean: "대전", english: "Versus" },
    { mode: GameMode.TRAINING, korean: "훈련", english: "Training" },
    { mode: GameMode.PRACTICE, korean: "연습", english: "Practice" },
  ];

  return (
    <pixiContainer x={x} y={y} data-testid="menu-section">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
          g.drawRoundedRect(0, 0, width, height, 10);
          g.endFill();
        }}
      />

      {/* Title */}
      <pixiText
        text="흑괘 (Black Trigram)"
        style={
          new PIXI.TextStyle({
            fontSize: 28,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontFamily: "Arial, sans-serif",
            align: "center",
          })
        }
        x={width / 2}
        y={40}
        anchor={0.5}
      />

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <pixiContainer key={item.mode} x={50} y={120 + index * 60}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              const isSelected = selectedMode === item.mode;
              g.beginFill(
                isSelected
                  ? KOREAN_COLORS.ACCENT_GOLD
                  : KOREAN_COLORS.UI_BACKGROUND_DARK,
                0.8
              );
              g.drawRoundedRect(0, 0, width - 100, 50, 5);
              g.endFill();

              if (isSelected) {
                g.lineStyle(2, KOREAN_COLORS.ACCENT_GOLD, 1);
                g.drawRoundedRect(0, 0, width - 100, 50, 5);
              }
            }}
            interactive={true}
            onPointerDown={() => onModeSelect(item.mode)}
          />
          <pixiText
            text={`${item.korean} (${item.english})`}
            style={
              new PIXI.TextStyle({
                fontSize: 18,
                fill:
                  selectedMode === item.mode
                    ? KOREAN_COLORS.BLACK_SOLID
                    : KOREAN_COLORS.TEXT_PRIMARY,
                fontFamily: "Arial, sans-serif",
                align: "center",
              })
            }
            x={(width - 100) / 2}
            y={25}
            anchor={0.5}
          />
        </pixiContainer>
      ))}

      {/* Start Game Button */}
      <pixiContainer x={50} y={360}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 0.8);
            g.drawRoundedRect(0, 0, width - 100, 50, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onStartGame}
        />
        <pixiText
          text="게임 시작 (Start Game)"
          style={
            new PIXI.TextStyle({
              fontSize: 18,
              fill: KOREAN_COLORS.BLACK_SOLID,
              fontFamily: "Arial, sans-serif",
              align: "center",
            })
          }
          x={(width - 100) / 2}
          y={25}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Philosophy Button */}
      <pixiContainer x={50} y={430}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.ACCENT_BLUE, 0.8);
            g.drawRoundedRect(0, 0, (width - 120) / 2, 40, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onShowPhilosophy}
        />
        <pixiText
          text="철학"
          style={
            new PIXI.TextStyle({
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontFamily: "Arial, sans-serif",
              align: "center",
            })
          }
          x={(width - 120) / 4}
          y={20}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Controls Button */}
      <pixiContainer x={50 + (width - 120) / 2 + 20} y={430}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.ACCENT_CYAN, 0.8);
            g.drawRoundedRect(0, 0, (width - 120) / 2, 40, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onShowControls}
        />
        <pixiText
          text="조작법"
          style={
            new PIXI.TextStyle({
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontFamily: "Arial, sans-serif",
              align: "center",
            })
          }
          x={(width - 120) / 4}
          y={20}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default MenuSection;
