/**
 * @fileoverview Korean-themed layout components using @pixi/layout
 * @description Reusable layout primitives with Korean martial arts aesthetics
 */

import React from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import "@pixi/layout";
import { KOREAN_COLORS } from "../../../types/constants";
import type { KoreanText } from "../../../types/korean-text";

// Extend PixiJS components for layout support
extend({ Container, Graphics, Text });

/**
 * @interface KoreanLayoutProps
 * @description Base props for Korean-themed layout components
 */
export interface KoreanLayoutProps {
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly padding?: number;
  readonly backgroundColor?: number;
  readonly borderColor?: number;
  readonly borderRadius?: number;
  readonly children?: React.ReactNode;
  readonly testId?: string;
}

/**
 * @interface KoreanButtonProps
 * @description Props for Korean-themed buttons with bilingual text support
 */
export interface KoreanButtonProps extends KoreanLayoutProps {
  readonly text: KoreanText;
  readonly onClick: () => void;
  readonly variant?: "primary" | "secondary" | "combat" | "stance";
  readonly disabled?: boolean;
  readonly size?: "small" | "medium" | "large";
}

/**
 * @constant KOREAN_LAYOUTS
 * @description Predefined layout configurations for Korean UI components
 */
export const KOREAN_LAYOUTS = {
  // Main container layouts
  SCREEN_CONTAINER: {
    width: "100%",
    height: "100%",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
  },

  // Combat layouts
  COMBAT_HUD: {
    width: "100%",
    height: 80,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    padding: { left: 20, right: 20, top: 10, bottom: 10 },
    backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
  },

  COMBAT_ARENA: {
    width: "60%",
    height: "70%",
    alignSelf: "center" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },

  // Player status layouts
  PLAYER_STATUS_PANEL: {
    width: 200,
    flexDirection: "column" as const,
    gap: 12,
    padding: 15,
    backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
    borderRadius: 8,
  },

  // Control layouts
  CONTROLS_ROW: {
    flexDirection: "row" as const,
    gap: 12,
    alignItems: "center" as const,
    justifyContent: "space-around" as const,
  },

  CONTROLS_COLUMN: {
    flexDirection: "column" as const,
    gap: 8,
    alignItems: "center" as const,
  },

  // Trigram selector
  TRIGRAM_GRID: {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    justifyContent: "center" as const,
    gap: 15,
    maxWidth: 400,
    padding: 20,
  },

  // Mobile layouts
  MOBILE_COMBAT_HUD: {
    width: "100%",
    height: 60,
    flexDirection: "column" as const,
    alignItems: "center" as const,
    gap: 5,
    padding: 10,
  },

  MOBILE_CONTROLS: {
    width: "100%",
    flexDirection: "column" as const,
    gap: 8,
    padding: 10,
  },
} as const;

/**
 * @component ResponsiveCombatLayout
 * @description Responsive layout container for combat screens with Korean aesthetics
 */
export const ResponsiveCombatLayout: React.FC<KoreanLayoutProps> = ({
  width = 1200,
  height = 800,
  children,
  testId = "responsive-combat-layout",
}) => {
  return (
    <pixiContainer
      layout={{
        width,
        height,
        flexDirection: "column",
        backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
      }}
      data-testid={testId}
    >
      {children}
    </pixiContainer>
  );
};

/**
 * @component KoreanButton
 * @description Korean-themed button component with bilingual text support
 */
export const KoreanButton: React.FC<KoreanButtonProps> = ({
  text,
  onClick,
  disabled = false,
  variant = "primary",
  width = 120,
  height = 40,
}) => {
  const getVariantColors = () => {
    switch (variant) {
      case "primary":
        return {
          background: KOREAN_COLORS.ACCENT_GOLD,
          border: KOREAN_COLORS.ACCENT_GOLD,
          text: KOREAN_COLORS.TEXT_PRIMARY,
        };
      case "secondary":
        return {
          background: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
          border: KOREAN_COLORS.ACCENT_CYAN,
          text: KOREAN_COLORS.TEXT_PRIMARY,
        };
      case "combat":
        return {
          background: KOREAN_COLORS.NEGATIVE_RED,
          border: KOREAN_COLORS.NEGATIVE_RED,
          text: KOREAN_COLORS.TEXT_PRIMARY,
        };
      case "stance":
        return {
          background: KOREAN_COLORS.PRIMARY_CYAN,
          border: KOREAN_COLORS.PRIMARY_CYAN,
          text: KOREAN_COLORS.TEXT_PRIMARY,
        };
      default:
        return {
          background: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
          border: KOREAN_COLORS.UI_BORDER,
          text: KOREAN_COLORS.TEXT_PRIMARY,
        };
    }
  };

  const colors = getVariantColors();
  const alpha = disabled ? 0.5 : 1.0;

  return (
    <pixiContainer
      data-testid="korean-button"
      interactive={!disabled}
      onClick={disabled ? undefined : onClick}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: colors.background, alpha: alpha * 0.9 });
          g.roundRect(0, 0, width, height, 6);
          g.fill();

          g.stroke({ width: 2, color: colors.border, alpha });
          g.roundRect(0, 0, width, height, 6);
          g.stroke();
        }}
      />

      <pixiText
        text={text.korean}
        style={{
          fontSize: 12,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          fontWeight: "bold",
          align: "center",
          fontFamily: "Noto Sans KR",
        }}
        anchor={0.5}
        x={width / 2}
        y={height / 2}
      />
    </pixiContainer>
  );
};

export default {
  ResponsiveCombatLayout,
  KoreanButton,
  KOREAN_LAYOUTS,
};
