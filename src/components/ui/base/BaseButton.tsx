import { useState, useCallback } from "react";
import type { JSX } from "react";

export interface BaseButtonProps {
  readonly width: number;
  readonly height: number;
  readonly text: string;
  readonly onSelect?: () => void;
  readonly onActivate?: () => void;
  readonly keyBinding?: string;
  readonly showKeyBinding?: boolean;
  readonly isEnabled?: boolean;
  readonly style?: {
    readonly backgroundColor?: number;
    readonly borderColor?: number;
    readonly textColor?: number;
    readonly hoverColor?: number;
  };
}

export function BaseButton({
  width,
  height,
  text,
  onSelect,
  onActivate,
  isEnabled = true,
  style = {},
}: BaseButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerDown = useCallback(() => {
    if (!isEnabled) return;
    onActivate?.();
  }, [isEnabled, onActivate]);

  const handlePointerEnter = useCallback(() => {
    if (!isEnabled) return;
    setIsHovered(true);
    onSelect?.();
  }, [isEnabled, onSelect]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const drawButton = useCallback(
    (g: any) => {
      g.clear();

      // Button background
      const bgColor = isHovered
        ? style.hoverColor || 0x555555
        : style.backgroundColor || 0x333333;

      g.setFillStyle({ color: bgColor, alpha: 0.8 });
      g.roundRect(-width / 2, -height / 2, width, height, 5);
      g.fill();

      // Button border
      const borderColor =
        style.borderColor || (isHovered ? 0xffd700 : 0x666666);
      g.setStrokeStyle({ color: borderColor, width: 2, alpha: 0.9 });
      g.roundRect(-width / 2, -height / 2, width, height, 5);
      g.stroke();
    },
    [width, height, isHovered, style]
  );

  return (
    <pixiContainer
      interactive={isEnabled}
      cursor={isEnabled ? "pointer" : "default"}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <pixiGraphics draw={drawButton} />

      <pixiText
        text={text}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: style.textColor || (isEnabled ? 0xffffff : 0x999999),
          fontWeight: "bold",
        }}
      />
    </pixiContainer>
  );
}
