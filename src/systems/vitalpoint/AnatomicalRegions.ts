import type { StatusEffect } from "../../types/GameTypes";

/**
 * Korean Martial Arts Anatomical Regions System
 * Based on traditional Korean martial arts vital point knowledge (급소술 - Geupso-sul)
 * Implements authentic pressure point locations and effects
 */

// Define missing types locally until they're added to GameTypes
interface VitalPoint {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly anatomicalRegion: string;
  readonly position: { x: number; y: number };
  readonly category: VitalPointCategory;
  readonly difficulty: number;
  readonly damage: number;
  readonly effects: readonly StatusEffect[];
  readonly description: string;
  readonly traditionalName: string;
  readonly koreanTechnique: string;
}

interface AnatomicalRegion {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly bounds: { x: number; y: number; width: number; height: number };
  readonly vulnerability: number;
  readonly description: string;
  readonly traditionalName: string;
}

type VitalPointCategory =
  | "consciousness"
  | "circulation"
  | "breathing"
  | "nerve"
  | "energy"
  | "balance"
  | "joint";

// Korean anatomical region definitions with traditional terminology
export const ANATOMICAL_REGIONS: Record<string, AnatomicalRegion> = {
  head: {
    id: "head",
    korean: "머리",
    english: "Head",
    bounds: { x: 0, y: 0, width: 100, height: 120 },
    vulnerability: 1.8,
    description: "Critical region containing vital consciousness points",
    traditionalName: "두부 급소 (Head Vital Points)",
  },

  neck: {
    id: "neck",
    korean: "목",
    english: "Neck",
    bounds: { x: 20, y: 120, width: 60, height: 40 },
    vulnerability: 2.0,
    description: "Most vulnerable region with major arteries and nerves",
    traditionalName: "경부 급소 (Neck Vital Points)",
  },

  chest: {
    id: "chest",
    korean: "가슴",
    english: "Chest",
    bounds: { x: 0, y: 160, width: 100, height: 140 },
    vulnerability: 1.4,
    description: "Heart and lung pressure points",
    traditionalName: "흉부 급소 (Chest Vital Points)",
  },

  abdomen: {
    id: "abdomen",
    korean: "복부",
    english: "Abdomen",
    bounds: { x: 10, y: 300, width: 80, height: 120 },
    vulnerability: 1.6,
    description: "Digestive and energy center points",
    traditionalName: "복부 급소 (Abdominal Vital Points)",
  },

  arms: {
    id: "arms",
    korean: "팔",
    english: "Arms",
    bounds: { x: -40, y: 160, width: 180, height: 200 },
    vulnerability: 1.0,
    description: "Nerve clusters and joint manipulation points",
    traditionalName: "상지 급소 (Upper Limb Vital Points)",
  },

  legs: {
    id: "legs",
    korean: "다리",
    english: "Legs",
    bounds: { x: 0, y: 420, width: 100, height: 280 },
    vulnerability: 0.8,
    description: "Foundation and mobility pressure points",
    traditionalName: "하지 급소 (Lower Limb Vital Points)",
  },
};

// Traditional Korean vital points with authentic names and effects
export const KOREAN_VITAL_POINTS: Record<string, VitalPoint> = {
  // Head region vital points (두부 급소)
  baihui: {
    id: "baihui",
    korean: "백회",
    english: "Crown Point",
    anatomicalRegion: "head",
    position: { x: 50, y: 20 },
    category: "consciousness",
    difficulty: 0.9,
    damage: 45,
    effects: [
      {
        type: "vital_stunning",
        duration: 3000,
        intensity: 0.8,
        source: "vital_point",
      },
      {
        type: "ki_boost",
        duration: 2000,
        intensity: 0.6,
        source: "vital_point",
      },
    ],
    description: "Top of head - disrupts consciousness and energy flow",
    traditionalName: "백회혈 (Baihui Point)",
    koreanTechnique: "정수리 급소",
  },

  taiyang: {
    id: "taiyang",
    korean: "태양",
    english: "Temple",
    anatomicalRegion: "head",
    position: { x: 85, y: 40 },
    category: "nerve",
    difficulty: 0.7,
    damage: 40,
    effects: [
      {
        type: "vital_stunning",
        duration: 2500,
        intensity: 0.7,
        source: "vital_point",
      },
      {
        type: "vital_paralysis",
        duration: 1500,
        intensity: 0.5,
        source: "vital_point",
      },
    ],
    description: "Temporal region - causes disorientation",
    traditionalName: "태양혈 (Taiyang Point)",
    koreanTechnique: "관자놀이 급소",
  },

  yintang: {
    id: "yintang",
    korean: "인당",
    english: "Third Eye",
    anatomicalRegion: "head",
    position: { x: 50, y: 60 },
    category: "consciousness",
    difficulty: 0.8,
    damage: 35,
    effects: [
      {
        type: "vital_stunning",
        duration: 2000,
        intensity: 0.6,
        source: "vital_point",
      },
    ],
    description: "Between eyebrows - disrupts mental focus",
    traditionalName: "인당혈 (Yintang Point)",
    koreanTechnique: "미간 급소",
  },

  // Neck region vital points (경부 급소)
  renying: {
    id: "renying",
    korean: "인영",
    english: "Carotid",
    anatomicalRegion: "neck",
    position: { x: 35, y: 135 },
    category: "circulation",
    difficulty: 0.6,
    damage: 50,
    effects: [
      {
        type: "vital_weakness",
        duration: 4000,
        intensity: 0.8,
        source: "vital_point",
      },
      {
        type: "vital_stunning",
        duration: 2000,
        intensity: 0.6,
        source: "vital_point",
      },
    ],
    description: "Carotid artery - restricts blood flow to brain",
    traditionalName: "인영혈 (Renying Point)",
    koreanTechnique: "목동맥 급소",
  },

  tiantu: {
    id: "tiantu",
    korean: "천돌",
    english: "Throat Hollow",
    anatomicalRegion: "neck",
    position: { x: 50, y: 150 },
    category: "breathing",
    difficulty: 0.7,
    damage: 48,
    effects: [
      {
        type: "vital_paralysis",
        duration: 3000,
        intensity: 0.7,
        source: "vital_point",
      },
      {
        type: "stamina_drain",
        duration: 5000,
        intensity: 0.6,
        source: "vital_point",
      },
    ],
    description: "Throat depression - disrupts breathing",
    traditionalName: "천돌혈 (Tiantu Point)",
    koreanTechnique: "목구멍 급소",
  },

  // Chest region vital points (흉부 급소)
  tanzhong: {
    id: "tanzhong",
    korean: "단중",
    english: "Chest Center",
    anatomicalRegion: "chest",
    position: { x: 50, y: 220 },
    category: "breathing",
    difficulty: 0.5,
    damage: 35,
    effects: [
      {
        type: "stamina_drain",
        duration: 4000,
        intensity: 0.5,
        source: "vital_point",
      },
    ],
    description: "Center of chest - affects breathing and heart rhythm",
    traditionalName: "단중혈 (Tanzhong Point)",
    koreanTechnique: "가슴 중앙 급소",
  },

  rugen: {
    id: "rugen",
    korean: "유근",
    english: "Nipple",
    anatomicalRegion: "chest",
    position: { x: 30, y: 200 },
    category: "nerve",
    difficulty: 0.6,
    damage: 30,
    effects: [
      {
        type: "vital_weakness",
        duration: 3000,
        intensity: 0.4,
        source: "vital_point",
      },
    ],
    description: "Nipple area - nerve cluster concentration",
    traditionalName: "유근혈 (Rugen Point)",
    koreanTechnique: "젖꼭지 급소",
  },

  // Abdominal region vital points (복부 급소)
  qihai: {
    id: "qihai",
    korean: "기해",
    english: "Sea of Ki",
    anatomicalRegion: "abdomen",
    position: { x: 50, y: 340 },
    category: "energy",
    difficulty: 0.4,
    damage: 42,
    effects: [
      {
        type: "ki_boost",
        duration: 3000,
        intensity: -0.6, // Negative ki boost = ki drain
        source: "vital_point",
      },
      {
        type: "vital_weakness",
        duration: 4000,
        intensity: 0.5,
        source: "vital_point",
      },
    ],
    description: "Energy center - disrupts internal power",
    traditionalName: "기해혈 (Qihai Point)",
    koreanTechnique: "기의 바다 급소",
  },

  zhongwan: {
    id: "zhongwan",
    korean: "중완",
    english: "Solar Plexus",
    anatomicalRegion: "abdomen",
    position: { x: 50, y: 280 },
    category: "breathing",
    difficulty: 0.3,
    damage: 38,
    effects: [
      {
        type: "stamina_drain",
        duration: 4000,
        intensity: 0.6,
        source: "vital_point",
      },
      {
        type: "vital_weakness",
        duration: 3000,
        intensity: 0.5,
        source: "vital_point",
      },
    ],
    description: "Solar plexus - winds opponent",
    traditionalName: "중완혈 (Zhongwan Point)",
    koreanTechnique: "명치 급소",
  },

  // Arm vital points (상지 급소)
  jianjing: {
    id: "jianjing",
    korean: "견정",
    english: "Shoulder Well",
    anatomicalRegion: "arms",
    position: { x: 20, y: 180 },
    category: "nerve",
    difficulty: 0.5,
    damage: 25,
    effects: [
      {
        type: "vital_paralysis",
        duration: 2000,
        intensity: 0.4,
        source: "vital_point",
      },
    ],
    description: "Shoulder nerve cluster - causes arm numbness",
    traditionalName: "견정혈 (Jianjing Point)",
    koreanTechnique: "어깨 급소",
  },

  quchi: {
    id: "quchi",
    korean: "곡지",
    english: "Elbow Pool",
    anatomicalRegion: "arms",
    position: { x: 0, y: 280 },
    category: "joint",
    difficulty: 0.4,
    damage: 22,
    effects: [
      {
        type: "vital_weakness",
        duration: 2500,
        intensity: 0.3,
        source: "vital_point",
      },
    ],
    description: "Elbow joint - affects arm mobility",
    traditionalName: "곡지혈 (Quchi Point)",
    koreanTechnique: "팔꿈치 급소",
  },

  // Leg vital points (하지 급소)
  zusanli: {
    id: "zusanli",
    korean: "족삼리",
    english: "Leg Three Miles",
    anatomicalRegion: "legs",
    position: { x: 40, y: 520 },
    category: "energy",
    difficulty: 0.3,
    damage: 20,
    effects: [
      {
        type: "stamina_drain",
        duration: 3000,
        intensity: 0.4,
        source: "vital_point",
      },
    ],
    description: "Lower leg energy point - affects stamina",
    traditionalName: "족삼리혈 (Zusanli Point)",
    koreanTechnique: "정강이 급소",
  },

  yongquan: {
    id: "yongquan",
    korean: "용천",
    english: "Bubbling Spring",
    anatomicalRegion: "legs",
    position: { x: 50, y: 680 },
    category: "balance",
    difficulty: 0.6,
    damage: 18,
    effects: [
      {
        type: "vital_weakness",
        duration: 2000,
        intensity: 0.3,
        source: "vital_point",
      },
    ],
    description: "Sole of foot - affects balance and grounding",
    traditionalName: "용천혈 (Yongquan Point)",
    koreanTechnique: "발바닥 급소",
  },
};

/**
 * Get all vital points within a specific anatomical region
 */
export function getVitalPointsInRegion(
  regionId: string
): readonly VitalPoint[] {
  return Object.values(KOREAN_VITAL_POINTS).filter(
    (point) => point.anatomicalRegion === regionId
  );
}

/**
 * Get vital points by category (consciousness, nerve, circulation, etc.)
 */
export function getVitalPointsByCategory(
  category: VitalPointCategory
): readonly VitalPoint[] {
  return Object.values(KOREAN_VITAL_POINTS).filter(
    (point) => point.category === category
  );
}

/**
 * Calculate vulnerability multiplier for a region
 */
export function getRegionVulnerability(regionId: string): number {
  const region = ANATOMICAL_REGIONS[regionId];
  return region?.vulnerability ?? 1.0;
}

/**
 * Get traditional Korean name for anatomical region
 */
export function getTraditionalRegionName(regionId: string): string {
  const region = ANATOMICAL_REGIONS[regionId];
  return region?.traditionalName ?? regionId;
}

/**
 * Check if a position is within an anatomical region's bounds
 */
export function isPositionInRegion(
  position: { readonly x: number; readonly y: number },
  regionId: string
): boolean {
  const region = ANATOMICAL_REGIONS[regionId];
  if (!region) return false;

  const { bounds } = region;
  return (
    position.x >= bounds.x &&
    position.x <= bounds.x + bounds.width &&
    position.y >= bounds.y &&
    position.y <= bounds.y + bounds.height
  );
}

/**
 * Get the closest vital point to a given position
 */
export function getClosestVitalPoint(
  position: { readonly x: number; readonly y: number },
  maxDistance: number = 50
): VitalPoint | null {
  let closestPoint: VitalPoint | null = null;
  let closestDistance = maxDistance;

  Object.values(KOREAN_VITAL_POINTS).forEach((point) => {
    const distance = Math.sqrt(
      Math.pow(position.x - point.position.x, 2) +
        Math.pow(position.y - point.position.y, 2)
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestPoint = point;
    }
  });

  return closestPoint;
}

/**
 * Calculate damage modifier based on vital point difficulty and accuracy
 */
export function calculateVitalPointDamage(
  vitalPoint: VitalPoint,
  baseDamage: number,
  accuracy: number
): number {
  const difficultyModifier = 1 + vitalPoint.difficulty * 0.5;
  const accuracyModifier = Math.min(accuracy, 1.0);

  return Math.round(
    (baseDamage + vitalPoint.damage) * difficultyModifier * accuracyModifier
  );
}

// Export types for use in other files
export type { VitalPoint, AnatomicalRegion, VitalPointCategory };
