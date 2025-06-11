import React, { useMemo, useCallback } from "react";
import { KOREAN_COLORS } from "../../../types/constants";

export interface ResponsivePixiContainerProps {
  readonly x?: number;
  readonly y?: number;
  readonly screenWidth: number;
  readonly screenHeight: number;
  readonly children?: React.ReactNode;
  readonly "data-testid"?: string;
}

export interface ResponsivePixiButtonProps {
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly screenWidth: number;
  readonly screenHeight: number;
  readonly variant?: "primary" | "secondary";
  readonly onClick: () => void;
  readonly "data-testid"?: string;
}

export interface ResponsivePixiPanelProps {
  readonly title: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly screenWidth: number;
  readonly screenHeight: number;
  readonly children?: React.ReactNode;
  readonly "data-testid"?: string;
}

export const ResponsivePixiContainer: React.FC<
  ResponsivePixiContainerProps
> = ({
  x = 0,
  y = 0,
  screenWidth,
  screenHeight,
  children,
  "data-testid": testId,
}) => {
  const isMobile = screenWidth < 768;
  const scale = useMemo(() => {
    if (isMobile) return 0.8;
    return 1.0;
  }, [isMobile]);

  return (
    <pixiContainer
      x={x}
      y={y}
      scale={{ x: scale, y: scale }}
      data-testid={testId}
    >
      {children}
    </pixiContainer>
  );
};

export const ResponsivePixiButton: React.FC<ResponsivePixiButtonProps> = ({
  text,
  x,
  y,
  width,
  height,
  screenWidth,
  screenHeight,
  variant = "primary",
  onClick,
  "data-testid": testId,
}) => {
  const isMobile = screenWidth < 768;

  const buttonColors = useMemo(() => {
    if (variant === "primary") {
      return {
        bg: KOREAN_COLORS.PRIMARY_CYAN,
        border: KOREAN_COLORS.ACCENT_GOLD,
        text: KOREAN_COLORS.BLACK_SOLID,
      };
    }
    return {
      bg: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
      border: KOREAN_COLORS.TEXT_SECONDARY,
      text: KOREAN_COLORS.TEXT_PRIMARY,
    };
  }, [variant]);

  const fontSize = isMobile ? 12 : 14;

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <pixiContainer x={x} y={y} data-testid={testId}>
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: buttonColors.bg, alpha: 0.9 });
          g.roundRect(0, 0, width, height, 8);
          g.fill();
          g.stroke({ width: 2, color: buttonColors.border, alpha: 0.8 });
          g.roundRect(0, 0, width, height, 8);
          g.stroke();
        }}
        interactive={true}
        onPointerDown={handleClick}
      />
      <pixiText
        text={text}
        style={{
          fontSize,
          fill: buttonColors.text,
          align: "center",
          fontWeight: "bold",
        }}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
      />
    </pixiContainer>
  );
};

export const ResponsivePixiPanel: React.FC<ResponsivePixiPanelProps> = ({
  title,
  x,
  y,
  width,
  height,
  screenWidth,
  screenHeight,
  children,
  "data-testid": testId,
}) => {
  const isMobile = screenWidth < 768;
  const titleFontSize = isMobile ? 12 : 14;

  return (
    <pixiContainer x={x} y={y} data-testid={testId}>
      {/* Panel background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.9 });
          g.roundRect(0, 0, width, height, 8);
          g.fill();
          g.stroke({ width: 1, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
          g.roundRect(0, 0, width, height, 8);
          g.stroke();
        }}
      />

      {/* Panel title */}
      <pixiText
        text={title}
        style={{
          fontSize: titleFontSize,
          fill: KOREAN_COLORS.ACCENT_GOLD,
          fontWeight: "bold",
        }}
        x={8}
        y={8}
      />

      {/* Panel content */}
      <pixiContainer x={0} y={25}>
        {children}
      </pixiContainer>
    </pixiContainer>
  );
};
