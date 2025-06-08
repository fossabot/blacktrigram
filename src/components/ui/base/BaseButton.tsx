// Base button component with Korean martial arts styling

import React, { useCallback, useMemo, useState } from "react";
import { Container, Graphics, Text, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { BaseButtonProps } from "../../../types/components";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
} from "../../../types/constants";

// Button variant configurations
const BUTTON_VARIANTS = {
  primary: {
    bgColor: KOREAN_COLORS.PRIMARY_CYAN,
    textColor: KOREAN_COLORS.BLACK_SOLID,
    borderColor: KOREAN_COLORS.PRIMARY_CYAN,
    hoverBgColor: KOREAN_COLORS.ACCENT_CYAN,
    pressedBgColor: KOREAN_COLORS.PRIMARY_BLUE,
    disabledBgColor: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
    disabledTextColor: KOREAN_COLORS.TEXT_TERTIARY,
  },
  secondary: {
    bgColor: KOREAN_COLORS.SECONDARY_BLUE,
    textColor: KOREAN_COLORS.TEXT_PRIMARY,
    borderColor: KOREAN_COLORS.UI_BORDER,
    hoverBgColor: KOREAN_COLORS.SECONDARY_BLUE_LIGHT,
    pressedBgColor: KOREAN_COLORS.SECONDARY_BLUE_DARK,
    disabledBgColor: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
    disabledTextColor: KOREAN_COLORS.TEXT_TERTIARY,
  },
  danger: {
    bgColor: KOREAN_COLORS.NEGATIVE_RED,
    textColor: KOREAN_COLORS.TEXT_PRIMARY,
    borderColor: KOREAN_COLORS.NEGATIVE_RED,
    hoverBgColor: KOREAN_COLORS.NEGATIVE_RED_LIGHT,
    pressedBgColor: KOREAN_COLORS.NEGATIVE_RED_DARK,
    disabledBgColor: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
    disabledTextColor: KOREAN_COLORS.TEXT_TERTIARY,
  },
  ghost: {
    bgColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
    textColor: KOREAN_COLORS.TEXT_PRIMARY,
    borderColor: KOREAN_COLORS.UI_BORDER,
    hoverBgColor: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
    pressedBgColor: KOREAN_COLORS.UI_BACKGROUND_LIGHT,
    disabledBgColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
    disabledTextColor: KOREAN_COLORS.TEXT_TERTIARY,
  },
  accent: {
    bgColor: KOREAN_COLORS.ACCENT_GOLD,
    textColor: KOREAN_COLORS.BLACK_SOLID,
    borderColor: KOREAN_COLORS.ACCENT_PRIMARY,
    hoverBgColor: KOREAN_COLORS.ACCENT_YELLOW,
    pressedBgColor: KOREAN_COLORS.ACCENT_ORANGE,
    disabledBgColor: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
    disabledTextColor: KOREAN_COLORS.TEXT_TERTIARY,
  },
} as const;

const BUTTON_SIZES = {
  small: { width: 100, height: 32, fontSize: FONT_SIZES.small },
  medium: { width: 150, height: 40, fontSize: FONT_SIZES.medium },
  large: { width: 200, height: 50, fontSize: FONT_SIZES.large },
} as const;

export const BaseButton: React.FC<BaseButtonProps> = ({
  text,
  koreanText,
  icon,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  width: customWidth,
  height: customHeight,
  x = 0,
  y = 0,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerOver,
  onPointerOut,
  testId,
  interactive = true,
  buttonMode = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const variantConfig = BUTTON_VARIANTS[variant];
  const sizeConfig = BUTTON_SIZES[size];
  const buttonWidth = customWidth || sizeConfig.width;
  const buttonHeight = customHeight || sizeConfig.height;

  const buttonTextContent = useMemo(() => {
    if (loading) return "Loading...";
    if (koreanText) return koreanText.korean;
    return text || "";
  }, [text, koreanText, loading]);

  const textStyle = useMemo(() => {
    const color = disabled
      ? variantConfig.disabledTextColor
      : isPressed
      ? variantConfig.textColor
      : isHovered
      ? variantConfig.textColor
      : variantConfig.textColor;

    return new PIXI.TextStyle({
      fontFamily: FONT_FAMILY.PRIMARY,
      fontSize: sizeConfig.fontSize,
      fill: color,
      align: "center",
      fontWeight: "600",
    });
  }, [variantConfig, disabled, isPressed, isHovered, sizeConfig.fontSize]);

  // Simplified text measurement
  const textMetrics = useMemo(() => {
    // Use a simplified approach for text measurement
    const estimatedWidth = buttonTextContent.length * sizeConfig.fontSize * 0.6;
    const estimatedHeight = sizeConfig.fontSize;
    return {
      width: estimatedWidth,
      height: estimatedHeight,
    };
  }, [buttonTextContent, sizeConfig.fontSize]);

  const buttonBackgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      let bgColor: number = variantConfig.bgColor;
      if (disabled) {
        bgColor = variantConfig.disabledBgColor;
      } else if (isPressed) {
        bgColor = variantConfig.pressedBgColor;
      } else if (isHovered) {
        bgColor = variantConfig.hoverBgColor;
      }

      // Background
      g.beginFill(bgColor, 0.9);
      g.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 8);
      g.endFill();

      // Border
      g.lineStyle(2, variantConfig.borderColor, disabled ? 0.3 : 1.0);
      g.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 8);

      // Cyberpunk glow effect
      if (!disabled && (isHovered || isPressed)) {
        g.lineStyle(1, variantConfig.borderColor, 0.6);
        g.drawRoundedRect(-2, -2, buttonWidth + 4, buttonHeight + 4, 10);
      }
    },
    [variantConfig, disabled, isPressed, isHovered, buttonWidth, buttonHeight]
  );

  const handlePointerDown = useCallback(() => {
    if (disabled || loading) return;
    setIsPressed(true);
    onPointerDown?.();
  }, [disabled, loading, onPointerDown]);

  const handlePointerUp = useCallback(() => {
    if (disabled || loading) return;
    setIsPressed(false);
    onPointerUp?.();
    onClick?.();
  }, [disabled, loading, onPointerUp, onClick]);

  const handlePointerOver = useCallback(() => {
    if (disabled || loading) return;
    setIsHovered(true);
    onPointerOver?.();
  }, [disabled, loading, onPointerOver]);

  const handlePointerOut = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
    onPointerOut?.();
  }, [onPointerOut]);

  const iconSize = buttonHeight * 0.6;

  return (
    <Container
      x={x}
      y={y}
      interactive={interactive && !disabled && !loading}
      buttonMode={buttonMode && !disabled && !loading}
      pointerdown={handlePointerDown}
      pointerup={handlePointerUp}
      pointerupoutside={handlePointerUp}
      pointerover={handlePointerOver}
      pointerout={handlePointerOut}
      data-testid={testId}
    >
      <Graphics draw={buttonBackgroundDraw} />

      {/* Icon */}
      {icon && typeof icon === "string" && (
        <Sprite
          texture={PIXI.Texture.from(icon)}
          width={iconSize}
          height={iconSize}
          x={
            buttonTextContent
              ? -textMetrics.width / 2 - 10 - iconSize / 2
              : -(iconSize / 2)
          }
          y={-(iconSize / 2)}
          anchor={0.5}
        />
      )}

      {/* Text */}
      {buttonTextContent && (
        <Text
          text={buttonTextContent}
          style={textStyle}
          anchor={0.5}
          x={buttonWidth / 2 + (icon ? iconSize / 2 + 5 : 0)}
          y={buttonHeight / 2}
        />
      )}

      {/* Loading indicator */}
      {loading && (
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.lineStyle(2, variantConfig.textColor, 0.8);
            g.arc(buttonWidth / 2, buttonHeight / 2, 8, 0, Math.PI);
          }}
        />
      )}
    </Container>
  );
};

export default BaseButton;
