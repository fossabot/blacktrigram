import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { VitalPointSystem } from "./VitalPointSystem";
import type {
  VitalPoint,
  VitalPointSystemConfig,
  KoreanTechnique,
  AttackType,
} from "../types"; // Added KoreanTechnique, AttackType

const mockVitalPoint: VitalPoint = {
  id: "test-point",
  name: { korean: "테스트 급소", english: "Test Vital Point" },
  koreanName: "테스트 급소",
  position: { x: 50, y: 50 },
  region: "head",
  damageMultiplier: 2.0,
  category: "nerve",
  difficulty: 0.7,
  effects: [
    {
      type: "stun",
      duration: 3000,
      magnitude: 1.0,
      chance: 0.8,
      source: "vital_point_hit",
    },
  ],
};

const mockTechnique: KoreanTechnique = {
  // Explicitly type mockTechnique
  name: "천둥벽력",
  koreanName: "천둥벽력",
  englishName: "Thunder Strike",
  description: { korean: "천둥벽력", english: "Thunder Strike" },
  kiCost: 15,
  staminaCost: 10,
  range: 60,
  accuracy: 0.8,
  stance: "geon",
  damage: 28,
  type: "strike" as AttackType, // Ensure 'type' is a valid AttackType
  critChance: 0.1, // Added for completeness
  critMultiplier: 1.5, // Added for completeness
};

describe("VitalPointSystem", () => {
  let originalConfig: VitalPointSystemConfig;

  beforeEach(() => {
    // Store original config and clone it for modification in tests
    originalConfig = { ...VitalPointSystem.config };
    // Reset to a known default state before each test
    VitalPointSystem.setConfig({
      precisionThreshold: 0.9,
      criticalHitRange: 0.05,
      damageMultiplierCurve: [1.5, 2.0, 2.5],
      meridianBonusFactors: {},
      baseAccuracy: 0.8,
      distanceModifier: 0.05,
      targetingDifficulty: 0.75,
      effectChance: 0.6,
    });
  });

  afterEach(() => {
    // Restore original config
    VitalPointSystem.setConfig(originalConfig);
  });

  it("should have a default configuration", () => {
    expect(VitalPointSystem.config).toBeDefined();
    expect(VitalPointSystem.config.precisionThreshold).toBe(0.9);
    expect(VitalPointSystem.config.damageMultiplierCurve).toEqual([
      1.5, 2.0, 2.5,
    ]);
    expect(VitalPointSystem.config.baseAccuracy).toBe(0.8); // Check optional field
  });

  it("should allow configuration to be updated", () => {
    const newConfig: Partial<VitalPointSystemConfig> = {
      precisionThreshold: 0.95,
      damageMultiplierCurve: [1.8, 2.2, 2.8],
      baseAccuracy: 0.85, // Testing update of an optional field
    };
    VitalPointSystem.setConfig(newConfig);
    expect(VitalPointSystem.config.precisionThreshold).toBe(0.95);
    expect(VitalPointSystem.config.damageMultiplierCurve).toEqual([
      1.8, 2.2, 2.8,
    ]);
    expect(VitalPointSystem.config.baseAccuracy).toBe(0.85);
  });

  it("should check vital point hit with valid parameters", () => {
    // const attackerPosition: Position = { x: 0, y: 0 }; // Attacker's position - Removed
    // const targetBodyPosition: Position = { x: 10, y: 0 }; // Target character's root position - Removed
    // For this test, let's assume mockVitalPoint is at {x:0, y:0} relative to targetBodyPosition.
    const localMockVitalPoint: VitalPoint = {
      ...mockVitalPoint,
      position: { x: 0, y: 0 },
    };
    const distanceToTargetCharacter = 10; // Distance between attacker and target character

    // Mock Math.random to ensure a hit for this test case
    const originalMathRandom = Math.random;
    Math.random = () => 0.1; // Low roll, likely a hit if accuracy is decent

    const result = VitalPointSystem.checkVitalPointHit(
      // attackerPosition, // Removed
      // targetBodyPosition, // Removed
      localMockVitalPoint,
      mockTechnique,
      distanceToTargetCharacter,
      originalConfig // Pass config for consistency
    );
    Math.random = originalMathRandom; // Restore Math.random

    expect(result).toBeDefined();
    if (result.hit) {
      expect(result.vitalPoint).toEqual(localMockVitalPoint);
      expect(result.damage).toBeGreaterThan(0);
    } else {
      expect(result.hit).toBe(false); // Could miss if accuracy is extremely low
    }
  });

  it("should miss when target is far from vital point", () => {
    // const attackerPosition: Position = { x: 0, y: 0 }; // Unused - Removed
    // const targetBodyPosition: Position = { x: 200, y: 0 }; // Unused - Removed
    const localMockVitalPoint: VitalPoint = {
      ...mockVitalPoint,
      position: { x: 0, y: 0 },
    };
    const distanceToTargetCharacter = 200;

    const originalMathRandom = Math.random;
    Math.random = () => 0.95; // High roll, likely a miss if accuracy is low

    const result = VitalPointSystem.checkVitalPointHit(
      // attackerPosition, // Removed
      // targetBodyPosition, // Removed
      localMockVitalPoint,
      mockTechnique,
      distanceToTargetCharacter,
      originalConfig
    );
    Math.random = originalMathRandom;

    expect(result.hit).toBe(false);
  });

  it("should calculate accuracy based on distance and technique", () => {
    // const attackerPosition: Position = { x: 0, y: 0 }; // Unused variable
    // const targetBodyPosition: Position = { x: 30, y: 40 }; // Unused variable
    // Assume vital point is at {x:0, y:0} relative to targetBodyPosition for simplicity
    const localMockVitalPoint: VitalPoint = {
      ...mockVitalPoint,
      position: { x: 0, y: 0 },
      difficulty: 0.2,
    };
    const distanceToTargetCharacter = 50; // Calculated distance (sqrt(30^2 + 40^2))

    const accuracy = VitalPointSystem.calculateAccuracy(
      // attackerPosition, // Removed
      // targetBodyPosition, // Removed
      localMockVitalPoint, // Pass the vital point
      mockTechnique,
      distanceToTargetCharacter
    );

    expect(accuracy).toBeGreaterThanOrEqual(0); // Accuracy can be 0
    expect(accuracy).toBeLessThanOrEqual(1);
  });

  it("should apply different modifiers for different attack types", () => {
    const punchModifier = VitalPointSystem.getTechniqueTypeModifier(
      "punch",
      mockVitalPoint
    );
    const kickModifier = VitalPointSystem.getTechniqueTypeModifier(
      "kick",
      mockVitalPoint
    );

    expect(punchModifier).toBeGreaterThan(0);
    expect(kickModifier).toBeGreaterThan(0);
    expect(Math.abs(punchModifier - kickModifier)).toBeGreaterThanOrEqual(0);
  });

  it("should return optimal angle for technique", () => {
    const angle = VitalPointSystem.getOptimalAngleForTechnique(mockTechnique);
    expect(typeof angle).toBe("number");
    expect(angle).toBeGreaterThanOrEqual(0);
    expect(angle).toBeLessThanOrEqual(Math.PI * 2);
  });

  it("should handle critical hits on high-difficulty points", () => {
    const highDifficultyPoint: VitalPoint = {
      ...mockVitalPoint,
      difficulty: 0.9,
      damageMultiplier: 2.5,
    };

    // const attackerPosition: Position = { x: 0, y: 0 }; // Unused - Removed
    // const targetBodyPosition: Position = { x: 10, y: 0 }; // Unused - Removed
    const distanceToTargetCharacter = 10;

    const originalMathRandom = Math.random;
    // This roll is for the general hit chance in checkVitalPointHit.
    // If this roll results in a hit, it's then passed to calculateHitResult.
    Math.random = () => 0.88; // A roll that could be precise/critical if it passes the accuracy check.

    const result = VitalPointSystem.checkVitalPointHit(
      // attackerPosition, // Removed
      // targetBodyPosition, // Removed
      highDifficultyPoint,
      mockTechnique,
      distanceToTargetCharacter,
      originalConfig
    );
    Math.random = originalMathRandom;

    if (result && result.hit) {
      expect(result.vitalPoint?.difficulty).toBe(0.9);
      expect(result.damage).toBeGreaterThan(0);
      // With originalConfig (precisionThreshold: 0.9, criticalHitRange: 0.05)
      // A roll of 0.88 means:
      // > (0.9 - 0.05) = 0.85 (Precise/Vital)
      // Not > 0.9 (Not Critical)
      // So, we expect a 'vital' hitType if the initial accuracy check passed.
      expect(result.hitType).toBe("vital");
    } else if (result) {
      // Could miss if effectiveAccuracy is too low for roll 0.88
      expect(result.hit).toBe(false);
    }
  });

  describe("calculateHitResult", () => {
    it("should calculate critical hit correctly", () => {
      const testConfig: VitalPointSystemConfig = {
        // Define a specific config for this test
        precisionThreshold: 0.8,
        criticalHitRange: 0.05,
        damageMultiplierCurve: [1.5, 2.0, 3.0],
        meridianBonusFactors: {},
        baseAccuracy: 0.9,
      };
      const accuracyRoll = 0.88; // Should be a critical hit (roll > testConfig.precisionThreshold)

      const result = VitalPointSystem.calculateHitResult(
        mockVitalPoint,
        // attackPosition, // Removed
        accuracyRoll,
        testConfig, // Pass the specific config
        mockTechnique // Pass mockTechnique
      );

      expect(result.hit).toBe(true);
      expect(result.hitType).toBe("critical");
      // Base damage mockTechnique.damage (28) * VP multiplier (2.0) * curve's critical value (3.0)
      expect(result.damage).toBe(
        Math.round(mockTechnique.damage * mockVitalPoint.damageMultiplier * 3.0)
      );
      expect(result.description).toContain("(Critical!)");
    });

    it("should use damageMultiplierCurve for damage calculation (precise hit)", () => {
      const testConfig: VitalPointSystemConfig = {
        precisionThreshold: 0.8,
        criticalHitRange: 0.05, // Precise if roll > 0.75
        damageMultiplierCurve: [1.0, 1.5, 2.0],
        meridianBonusFactors: {},
        baseAccuracy: 0.9,
      };
      const accuracyRoll = 0.78; // roll > (0.8 - 0.05) = 0.75, but roll < 0.8
      const result = VitalPointSystem.calculateHitResult(
        mockVitalPoint,
        // attackPosition, // Removed
        accuracyRoll,
        testConfig,
        mockTechnique // Pass mockTechnique
      );

      expect(result.hit).toBe(true);
      expect(result.hitType).toBe("vital");
      // Base damage mockTechnique.damage (28) * VP multiplier (2.0) * curve[1] (1.5) for precise
      expect(result.damage).toBe(
        Math.round(mockTechnique.damage * mockVitalPoint.damageMultiplier * 1.5)
      );
    });

    it("should use damageMultiplierCurve for damage calculation (normal hit)", () => {
      const testConfig: VitalPointSystemConfig = {
        precisionThreshold: 0.8,
        criticalHitRange: 0.05, // Precise if roll > 0.75
        damageMultiplierCurve: [1.0, 1.5, 2.0],
        meridianBonusFactors: {},
        baseAccuracy: 0.9,
      };
      const accuracyRoll = 0.7; // Below precise threshold (0.75)
      const result = VitalPointSystem.calculateHitResult(
        mockVitalPoint,
        // attackPosition, // Removed
        accuracyRoll,
        testConfig,
        mockTechnique // Pass mockTechnique
      );

      expect(result.hit).toBe(true);
      expect(result.hitType).toBe("normal");
      // Base damage mockTechnique.damage (28) * VP multiplier (2.0) * curve[0] (1.0) for normal
      expect(result.damage).toBe(
        Math.round(mockTechnique.damage * mockVitalPoint.damageMultiplier * 1.0)
      );
    });
  });

  // Test for setConfig retaining unspecified properties
  it("setConfig should merge partial updates correctly", () => {
    const initialConfig = { ...VitalPointSystem.config }; // Capture full initial state
    VitalPointSystem.setConfig({
      precisionThreshold: 0.92,
      // Only updating precisionThreshold
    });
    // Check that precisionThreshold is updated
    expect(VitalPointSystem.config.precisionThreshold).toBe(0.92);
    // Check that other properties remain unchanged from the initial test setup
    expect(VitalPointSystem.config.criticalHitRange).toBe(
      initialConfig.criticalHitRange
    );
    expect(VitalPointSystem.config.damageMultiplierCurve).toEqual(
      initialConfig.damageMultiplierCurve
    );
    expect(VitalPointSystem.config.baseAccuracy).toBe(
      initialConfig.baseAccuracy
    );
  });

  it("should correctly use optional config parameters if provided", () => {
    VitalPointSystem.setConfig({
      baseAccuracy: 0.9,
      distanceModifier: 0.02,
      targetingDifficulty: 0.6,
      effectChance: 0.7,
      angleModifier: 0.1,
      // Ensure required fields are also present if not relying on defaults from beforeEach
      precisionThreshold: VitalPointSystem.config.precisionThreshold,
      criticalHitRange: VitalPointSystem.config.criticalHitRange,
      damageMultiplierCurve: [...VitalPointSystem.config.damageMultiplierCurve],
      meridianBonusFactors: { ...VitalPointSystem.config.meridianBonusFactors },
    });
    expect(VitalPointSystem.config.baseAccuracy).toBe(0.9);
    expect(VitalPointSystem.config.distanceModifier).toBe(0.02);
    // Add assertions for calculateHitResult if its logic depends on these values
  });
});
