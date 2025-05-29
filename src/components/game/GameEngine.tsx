import React, { useState, useEffect, useCallback, useRef } from "react";
import { Stage, Container, useTick, extend } from "@pixi/react";
import { Graphics, Text as PixiText } from "pixi.js";
import type { JSX } from "react";
import type {
  GameState,
  PlayerState,
  TrigramStance,
  KoreanTechnique,
  Vector2D,
  CombatEvent,
  AttackData,
} from "../../types/GameTypes";
import { CombatSystem } from "../../systems/CombatSystem";
import { VitalPointSystem } from "../../systems/VitalPointSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { useAudio } from "../../audio/AudioManager";
import { Player } from "./Player";
import { GameUI } from "./GameUI";
import { HitEffectsLayer } from "./HitEffectsLayer";
import { DojangBackground } from "./DojangBackground";

// Extend PIXI components for use in JSX
extend({ Graphics, Text: PixiText });

export interface GameEngineProps {
  readonly onGameStateChange?: (state: GameState) => void;
  readonly onCombatEvent?: (event: CombatEvent) => void;
}

const INITIAL_PLAYER_STATE: Omit<PlayerState, "id"> = {
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  facing: "right",
  currentStance: "geon",
  health: 100,
  maxHealth: 100,
  stamina: 100,
  maxStamina: 100,
  ki: 50,
  maxKi: 100,
  isAttacking: false,
  isBlocking: false,
  isStunned: false,
  comboCount: 0,
  activeEffects: [],
  masteredTechniques: [],
};

export function GameEngine({
  onGameStateChange,
  onCombatEvent,
}: GameEngineProps): JSX.Element {
  // Core game state
  const [gameState, setGameState] = useState<GameState>({
    mode: "training",
    players: {
      player1: {
        ...INITIAL_PLAYER_STATE,
        id: "player1",
        position: { x: 200, y: 300 },
      },
      player2: {
        ...INITIAL_PLAYER_STATE,
        id: "player2",
        position: { x: 600, y: 300 },
        facing: "left",
      },
    },
    combat: {
      isActive: false,
      timeRemaining: 180000, // 3 minutes
      round: 1,
      matchStarted: false,
      winner: null,
      combatMode: "training",
    },
    camera: {
      position: { x: 400, y: 300 },
      zoom: 1.0,
      shake: 0,
      target: { x: 400, y: 300 },
    },
    environment: {
      dojangType: "traditional",
      lighting: "day",
      weather: "clear",
      temperature: 20,
    },
    ui: {
      showHealthBars: true,
      showStaminaBars: true,
      showKiBars: true,
      showVitalPoints: false,
      showTechniqueNames: true,
      showComboCounter: true,
      debugMode: false,
    },
    time: 0,
    paused: false,
  });

  const audio = useAudio();
  const gameLoop = useRef<number>(0);
  const lastAttackTime = useRef<Record<string, number>>({});
  const hitEffects = useRef<
    Array<{
      id: string;
      position: Vector2D;
      type: string;
      intensity: number;
      timestamp: number;
    }>
  >([]);

  // Game loop using PIXI's useTick
  useTick(
    useCallback(
      (delta: number) => {
        if (gameState.paused) return;

        const deltaTime = delta * 16.67; // Convert to milliseconds
        updateGameState(deltaTime);
        updatePhysics(deltaTime);
        updateCombat(deltaTime);
        updateEffects(deltaTime);
      },
      [gameState.paused]
    )
  );

  // Input handling for Korean martial arts controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.paused) return;

      const key = event.key.toLowerCase();

      // Trigram stance changes (1-8 keys)
      const stanceNumber = parseInt(key);
      if (stanceNumber >= 1 && stanceNumber <= 8) {
        const newStance = TrigramSystem.getStanceByNumber(stanceNumber);
        if (newStance) {
          changePlayerStance("player1", newStance);
        }
        return;
      }

      // Combat controls
      switch (key) {
        case " ": // Space - Attack
          executeAttack("player1");
          break;
        case "shift":
          toggleBlock("player1", true);
          break;
        case "a":
        case "arrowleft":
          movePlayer("player1", { x: -1, y: 0 });
          break;
        case "d":
        case "arrowright":
          movePlayer("player1", { x: 1, y: 0 });
          break;
        case "w":
        case "arrowup":
          movePlayer("player1", { x: 0, y: -1 });
          break;
        case "s":
        case "arrowdown":
          movePlayer("player1", { x: 0, y: 1 });
          break;
        case "p":
          togglePause();
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "shift") {
        toggleBlock("player1", false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState.paused]);

  // Game state update functions
  const updateGameState = useCallback((deltaTime: number) => {
    setGameState((prev) => ({
      ...prev,
      time: prev.time + deltaTime,
      combat: {
        ...prev.combat,
        timeRemaining: prev.combat.isActive
          ? Math.max(0, prev.combat.timeRemaining - deltaTime)
          : prev.combat.timeRemaining,
      },
    }));
  }, []);

  const updatePhysics = useCallback((deltaTime: number) => {
    setGameState((prev) => {
      const updatedPlayers = { ...prev.players };

      Object.keys(updatedPlayers).forEach((playerId) => {
        const player = updatedPlayers[playerId as keyof typeof updatedPlayers];

        // Apply velocity
        const newPosition = {
          x: player.position.x + player.velocity.x * deltaTime * 0.01,
          y: player.position.y + player.velocity.y * deltaTime * 0.01,
        };

        // Apply friction
        const newVelocity = {
          x: player.velocity.x * 0.95,
          y: player.velocity.y * 0.95,
        };

        // Boundary constraints
        newPosition.x = Math.max(50, Math.min(750, newPosition.x));
        newPosition.y = Math.max(200, Math.min(400, newPosition.y));

        updatedPlayers[playerId as keyof typeof updatedPlayers] = {
          ...player,
          position: newPosition,
          velocity: newVelocity,
        };
      });

      return { ...prev, players: updatedPlayers };
    });
  }, []);

  const updateCombat = useCallback((deltaTime: number) => {
    setGameState((prev) => {
      const updatedPlayers = { ...prev.players };

      Object.keys(updatedPlayers).forEach((playerId) => {
        const player = updatedPlayers[playerId as keyof typeof updatedPlayers];

        // Update vital point effects
        const updatedPlayer = VitalPointSystem.updateVitalPointEffects(
          player,
          deltaTime
        );

        // Regenerate stamina and ki
        const kiRegenRate = TrigramSystem.getKiRegenRate(player.currentStance);
        updatedPlayer.stamina = Math.min(
          player.maxStamina,
          player.stamina + 0.5 * deltaTime * 0.01
        );
        updatedPlayer.ki = Math.min(
          player.maxKi,
          player.ki + kiRegenRate * deltaTime * 0.01
        );

        updatedPlayers[playerId as keyof typeof updatedPlayers] = updatedPlayer;
      });

      return { ...prev, players: updatedPlayers };
    });
  }, []);

  const updateEffects = useCallback((deltaTime: number) => {
    const currentTime = Date.now();
    hitEffects.current = hitEffects.current.filter(
      (effect) => currentTime - effect.timestamp < 1000
    );
  }, []);

  // Combat actions
  const executeAttack = useCallback(
    (playerId: string) => {
      const player =
        gameState.players[playerId as keyof typeof gameState.players];
      if (
        !player ||
        player.isAttacking ||
        player.isStunned ||
        player.stamina < 10
      )
        return;

      const opponentId = playerId === "player1" ? "player2" : "player1";
      const opponent =
        gameState.players[opponentId as keyof typeof gameState.players];

      // Get current technique for player's stance
      const techniques = TrigramSystem.getTechniquesForStance(
        player.currentStance
      );
      const technique = techniques[0]; // Use first technique for now

      if (!technique) return;

      // Calculate attack position
      const attackDirection = player.facing === "right" ? 1 : -1;
      const attackPosition = {
        x: player.position.x + attackDirection * technique.range * 0.5,
        y: player.position.y,
      };

      // Process attack
      const attackData = CombatSystem.processAttack(
        player,
        opponent,
        technique,
        attackPosition
      );

      if (attackData) {
        // Play attack sound
        audio.playAttackSound(attackData.damage);

        // Check for block
        const blockResult = CombatSystem.processBlock(opponent, attackData);

        if (blockResult.blocked) {
          audio.playSFX("block_success");
        } else {
          // Apply damage
          const updatedOpponent = CombatSystem.applyDamage(
            opponent,
            attackData,
            blockResult.damageReduced
          );

          // Play hit sound
          audio.playHitSound(attackData.damage, attackData.isVitalPoint);

          // Update combo
          const newCombo = CombatSystem.checkCombo(
            player,
            technique,
            lastAttackTime.current[playerId] || 0
          );
          if (newCombo > 1) {
            audio.playComboSound(newCombo);
          }

          // Add hit effect
          hitEffects.current.push({
            id: `hit_${Date.now()}`,
            position: attackData.hitPosition,
            type: attackData.isVitalPoint ? "critical" : "normal",
            intensity: attackData.damage / 40,
            timestamp: Date.now(),
          });

          // Update game state
          setGameState((prev) => ({
            ...prev,
            players: {
              ...prev.players,
              [playerId]: {
                ...player,
                isAttacking: true,
                comboCount: newCombo,
              },
              [opponentId]: updatedOpponent,
            },
          }));

          // Generate combat events
          const events = CombatSystem.generateCombatEvents(
            attackData,
            opponent,
            blockResult.blocked
          );
          events.forEach((event) => onCombatEvent?.(event as CombatEvent));
        }

        lastAttackTime.current[playerId] = Date.now();

        // Reset attack state after animation
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            players: {
              ...prev.players,
              [playerId]: {
                ...prev.players[playerId as keyof typeof prev.players],
                isAttacking: false,
              },
            },
          }));
        }, 300);
      }
    },
    [gameState.players, audio, onCombatEvent]
  );

  const changePlayerStance = useCallback(
    (playerId: string, newStance: TrigramStance) => {
      const player =
        gameState.players[playerId as keyof typeof gameState.players];
      if (!player || player.isAttacking) return;

      audio.playStanceChangeSound();

      setGameState((prev) => ({
        ...prev,
        players: {
          ...prev.players,
          [playerId]: { ...player, currentStance: newStance },
        },
      }));

      onCombatEvent?.({
        type: "stance_change",
        player: playerId as any,
        from: player.currentStance,
        to: newStance,
        timestamp: Date.now(),
      });
    },
    [gameState.players, audio, onCombatEvent]
  );

  const movePlayer = useCallback(
    (playerId: string, direction: Vector2D) => {
      const player =
        gameState.players[playerId as keyof typeof gameState.players];
      if (!player || player.isAttacking || player.isStunned) return;

      const moveSpeed = 200; // pixels per second
      const newVelocity = {
        x: direction.x * moveSpeed,
        y: direction.y * moveSpeed,
      };

      // Update facing direction
      const newFacing =
        direction.x > 0 ? "right" : direction.x < 0 ? "left" : player.facing;

      setGameState((prev) => ({
        ...prev,
        players: {
          ...prev.players,
          [playerId]: {
            ...player,
            velocity: newVelocity,
            facing: newFacing,
          },
        },
      }));
    },
    [gameState.players]
  );

  const toggleBlock = useCallback((playerId: string, blocking: boolean) => {
    setGameState((prev) => ({
      ...prev,
      players: {
        ...prev.players,
        [playerId]: {
          ...prev.players[playerId as keyof typeof prev.players],
          isBlocking: blocking,
        },
      },
    }));
  }, []);

  const togglePause = useCallback(() => {
    setGameState((prev) => ({ ...prev, paused: !prev.paused }));
  }, []);

  // Notify parent of game state changes
  useEffect(() => {
    onGameStateChange?.(gameState);
  }, [gameState, onGameStateChange]);

  return (
    <Stage
      width={800}
      height={600}
      options={{
        backgroundColor: 0x1a1a1a,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      }}
    >
      <Container>
        {/* Background */}
        <DojangBackground
          variant={gameState.environment.dojangType}
          lighting={gameState.environment.lighting}
        />

        {/* Players */}
        <Player
          playerState={gameState.players.player1}
          isPlayerOne={true}
          opponentPosition={gameState.players.player2.position}
        />

        <Player
          playerState={gameState.players.player2}
          isPlayerOne={false}
          opponentPosition={gameState.players.player1.position}
        />

        {/* Hit Effects */}
        <HitEffectsLayer effects={hitEffects.current} />

        {/* UI */}
        <GameUI
          gameState={gameState}
          onStanceChange={(playerId, stance) =>
            changePlayerStance(playerId, stance)
          }
          onTogglePause={togglePause}
        />
      </Container>
    </Stage>
  );
}
