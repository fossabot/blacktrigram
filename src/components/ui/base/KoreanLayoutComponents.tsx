/**
 * @fileoverview Korean-themed layout components using @pixi/layout
 * @description Reusable layout primitives with Korean martial arts aesthetics
 */

import React, { useCallback, useMemo } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import "@pixi/layout";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { KOREAN_COLORS } from "../../../types/constants";
import type { KoreanText } from "../../../types/korean-text";
import * as PIXI from "pixi.js";

extend({ Container, Graphics, Text });

/**
 * @interface KoreanPanelProps
 * @description Properties for Korean-themed panel components with layout support
 */
export interface KoreanPanelProps {
  readonly title?: KoreanText;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly variant?: "status" | "combat" | "menu" | "info";
  readonly responsive?: boolean;
  readonly children?: React.ReactNode;
  readonly "data-testid"?: string;
}

/**
 * @interface KoreanButtonProps
 * @description Properties for Korean-themed button components
 */
export interface KoreanButtonProps {
  readonly text: KoreanText;
  readonly onClick: () => void;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly variant?: "primary" | "secondary" | "combat" | "stance";
  readonly disabled?: boolean;
  readonly "data-testid"?: string;
}

/**
 * @interface ResponsiveCombatLayoutProps
 * @description Properties for responsive combat layout container
 */
export interface ResponsiveCombatLayoutProps {
  readonly screenWidth: number;
  readonly screenHeight: number;
  readonly children?: React.ReactNode;
  readonly "data-testid"?: string;
}

/**
 * @constant KOREAN_LAYOUTS
 * @description Predefined layout configurations for Korean martial arts UI
 */
export const KOREAN_LAYOUTS = {
  // Combat HUD layouts
  COMBAT_HUD: {
    width: "100%",
    height: 80,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    padding: { left: 20, right: 20, top: 10, bottom: 10 },
  },

  MOBILE_COMBAT_HUD: {
    width: "100%",
    height: 60,
    flexDirection: "column" as const,
    alignItems: "center" as const,
    gap: 5,
    padding: 10,
  },

  // Control layouts
  CONTROLS_ROW: {
    flexDirection: "row" as const,
    gap: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  CONTROLS_COLUMN: {
    flexDirection: "column" as const,
    gap: 8,
    alignItems: "center" as const,
  },

  // Panel layouts
  STATUS_PANEL: {
    width: 200,
    flexDirection: "column" as const,
    gap: 12,
    padding: 15,
    backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
    borderRadius: 8,
  },

  // Trigram selector grid
  TRIGRAM_GRID: {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    justifyContent: "center" as const,
    gap: 15,
    maxWidth: 400,
    padding: 20,
  },
} as const;

/**
 * @component KoreanPanel
 * @description A themed panel component with Korean aesthetics and responsive layout
 */
export const KoreanPanel: React.FC<KoreanPanelProps> = ({
  title,
  x = 0,
  y = 0,
  width = 200,
  height = 300,
  variant = "status",
  responsive = false,
  children,
  "data-testid": testId = "korean-panel",
}) => {
  usePixiExtensions();

  const panelLayout = useMemo(() => {
    const baseLayout = {
      x,
      y,
      width: responsive ? "fit-content" : width,
      height: responsive ? "fit-content" : height,
      padding: 15,
      flexDirection: "column" as const,
      gap: 10,
    };

    switch (variant) {
      case "combat":
        return {
          ...baseLayout,
          backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
          borderColor: KOREAN_COLORS.NEGATIVE_RED,
          borderWidth: 2,
        };
      case "menu":
        return {
          ...baseLayout,
          backgroundColor: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
          borderColor: KOREAN_COLORS.ACCENT_GOLD,
          borderWidth: 1,
        };
      case "info":
        return {
          ...baseLayout,
          backgroundColor: KOREAN_COLORS.UI_BACKGROUND_LIGHT,
          borderColor: KOREAN_COLORS.PRIMARY_CYAN,
          borderWidth: 1,
        };
      default: // status
        return {
          ...baseLayout,
          backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
          borderColor: KOREAN_COLORS.ACCENT_GOLD,
          borderWidth: 2,
        };
    }
  }, [x, y, width, height, variant, responsive]);

  const drawPanel = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background
      g.fill({ color: panelLayout.backgroundColor, alpha: 0.9 });
      g.roundRect(0, 0, width, height, 8);
      g.fill();

      // Border
      g.stroke({
        width: panelLayout.borderWidth,
        color: panelLayout.borderColor,
        alpha: 0.8,
      });
      g.roundRect(0, 0, width, height, 8);
      g.stroke();

      // Korean corner decorations
      if (variant === "status" || variant === "combat") {
        g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
        // Top left
        g.rect(8, 8, 12, 2);
        g.rect(8, 8, 2, 12);
        // Top right
        g.rect(width - 20, 8, 12, 2);
        g.rect(width - 10, 8, 2, 12);
        g.fill();
      }
    },
    [width, height, variant, panelLayout]
  );

  return (
    <pixiContainer layout={panelLayout} data-testid={testId}>
      <pixiGraphics draw={drawPanel} />

      {/* Title */}
      {title && (
        <pixiContainer layout={{ marginBottom: 10, alignSelf: "center" }}>
          <pixiText
            text={title.korean}
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
              align: "center",
              fontFamily: "Noto Sans KR",
            }}
            anchor={0.5}
          />
          <pixiText
            text={title.english}
            style={{
              fontSize: 10,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              align: "center",
            }}
            anchor={0.5}
            y={16}
          />
        </pixiContainer>
      )}

      {/* Content */}
      {children}
    </pixiContainer>
  );
};

/**
 * @component KoreanButton
 * @description A themed button component with Korean styling and hover effects
 */
export const KoreanButton: React.FC<KoreanButtonProps> = ({
  text,
  onClick,
  x = 0,
  y = 0,
  width = 120,
  height = 40,
  variant = "primary",
  disabled = false,
  "data-testid": testId = "korean-button",
}) => {
  usePixiExtensions();

  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const buttonColors = useMemo(() => {
    const baseColors = {
      primary: {
        bg: KOREAN_COLORS.ACCENT_GOLD,
        text: KOREAN_COLORS.BLACK_SOLID,
        border: KOREAN_COLORS.ACCENT_GOLD,
      },
      secondary: {
        bg: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
        text: KOREAN_COLORS.TEXT_PRIMARY,
        border: KOREAN_COLORS.ACCENT_BLUE,
      },
      combat: {
        bg: KOREAN_COLORS.NEGATIVE_RED,
        text: KOREAN_COLORS.WHITE_SOLID,
        border: KOREAN_COLORS.NEGATIVE_RED,
      },
      stance: {
        bg: KOREAN_COLORS.PRIMARY_CYAN,
        text: KOREAN_COLORS.BLACK_SOLID,
        border: KOREAN_COLORS.PRIMARY_CYAN,
      },
    };

    return baseColors[variant];
  }, [variant]);

  const drawButton = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const alpha = disabled ? 0.5 : isPressed ? 0.8 : isHovered ? 1.0 : 0.9;
      const scale = isPressed ? 0.95 : 1.0;

      // Button background
      g.fill({ color: buttonColors.bg, alpha });
      g.roundRect(0, 0, width * scale, height * scale, 6);
      g.fill();

      // Button border
      g.stroke({
        width: 2,
        color: buttonColors.border,
        alpha: alpha + 0.1,
      });
      g.roundRect(0, 0, width * scale, height * scale, 6);
      g.stroke();

      // Hover effect
      if (isHovered && !disabled) {
        g.fill({ color: KOREAN_COLORS.WHITE_SOLID, alpha: 0.1 });
        g.roundRect(0, 0, width * scale, height * scale, 6);
        g.fill();
      }
    },
    [width, height, isHovered, isPressed, disabled, buttonColors]
  );

  const handlePointerDown = useCallback(() => {
    if (!disabled) {
      setIsPressed(true);
    }
  }, [disabled]);

  const handlePointerUp = useCallback(() => {
    if (!disabled) {
      setIsPressed(false);
      onClick();
    }
  }, [disabled, onClick]);

  const handlePointerEnter = useCallback(() => {
    if (!disabled) {
      setIsHovered(true);
    }
  }, [disabled]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
  }, []);

  return (
    <pixiContainer
      x={x}
      y={y}
      layout={{
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
      }}
      data-testid={testId}
    >
      <pixiGraphics
        draw={drawButton}
        interactive={!disabled}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        cursor={disabled ? "default" : "pointer"}
      />

      {/* Button text */}
      <pixiContainer
        layout={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <pixiText
          text={text.korean}
          style={{
            fontSize: 12,
            fill: buttonColors.text,
            fontWeight: "bold",
            align: "center",
            fontFamily: "Noto Sans KR",
          }}
          anchor={0.5}
          alpha={disabled ? 0.6 : 1.0}
        />
        <pixiText
          text={text.english}
          style={{
            fontSize: 8,
            fill: buttonColors.text,
            align: "center",
            alpha: 0.8,
          }}
          anchor={0.5}
          y={14}
          alpha={disabled ? 0.4 : 0.8}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

/**
 * @component ResponsiveCombatLayout
 * @description A responsive layout container that adapts to screen size for combat UI
 */
export const ResponsiveCombatLayout: React.FC<ResponsiveCombatLayoutProps> = ({
  screenWidth,
  screenHeight,
  children,
  "data-testid": testId = "responsive-combat-layout",
}) => {
  usePixiExtensions();

  const layoutConfig = useMemo(() => {
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;

    return {
      width: screenWidth,
      height: screenHeight,
      flexDirection: isMobile ? "column" : ("row" as const),
      justifyContent: "space-between" as const,
      alignItems: isMobile ? "center" : ("flex-start" as const),
      padding: isMobile ? 10 : 20,
      gap: isMobile ? 8 : 15,
      breakpoints: {
        mobile: isMobile,
        tablet: isTablet,
        desktop: !isMobile && !isTablet,
      },
    };
  }, [screenWidth, screenHeight]);

  const drawBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Subtle background for layout debugging (if needed)
      if (process.env.NODE_ENV === "development") {
        g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.1 });
        g.rect(0, 0, screenWidth, screenHeight);
        g.fill();
      }
    },
    [screenWidth, screenHeight]
  );

  return (
    <pixiContainer layout={layoutConfig} data-testid={testId}>
      <pixiGraphics draw={drawBackground} />
      {children}
    </pixiContainer>
  );
};

export default {
  KoreanPanel,
  KoreanButton,
  ResponsiveCombatLayout,
  KOREAN_LAYOUTS,
};
