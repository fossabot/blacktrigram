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
  screenHeight, // Fixed: Now properly used in responsive calculations
  children,
  "data-testid": testId,
}) => {
  const { scale } = useMemo(() => {
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;

    // Use screenHeight for responsive scaling calculations
    let scale = 1.0;

    if (isMobile) {
      scale = Math.min(screenWidth / 375, screenHeight / 667) * 0.8;
    } else if (isTablet) {
      scale = Math.min(screenWidth / 768, screenHeight / 1024) * 0.9;
    } else {
      scale = Math.min(screenWidth / 1200, screenHeight / 800);
    }

    return {
      scale: Math.max(0.5, Math.min(1.2, scale)),
    };
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

export const ResponsivePixiButton: React.FC<ResponsivePixiButtonProps> = ({
  text,
  x,
  y,
  width,
  height,
  screenWidth,
  screenHeight, // Fixed: Now properly used for responsive design
  variant = "primary",
  onClick,
  "data-testid": testId,
}) => {
  const { buttonColors, fontSize } = useMemo(() => {
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;

    // Use screenHeight to adjust button sizing for different aspect ratios
    const heightRatio = screenHeight / 800; // Base height ratio
    let fontSize = 14;

    if (isMobile) {
      fontSize = Math.max(10, 12 * heightRatio);
    } else if (isTablet) {
      fontSize = Math.max(12, 13 * heightRatio);
    } else {
      fontSize = Math.max(14, 14 * heightRatio);
    }

    const buttonColors =
      variant === "primary"
        ? {
            bg: KOREAN_COLORS.PRIMARY_CYAN,
            border: KOREAN_COLORS.ACCENT_GOLD,
            text: KOREAN_COLORS.BLACK_SOLID,
          }
        : {
            bg: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
            border: KOREAN_COLORS.TEXT_SECONDARY,
            text: KOREAN_COLORS.TEXT_PRIMARY,
          };

    return { buttonColors, fontSize };
  }, [variant, screenWidth, screenHeight]);

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
  screenHeight, // Fixed: Now properly used for responsive panel design
  children,
  "data-testid": testId,
}) => {
  const { titleFontSize } = useMemo(() => {
    const isMobile = screenWidth < 768;

    // Use screenHeight to determine appropriate font sizes for different screen ratios
    const heightRatio = screenHeight / 800;
    const titleFontSize = isMobile
      ? Math.max(10, 12 * heightRatio)
      : Math.max(12, 14 * heightRatio);

    return { titleFontSize };
  }, [screenWidth, screenHeight]);

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
