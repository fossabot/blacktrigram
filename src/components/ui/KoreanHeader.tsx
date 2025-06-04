import React from "react";
import { KoreanText } from "./base/korean-text";
import type { KoreanHeaderProps } from "../../types/components";

/**
 * Korean Header Component for Black Trigram
 * Displays bilingual Korean-English headers with proper styling
 */
export function KoreanHeader({
  korean,
  english,
  subtitle,
  level = 1,
  showLogo = false,
  style = {},
  onBackButtonClick,
  className = "",
}: KoreanHeaderProps): React.JSX.Element {
  const baseStyles: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#00ffff",
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    ...style,
  };

  return (
    <header className={`korean-header ${className}`} style={baseStyles}>
      {showLogo && (
        <div className="logo-section" style={{ marginBottom: "1rem" }}>
          <span style={{ fontSize: "2rem", color: "#ffd700" }}>☰☱☲☳☴☵☶☷</span>
        </div>
      )}

      <KoreanText
        korean={korean}
        english={english}
        size={level === 1 ? "xxlarge" : level === 2 ? "xlarge" : "large"}
        weight="bold"
        align="center"
        emphasis="glow"
      />

      {subtitle && (
        <div style={{ marginTop: "0.5rem", opacity: 0.8 }}>
          {typeof subtitle === "string" ? (
            <p style={{ fontSize: "1rem", margin: 0 }}>{subtitle}</p>
          ) : (
            <KoreanText
              korean={subtitle.korean}
              english={subtitle.english}
              size="medium"
              align="center"
            />
          )}
        </div>
      )}

      {onBackButtonClick && (
        <button
          onClick={onBackButtonClick}
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            background: "rgba(0, 255, 255, 0.2)",
            border: "1px solid #00ffff",
            color: "#00ffff",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← 뒤로 / Back
        </button>
      )}
    </header>
  );
}
