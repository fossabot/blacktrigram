import React from "react";
import type { KoreanHeaderProps } from "../../../types/components";

export function KoreanHeader({
  korean,
  english,
  subtitle,
  level = 2,
  className = "",
  style = {},
}: KoreanHeaderProps): React.JSX.Element {
  // Create proper HTML style object - NOT PIXI TextStyle
  const headerStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: level === 1 ? "2rem" : level === 2 ? "1.5rem" : "1.25rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "0.5rem",
    textAlign: "center",
    ...style, // Merge with passed style
  };

  // Use proper HTML heading elements based on level
  return (
    <header className={`korean-header ${className}`}>
      {level === 1 && (
        <h1 style={headerStyle}>
          <span className="korean-text">{korean}</span>
          {english && (
            <span
              className="english-text"
              style={{ display: "block", fontSize: "0.8em", opacity: 0.8 }}
            >
              {english}
            </span>
          )}
        </h1>
      )}
      {level === 2 && (
        <h2 style={headerStyle}>
          <span className="korean-text">{korean}</span>
          {english && (
            <span
              className="english-text"
              style={{ display: "block", fontSize: "0.8em", opacity: 0.8 }}
            >
              {english}
            </span>
          )}
        </h2>
      )}
      {level === 3 && (
        <h3 style={headerStyle}>
          <span className="korean-text">{korean}</span>
          {english && (
            <span
              className="english-text"
              style={{ display: "block", fontSize: "0.8em", opacity: 0.8 }}
            >
              {english}
            </span>
          )}
        </h3>
      )}
      {subtitle && (
        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.7,
            marginTop: "0.25rem",
          }}
        >
          {typeof subtitle === "string" ? subtitle : subtitle.korean}
        </p>
      )}
    </header>
  );
}

export default KoreanHeader;
