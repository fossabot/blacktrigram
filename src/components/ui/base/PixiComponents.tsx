import React, { useCallback } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface PixiGraphicsComponentProps {
  readonly x?: number;
  readonly y?: number;
  readonly interactive?: boolean;
  readonly draw: (graphics: PixiGraphics) => void;
  readonly onClick?: (() => void) | null;
  readonly onPointerDown?: (() => void) | null;
  readonly alpha?: number;
  readonly visible?: boolean;
}

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

export interface PixiTextComponentProps {
  readonly text: string;
  readonly x?: number;
  readonly y?: number;
  readonly anchor?: { x: number; y: number } | number;
  readonly style?: {
    readonly fontFamily?: string;
    readonly fontSize?: number;
    readonly fill?: number | string;
    readonly fontWeight?:
      | "normal"
      | "bold"
      | "bolder"
      | "lighter"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900";
  };
  readonly alpha?: number;
  readonly visible?: boolean;
}

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

export interface PixiContainerComponentProps {
  readonly children?: React.ReactNode;
  readonly x?: number;
  readonly y?: number;
  readonly interactive?: boolean;
  readonly onClick?: (() => void) | null;
  readonly onPointerDown?: (() => void) | null;
  readonly onPointerEnter?: (() => void) | null;
  readonly onPointerLeave?: (() => void) | null;
  readonly alpha?: number;
  readonly visible?: boolean;
  readonly scale?: number | { x: number; y: number };
}

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
