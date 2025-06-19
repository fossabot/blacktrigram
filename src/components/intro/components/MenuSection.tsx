import React from "react";
import { GameMode } from "../../../types/enums";
import { KOREAN_COLORS } from "../../../types/constants";

export interface MenuSectionProps {
  readonly selectedMode: GameMode;
  readonly onModeSelect: (mode: GameMode) => void;
  readonly onStartGame: () => void;
  readonly onShowPhilosophy: () => void;
  readonly onShowControls: () => void;
  readonly width: number;
  readonly height: number;
  readonly x: number;
  readonly y: number;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedMode,
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  width,
  height,
  x,
  y,
}) => {
  return (
    <pixiContainer x={x} y={y} data-testid="menu-section">
      {/* Background Panel */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
          g.drawRoundedRect(0, 0, width, height, 8);
          g.endFill();
          g.setStrokeStyle({
            width: 2,
            color: KOREAN_COLORS.PRIMARY_CYAN,
            alpha: 0.7,
          });
          g.drawRoundedRect(0, 0, width, height, 8);
        }}
      />

      {/* Main Menu Buttons Container */}
      <pixiContainer x={20} y={20} data-testid="main-menu-buttons">
        {/* Combat Button */}
        <pixiContainer y={0} data-testid="combat-button">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(
                selectedMode === GameMode.VERSUS
                  ? KOREAN_COLORS.ACCENT_GOLD
                  : KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                0.8
              );
              g.drawRoundedRect(0, 0, width - 40, 50, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={() => onModeSelect(GameMode.VERSUS)}
          />
          <pixiText
            text="대전 - Combat"
            style={{
              fontSize: 16,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={(width - 40) / 2}
            y={25}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Training Button */}
        <pixiContainer y={60} data-testid="training-button">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(
                selectedMode === GameMode.TRAINING
                  ? KOREAN_COLORS.ACCENT_GOLD
                  : KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                0.8
              );
              g.drawRoundedRect(0, 0, width - 40, 50, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={() => onModeSelect(GameMode.TRAINING)}
          />
          <pixiText
            text="훈련 - Training"
            style={{
              fontSize: 16,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={(width - 40) / 2}
            y={25}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Philosophy Button */}
        <pixiContainer y={120} data-testid="philosophy-button">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRoundedRect(0, 0, width - 40, 50, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={onShowPhilosophy}
          />
          <pixiText
            text="철학 - Philosophy"
            style={{
              fontSize: 16,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={(width - 40) / 2}
            y={25}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Controls Button */}
        <pixiContainer y={180} data-testid="controls-button">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRoundedRect(0, 0, width - 40, 50, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={onShowControls}
          />
          <pixiText
            text="조작 - Controls"
            style={{
              fontSize: 16,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={(width - 40) / 2}
            y={25}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Start Game Button */}
        <pixiContainer y={250} data-testid="start-game-button">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 0.8);
              g.drawRoundedRect(0, 0, width - 40, 50, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={onStartGame}
          />
          <pixiText
            text="게임 시작 - Start Game"
            style={{
              fontSize: 16,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={(width - 40) / 2}
            y={25}
            anchor={0.5}
          />
        </pixiContainer>
      </pixiContainer>
    </pixiContainer>
  );
};

export default MenuSection;
