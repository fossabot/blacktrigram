import type {
  VitalPoint as GameVitalPoint,
  Vector2D,
  VitalPointCategory,
} from "../../types/GameTypes";
import {
  ANATOMICAL_REGIONS,
  VitalPoint,
  type AnatomicalRegion,
} from "./AnatomicalRegions";

// Korean vital point categories with traditional names
export const VITAL_POINT_CATEGORIES: Record<
  VitalPointCategory,
  {
    korean: string;
    english: string;
    description: string;
    traditionalName: string;
  }
> = {
  major: {
    korean: "주요 혈점",
    english: "Major Vital Points",
    description: "Primary targets with significant combat impact",
    traditionalName: "주혈",
  },
  minor: {
    korean: "보조 혈점",
    english: "Minor Vital Points",
    description: "Secondary targets for tactical advantage",
    traditionalName: "부혈",
  },
  critical: {
    korean: "치명 혈점",
    english: "Critical Vital Points",
    description: "Dangerous pressure points requiring expert knowledge",
    traditionalName: "사혈",
  },
  consciousness: {
    korean: "의식 혈점",
    english: "Consciousness Points",
    description: "Points affecting awareness and mental state",
    traditionalName: "신혈",
  },
  circulation: {
    korean: "순환 혈점",
    english: "Circulation Points",
    description: "Points affecting blood flow and energy circulation",
    traditionalName: "순환혈",
  },
  respiratory: {
    korean: "호흡 혈점",
    english: "Respiratory Points",
    description: "Points affecting breathing and lung function",
    traditionalName: "호흡혈",
  },
  structural: {
    korean: "구조 혈점",
    english: "Structural Points",
    description: "Points affecting joints, muscles and skeletal structure",
    traditionalName: "구조혈",
  },
  energy: {
    korean: "기력 혈점",
    english: "Energy Points",
    description: "Points affecting ki flow and internal energy",
    traditionalName: "기혈",
  },
};

// Use the vital points from AnatomicalRegions
export const KOREAN_VITAL_POINTS = ANATOMICAL_REGIONS;

// Mastery level type definition
export type MasteryLevel = "beginner" | "intermediate" | "advanced" | "expert";

// Mastery level definitions
export const VITAL_POINT_MASTERY: Record<
  MasteryLevel,
  {
    readonly maxPoints: number;
    readonly difficulty: number;
    readonly description: string;
  }
> = {
  beginner: {
    maxPoints: 12,
    difficulty: 0.3,
    description: "Basic vital points for foundational training",
  },
  intermediate: {
    maxPoints: 24,
    difficulty: 0.5,
    description: "Advanced points requiring precision and timing",
  },
  advanced: {
    maxPoints: 45,
    difficulty: 0.7,
    description: "Master-level points with complex applications",
  },
  expert: {
    maxPoints: 70,
    difficulty: 0.9,
    description: "Complete mastery of all traditional vital points",
  },
};

// Fix VitalPointCategory mapping
function mapAnatomicalRegionToCategory(
  region: AnatomicalRegion
): VitalPointCategory {
  // Map critical regions to 'critical' category
  if (region.difficulty >= 0.8) {
    return "critical";
  }

  // Map less critical regions to 'minor' category
  return "minor";
}

function mapToValidRegion(region: string): string {
  const regionMap: Record<string, string> = {
    upper_torso: "torso", // Map upper_torso to valid region
    consciousness: "head", // Map consciousness to head
  };
  return regionMap[region] || region;
}

/**
 * Get vital point by ID, ensuring proper type conversion
 */
export function getVitalPointById(id: string): GameVitalPoint | null {
  const point = KOREAN_VITAL_POINTS[id];
  if (!point) return null;

  // Extract region from the point ID or description
  const region = point.id.includes("head")
    ? "head"
    : point.id.includes("neck")
    ? "neck"
    : point.id.includes("torso")
    ? "upper_torso"
    : point.id.includes("arm")
    ? "arms"
    : "legs";

  // Convert from AnatomicalRegions VitalPoint to GameTypes VitalPoint
  return {
    id: point.id,
    korean: point.korean,
    english: point.english,
    anatomicalRegion: region,
    position: { x: 50, y: 50 }, // Default position
    category: mapAnatomicalRegionToCategory(region),
    difficulty: 0.5, // Default difficulty
    effects: [], // Default effects
    radius: 15, // Default radius for game mechanics
    region: region,
    x: 50, // Default x coordinate
    y: 50, // Default y coordinate
    damageMultiplier: point.vulnerability, // Use vulnerability as damage multiplier
    bounds: point.bounds,
    vulnerability: point.vulnerability,
    description: point.description,
    traditionalName: point.traditionalName,
  };
}

/**
 * Create a new vital point instance
 */
export function createVitalPoint(
  id: string,
  korean: string,
  english: string,
  region: string,
  coordinates: Vector2D,
  difficulty: number = 0.5,
  vulnerability: number = 1.2
): VitalPoint {
  const validRegion = mapToValidRegion(region);

  return {
    id,
    korean,
    english,
    region: validRegion,
    category: mapAnatomicalRegionToCategory(region),
    coordinates,
    difficulty,
    vulnerability,
    effects: [],
    description: `${korean} (${english}) - Traditional Korean vital point`,
  };
}

/**
 * Get vital points by mastery level
 */
export function getVitalPointsByMastery(
  masteryLevel: MasteryLevel
): readonly GameVitalPoint[] {
  const level = VITAL_POINT_MASTERY[masteryLevel];
  if (!level) return [];

  const allPoints = Object.values(KOREAN_VITAL_POINTS)
    .map((point) => getVitalPointById(point.id))
    .filter((point): point is GameVitalPoint => point !== null);

  return allPoints.slice(0, level.maxPoints);
}

/**
 * Get vital points by category with proper typing
 */
export function getVitalPointsByCategory(
  category: VitalPointCategory
): VitalPoint[] {
  return Object.values(KOREAN_VITAL_POINTS).filter(
    (point): point is VitalPoint => {
      // Use string comparison since we only have 'critical' and 'minor'
      return point.category === category;
    }
  );
}

/**
 * Get vital points by difficulty range
 */
export function getVitalPointsByDifficulty(
  minDifficulty: number,
  maxDifficulty: number = 1.0
): VitalPoint[] {
  return Object.values(KOREAN_VITAL_POINTS).filter(
    (point): point is VitalPoint => {
      const difficulty = point.difficulty || 0;
      return difficulty >= minDifficulty && difficulty <= maxDifficulty;
    }
  );
}

/**
 * Get all available vital points for current mastery level
 */
export function getAvailableVitalPoints(
  masteryLevel: MasteryLevel
): readonly GameVitalPoint[] {
  return getVitalPointsByMastery(masteryLevel);
}

/**
 * Get difficulty rating for a specific vital point
 */
export function getVitalPointDifficulty(id: string): number {
  const point = getVitalPointById(id);
  return point?.difficulty || 0.5;
}

/**
 * Check if vital point is available at current mastery level
 */
export function isVitalPointAvailable(
  pointId: string,
  masteryLevel: MasteryLevel
): boolean {
  const availablePoints = getVitalPointsByMastery(masteryLevel);
  return availablePoints.some((point) => point.id === pointId);
}

/**
 * Get Korean name for vital point category
 */
export function getCategoryKoreanName(category: VitalPointCategory): string {
  return VITAL_POINT_CATEGORIES[category]?.korean || category;
}

/**
 * Get traditional name for vital point category
 */
export function getCategoryTraditionalName(
  category: VitalPointCategory
): string {
  return VITAL_POINT_CATEGORIES[category]?.traditionalName || category;
}

/**
 * Calculate vital point effectiveness based on precision and skill
 */
export function calculateVitalPointEffectiveness(
  pointId: string,
  precision: number,
  skill: number
): number {
  const point = getVitalPointById(pointId);
  if (!point) return 0;

  const difficultyPenalty = point.difficulty;
  const precisionBonus = precision * 0.5;
  const skillBonus = skill * 0.3;

  const effectiveness = Math.max(
    0,
    1 - difficultyPenalty + precisionBonus + skillBonus
  );
  return Math.min(1, effectiveness);
}

/**
 * Get recommended vital points for specific combat scenarios
 */
export function getRecommendedVitalPoints(
  scenario: "close_combat" | "medium_range" | "defensive",
  masteryLevel: MasteryLevel
): readonly GameVitalPoint[] {
  const availablePoints = getVitalPointsByMastery(masteryLevel);

  switch (scenario) {
    case "close_combat":
      return availablePoints
        .filter(
          (point) => point.category === "major" || point.category === "critical"
        )
        .slice(0, 5);

    case "medium_range":
      return availablePoints
        .filter(
          (point) => point.category === "minor" || point.category === "major"
        )
        .slice(0, 5);

    case "defensive":
      return availablePoints
        .filter((point) => point.category === "minor")
        .slice(0, 3);

    default:
      return availablePoints.slice(0, 8);
  }
}
