import React from "react";
import { KoreanText } from "./KoreanText";
import type { KoreanTextComponentProps } from "../types";

export interface KoreanStatusTextProps extends KoreanTextComponentProps {
  readonly status: {
    readonly korean: string;
    readonly english: string;
    readonly value?: string | number;
  };
  readonly showIcon?: boolean;
  readonly showValue?: boolean;
}

export const KoreanStatusText: React.FC<KoreanStatusTextProps> = ({
  status,
  size = "medium", // Fix: Use valid size
  weight = "regular", // Fix: Use valid weight
  variant = "primary", // Fix: Use valid variant
  emphasis = "none", // Fix: Use valid emphasis
  display = "both",
  order = "korean_first",
  showIcon = false,
  showValue = true,
  className,
  style,
  ...rest
}) => {
  const statusKoreanLabel =
    showValue && status.value !== undefined
      ? `${status.korean}: ${status.value}`
      : status.korean;

  const statusEnglishLabel =
    showValue && status.value !== undefined
      ? `${status.english}: ${status.value}`
      : status.english;

  return (
    <KoreanText
      korean={statusKoreanLabel}
      english={statusEnglishLabel}
      size={size}
      weight={weight}
      variant={variant}
      emphasis={emphasis}
      display={display}
      order={order}
      className={className}
      style={style}
      {...rest}
    />
  );
};
