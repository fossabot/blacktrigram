import { useState, useCallback } from "react";
import type { JSX } from "react";

interface BaseButtonProps {
  readonly text: string;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly variant?: "primary" | "secondary" | "danger";
}

const BUTTON_COLORS = {
  primary: {
    background: 0x004455,
    backgroundHover: 0x00556d,
    border: 0x00ffd0,
    text: 0xffffff,
  },
  secondary: {
    background: 0x2a2a2a,
    backgroundHover: 0x3a3a3a,
    border: 0x666666,
    text: 0xcccccc,
  },
  danger: {
    background: 0x8b0000,
    backgroundHover: 0xa50000,
    border: 0xff0000,
    text: 0xffffff,
  },
} as const;

export function BaseButton({
  text,
  x = 0,
  y = 0,
  width = 200,
  height = 60,
  onClick,
  disabled = false,
  variant = "primary",
}: BaseButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const colors = BUTTON_COLORS[variant];

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  const handlePointerDown = useCallback(() => {
    if (!disabled) {
      setIsPressed(true);
    }
  }, [disabled]);

  const handlePointerUp = useCallback(() => {
    setIsPressed(false);
    handleClick();
  }, [handleClick]);

  const handlePointerEnter = useCallback(() => {
    if (!disabled) {
      setIsHovered(true);
    }
  }, [disabled]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
  }, []);

  // Use direct PIXI components via global declarations
  return (
    <pixiContainer
      x={x}
      y={y}
      interactive={!disabled}
      cursor={disabled ? "not-allowed" : "pointer"}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <pixiGraphics
        draw={(g: any) => {
          g.clear();

          const bgColor = disabled
            ? 0x444444
            : isPressed
            ? colors.background
            : isHovered
            ? colors.backgroundHover
            : colors.background;

          const borderColor = disabled ? 0x666666 : colors.border;
          const alpha = disabled ? 0.5 : isPressed ? 0.8 : 1.0;

          // Button background
          g.setFillStyle({ color: bgColor, alpha });
          g.roundRect(-width / 2, -height / 2, width, height, 8);
          g.fill();

          // Button border
          g.setStrokeStyle({
            color: borderColor,
            width: 2,
            alpha: disabled ? 0.3 : isHovered ? 1.0 : 0.7,
          });
          g.roundRect(-width / 2, -height / 2, width, height, 8);
          g.stroke();

          // Pressed effect
          if (isPressed && !disabled) {
            g.setFillStyle({ color: 0x000000, alpha: 0.2 });
            g.roundRect(-width / 2, -height / 2, width, height, 8);
            g.fill();
          }
        }}
      />
      <pixiText
        text={text}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: disabled ? 0x888888 : colors.text,
          fontWeight: "600",
          ...(isHovered &&
            !disabled && {
              dropShadow: {
                color: colors.border,
                blur: 4,
                distance: 0,
              },
            }),
        }}
      />
    </pixiContainer>
  );
}
