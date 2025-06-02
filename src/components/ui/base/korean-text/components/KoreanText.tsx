import React from "react";
import { useKoreanTextStyle } from "../hooks/useKoreanTextStyle";
import type {
  KoreanText as IKoreanText,
  KoreanTextProps,
} from "../../../../../types"; // Renamed KoreanTextType to IKoreanText to avoid conflict
import { hasKoreanText } from "../utils";

// Main KoreanText component - simplified and focused
export function KoreanText({
  text,
  korean: propKorean, // Explicit korean prop
  english: propEnglish, // Explicit english prop
  englishText: propEnglishText, // Alternative english prop
  showBoth = false,
  bilingual = "stacked",
  tooltip,
  ariaLabel,
  className = "",
  onClick,
  onHover,
  style: inlineStyle, // Renamed from 'style' to avoid conflict with CSSProperties from hook
  children, // Accept children
  ...styleProps // Props for useKoreanTextStyle
}: KoreanTextProps): React.JSX.Element {
  const componentStyle = useKoreanTextStyle({
    text,
    korean: propKorean,
    english: propEnglish,
    ...styleProps,
    style: inlineStyle,
  });

  const koreanContent =
    typeof text === "object" && text && "korean" in text
      ? (text as IKoreanText).korean
      : propKorean ||
        (typeof text === "string" && hasKoreanText(text) ? text : "");
  const englishContent =
    typeof text === "object" && text && "english" in text
      ? (text as IKoreanText).english
      : propEnglish ||
        propEnglishText ||
        (typeof text === "string" && !hasKoreanText(text) ? text : "");

  let content: React.ReactNode = children;

  if (!children) {
    if (showBoth && koreanContent && englishContent) {
      if (bilingual === "stacked") {
        content = (
          <>
            <span lang="ko">{koreanContent}</span>
            <br />
            <span lang="en" style={{ fontSize: "0.8em", opacity: 0.8 }}>
              {englishContent}
            </span>
          </>
        );
      } else if (bilingual === "inline") {
        content = (
          <>
            <span lang="ko">{koreanContent}</span> ({englishContent})
          </>
        );
      } else {
        // tooltip or default
        content = <span lang="ko">{koreanContent}</span>;
        // Tooltip logic would be more complex, potentially using a title attribute or a custom tooltip component
      }
    } else if (koreanContent) {
      content = <span lang="ko">{koreanContent}</span>;
    } else if (englishContent) {
      content = <span lang="en">{englishContent}</span>;
    } else if (typeof text === "string") {
      content = text;
    }
  }

  const finalClassName = `
    black-trigram-korean-text
    ${className}
    ${
      hasKoreanText(String(koreanContent || text || ""))
        ? "korean-script"
        : "latin-script"
    }
  `.trim();

  return (
    <span
      style={componentStyle}
      className={finalClassName}
      onClick={onClick}
      onMouseEnter={onHover ? () => onHover(true) : undefined}
      onMouseLeave={onHover ? () => onHover(false) : undefined}
      aria-label={
        ariaLabel || (typeof tooltip === "string" ? tooltip : undefined)
      }
      title={typeof tooltip === "string" ? tooltip : undefined}
    >
      {content}
    </span>
  );
}
