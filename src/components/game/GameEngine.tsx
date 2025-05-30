import React, { useEffect, useReducer, useCallback } from "react";
import { Stage } from "@pixi/react";
import {
  GameState,
  createPlayerState,
  TRIGRAM_DATA,
  PlayerState,
} from "../../types";
import { Player } from "./Player";
import { GameUI } from "./GameUI";
import { DojangBackground } from "./DojangBackground";
import { useAudio } from "../../audio/AudioManager";
import { CombatSystem } from "../../systems/CombatSystem";

const ROUND_TIME_LIMIT = 180 * 1000; // 3 minutes in milliseconds
const PLAYER_ONE_ID = "player1";
const PLAYER_TWO_ID = "player2";

const initialPlayer1State = createPlayerState(PLAYER_ONE_ID, {
  x: 100,
  y: 300,
});
const initialPlayer2State = createPlayerState(PLAYER_TWO_ID, {
  x: 700,
  y: 300,
});

const initialState: GameState = {
  players: [initialPlayer1State, initialPlayer2State] as [
    PlayerState,
    PlayerState
  ], // Fix tuple typing
  currentRound: 1,
  timeRemaining: ROUND_TIME_LIMIT,
  winner: null,
  isPaused: false,
  phase: "initializing",
  gameTime: 0,
  environment: {
    dojangType: "traditional_dojang", // Example
    lighting: "day",
    timeOfDay: 12, // Noon
    weather: "clear",
  },
  gameEvents: [],
  matchScore: { player1: 0, player2: 0 },
  settings: {
    // This should match GameSettings interface
    difficulty: "medium",
    allowMusic: true,
    allowSFX: true,
    showVitalPoints: true,
    showDamageNumbers: true,
    showStanceIndicator: true,
    // 'rounds' was incorrect; maxRounds is part of GameState if needed
  },
  combatLog: [],
  maxRounds: 3, // Example
};

export function GameEngine(): React.ReactElement {
  const audio = useAudio();

  useEffect(() => {
    audio.playMusic("combat_theme" as any); // Fix music track ID
  }, [audio]);

  // Fix reducer to use CombatSystem.resolveAttack instead of processAttack
  const gameReducer = useCallback(
    (state: GameState, action: any): GameState => {
      switch (action.type) {
        case "EXECUTE_ATTACK": {
          const { attackerId, defenderId, techniqueName } = action.payload;

          const attacker = state.players.find((p) => p.playerId === attackerId);
          const defender = state.players.find((p) => p.playerId === defenderId);

          if (!attacker || !defender) return state;

          const technique = Object.values(TRIGRAM_DATA).find(
            (t) => t.technique.name === techniqueName
          )?.technique;

          if (!technique) return state;

          const attackResult = CombatSystem.resolveAttack(
            attacker,
            defender,
            technique
          );

          return {
            ...state,
            players: state.players.map((p) => {
              if (p.playerId === attackerId)
                return attackResult.attackerState || p;
              if (p.playerId === defenderId)
                return attackResult.defenderState || p;
              return p;
            }) as [PlayerState, PlayerState], // Ensure tuple type
          };
        }
        default:
          return state;
      }
    },
    []
  );

  const [state] = useReducer(gameReducer, initialState); // Remove unused dispatch

  return (
    <Stage width={800} height={600} data-testid="game-engine">
      <DojangBackground
        variant="traditional"
        lighting="day"
        setting={state.environment?.dojangType || "traditional"}
        timeOfDay={state.environment?.timeOfDay?.toString() || "day"}
        weather={state.environment?.weather || "clear"}
        dojangType={state.environment?.dojangType || "traditional"}
      />

      {state.players.map(
        (
          player // Remove unused index
        ) => (
          <Player
            key={player.playerId}
            playerState={player}
            onStanceChange={(_stance) => {
              // Mark parameter as intentionally unused
              // Handle stance change
            }}
            onAttack={(_target) => {
              // Mark parameter as intentionally unused
              // Handle attack
            }}
          />
        )
      )}

      <GameUI gameState={state} />
    </Stage>
  );
}
