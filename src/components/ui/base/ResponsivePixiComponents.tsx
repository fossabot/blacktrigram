import React, { useCallback } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { KOREAN_COLORS } from "../../../types/constants";

// Extend PixiJS components for use
extend({
  Container,
  Graphics,
  Text,
});

export interface ResponsivePixiContainerProps {
  x?: number;
  y?: number;
  screenWidth: number;
  screenHeight: number;
  children?: React.ReactNode;
  "data-testid"?: string;
}

export const ResponsivePixiContainer: React.FC<
  ResponsivePixiContainerProps
> = ({ x = 0, y = 0, children, ...props }) => {
  return (
    <pixiContainer x={x} y={y} {...props}>
      {children}
    </pixiContainer>
  );
};

export interface ResponsivePixiButtonProps {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  screenWidth: number;
  screenHeight: number;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  "data-testid"?: string;
}

export const ResponsivePixiButton: React.FC<ResponsivePixiButtonProps> = ({
  text,
  x,
  y,
  width,
  height,
  variant = "primary",
  onClick,
  screenWidth,
  ...props
}) => {
  const bgColor =
    variant === "primary"
      ? KOREAN_COLORS.ACCENT_GOLD
      : KOREAN_COLORS.UI_BACKGROUND_MEDIUM;

  const textColor =
    variant === "primary"
      ? KOREAN_COLORS.BLACK_SOLID
      : KOREAN_COLORS.TEXT_PRIMARY;

  // Scale button based on screen size
  const isMobile = screenWidth < 768;
  const scale = isMobile ? 0.9 : 1.0;
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  const drawButton = useCallback(
    (g: any) => {
      g.clear();
      g.fill({ color: bgColor, alpha: 0.9 });
      g.roundRect(0, 0, scaledWidth, scaledHeight, 8);
      g.fill();

      // Border
      g.stroke({
        width: 2,
        color:
          variant === "primary"
            ? KOREAN_COLORS.PRIMARY_CYAN
            : KOREAN_COLORS.ACCENT_GOLD,
        alpha: 0.8,
      });
      g.roundRect(0, 0, scaledWidth, scaledHeight, 8);
      g.stroke();
    },
    [bgColor, scaledWidth, scaledHeight, variant]
  );

  return (
    <pixiContainer x={x} y={y} {...props}>
      <pixiGraphics
        draw={drawButton}
        interactive={true}
        onPointerDown={onClick}
        cursor="pointer"
      />
      <pixiText
        text={text}
        style={{
          fontSize: isMobile ? 10 : 12,
          fill: textColor,
          align: "center",
          fontWeight: variant === "primary" ? "bold" : "normal",
        }}
        x={scaledWidth / 2}
        y={scaledHeight / 2}
        anchor={0.5}
      />
    </pixiContainer>
  );
};

export interface ResponsivePixiPanelProps {
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  screenWidth: number;
  screenHeight: number;
  children?: React.ReactNode;
  "data-testid"?: string;
}

export const ResponsivePixiPanel: React.FC<ResponsivePixiPanelProps> = ({
  title,
  x,
  y,
  width,
  height,
  children,
  screenWidth,
  ...props
}) => {
  const isMobile = screenWidth < 768;
  const scale = isMobile ? 0.95 : 1.0;
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  const drawPanel = useCallback(
    (g: any) => {
      g.clear();

      // Panel background
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM, alpha: 0.9 });
      g.roundRect(0, 0, scaledWidth, scaledHeight, 8);
      g.fill();

      // Panel border
      g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
      g.roundRect(0, 0, scaledWidth, scaledHeight, 8);
      g.stroke();

      // Title bar
      g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.3 });
      g.roundRect(0, 0, scaledWidth, 25, [8, 8, 0, 0]);
      g.fill();
    },
    [scaledWidth, scaledHeight]
  );

  return (
    <pixiContainer x={x} y={y} {...props}>
      <pixiGraphics draw={drawPanel} />

      {/* Panel Title */}
      <pixiText
        text={title}
        style={{
          fontSize: isMobile ? 11 : 14,
          fill: KOREAN_COLORS.ACCENT_GOLD,
          fontWeight: "bold",
        }}
        x={10}
        y={8}
      />

      {/* Panel Content */}
      <pixiContainer x={0} y={30}>
        {children}
      </pixiContainer>
    </pixiContainer>
  );
};
