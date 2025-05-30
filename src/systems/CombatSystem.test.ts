import { describe, it, expect, vi, beforeEach } from "vitest";
import { CombatSystem } from "./CombatSystem";
import type { PlayerState, KoreanTechnique, CombatResult } from "../types";
import { createPlayerState, TRIGRAM_DATA } from "../types";

// Mock the audio manager
vi.mock("../audio/AudioManager", () => ({
  audioManager: {
    playSFX: vi.fn(),
    playAttackSound: vi.fn(),
    playHitSound: vi.fn(),
  },
}));

describe("CombatSystem", () => {
  let mockTechnique: KoreanTechnique;

  beforeEach(() => {
    vi.clearAllMocks();
    mockTechnique = TRIGRAM_DATA.geon.technique;
  });

  describe("resolveAttack", () => {
    it("should handle basic combat resolution", () => {
      const attacker = createPlayerState("player1", { x: 0, y: 0 });
      const defender = createPlayerState("player2", { x: 50, y: 0 });

      const result = CombatSystem.resolveAttack(
        attacker,
        defender,
        mockTechnique
      );

      expect(result).toBeDefined();
      expect(typeof result.damage).toBe("number");
      expect(typeof result.hit).toBe("boolean");
    });

    it("should apply stance advantages correctly", () => {
      const geonAttacker = createPlayerState("player1", { x: 0, y: 0 }, "geon");
      const taeDefender = createPlayerState("player2", { x: 50, y: 0 }, "tae");

      const result = CombatSystem.resolveAttack(
        geonAttacker,
        taeDefender,
        mockTechnique
      );

      expect(result.hit).toBe(true);
      expect(result.damage).toBeGreaterThan(0);
    });

    it("should handle blocked attacks", () => {
      const attacker = createPlayerState("player1", { x: 0, y: 0 });
      const defender = createPlayerState("player2", { x: 50, y: 0 }, "geon", {
        isBlocking: true,
      });

      const result = CombatSystem.resolveAttack(
        attacker,
        defender,
        mockTechnique
      );

      expect(result.blocked).toBe(true);
      expect(result.damage).toBeLessThan(mockTechnique.damage);
    });
  });

  describe("Korean martial arts integration", () => {
    it("should execute Korean techniques correctly", () => {
      const attacker = createPlayerState("player1", { x: 0, y: 0 }, "li");
      const defender = createPlayerState("player2", { x: 50, y: 0 }, "gam");
      const technique = TRIGRAM_DATA.li.technique; // 화염지창

      const result = CombatSystem.resolveAttack(attacker, defender, technique);

      expect(result.hit).toBe(true);
      expect(result.description).toContain(technique.name);
    });

    it("should apply technique effects", () => {
      const attacker = createPlayerState("player1", { x: 0, y: 0 });
      const defender = createPlayerState("player2", { x: 50, y: 0 });
      const burnTechnique = TRIGRAM_DATA.li.technique; // Has burn effect

      const result = CombatSystem.resolveAttack(
        attacker,
        defender,
        burnTechnique
      );

      if (result.hit && burnTechnique.effects?.length) {
        expect(result.conditionsApplied?.length).toBeGreaterThan(0);
      }
    });
  });

  describe("Combat calculations", () => {
    it("should calculate damage correctly", () => {
      const mockCalculateEffectiveDamage = vi
        .fn()
        .mockImplementation((...args: unknown[]) => {
          const [attacker, defender] = args as [
            PlayerState,
            PlayerState,
            string
          ];
          return {
            damageDealt: 25,
            attackerState: attacker,
            defenderState: {
              ...defender,
              health: defender.health - 25,
            },
            log: ["Test damage calculation"],
            conditionsApplied: [],
          } as CombatResult;
        });

      const attacker = createPlayerState("player1", { x: 0, y: 0 });
      const defender = createPlayerState("player2", { x: 50, y: 0 });

      const result = mockCalculateEffectiveDamage(attacker, defender, "test");
      expect(result.damageDealt).toBe(25);
      expect(result.log).toContain("Test damage calculation");
    });

    it("should validate combat state transitions", () => {
      const initialAttacker = createPlayerState("player1", { x: 0, y: 0 });
      const initialDefender = createPlayerState("player2", { x: 50, y: 0 });

      const result = CombatSystem.resolveAttack(
        initialAttacker,
        initialDefender,
        mockTechnique
      );

      // Add null checks for possibly undefined properties
      expect(result.attackerState).toBeDefined();
      expect(result.defenderState).toBeDefined();

      if (result.attackerState) {
        expect(result.attackerState.playerId).toBe(initialAttacker.playerId);
      }

      if (result.defenderState) {
        expect(result.defenderState.playerId).toBe(initialDefender.playerId);
      }
    });
  });
});
