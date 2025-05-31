import { useCallback, useState, useEffect } from "react";
import { Player } from "./Player";
// import { DojangBackground } from "./DojangBackground"; // DojangBackground is rendered by GameUI's Application
import { HitEffectsLayer } from "./HitEffectsLayer";
import {
  PixiContainerComponent,
  PixiTextComponent,
} from "../ui/base/PixiComponents";
import {
  type GameEngineProps,
  type HitEffect,
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  type TrigramStance,
  TRIGRAM_DATA,
} from "../../types";
import { CombatSystem } from "../../systems/CombatSystem";
import { useAudio } from "../../audio/AudioManager";

export function GameEngine({
  players,
  gamePhase,
  onPlayerUpdate,
  onStanceChange,
}: // timeRemaining, // Received from App.tsx, used for win condition checks there
// currentRound, // Received from App.tsx
// onGamePhaseChange, // Game phase changes (victory/defeat) are handled by App.tsx
GameEngineProps): React.ReactElement {
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const audio = useAudio();

  // Add keyboard input handling for combat controls
  useEffect(() => {
    if (gamePhase !== "combat") return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      const key = event.key.toLowerCase();

      // Stance changes (1-8 keys for trigrams)
      const stanceMap: Record<string, TrigramStance> = {
        "1": "geon",
        "2": "tae",
        "3": "li",
        "4": "jin",
        "5": "son",
        "6": "gam",
        "7": "gan",
        "8": "gon",
      };

      if (stanceMap[key]) {
        onStanceChange(0, stanceMap[key]); // Player 1 stance change
        audio.playStanceChangeSound();
        return;
      }

      // Movement controls for Player 1 (WASD)
      const currentPlayer = players[0];
      let newPosition = { ...currentPlayer.position };
      const moveSpeed = 5;

      switch (key) {
        case "w": // Move up
          newPosition.y = Math.max(50, newPosition.y - moveSpeed);
          break;
        case "s": // Move down
          newPosition.y = Math.min(550, newPosition.y + moveSpeed);
          break;
        case "a": // Move left
          newPosition.x = Math.max(50, newPosition.x - moveSpeed);
          break;
        case "d": // Move right
          newPosition.x = Math.min(750, newPosition.x + moveSpeed);
          break;
        case " ": // Attack with spacebar
          event.preventDefault();
          executeAttack(0, currentPlayer.stance, currentPlayer.position);
          break;
      }

      // Update player position if it changed
      if (
        newPosition.x !== currentPlayer.position.x ||
        newPosition.y !== currentPlayer.position.y
      ) {
        onPlayerUpdate(0, {
          position: newPosition,
          isMoving: true,
        });
      }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      const key = event.key.toLowerCase();

      // Stop movement when keys are released
      if (["w", "s", "a", "d"].includes(key)) {
        onPlayerUpdate(0, { isMoving: false });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gamePhase, players, onPlayerUpdate, onStanceChange, audio]); // Removed executeAttack from dependencies as it's stable if players/onPlayerUpdate are stable

  const executeAttack = useCallback(
    (
      attackerIndex: number,
      stance: TrigramStance,
      position: { x: number; y: number }
    ): void => {
      // Fix: Add bounds checking for array access
      const attacker = players[attackerIndex];
      const defenderIndex = attackerIndex === 0 ? 1 : 0;
      const defender = players[defenderIndex];

      if (!attacker || !defender) {
        console.warn(
          `Invalid player indices: attacker=${attackerIndex}, defender=${defenderIndex}`
        );
        return;
      }

      const technique = TRIGRAM_DATA[stance]?.technique;

      if (!technique) return;

      // Use CombatSystem to resolve the attack
      const attackResult = CombatSystem.resolveAttack(
        attacker,
        defender,
        technique,
        [] // No specific vital points targeted for now
      );

      // Create visual hit effect - Fix: Handle optional korean property
      const effect: HitEffect = {
        id: `hit-${Date.now()}`,
        position,
        damage: attackResult.damage,
        startTime: Date.now(),
        duration: attackResult.critical ? 1500 : 1000,
        type: attackResult.critical
          ? "critical"
          : attackResult.damage > 30
          ? "heavy"
          : attackResult.damage > 20
          ? "medium"
          : "light",
        color: attackResult.critical
          ? KOREAN_COLORS.CRITICAL_RED
          : attackResult.damage > 30
          ? KOREAN_COLORS.Red
          : KOREAN_COLORS.DAMAGE_YELLOW,
        createdAt: Date.now(),
        ...(attackResult.critical && { korean: "치명타!" }), // Only add korean property if critical
      };

      setHitEffects((prev) => [...prev, effect]);

      // Remove effect after duration
      setTimeout(() => {
        setHitEffects((prev) => prev.filter((e) => e.id !== effect.id));
      }, effect.duration);

      // Update both attacker and defender states
      // App.tsx will check win conditions after these updates
      onPlayerUpdate(attackerIndex, {
        ...attackResult.attackerState,
        isAttacking: true,
      });

      onPlayerUpdate(defenderIndex, {
        ...attackResult.defenderState,
      });

      // Reset attacking state after animation
      setTimeout(() => {
        onPlayerUpdate(attackerIndex, { isAttacking: false });
      }, 300);
    },
    [players, onPlayerUpdate, audio] // audio was missing, add if playAttackSound etc. are used inside
  );

  const handlePlayerAttack = useCallback(
    (
      attackerIndex: number,
      stance: TrigramStance,
      position: { x: number; y: number }
    ): void => {
      executeAttack(attackerIndex, stance, position);
    },
    [executeAttack]
  );

  // Non-combat phases use simple text display
  // Victory/Defeat messages are handled by App.tsx's EndScreen or GameUI's overlay
  if (gamePhase !== "combat") {
    let message = "게임 엔진은 전투 중에만 활성화됩니다";
    if (gamePhase === "victory" || gamePhase === "defeat") {
      // This part might be redundant if App.tsx already shows a full EndScreen
      // However, GameEngine might still be mounted, so good to have a fallback.
      message = gamePhase === "victory" ? "승리!" : "패배 또는 무승부";
    }

    return (
      <PixiContainerComponent>
        <PixiTextComponent
          text={message}
          x={400}
          y={300}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 18,
            fill: KOREAN_COLORS.WHITE,
          }}
        />
      </PixiContainerComponent>
    );
  }

  return (
    <PixiContainerComponent>
      {/* Dojang background is rendered by GameUI's Application component */}
      {/* <DojangBackground width={800} height={600} /> */}

      {/* Players */}
      {players.map((playerState, index) => (
        <Player
          key={`player-${index}`}
          playerState={playerState}
          isPlayer1={index === 0}
          onAttack={(
            position // Fix: Remove unused damage parameter
          ) => handlePlayerAttack(index, playerState.stance, position)}
        />
      ))}

      {/* Hit effects layer */}
      <HitEffectsLayer effects={hitEffects} />
    </PixiContainerComponent>
  );
}
