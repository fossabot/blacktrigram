import React from "react";
import { Container, Graphics, Text } from "./PixiComponents";
import { KOREAN_COLORS } from "../../../types";
import type { FederatedPointerEvent } from "pixi.js";

export interface BaseButtonProps {
  readonly x: number;
  readonly y: number;
  readonly label: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly variant?: "primary" | "secondary";
  // Add missing props
  readonly width?: number;
  readonly height?: number;
  readonly isSelected?: boolean;
  readonly isEnabled?: boolean;
  readonly text?: string; // For compatibility with existing usage
  readonly testId?: string; // Add testId support for testing
}

export function BaseButton({
  x,
  y,
  label,
  text, // Support both label and text props
  onClick,
  disabled = false,
  variant = "primary",
  width = 120,
  height = 40,
  isSelected = false,
  isEnabled = true,
  testId,
}: BaseButtonProps): React.ReactElement {
  // Use text prop if provided, otherwise use label
  const displayText = text || label;

  // Calculate effective disabled state
  const isDisabled = disabled || !isEnabled;

  // Calculate effective variant based on selection
  const effectiveVariant = isSelected ? "primary" : variant;

  // Fix: Use underscore prefix for intentionally unused parameter
  const handlePointerDown = (_event: FederatedPointerEvent) => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const buttonColor =
    effectiveVariant === "primary"
      ? KOREAN_COLORS.GOLD
      : KOREAN_COLORS.DOJANG_BLUE;

  // Fix: Create container props without undefined values
  const containerProps: any = {
    x,
    y,
    interactive: !isDisabled,
  };

  // Only add onPointerDown if we have an onClick handler and not disabled
  if (!isDisabled && onClick) {
    containerProps.onPointerDown = handlePointerDown;
  }

  return (
    <Container
      {...containerProps}
      data-testid={testId} // Add testId support
    >
      <Graphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({
            color: isDisabled ? 0x444444 : buttonColor,
            alpha: isDisabled ? 0.3 : 0.8,
          });
          g.rect(-width / 2, -height / 2, width, height);
          g.fill();

          g.setStrokeStyle({
            color: isDisabled ? 0x666666 : 0xffffff,
            width: 2,
          });
          g.rect(-width / 2, -height / 2, width, height);
          g.stroke();
        }}
      />

      <Text
        text={displayText}
        anchor={{ x: 0.5, y: 0.5 }}
        style={
          {
            fontSize: 14,
            fill: isDisabled ? KOREAN_COLORS.GRAY_MEDIUM : KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          } as any
        }
      />
    </Container>
  );
}
