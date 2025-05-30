import { useCallback } from "react";
import type { JSX } from "react";
import { KOREAN_COLORS } from "../../../types";
import type { Graphics as PixiGraphics, FederatedPointerEvent } from "pixi.js";
import { Container, Graphics, Text } from "./PixiComponents";

export interface BaseButtonProps {
  readonly text: string;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly isSelected?: boolean;
  readonly isEnabled?: boolean;
  readonly onClick?: () => void;
  readonly onHover?: () => void;
  readonly testId?: string;
}

export function BaseButton({
  text,
  x = 0,
  y = 0,
  width = 200,
  height = 50,
  isSelected = false,
  isEnabled = true,
  onClick,
  onHover,
  testId,
}: BaseButtonProps): JSX.Element {
  const handlePointerDown = useCallback(
    (event: FederatedPointerEvent) => {
      event.stopPropagation();
      if (isEnabled && onClick) {
        onClick();
      }
    },
    [isEnabled, onClick]
  );

  const handlePointerEnter = useCallback(() => {
    if (isEnabled && onHover) {
      onHover();
    }
  }, [isEnabled, onHover]);

  const drawButton = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      const bgColor = isSelected
        ? KOREAN_COLORS.GOLD
        : isEnabled
        ? KOREAN_COLORS.DOJANG_BLUE
        : KOREAN_COLORS.GRAY_DARK;

      const alpha = isEnabled ? 0.9 : 0.5;

      // Button background
      g.setFillStyle({ color: bgColor, alpha });
      g.roundRect(-width / 2, -height / 2, width, height, 10);
      g.fill();

      // Button border
      g.setStrokeStyle({
        color: isSelected ? KOREAN_COLORS.WHITE : KOREAN_COLORS.GOLD,
        width: 2,
        alpha: isEnabled ? 1.0 : 0.5,
      });
      g.roundRect(-width / 2, -height / 2, width, height, 10);
      g.stroke();
    },
    [width, height, isSelected, isEnabled]
  );

  // Create container props to handle optional testId properly
  const containerProps: any = {
    x,
    y,
    interactive: isEnabled,
    cursor: isEnabled ? "pointer" : "default",
    onPointerDown: handlePointerDown,
    onPointerEnter: handlePointerEnter,
  };

  // Only add testId if it's defined
  if (testId !== undefined) {
    containerProps["data-testid"] = testId;
  }

  return (
    <Container {...containerProps}>
      <Graphics draw={drawButton} />

      <Text
        text={text}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: isSelected ? KOREAN_COLORS.BLACK : KOREAN_COLORS.WHITE,
          fontWeight: "bold",
        }}
        alpha={isEnabled ? 1.0 : 0.6}
      />
    </Container>
  );
}
