import React from "react";
// Fix: Remove direct PIXI React imports, use pixi components directly
import { usePixiExtensions } from "../../utils/pixiExtensions";
// Fix: Import from ui.ts instead of components.ts
import type { ArchetypeDisplayProps } from "../../types/ui";
import { KOREAN_COLORS } from "../../types/constants";

export const ArchetypeDisplay: React.FC<ArchetypeDisplayProps> = ({
  player,
  showDetails = true,
  compact = false,
  x = 0,
  y = 0,
  width = 200,
  height = 100,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer x={x} y={y} data-testid="archetype-display">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
          g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.6);
          g.drawRoundedRect(0, 0, width, height, 8);
          g.endFill();
        }}
      />

      {/* Player Name */}
      <pixiText
        text={player.name.korean}
        style={{
          fontSize: compact ? 14 : 18,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          fontWeight: "bold",
        }}
        x={10}
        y={10}
      />

      {/* English Name */}
      <pixiText
        text={player.name.english}
        style={{
          fontSize: compact ? 10 : 12,
          fill: KOREAN_COLORS.TEXT_SECONDARY,
        }}
        x={10}
        y={compact ? 25 : 30}
      />

      {/* Archetype */}
      <pixiText
        text={`유형: ${player.archetype}`}
        style={{
          fontSize: 12,
          fill: KOREAN_COLORS.ACCENT_GOLD,
        }}
        x={10}
        y={compact ? 40 : 50}
      />

      {/* Health Bar */}
      {showDetails && (
        <pixiContainer x={10} y={compact ? 55 : 70}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              // Background
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
              g.drawRoundedRect(0, 0, width - 20, 10, 5);
              g.endFill();

              // Health
              const healthPercentage = player.health / player.maxHealth;
              g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 0.8);
              g.drawRoundedRect(1, 1, (width - 22) * healthPercentage, 8, 4);
              g.endFill();
            }}
          />
          <pixiText
            text={`${player.health}/${player.maxHealth}`}
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            x={width - 60}
            y={-2}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default ArchetypeDisplay;
