import React, { useCallback } from "react";
import { KOREAN_COLORS } from "../../../types/constants";
import type { PlayerState } from "../../../types/player";
import type { TrigramStance } from "../../../types/enums";
import { TRIGRAM_DATA } from "../../../types/constants/trigram";

export interface CombatControlsProps {
  readonly onAttack?: () => void;
  readonly onDefend?: () => void;
  readonly onSwitchStance?: (stance: TrigramStance) => void;
  readonly onPauseToggle?: () => void;
  readonly onTechniqueExecute?: (technique: any) => void;
  readonly onGuard?: () => void;
  readonly isPaused?: boolean;
  readonly player: PlayerState;
  readonly isExecutingTechnique?: boolean;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

export const CombatControls: React.FC<CombatControlsProps> = ({
  onAttack,
  onDefend,
  onSwitchStance,
  player,
  onTechniqueExecute,
  isExecutingTechnique = false,
  width = 300,
  height = 100,
  x = 0,
  y = 0,
}) => {
  // Get available techniques based on player stance
  const availableTechniques = React.useMemo(() => {
    if (!player.currentStance) return [];
    return [{ name: { korean: "기본 공격", english: "Basic Attack" } }];
  }, [player.currentStance]);

  // Get current stance data
  const currentStanceData = React.useMemo(() => {
    if (!player.currentStance) return null;
    return TRIGRAM_DATA[player.currentStance];
  }, [player.currentStance]);

  // Handle technique execution
  const handleTechniqueExecute = useCallback(
    (technique: any) => {
      if (onTechniqueExecute) {
        onTechniqueExecute(technique);
      }
    },
    [onTechniqueExecute]
  );

  const controlsPanelDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.7 });
      g.roundRect(0, 0, width, height, 8);
      g.fill();
      g.stroke({ width: 1, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.5 });
      g.roundRect(0, 0, width, height, 8);
      g.stroke();
    },
    [width, height]
  );

  return (
    <pixiContainer x={x} y={y} data-testid="combat-controls">
      {/* Control Panel Background */}
      <pixiGraphics draw={controlsPanelDraw} />

      {/* Attack Button - Fixed for interactive pointer events */}
      <pixiContainer x={10} y={10} interactive={true} onPointerDown={onAttack} data-testid="attack-button">
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.fill({ color: KOREAN_COLORS.ACCENT_RED, alpha: 0.8 });
            g.roundRect(0, 0, 60, 30, 5);
            g.fill();
          }}
        />
        <pixiText
          text="공격"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
          }}
          x={30}
          y={15}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Defend Button - Fixed for interactive pointer events */}
      <pixiContainer x={80} y={10} interactive={true} onPointerDown={onDefend} data-testid="defend-button">
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.fill({ color: KOREAN_COLORS.ACCENT_BLUE, alpha: 0.8 });
            g.roundRect(0, 0, 60, 30, 5);
            g.fill();
          }}
        />
        <pixiText
          text="방어"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
          }}
          x={30}
          y={15}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Current Technique Button */}
      {availableTechniques.length > 0 && (
        <pixiContainer 
          x={150} 
          y={10} 
          interactive={true}
          onPointerDown={() => handleTechniqueExecute(availableTechniques[0])}
          data-testid="technique-button"
        >
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
              g.roundRect(0, 0, 80, 30, 5);
              g.fill();
            }}
          />
          <pixiText
            text={availableTechniques[0].name.korean}
            style={{
              fontSize: 10,
              fill: KOREAN_COLORS.BLACK_SOLID,
              align: "center",
            }}
            x={40}
            y={15}
            anchor={0.5}
          />
        </pixiContainer>
      )}

      {/* Current Stance Display */}
      <pixiContainer x={10} y={50}>
        <pixiText
          text={`현재 자세: ${currentStanceData?.name.korean || "없음"}`}
          style={{
            fontSize: 10,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
        />
      </pixiContainer>

      {/* Stance Change Button - Fix for interactive pointer events */}
      {onSwitchStance && (
        <pixiContainer 
          x={150} 
          y={50} 
          interactive={true} 
          onPointerDown={() => onSwitchStance(player.currentStance)}
          data-testid="stance-change-button"
        >
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.ACCENT_CYAN, alpha: 0.8 });
              g.roundRect(0, 0, 80, 20, 3);
              g.fill();
            }}
          />
          <pixiText
            text="자세 변경"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.BLACK_SOLID,
              align: "center",
            }}
            x={40}
            y={10}
            anchor={0.5}
          />
        </pixiContainer>
      )}

      {/* Execution Status */}
      {isExecutingTechnique && (
        <pixiContainer x={width / 2} y={height / 2}>
          <pixiText
            text="기술 실행 중..."
            style={{
              fontSize: 12,
              fill: KOREAN_COLORS.WARNING_YELLOW,
              align: "center",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default CombatControls;