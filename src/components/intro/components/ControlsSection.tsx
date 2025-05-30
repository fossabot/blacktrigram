import { useCallback } from "react";
import type { JSX } from "react";
import { KOREAN_COLORS } from "../../../types";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_TEXT_STYLE } from "../../ui/base";

export interface ControlsSectionProps {
  readonly x?: number;
  readonly y?: number;
  readonly onNext: () => void;
  readonly onPrev: () => void;
}

export function ControlsSection({
  x = window.innerWidth / 2,
  y = window.innerHeight - 200,
  onNext,
  onPrev,
}: ControlsSectionProps): JSX.Element {
  const drawControlsBackground = useCallback((g: PixiGraphics) => {
    g.clear();

    // Traditional Korean controls panel
    g.setFillStyle({
      color: KOREAN_COLORS.BLACK,
      alpha: 0.8,
    });
    g.roundRect(-300, -80, 600, 160, 10);
    g.fill();

    // Golden border
    g.setStrokeStyle({
      color: KOREAN_COLORS.GOLD,
      width: 2,
      alpha: 0.9,
    });
    g.roundRect(-300, -80, 600, 160, 10);
    g.stroke();
  }, []);

  return (
    <pixiContainer x={x} y={y} data-testid="controls-section">
      <pixiGraphics draw={drawControlsBackground} />

      {/* Title */}
      <pixiText
        text="조작법 (Controls)"
        anchor={{ x: 0.5, y: 0.5 }}
        y={-50}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 20,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />

      {/* Controls Instructions */}
      <pixiText
        text="화살표 키: 이동 | Space: 공격 | 1-8: 팔괘 자세 변경"
        anchor={{ x: 0.5, y: 0.5 }}
        y={-20}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: KOREAN_COLORS.WHITE,
        }}
      />

      <pixiText
        text="Arrow Keys: Move | Space: Attack | 1-8: Change Trigram Stance"
        anchor={{ x: 0.5, y: 0.5 }}
        y={0}
        alpha={0.8}
        style={{
          fontFamily: "Orbitron",
          fontSize: 12,
          fill: KOREAN_COLORS.WHITE,
        }}
      />

      {/* Advanced Controls */}
      <pixiText
        text="Shift: 방어 (Block) | Ctrl: 회피 (Dodge) | Enter: 확인 (Confirm)"
        anchor={{ x: 0.5, y: 0.5 }}
        y={25}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: KOREAN_COLORS.CYAN,
        }}
      />

      <pixiText
        text="M: 음악 토글 (Music Toggle) | ESC: 일시정지 (Pause)"
        anchor={{ x: 0.5, y: 0.5 }}
        y={45}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: KOREAN_COLORS.GRAY_LIGHT,
        }}
      />

      {/* Navigation buttons */}
      {onPrev && (
        <pixiContainer
          x={100}
          y={400}
          interactive={true}
          cursor="pointer"
          onPointerDown={onPrev}
        >
          <pixiText
            text="← 뒤로 (Back)"
            x={0}
            y={0}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              ...KOREAN_TEXT_STYLE,
              fontSize: 16,
              fill: 0xffd700,
            }}
          />
        </pixiContainer>
      )}

      {onNext && (
        <pixiContainer
          x={700}
          y={400}
          interactive={true}
          cursor="pointer"
          onPointerDown={onNext}
        >
          <pixiText
            text="계속 → (Continue)"
            x={0}
            y={0}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              ...KOREAN_TEXT_STYLE,
              fontSize: 16,
              fill: 0xffd700,
            }}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
}
