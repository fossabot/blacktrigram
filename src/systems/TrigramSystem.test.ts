import { describe, it, expect } from "vitest";
import {
  TrigramSystem,
  StanceManager,
  TrigramCalculator,
  TransitionCalculator,
  KoreanCulture,
} from "./TrigramSystem";
import type { TrigramStance } from "../types/GameTypes";

describe("TrigramSystem Integration", () => {
  describe("Main TrigramSystem", () => {
    it("should provide unified interface to all trigram functionality", () => {
      const stance: TrigramStance = "geon";

      // Test main interface methods exist
      expect(TrigramSystem.getTechniqueForStance(stance)).toBeDefined();
      expect(TrigramSystem.getOptimalCounterStance(stance)).toBe("gam");
      expect(TrigramSystem.getDamageModifier(stance)).toBe(1.2);
      expect(TrigramSystem.getStanceKoreanName(stance)).toBe("건 (天)");
    });

    it("should calculate effective damage with all modifiers", () => {
      const damage = TrigramSystem.calculateEffectiveDamage(100, "li", "gan");
      expect(damage).toBeGreaterThan(100); // Fire vs Mountain should favor attacker
    });
  });

  describe("StanceManager", () => {
    it("should handle stance relationships correctly", () => {
      expect(StanceManager.getCounterStance("geon")).toBe("gam");
      expect(StanceManager.getCounterStance("li")).toBe("gam");
      expect(StanceManager.getCounterStance("jin")).toBe("gan");
    });

    it("should calculate stance distances correctly", () => {
      expect(StanceManager.calculateStanceDistance("geon", "geon")).toBe(0);
      expect(StanceManager.calculateStanceDistance("geon", "tae")).toBe(1);
      expect(StanceManager.calculateStanceDistance("geon", "gon")).toBe(1); // Wraps around
    });

    it("should identify optimal transitions", () => {
      expect(StanceManager.isOptimalTransition("geon", "geon")).toBe(true);
      expect(StanceManager.isOptimalTransition("geon", "tae")).toBe(true); // Adjacent
      expect(StanceManager.isOptimalTransition("geon", "gam")).toBe(true); // Counter
    });
  });

  describe("TrigramCalculator", () => {
    it("should provide accurate stance modifiers", () => {
      // Fire stance should have high damage, low defense
      expect(TrigramCalculator.getDamageModifier("li")).toBe(1.3);
      expect(TrigramCalculator.getDefenseModifier("li")).toBe(0.8);

      // Mountain stance should have high defense, low speed
      expect(TrigramCalculator.getDefenseModifier("gan")).toBe(1.4);
      expect(TrigramCalculator.getSpeedModifier("gan")).toBe(0.7);
    });

    it("should calculate hit chances correctly", () => {
      const hitChance = TrigramCalculator.calculateHitChance(0.8, "son", "gan");
      expect(hitChance).toBeGreaterThan(0.8); // Wind vs Mountain favors attacker
      expect(hitChance).toBeLessThanOrEqual(0.95); // Clamped maximum
    });

    it("should provide comprehensive stance stats", () => {
      const stats = TrigramCalculator.getStanceStats("geon");
      expect(stats).toHaveProperty("damage");
      expect(stats).toHaveProperty("defense");
      expect(stats).toHaveProperty("speed");
      expect(stats).toHaveProperty("evasion");
      expect(stats).toHaveProperty("overall");
      expect(stats.overall).toBeCloseTo(
        (stats.damage + stats.defense + stats.speed + stats.evasion) / 4
      );
    });
  });

  describe("TransitionCalculator", () => {
    it("should calculate transition costs accurately", () => {
      const cost = TransitionCalculator.calculateTransitionCost("geon", "li");
      expect(cost.staminaCost).toBeGreaterThan(0);
      expect(cost.kiCost).toBeGreaterThan(0);
      expect(cost.timeDelay).toBeGreaterThan(0);
      expect(cost.effectiveness).toBeLessThanOrEqual(1.0);
    });

    it("should handle same stance transitions", () => {
      const cost = TransitionCalculator.calculateTransitionCost("geon", "geon");
      expect(cost.staminaCost).toBe(0);
      expect(cost.kiCost).toBe(0);
      expect(cost.timeDelay).toBe(0);
      expect(cost.effectiveness).toBe(1.0);
    });

    it("should provide optimal transition paths", () => {
      const path = TransitionCalculator.getOptimalTransitionPath("geon", "gam");
      expect(path).toContain("geon");
      expect(path).toContain("gam");
      expect(path.length).toBeGreaterThan(1);
    });
  });

  describe("KoreanCulture", () => {
    it("should provide Korean cultural elements", () => {
      expect(KoreanCulture.getStanceKoreanName("geon")).toBe("건 (天)");
      expect(KoreanCulture.getTrigramSymbol("geon")).toBe("☰");
      expect(KoreanCulture.getElementName("geon")).toBe("천");
    });

    it("should validate Korean text", () => {
      expect(KoreanCulture.isValidKoreanText("천둥벽력")).toBe(true);
      expect(KoreanCulture.isValidKoreanText("Thunder Strike")).toBe(false);
      expect(KoreanCulture.isValidKoreanText("천둥벽력 (Thunder)")).toBe(true);
    });

    it("should format technique names correctly", () => {
      const formatted = KoreanCulture.formatTechniqueName(
        "천둥벽력",
        "Thunder Strike"
      );
      expect(formatted).toBe("천둥벽력 (Thunder Strike)");
    });
  });

  describe("Integration Tests", () => {
    it("should maintain consistency across all systems", () => {
      const stance: TrigramStance = "li";
      const technique = TrigramSystem.getTechniqueForStance(stance);

      expect(technique).not.toBeNull();
      expect(technique?.stance).toBe(stance);
      expect(technique?.korean).toBe("화염지창");
    });

    it("should handle complete combat scenario", () => {
      const attackerStance: TrigramStance = "li";
      const defenderStance: TrigramStance = "gam";

      const technique = TrigramSystem.getTechniqueForStance(attackerStance);
      expect(technique).not.toBeNull();

      const advantage = TrigramSystem.calculateStanceAdvantage(
        attackerStance,
        defenderStance
      );
      const damage = TrigramSystem.calculateEffectiveDamage(
        technique!.damage,
        attackerStance,
        defenderStance
      );
      const hitChance = TrigramSystem.calculateHitChance(
        technique!.accuracy,
        attackerStance,
        defenderStance
      );

      expect(advantage).toBeGreaterThan(0);
      expect(damage).toBeGreaterThan(0);
      expect(hitChance).toBeGreaterThan(0);
      expect(hitChance).toBeLessThanOrEqual(1);
    });
  });
});
