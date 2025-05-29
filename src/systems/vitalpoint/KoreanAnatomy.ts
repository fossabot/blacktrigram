import type { StatusEffect } from "../../types/GameTypes";
import { ANATOMICAL_REGIONS, type VitalPoint } from "./AnatomicalRegions";

/**
 * Korean Martial Arts Anatomy System
 * Traditional Korean medical knowledge applied to vital point targeting
 * Based on TCM meridian theory and Korean martial arts philosophy
 */

// Define missing interfaces for Korean anatomy system
interface EnergyMeridian {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly element: string;
  readonly startPoint: { x: number; y: number };
  readonly endPoint: { x: number; y: number };
  readonly vitalPoints: readonly string[];
  readonly energy: "yin" | "yang";
  readonly description: string;
  readonly traditionalName: string;
}

interface ElementalRelations {
  readonly element: string;
  readonly generative: string; // Element that generates this one
  readonly destructive: string; // Element that destroys this one
  readonly supports: readonly string[]; // Elements this one supports
  readonly weakens: readonly string[]; // Elements this one weakens
  readonly emotion: string;
  readonly organ: string;
  readonly season: string;
  readonly direction: string;
}

interface KoreanAnatomicalZone {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly boundaries: {
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
  };
  readonly vulnerability: number;
  readonly meridians: readonly string[];
  readonly vitalPoints: readonly string[];
  readonly traditionalImportance: number;
  readonly description: string;
}

class KoreanAnatomySystem {
  // Korean meridian system based on traditional medicine
  public static readonly KOREAN_MERIDIANS: Record<string, EnergyMeridian> = {
    lung: {
      id: "lung",
      korean: "폐경",
      english: "Lung Meridian",
      element: "metal",
      startPoint: { x: 30, y: 170 },
      endPoint: { x: 15, y: 250 },
      vitalPoints: ["yunmen", "zhongfu", "shaoshang"],
      energy: "yin",
      description: "Controls breathing and energy circulation",
      traditionalName: "수태음폐경 (Hand Taiyin Lung Meridian)",
    },

    large_intestine: {
      id: "large_intestine",
      korean: "대장경",
      english: "Large Intestine Meridian",
      element: "metal",
      startPoint: { x: 15, y: 250 },
      endPoint: { x: 75, y: 30 },
      vitalPoints: ["hegu", "quchi", "yingxiang"],
      energy: "yang",
      description: "Governs elimination and defense",
      traditionalName: "수양명대장경 (Hand Yangming Large Intestine Meridian)",
    },

    stomach: {
      id: "stomach",
      korean: "위경",
      english: "Stomach Meridian",
      element: "earth",
      startPoint: { x: 65, y: 50 },
      endPoint: { x: 35, y: 600 },
      vitalPoints: ["sibai", "daying", "zusanli"],
      energy: "yang",
      description: "Controls digestion and nourishment",
      traditionalName: "족양명위경 (Foot Yangming Stomach Meridian)",
    },

    spleen: {
      id: "spleen",
      korean: "비경",
      english: "Spleen Meridian",
      element: "earth",
      startPoint: { x: 35, y: 600 },
      endPoint: { x: 40, y: 170 },
      vitalPoints: ["yinbai", "taibai", "sanyinjiao"],
      energy: "yin",
      description: "Governs transformation and transportation",
      traditionalName: "족태음비경 (Foot Taiyin Spleen Meridian)",
    },

    heart: {
      id: "heart",
      korean: "심경",
      english: "Heart Meridian",
      element: "fire",
      startPoint: { x: 35, y: 160 },
      endPoint: { x: 12, y: 250 },
      vitalPoints: ["jiquan", "shenmen", "shaochong"],
      energy: "yin",
      description: "Controls circulation and consciousness",
      traditionalName: "수소음심경 (Hand Shaoyin Heart Meridian)",
    },

    small_intestine: {
      id: "small_intestine",
      korean: "소장경",
      english: "Small Intestine Meridian",
      element: "fire",
      startPoint: { x: 18, y: 250 },
      endPoint: { x: 40, y: 30 },
      vitalPoints: ["shaoze", "yanggu", "tinggong"],
      energy: "yang",
      description: "Separates pure from impure",
      traditionalName: "수태양소장경 (Hand Taiyang Small Intestine Meridian)",
    },

    bladder: {
      id: "bladder",
      korean: "방광경",
      english: "Bladder Meridian",
      element: "water",
      startPoint: { x: 50, y: 20 },
      endPoint: { x: 45, y: 650 },
      vitalPoints: ["jingming", "fengchi", "weizhong"],
      energy: "yang",
      description: "Longest meridian, governs elimination",
      traditionalName: "족태양방광경 (Foot Taiyang Bladder Meridian)",
    },

    kidney: {
      id: "kidney",
      korean: "신경",
      english: "Kidney Meridian",
      element: "water",
      startPoint: { x: 45, y: 600 },
      endPoint: { x: 45, y: 170 },
      vitalPoints: ["yongquan", "taixi", "shufu"],
      energy: "yin",
      description: "Stores essence and governs bones",
      traditionalName: "족소음신경 (Foot Shaoyin Kidney Meridian)",
    },
  };

  // Five elements system with Korean interpretation
  public static readonly ELEMENTAL_SYSTEM: Record<string, ElementalRelations> =
    {
      wood: {
        element: "wood",
        generative: "water",
        destructive: "metal",
        supports: ["fire"],
        weakens: ["earth"],
        emotion: "anger",
        organ: "liver",
        season: "spring",
        direction: "east",
      },
      fire: {
        element: "fire",
        generative: "wood",
        destructive: "water",
        supports: ["earth"],
        weakens: ["metal"],
        emotion: "joy",
        organ: "heart",
        season: "summer",
        direction: "south",
      },
      earth: {
        element: "earth",
        generative: "fire",
        destructive: "wood",
        supports: ["metal"],
        weakens: ["water"],
        emotion: "worry",
        organ: "spleen",
        season: "late_summer",
        direction: "center",
      },
      metal: {
        element: "metal",
        generative: "earth",
        destructive: "fire",
        supports: ["water"],
        weakens: ["wood"],
        emotion: "grief",
        organ: "lung",
        season: "autumn",
        direction: "west",
      },
      water: {
        element: "water",
        generative: "metal",
        destructive: "earth",
        supports: ["wood"],
        weakens: ["fire"],
        emotion: "fear",
        organ: "kidney",
        season: "winter",
        direction: "north",
      },
    };

  // Korean anatomical zones for precise targeting
  public static readonly ANATOMICAL_ZONES: Record<
    string,
    KoreanAnatomicalZone
  > = {
    upper_torso: {
      id: "upper_torso",
      korean: "상체",
      english: "Upper Torso",
      boundaries: { top: 120, bottom: 300, left: 10, right: 90 },
      vulnerability: 1.6,
      meridians: ["lung", "heart", "large_intestine"],
      vitalPoints: ["tanzhong", "yunmen", "jiquan"],
      traditionalImportance: 0.9,
      description: "Critical region housing heart and lung vital points",
    },

    lower_torso: {
      id: "lower_torso",
      korean: "하체",
      english: "Lower Torso",
      boundaries: { top: 300, bottom: 450, left: 15, right: 85 },
      vulnerability: 1.4,
      meridians: ["stomach", "spleen", "kidney"],
      vitalPoints: ["qihai", "guanyuan", "zhongwan"],
      traditionalImportance: 0.8,
      description: "Energy center containing dan tian and digestive organs",
    },

    head_neck: {
      id: "head_neck",
      korean: "두경부",
      english: "Head and Neck",
      boundaries: { top: 0, bottom: 150, left: 20, right: 80 },
      vulnerability: 2.0,
      meridians: ["bladder", "gallbladder", "governing_vessel"],
      vitalPoints: ["baihui", "yintang", "fengchi"],
      traditionalImportance: 1.0,
      description: "Most vulnerable region with consciousness-affecting points",
    },

    arms: {
      id: "arms",
      korean: "상지",
      english: "Upper Limbs",
      boundaries: { top: 120, bottom: 400, left: -30, right: 130 },
      vulnerability: 1.0,
      meridians: ["lung", "large_intestine", "heart", "small_intestine"],
      vitalPoints: ["hegu", "quchi", "shenmen"],
      traditionalImportance: 0.6,
      description: "Extremity points for joint locks and nerve strikes",
    },

    legs: {
      id: "legs",
      korean: "하지",
      english: "Lower Limbs",
      boundaries: { top: 400, bottom: 700, left: 10, right: 90 },
      vulnerability: 0.8,
      meridians: ["stomach", "spleen", "bladder", "kidney"],
      vitalPoints: ["zusanli", "sanyinjiao", "yongquan"],
      traditionalImportance: 0.7,
      description: "Foundation points affecting stability and mobility",
    },
  };

  /**
   * Get meridian information by ID
   */
  public static getMeridian(meridianId: string): EnergyMeridian | null {
    return this.KOREAN_MERIDIANS[meridianId] || null;
  }

  /**
   * Get all meridians associated with a specific element
   */
  public static getMeridiansByElement(
    element: string
  ): readonly EnergyMeridian[] {
    return Object.values(this.KOREAN_MERIDIANS).filter(
      (meridian) => meridian.element === element
    );
  }

  /**
   * Calculate meridian flow effectiveness based on time of day
   * Traditional Korean medicine considers meridian peak hours
   */
  public static calculateMeridianFlow(
    meridianId: string,
    hour: number
  ): number {
    const meridianPeakHours: Record<string, number> = {
      lung: 4, // 3-5 AM
      large_intestine: 6, // 5-7 AM
      stomach: 8, // 7-9 AM
      spleen: 10, // 9-11 AM
      heart: 12, // 11 AM-1 PM
      small_intestine: 14, // 1-3 PM
      bladder: 16, // 3-5 PM
      kidney: 18, // 5-7 PM
    };

    const peakHour = meridianPeakHours[meridianId] || 12;
    const hourDifference = Math.abs(hour - peakHour);
    const effectivenessReduction = Math.min(hourDifference / 12, 0.3);

    return Math.max(0.7, 1.0 - effectivenessReduction);
  }

  /**
   * Find optimal vital points based on elemental relationships
   */
  public static findOptimalVitalPoints(
    attackerElement: string
  ): readonly VitalPoint[] {
    const elementalRelation = this.ELEMENTAL_SYSTEM[attackerElement];
    if (!elementalRelation) return [];

    const optimalPoints: VitalPoint[] = [];

    // Find points that exploit elemental weaknesses
    Object.values(ANATOMICAL_REGIONS).forEach(() => {
      // Implementation for finding optimal points
    });

    return optimalPoints;
  }

  /**
   * Calculate anatomical vulnerability based on position and meridian flow
   */
  public static calculateAnatomicalVulnerability(
    position: { x: number; y: number },
    meridianStates: Record<string, number>
  ): number {
    let totalVulnerability = 1.0;

    // Check which anatomical zone the position falls into
    for (const zone of Object.values(this.ANATOMICAL_ZONES)) {
      if (this.isPositionInZone(position, zone)) {
        totalVulnerability *= zone.vulnerability;

        // Factor in meridian flow states
        zone.meridians.forEach((meridianId) => {
          const meridianState = meridianStates[meridianId] || 1.0;
          totalVulnerability *= meridianState;
        });

        break;
      }
    }

    return Math.max(0.5, Math.min(3.0, totalVulnerability));
  }

  /**
   * Check if position is within anatomical zone
   */
  private static isPositionInZone(
    position: { x: number; y: number },
    zone: KoreanAnatomicalZone
  ): boolean {
    const { boundaries } = zone;
    return (
      position.x >= boundaries.left &&
      position.x <= boundaries.right &&
      position.y >= boundaries.top &&
      position.y <= boundaries.bottom
    );
  }

  /**
   * Generate status effects based on meridian disruption
   */
  public static generateMeridianEffects(
    meridianId: string,
    disruptionLevel: number
  ): readonly StatusEffect[] {
    const meridian = this.KOREAN_MERIDIANS[meridianId];
    if (!meridian) return [];

    const effects: StatusEffect[] = [];
    const intensity = Math.min(1.0, disruptionLevel);
    const baseDuration = 3000;

    // Element-specific effects
    switch (meridian.element) {
      case "metal":
        if (disruptionLevel > 0.5) {
          effects.push({
            type: "stamina_drain",
            duration: baseDuration * intensity,
            intensity: intensity * 0.6,
            source: "meridian_disruption",
          });
        }
        break;

      case "water":
        if (disruptionLevel > 0.4) {
          effects.push({
            type: "vital_weakness",
            duration: baseDuration * intensity,
            intensity: intensity * 0.7,
            source: "meridian_disruption",
          });
        }
        break;

      case "fire":
        if (disruptionLevel > 0.6) {
          effects.push({
            type: "vital_stunning",
            duration: baseDuration * intensity * 0.5,
            intensity: intensity * 0.8,
            source: "meridian_disruption",
          });
        }
        break;

      case "earth":
        if (disruptionLevel > 0.3) {
          effects.push({
            type: "damage_vulnerability",
            duration: baseDuration * intensity,
            intensity: intensity * 0.5,
            source: "meridian_disruption",
          });
        }
        break;

      case "wood":
        if (disruptionLevel > 0.4) {
          effects.push({
            type: "vital_paralysis",
            duration: baseDuration * intensity * 0.7,
            intensity: intensity * 0.6,
            source: "meridian_disruption",
          });
        }
        break;
    }

    return effects;
  }

  /**
   * Get all anatomical zones
   */
  public static getAnatomicalZones(): Record<string, KoreanAnatomicalZone> {
    return { ...this.ANATOMICAL_ZONES };
  }

  /**
   * Get zone by position
   */
  public static getZoneByPosition(position: {
    x: number;
    y: number;
  }): KoreanAnatomicalZone | null {
    for (const zone of Object.values(this.ANATOMICAL_ZONES)) {
      if (this.isPositionInZone(position, zone)) {
        return zone;
      }
    }
    return null;
  }
}

// Export the class as KoreanAnatomy to match existing imports
export const KoreanAnatomy = KoreanAnatomySystem;
export type { EnergyMeridian, ElementalRelations, KoreanAnatomicalZone };
