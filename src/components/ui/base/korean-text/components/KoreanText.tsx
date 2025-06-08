import React from "react";
import { weightToCSSValue } from "../utils";
import type { KoreanTextComponentProps } from "../types";
import { KOREAN_FONT_FAMILY } from "../../../../../types/constants";

export const KoreanText: React.FC<KoreanTextComponentProps> = ({
  korean = "",
  english = "",
  size = "medium",
  weight = "regular",
  variant = "primary",
  emphasis = "none",
  display = "both",
  order = "korean_first",
  className,
  cyberpunk = false,
  showUnderline = false,
  color,
  style,
  onClick,
  id,
  children,
  ...rest
}) => {
  const sizeInPixels =
    typeof size === "number"
      ? size
      : {
          small: 12,
          medium: 16,
          large: 20,
          xlarge: 24,
          xxlarge: 32,
          title: 48,
        }[size] || 16;

  const fontWeight = weightToCSSValue(weight);

  const baseColor = color || KOREAN_COLORS.TEXT_PRIMARY;

  const styles: React.CSSProperties = {
    fontFamily: KOREAN_FONT_FAMILY,
    fontSize: `${sizeInPixels}px`,
    fontWeight: fontWeight.toString(),
    color:
      typeof baseColor === "number"
        ? `#${baseColor.toString(16).padStart(6, "0")}`
        : baseColor,
    textDecoration: showUnderline ? "underline" : "none",
    cursor: onClick ? "pointer" : "default",
    ...style,
  };

  const displayText =
    display === "korean"
      ? korean
      : display === "english"
      ? english
      : order === "korean_first"
      ? `${korean} / ${english}`
      : `${english} / ${korean}`;

  const titleAttribute =
    display === "both"
      ? `${korean} / ${english}`
      : display === "korean"
      ? english
      : korean;

  return (
    <span
      className={className}
      style={styles}
      title={titleAttribute}
      onClick={onClick}
      id={id}
      {...rest}
    >
      {displayText}
      {children}
    </span>
  );
};

export default KoreanText;
