// Types related to player state and actions

import type { Position, Velocity } from "./common";
import type { TrigramStance } from "./enums";
import type { Condition } from "./effects";

export interface PlayerState {
  playerId: string;
  position: Position;
  velocity: Velocity;
  health: number;
  maxHealth: number;
  ki: number;
  maxKi: number;
  stance: TrigramStance;
  isAttacking: boolean;
  isBlocking: boolean;
  isMoving: boolean;
  stamina: number;
  maxStamina: number;
  lastStanceChangeTime?: number | undefined;
  targetId?: string | null | undefined;
  conditions: Condition[];
  facing?: "left" | "right" | undefined;
  lastDamageTaken?: number | undefined;
  comboCount?: number | undefined;
  lastHitTime?: number | undefined;
  visible?: boolean | undefined;
}

export function createPlayerState(
  id: string,
  position: Position,
  stance: TrigramStance = "geon",
  overrides: Partial<Omit<PlayerState, "playerId" | "position" | "stance">> = {}
): PlayerState {
  const playerState: PlayerState = {
    playerId: id,
    position: { ...position },
    stance: stance,
    velocity: overrides.velocity ?? { x: 0, y: 0 },
    health: overrides.health ?? 100,
    maxHealth: overrides.maxHealth ?? 100,
    ki: overrides.ki ?? 50,
    maxKi: overrides.maxKi ?? 100,
    isAttacking: overrides.isAttacking ?? false,
    isBlocking: overrides.isBlocking ?? false,
    isMoving: overrides.isMoving ?? false,
    stamina: overrides.stamina ?? 100,
    maxStamina: overrides.maxStamina ?? 100,
    conditions: overrides.conditions ?? [],
  };

  if (overrides.lastStanceChangeTime !== undefined) {
    playerState.lastStanceChangeTime = overrides.lastStanceChangeTime;
  }
  if (overrides.targetId !== undefined) {
    playerState.targetId = overrides.targetId;
  }
  if (overrides.facing !== undefined) {
    playerState.facing = overrides.facing;
  }
  if (overrides.lastDamageTaken !== undefined) {
    playerState.lastDamageTaken = overrides.lastDamageTaken;
  }
  if (overrides.comboCount !== undefined) {
    playerState.comboCount = overrides.comboCount;
  }
  if (overrides.lastHitTime !== undefined) {
    playerState.lastHitTime = overrides.lastHitTime;
  }
  if (overrides.visible !== undefined) {
    playerState.visible = overrides.visible;
  }

  return playerState;
}
