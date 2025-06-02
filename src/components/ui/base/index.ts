// Base UI component exports for Korean martial arts game

export {
  KoreanText,
  KoreanMartialText,
  KoreanTechniqueText,
  KoreanStatusText,
  KoreanTitle,
  KoreanTextUtils,
  validateKoreanText,
  type KoreanTextProps,
  type KoreanMartialTextProps,
  type KoreanTechniqueTextProps,
  type KoreanStatusTextProps,
  type KoreanTitleProps,
  type KoreanTextSize,
  type KoreanTextVariant,
  type KoreanTextEmphasis,
  type MartialVariant,
  type HonorLevel,
} from "./korean-text";

export {
  BackgroundGrid,
  CyberpunkBackground,
  type BackgroundGridProps,
  type CyberpunkBackgroundProps,
} from "./BackgroundGrid";

export {
  PixiContainerComponent,
  PixiGraphicsComponent,
  PixiTextComponent,
} from "./PixiComponents";

export { BaseButton, type BaseButtonProps } from "./BaseButton";

// Utility type for Korean UI theming
export interface KoreanUITheme {
  readonly primaryColor: number;
  readonly accentColor: number;
  readonly backgroundColor: number;
  readonly textColor: number;
  readonly fontFamily: string;
}

// Default Korean martial arts theme
export const KOREAN_MARTIAL_THEME: KoreanUITheme = {
  primaryColor: 0xffd700, // GOLD
  accentColor: 0x00ffff, // CYAN
  backgroundColor: 0x000000, // BLACK
  textColor: 0xffffff, // WHITE
  fontFamily: "Noto Sans KR, Arial, sans-serif",
} as const;
