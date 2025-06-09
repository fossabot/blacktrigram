import { describe, it, expect, beforeEach } from "vitest";
import { CombatSystem } from "./CombatSystem";
import type { PlayerState, KoreanTechnique } from "../types";
import { PlayerArchetype, TrigramStance, DamageType } from "../types/enums";

const mockAttacker: PlayerState = {
  id: "attacker",
  name: { korean: "공격자", english: "Attacker" },
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
  position: { x: 100, y: 200 },
  statusEffects: [],
  vitalPoints: [],
  // Fix: Add missing properties from PlayerState interface
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

const mockDefender: PlayerState = { ...mockAttacker, id: "defender" };

const mockTechnique: KoreanTechnique = {
  id: "test-technique",
  name: { korean: "테스트 펀치", english: "Test Punch" },
  koreanName: "테스트 펀치",
  englishName: "Test Punch",
  romanized: "teseuteu_peonchi",
  description: { korean: "테스트용 기법", english: "Test technique" },
  stance: TrigramStance.GEON,
  type: "strike" as any,
  damageType: DamageType.BLUNT,
  damage: 20,
  damageRange: { min: 15, max: 25 },
  range: 1.0,
  kiCost: 10,
  staminaCost: 15,
  accuracy: 0.8,
  executionTime: 500,
  recoveryTime: 800,
  critChance: 0.1,
  critMultiplier: 1.5,
  effects: [],
};

describe("CombatSystem", () => {
  let combatSystem: CombatSystem;

  beforeEach(() => {
    combatSystem = new CombatSystem();
  });

  describe("executeAttack", () => {
    it("should execute a basic attack successfully", () => {
      const result = combatSystem.executeAttack(
        mockAttacker,
        mockDefender,
        mockTechnique
      );

      expect(result.success).toBe(true);
      expect(result.damage).toBeGreaterThan(0);
      expect(result.updatedAttacker).toBeDefined();
      expect(result.updatedDefender).toBeDefined();
    });

    it("should apply damage to defender", () => {
      const result = combatSystem.executeAttack(
        mockAttacker,
        mockDefender,
        mockTechnique
      );

      expect(result.updatedDefender!.health).toBeLessThan(mockDefender.health);
    });

    it("should consume ki and stamina from attacker", () => {
      const result = combatSystem.executeAttack(
        mockAttacker,
        mockDefender,
        mockTechnique
      );

      expect(result.updatedAttacker!.ki).toBeLessThan(mockAttacker.ki);
      expect(result.updatedAttacker!.stamina).toBeLessThan(
        mockAttacker.stamina
      );
    });
  });

  describe("static methods", () => {
    it("should resolve attack using static method", () => {
      const result = CombatSystem.resolveAttack(
        mockAttacker,
        mockDefender,
        mockTechnique
      );

      expect(result.success).toBe(true);
      expect(result.damage).toBeGreaterThan(0);
    });

    it("should get available techniques", () => {
      const techniques = CombatSystem.getAvailableTechniques(mockAttacker);

      expect(techniques).toHaveLength(1);
      expect(techniques[0].stance).toBe(mockAttacker.currentStance);
    });
  });

  describe("isPlayerDefeated", () => {
    it("should return true when health reaches 0", () => {
      const defeatedPlayer = { ...mockDefender, health: 0 };
      expect(combatSystem.isPlayerDefeated(defeatedPlayer)).toBe(true);
    });

    it("should return true when consciousness reaches 0", () => {
      const unconsciousPlayer = { ...mockDefender, consciousness: 0 };
      expect(combatSystem.isPlayerDefeated(unconsciousPlayer)).toBe(true);
    });

    it("should return false for healthy player", () => {
      expect(combatSystem.isPlayerDefeated(mockDefender)).toBe(false);
    });
  });

  describe("updatePlayerState", () => {
    it("should regenerate stamina and ki over time", () => {
      const lowResourcePlayer = {
        ...mockAttacker,
        stamina: 50,
        ki: 50,
      };

      const result = combatSystem.updatePlayerState(lowResourcePlayer, 1000);

      expect(result.stamina).toBeGreaterThan(lowResourcePlayer.stamina);
      expect(result.ki).toBeGreaterThan(lowResourcePlayer.ki);
    });
  });
});
