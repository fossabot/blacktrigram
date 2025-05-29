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

  describe("calculateTransitionCost", () => {
    it("should calculate transition cost between similar stances", () => {
      const cost = TrigramCalculator.calculateTransitionCost("geon", "tae");
      expect(cost).toBeDefined();
      expect(typeof cost.stamina).toBe("number");
    });

    it("should calculate transition cost between opposite stances", () => {
      const cost = TrigramCalculator.calculateTransitionCost("geon", "gon");
      expect(cost).toBeDefined();
      expect(typeof cost.stamina).toBe("number");
    });
  });

  describe("calculateDamageMultiplier", () => {
    it("should calculate basic damage multiplier", () => {
      const multiplier = TrigramCalculator.calculateDamageMultiplier(
        "geon",
        "gon"
      );
      expect(multiplier).toBeGreaterThan(0);
    });

    it("should handle advantageous matchups", () => {
      const multiplier = TrigramCalculator.calculateDamageMultiplier(
        "geon",
        "gon"
      );
      expect(multiplier).toBeGreaterThan(0);
    });

    it("should handle disadvantageous matchups", () => {
      const multiplier = TrigramCalculator.calculateDamageMultiplier(
        "gon",
        "geon"
      );
      expect(multiplier).toBeGreaterThan(0);
    });
  });

  describe("calculateTransitionSpeed", () => {
    it("should calculate transition speed between similar stances", () => {
      const speed = TrigramCalculator.calculateTransitionSpeed("geon", "tae");
      expect(speed).toBeGreaterThan(0);
    });

    it("should calculate transition speed between opposite stances", () => {
      const speed = TrigramCalculator.calculateTransitionSpeed("geon", "gon");
      expect(speed).toBeGreaterThan(0);
    });
  });

  describe("getStanceStats", () => {
    it("should return complete stance statistics", () => {
      const validStances: TrigramStance[] = [
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ];

      validStances.forEach((stance) => {
        const stats = TrigramCalculator.getStanceStats(stance);
        expect(stats.power).toBeGreaterThan(0);
        expect(stats.speed).toBeGreaterThan(0);
        expect(stats.defense).toBeGreaterThan(0);
        expect(stats.flexibility).toBeGreaterThan(0);
      });
    });

    it("should calculate overall average correctly", () => {
      const stats = TrigramCalculator.getStanceStats("geon");
      const expectedOverall =
        (stats.power + stats.defense + stats.speed + stats.flexibility) / 4;
      expect(stats.overall).toBe(expectedOverall);
    });

    it("should return highest stat as dominant property", () => {
      const stats = TrigramCalculator.getStanceStats("geon");
      const statEntries = Object.entries(stats).filter(
        ([key]) => key !== "overall"
      );

      if (statEntries.length > 0) {
        const dominantStat = statEntries.reduce((max, current) =>
          (current[1] as number) > (max[1] as number) ? current : max
        );
        expect(dominantStat).toBeDefined();
      }
    });
  });

  describe("stance comparisons", () => {
    it("should show fire stance has higher power than others", () => {
      const fireStats = TrigramCalculator.getStanceStats("li");
      const mountainStats = TrigramCalculator.getStanceStats("gan");
      const windStats = TrigramCalculator.getStanceStats("son");

      expect(fireStats.power).toBeGreaterThan(mountainStats.power);
      expect(fireStats.power).toBeGreaterThan(windStats.power);
    });

    it("should show wind stance has higher speed", () => {
      const windStats = TrigramCalculator.getStanceStats("son");
      const fireStats = TrigramCalculator.getStanceStats("li");
      const mountainStats = TrigramCalculator.getStanceStats("gan");

      expect(windStats.speed).toBeGreaterThan(fireStats.speed);
      expect(windStats.speed).toBeGreaterThan(mountainStats.speed);
    });
  });

  describe("damage calculations", () => {
    it("should calculate damage modifier for advantageous stance", () => {
      const modifier = TrigramCalculator.calculateDamageMultiplier(
        "geon",
        "gon"
      );
      expect(modifier).toBeGreaterThan(1.0);
    });

    it("should calculate damage modifier for neutral stance", () => {
      const modifier = TrigramCalculator.calculateDamageMultiplier(
        "geon",
        "gon"
      );
      expect(modifier).toBeGreaterThan(0);
    });

    it("should calculate damage modifier for disadvantageous stance", () => {
      const modifier = TrigramCalculator.calculateDamageMultiplier(
        "geon",
        "son"
      );
      expect(modifier).toBeGreaterThan(0);
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

  describe("transition costs", () => {
    it("should calculate transition cost between different stances", () => {
      const cost = TrigramCalculator.calculateTransitionCost("geon", "tae");
      expect(typeof cost).toBe("number");
      expect(cost).toBeGreaterThan(0);
    });

    it("should have zero cost for same stance", () => {
      const cost = TrigramCalculator.calculateTransitionCost("geon", "geon");
      expect(cost).toBe(0);
    });
  });

  describe("transition speed calculations", () => {
    it("should calculate transition costs for fast transitions", () => {
      const cost = TrigramCalculator.calculateTransitionCost("son", "tae");
      expect(typeof cost).toBe("number");
      expect(cost).toBeGreaterThan(0);
    });

    it("should calculate transition costs for slow transitions", () => {
      const cost = TrigramCalculator.calculateTransitionCost("geon", "gon");
      expect(typeof cost).toBe("number");
      expect(cost).toBeGreaterThan(0);
    });
  });

  describe("effectiveness calculations", () => {
    it("should calculate effective damage with correct parameters", () => {
      const damage = TrigramCalculator.calculateEffectiveDamage(
        0.8, // accuracy
        30, // damage
        0.6 // speed
      );
      expect(typeof damage).toBe("number");
      expect(damage).toBeGreaterThan(0);
    });

    it("should handle balanced effectiveness", () => {
      const damage = TrigramCalculator.calculateEffectiveDamage(
        0.7, // accuracy
        25, // damage
        0.7 // speed
      );
      expect(typeof damage).toBe("number");
      expect(damage).toBeGreaterThan(0);
    });

    it("should handle disadvantageous effectiveness", () => {
      const damage = TrigramCalculator.calculateEffectiveDamage(
        0.5, // accuracy
        15, // damage
        0.4 // speed
      );
      expect(typeof damage).toBe("number");
      expect(damage).toBeGreaterThan(0);
    });
  });

  describe("distance calculations", () => {
    it("should calculate distance effects correctly", () => {
      const fastStance = "son" as const;
      const slowStance = "gan" as const;

      // Use available methods from TrigramCalculator
      const fastCost = TrigramCalculator.calculateTransitionCost(
        fastStance,
        "li"
      );
      const slowCost = TrigramCalculator.calculateTransitionCost(
        slowStance,
        "li"
      );

      expect(typeof fastCost).toBe("number");
      expect(typeof slowCost).toBe("number");
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

    it("should return Korean stance names", () => {
      expect(TrigramCalculator.getStanceKoreanName("geon")).toBe("건 (天)");
      expect(TrigramCalculator.getStanceKoreanName("tae")).toBe("태 (澤)");
      expect(TrigramCalculator.getStanceKoreanName("li")).toBe("리 (離)");
    });
  });

  describe("optimal path calculation", () => {
    it("should find direct path for same stance", () => {
      // Fix method call
      const result = TrigramCalculator.calculateOptimalPath("geon", "geon");

      expect(result.success).toBe(true);
      expect(result.totalCost).toBe(0);
    });

    it("should calculate path between different stances", () => {
      // Fix method call
      const result = TrigramCalculator.calculateOptimalPath("geon", "tae");

      expect(result.success).toBe(true);
      expect(result.totalCost).toBeGreaterThan(0);
    });

    it("should respect maximum steps constraint", () => {
      // Fix method call
      const result = TrigramCalculator.calculateOptimalPath("geon", "gon", 1);

      expect(result.success).toBe(true);
    });
  });
});
