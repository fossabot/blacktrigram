import { describe, it, expect } from "vitest";
import { TrigramCalculator } from "./TrigramCalculator";
import type { TrigramStance } from "../../types/GameTypes";

describe("TrigramCalculator", () => {
  const allStances: TrigramStance[] = [
    "geon",
    "tae",
    "li",
    "jin",
    "son",
    "gam",
    "gan",
    "gon",
  ];

  describe("getDamageModifier", () => {
    it("should return valid modifiers for all stances", () => {
      allStances.forEach((stance) => {
        const modifier = TrigramCalculator.getDamageModifier(stance);
        expect(modifier).toBeGreaterThan(0);
        expect(modifier).toBeLessThanOrEqual(2); // Reasonable upper bound
      });
    });

    it("should reflect trigram philosophy in damage values", () => {
      // Fire (li) should have highest damage - aggressive element
      expect(TrigramCalculator.getDamageModifier("li")).toBe(1.3);

      // Mountain (gan) should have lower damage - defensive focus
      expect(TrigramCalculator.getDamageModifier("gan")).toBe(0.8);

      // Heaven (geon) should have strong damage - creative force
      expect(TrigramCalculator.getDamageModifier("geon")).toBe(1.2);
    });
  });

  describe("getDefenseModifier", () => {
    it("should return valid modifiers for all stances", () => {
      allStances.forEach((stance) => {
        const modifier = TrigramCalculator.getDefenseModifier(stance);
        expect(modifier).toBeGreaterThan(0);
        expect(modifier).toBeLessThanOrEqual(2);
      });
    });

    it("should reflect defensive philosophy correctly", () => {
      // Mountain (gan) should have strongest defense
      expect(TrigramCalculator.getDefenseModifier("gan")).toBe(1.4);

      // Fire (li) should have weakest defense - aggressive stance
      expect(TrigramCalculator.getDefenseModifier("li")).toBe(0.8);

      // Wind (son) should have good evasive defense
      expect(TrigramCalculator.getDefenseModifier("son")).toBe(1.2);
    });
  });

  describe("getSpeedModifier", () => {
    it("should return valid modifiers for all stances", () => {
      allStances.forEach((stance) => {
        const modifier = TrigramCalculator.getSpeedModifier(stance);
        expect(modifier).toBeGreaterThan(0);
        expect(modifier).toBeLessThanOrEqual(2);
      });
    });

    it("should reflect mobility philosophy correctly", () => {
      // Wind (son) should be fastest
      expect(TrigramCalculator.getSpeedModifier("son")).toBe(1.4);

      // Thunder (jin) should be very fast
      expect(TrigramCalculator.getSpeedModifier("jin")).toBe(1.3);

      // Mountain (gan) should be slowest - stable but immobile
      expect(TrigramCalculator.getSpeedModifier("gan")).toBe(0.7);
    });
  });

  describe("getEvasionModifier", () => {
    it("should return valid modifiers for all stances", () => {
      allStances.forEach((stance) => {
        const modifier = TrigramCalculator.getEvasionModifier(stance);
        expect(modifier).toBeGreaterThan(0);
        expect(modifier).toBeLessThanOrEqual(2);
      });
    });

    it("should reflect evasion philosophy correctly", () => {
      // Wind (son) should have highest evasion
      expect(TrigramCalculator.getEvasionModifier("son")).toBe(1.4);

      // Water (gam) should have good flowing evasion
      expect(TrigramCalculator.getEvasionModifier("gam")).toBe(1.3);

      // Mountain (gan) should have lowest evasion
      expect(TrigramCalculator.getEvasionModifier("gan")).toBe(0.8);
    });
  });

  describe("calculateEffectiveDamage", () => {
    it("should apply stance modifiers correctly", () => {
      const baseDamage = 20;
      const attackerStance: TrigramStance = "li"; // High damage
      const defenderStance: TrigramStance = "gan"; // High defense

      const effectiveDamage = TrigramCalculator.calculateEffectiveDamage(
        baseDamage,
        attackerStance,
        defenderStance
      );

      expect(effectiveDamage).toBeGreaterThan(0);
      expect(effectiveDamage).toBeGreaterThan(baseDamage * 0.5); // Should still do reasonable damage
    });

    it("should apply stance advantage multiplier", () => {
      const baseDamage = 30;
      const stanceAdvantage = 1.5;

      const normalDamage = TrigramCalculator.calculateEffectiveDamage(
        baseDamage,
        "geon",
        "geon",
        1.0
      );

      const advantagedDamage = TrigramCalculator.calculateEffectiveDamage(
        baseDamage,
        "geon",
        "geon",
        stanceAdvantage
      );

      expect(advantagedDamage).toBeGreaterThan(normalDamage);
    });

    it("should ensure minimum damage of 1", () => {
      const veryLowDamage = TrigramCalculator.calculateEffectiveDamage(
        1,
        "gan", // Low damage stance
        "gan", // High defense stance
        0.5 // Disadvantage
      );

      expect(veryLowDamage).toBe(1);
    });

    it("should round to integer values", () => {
      const damage = TrigramCalculator.calculateEffectiveDamage(
        25,
        "li",
        "tae"
      );
      expect(Number.isInteger(damage)).toBe(true);
    });
  });

  describe("calculateHitChance", () => {
    it("should calculate hit chance based on speed vs evasion", () => {
      const attackerStance: TrigramStance = "jin"; // Thunder - fast
      const defenderStance: TrigramStance = "son"; // Wind - evasive
      const baseAccuracy = 0.8;

      const hitChance = TrigramCalculator.calculateHitChance(
        attackerStance,
        defenderStance,
        baseAccuracy
      );

      expect(hitChance).toBeGreaterThan(0);
      expect(hitChance).toBeLessThanOrEqual(1);
    });

    it("should enforce minimum hit chance", () => {
      const attackerStance: TrigramStance = "gan"; // Slow
      const defenderStance: TrigramStance = "son"; // Very evasive

      const hitChance = TrigramCalculator.calculateHitChance(
        attackerStance,
        defenderStance,
        0.1
      );

      expect(hitChance).toBeGreaterThanOrEqual(0.1);
    });

    it("should enforce maximum hit chance", () => {
      const attackerStance: TrigramStance = "jin"; // Fast
      const defenderStance: TrigramStance = "gan"; // Slow

      const hitChance = TrigramCalculator.calculateHitChance(
        attackerStance,
        defenderStance,
        0.95
      );

      expect(hitChance).toBeLessThanOrEqual(0.95);
    });
  });

  describe("calculateMovementSpeed", () => {
    it("should modify speed based on stance", () => {
      const fastStance: TrigramStance = "son"; // Wind
      const slowStance: TrigramStance = "gan"; // Mountain
      const baseSpeed = 100;

      const fastSpeed = TrigramCalculator.calculateMovementSpeed(
        fastStance,
        baseSpeed
      );
      const slowSpeed = TrigramCalculator.calculateMovementSpeed(
        slowStance,
        baseSpeed
      );

      expect(fastSpeed).toBeGreaterThan(slowSpeed);
    });
  });

  describe("calculateStanceSynergy", () => {
    it("should give perfect synergy bonus for matching stances", () => {
      allStances.forEach((stance) => {
        const synergy = TrigramCalculator.calculateStanceSynergy(
          stance,
          stance
        );
        expect(synergy).toBe(1.2);
      });
    });

    it("should give partial bonus for adjacent stances", () => {
      const synergy = TrigramCalculator.calculateStanceSynergy("geon", "tae");
      expect(synergy).toBe(1.1);
    });

    it("should apply penalties for distant stances", () => {
      const synergy = TrigramCalculator.calculateStanceSynergy("geon", "gam");
      expect(synergy).toBe(0.8); // Opposite stance
    });

    it("should handle invalid stances gracefully", () => {
      const synergy = TrigramCalculator.calculateStanceSynergy(
        "invalid" as TrigramStance,
        "geon"
      );
      expect(synergy).toBe(1.0);
    });
  });

  describe("getStanceStats", () => {
    it("should return complete stats for all stances", () => {
      allStances.forEach((stance) => {
        const stats = TrigramCalculator.getStanceStats(stance);

        expect(stats).toHaveProperty("damage");
        expect(stats).toHaveProperty("defense");
        expect(stats).toHaveProperty("speed");
        expect(stats).toHaveProperty("evasion");
        expect(stats).toHaveProperty("overall");

        expect(stats.damage).toBeGreaterThan(0);
        expect(stats.defense).toBeGreaterThan(0);
        expect(stats.speed).toBeGreaterThan(0);
        expect(stats.evasion).toBeGreaterThan(0);
        expect(stats.overall).toBeGreaterThan(0);
      });
    });

    it("should calculate overall as average of other stats", () => {
      const stats = TrigramCalculator.getStanceStats("geon");
      const expectedOverall =
        (stats.damage + stats.defense + stats.speed + stats.evasion) / 4;

      expect(stats.overall).toBeCloseTo(expectedOverall, 10);
    });

    it("should reflect stance specializations in stats", () => {
      const fireStats = TrigramCalculator.getStanceStats("li");
      const mountainStats = TrigramCalculator.getStanceStats("gan");
      const windStats = TrigramCalculator.getStanceStats("son");

      // Fire should excel in damage
      expect(fireStats.damage).toBeGreaterThan(mountainStats.damage);
      expect(fireStats.damage).toBeGreaterThan(windStats.damage);

      // Mountain should excel in defense
      expect(mountainStats.defense).toBeGreaterThan(fireStats.defense);
      expect(mountainStats.defense).toBeGreaterThan(windStats.defense);

      // Wind should excel in speed and evasion
      expect(windStats.speed).toBeGreaterThan(fireStats.speed);
      expect(windStats.speed).toBeGreaterThan(mountainStats.speed);
      expect(windStats.evasion).toBeGreaterThan(fireStats.evasion);
      expect(windStats.evasion).toBeGreaterThan(mountainStats.evasion);
    });
  });

  describe("Korean martial arts balance verification", () => {
    it("should maintain balanced overall power across stances", () => {
      const overallStats = allStances.map(
        (stance) => TrigramCalculator.getStanceStats(stance).overall
      );

      const minOverall = Math.min(...overallStats);
      const maxOverall = Math.max(...overallStats);

      // No stance should be more than 30% stronger overall than the weakest
      expect(maxOverall / minOverall).toBeLessThanOrEqual(1.3);
    });

    it("should ensure each stance has distinct characteristics", () => {
      const stanceProfiles = allStances.map((stance) => {
        const stats = TrigramCalculator.getStanceStats(stance);
        return {
          stance,
          strongestStat: Object.entries(stats)
            .filter(([key]) => key !== "overall")
            .reduce(
              (max, [key, value]) => (value > max.value ? { key, value } : max),
              { key: "", value: 0 }
            ).key,
        };
      });

      // Each stance should have a different strongest stat or at least varied profiles
      const strongestStats = stanceProfiles.map((p) => p.strongestStat);
      const uniqueStats = new Set(strongestStats);

      expect(uniqueStats.size).toBeGreaterThanOrEqual(3); // At least 3 different specializations
    });
  });

  describe("calculateTransitionCost", () => {
    it("should return zero cost for same stance transition", () => {
      const cost = TrigramCalculator.calculateTransitionCost("geon", "geon");

      expect(cost.staminaCost).toBe(0);
      expect(cost.kiCost).toBe(0);
      expect(cost.timeDelay).toBe(0);
      expect(cost.effectiveness).toBe(1.0);
    });

    it("should calculate costs for different stance transitions", () => {
      const cost = TrigramCalculator.calculateTransitionCost("geon", "tae");

      expect(cost.staminaCost).toBeGreaterThan(0);
      expect(cost.kiCost).toBeGreaterThan(0);
      expect(cost.timeDelay).toBeGreaterThan(0);
      expect(cost.effectiveness).toBeLessThanOrEqual(1.0);
    });

    it("should have higher costs for opposite trigram transitions", () => {
      const oppositeCost = TrigramCalculator.calculateTransitionCost(
        "geon",
        "gon"
      );
      const adjacentCost = TrigramCalculator.calculateTransitionCost(
        "geon",
        "tae"
      );

      expect(oppositeCost.staminaCost).toBeGreaterThan(
        adjacentCost.staminaCost
      );
      expect(oppositeCost.kiCost).toBeGreaterThan(adjacentCost.kiCost);
    });
  });

  describe("calculateDamageModifier", () => {
    it("should return 1.0 for same stance matchup", () => {
      const modifier = TrigramCalculator.calculateDamageModifier(
        "geon",
        "geon"
      );
      expect(modifier).toBe(1.0);
    });

    it("should return higher modifier for advantageous matchups", () => {
      const modifier = TrigramCalculator.calculateDamageModifier("geon", "gon");
      expect(modifier).toBeGreaterThan(1.0);
    });

    it("should return lower modifier for disadvantageous matchups", () => {
      const modifier = TrigramCalculator.calculateDamageModifier("geon", "son");
      expect(modifier).toBeLessThan(1.0);
    });
  });

  describe("calculateDefenseModifier", () => {
    it("should provide defensive advantage against weak attacks", () => {
      const defenseModifier = TrigramCalculator.calculateDefenseModifier(
        "geon",
        "son"
      );
      expect(defenseModifier).toBeGreaterThan(1.0);
    });

    it("should provide less defense against strong attacks", () => {
      const defenseModifier = TrigramCalculator.calculateDefenseModifier(
        "gon",
        "geon"
      );
      expect(defenseModifier).toBeLessThan(1.0);
    });
  });

  describe("getStanceKoreanName", () => {
    it("should return correct Korean names for all stances", () => {
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
        const name = TrigramCalculator.getStanceKoreanName(stance);
        expect(name).toContain("(");
        expect(name).toContain(")");
        expect(name.length).toBeGreaterThan(3);
      });
    });

    it("should return heaven trigram for geon", () => {
      expect(TrigramCalculator.getStanceKoreanName("geon")).toBe("건 (天)");
    });
  });

  describe("calculateOptimalPath", () => {
    it("should return single stance path for same stance", () => {
      const result = TrigramCalculator.calculateOptimalPath(
        "geon",
        "geon",
        100,
        100
      );

      expect(result.path).toEqual(["geon"]);
      expect(result.feasible).toBe(true);
      expect(result.totalCost.staminaCost).toBe(0);
    });

    it("should calculate direct path for different stances", () => {
      const result = TrigramCalculator.calculateOptimalPath(
        "geon",
        "tae",
        100,
        100
      );

      expect(result.path).toEqual(["geon", "tae"]);
      expect(result.feasible).toBe(true);
      expect(result.totalCost.staminaCost).toBeGreaterThan(0);
    });

    it("should mark path as unfeasible with insufficient resources", () => {
      const result = TrigramCalculator.calculateOptimalPath(
        "geon",
        "gon",
        5,
        5
      );

      expect(result.feasible).toBe(false);
    });
  });
});
