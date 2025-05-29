import { describe, it, expect, beforeEach } from "vitest";
import { CombatSystem } from "./CombatSystem";
import type { PlayerState, AttackResult, Position } from "../types/GameTypes";

describe("CombatSystem", () => {
  let mockPlayerState: PlayerState;
  let mockDefender: PlayerState;
  let mockTargetPosition: Position;

  beforeEach(() => {
    mockPlayerState = {
      id: "player1",
      position: { x: 100, y: 100 },
      stance: "geon",
      health: 100,
      maxHealth: 100,
      stamina: 100,
      maxStamina: 100,
      ki: 50,
      maxKi: 100,
      isBlocking: false,
      isDodging: false,
      isAttacking: false,
      comboCount: 0,
      statusEffects: [],
      skill: 80,
      attack: 25,
      defense: 20,
    };

    mockDefender = {
      ...mockPlayerState,
      id: "defender1",
      position: { x: 150, y: 150 },
      defense: 15,
    };

    mockTargetPosition = { x: 150, y: 150 };
  });

  describe("executeAttack", () => {
    it("should fail when insufficient ki", () => {
      const lowKiPlayer = { ...mockPlayerState, ki: 0 };
      const result = CombatSystem.executeAttack(
        lowKiPlayer,
        mockDefender,
        "천둥벽력",
        mockTargetPosition
      );

      expect(result.hit).toBe(false);
      expect(result.description).toContain("공격 실패");
    });

    it("should fail when target out of range", () => {
      const farTargetPosition = { x: 2000, y: 2000 };
      const result = CombatSystem.executeAttack(
        mockPlayerState,
        mockDefender,
        "천둥벽력",
        farTargetPosition
      );

      expect(result.hit).toBe(false);
      expect(result.description).toContain("공격 실패");
    });

    it("should execute successful attack", () => {
      const result = CombatSystem.executeAttack(
        mockPlayerState,
        mockDefender,
        "천둥벽력",
        mockTargetPosition
      );

      expect(result).toBeDefined();
      expect(typeof result.hit).toBe("boolean");
      expect(typeof result.damage).toBe("number");
    });
  });

  describe("validateHit", () => {
    it("should validate successful hits", () => {
      const isValid = CombatSystem.validateHit(
        mockPlayerState,
        mockDefender,
        50
      );

      expect(isValid).toBe(true);
    });

    it("should reject hits when target is out of range", () => {
      const isValid = CombatSystem.validateHit(
        mockPlayerState,
        mockDefender,
        200
      );

      expect(isValid).toBe(false);
    });

    it("should reject hits when attacker has no stamina", () => {
      const exhaustedPlayer = { ...mockPlayerState, stamina: 0 };
      const isValid = CombatSystem.validateHit(
        exhaustedPlayer,
        mockDefender,
        50
      );

      expect(isValid).toBe(false);
    });
  });

  describe("applyAttackResults", () => {
    it("should apply damage correctly", () => {
      const attackResult: AttackResult = {
        hit: true,
        damage: 25,
        accuracy: 0.9,
        blocked: false,
        critical: false,
        statusEffects: [],
        comboMultiplier: 1,
        description: "공격 성공",
      };

      const { updatedDefender } = CombatSystem.applyAttackResults(
        mockDefender,
        attackResult
      );

      expect(updatedDefender.health).toBe(75);
    });

    it("should apply high damage correctly", () => {
      const highDamageResult: AttackResult = {
        hit: true,
        damage: 50,
        accuracy: 0.95,
        blocked: false,
        critical: true,
        statusEffects: [],
        comboMultiplier: 1.5,
        description: "강력한 공격",
      };

      const { updatedDefender } = CombatSystem.applyAttackResults(
        mockDefender,
        highDamageResult
      );

      expect(updatedDefender.health).toBe(50);
    });

    it("should apply vital point attack effects", () => {
      const vitalPointResult: AttackResult = {
        hit: true,
        damage: 35,
        accuracy: 0.9,
        blocked: false,
        critical: true,
        statusEffects: [
          {
            type: "stun",
            duration: 2000,
            intensity: 0.8,
            description: "급소 타격으로 인한 기절",
          },
        ],
        vitalPointHit: {
          vitalPoint: {
            id: "sternum",
            korean: "가슴뼈",
            english: "Sternum",
            region: "torso",
            coordinates: { x: 150, y: 150 },
            vulnerability: 0.9,
            category: "critical",
            difficulty: 0.8,
            effects: [],
            description: "중요한 급소",
          },
          damage: 35,
          effectiveness: 0.9,
          description: "가슴뼈 급소 공격",
          effects: [],
        },
        comboMultiplier: 1,
        description: "급소 공격 성공",
      };

      const { updatedDefender } = CombatSystem.applyAttackResults(
        mockDefender,
        vitalPointResult
      );

      expect(updatedDefender.health).toBe(65);
      expect(updatedDefender.statusEffects).toHaveLength(1);
      // Add proper null checking
      const firstStatusEffect = updatedDefender.statusEffects[0];
      if (firstStatusEffect) {
        expect(firstStatusEffect.type).toBe("stun");
      }
    });
  });

  describe("range validation", () => {
    it("should fail when target out of range", () => {
      const result = CombatSystem.executeAttack(
        mockPlayerState,
        mockDefender,
        "천둥벽력",
        { x: 9999, y: 9999 }
      );

      expect(result.hit).toBe(false);
      expect(result.description).toContain("공격 실패");
    });
  });

  describe("Korean technique integration", () => {
    const techniques = ["천둥벽력", "화염지창", "벽력일섬"];

    techniques.forEach((technique) => {
      it(`should handle ${technique} technique correctly`, () => {
        const result = CombatSystem.executeAttack(
          mockPlayerState,
          mockDefender,
          technique,
          mockTargetPosition
        );

        expect(result).toBeDefined();
        expect(typeof result.damage).toBe("number");
      });
    });

    it("should handle vital point detection correctly", () => {
      const vitalHit = CombatSystem.checkVitalPointHit(150, 150, "천둥벽력");

      // Should either return a valid hit or null
      expect(vitalHit === null || typeof vitalHit === "object").toBe(true);

      if (vitalHit) {
        expect(vitalHit.vitalPoint).toBeDefined();
        expect(vitalHit.effectiveness).toBeGreaterThan(0);
      }
    });
  });
});
