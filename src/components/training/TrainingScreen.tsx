import React, { useState, useCallback, useEffect } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { PlayerState } from "../../types/player";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { VitalPointSystem } from "../../systems/VitalPointSystem";
import { KOREAN_COLORS } from "../../types/constants/colors";
import { PlayerVisuals } from "../game/PlayerVisuals";
import { TrigramStance } from "../../types/enums";
import { usePixiExtensions } from "../../utils/pixiExtensions";

// Extend pixi components
extend({ Container, Graphics, Text });

interface TrainingScreenProps {
  player: PlayerState;
  onPlayerUpdate: (updates: Partial<PlayerState>) => void;
  onReturnToMenu: () => void;
  trigramSystem: TrigramSystem;
  vitalPointSystem: VitalPointSystem;
  width?: number;
  height?: number;
}

const TrainingScreen: React.FC<TrainingScreenProps> = ({
  player,
  onPlayerUpdate,
  onReturnToMenu,
  // We'll use these systems in a future implementation
  trigramSystem: _trigramSystem,
  vitalPointSystem: _vitalPointSystem,
  width = 1200,
  height = 800,
}) => {
  usePixiExtensions();

  const [currentMode, setCurrentMode] = useState<
    "basic" | "intermediate" | "advanced"
  >("basic");
  const [showVitalPoints, setShowVitalPoints] = useState(false);

  // Handle key presses for training mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle stance changes
      if (e.key >= "1" && e.key <= "8") {
        const stanceIndex = parseInt(e.key) - 1;
        const stances: TrigramStance[] = [
          TrigramStance.GEON,
          TrigramStance.TAE,
          TrigramStance.LI,
          TrigramStance.JIN,
          TrigramStance.SON,
          TrigramStance.GAM,
          TrigramStance.GAN,
          TrigramStance.GON,
        ];
        if (stanceIndex >= 0 && stanceIndex < stances.length) {
          onPlayerUpdate({
            currentStance: stances[stanceIndex],
            lastStanceChangeTime: Date.now(),
          });
        }
      }

      // Handle mode changes
      if (e.key === "b") setCurrentMode("basic");
      if (e.key === "i") setCurrentMode("intermediate");
      if (e.key === "a") setCurrentMode("advanced");

      // Toggle vital points
      if (e.key === "v") setShowVitalPoints((prev) => !prev);

      // Execute technique
      if (e.key === " ") {
        onPlayerUpdate({
          lastActionTime: Date.now(),
          recoveryTime: 1000,
        });

        // Simulate executing technique
        setTimeout(() => {
          onPlayerUpdate({
            lastActionTime: 0,
            recoveryTime: 0,
          });
        }, 1000);
      }

      // Return to menu
      if (e.key === "Escape") {
        onReturnToMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPlayerUpdate, onReturnToMenu]);

  // Handle mode change
  const handleModeChange = useCallback(
    (mode: "basic" | "intermediate" | "advanced") => {
      setCurrentMode(mode);
    },
    []
  );

  return (
    <pixiContainer data-testid="training-screen">
      <Application
        width={width}
        height={height}
        antialias={true}
        backgroundColor={KOREAN_COLORS.UI_BACKGROUND_DARK}
      >
        {/* Training Background */}
        <pixiGraphics
          draw={(g: Graphics) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK);
            g.drawRect(0, 0, width, height);
            g.endFill();

            // Draw dojang floor
            g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM);
            g.drawRect(100, 200, width - 200, height - 300);
            g.endFill();

            // Draw dojang walls
            g.beginFill(KOREAN_COLORS.UI_BACKGROUND_LIGHT, 0.2);
            g.drawRect(100, 100, width - 200, 100);
            g.endFill();

            // Draw stance circle
            g.lineStyle(2, KOREAN_COLORS.ACCENT_CYAN, 0.8);
            g.beginFill(KOREAN_COLORS.ACCENT_CYAN, 0.1);
            g.drawCircle(width / 2, height / 2, 100);
            g.endFill();
          }}
        />

        {/* Title */}
        <pixiText
          text="훈련 모드 (Training Mode)"
          x={width / 2}
          y={50}
          anchor={0.5}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 32,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          }}
        />

        {/* Training Mode Tabs */}
        <pixiContainer y={120}>
          <pixiGraphics
            draw={(g: Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRoundedRect(width / 2 - 300, 0, 600, 40, 5);
              g.endFill();
            }}
          />

          {["basic", "intermediate", "advanced"].map((mode, index) => (
            <pixiContainer
              key={mode}
              x={width / 2 - 200 + index * 200}
              y={20}
              interactive={true}
              onPointerDown={() => handleModeChange(mode as any)}
              data-testid={`mode-${mode}`}
            >
              <pixiGraphics
                draw={(g: Graphics) => {
                  g.clear();
                  g.beginFill(
                    currentMode === mode
                      ? KOREAN_COLORS.ACCENT_CYAN
                      : KOREAN_COLORS.UI_BACKGROUND_DARK,
                    0.8
                  );
                  g.drawRoundedRect(-80, -20, 160, 40, 5);
                  g.endFill();
                }}
              />
              <pixiText
                text={
                  mode === "basic"
                    ? "기초 (Basic)"
                    : mode === "intermediate"
                    ? "중급 (Intermediate)"
                    : "고급 (Advanced)"
                }
                anchor={0.5}
                style={{
                  fontFamily: "Noto Sans KR",
                  fontSize: 16,
                  fill:
                    currentMode === mode
                      ? KOREAN_COLORS.UI_BACKGROUND_DARK // Use a proper color constant
                      : KOREAN_COLORS.TEXT_PRIMARY,
                }}
              />
            </pixiContainer>
          ))}
        </pixiContainer>

        {/* Player */}
        <pixiContainer x={width / 2} y={height / 2}>
          <PlayerVisuals playerState={player} />
        </pixiContainer>

        {/* Stance Information */}
        <pixiContainer x={width - 250} y={200}>
          <pixiGraphics
            draw={(g: Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
              g.drawRoundedRect(0, 0, 200, 300, 10);
              g.endFill();
              g.lineStyle(2, KOREAN_COLORS.ACCENT_CYAN, 0.8);
              g.drawRoundedRect(0, 0, 200, 300, 10);
            }}
          />

          <pixiText
            text="현재 자세 (Current Stance)"
            x={100}
            y={20}
            anchor={0.5}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 16,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
            }}
          />

          <pixiText
            text={player.currentStance.toUpperCase()}
            x={100}
            y={50}
            anchor={0.5}
            style={{
              fontFamily: "serif",
              fontSize: 32,
              fill: KOREAN_COLORS.ACCENT_CYAN,
              fontWeight: "bold",
            }}
            data-testid="stance-indicator"
          />

          <pixiText
            text="팔괘 자세 (Trigram Stance)"
            x={100}
            y={80}
            anchor={0.5}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
          />

          <pixiText
            text="사용 방법 (Controls):"
            x={20}
            y={120}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
            }}
          />

          <pixiText
            text="1-8: 자세 변경 (Change Stance)\nSPACE: 기술 실행 (Execute)\nV: 급소 보기 (Vital Points)\nESC: 돌아가기 (Return)"
            x={20}
            y={150}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              lineHeight: 20,
            }}
          />
        </pixiContainer>

        {/* Return Button */}
        <pixiContainer
          x={width - 120}
          y={height - 60}
          interactive={true}
          onPointerDown={onReturnToMenu}
          data-testid="return-to-menu-button"
        >
          <pixiGraphics
            draw={(g: Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.9);
              g.lineStyle(2, KOREAN_COLORS.ACCENT_GOLD, 0.8);
              g.drawRoundedRect(0, 0, 100, 40, 5);
              g.endFill();
            }}
          />

          <pixiText
            text="돌아가기"
            x={50}
            y={20}
            anchor={0.5}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
            }}
          />
        </pixiContainer>

        {/* Show vital points overlay when enabled */}
        {showVitalPoints && (
          <pixiContainer data-testid="vital-point-overlay">
            <pixiGraphics
              draw={(g: Graphics) => {
                g.clear();
                g.beginFill(0x000000, 0.5);
                g.drawRect(0, 0, width, height);
                g.endFill();

                // Draw some example vital points
                for (let i = 0; i < 10; i++) {
                  const x = width / 2 + Math.cos((i / 10) * Math.PI * 2) * 100;
                  const y = height / 2 + Math.sin((i / 10) * Math.PI * 2) * 100;
                  g.beginFill(KOREAN_COLORS.VITAL_POINT_HIT);
                  g.drawCircle(x, y, 5);
                  g.endFill();
                }
              }}
            />
          </pixiContainer>
        )}
      </Application>
    </pixiContainer>
  );
};

export default TrainingScreen;
