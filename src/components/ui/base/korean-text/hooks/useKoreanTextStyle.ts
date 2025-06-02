import { useMemo } from "react";
import type {
  KoreanTextProps,
  KoreanTextStyle,
  // KoreanTextStyleInterface, // Unused alias
  FontWeight,
  // KoreanTextVariant, // Unused
  // MartialVariant, // Unused
  // TrigramStance, // Unused
  ColorValue,
} from "../../../../../types/korean-text"; // Correct path
import {
  KOREAN_FONT_FAMILY,
  KOREAN_FONT_WEIGHTS,
  KOREAN_TEXT_SIZES,
  // MARTIAL_COLORS, // Use if martialVariant logic is added
} from "../constants";
import { KOREAN_COLORS } from "../../../../../types/constants";

// Helper to map FontWeight (e.g., 300, 400) to CSS compatible values if needed,
// or directly use the number if CSSProperties accepts it.
// const mapWeightToCss = (weight: FontWeight): React.CSSProperties['fontWeight'] => weight;

// Helper to map KoreanTextSize to pixel values
// const mapSizeToCss = (size: KoreanTextProps['size']): number => {
//   return KOREAN_TEXT_SIZES[size || 'medium'] || KOREAN_TEXT_SIZES.medium;
// };

export function useKoreanTextStyle(
  props: KoreanTextProps
): React.CSSProperties {
  const {
    variant = "body",
    emphasis = "none",
    size = "medium",
    weight = KOREAN_FONT_WEIGHTS.regular as FontWeight, // Ensure weight is of type FontWeight
    color,
    fontFamily = KOREAN_FONT_FAMILY.PRIMARY,
    lineHeight,
    letterSpacing,
    align,
    style: propStyle, // Style from props
    // martialVariant, // Add if used
    trigram, // Add if used
    // statusKey, // Add if used for status-specific colors
  } = props;

  return useMemo(() => {
    const baseStyle: React.CSSProperties = {
      fontFamily,
      fontSize: KOREAN_TEXT_SIZES[size] || KOREAN_TEXT_SIZES.medium,
      fontWeight: weight, // Directly use number for fontWeight
      lineHeight: lineHeight,
      letterSpacing: letterSpacing,
      textAlign: align,
      color:
        typeof color === "number"
          ? `#${color.toString(16).padStart(6, "0")}`
          : color,
    };

    // Variant-based styling
    switch (variant) {
      case "primary":
        baseStyle.color = baseStyle.color || KOREAN_COLORS.CYAN;
        break;
      case "secondary":
        baseStyle.color = baseStyle.color || KOREAN_COLORS.GRAY_LIGHT;
        break;
      case "accent":
        baseStyle.color = baseStyle.color || KOREAN_COLORS.GOLD;
        break;
      // ... other variants
    }

    if (trigram && KOREAN_COLORS[trigram]) {
      baseStyle.color = baseStyle.color || KOREAN_COLORS[trigram];
    }

    // Emphasis-based styling
    if (emphasis === "bold") {
      baseStyle.fontWeight = KOREAN_FONT_WEIGHTS.bold;
    } else if (emphasis === "italic") {
      baseStyle.fontStyle = "italic";
    } else if (emphasis === "underline") {
      baseStyle.textDecoration = "underline";
    } else if (emphasis === "highlight" && trigram) {
      baseStyle.textShadow = `0 0 8px #${(
        KOREAN_COLORS[trigram] || KOREAN_COLORS.YELLOW
      )
        .toString(16)
        .padStart(6, "0")}`;
    }
    // ... other emphasis styles (glow, shadow, outline)

    // Special handling for "title" size or variant if it implies different weight/style
    if (
      size === "title" ||
      variant === ("primary" as any) /* if 'title' was a variant */
    ) {
      baseStyle.fontWeight = KOREAN_FONT_WEIGHTS.heavy;
      baseStyle.letterSpacing = baseStyle.letterSpacing || "0.05em";
    }

    // Cyberpunk style override (example)
    if (props.style && (props.style as any).textShadow === "cyberpunk") {
      // Example check
      baseStyle.textShadow = `0 0 5px ${KOREAN_COLORS.CYAN}, 0 0 10px ${KOREAN_COLORS.CYAN}`;
      baseStyle.color = KOREAN_COLORS.ELECTRIC_BLUE;
    }

    // Traditional style override (example)
    if (props.style && (props.style as any).fontFamily === "traditional") {
      // Example check
      baseStyle.fontFamily = "MingLiU, Batang, serif"; // Example traditional font
      baseStyle.color = KOREAN_COLORS.TRADITIONAL_RED;
    }

    return { ...baseStyle, ...propStyle };
  }, [
    variant,
    emphasis,
    size,
    weight,
    color,
    fontFamily,
    lineHeight,
    letterSpacing,
    align,
    propStyle,
    trigram,
    props.style,
  ]);
}
