import React, { useCallback } from "react";
import { Container, Text } from "@pixi/react";
import { TrigramWheel } from "../../ui/TrigramWheel";
import { KoreanButton } from "../../ui/base/KoreanPixiComponents";
import type { PlayerState, TrigramStance } from "../../../types";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY_PRIMARY,
} from "../../../types/constants";
import { useAudio } from "../../../audio/AudioManager";

export interface CombatControlsProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly isExecutingTechnique: boolean;
  readonly isPaused: boolean;
  readonly width?: number;
  readonly height?: number;
}

export function CombatControls({
  players,
  onStanceChange,
  isExecutingTechnique,
  isPaused,
  width = 800,
  height = 600,
}: CombatControlsProps): React.ReactElement {
  const audio = useAudio();
  const [player1, player2] = players;

  const handleStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance) => {
      if (!isPaused && !isExecutingTechnique) {
        audio.playSFX("stance_select");
        onStanceChange(playerIndex, stance);
      }
    },
    [isPaused, isExecutingTechnique, onStanceChange, audio]
  );

  const handleTechniqueButton = useCallback(() => {
    if (!isPaused && !isExecutingTechnique) {
      audio.playSFX("technique_execute");
      // Technique execution logic would go here
    }
  }, [isPaused, isExecutingTechnique, audio]);

  return (
    <Container>
      {/* Player 1 Controls - Bottom Left */}
      <Container x={100} y={height - 150}>
        <Text
          text="플레이어 1 - 자세 선택"
          anchor={0.5}
          y={-30}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 14,
            fill: KOREAN_COLORS.CYAN,
            fontWeight: "bold",
          }}
        />

        <TrigramWheel
          currentStance={player1.stance}
          onStanceSelect={(stance) => handleStanceChange(0, stance)}
          radius={60}
          disabled={isPaused || isExecutingTechnique}
          showLabels={true}
        />

        {/* Technique button */}
        <KoreanButton
          koreanText="기술 실행"
          variant="primary"
          x={-50}
          y={100}
          width={100}
          height={30}
          onClick={handleTechniqueButton}
          disabled={isPaused || isExecutingTechnique || player1.ki < 20}
        />
      </Container>

      {/* Player 2 Controls - Bottom Right */}
      <Container x={width - 100} y={height - 150}>
        <Text
          text="플레이어 2 - 자세 선택"
          anchor={0.5}
          y={-30}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 14,
            fill: KOREAN_COLORS.TRADITIONAL_RED,
            fontWeight: "bold",
          }}
        />

        <TrigramWheel
          currentStance={player2.stance}
          onStanceSelect={(stance) => handleStanceChange(1, stance)}
          radius={60}
          disabled={isPaused || isExecutingTechnique}
          showLabels={true}
        />

        {/* Technique button */}
        <KoreanButton
          koreanText="기술 실행"
          variant="secondary"
          x={-50}
          y={100}
          width={100}
          height={30}
          onClick={handleTechniqueButton}
          disabled={isPaused || isExecutingTechnique || player2.ki < 20}
        />
      </Container>

      {/* Control Instructions */}
      <Container x={width / 2} y={height - 100}>
        <Text
          text="1-8: 자세 변경 | SPACE: 기술 실행 | ESC: 일시정지"
          anchor={0.5}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 12,
            fill: KOREAN_COLORS.GRAY_LIGHT,
            alpha: 0.8,
          }}
        />
      </Container>
    </Container>
  );
}
