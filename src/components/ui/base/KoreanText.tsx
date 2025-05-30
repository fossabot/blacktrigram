import { Text as PixiText } from "@pixi/react";
import React from "react";
import type {
  ITextStyle as PixiTextStyle,
  TextProps as PixiReactTextProps,
} from "@pixi/react"; // Correct imports

interface KoreanTextProps extends Omit<PixiReactTextProps, "style"> {
  readonly text: string;
  readonly style?: Partial<PixiTextStyle>;
  readonly x?: number;
  readonly y?: number;
  readonly anchor?: number | { x: number; y: number };
}

const defaultKoreanTextStyle: Partial<PixiTextStyle> = {
  fontFamily: "Noto Sans KR, Arial, sans-serif",
  fontSize: 16,
  fill: 0xffffff,
  align: "left",
  wordWrap: true,
  wordWrapWidth: 400, // Default wrap width
};

export function KoreanText({
  text,
  style,
  ...rest
}: KoreanTextProps): React.JSX.Element {
  const mergedStyle: Partial<PixiTextStyle> = {
    ...defaultKoreanTextStyle,
    ...style,
  }; // Ensure mergedStyle is Partial<PixiTextStyle>

  return <PixiText text={text} style={mergedStyle} {...rest} />;
}

// Helper function to validate Korean text
export function isKoreanText(text: string): boolean {
  // Check if text contains Korean characters (Hangul)
  const koreanRegex = /[\uAC00-\uD7AF]/;
  return koreanRegex.test(text);
}

// Helper function to format Korean technique names
export function formatKoreanTechniqueName(
  korean: string,
  english?: string
): string {
  if (english) {
    return `${korean} (${english})`;
  }
  return korean;
}

// Korean martial arts terminology helpers
export const KOREAN_MARTIAL_TERMS = {
  // Basic greetings and respect
  dojang: "도장",
  sensei: "선생님",
  bow: "절",
  respect: "예의",

  // Eight trigrams
  heaven: "건 (乾)",
  lake: "태 (兌)",
  fire: "리 (離)",
  thunder: "진 (震)",
  wind: "손 (巽)",
  water: "감 (坎)",
  mountain: "간 (艮)",
  earth: "곤 (坤)",

  // Combat terms
  attack: "공격",
  defense: "방어",
  victory: "승리",
  defeat: "패배",
  technique: "기법",
  vitalPoint: "급소",
  stance: "자세",

  // Training terms
  practice: "연습",
  training: "훈련",
  mastery: "숙련",
  progress: "진보",
} as const;

export type KoreanMartialTerm = keyof typeof KOREAN_MARTIAL_TERMS;
