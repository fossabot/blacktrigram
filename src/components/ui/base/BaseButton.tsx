// Base button component with Korean martial arts styling

import React, { useCallback, useMemo, useState } from "react";
import * as PIXI from "pixi.js";
import type { BaseButtonProps } from "../../../types/components";
import { KOREAN_COLORS } from "../../../types/constants/colors";
import { FONT_FAMILY, FONT_SIZES } from "../../../types/constants/typography";

export const BaseButton: React.FC<BaseButtonProps> = ({
  x = 0,
  y = 0,
  width = 200,
  height = 50,
  text,
  koreanText,
  onClick,
  disabled = false,
  variant = "primary",
  children,
  testId = "base-button",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const buttonColors = useMemo(() => {
    const baseColors = {
      primary: KOREAN_COLORS.PRIMARY_CYAN,
      secondary: KOREAN_COLORS.SECONDARY_BLUE,
      accent: KOREAN_COLORS.ACCENT_BLUE,
      ghost: KOREAN_COLORS.TEXT_SECONDARY,
      danger: KOREAN_COLORS.NEGATIVE_RED,
    };

    return {
      normal: baseColors[variant],
      hover: KOREAN_COLORS.ACCENT_BLUE,
      pressed: KOREAN_COLORS.ACCENT_ORANGE,
      disabled: KOREAN_COLORS.UI_GRAY,
    };
  }, [variant]);

  const currentColor = disabled
    ? buttonColors.disabled
    : isPressed
    ? buttonColors.pressed
    : isHovered
    ? buttonColors.hover
    : buttonColors.normal;

  const drawButton = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(currentColor, 0.8);
      g.drawRoundedRect(0, 0, width, height, 8);
      g.endFill();
      g.lineStyle(2, currentColor, 1);
      g.drawRoundedRect(0, 0, width, height, 8);

      if (!disabled && (isHovered || isPressed)) {
        g.beginFill(currentColor, 0.3);
        g.drawRoundedRect(2, 2, width - 4, height - 4, 6);
        g.endFill();
      }
    },
    [currentColor, width, height, disabled, isHovered, isPressed]
  );

  const handlePointerDown = useCallback(() => {
    if (!disabled) {
      setIsPressed(true);
    }
  }, [disabled]);

  const handlePointerUp = useCallback(() => {
    if (!disabled) {
      setIsPressed(false);
      onClick?.();
    }
  }, [disabled, onClick]);

  const handlePointerOver = useCallback(() => {
    if (!disabled) {
      setIsHovered(true);
    }
  }, [disabled]);

  const handlePointerOut = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
  }, []);

  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: disabled
          ? KOREAN_COLORS.UI_DISABLED_TEXT
          : KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
        dropShadow: {
          color: KOREAN_COLORS.BLACK_SOLID,
          distance: 2,
          alpha: 0.8,
        },
      }),
    [disabled]
  );

  return (
    <pixiContainer
      x={x}
      y={y}
      interactive={!disabled}
      cursor={disabled ? "default" : "pointer"}
      // Fix: Use correct React event handler names
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      data-testid={testId}
    >
      <pixiGraphics draw={drawButton} />

      {(text || koreanText) && (
        <pixiText
          text={koreanText || text || ""}
          style={textStyle}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
        />
      )}

      {children}
    </pixiContainer>
  );
};

export default BaseButton;
