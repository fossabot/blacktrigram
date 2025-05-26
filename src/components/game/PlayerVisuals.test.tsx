import { render } from "@testing-library/react";
import {
  PlayerVisuals,
  getStanceColor,
  getTrigramSymbol,
} from "./PlayerVisuals";
import { describe, it, expect } from "vitest";
import type { PlayerState, TrigramStance } from "./Player";

const playerState: PlayerState = {
  x: 100,
  y: 100,
  health: 100,
  stance: "geon",
  isAttacking: false,
  isBlocking: false,
  isMoving: false,
  facing: "right",
  stamina: 100,
  combo: 0,
  lastAttackTime: 0,
};

const technique = {
  name: "천둥벽력",
  damage: 28,
  stamina: 25,
  speed: 0.8,
  range: 80,
  vitalPoints: ["sternum"],
};

describe("PlayerVisuals", () => {
  it("renders player visuals", () => {
    const { container } = render(
      <PlayerVisuals
        playerState={playerState}
        currentTechnique={technique}
        isPlayerOne={true}
        animationTime={0}
      />
    );
    expect(container).toBeTruthy();
  });

  it("getStanceColor returns a number", () => {
    expect(typeof getStanceColor("geon" as TrigramStance)).toBe("number");
  });

  it("getTrigramSymbol returns a string", () => {
    expect(typeof getTrigramSymbol("geon" as TrigramStance)).toBe("string");
  });
});
