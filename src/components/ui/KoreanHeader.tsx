import React from "react";
import { Container, Graphics } from "@pixi/react";
import type { JSX } from "react";
import { KoreanText } from "./base/KoreanText";
import { KOREAN_COLORS } from "../../types";

export interface KoreanHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
}

export function KoreanHeader({
  title,
  subtitle,
  x = 0,
  y = 0,
  width = 400,
}: KoreanHeaderProps): JSX.Element {
  const drawHeaderBackground = React.useCallback(
    (g: any) => {
      g.clear();

      // Traditional Korean header decoration
      g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.7 });
      g.roundRect(-width / 2, -30, width, 60, 8);
      g.fill();

      // Gold border with Korean aesthetic
      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.8 });
      g.roundRect(-width / 2, -30, width, 60, 8);
      g.stroke();

      // Traditional corner decorations
      const cornerSize = 15;
      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.6 });

      // Top corners
      g.moveTo(-width / 2 + cornerSize, -30);
      g.lineTo(-width / 2, -30);
      g.lineTo(-width / 2, -30 + cornerSize);

      g.moveTo(width / 2 - cornerSize, -30);
      g.lineTo(width / 2, -30);
      g.lineTo(width / 2, -30 + cornerSize);

      // Bottom corners
      g.moveTo(-width / 2 + cornerSize, 30);
      g.lineTo(-width / 2, 30);
      g.lineTo(-width / 2, 30 - cornerSize);

      g.moveTo(width / 2 - cornerSize, 30);
      g.lineTo(width / 2, 30);
      g.lineTo(width / 2, 30 - cornerSize);

      g.stroke();
    },
    [width]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawHeaderBackground} />

      <KoreanText
        text={title}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 24,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
          dropShadow: {
            color: 0x000000,
            blur: 8,
            distance: 4,
            alpha: 0.8,
            angle: Math.PI / 4,
          },
        }}
      />

      {subtitle && (
        <KoreanText
          text={subtitle}
          anchor={{ x: 0.5, y: 0.5 }}
          y={12}
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.CYAN,
            fontWeight: "300",
          }}
        />
      )}
    </Container>
  );
}
