import React, { useCallback, useEffect, useReducer } from "react"; // useState removed if not used
import { Stage, Container, useTick } from "@pixi/react"; // Ensure these are correct imports
import type {
  PlayerState,
  GameState,
  GameSettings,
  TrigramStance,
  CombatEvent,
  AttackResult,
  GamePhase, // Added GamePhase
  EnvironmentState, // Added EnvironmentState
  // Position, // Unused
  // Velocity, // Unused
} from "../../types";
import {
  createPlayerState,
  // INITIAL_PLAYER_STATE, // Assuming this is not defined, use createPlayerState
  TRIGRAM_DATA,
  KOREAN_COLORS,
} from "../../types";
import { CombatSystem } from "../../systems/CombatSystem";
import { Player } from "./Player";
import { GameUI } from "./GameUI";
import { HitEffectsLayer } from "./HitEffectsLayer";
import { DojangBackground } from "./DojangBackground";
import { useAudio } from "../../audio/AudioManager";
import type { Ticker } from "pixi.js";

const ROUND_TIME_LIMIT = 90; // seconds

const initialPlayer1State = createPlayerState("Player1", { x: 150, y: 450 });
const initialPlayer2State = createPlayerState(
  "Player2",
  { x: 650, y: 450 },
  "tae",
  { facingDirection: "left" }
);

const initialGameState: GameState = {
  gameTime: 0,
  timeRemaining: ROUND_TIME_LIMIT,
  players: [initialPlayer1State, initialPlayer2State],
  currentRound: 1,
  winner: null,
  isPaused: false,
  phase: "pre-round", // Use GamePhase type
  environment: { setting: "dojang", timeOfDay: "day", weather: "clear" }, // Ensure EnvironmentState structure
  projectiles: [],
  gameEvents: [],
  matchScore: { player1: 0, player2: 0 },
  settings: { difficulty: "medium", rounds: 3, audioVolume: 0.7 }, // audioVolume added to GameSettings type
  combatLog: [], // Added combatLog
};

// Reducer logic would go here, simplified for brevity
function gameReducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case "UPDATE_TIME":
      return {
        ...state,
        gameTime: state.gameTime + action.payload.delta,
        timeRemaining: Math.max(
          0,
          (state.timeRemaining ?? ROUND_TIME_LIMIT) - action.payload.delta
        ),
      };
    case "SET_PLAYER_STATE":
      return {
        ...state,
        players: state.players.map((p, i) =>
          i === action.payload.playerIndex ? action.payload.newState : p
        ) as [PlayerState, PlayerState], // Ensure tuple type
      };
    case "SET_GAME_PHASE":
      return { ...state, phase: action.payload as GamePhase }; // Use GamePhase type
    case "ADD_COMBAT_EVENT":
      return {
        ...state,
        gameEvents: [...(state.gameEvents || []), action.payload],
        combatLog: [...(state.combatLog || []), action.payload.message],
      };
    case "END_ROUND":
      return {
        ...state,
        winner: action.payload.winner,
        phase: "post-round" as GamePhase,
      };
    // ... other cases
    default:
      return state;
  }
}

export function GameEngine(): React.JSX.Element {
  // Correct JSX.Element
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const audio = useAudio();

  useTick(
    useCallback(
      (delta: number, _ticker: Ticker) => {
        // delta is number
        if (gameState.isPaused || gameState.phase !== "fighting") return;

        dispatch({ type: "UPDATE_TIME", payload: { delta: delta / 60 } }); // Assuming delta is in frames, convert to seconds

        // Simplified game logic: check for round end by time
        if (
          gameState.timeRemaining !== undefined &&
          gameState.timeRemaining <= 0
        ) {
          // Determine winner based on health or other criteria
          const p1Health = gameState.players[0].health;
          const p2Health = gameState.players[1].health;
          let winnerId: string | null = null;
          if (p1Health > p2Health) winnerId = gameState.players[0].playerId;
          else if (p2Health > p1Health)
            winnerId = gameState.players[1].playerId;
          // Convert winnerId to player index (0 or 1) or null
          const winnerIndex =
            winnerId === gameState.players[0].playerId
              ? 0
              : winnerId === gameState.players[1].playerId
              ? 1
              : null;
          dispatch({ type: "END_ROUND", payload: { winner: winnerIndex } });
        }
      },
      [
        gameState.isPaused,
        gameState.phase,
        gameState.timeRemaining,
        gameState.players,
      ]
    )
  );

  const handlePlayerAction = useCallback(
    (playerIndex: number, action: { type: string; techniqueName?: string }) => {
      if (gameState.phase !== "fighting") return;

      const attacker = gameState.players[playerIndex];
      const defender = gameState.players[playerIndex === 0 ? 1 : 0];

      if (action.type === "attack" && action.techniqueName) {
        const technique = TRIGRAM_DATA[attacker.stance].techniques.find(
          (t) => t.name === action.techniqueName
        );
        if (!technique) return;

        // Basic stamina check
        if (attacker.stamina < (technique.staminaCost || 5)) {
          dispatch({
            type: "ADD_COMBAT_EVENT",
            payload: {
              type: "action_fail",
              message: `${attacker.playerId} lacks stamina for ${technique.name}`,
              timestamp: Date.now(),
            },
          });
          return;
        }

        const attackResult: AttackResult = CombatSystem.resolveAttack(
          attacker,
          defender,
          technique
        );

        const newAttackerState: PlayerState = {
          ...attackResult.attackerState,
          stamina: attacker.stamina - (technique.staminaCost || 5),
          isAttacking: false, // Reset attacking state after action
        };
        const newDefenderState: PlayerState = {
          ...attackResult.defenderState,
          health: Math.max(0, defender.health - attackResult.damage),
        };

        dispatch({
          type: "SET_PLAYER_STATE",
          payload: { playerIndex, newState: newAttackerState },
        });
        dispatch({
          type: "SET_PLAYER_STATE",
          payload: {
            playerIndex: playerIndex === 0 ? 1 : 0,
            newState: newDefenderState,
          },
        });

        const combatEvent: CombatEvent = {
          type: "attack_result",
          attackerId: attacker.playerId, // Add attackerId
          defenderId: defender.playerId,
          technique: technique.name,
          damage: attackResult.damage,
          isCritical: attackResult.critical, // Use critical
          isBlocked: attackResult.blocked,
          timestamp: Date.now(),
          message: `${attacker.playerId} used ${technique.name}. Dealt ${attackResult.damage} damage.`,
        };
        dispatch({ type: "ADD_COMBAT_EVENT", payload: combatEvent });
        audio.playHitSound(
          attackResult.damage,
          attackResult.critical,
          !!attackResult.vitalPointHit
        );

        if (newDefenderState.health <= 0) {
          dispatch({ type: "END_ROUND", payload: { winner: playerIndex } });
        }
      } else if (action.type === "stance_change") {
        // ... handle stance change, update player state, play sound
        // const newStance = action.newStance as TrigramStance;
        // dispatch({ type: "SET_PLAYER_STATE", payload: { playerIndex, newState: {...attacker, stance: newStance} }});
        // audio.playStanceChangeSound?.(newStance);
      }
      // const actionDetails = action; // Unused variable
    },
    [gameState.players, gameState.phase, audio, dispatch]
  );

  useEffect(() => {
    // Example: Start the round after a delay
    if (gameState.phase === "pre-round") {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_GAME_PHASE", payload: "fighting" });
      }, 2000); // 2 second countdown
      return () => clearTimeout(timer);
    }
  }, [gameState.phase]);

  return (
    <Stage
      width={800}
      height={600}
      options={{ backgroundColor: KOREAN_COLORS.BLACK }}
    >
      <DojangBackground
        setting={gameState.environment?.setting || "dojang"}
        timeOfDay={gameState.environment?.timeOfDay || "day"} // Ensure type compatibility
      />
      {gameState.players.map((playerState, index) => (
        <Player
          key={playerState.playerId}
          playerState={playerState}
          onAction={(action) => handlePlayerAction(index, action)}
          onStanceChange={(stance) => {
            /* Handle stance change, dispatch action */
          }}
        />
      ))}
      <HitEffectsLayer combatEvents={gameState.gameEvents || []} />
      <GameUI
        gameState={gameState}
        onPauseToggle={() => dispatch({ type: "TOGGLE_PAUSE" })}
      />
    </Stage>
  );
}
