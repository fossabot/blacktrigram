import { Container } from "@pixi/react";
import type { PlayerState, TrigramStance } from "../../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../../types";
import { TrigramWheel } from "../../ui/TrigramWheel";
import { KoreanText } from "../../ui/base/korean-text/KoreanText";

interface CombatControlsProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly isExecutingTechnique: boolean;
  readonly isPaused: boolean;
}

export function CombatControls({
  players,
  onStanceChange,
  isExecutingTechnique,
  isPaused,
}: CombatControlsProps): React.ReactElement {
  return (
    <Container>
      {/* Player 1 Trigram Wheel */}
      <TrigramWheel
        size={120}
        position={{ x: 120, y: 450 }}
        selectedStance={players[0].stance}
        onStanceChange={(stance) => onStanceChange(0, stance)}
        interactive={!isExecutingTechnique && !isPaused}
      />

      {/* Player 2 Trigram Wheel */}
      <TrigramWheel
        size={120}
        position={{ x: 680, y: 450 }}
        selectedStance={players[1].stance}
        onStanceChange={(stance) => onStanceChange(1, stance)}
        interactive={false} // AI controlled for now
      />

      {/* Combat instructions */}
      <Container x={400} y={520}>
        {players.map((player, index) => (
          <Container key={player.id} y={index * 30}>
            <KoreanText
              korean={`${
                TRIGRAM_DATA[player.stance as keyof typeof TRIGRAM_DATA]
                  ?.symbol || "☰"
              } ${
                TRIGRAM_DATA[player.stance as keyof typeof TRIGRAM_DATA]
                  ?.korean || player.stance
              }`}
              english={`Player ${index + 1}: ${
                TRIGRAM_DATA[player.stance as keyof typeof TRIGRAM_DATA]
                  ?.english || player.stance
              }`}
              style={{
                fontSize: 14,
                fill: `#${KOREAN_COLORS.GOLD.toString(16)}`,
              }}
            />
          </Container>
        ))}
      </Container>
    </Container>
  );
}
