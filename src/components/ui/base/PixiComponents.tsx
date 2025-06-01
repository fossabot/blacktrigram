import React, { useCallback } from "react";
import type {
  PixiGraphicsComponentProps,
  PixiTextComponentProps,
  PixiContainerComponentProps,
} from "../../../types";

// PixiJS component types are now imported from centralized types

export function PixiGraphicsComponent({
  x = 0,
  y = 0,
  interactive = false,
  draw,
  onClick = null,
  onPointerDown = null,
  alpha = 1,
  visible = true,
}: PixiGraphicsComponentProps): React.ReactElement {
  const memoizedDraw = useCallback(draw, [draw]);

  return (
    <pixiGraphics
      x={x}
      y={y}
      interactive={interactive}
      draw={memoizedDraw}
      onClick={onClick}
      onPointerDown={onPointerDown}
      alpha={alpha}
      visible={visible}
    />
  );
}

// Additional component type definitions moved to centralized types

export function PixiTextComponent({
  text,
  x = 0,
  y = 0,
  anchor = { x: 0, y: 0 },
  style = {},
  alpha = 1,
  visible = true,
}: PixiTextComponentProps): React.ReactElement {
  return (
    <pixiText
      text={text}
      x={x}
      y={y}
      anchor={anchor}
      style={style}
      alpha={alpha}
      visible={visible}
    />
  );
}

// All component types consolidated in centralized location

export function PixiContainerComponent({
  children,
  x = 0,
  y = 0,
  interactive = false,
  onClick = null,
  onPointerDown = null,
  onPointerEnter = null,
  onPointerLeave = null,
  alpha = 1,
  visible = true,
  scale = 1,
}: PixiContainerComponentProps): React.ReactElement {
  return (
    <pixiContainer
      x={x}
      y={y}
      interactive={interactive}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      alpha={alpha}
      visible={visible}
      scale={scale}
    >
      {children}
    </pixiContainer>
  );
}
