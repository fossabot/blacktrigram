import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

interface KoreanHeaderProps {
  readonly koreanTitle: string;
  readonly englishTitle: string;
  readonly subtitle?: string;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
}

const COLORS = {
  PRIMARY_CYAN: 0x00ffd0,
  WHITE: 0xffffff,
  DARK_BG: 0x0a0e12,
  KOREAN_RED: 0x8b0000,
  TRADITIONAL_GOLD: 0xffd700,
  GRAY_MEDIUM: 0x666666,
} as const;

export function KoreanHeader({
  koreanTitle,
  englishTitle,
  subtitle,
  x = window.innerWidth / 2,
  y = 150,
  width = 800,
  height = 150,
}: KoreanHeaderProps): JSX.Element {
  return (
    <pixiContainer x={x} y={y} data-testid="korean-header">
      {/* Background panel */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Main background with traditional Korean styling
          g.setFillStyle({ color: COLORS.DARK_BG, alpha: 0.85 });
          g.roundRect(-width / 2, -height / 2, width, height, 15);
          g.fill();

          // Traditional Korean border
          g.setStrokeStyle({ color: COLORS.KOREAN_RED, width: 3, alpha: 0.8 });
          g.roundRect(-width / 2, -height / 2, width, height, 15);
          g.stroke();

          // Inner accent border
          g.setStrokeStyle({
            color: COLORS.TRADITIONAL_GOLD,
            width: 1,
            alpha: 0.6,
          });
          g.roundRect(
            -width / 2 + 5,
            -height / 2 + 5,
            width - 10,
            height - 10,
            10
          );
          g.stroke();

          // Traditional corner decorations
          const cornerSize = 20;
          const corners = [
            { x: -width / 2 + cornerSize, y: -height / 2 + cornerSize },
            { x: width / 2 - cornerSize, y: -height / 2 + cornerSize },
            { x: -width / 2 + cornerSize, y: height / 2 - cornerSize },
            { x: width / 2 - cornerSize, y: height / 2 - cornerSize },
          ];

          corners.forEach((corner) => {
            g.setStrokeStyle({
              color: COLORS.PRIMARY_CYAN,
              width: 2,
              alpha: 0.7,
            });
            g.moveTo(corner.x - 10, corner.y);
            g.lineTo(corner.x + 10, corner.y);
            g.moveTo(corner.x, corner.y - 10);
            g.lineTo(corner.x, corner.y + 10);
            g.stroke();
          });
        }}
        data-testid="header-background"
      />

      {/* Korean title */}
      <pixiText
        text={koreanTitle}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-30}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 32,
          fill: COLORS.KOREAN_RED,
          fontWeight: "bold",
          dropShadow: {
            color: COLORS.TRADITIONAL_GOLD,
            blur: 4,
            distance: 2,
          },
        }}
        data-testid="korean-title"
      />

      {/* English title */}
      <pixiText
        text={englishTitle}
        anchor={{ x: 0.5, y: 0.5 }}
        y={10}
        style={{
          fontFamily: "Orbitron",
          fontSize: 16,
          fill: COLORS.PRIMARY_CYAN,
          fontWeight: "600",
          letterSpacing: 2,
        }}
        alpha={0.9}
        data-testid="english-title"
      />

      {/* Subtitle if provided */}
      {subtitle && (
        <pixiText
          text={subtitle}
          anchor={{ x: 0.5, y: 0.5 }}
          y={45}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: COLORS.WHITE,
            fontWeight: "400",
          }}
          alpha={0.8}
          data-testid="subtitle"
        />
      )}
    </pixiContainer>
  );
}
