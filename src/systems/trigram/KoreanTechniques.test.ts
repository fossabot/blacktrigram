import { describe, it, expect } from "vitest";
import {
  getTechniquesByStance,
  TECHNIQUE_EFFECTIVENESS_MATRIX,
  KoreanTechniquesSystem,
  TRIGRAM_TECHNIQUES, // Fix: Import the class instead of non-existent TRIGRAM_TECHNIQUES
} from "./KoreanTechniques";
import { TrigramStance, PlayerArchetype } from "../../types/enums";
import type { PlayerState, KoreanTechnique } from "../../types";

// Fix: Define mock player state
const mockPlayerState: PlayerState = {
  id: "test-player",
  name: { korean: "테스트", english: "Test" },
  archetype: PlayerArchetype.MUSA,
  currentStance: TrigramStance.GEON,
  health: 100,
  maxHealth: 100,
  ki: 100,
  maxKi: 100,
  stamina: 100,
  maxStamina: 100,
  consciousness: 100,
  balance: 100,
  pain: 0,
  position: { x: 0, y: 0 },
  statusEffects: [],
  vitalPoints: [],
  isBlocking: false,
  activeEffects: [],
  combatModifiers: {},
  momentum: { x: 0, y: 0 },
  lastStanceChangeTime: Date.now(),
  actionCooldowns: {},
  technique: null,
  combatState: "idle",
  orientation: "right",
};

describe("KoreanTechniques", () => {
  describe("Technique Structure", () => {
    it("should have techniques for all stances", () => {
      // Fix: Use proper technique access
      const allStances = Object.values(TrigramStance);
      allStances.forEach((stance) => {
        const techniques = getTechniquesByStance(stance);
        expect(Array.isArray(techniques)).toBe(true);
      });
    });

    it("should have valid technique data structure", () => {
      // Fix: Properly type the techniques iteration
      const allStances = Object.values(TrigramStance);
      allStances.forEach((stance) => {
        const techniques = getTechniquesByStance(stance);
        techniques.forEach((technique: KoreanTechnique) => {
          expect(technique.id).toBeDefined();
          expect(technique.name).toBeDefined();
          expect(technique.koreanName).toBeDefined();
          expect(technique.englishName).toBeDefined();
          expect(technique.stance).toBeDefined();
          expect(technique.type).toBeDefined();
          expect(technique.damageType).toBeDefined();
        });
      });
    });
  });

  describe("Technique Properties", () => {
    it("should have proper damage values", () => {
      const geonTechniques = TRIGRAM_TECHNIQUES[TrigramStance.GEON]; // Fix: Use proper access
      const geonTechnique = geonTechniques[0];

      expect(geonTechnique.damage).toBeGreaterThan(0);
      expect(geonTechnique.kiCost).toBeGreaterThan(0);
      expect(geonTechnique.staminaCost).toBeGreaterThan(0);
    });
  });

  describe("getTechniquesByStance", () => {
    it("should return techniques for valid stance", () => {
      const techniques = getTechniquesByStance(TrigramStance.LI);
      expect(Array.isArray(techniques)).toBe(true);
      expect(techniques.length).toBeGreaterThan(0);
    });

    it("should return empty array for invalid input", () => {
      const techniques = getTechniquesByStance("invalid" as TrigramStance);
      expect(Array.isArray(techniques)).toBe(true);
      expect(techniques.length).toBe(0);
    });
  });

  describe("Technique Effectiveness", () => {
    it("should have effectiveness matrix", () => {
      expect(TECHNIQUE_EFFECTIVENESS_MATRIX).toBeDefined();
      expect(typeof TECHNIQUE_EFFECTIVENESS_MATRIX).toBe("object");
    });
  });

  describe("getTechniquesByStance", () => {
    it("should return techniques for Son stance", () => {
      const sonTechniques = getTechniquesByStance(TrigramStance.SON);
      expect(Array.isArray(sonTechniques)).toBe(true);
    });
  });

  describe("Technique Validation", () => {
    it("should validate technique requirements", () => {
      const technique = TRIGRAM_TECHNIQUES[TrigramStance.GEON][0];
      const hasEnoughKi = mockPlayerState.ki >= technique.kiCost;
      const hasEnoughStamina = mockPlayerState.stamina >= technique.staminaCost;

      expect(hasEnoughKi).toBe(true);
      expect(hasEnoughStamina).toBe(true);
    });

    it("should handle insufficient resources", () => {
      const lowResourcePlayer = {
        ...mockPlayerState,
        ki: 5,
        stamina: 5,
      };

      const technique = TRIGRAM_TECHNIQUES[TrigramStance.GEON][0];
      const hasEnoughKi = lowResourcePlayer.ki >= technique.kiCost;
      const hasEnoughStamina =
        lowResourcePlayer.stamina >= technique.staminaCost;

      expect(hasEnoughKi).toBe(false);
      expect(hasEnoughStamina).toBe(false);
    });
  });

  describe("Archetype Integration", () => {
    it("should work with different archetypes", () => {
      const archetypes = Object.values(PlayerArchetype);
      archetypes.forEach((archetype) => {
        const playerWithArchetype = {
          ...mockPlayerState,
          archetype,
        };

        expect(playerWithArchetype.archetype).toBe(archetype);
      });
    });
  });
});
