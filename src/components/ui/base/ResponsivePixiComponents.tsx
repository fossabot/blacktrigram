import React, { useState, useCallback, useMemo } from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { KOREAN_COLORS } from "../../../types/constants";

// Define proper interfaces for responsive PixiJS components
interface ResponsivePixiProps {
  readonly screenWidth: number;
  readonly screenHeight: number;
  readonly x?: number;
  readonly y?: number;
  readonly children?: React.ReactNode;
  readonly "data-testid"?: string;
}

interface ResponsivePixiButtonProps extends ResponsivePixiProps {
  readonly text: string;
  readonly width: number;
  readonly height: number;
  readonly variant?: "primary" | "secondary" | "accent" | "ghost" | "danger";
  readonly onClick?: () => void;
  readonly disabled?: boolean;
}

interface ResponsivePixiPanelProps extends ResponsivePixiProps {
  readonly title: string;
  readonly width: number;
  readonly height: number;
}

// Responsive PixiJS Container that adapts to screen size
export const ResponsivePixiContainer: React.FC<ResponsivePixiProps> = ({
  screenWidth,
  screenHeight,
  x = 0,
  y = 0,
  children,
  "data-testid": testId,
}) => {
  usePixiExtensions();

  // Calculate responsive scale based on screen size
  const scale = useMemo(() => {
    const baseWidth = 1200;
    const baseHeight = 800;
    const scaleX = screenWidth / baseWidth;
    const scaleY = screenHeight / baseHeight;
    return Math.min(scaleX, scaleY, 1.0); // Don't scale up beyond 1.0
  }, [screenWidth, screenHeight]);

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

// Responsive PixiJS Button with adaptive sizing
export const ResponsivePixiButton: React.FC<ResponsivePixiButtonProps> = ({
  text,
  x = 0,
  y = 0,
  width,
  height,
  screenWidth,
  screenHeight,
  variant = "primary",
  onClick,
  disabled = false,
  "data-testid": testId,
}) => {
  usePixiExtensions();
  const [isHovered, setIsHovered] = useState(false);

  // Calculate responsive font size
  const fontSize = useMemo(() => {
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;
    return isMobile ? 12 : isTablet ? 14 : 16;
  }, [screenWidth]);

  const getButtonColor = useCallback(() => {
    if (disabled) return KOREAN_COLORS.UI_DISABLED_BG;

    switch (variant) {
      case "primary":
        return KOREAN_COLORS.PRIMARY_CYAN;
      case "secondary":
        return KOREAN_COLORS.UI_STEEL_GRAY;
      case "accent":
        return KOREAN_COLORS.ACCENT_GOLD;
      case "ghost":
        return KOREAN_COLORS.TRANSPARENT;
      case "danger":
        return KOREAN_COLORS.NEGATIVE_RED;
      default:
        return KOREAN_COLORS.PRIMARY_CYAN;
    }
  }, [variant, disabled]);

  return (
    <pixiContainer x={x} y={y} data-testid={testId}>
      <pixiGraphics
        draw={(g) => {
          g.clear();
          const color = getButtonColor();
          const alpha = isHovered ? 0.8 : 0.6;

          g.fill({ color, alpha });
          g.roundRect(0, 0, width, height, 8);
          g.fill();

          g.stroke({ width: 2, color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.8 });
          g.roundRect(0, 0, width, height, 8);
          g.stroke();
        }}
        interactive={!disabled}
        onPointerOver={() => !disabled && setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onPointerDown={() => !disabled && onClick?.()}
      />
      <pixiText
        text={text}
        style={{
          fontSize,
          fill: disabled
            ? KOREAN_COLORS.UI_DISABLED_TEXT
            : KOREAN_COLORS.TEXT_PRIMARY,
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

// Responsive PixiJS Panel with title bar
export const ResponsivePixiPanel: React.FC<ResponsivePixiPanelProps> = ({
  title,
  x = 0,
  y = 0,
  width,
  height,
  screenWidth,
  screenHeight,
  children,
  "data-testid": testId,
}) => {
  usePixiExtensions();

  // Calculate responsive font size
  const titleFontSize = useMemo(() => {
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;
    return isMobile ? 14 : isTablet ? 16 : 18;
  }, [screenWidth]);

  return (
    <pixiContainer x={x} y={y} data-testid={testId}>
      {/* Panel background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
          g.roundRect(0, 0, width, height, 12);
          g.fill();

          g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
          g.roundRect(0, 0, width, height, 12);
          g.stroke();
        }}
      />

      {/* Title bar */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.2 });
          g.roundRect(2, 2, width - 4, 30, 8);
          g.fill();
        }}
      />

      {/* Title text */}
      <pixiText
        text={title}
        style={{
          fontSize: titleFontSize,
          fill: KOREAN_COLORS.ACCENT_GOLD,
          fontWeight: "bold",
          align: "center",
        }}
        x={width / 2}
        y={17}
        anchor={0.5}
      />

      {/* Content area */}
      <pixiContainer x={10} y={40}>
        {children}
      </pixiContainer>
    </pixiContainer>
  );
};

export default {
  ResponsivePixiContainer,
  ResponsivePixiButton,
  ResponsivePixiPanel,
};
