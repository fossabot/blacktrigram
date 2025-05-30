import React, { useEffect, useReducer, useCallback, useMemo } from "react";
import { Stage, Container, useTick } from "@pixi/react"; // Assuming these are correct exports
import * as PIXI from "pixi.js"; // For Ticker type if needed
import {
  PlayerState,
  GameState,
  GamePhase,
  CombatEvent,
  createPlayerState,
  Position,
  TRIGRAM_DATA,
  AttackResult, // Used by processAttack
  CombatResult, // This has attackerState and defenderState
  // GameSettings, // GameSettings is part of GameState, not directly used here unless for initial state
  // TrigramStance, // Part of PlayerState
  // EnvironmentState, // Part of GameState
  KoreanTechnique, // For processAttack
  VitalPointHit, // For processAttack
} from "../../types";
import { Player } from "./Player"; // Assuming Player component exists
import { GameUI } from "./GameUI"; // Assuming GameUI component exists
import { DojangBackground } from "./DojangBackground"; // Assuming DojangBackground component exists
import { AudioManager, useAudio } from "../../audio/AudioManager"; // AudioManager might not be needed directly if useAudio is used
import { CombatSystem } from "../../systems/CombatSystem"; // Assuming CombatSystem exists

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
  players: [initialPlayer1State, initialPlayer2State],
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

function gameReducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case "UPDATE_TIME":
      return {
        ...state,
        gameTime: (state.gameTime ?? 0) + action.payload.delta,
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
        ) as [PlayerState, PlayerState],
      };
    case "SET_GAME_PHASE":
      return { ...state, phase: action.payload as GamePhase };
    case "ADD_COMBAT_EVENT":
      const eventPayload = action.payload as CombatEvent;
      const logMessage =
        eventPayload.description || `Event: ${eventPayload.type}`;
      return {
        ...state,
        gameEvents: [...(state.gameEvents || []), eventPayload],
        combatLog: [...(state.combatLog || []), logMessage],
      };
    case "END_ROUND":
      return {
        ...state,
        winner: action.payload.winner as number | null, // Ensure type match
        phase: "post-round", // Ensure "post-round" is a valid GamePhase
      };
    case "RESET_ROUND":
      return {
        ...state,
        players: [
          createPlayerState(PLAYER_ONE_ID, { x: 100, y: 300 }), // Corrected arguments
          createPlayerState(PLAYER_TWO_ID, { x: 700, y: 300 }), // Corrected arguments
        ],
        timeRemaining: ROUND_TIME_LIMIT,
        phase: "preparation", // Changed from "pre-round"
        winner: null,
        gameEvents: [],
        combatLog: [],
      };
    default:
      return state;
  }
}

export function GameEngine(): JSX.Element {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const audio = useAudio();

  useEffect(() => {
    dispatch({ type: "SET_GAME_PHASE", payload: "preparation" }); // Changed from "pre-round"
    audio.playMusic("menu_theme"); // Example
  }, [audio]);

  useTick((delta: number, _ticker: PIXI.Ticker) => {
    // Ensure ticker is accepted if provided by useTick
    if (state.phase === "combat" && !state.isPaused) {
      // Changed from "fighting"
      dispatch({ type: "UPDATE_TIME", payload: { delta } });
      // Player update logic, AI logic, etc.
    }
  });

  const handlePlayerAction = useCallback(
    (playerIndex: number, actionDetails: unknown) => {
      // This function would eventually dispatch actions based on player input
      // For example, initiating an attack
      console.log(`Player ${playerIndex} action:`, actionDetails);
      const attacker = state.players[playerIndex];
      const defender = state.players[playerIndex === 0 ? 1 : 0];

      if (!attacker || !defender) return; // Guard against undefined players

      // Example: Process a predefined attack
      // This is a simplified placeholder for actual attack logic
      const exampleTechnique: KoreanTechnique =
        TRIGRAM_DATA[attacker.stance].technique;

      // Use CombatResult as it contains attackerState and defenderState
      const combatResult: CombatResult = CombatSystem.processAttack(
        attacker,
        defender,
        exampleTechnique,
        null // No specific vital point for this example
      );

      dispatch({
        type: "SET_PLAYER_STATE",
        payload: { playerIndex, newState: combatResult.attackerState },
      });
      dispatch({
        type: "SET_PLAYER_STATE",
        payload: {
          playerIndex: playerIndex === 0 ? 1 : 0,
          newState: combatResult.defenderState,
        },
      });

      dispatch({
        type: "ADD_COMBAT_EVENT",
        payload: {
          type: "attack",
          playerId: attacker.playerId, // Use playerId
          targetId: defender.playerId,
          technique: exampleTechnique.name,
          damage: combatResult.damageDealt,
          description: combatResult.log.join(" "),
        } as CombatEvent,
      });

      audio.playAttackSound(exampleTechnique.damage);
      if (combatResult.damageDealt > 0) {
        audio.playHitSound(
          combatResult.damageDealt,
          !!combatResult.hitVitalPoint
        ); // Pass damage and boolean for vital point
      }
    },
    [state.players, audio] // Added audio to dependencies
  );

  const gameStage = useMemo(
    () => (
      <Stage width={800} height={600} options={{ backgroundColor: 0x1099bb }}>
        {state.environment && (
          <DojangBackground
            dojangType={state.environment.dojangType} // Pass dojangType
            timeOfDay={state.environment.timeOfDay} // Pass timeOfDay
          />
        )}
        {state.players.map((player, index) => (
          <Player
            key={player.playerId}
            playerState={player}
            onAction={(actionDetails) =>
              handlePlayerAction(index, actionDetails)
            }
          />
        ))}
        {/* HitEffectsLayer would go here */}
      </Stage>
    ),
    [state.players, state.environment, handlePlayerAction]
  );

  if (state.phase === "initializing") {
    return <div>Loading Black Trigram...</div>;
  }

  return (
    <div className="game-container">
      {gameStage}
      <GameUI
        gameState={state}
        onPauseToggle={() => dispatch({ type: "TOGGLE_PAUSE" })} // Assuming GameUIProps defines onPauseToggle
        // Add other necessary props for GameUI
      />
    </div>
  );
}
