import React, { useCallback, useMemo, useState } from "react";
import {
  PixiContainerComponent,
  PixiGraphicsComponent,
  PixiTextComponent,
  type PixiContainerComponentProps,
  type PixiTextComponentProps,
  type ExtendedPixiTextStyle,
} from "./PixiComponents";
import type {
  Graphics as PixiGraphics,
  FederatedPointerEvent,
  TextDropShadow,
} from "pixi.js";
import {
  PlayerArchetype,
  TrigramStance,
  TrigramWheelProps,
  ProgressTrackerProps,
  KoreanPixiTextConfig,
  TRIGRAM_DATA, // Corrected: Import from types/index.ts
} from "../../../types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../types/constants";

// Fix prop interfaces to extend properly
export interface KoreanButtonProps
  extends Omit<PixiContainerComponentProps, "children" | "onpointertap"> {
  // Omit onClick if handled internally or map it
  readonly text?: string; // Made optional if koreanText is primary
  readonly koreanText?: string;
  readonly variant?: "primary" | "secondary" | "danger" | "accent"; // Added accent
  readonly disabled?: boolean;
  readonly size?: "small" | "medium" | "large";
  readonly onClick?: (event: FederatedPointerEvent) => void; // Add onClick prop
  readonly width?: number; // Allow explicit width/height
  readonly height?: number;
}

export function KoreanButton({
  text,
  koreanText,
  variant = "primary",
  disabled = false,
  size = "medium",
  onClick,
  width: explicitWidth, // Renamed for clarity
  height: explicitHeight, // Renamed for clarity
  ...containerProps
}: KoreanButtonProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);

  const { autoWidth, autoHeight, fontSize } = useMemo(() => {
    // Use explicit dimensions if provided, otherwise calculate based on size
    switch (size) {
      case "small":
        return {
          autoWidth: explicitWidth ?? 80,
          autoHeight: explicitHeight ?? 24,
          fontSize: 10,
        };
      case "large":
        return {
          autoWidth: explicitWidth ?? 160,
          autoHeight: explicitHeight ?? 40,
          fontSize: 16,
        };
      case "medium":
      default:
        return {
          autoWidth: explicitWidth ?? 120,
          autoHeight: explicitHeight ?? 30,
          fontSize: 14,
        };
    }
  }, [size, explicitWidth, explicitHeight]);

  const drawButton = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      let bgColor: number = KOREAN_COLORS.DOJANG_BLUE; // Type annotation for clarity
      let borderColor: number = KOREAN_COLORS.GOLD; // Type annotation
      const alpha = disabled ? 0.5 : 1;

      switch (variant) {
        case "secondary":
          bgColor = KOREAN_COLORS.GRAY_DARK;
          borderColor = KOREAN_COLORS.CYAN;
          break;
        case "danger":
          bgColor = KOREAN_COLORS.RED; // Ensure this is KOREAN_COLORS.RED
          borderColor = KOREAN_COLORS.WHITE;
          break;
        case "accent":
          bgColor = KOREAN_COLORS.GOLD; // Ensure this is KOREAN_COLORS.GOLD
          borderColor = KOREAN_COLORS.BLACK;
          break;
        case "primary":
        default:
          // Default values are already set
          break;
      }

      if (isHovered && !disabled) {
        // Example hover: lighten or use accent color
        bgColor =
          variant === "accent"
            ? KOREAN_COLORS.YELLOW
            : KOREAN_COLORS.ACCENT_BLUE;
        borderColor = KOREAN_COLORS.WHITE; // Example hover border
      }

      g.setFillStyle({ color: bgColor, alpha });
      g.roundRect(0, 0, autoWidth, autoHeight, 5);
      g.fill();
      g.setStrokeStyle({ color: borderColor, width: 1, alpha });
      g.roundRect(0, 0, autoWidth, autoHeight, 5);
      g.stroke();
    },
    [variant, disabled, autoWidth, autoHeight, isHovered]
  );

  const buttonTextStyle: ExtendedPixiTextStyle = useMemo(() => {
    let textColor: number = KOREAN_COLORS.WHITE; // Type annotation
    if (variant === "accent") {
      textColor = KOREAN_COLORS.BLACK; // Ensure this is KOREAN_COLORS.BLACK
    }
    if (disabled) {
      textColor = KOREAN_COLORS.GRAY_LIGHT;
    }
    return {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: fontSize,
      fill: textColor,
      fontWeight: "bold",
      align: "center",
    };
  }, [fontSize, variant, disabled]);

  const actualText = koreanText || text || "Button";

  return (
    <PixiContainerComponent
      interactive={!disabled}
      cursor={!disabled ? "pointer" : "default"}
      onpointertap={!disabled && onClick ? onClick : undefined} // Should be compatible
      onpointerover={!disabled ? () => setIsHovered(true) : undefined} // Should be compatible
      onpointerout={!disabled ? () => setIsHovered(false) : undefined} // Should be compatible
      {...containerProps}
    >
      <PixiGraphicsComponent draw={drawButton} />
      <PixiTextComponent
        text={actualText}
        style={buttonTextStyle}
        x={autoWidth / 2}
        y={autoHeight / 2}
        anchor={{ x: 0.5, y: 0.5 }}
      />
    </PixiContainerComponent>
  );
}

// Helper to create a valid TextDropShadow object
const createDropShadow = (
  color: number,
  distance: number,
  blur: number,
  angle?: number,
  alpha?: number
): TextDropShadow => ({
  color,
  distance,
  blur,
  angle: angle ?? Math.PI / 4, // Default angle
  alpha: alpha ?? 0.5, // Default alpha
});

// Text component interfaces
export interface KoreanTitleTextProps
  extends Omit<PixiTextComponentProps, "text" | "style"> {
  readonly korean: string;
  readonly english?: string;
  readonly emphasis?: boolean;
  readonly style?: ExtendedPixiTextStyle; // Allow overriding full style
}

// Korean title text
export function KoreanTitleText({
  korean,
  english,
  emphasis = false,
  style,
  ...textProps
}: KoreanTitleTextProps): React.ReactElement {
  const displayText = english ? `${korean} (${english})` : korean;

  const titleStyle = useCallback((): ExtendedPixiTextStyle => {
    const base: ExtendedPixiTextStyle = {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: 18,
      fill: emphasis ? KOREAN_COLORS.GOLD : KOREAN_COLORS.WHITE,
      fontWeight: "bold",
    };
    const combined = { ...base, ...style };
    if (typeof combined.dropShadow === "boolean") {
      if (combined.dropShadow)
        combined.dropShadow = createDropShadow(KOREAN_COLORS.BLACK, 1, 2);
      else delete combined.dropShadow;
    } else if (combined.dropShadow && typeof combined.dropShadow === "object") {
      combined.dropShadow = {
        ...createDropShadow(KOREAN_COLORS.BLACK, 1, 2),
        ...combined.dropShadow,
      };
    }
    return combined;
  }, [emphasis, style]);

  return (
    <PixiTextComponent {...textProps} text={displayText} style={titleStyle()} />
  );
}

export interface KoreanBodyTextProps
  extends Omit<PixiTextComponentProps, "text" | "style"> {
  readonly text: string;
  readonly secondary?: boolean;
  readonly style?: ExtendedPixiTextStyle;
}

export function KoreanBodyText({
  text,
  secondary = false,
  style,
  ...textProps
}: KoreanBodyTextProps): React.ReactElement {
  const bodyStyle = useCallback((): ExtendedPixiTextStyle => {
    const base: ExtendedPixiTextStyle = {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: 14,
      fill: secondary ? KOREAN_COLORS.GRAY_LIGHT : KOREAN_COLORS.WHITE,
    };
    const combined = { ...base, ...style };
    if (typeof combined.dropShadow === "boolean") {
      if (combined.dropShadow)
        combined.dropShadow = createDropShadow(KOREAN_COLORS.BLACK, 1, 1);
      else delete combined.dropShadow;
    } else if (combined.dropShadow && typeof combined.dropShadow === "object") {
      combined.dropShadow = {
        ...createDropShadow(KOREAN_COLORS.BLACK, 1, 1),
        ...combined.dropShadow,
      };
    }
    return combined;
  }, [secondary, style]);
  return <PixiTextComponent {...textProps} text={text} style={bodyStyle()} />;
}

export interface KoreanHighlightTextProps
  extends Omit<PixiTextComponentProps, "text" | "style"> {
  readonly text: string;
  readonly type?: "info" | "warning" | "success";
  readonly style?: ExtendedPixiTextStyle;
}
export function KoreanHighlightText({
  text,
  type = "info",
  style,
  ...textProps
}: KoreanHighlightTextProps): React.ReactElement {
  const colors = useMemo(
    () => ({
      info: KOREAN_COLORS.CYAN,
      warning: KOREAN_COLORS.ORANGE,
      success: KOREAN_COLORS.GREEN,
    }),
    []
  );

  const highlightStyle = useCallback((): ExtendedPixiTextStyle => {
    const base: ExtendedPixiTextStyle = {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: 16,
      fill: colors[type],
      fontWeight: "bold",
    };
    const combined = { ...base, ...style };
    if (typeof combined.dropShadow === "boolean") {
      if (combined.dropShadow)
        combined.dropShadow = createDropShadow(KOREAN_COLORS.BLACK, 1, 2);
      else delete combined.dropShadow;
    } else if (combined.dropShadow && typeof combined.dropShadow === "object") {
      combined.dropShadow = {
        ...createDropShadow(KOREAN_COLORS.BLACK, 1, 2),
        ...combined.dropShadow,
      };
    }
    return combined;
  }, [type, style, colors]);

  return (
    <PixiTextComponent {...textProps} text={text} style={highlightStyle()} />
  );
}

// Korean combat status display
export interface KoreanCombatStatusProps
  extends Omit<PixiTextComponentProps, "text" | "style"> {
  readonly status: string;
  readonly warning?: boolean;
  readonly style?: ExtendedPixiTextStyle;
}

export function KoreanCombatStatus({
  status,
  warning = false,
  style,
  ...textProps
}: KoreanCombatStatusProps): React.ReactElement {
  const statusStyle = useCallback((): ExtendedPixiTextStyle => {
    const base: ExtendedPixiTextStyle = {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: 12,
      fill: warning ? KOREAN_COLORS.CRITICAL_RED : KOREAN_COLORS.CYAN,
      fontWeight: "bold",
    };
    const combined = { ...base, ...style };
    if (typeof combined.dropShadow === "boolean") {
      if (combined.dropShadow)
        combined.dropShadow = createDropShadow(KOREAN_COLORS.BLACK, 1, 1);
      else delete combined.dropShadow;
    } else if (combined.dropShadow && typeof combined.dropShadow === "object") {
      combined.dropShadow = {
        ...createDropShadow(KOREAN_COLORS.BLACK, 1, 1),
        ...combined.dropShadow,
      };
    }
    return combined;
  }, [warning, style]);

  return (
    <PixiTextComponent {...textProps} text={status} style={statusStyle()} />
  );
}

export interface KoreanTrigramDisplayProps {
  readonly stance: TrigramStance;
  readonly x?: number;
  readonly y?: number;
  readonly size?: number;
  readonly showKorean?: boolean;
  readonly showEnglish?: boolean;
}

export function KoreanTrigramDisplay({
  stance,
  x = 0,
  y = 0,
  size = 48,
  showKorean = true,
  showEnglish = false,
}: KoreanTrigramDisplayProps): React.ReactElement {
  const trigram = TRIGRAM_DATA[stance];
  const trigramColor = trigram.color || KOREAN_COLORS.WHITE;

  const drawTrigram = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      // Simple circle for now, can be replaced with actual trigram symbol drawing
      g.setFillStyle({ color: trigramColor, alpha: 0.2 });
      g.circle(0, 0, size / 2);
      g.fill();
      g.setStrokeStyle({ color: trigramColor, width: 2 });
      g.circle(0, 0, size / 2);
      g.stroke();
    },
    [trigramColor, size]
  );

  const textStyle: ExtendedPixiTextStyle = useMemo(
    () => ({
      // useMemo for textStyle
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: size / (showKorean && showEnglish ? 4 : 3), // Adjust size if both shown
      fill: trigramColor,
      align: "center",
    }),
    [size, trigramColor, showKorean, showEnglish]
  );

  return (
    <PixiContainerComponent x={x} y={y}>
      <PixiGraphicsComponent draw={drawTrigram} x={0} y={0} />
      <PixiTextComponent
        text={trigram.symbol}
        style={{ ...textStyle, fontSize: size * 0.6 }}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={showKorean || showEnglish ? -size * 0.15 : 0} // Adjust symbol position if text is shown
      />
      {showKorean && (
        <PixiTextComponent
          text={trigram.name.korean}
          style={textStyle}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0}
          y={size * 0.25}
        />
      )}
      {showEnglish && (
        <PixiTextComponent
          text={trigram.name.english}
          style={{ ...textStyle, fontSize: size / 4.5 }}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0}
          y={size * (showKorean ? 0.45 : 0.25)} // Adjust based on Korean text presence
        />
      )}
    </PixiContainerComponent>
  );
}

export interface KoreanHealthBarProps {
  readonly current: number;
  readonly maximum: number;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showText?: boolean;
  readonly barColor?: number;
  readonly backgroundColor?: number;
  readonly borderColor?: number;
}

export function KoreanHealthBar({
  current,
  maximum,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  showText = true,
  barColor = KOREAN_COLORS.RED, // Default to KOREAN_COLORS.RED
  backgroundColor = KOREAN_COLORS.GRAY_DARK,
  borderColor = KOREAN_COLORS.BLACK,
}: KoreanHealthBarProps): React.ReactElement {
  const healthPercent = Math.max(0, Math.min(1, current / maximum));

  const drawHealthBar = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      // Background
      g.setFillStyle({ color: backgroundColor, alpha: 0.8 });
      g.roundRect(0, 0, width, height, 3);
      g.fill();

      // Fill
      g.setFillStyle({ color: barColor, alpha: 1 });
      g.roundRect(0, 0, width * healthPercent, height, 3);
      g.fill();

      // Border
      g.setStrokeStyle({ color: borderColor, width: 1 });
      g.roundRect(0, 0, width, height, 3);
      g.stroke();
    },
    [width, height, healthPercent, barColor, backgroundColor, borderColor]
  );

  const textStyle: ExtendedPixiTextStyle = useMemo(
    () => ({
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: height * 0.7,
      fill: KOREAN_COLORS.WHITE, // Ensure this is KOREAN_COLORS.WHITE
      align: "center",
      // dropShadow: createDropShadow(KOREAN_COLORS.BLACK, 1, 1), // Optional: add shadow to text
    }),
    [height]
  );

  return (
    <PixiContainerComponent x={x} y={y}>
      <PixiGraphicsComponent draw={drawHealthBar} />
      {showText && (
        <PixiTextComponent
          text={`${Math.round(current)} / ${maximum}`}
          style={textStyle}
          anchor={{ x: 0.5, y: 0.5 }}
          x={width / 2}
          y={height / 2}
        />
      )}
    </PixiContainerComponent>
  );
}
