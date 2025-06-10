import React from "react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS } from "../../../types/constants";
import type { GameMode } from "../../../types/enums";
import type { MenuSectionProps } from "../../../types/components";

export const MenuSection: React.FC<
  MenuSectionProps & {
    menuItems?: { mode: GameMode; korean: string; english: string }[];
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
> = ({
  selectedMode,
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  menuItems = [
    { mode: "versus" as GameMode, korean: "대전", english: "Versus" },
    { mode: "training" as GameMode, korean: "훈련", english: "Training" },
    { mode: "practice" as GameMode, korean: "연습", english: "Practice" },
  ],
  x = 0,
  y = 0,
  width = 400,
  height = 320,
}) => {
  const buttonWidth = width - 80;
  const buttonHeight = 48;
  const buttonSpacing = 18;

  return (
    <pixiContainer x={x} y={y} data-testid="menu-section">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.92);
          g.drawRoundedRect(0, 0, width, height, 16);
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
            fontFamily: "Orbitron, Noto Sans KR, Arial, sans-serif",
            align: "center",
            dropShadow: true,
          })
        }
        x={width / 2}
        y={32}
        anchor={0.5}
      />

      {/* Menu Items */}
      {menuItems.map((item, index) => {
        const isSelected = selectedMode === item.mode;
        return (
          <pixiContainer
            key={item.mode}
            x={40}
            y={80 + index * (buttonHeight + buttonSpacing)}
            interactive={true}
            onPointerTap={() => onModeSelect(item.mode)}
          >
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.beginFill(
                  isSelected
                    ? KOREAN_COLORS.ACCENT_GOLD
                    : KOREAN_COLORS.UI_BACKGROUND_DARK,
                  isSelected ? 1 : 0.85
                );
                g.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 8);
                g.endFill();
                if (isSelected) {
                  g.lineStyle(2, KOREAN_COLORS.ACCENT_GOLD, 1);
                  g.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 8);
                }
              }}
            />
            <pixiText
              text={`${item.korean} (${item.english})`}
              style={
                new PIXI.TextStyle({
                  fontSize: 20,
                  fill: isSelected
                    ? KOREAN_COLORS.BLACK_SOLID
                    : KOREAN_COLORS.TEXT_PRIMARY,
                  fontFamily: "Orbitron, Noto Sans KR, Arial, sans-serif",
                  align: "center",
                  fontWeight: isSelected ? "bold" : "normal",
                  dropShadow: isSelected,
                })
              }
              x={buttonWidth / 2}
              y={buttonHeight / 2}
              anchor={0.5}
            />
          </pixiContainer>
        );
      })}

      {/* Start Game Button */}
      <pixiContainer
        x={40}
        y={80 + menuItems.length * (buttonHeight + buttonSpacing) + 8}
        interactive={true}
        onPointerTap={onStartGame}
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 0.92);
            g.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 8);
            g.endFill();
          }}
        />
        <pixiText
          text="게임 시작 (Start Game)"
          style={
            new PIXI.TextStyle({
              fontSize: 18,
              fill: KOREAN_COLORS.BLACK_SOLID,
              fontFamily: "Orbitron, Noto Sans KR, Arial, sans-serif",
              align: "center",
              fontWeight: "bold",
              dropShadow: true,
            })
          }
          x={buttonWidth / 2}
          y={buttonHeight / 2}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Philosophy and Controls Buttons */}
      <pixiContainer
        x={40}
        y={height - 60}
        interactive={true}
        onPointerTap={onShowPhilosophy}
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.ACCENT_BLUE, 0.85);
            g.drawRoundedRect(0, 0, buttonWidth / 2 - 8, 36, 8);
            g.endFill();
          }}
        />
        <pixiText
          text="철학"
          style={
            new PIXI.TextStyle({
              fontSize: 15,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontFamily: "Orbitron, Noto Sans KR, Arial, sans-serif",
              align: "center",
              dropShadow: true,
            })
          }
          x={(buttonWidth / 2 - 8) / 2}
          y={18}
          anchor={0.5}
        />
      </pixiContainer>
      <pixiContainer
        x={40 + buttonWidth / 2 + 8}
        y={height - 60}
        interactive={true}
        onPointerTap={onShowControls}
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.ACCENT_CYAN, 0.85);
            g.drawRoundedRect(0, 0, buttonWidth / 2 - 8, 36, 8);
            g.endFill();
          }}
        />
        <pixiText
          text="조작법"
          style={
            new PIXI.TextStyle({
              fontSize: 15,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontFamily: "Orbitron, Noto Sans KR, Arial, sans-serif",
              align: "center",
              dropShadow: true,
            })
          }
          x={(buttonWidth / 2 - 8) / 2}
          y={18}
          anchor={0.5}
        />
      </pixiContainer>
      {/* Cyberpunk open source link (bottom right) */}
      <pixiText
        text="Open source: github.com/Hack23/blacktrigram"
        style={
          new PIXI.TextStyle({
            fontSize: 13,
            fill: KOREAN_COLORS.SECONDARY_MAGENTA,
            align: "right",
            fontWeight: "bold",
            dropShadow: true,
            letterSpacing: 1.2,
          })
        }
        x={width - 12}
        y={height - 22}
        anchor={{ x: 1, y: 1 }}
        interactive={true}
        onPointerTap={() =>
          window.open("https://github.com/Hack23/blacktrigram", "_blank")
        }
      />
    </pixiContainer>
  );
};

export default MenuSection;
