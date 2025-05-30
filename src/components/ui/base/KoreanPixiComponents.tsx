import React from "react";
import type { BasePixiProps } from "./PixiComponents";
import { Text, Container, Graphics } from "./PixiComponents";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../types";
import type { FederatedPointerEvent } from "pixi.js";

// Korean button props
export interface KoreanButtonProps extends BasePixiProps {
  readonly text: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly variant?: "primary" | "secondary" | "accent";
  readonly size?: "small" | "medium" | "large";
}

// Korean text component props
export interface KoreanTitleTextProps extends BasePixiProps {
  readonly text: string;
  readonly emphasis?: boolean;
}

export interface KoreanBodyTextProps extends BasePixiProps {
  readonly text: string;
  readonly muted?: boolean;
}

export interface KoreanHighlightTextProps extends BasePixiProps {
  readonly text: string;
  readonly type?: "warning" | "success" | "error" | "info";
}

// Korean button component
export function KoreanButton({
  text,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  x = 0,
  y = 0,
  ...props
}: KoreanButtonProps): React.ReactElement {
  const sizeConfig = {
    small: { width: 120, height: 30, fontSize: 12 },
    medium: { width: 160, height: 40, fontSize: 14 },
    large: { width: 200, height: 50, fontSize: 16 },
  };

  const config = sizeConfig[size];
  const variantColors = {
    primary: KOREAN_COLORS.GOLD,
    secondary: KOREAN_COLORS.DOJANG_BLUE,
    accent: KOREAN_COLORS.TRADITIONAL_RED,
  };

  // Fix: Properly handle event handler - only pass when not disabled and onClick exists
  const handlePointerDown = (_event: FederatedPointerEvent) => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // Fix: Create container props without undefined values
  const containerProps: any = {
    x,
    y,
    interactive: !disabled,
    ...props,
  };

  // Only add onPointerDown if we have an onClick handler and not disabled
  if (!disabled && onClick) {
    containerProps.onPointerDown = handlePointerDown;
  }

  return (
    <Container {...containerProps}>
      <Graphics
        draw={(g) => {
          g.clear();

          // Button background
          g.setFillStyle({
            color: disabled ? 0x444444 : variantColors[variant],
            alpha: disabled ? 0.3 : 0.8,
          });
          g.rect(
            -config.width / 2,
            -config.height / 2,
            config.width,
            config.height
          );
          g.fill();

          // Button border
          g.setStrokeStyle({
            color: disabled ? 0x666666 : 0xffffff,
            width: 2,
          });
          g.rect(
            -config.width / 2,
            -config.height / 2,
            config.width,
            config.height
          );
          g.stroke();
        }}
      />

      <Text
        text={text}
        anchor={{ x: 0.5, y: 0.5 }}
        style={
          {
            fontSize: config.fontSize,
            fontFamily: KOREAN_FONT_FAMILY,
            fill: disabled ? KOREAN_COLORS.GRAY_MEDIUM : KOREAN_COLORS.WHITE,
            fontWeight: "bold",
            ...(disabled
              ? {}
              : {
                  stroke: {
                    color: KOREAN_COLORS.BLACK,
                    width: 1,
                  },
                }),
          } as any
        }
      />
    </Container>
  );
}

// Korean title text
export function KoreanTitleText({
  text,
  emphasis = false,
  x = 0,
  y = 0,
  ...props
}: KoreanTitleTextProps): React.ReactElement {
  // Fix: Create style object without undefined values
  const style: any = {
    fontSize: emphasis ? 24 : 20,
    fontFamily: KOREAN_FONT_FAMILY,
    fill: KOREAN_COLORS.GOLD,
    fontWeight: "bold",
  };

  if (emphasis) {
    style.stroke = {
      color: KOREAN_COLORS.BLACK,
      width: 2,
    };
  }

  return <Text text={text} x={x} y={y} style={style} {...props} />;
}

// Korean body text
export function KoreanBodyText({
  text,
  muted = false,
  x = 0,
  y = 0,
  ...props
}: KoreanBodyTextProps): React.ReactElement {
  // Fix: Create style object without undefined values
  const style: any = {
    fontSize: 14,
    fill: muted ? KOREAN_COLORS.GRAY_LIGHT : KOREAN_COLORS.WHITE,
    fontWeight: muted ? "normal" : "bold",
  };

  if (!muted) {
    style.stroke = {
      color: KOREAN_COLORS.BLACK,
      width: 1,
    };
  }

  return <Text text={text} x={x} y={y} style={style} {...props} />;
}

// Korean highlight text
export function KoreanHighlightText({
  text,
  type = "info",
  x = 0,
  y = 0,
  ...props
}: KoreanHighlightTextProps): React.ReactElement {
  const typeColors = {
    warning: KOREAN_COLORS.Orange,
    success: KOREAN_COLORS.Green,
    error: KOREAN_COLORS.CRITICAL_RED,
    info: KOREAN_COLORS.CYAN,
  };

  return (
    <Text
      text={text}
      x={x}
      y={y}
      style={{
        fontSize: 12,
        fill: typeColors[type],
        fontStyle: type === "warning" ? "italic" : "normal",
      }}
      {...props}
    />
  );
}

// Korean combat status display
export interface KoreanCombatStatusProps extends BasePixiProps {
  readonly status: string;
  readonly critical?: boolean;
}

export function KoreanCombatStatus({
  status,
  critical = false,
  x = 0,
  y = 0,
  ...props
}: KoreanCombatStatusProps): React.ReactElement {
  // Fix: Create style object without undefined values
  const style: any = {
    fontSize: 16,
    fontFamily: KOREAN_FONT_FAMILY,
    fill: critical ? KOREAN_COLORS.CRITICAL_RED : KOREAN_COLORS.WHITE,
    fontWeight: "bold",
  };

  if (critical) {
    style.stroke = {
      color: KOREAN_COLORS.BLACK,
      width: 2,
    };
  }

  return <Text text={status} x={x} y={y} style={style} {...props} />;
}
