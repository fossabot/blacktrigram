import { useCallback } from "react";
import type { JSX } from "react";
import { KOREAN_COLORS } from "../../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface MenuSectionProps {
  readonly selectedOption: "training" | "combat" | "settings";
  readonly onOptionChange: (option: "training" | "combat" | "settings") => void;
  readonly onNext: () => void;
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
}

export function MenuSection({
  selectedOption,
  onOptionChange,
  onNext,
  onStartGame,
  onStartTraining,
}: MenuSectionProps): JSX.Element {
  const drawMenuBackground = useCallback((g: PixiGraphics) => {
    g.clear();

    // Traditional Korean menu panel
    g.setFillStyle({
      color: KOREAN_COLORS.BLACK,
      alpha: 0.85,
    });
    g.roundRect(-200, -150, 400, 300, 15);
    g.fill();

    // Golden border
    g.setStrokeStyle({
      color: KOREAN_COLORS.GOLD,
      width: 2,
      alpha: 0.9,
    });
    g.roundRect(-200, -150, 400, 300, 15);
    g.stroke();
  }, []);

  return (
    <pixiContainer x={100} y={200} data-testid="menu-section">
      <pixiGraphics draw={drawMenuBackground} />

      {/* Menu Title */}
      <pixiText
        text="메뉴 (Menu)"
        x={300}
        y={50}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 24,
          fill: 0xffd700,
          fontWeight: "bold",
        }}
      />

      {/* Menu options with selection highlighting */}
      <pixiContainer
        x={50}
        y={120}
        interactive={true}
        cursor="pointer"
        onPointerDown={() => onOptionChange("training")}
      >
        <pixiText
          text="1. 훈련 모드 (Training Mode)"
          x={0}
          y={0}
          anchor={{ x: 0, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: selectedOption === "training" ? 0xffd700 : 0xffffff,
          }}
        />
      </pixiContainer>

      <pixiContainer
        x={50}
        y={160}
        interactive={true}
        cursor="pointer"
        onPointerDown={() => onOptionChange("combat")}
      >
        <pixiText
          text="2. 대전 모드 (Combat Mode)"
          x={0}
          y={0}
          anchor={{ x: 0, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: selectedOption === "combat" ? 0xffd700 : 0xffffff,
          }}
        />
      </pixiContainer>

      <pixiContainer
        x={50}
        y={200}
        interactive={true}
        cursor="pointer"
        onPointerDown={() => onOptionChange("settings")}
      >
        <pixiText
          text="3. 설정 (Settings)"
          x={0}
          y={0}
          anchor={{ x: 0, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: selectedOption === "settings" ? 0xffd700 : 0xffffff,
          }}
        />
      </pixiContainer>

      {/* Action buttons */}
      <pixiContainer
        x={150}
        y={280}
        interactive={true}
        cursor="pointer"
        onPointerDown={
          selectedOption === "training" ? onStartTraining : onStartGame
        }
      >
        <pixiText
          text="시작 (Start)"
          x={0}
          y={0}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: 0xffd700,
          }}
        />
      </pixiContainer>

      {/* Continue to next section button */}
      <pixiContainer
        x={450}
        y={280}
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
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: 0xffd700,
          }}
        />
      </pixiContainer>
    </pixiContainer>
  );
}
