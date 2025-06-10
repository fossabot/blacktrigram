// Base button component with Korean martial arts styling

import React, { useCallback, useMemo, useState } from "react";
import * as PIXI from "pixi.js";
import type { BaseButtonProps } from "../../../types/components";
import { CYBERPUNK_COLORS } from "../../../types/constants/colors";
import { KOREAN_TYPOGRAPHY } from "../../../types/constants/typography";
import { usePixiExtensions } from "../../../utils/pixiExtensions";

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
  // Ensure PixiJS components are extended
  usePixiExtensions();

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const buttonColors = useMemo(() => {
    const baseColors = {
      primary: CYBERPUNK_COLORS.NEON_CYAN,
      secondary: CYBERPUNK_COLORS.NEON_PURPLE,
      accent: CYBERPUNK_COLORS.ACCENT_BLUE,
      ghost: CYBERPUNK_COLORS.TEXT_SECONDARY,
      danger: CYBERPUNK_COLORS.WARNING_RED,
    };

    return {
      normal: baseColors[variant],
      hover: CYBERPUNK_COLORS.ACCENT_BLUE,
      pressed: CYBERPUNK_COLORS.ACCENT_ORANGE,
      disabled: CYBERPUNK_COLORS.NEUTRAL_GRAY,
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

      // Draw button background
      g.beginFill(currentColor, 0.8);
      g.drawRoundedRect(0, 0, width, height, 8);
      g.endFill();

      // Draw border
      g.lineStyle(2, currentColor, 1);
      g.drawRoundedRect(0, 0, width, height, 8);

      // Draw inner glow effect
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
        fontFamily: KOREAN_TYPOGRAPHY.FONTS.HEADING.join(", "),
        fontSize: KOREAN_TYPOGRAPHY.SIZES.BODY,
        fill: disabled
          ? CYBERPUNK_COLORS.NEUTRAL_GRAY
          : CYBERPUNK_COLORS.TEXT_PRIMARY,
        align: "center",
        dropShadow: {
          color: CYBERPUNK_COLORS.SHADOW,
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
