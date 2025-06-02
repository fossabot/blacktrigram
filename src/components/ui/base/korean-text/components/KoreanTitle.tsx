import React from "react";
import type { KoreanTitleProps } from "../types";
import { KoreanText } from "./KoreanText";
import { KOREAN_COLORS } from "../../../../../types";

export function KoreanTitle({
  korean,
  english,
  level = 1,
  className,
  style,
  variant = "title",
  size = "large",
  weight = "bold",
  as: Component = `h${level}`,
  color,
  ...rest
}: KoreanTitleProps): React.ReactElement {
  // If 'as' is a DOM element type string like 'h1'
  if (typeof Component === "string") {
    const titleStyle: React.CSSProperties = {
      color: color
        ? typeof color === "number"
          ? `#${color.toString(16).padStart(6, "0")}`
          : color
        : `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
      fontFamily: "Noto Sans KR, Arial, sans-serif",
      textAlign: "center",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
      margin: "0 0 1rem 0",
      fontWeight: typeof weight === "string" ? weight : "bold",
      fontSize: level === 1 ? "2.5rem" : level === 2 ? "2rem" : "1.5rem",
      ...style,
    };

    return React.createElement(
      Component,
      {
        className,
        style: titleStyle,
        ...rest,
      },
      english ? `${korean} (${english})` : korean
    );
  }

  // If 'as' is a React ComponentType
  return (
    <Component className={className} style={style} {...rest}>
      <KoreanText
        korean={korean}
        english={english}
        variant={variant}
        size={size}
        weight={weight}
        color={color}
      />
    </Component>
  );
}
