import { describe, it, expect } from "vitest";
import { CombatSystem } from "./CombatSystem";
import type {
  TrigramStance,
  KoreanTechnique,
  DamageRange,
  PlayerState,
  DamageType,
} from "../types";

describe("CombatSystem", () => {
  const mockTechnique: KoreanTechnique = {
    id: "test_strike",
    name: "Test Strike",
    koreanName: "테스트 타격",
    englishName: "Test Strike",
    romanized: "Teseuteu Tagyeok",
    description: {
      korean: "테스트용 기법",
      english: "Test technique",
    },
    stance: "geon" as TrigramStance,
    type: "strike",
    damageType: "blunt" as DamageType,
    damageRange: {
      min: 15,
      max: 25,
      type: "blunt",
    },
    range: 100,
    kiCost: 10,
    staminaCost: 15,
    executionTime: 300,
    recoveryTime: 200,
    accuracy: 0.85,
    effects: [],
  };

  describe("calculateTechnique", () => {
    it("should calculate basic technique damage", () => {
      const result = CombatSystem.calculateTechnique(mockTechnique, "musa");

      expect(result).toMatchObject({
        damage: expect.any(Number),
        isVitalPoint: false,
        hit: true,
        critical: expect.any(Boolean),
        vitalPointsHit: [],
        attacker: "musa",
        defender: "musa",
        damagePrevented: 0,
        staminaUsed: 15,
        kiUsed: 10,
        defenderDamaged: true,
        attackerStance: "geon",
        defenderStance: "geon",
      });
    });

    it("should apply archetype modifiers", () => {
      const musaResult = CombatSystem.calculateTechnique(mockTechnique, "musa");
      const amsaljaResult = CombatSystem.calculateTechnique(
        mockTechnique,
        "amsalja"
      );

      // Musa should have higher damage with Geon stance
      expect(musaResult.damage).toBeGreaterThan(amsaljaResult.damage);
    });

    it("should handle techniques without damage range", () => {
      const techniqueWithoutRange = {
        ...mockTechnique,
        damageRange: {
          min: 10,
          max: 20,
          type: "blunt" as const,
        } as DamageRange,
      };

      const simpleResult = CombatSystem.calculateTechnique(
        techniqueWithoutRange,
        "musa"
      );

      expect(simpleResult.damage).toBeGreaterThan(0);
    });
  });

  describe("checkWinCondition", () => {
    const createMockPlayer = (
      id: string,
      health: number,
      consciousness: number
    ): PlayerState => ({
      id,
      health,
      consciousness,
      maxHealth: 100,
      archetype: "musa",
      name: id,
      position: { x: 0, y: 0 },
      stance: "geon",
      facing: "right",
      ki: 100,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      pain: 0,
      balance: 100,
      bloodLoss: 0,
      lastStanceChangeTime: 0,
      isAttacking: false,
      combatReadiness: 100,
      activeEffects: [],
      combatState: "ready",
      conditions: [],
    });

    it("should detect when player 1 is defeated by health", () => {
      const player1 = createMockPlayer("player1", 0, 100);
      const player2 = createMockPlayer("player2", 50, 100);

      const result = CombatSystem.checkWinCondition([player1, player2]);

      // checkWinCondition returns the winning player or null
      expect(result).toBeDefined();
      expect(result?.id).toBe("player2");
    });

    it("should detect when player 2 is defeated by consciousness", () => {
      const player1 = createMockPlayer("player1", 50, 100);
      const player2 = createMockPlayer("player2", 50, 0);

      const result = CombatSystem.checkWinCondition([player1, player2]);

      expect(result).toBeDefined();
      expect(result?.id).toBe("player1");
    });

    it("should continue combat when both players are functional", () => {
      const player1 = createMockPlayer("player1", 50, 80);
      const player2 = createMockPlayer("player2", 60, 90);

      const result = CombatSystem.checkWinCondition([player1, player2]);

      // No winner yet, should return null
      expect(result).toBeNull();
    });
  });
});
