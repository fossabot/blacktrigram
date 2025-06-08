import { describe, it, expect, beforeEach, vi } from "vitest";
import { CombatSystem } from "./CombatSystem";
import {
  PlayerState,
  KoreanTechnique,
  PlayerArchetype,
  TrigramStance,
  DamageType,
  VitalPoint,
} from "../types";
import { createPlayerState } from "../utils/playerUtils";
import { STANCE_EFFECTIVENESS_MATRIX } from "../types/constants";
import { TrigramStance as TrigramStanceEnum } from "../types/enums";
import { PlayerArchetype as PlayerArchetypeEnum } from "../types/enums";

// Mock techniques and vital points for testing
const mockGeonTechnique: KoreanTechnique = {
  id: "test_geon_strike",
  name: "Test Geon Strike",
  koreanName: "테스트 건 타격",
  englishName: "Test Geon Strike",
  romanized: "test_geon_strike",
  description: {
    korean: "테스트용 건 자세 타격",
    english: "Test geon stance strike",
  },
  stance: TrigramStanceEnum.GEON,
  type: "strike",
  damageType: "blunt" as DamageType,
  damage: 25,
  kiCost: 15,
  staminaCost: 10,
  accuracy: 0.85,
  range: 1.2,
  executionTime: 500,
  recoveryTime: 300,
  critChance: 0.1,
  critMultiplier: 1.5,
  effects: [],
};

const mockVitalPoint: VitalPoint = {
  id: "test_vital_point",
  name: { korean: "테스트 급소", english: "Test Vital Point" },
  englishName: "Test Vital Point", // Fix: Remove invalid 'korean' property
  koreanName: "테스트 급소",
  category: "head",
  description: {
    korean: "테스트용 급소점",
    english: "Test vital point for testing",
  },
  location: { x: 0.5, y: 0.2, region: "head" },
  severity: "moderate",
  techniques: ["strike", "pressure"],
  baseAccuracy: 0.75,
  baseDamage: 20,
  baseStun: 1500,
  damageMultiplier: 1.6,
  damage: 20,
  effects: [],
};

// Helper function to create mock players
function createMockPlayer(
  id: string,
  archetype: PlayerArchetype,
  stance: TrigramStance,
  health: number = 100,
  ki: number = 100,
  stamina: number = 100,
  position: { x: number; y: number } = { x: 0, y: 0 },
  consciousness: number = 100
): PlayerState {
  return createPlayerState(
    `Test Player ${id}`,
    archetype,
    stance,
    id
    // Fix: Remove extra parameters - createPlayerState only accepts 4 parameters
  );
}

describe("CombatSystem", () => {
  describe("calculateTechnique", () => {
    it("should calculate base damage for a technique", () => {
      const result = CombatSystem.calculateTechnique(
        mockGeonTechnique,
        PlayerArchetypeEnum.MUSA
      );
      expect(result.damage).toBeGreaterThan(0);
      expect(result.hit).toBe(true);
    });

    it("should apply archetype-specific damage modifiers", () => {
      const musaResult = CombatSystem.calculateTechnique(
        mockGeonTechnique,
        PlayerArchetypeEnum.MUSA
      );
      const amsaljaResult = CombatSystem.calculateTechnique(
        mockGeonTechnique,
        PlayerArchetypeEnum.AMSALJA
      );
      expect(musaResult.damage).not.toBe(amsaljaResult.damage);
    });

    it("should handle critical hits", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.01);
      const result = CombatSystem.calculateTechnique(
        mockGeonTechnique,
        PlayerArchetypeEnum.MUSA
      );
      expect(result.critical).toBe(true);
      expect(result.damage).toBeGreaterThanOrEqual(
        (mockGeonTechnique.damage || 20) *
          (mockGeonTechnique.critMultiplier || 1.5)
      );
      vi.spyOn(Math, "random").mockRestore();
    });
  });

  describe("executeAttack", () => {
    let attacker: PlayerState;
    let defender: PlayerState;

    beforeEach(() => {
      attacker = createMockPlayer(
        "attacker1",
        PlayerArchetypeEnum.MUSA,
        TrigramStanceEnum.GEON
      );
      defender = createMockPlayer(
        "defender1",
        PlayerArchetypeEnum.AMSALJA,
        TrigramStanceEnum.TAE
      );
    });

    it("should return a CombatResult indicating a hit", async () => {
      const result = await CombatSystem.executeAttack(
        attacker,
        defender,
        mockGeonTechnique
      );
      expect(result.hit).toBe(true);
      expect(result.damage).toBeGreaterThan(0);
    });

    it("should apply vital point damage if targetPoint is provided and hit", async () => {
      const result = await CombatSystem.executeAttack(
        attacker,
        defender,
        mockGeonTechnique,
        mockVitalPoint.id
      );

      expect(result.hit).toBe(true);
      expect(result.damage).toBeGreaterThan(0);
      expect(result.vitalPointHit).toBeDefined();
    });
  });

  describe("determineWinner", () => {
    it("should return player2 if player1 health is 0", () => {
      const player1 = {
        ...createMockPlayer(
          "p1",
          PlayerArchetypeEnum.MUSA,
          TrigramStanceEnum.GEON
        ),
        health: 0,
      };
      const player2 = createMockPlayer(
        "p2",
        PlayerArchetypeEnum.AMSALJA,
        TrigramStanceEnum.TAE
      );
      const winner = CombatSystem.determineWinner([player1, player2]);
      expect(winner).toBe(player2.id);
    });

    it("should return player1 if player2 consciousness is 0", () => {
      const player1 = createMockPlayer(
        "p1",
        PlayerArchetypeEnum.MUSA,
        TrigramStanceEnum.GEON
      );
      const player2 = {
        ...createMockPlayer(
          "p2",
          PlayerArchetypeEnum.AMSALJA,
          TrigramStanceEnum.TAE
        ),
        consciousness: 0,
      };
      const winner = CombatSystem.determineWinner([player1, player2]);
      expect(winner).toBe(player1.id);
    });

    it("should return null if no win condition is met", () => {
      const player1 = createMockPlayer(
        "p1",
        PlayerArchetypeEnum.MUSA,
        TrigramStanceEnum.GEON
      );
      const player2 = createMockPlayer(
        "p2",
        PlayerArchetypeEnum.AMSALJA,
        TrigramStanceEnum.TAE
      );
      const winner = CombatSystem.determineWinner([player1, player2]);
      expect(winner).toBeNull();
    });
  });

  describe("calculateStanceEffectiveness", () => {
    it("Geon vs Tae should have specific effectiveness", () => {
      const effectiveness = CombatSystem.calculateStanceEffectiveness(
        TrigramStanceEnum.GEON,
        TrigramStanceEnum.TAE
      );
      expect(effectiveness).toBe(STANCE_EFFECTIVENESS_MATRIX.geon.tae);
    });

    it("Identical stances should have 1.0 effectiveness", () => {
      const effectiveness = CombatSystem.calculateStanceEffectiveness(
        TrigramStanceEnum.GEON,
        TrigramStanceEnum.GEON
      );
      expect(effectiveness).toBe(1.0);
    });
  });
});
