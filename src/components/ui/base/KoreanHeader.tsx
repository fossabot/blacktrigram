import React from "react";
import type { KoreanHeaderProps } from "../../../types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../types";

export function KoreanHeader({
  title = "흑괘 무술 도장",
  subtitle = "Black Trigram Martial Arts",
  level = 1,
}: KoreanHeaderProps): React.ReactElement {
  const headerSize = level === 1 ? "2.5rem" : level === 2 ? "2rem" : "1.5rem";
  const subtitleSize = level === 1 ? "1.2rem" : level === 2 ? "1rem" : "0.9rem";

  const titleText =
    typeof title === "string" ? title : `${title.korean} (${title.english})`;
  const subtitleText =
    typeof subtitle === "string"
      ? subtitle
      : `${subtitle.korean} (${subtitle.english})`;

  return (
    <header
      style={{
        textAlign: "center",
        marginBottom: "2rem",
        padding: "1rem",
        fontFamily: KOREAN_FONT_FAMILY,
        background: `linear-gradient(135deg, #${KOREAN_COLORS.DARK_BLUE.toString(
          16
        ).padStart(6, "0")}, #${KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(
          6,
          "0"
        )})`,
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h1
        style={{
          fontSize: headerSize,
          color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
          margin: "0 0 0.5rem 0",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        {titleText}
      </h1>

      {subtitle && (
        <h2
          style={{
            fontSize: subtitleSize,
            color: `#${KOREAN_COLORS.ACCENT_BLUE.toString(16).padStart(
              6,
              "0"
            )}`,
            margin: "0",
            fontWeight: "normal",
          }}
        >
          {subtitleText}
        </h2>
      )}
    </header>
  );
}

export default KoreanHeader;
