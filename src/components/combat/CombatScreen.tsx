import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Stage, Container } from "@pixi/react";
import { Application } from "pixi.js";

// Combat Systems
import { CombatSystem } from "../../systems/CombatSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";

// Audio System
import { useAudio } from "../../audio/AudioManager";

// Types
import type {
  PlayerState,
  TrigramStance,
  CombatResult,
  PlayerArchetype,
  HitEffect,
  Position,
} from "../../types";

// Combat Components
import { CombatArena } from "./components/CombatArena";
import { CombatHUD } from "./components/CombatHUD";
import { CombatControls } from "./components/CombatControls";

// Utilities
import { createPlayerState } from "../../utils/playerUtils";

export interface CombatScreenProps {
  readonly player: PlayerState;
  readonly archetype: PlayerArchetype;
  readonly onGameOver: (winner: PlayerState) => void;
  readonly onReturnToMenu: () => void;
}

const ARENA_WIDTH = 800;
const ARENA_HEIGHT = 600;
const ROUND_TIME = 180; // 3 minutes

const CombatScreen: React.FC<CombatScreenProps> = ({
  player,
  archetype,
  onGameOver,
  onReturnToMenu,
}) => {
  const audio = useAudio();

  // Create PIXI Application
  const app = useMemo(() => {
    return new Application({
      width: ARENA_WIDTH,
      height: ARENA_HEIGHT,
      backgroundColor: 0x000000,
      antialias: true,
    });
  }, []);

  // Game State
  const [gameTime, setGameTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(ROUND_TIME);
  const [currentRound, setCurrentRound] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isExecutingTechnique, setIsExecutingTechnique] = useState(false);
  const [combatEffects, setCombatEffects] = useState<readonly HitEffect[]>([]);

  // Player States
  const [playerState, setPlayerState] = useState<PlayerState>(player);
  const [opponent, setOpponent] = useState<PlayerState>(() =>
    createPlayerState("opponent", "amsalja", "tae", {
      position: { x: ARENA_WIDTH * 0.75, y: ARENA_HEIGHT * 0.6 },
      facing: "left",
    })
  );

  const players = useMemo(
    () => [playerState, opponent] as const,
    [playerState, opponent]
  );

  // Combat Systems
  const combatSystem = useMemo(() => new CombatSystem(), []);
  const trigramSystem = useMemo(() => new TrigramSystem(), []);

  // Handle stance changes
  const handleStanceChange = useCallback(
    (playerIndex: number, newStance: TrigramStance) => {
      const currentPlayer = players[playerIndex];

      // Check if stance change is valid
      const canChange = trigramSystem.canTransitionToStance(
        currentPlayer.stance,
        newStance,
        currentPlayer
      );

      if (canChange.allowed) {
        const transitionCost = trigramSystem.calculateTransitionCost(
          currentPlayer.stance,
          newStance,
          currentPlayer
        );

        const updates: Partial<PlayerState> = {
          stance: newStance,
          ki: currentPlayer.ki - transitionCost.ki,
          stamina: currentPlayer.stamina - transitionCost.stamina,
          lastStanceChangeTime: Date.now(),
        };

        if (playerIndex === 0) {
          setPlayerState((prev) => ({ ...prev, ...updates }));
        } else {
          setOpponent((prev) => ({ ...prev, ...updates }));
        }

        audio.playSFX("stance_change");
      } else {
        audio.playSFX("action_blocked");
      }
    },
    [players, trigramSystem, audio]
  );

  // Handle player updates
  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      if (playerIndex === 0) {
        setPlayerState((prev) => ({ ...prev, ...updates }));
      } else {
        setOpponent((prev) => ({ ...prev, ...updates }));
      }
    },
    []
  );

  // Handle technique execution
  const handleTechniqueExecute = useCallback(
    async (playerIndex: number, technique: any) => {
      setIsExecutingTechnique(true);

      try {
        const attacker = players[playerIndex];
        const defenderIndex = playerIndex === 0 ? 1 : 0;
        const defender = players[defenderIndex];

        // Execute combat calculation
        const result: CombatResult = combatSystem.executeTechnique(
          attacker,
          defender,
          technique
        );

        // Apply damage and effects
        const defenderUpdates: Partial<PlayerState> = {
          health: Math.max(0, defender.health - result.damage),
          consciousness: Math.max(
            0,
            defender.consciousness - result.consciousnessLoss
          ),
          pain: Math.min(100, defender.pain + result.painInflicted),
        };

        handlePlayerUpdate(defenderIndex, defenderUpdates);

        // Create hit effect
        const hitEffect: HitEffect = {
          id: `hit_${Date.now()}`,
          type:
            result.damage > 30
              ? "critical"
              : result.damage > 15
              ? "heavy"
              : "medium",
          position: defender.position,
          damage: result.damage,
          color: result.damage > 30 ? 0xff0000 : 0xffff00,
          startTime: Date.now(),
          duration: 1000,
          korean: result.damage > 30 ? "치명타!" : "타격!",
          createdAt: Date.now(),
        };

        setCombatEffects((prev) => [...prev, hitEffect]);

        // Play audio feedback
        if (result.damage > 30) {
          audio.playSFX("critical_hit");
        } else if (result.damage > 15) {
          audio.playSFX("heavy_hit");
        } else {
          audio.playSFX("light_hit");
        }

        // Check for game over
        if (defenderUpdates.health === 0) {
          setTimeout(() => onGameOver(attacker), 1000);
        }
      } finally {
        setTimeout(() => setIsExecutingTechnique(false), 500);
      }
    },
    [players, combatSystem, handlePlayerUpdate, audio, onGameOver]
  );

  // Game loop for timer and effects cleanup
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        setGameTime((prev) => prev + 1000);
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            // Time's up - determine winner by health
            const winner =
              playerState.health > opponent.health ? playerState : opponent;
            onGameOver(winner);
            return 0;
          }
          return newTime;
        });

        // Clean up old effects
        setCombatEffects((prev) =>
          prev.filter(
            (effect) => Date.now() - effect.startTime < effect.duration
          )
        );
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, playerState.health, opponent.health, onGameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isPaused) return;

      const key = event.key;

      // Stance changes for player 1 (1-8 keys)
      if (key >= "1" && key <= "8") {
        const stanceIndex = parseInt(key) - 1;
        const stances: TrigramStance[] = [
          "geon",
          "tae",
          "li",
          "jin",
          "son",
          "gam",
          "gan",
          "gon",
        ];
        handleStanceChange(0, stances[stanceIndex]);
      }

      // Other controls
      switch (key) {
        case " ": // Space - execute technique
          event.preventDefault();
          if (playerState.ki >= 20) {
            handleTechniqueExecute(0, { stance: playerState.stance });
          }
          break;
        case "Escape": // Pause
          setIsPaused((prev) => !prev);
          break;
        case "q": // Return to menu
          onReturnToMenu();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    isPaused,
    playerState,
    handleStanceChange,
    handleTechniqueExecute,
    onReturnToMenu,
  ]);

  // Fix Position type usage
  const [playerPosition] = useState<Position>({ x: 100, y: 200 });

  // Fix method calls
  const canChangeStance = trigramSystem.canTransitionTo(
    playerState.stance,
    targetStance,
    playerState
  );

  // Fix CombatSystem method call
  const handleExecuteTechnique = () => {
    const result = CombatSystem.executeTechnique(
      selectedTechnique,
      "player1",
      "opponent1"
    );

    // Handle result properties
    if (result.consciousnessLoss) {
      console.log(`Consciousness loss: ${result.consciousnessLoss}`);
    }
    if (result.painInflicted) {
      console.log(`Pain inflicted: ${result.painInflicted}`);
    }
  };

  return (
    <div style={{ width: ARENA_WIDTH, height: ARENA_HEIGHT, margin: "0 auto" }}>
      <Stage
        app={app}
        width={ARENA_WIDTH}
        height={ARENA_HEIGHT}
        options={{
          backgroundColor: 0x000000,
          antialias: true,
        }}
      >
        <Container>
          {/* Combat Arena with Players */}
          <CombatArena
            players={players}
            onPlayerUpdate={handlePlayerUpdate}
            onTechniqueExecute={handleTechniqueExecute}
            combatEffects={combatEffects}
            isExecutingTechnique={isExecutingTechnique}
            width={ARENA_WIDTH}
            height={ARENA_HEIGHT}
          />

          {/* Combat HUD */}
          <CombatHUD
            players={players}
            timeRemaining={timeRemaining}
            currentRound={currentRound}
            isPaused={isPaused}
            width={ARENA_WIDTH}
            height={ARENA_HEIGHT}
          />

          {/* Combat Controls */}
          <CombatControls
            players={players}
            onStanceChange={handleStanceChange}
            isExecutingTechnique={isExecutingTechnique}
            isPaused={isPaused}
            width={ARENA_WIDTH}
            height={ARENA_HEIGHT}
          />
        </Container>
      </Stage>
    </div>
  );
};

export default CombatScreen;
