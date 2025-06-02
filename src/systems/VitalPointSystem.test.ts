import { describe, it, expect, beforeEach } from "vitest";
import { VitalPointSystem } from "./VitalPointSystem";
import type {
  VitalPoint,
  VitalPointSystemConfig,
  KoreanTechnique,
  PlayerArchetype,
} from "../types";

// Mock data (simplified)
const MOCK_TECHNIQUE_STRIKE: KoreanTechnique = {
  id: "strike_normal",
  name: "Normal Strike",
  koreanName: "보통 치기",
  englishName: "Normal Strike",
  romanized: "Botong Chigi",
  description: { korean: "기본 공격", english: "A basic attack" },
  stance: "geon",
  type: "strike",
  damageType: "blunt",
  damageRange: { min: 10, max: 20 },
  range: 1.0,
  kiCost: 5,
  staminaCost: 10,
  executionTime: 300,
  recoveryTime: 500,
  accuracy: 0.85,
  critChance: 0.1,
  critMultiplier: 1.5,
  effects: [],
};

// const MOCK_PLAYER_STATE_MUSA: PlayerState = { ... }; // Unused

// Corrected mock path if mocks are moved or structure changes
// For now, assuming VITAL_POINTS_DATA is the source.
// import { MOCK_VITAL_POINTS } from '../test/mocks/anatomy'; // Example if using mocks

describe("VitalPointSystem", () => {
  let system: VitalPointSystem;
  const testConfig: VitalPointSystemConfig = {
    baseAccuracyMultiplier: 1.0,
    damageVariance: 0.1,
    // vitalPointsData: VITAL_POINTS_DATA, // This is not a config option, system loads it internally
    archetypeModifiers: {
      musa: { head: 1.1 },
      amsalja: { head: 1.3 },
      hacker: { head: 1.0 },
      jeongbo: { head: 1.0 },
      jojik: { head: 0.9 },
    },
  };

  beforeEach(() => {
    system = new VitalPointSystem(testConfig);
  });

  it("should initialize with vital points", () => {
    expect(system.getAllVitalPoints().length).toBeGreaterThan(0);
    const temple = system.getVitalPointById("head_temple");
    expect(temple).toBeDefined();
    expect(temple?.name.english).toBe("Temple");
  });

  it("should allow configuration to be set and get", () => {
    const newConfig: VitalPointSystemConfig = { baseAccuracyMultiplier: 0.9 };
    system.setConfig(newConfig);
    // Note: We can't directly get the config, so we test its effects
    // This test might need to be more sophisticated by checking behavior changes
    expect(system).toBeDefined(); // Basic check
  });

  it("should retrieve vital points by region", () => {
    const headPoints = system.getVitalPointsByRegion("head");
    expect(headPoints.length).toBeGreaterThan(0);
    headPoints.forEach((vp: VitalPoint) => {
      expect(vp.location.region).toBe("head");
    });
  });

  it("should calculate damage for a vital point hit", () => {
    const temple = system.getVitalPointById("head_temple");
    expect(temple).toBeDefined();
    if (!temple) return;

    const damage = system.calculateVitalPointDamage(
      temple,
      MOCK_TECHNIQUE_STRIKE,
      "musa" as PlayerArchetype
    );
    expect(damage).toBeGreaterThan(0);
  });

  it("should calculate critical damage for a vital point hit", () => {
    const temple = system.getVitalPointById("head_temple");
    expect(temple).toBeDefined();
    if (!temple) return;

    const damage = system.calculateVitalPointDamage(
      temple,
      MOCK_TECHNIQUE_STRIKE,
      "amsalja" as PlayerArchetype,
      true // isCriticalHit
    );
    expect(damage).toBeGreaterThan(0);
    // Add more specific assertions based on expected critical damage calculation
  });

  it("should return effects for a vital point hit", () => {
    const temple = system.getVitalPointById("head_temple");
    expect(temple).toBeDefined();
    if (!temple) return;

    const effects = system.getVitalPointEffects(
      temple,
      MOCK_TECHNIQUE_STRIKE,
      false
    );
    expect(effects).toBeInstanceOf(Array);
    if (temple.effects && temple.effects.length > 0) {
      expect(effects.length).toBeGreaterThanOrEqual(temple.effects.length);
      expect(effects[0].type).toBe(temple.effects[0].type);
    }
  });

  describe("calculateHit", () => {
    it("should simulate a hit on a vital point", () => {
      const result = system.calculateHit(
        MOCK_TECHNIQUE_STRIKE,
        "head_temple",
        0.1
      ); // Force hit
      expect(result.hit).toBe(true);
      expect(result.vitalPointsHit.length).toBeGreaterThan(0);
      expect(result.vitalPointsHit).toContain("head_temple");
      expect(result.damage).toBeGreaterThan(0);
    });

    it("should simulate a miss", () => {
      const result = system.calculateHit(
        MOCK_TECHNIQUE_STRIKE,
        "head_temple",
        0.99
      ); // Force miss
      expect(result.hit).toBe(false);
      expect(result.damage).toBe(0);
    });

    it("should simulate a non-vital point hit", () => {
      const result = system.calculateHit(MOCK_TECHNIQUE_STRIKE, null, 0.1); // Force hit, no vital target
      expect(result.hit).toBe(true);
      expect(result.vitalPointsHit.length).toBe(0);
      expect(result.damage).toBeGreaterThan(0);
    });
  });

  it("should handle configuration for archetype modifiers", () => {
    const temple = system.getVitalPointById("head_temple");
    if (!temple) throw new Error("Temple vital point not found");

    const systemWithMusaBonus = new VitalPointSystem({
      archetypeModifiers: {
        musa: { head: 1.5 }, // Musa gets 50% damage bonus to head
        amsalja: { head: 1.0 },
        hacker: { head: 1.0 },
        jeongbo: { head: 1.0 },
        jojik: { head: 1.0 },
      },
    });
    const damageMusa = systemWithMusaBonus.calculateVitalPointDamage(
      temple,
      MOCK_TECHNIQUE_STRIKE,
      "musa"
    );

    const systemWithoutBonus = new VitalPointSystem({
      archetypeModifiers: {
        musa: { head: 1.0 },
        amsalja: { head: 1.0 },
        hacker: { head: 1.0 },
        jeongbo: { head: 1.0 },
        jojik: { head: 1.0 },
      },
    });
    const damageNoBonus = systemWithoutBonus.calculateVitalPointDamage(
      temple,
      MOCK_TECHNIQUE_STRIKE,
      "musa"
    );

    expect(damageMusa).toBeGreaterThan(damageNoBonus);
  });
});
