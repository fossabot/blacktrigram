// Local Korean text types for component-specific usage
import type {
  KoreanText as BaseKoreanText,
  KoreanTextProps as BaseKoreanTextProps,
  KoreanTextHeaderProps as BaseKoreanTextHeaderProps,
  KoreanTechniqueTextProps as BaseKoreanTechniqueTextProps,
  KoreanStatusTextProps as BaseKoreanStatusTextProps,
  KoreanMartialTextProps as BaseKoreanMartialTextProps,
} from "../../../../types/korean-text";

// Re-export types from main types system with proper aliasing
export type KoreanText = BaseKoreanText;
export type KoreanTextProps = BaseKoreanTextProps;
export type KoreanTextHeaderProps = BaseKoreanTextHeaderProps;
export type KoreanTechniqueTextProps = BaseKoreanTechniqueTextProps;
export type KoreanStatusTextProps = BaseKoreanStatusTextProps;
export type KoreanMartialTextProps = BaseKoreanMartialTextProps;

// Local aliases for convenience
export type KoreanTitleProps = BaseKoreanTextHeaderProps;

// Component-specific extensions (if needed)
export interface LocalKoreanTextProps extends BaseKoreanTextProps {
  readonly testId?: string;
}
