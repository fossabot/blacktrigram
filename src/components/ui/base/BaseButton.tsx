import React, { useCallback, useState, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type {
  Graphics as PixiGraphics,
  TextStyle as PixiTextStyle,
} from "pixi.js";
import type { BaseButtonProps, KoreanText } from "../../../types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../types";

// Helper to get text string if KoreanText object is passed
const getButtonText = (text: string | KoreanText | undefined): string => {
  if (typeof text === "string") return text;
  if (text && typeof text === "object" && "korean" in text) return text.korean;
  return "";
};

export function BaseButton({
  text,
  children,
  onClick,
  onPointerOver,
  onPointerOut,
  // icon, // Icon handling needs specific Pixi implementation (e.g., Sprite)
  // fullWidth = false, // fullWidth needs specific Pixi layout logic
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
}: BaseButtonProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerOver = () => {
    if (!disabled && !loading) {
      setIsHovered(true);
      if (onPointerOver) onPointerOver();
    }
  };

  const handlePointerOut = () => {
    if (!disabled && !loading) {
      setIsHovered(false);
      if (onPointerOut) onPointerOut();
    }
  };

  // Updated handleClick to accept FederatedPointerEvent to match onpointerdown prop type
  // Removed unused 'event' parameter by prefixing with an underscore
  const handleClick = (_event: import("pixi.js").FederatedPointerEvent) => {
    if (onClick) onClick(); // Original onClick doesn't expect event, adjust if it should
  };

  const { width, height, fontSize } = useMemo(() => {
    // Removed unused 'padding'
    switch (size) {
      case "small":
        return { width: 100, height: 30, fontSize: 12 };
      case "large":
        return { width: 200, height: 50, fontSize: 20 };
      case "medium":
      default:
        return { width: 150, height: 40, fontSize: 16 };
    }
  }, [size]);

  const drawButton = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      const alpha = disabled || loading ? 0.5 : 1;
      let bgColor: number;
      let borderColor: number = KOREAN_COLORS.GOLD;
      // let textColor: number = KOREAN_COLORS.WHITE; // Text color is handled by PIXI.Text style

      switch (variant) {
        case "secondary":
          bgColor = KOREAN_COLORS.GRAY_DARK;
          borderColor = KOREAN_COLORS.CYAN;
          // textColor = KOREAN_COLORS.WHITE;
          break;
        case "accent":
          bgColor = KOREAN_COLORS.GOLD;
          borderColor = KOREAN_COLORS.BLACK;
          // textColor = KOREAN_COLORS.BLACK;
          break;
        case "danger":
          bgColor = KOREAN_COLORS.RED;
          borderColor = KOREAN_COLORS.WHITE;
          // textColor = KOREAN_COLORS.WHITE;
          break;
        case "primary":
        default:
          bgColor = KOREAN_COLORS.DOJANG_BLUE;
          borderColor = KOREAN_COLORS.GOLD;
          // textColor = KOREAN_COLORS.WHITE;
          break;
      }

      if (isHovered && !disabled && !loading) {
        borderColor = KOREAN_COLORS.CYAN;
      }

      g.setFillStyle({ color: bgColor, alpha: alpha });
      g.roundRect(0, 0, width, height, 8);
      g.fill();

      g.setStrokeStyle({ color: borderColor, width: 2, alpha: alpha });
      g.roundRect(0, 0, width, height, 8);
      g.stroke();
    },
    [width, height, variant, disabled, loading, isHovered]
  );

  const actualText = children ? String(children) : getButtonText(text);
  const textStyle = useMemo((): Partial<PixiTextStyle> => {
    let baseTextColor: number = KOREAN_COLORS.WHITE;
    switch (variant) {
      case "accent":
        baseTextColor = KOREAN_COLORS.BLACK; // Corrected color assignment
        break;
      case "primary":
      case "secondary":
      case "danger":
      default:
        baseTextColor = KOREAN_COLORS.WHITE;
        break;
    }
    return {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: fontSize,
      fill: disabled || loading ? KOREAN_COLORS.GRAY_LIGHT : baseTextColor,
      fontWeight: "bold",
      align: "center",
      // dropShadow: false, // Explicitly set to false or undefined if not used
    };
  }, [fontSize, disabled, loading, variant]);

  return (
    <Container
      interactive={!disabled && !loading}
      eventMode={!disabled && !loading ? "static" : "passive"}
      cursor={!disabled && !loading ? "pointer" : "default"}
      onpointerdown={!disabled && !loading && onClick ? handleClick : undefined}
      onpointerover={handlePointerOver}
      onpointerout={handlePointerOut}
    >
      <Graphics draw={drawButton} />
      {actualText &&
        !loading && ( // Don't show main text if loading
          <Text
            text={actualText}
            x={width / 2}
            y={height / 2}
            anchor={{ x: 0.5, y: 0.5 }}
            style={textStyle}
          />
        )}
      {loading && (
        <Text
          text="로딩중..."
          x={width / 2}
          y={height / 2}
          anchor={{ x: 0.5, y: 0.5 }}
          style={textStyle}
        />
      )}
      {/* Icon rendering would typically involve a Sprite component */}
      {/* {icon && <Sprite texture={PIXI.Texture.from(icon)} />} */}
    </Container>
  );
}
