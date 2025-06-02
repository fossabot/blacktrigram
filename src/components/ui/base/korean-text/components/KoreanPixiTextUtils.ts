import * as PIXI from "pixi.js";
import type {
  KoreanTextProps,
  KoreanTextStyle as KoreanTextStyleType, // Use alias if KoreanTextStyle is also a value
  FontWeight,
  ColorValue,
  StatusKey, // Ensure StatusKey is imported from enums via types/korean-text or types/index
} from "../../../../../types/korean-text";
import {
  KOREAN_FONT_FAMILY,
  KOREAN_FONT_WEIGHTS,
  KOREAN_TEXT_SIZES,
  KOREAN_STATUS_TRANSLATIONS, // Ensure this is exported from constants
} from "../constants";
import { KOREAN_COLORS } from "../../../../../types/constants";

// Helper to convert FontWeight (300-900) to PIXI.TextStyleFontWeight
function mapFontWeightToPixi(weight?: FontWeight): PIXI.TextStyleFontWeight {
  if (weight === undefined) return "normal";
  if (weight === 400) return "normal";
  if (weight === 700) return "bold";
  return String(weight) as PIXI.TextStyleFontWeight;
}

export class KoreanPixiTextUtils {
  static createPixiTextStyle(
    size: KoreanTextSize | number = KOREAN_FONT_SIZES.MEDIUM,
    color: string | number = KOREAN_COLORS.WHITE,
    options: Partial<PixiTextStyleConfig> = {}
  ): PIXI.TextStyle {
    const fontSize =
      typeof size === "number"
        ? size
        : KOREAN_FONT_SIZES[
            size.toUpperCase() as keyof typeof KOREAN_FONT_SIZES
          ] || KOREAN_FONT_SIZES.MEDIUM;

    const baseStyle: Partial<PIXI.TextStyle> = {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: fontSize,
      fill: color,
      align: "left",
      wordWrap: true,
      wordWrapWidth: options.wordWrapWidth || 400, // Default wordWrapWidth
      breakWords: true,
      lineHeight: options.lineHeight || fontSize * 1.4,
      ...options, // Spread user options last to override defaults
    };

    // Handle dropShadow: if options.dropShadow is true, apply defaults
    if (options.dropShadow === true) {
      baseStyle.dropShadow = true;
      baseStyle.dropShadowColor =
        options.dropShadowColor ?? KOREAN_COLORS.BLACK;
      baseStyle.dropShadowBlur = options.dropShadowBlur ?? 2;
      baseStyle.dropShadowAngle = options.dropShadowAngle ?? Math.PI / 4;
      baseStyle.dropShadowDistance = options.dropShadowDistance ?? 2;
      baseStyle.dropShadowAlpha = options.dropShadowAlpha ?? 0.5;
    } else if (typeof options.dropShadow === "object") {
      // If it's an object, PIXI.TextStyle will take it as is (assuming it's TextDropShadow compatible)
      // However, PIXI.TextStyle itself expects boolean for dropShadow and separate properties.
      // This branch might be problematic if options.dropShadow is an object not conforming to PIXI's split shadow props.
      // For safety, let's assume options.dropShadow is boolean or undefined as per PixiTextStyleConfig
    }

    return new PIXI.TextStyle(baseStyle);
  }

  static getKoreanMartialTextStyle(
    martialVariant: MartialVariant,
    size: KoreanTextSize | number = KOREAN_FONT_SIZES.MEDIUM,
    defaultColor: string | number = KOREAN_COLORS.WHITE
  ): PIXI.TextStyle {
    let martialColor = defaultColor;
    if (martialVariant && MARTIAL_COLORS[martialVariant] !== undefined) {
      martialColor = MARTIAL_COLORS[martialVariant];
    }
    // const preset = KOREAN_MARTIAL_TEXT_PRESETS[martialVariant] || {}; // Presets are not PIXI styles

    return KoreanPixiTextUtils.createPixiTextStyle(size, martialColor, {
      // fontWeight: mapFontWeightToPixi(preset.fontWeight as FontWeight), // map preset weight
      // fontStyle: preset.fontStyle as PIXI.TextStyleFontStyle, // map preset style
      // Example: add specific martial style options
      dropShadow: true, // Example: martial text has a shadow
      dropShadowColor: KOREAN_COLORS.BLACK,
      stroke: KOREAN_COLORS.GRAY_DARK,
      strokeThickness: 1,
    });
  }

  static getKoreanTechniqueTextStyle(
    stance?: TrigramStance,
    mastered = false,
    size: KoreanTextSize | number = KOREAN_FONT_SIZES.MEDIUM
  ): PIXI.TextStyle {
    const stanceColor = stance ? KOREAN_COLORS[stance] : KOREAN_COLORS.WHITE;
    return KoreanPixiTextUtils.createPixiTextStyle(size, stanceColor, {
      fontWeight: mastered ? "bold" : "normal",
      dropShadow: mastered, // Use boolean for PIXI.TextStyle
      dropShadowColor: KOREAN_COLORS.BLACK,
      dropShadowBlur: mastered ? 3 : 0,
      stroke: KOREAN_COLORS.BLACK,
      strokeThickness: 1,
    });
  }

  static getKoreanStatusTextStyle(
    statusKey: StatusKey,
    options: {
      value?: number;
      maxValue?: number;
      criticalThreshold?: number;
      warningThreshold?: number;
      color?: string | number;
    } = {},
    size: KoreanTextSize | number = KOREAN_FONT_SIZES.SMALL,
    defaultColor: string | number = KOREAN_COLORS.WHITE
  ): PIXI.TextStyle {
    let fillColor = options.color || defaultColor;

    if (options.value !== undefined && options.maxValue !== undefined) {
      const percentage = (options.value / (options.maxValue || 1)) * 100; // Avoid division by zero
      const critical = options.criticalThreshold ?? 25;
      const warning = options.warningThreshold ?? 50;

      if (percentage <= critical) {
        fillColor = KOREAN_COLORS.CRITICAL_RED;
      } else if (percentage <= warning) {
        fillColor = KOREAN_COLORS.ORANGE;
      } else {
        fillColor = KOREAN_COLORS.GREEN; // Default for good status
      }
    } else if (options.color) {
      fillColor = options.color;
    }
    // Specific styles per statusKey can be added here
    // e.g., if (statusKey === 'ki') { styleOptions.fontStyle = 'italic'; }

    return KoreanPixiTextUtils.createPixiTextStyle(size, fillColor, {
      // Add other status-specific style options if needed
    });
  }

  // Moved getPixiTextStyleFromProps inside the class as a static method
  static getPixiTextStyleFromProps(
    props: Pick<
      KoreanTextProps, // Using KoreanTextProps from global types
      | "size"
      | "weight"
      | "color"
      | "fontFamily"
      | "lineHeight"
      | "letterSpacing"
      | "align"
      // Add other relevant props from KoreanTextProps that map to PIXI.TextStyle
    > & { style?: Partial<PixiTextStyleConfig> } // Allow passing PIXI style options
  ): PixiTextStyleConfig {
    const {
      size: propSize,
      weight: propWeight,
      color: propColor,
      fontFamily: propFontFamily,
      lineHeight: propLineHeight,
      letterSpacing: propLetterSpacing,
      align: propAlign,
      style: userPixiStyle,
    } = props;

    const result: PixiTextStyleConfig = {}; // Initialize as empty object

    result.fontFamily = (propFontFamily as string) || KOREAN_FONT_FAMILY;

    if (typeof propSize === "number") {
      result.fontSize = propSize;
    } else if (propSize) {
      result.fontSize =
        KOREAN_FONT_SIZES[
          propSize.toUpperCase() as keyof typeof KOREAN_FONT_SIZES
        ] || KOREAN_FONT_SIZES.MEDIUM;
    } else {
      result.fontSize = KOREAN_FONT_SIZES.MEDIUM;
    }

    if (propColor !== undefined) {
      // Ensure fill is a number (hex) or string (CSS color name/hex for PIXI)
      result.fill =
        typeof propColor === "number" ? propColor : String(propColor);
    } else {
      result.fill = KOREAN_COLORS.WHITE;
    }

    const fontWeight = propWeight as FontWeight | undefined;
    if (fontWeight) {
      result.fontWeight = mapFontWeightToPixi(fontWeight);
    }

    if (propLineHeight) {
      result.lineHeight = Number(propLineHeight); // Ensure number
    }

    if (propLetterSpacing) {
      result.letterSpacing = Number(propLetterSpacing); // Ensure number
    }

    if (propAlign) {
      result.align = propAlign as PIXI.TextStyleAlign;
    }

    // Merge with user-provided PIXI style options
    return { ...result, ...userPixiStyle };
  }
} // This brace closes the class KoreanPixiTextUtils

export function getPixiTextStyle(
  props: KoreanTextProps
): Partial<PIXI.TextStyle> {
  const {
    variant = "body",
    emphasis = "none",
    size = "medium",
    weight = KOREAN_FONT_WEIGHTS.regular as FontWeight,
    color,
    fontFamily = KOREAN_FONT_FAMILY.PRIMARY,
    lineHeight,
    letterSpacing,
    align,
    style: propStyle,
    trigram,
    // statusKey, // Unused
  } = props;

  const textStyle: Partial<PIXI.TextStyle> = {
    fontFamily,
    fontSize: KOREAN_TEXT_SIZES[size] || KOREAN_TEXT_SIZES.medium,
    fontWeight: weight.toString() as PIXI.TextStyleFontWeight, // PIXI fontWeight is string or number
    fill:
      typeof color === "number"
        ? color
        : (KOREAN_COLORS.WHITE as PIXI.FillInput), // Use FillInput
    align: align || "left",
    lineHeight: typeof lineHeight === "number" ? lineHeight : undefined,
    letterSpacing:
      typeof letterSpacing === "number" ? letterSpacing : undefined,
  };

  if (typeof color === "string") {
    // Handle string colors (e.g. hex strings)
    textStyle.fill = color as PIXI.FillInput;
  }

  // Variant-based styling
  // ... (similar to useKoreanTextStyle, adapt for PIXI.TextStyle)

  if (trigram && KOREAN_COLORS[trigram]) {
    textStyle.fill = KOREAN_COLORS[trigram] as PIXI.FillInput;
  }

  // Emphasis
  if (emphasis === "bold")
    textStyle.fontWeight =
      KOREAN_FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight;
  if (emphasis === "italic") textStyle.fontStyle = "italic";
  if (emphasis === "underline") {
    /* PIXI text underline is complex, often done with a Graphics line */
  }
  if (emphasis === "shadow") {
    textStyle.dropShadow = true;
    textStyle.dropShadowColor = KOREAN_COLORS.BLACK;
    textStyle.dropShadowBlur = 2;
    textStyle.dropShadowAngle = Math.PI / 4;
    textStyle.dropShadowDistance = 2;
    textStyle.dropShadowAlpha = 0.5;
  }
  if (emphasis === "glow" && trigram) {
    textStyle.dropShadow = true;
    textStyle.dropShadowColor = KOREAN_COLORS[trigram] || KOREAN_COLORS.YELLOW;
    textStyle.dropShadowBlur = 4;
    textStyle.dropShadowAlpha = 0.8;
    textStyle.dropShadowDistance = 0;
  }

  // Apply propStyle last to allow overrides
  if (propStyle) {
    Object.assign(textStyle, propStyle);
  }

  return textStyle;
}

export function createKoreanText(
  korean: string,
  english: string | undefined,
  config: Partial<KoreanTextProps> = {}
): PIXI.Text {
  const textContent = english ? `${korean}\n${english}` : korean;
  const style = new PIXI.TextStyle(getPixiTextStyle(config));
  return new PIXI.Text({ text: textContent, style });
}

export function createStatusText(
  statusKey: StatusKey,
  currentValue: number,
  maxValue: number,
  config: Partial<KoreanTextProps> = {}
): PIXI.Text {
  const translation = KOREAN_STATUS_TRANSLATIONS[statusKey] || {
    korean: statusKey,
    english: statusKey,
  };
  const textContent = `${translation.korean} (${translation.english}): ${currentValue}/${maxValue}`;

  let fillColor: ColorValue = KOREAN_COLORS.WHITE;
  if (
    config.criticalThreshold &&
    currentValue / maxValue < config.criticalThreshold
  ) {
    fillColor = KOREAN_COLORS.CRITICAL_RED;
  } else if (
    config.warningThreshold &&
    currentValue / maxValue < config.warningThreshold
  ) {
    fillColor = KOREAN_COLORS.ORANGE;
  }

  const style = new PIXI.TextStyle(
    getPixiTextStyle({ color: fillColor, ...config })
  );
  return new PIXI.Text({ text: textContent, style });
}

export function createTechniqueName(
  koreanName: string,
  englishName: string,
  trigram?: TrigramStance,
  config: Partial<KoreanTextProps> = {}
): PIXI.Text {
  const textContent = `${koreanName} (${englishName})`;
  const styleOptions = getPixiTextStyle({ trigram, ...config });
  if (trigram && KOREAN_COLORS[trigram]) {
    styleOptions.fill = KOREAN_COLORS[trigram]; // Ensure trigram color is applied
  }
  const style = new PIXI.TextStyle(styleOptions);
  return new PIXI.Text({ text: textContent, style });
}

// Remove the problematic applyKoreanTextStyle function
// export function applyKoreanTextStyle(
//   pixiText: PIXI.Text,
//   styleProps: Partial<KoreanTextStyleType>
// ): void {
//   // This function is problematic because PIXI.TextStyle properties are largely readonly after creation.
//   // It's better to create a new PIXI.TextStyle object.
//   // If dynamic updates are needed, pixiText.style = new PIXI.TextStyle({...pixiText.style.toObject(), ...newStyles});
// }
