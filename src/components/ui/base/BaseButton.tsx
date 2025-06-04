// Base button component with Korean martial arts styling

import React, { useCallback } from "react";
import { KOREAN_COLORS } from "../../../types";

export interface BaseButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "style" | "className"
  > {
  readonly onClick?: () => void;
  readonly style?: React.CSSProperties;
  readonly className?: string;
  readonly loading?: boolean;
  readonly variant?: "primary" | "secondary" | "danger";
  readonly size?: "small" | "medium" | "large";
}

export function BaseButton({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  className,
  style,
  ...props
}: BaseButtonProps): React.ReactElement {
  const handleClick = useCallback(() => {
    if (onClick && !disabled && !loading) {
      onClick();
    }
  }, [onClick, disabled, loading]);

  const getBackgroundColor = useCallback((): string => {
    switch (variant) {
      case "primary":
        return `#${KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(6, "0")}`;
      case "secondary":
        return `#${KOREAN_COLORS.SILVER.toString(16).padStart(6, "0")}`;
      case "danger":
        return `#${KOREAN_COLORS.TRADITIONAL_RED.toString(16).padStart(
          6,
          "0"
        )}`;
      default:
        return `#${KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(6, "0")}`;
    }
  }, [variant]);

  const getTextColor = useCallback((): string => {
    switch (variant) {
      case "primary":
        return `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`;
      case "secondary":
        return `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`;
      case "danger":
        return `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`;
      default:
        return `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`;
    }
  }, [variant]);

  const getPadding = () => {
    switch (size) {
      case "small":
        return "0.5rem 1rem";
      case "medium":
        return "0.75rem 1.5rem";
      case "large":
        return "1rem 2rem";
      default:
        return "0.75rem 1.5rem";
    }
  };

  return (
    <button
      {...props}
      className={className}
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        padding: getPadding(),
        fontSize:
          size === "small"
            ? "0.875rem"
            : size === "large"
            ? "1.125rem"
            : "1rem",
        border: "none",
        borderRadius: "4px",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.6 : 1,
        transition: "all 0.2s ease",
        fontFamily: "Noto Sans KR, Arial, sans-serif",
        fontWeight: 500,
        ...style,
      }}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
