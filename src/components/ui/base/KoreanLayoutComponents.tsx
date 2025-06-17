/**
 * @fileoverview Korean-themed layout components using @pixi/layout
 * @description Reusable layout primitives with Korean martial arts aesthetics
 */

import React, { useMemo } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import "@pixi/layout";
import { KOREAN_COLORS } from "../../../types/constants";
import type { KoreanText } from "../../../types/korean-text";

extend({ Container, Graphics, Text });

/**
 * @description Korean-themed layout components with responsive design using @pixi/layout
 */

// Layout constants for Korean martial arts UI
export const KOREAN_LAYOUTS = {
  // Main layouts
  MAIN_CONTAINER: {
    width: "100%",
    height: "100%",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },

  // Combat layouts
  COMBAT_HUD: {
    width: "100%",
    height: 80,
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    padding: { left: 20, right: 20, top: 10, bottom: 10 },
  },

  CONTROLS_ROW: {
    flexDirection: "row" as const,
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  CONTROLS_COLUMN: {
    flexDirection: "column" as const,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  // Panel layouts
  PLAYER_STATUS_PANEL: {
    width: 200,
    flexDirection: "column" as const,
    gap: 12,
    padding: 15,
    backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
    borderRadius: 8,
  },

  // Mobile responsive layouts
  MOBILE_CONTAINER: {
    width: "100%",
    flexDirection: "column" as const,
    gap: 10,
    padding: 10,
  },

  MOBILE_CONTROLS: {
    width: "100%",
    flexDirection: "row" as const,
    gap: 8,
    justifyContent: "space-around",
  },
} as const;

// Korean Button Component
export interface KoreanButtonProps {
  readonly text: KoreanText;
  readonly onClick: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly variant?: "primary" | "secondary" | "combat" | "stance";
  readonly disabled?: boolean;
  readonly "data-testid"?: string;
}

export const KoreanButton: React.FC<KoreanButtonProps> = ({
  text,
  onClick,
  width = 120,
  height = 40,
  variant = "primary",
  disabled = false,
  "data-testid": testId,
}) => {
  const buttonColors = useMemo(() => {
    switch (variant) {
      case "combat":
        return {
          background: KOREAN_COLORS.NEGATIVE_RED,
          hover: KOREAN_COLORS.WARNING_YELLOW,
          text: KOREAN_COLORS.TEXT_PRIMARY,
        };
      case "stance":
        return {
          background: KOREAN_COLORS.ACCENT_BLUE,
          hover: KOREAN_COLORS.PRIMARY_CYAN,
          text: KOREAN_COLORS.TEXT_PRIMARY,
        };
      case "secondary":
        return {
          background: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
          hover: KOREAN_COLORS.UI_BACKGROUND_LIGHT,
          text: KOREAN_COLORS.TEXT_SECONDARY,
        };
      default: // primary
        return {
          background: KOREAN_COLORS.ACCENT_GOLD,
          hover: KOREAN_COLORS.SECONDARY_YELLOW,
          text: KOREAN_COLORS.UI_BACKGROUND_DARK,
        };
    }
  }, [variant]);

  return (
    <pixiContainer
      layout={{
        width,
        height,
        alignItems: "center",
        justifyContent: "center",
      }}
      data-testid={testId}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear();
          const alpha = disabled ? 0.5 : 1.0;

          g.fill({ color: buttonColors.background, alpha });
          g.roundRect(0, 0, width, height, 6);
          g.fill();

          g.stroke({ width: 2, color: buttonColors.hover, alpha: alpha * 0.8 });
          g.roundRect(0, 0, width, height, 6);
          g.stroke();
        }}
        interactive={!disabled}
        onclick={disabled ? undefined : onClick}
      />

      <pixiText
        text={text.korean}
        style={{
          fontSize: Math.min(14, height * 0.35),
          fill: buttonColors.text,
          fontWeight: "bold",
          align: "center",
          fontFamily: "Noto Sans KR",
        }}
        anchor={0.5}
        x={width / 2}
        y={height / 2 - 2}
      />

      <pixiText
        text={text.english}
        style={{
          fontSize: Math.min(10, height * 0.25),
          fill: buttonColors.text,
          align: "center",
          alpha: 0.8,
        }}
        anchor={0.5}
        x={width / 2}
        y={height / 2 + 8}
      />
    </pixiContainer>
  );
};

// Korean Panel Component
export interface KoreanPanelProps {
  readonly children: React.ReactNode;
  readonly width: number;
  readonly height: number;
  readonly title?: KoreanText;
  readonly variant?: "default" | "combat" | "status";
}

export const KoreanPanel: React.FC<KoreanPanelProps> = ({
  children,
  width,
  height,
  title,
  variant = "default",
}) => {
  const panelColors = useMemo(() => {
    switch (variant) {
      case "combat":
        return {
          background: KOREAN_COLORS.UI_BACKGROUND_DARK,
          border: KOREAN_COLORS.NEGATIVE_RED,
          title: KOREAN_COLORS.WARNING_YELLOW,
        };
      case "status":
        return {
          background: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
          border: KOREAN_COLORS.ACCENT_BLUE,
          title: KOREAN_COLORS.PRIMARY_CYAN,
        };
      default:
        return {
          background: KOREAN_COLORS.UI_BACKGROUND_DARK,
          border: KOREAN_COLORS.ACCENT_GOLD,
          title: KOREAN_COLORS.ACCENT_GOLD,
        };
    }
  }, [variant]);

  return (
    <pixiContainer
      layout={{
        width,
        height,
        flexDirection: "column",
        gap: title ? 15 : 0,
        padding: 10,
      }}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear();

          // Panel background
          g.fill({ color: panelColors.background, alpha: 0.9 });
          g.roundRect(0, 0, width, height, 8);
          g.fill();

          // Panel border
          g.stroke({ width: 2, color: panelColors.border, alpha: 0.8 });
          g.roundRect(0, 0, width, height, 8);
          g.stroke();

          // Korean corner decorations
          g.fill({ color: panelColors.border, alpha: 0.6 });
          const cornerSize = 12;
          // Top-left
          g.rect(8, 8, cornerSize, 2);
          g.rect(8, 8, 2, cornerSize);
          // Top-right
          g.rect(width - 20, 8, cornerSize, 2);
          g.rect(width - 10, 8, 2, cornerSize);
          // Bottom-left
          g.rect(8, height - 10, cornerSize, 2);
          g.rect(8, height - 20, 2, cornerSize);
          // Bottom-right
          g.rect(width - 20, height - 10, cornerSize, 2);
          g.rect(width - 10, height - 20, 2, cornerSize);
          g.fill();
        }}
      />

      {title && (
        <pixiContainer
          layout={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <pixiText
            text={title.korean}
            style={{
              fontSize: 16,
              fill: panelColors.title,
              fontWeight: "bold",
              align: "center",
              fontFamily: "Noto Sans KR",
            }}
            anchor={0.5}
            x={width / 2}
          />
          <pixiText
            text={title.english}
            style={{
              fontSize: 12,
              fill: panelColors.title,
              align: "center",
              alpha: 0.8,
            }}
            anchor={0.5}
            x={width / 2}
            y={20}
          />
        </pixiContainer>
      )}

      {children}
    </pixiContainer>
  );
};

// Responsive Combat Layout Component
export interface ResponsiveCombatLayoutProps {
  readonly children: React.ReactNode;
  readonly width: number;
  readonly height: number;
}

export const ResponsiveCombatLayout: React.FC<ResponsiveCombatLayoutProps> = ({
  children,
  width,
  height,
}) => {
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const layoutConfig = useMemo(() => {
    if (isMobile) {
      return {
        flexDirection: "column" as const,
        gap: 8,
        padding: 10,
      };
    } else if (isTablet) {
      return {
        flexDirection: "row" as const,
        gap: 12,
        padding: 15,
        flexWrap: "wrap" as const,
      };
    } else {
      return {
        flexDirection: "row" as const,
        gap: 20,
        padding: 20,
        justifyContent: "space-between" as const,
      };
    }
  }, [isMobile, isTablet]);

  return (
    <pixiContainer
      layout={{
        width,
        height,
        ...layoutConfig,
      }}
    >
      {children}
    </pixiContainer>
  );
};
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
