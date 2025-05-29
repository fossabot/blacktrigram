import { describe, it, expect } from "vitest";
import { TrigramSystem } from "./TrigramSystem";
import type { PlayerState, TrigramStance } from "../types";

describe("TrigramSystem", () => {
  const playerState: PlayerState = {
    position: { x: 400, y: 300 },
    health: 80,
    maxHealth: 100,
    stamina: 75,
    maxStamina: 100,
    ki: 50,
    maxKi: 100,
    stance: "geon",
    isBlocking: false,
    isAttacking: false,
    comboCount: 0,
    vulnerabilityMultiplier: 1.0,
    statusEffects: [],
  };

  const opponentState: PlayerState = {
    position: { x: 600, y: 300 },
    health: 90,
    maxHealth: 100,
    stamina: 85,
    maxStamina: 100,
    ki: 40,
    maxKi: 100,
    stance: "li",
    isBlocking: false,
    isAttacking: false,
    comboCount: 0,
    vulnerabilityMultiplier: 1.0,
    statusEffects: [],
  };

  describe("trigram stance management", () => {
    it("should get valid trigram stances", () => {
      const stances = TrigramSystem.getAllStances();
      expect(stances).toHaveLength(8);
      expect(stances).toContain("geon");
      expect(stances).toContain("tae");
      expect(stances).toContain("li");
    });

    it("should get technique for stance", () => {
      const technique = TrigramSystem.getTechniqueForStance("geon");
      expect(technique).toBeDefined();
      if (technique) {
        expect(technique.stance).toBe("geon");
        expect(technique.koreanName).toBeTruthy();
        expect(technique.englishName).toBeTruthy();
      }
    });
  });

  describe("stance statistics", () => {
    it("should get stance effectiveness", () => {
      const effectiveness = TrigramSystem.getStanceEffectiveness("geon", "li");
      expect(typeof effectiveness).toBe("number");
      expect(effectiveness).toBeGreaterThan(0);
    });
  });

  describe("damage calculation", () => {
    it("should calculate damage with correct parameters", () => {
      const technique = TrigramSystem.getTechniqueForStance("geon");
      expect(technique).toBeDefined();

      if (technique) {
        const distance = 50;
        const damage = TrigramSystem.calculateEffectiveDamage(
          technique.damage,
          distance,
          technique.accuracy
        );

        expect(typeof damage).toBe("number");
        expect(damage).toBeGreaterThan(0);
      }
    });
  });

  describe("trigram advantage system", () => {
    it("should calculate stance advantage correctly", () => {
      const advantage = TrigramSystem.calculateStanceAdvantage("geon", "tae");
      expect(typeof advantage).toBe("number");
      expect(advantage).toBeGreaterThanOrEqual(0);
      expect(advantage).toBeLessThanOrEqual(2);
    });

    it("should handle same stance advantage", () => {
      const advantage = TrigramSystem.calculateStanceAdvantage("geon", "geon");
      expect(advantage).toBe(1); // Neutral advantage
    });
  });

  describe("technique retrieval", () => {
    it("should get technique for stance using correct method name", () => {
      const technique = TrigramSystem.getTechniqueForStance("geon");
      expect(technique).toBeDefined();
      if (technique) {
        expect(technique.stance).toBe("geon");
      }
    });
  });

  describe("Korean martial arts integration", () => {
    it("should validate Korean technique names", () => {
      const technique = TrigramSystem.getTechniqueForStance("li");
      expect(technique).toBeDefined();
      if (technique) {
        expect(technique.koreanName).toMatch(/[\u3131-\u3163\uac00-\ud7a3]/); // Korean characters
      }
    });

    it("should handle all trigram stances", () => {
      const stances: TrigramStance[] = [
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ];

      stances.forEach((stance) => {
        const technique = TrigramSystem.getTechniqueForStance(stance);
        expect(technique).toBeDefined();
        if (technique) {
          expect(technique.stance).toBe(stance);
        }
      });
    });
  });

  describe("damage effectiveness calculations", () => {
    it("should calculate effective damage correctly", () => {
      const baseDamage = 25;
      const distance = 50;
      const accuracy = 0.8;

      const damage = TrigramSystem.calculateEffectiveDamage(
        baseDamage,
        distance,
        accuracy
      );

      expect(typeof damage).toBe("number");
      expect(damage).toBeGreaterThan(0);
    });
  });
});
