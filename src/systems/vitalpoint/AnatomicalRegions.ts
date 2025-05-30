import type {
  StatusEffect,
  VitalPoint,
  AnatomicalRegion,
  VitalPointCategory,
  Position, // Assuming Position is defined in types/index.ts
  AnatomicalRegionIdentifier, // If needed for mapping KOREAN_VITAL_POINTS anatomicalRegion
} from "../../types"; // Changed import path

/**
 * Korean Martial Arts Anatomical Regions System
 * Based on traditional Korean martial arts vital point knowledge (급소술 - Geupso-sul)
 * Implements authentic pressure point locations and effects
 */

// Korean anatomical region definitions with traditional terminology
export const ANATOMICAL_REGIONS_DATA: Record<string, AnatomicalRegion> = {
  head: {
    id: "head",
    korean: "머리",
    english: "Head",
    bounds: { x: 0, y: 0, width: 100, height: 120 },
    vulnerability: 1.8,
    description: "Critical region containing vital consciousness points",
    traditionalName: "두부 급소 (Head Vital Points)",
    category: "consciousness",
  },

  neck: {
    id: "neck",
    korean: "목",
    english: "Neck",
    bounds: { x: 20, y: 120, width: 60, height: 40 },
    vulnerability: 2.0,
    description: "Most vulnerable region with major arteries and nerves",
    traditionalName: "경부 급소 (Neck Vital Points)",
    category: "circulation",
  },

  chest: {
    id: "chest",
    korean: "가슴",
    english: "Chest",
    bounds: { x: 0, y: 160, width: 100, height: 140 },
    vulnerability: 1.4,
    description: "Heart and lung pressure points",
    traditionalName: "흉부 급소 (Chest Vital Points)",
    category: "breathing",
  },

  abdomen: {
    id: "abdomen",
    korean: "복부",
    english: "Abdomen",
    bounds: { x: 10, y: 300, width: 80, height: 120 },
    vulnerability: 1.6,
    description: "Digestive and energy center points",
    traditionalName: "복부 급소 (Abdominal Vital Points)",
    category: "energy",
  },

  arms: {
    id: "arms",
    korean: "팔",
    english: "Arms",
    bounds: { x: -40, y: 160, width: 180, height: 200 },
    vulnerability: 1.0,
    description: "Nerve clusters and joint manipulation points",
    traditionalName: "상지 급소 (Upper Limb Vital Points)",
    category: "nerve",
  },

  legs: {
    id: "legs",
    korean: "다리",
    english: "Legs",
    bounds: { x: 0, y: 420, width: 100, height: 280 },
    vulnerability: 0.8,
    description: "Foundation and mobility pressure points",
    traditionalName: "하지 급소 (Lower Limb Vital Points)",
    category: "balance",
  },
};

// Traditional Korean vital points with authentic names and effects
// Ensure this VitalPoint structure matches the one in types/index.ts
export const KOREAN_VITAL_POINTS: Record<string, VitalPoint> = {
  // Head region vital points (두부 급소)
  baihui: {
    id: "baihui",
    name: { korean: "백회", english: "Crown Point" }, // Changed to object
    koreanName: "백회", // Direct access
    region: "head" as AnatomicalRegionIdentifier, // Changed from anatomicalRegion
    position: { x: 50, y: 20 },
    category: "consciousness",
    difficulty: 0.9,
    damageMultiplier: 1.5, // Assuming 'damage' was a flat bonus, now a multiplier
    // Or it needs to be handled differently if it's base damage for the VP attack
    effects: [
      {
        type: "vital_stunning",
        duration: 3000,
        magnitude: 0.8, // Changed from intensity
        source: "vital_point",
      },
      {
        type: "ki_boost",
        duration: 2000,
        magnitude: 0.6, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "머리 꼭대기 - 의식과 에너지 흐름을 방해합니다.",
      english: "Top of head - disrupts consciousness and energy flow",
    },
  } as VitalPoint, // Added 'as VitalPoint' for stricter checking during transition

  taiyang: {
    id: "taiyang",
    name: { korean: "태양", english: "Temple" },
    koreanName: "태양",
    region: "head" as AnatomicalRegionIdentifier,
    position: { x: 85, y: 40 },
    category: "nerve",
    difficulty: 0.7,
    damageMultiplier: 1.4,
    effects: [
      {
        type: "vital_stunning",
        duration: 2500,
        magnitude: 0.7, // Changed from intensity
        source: "vital_point",
      },
      {
        type: "vital_paralysis",
        duration: 1500,
        magnitude: 0.5, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "관자놀이 부위 - 방향 감각을 상실시킵니다.",
      english: "Temporal region - causes disorientation",
    },
  } as VitalPoint,

  yintang: {
    id: "yintang",
    name: { korean: "인당", english: "Third Eye" },
    koreanName: "인당",
    region: "head" as AnatomicalRegionIdentifier,
    position: { x: 50, y: 60 },
    category: "consciousness",
    difficulty: 0.8,
    damageMultiplier: 1.3,
    effects: [
      {
        type: "vital_stunning",
        duration: 2000,
        magnitude: 0.6, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "눈썹 사이 - 정신 집중을 방해합니다.",
      english: "Between eyebrows - disrupts mental focus",
    },
  } as VitalPoint,

  // Neck region vital points (경부 급소)
  renying: {
    id: "renying",
    name: { korean: "인영", english: "Carotid" },
    koreanName: "인영",
    region: "neck" as AnatomicalRegionIdentifier,
    position: { x: 35, y: 135 },
    category: "circulation",
    difficulty: 0.6,
    damageMultiplier: 1.8, // High multiplier for carotid
    effects: [
      {
        type: "vital_weakness",
        duration: 4000,
        magnitude: 0.8, // Changed from intensity
        source: "vital_point",
      },
      {
        type: "vital_stunning",
        duration: 2000,
        magnitude: 0.6, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "경동맥 - 뇌로 가는 혈류를 제한합니다.",
      english: "Carotid artery - restricts blood flow to brain",
    },
  } as VitalPoint,

  tiantu: {
    id: "tiantu",
    name: { korean: "천돌", english: "Throat Hollow" },
    koreanName: "천돌",
    region: "neck" as AnatomicalRegionIdentifier,
    position: { x: 50, y: 150 },
    category: "breathing",
    difficulty: 0.7,
    damageMultiplier: 1.7,
    effects: [
      {
        type: "vital_paralysis", // Consider specific "choking" or "breathless" type
        duration: 3000,
        magnitude: 0.7, // Changed from intensity
        source: "vital_point",
      },
      {
        type: "stamina_drain",
        duration: 5000,
        magnitude: 0.6, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "목젖 아래 오목한 곳 - 호흡을 방해합니다.",
      english: "Throat depression - disrupts breathing",
    },
  } as VitalPoint,

  // Chest region vital points (흉부 급소)
  tanzhong: {
    id: "tanzhong",
    name: { korean: "단중", english: "Chest Center" },
    koreanName: "단중",
    region: "chest" as AnatomicalRegionIdentifier,
    position: { x: 50, y: 220 },
    category: "breathing",
    difficulty: 0.5,
    damageMultiplier: 1.35,
    effects: [
      {
        type: "stamina_drain",
        duration: 4000,
        magnitude: 0.5, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "가슴 중앙 - 호흡과 심장 박동에 영향을 줍니다.",
      english: "Center of chest - affects breathing and heart rhythm",
    },
  } as VitalPoint,

  rugen: {
    id: "rugen",
    name: { korean: "유근", english: "Nipple Root" }, // English name adjusted
    koreanName: "유근",
    region: "chest" as AnatomicalRegionIdentifier,
    position: { x: 30, y: 200 }, // Adjust position if it's below nipple
    category: "nerve",
    difficulty: 0.6,
    damageMultiplier: 1.3,
    effects: [
      {
        type: "vital_weakness",
        duration: 3000,
        magnitude: 0.4, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "젖꼭지 부위 - 신경 다발 집중 부위.",
      english: "Nipple area - nerve cluster concentration",
    },
  } as VitalPoint,

  // Abdominal region vital points (복부 급소)
  qihai: {
    id: "qihai",
    name: { korean: "기해", english: "Sea of Ki" },
    koreanName: "기해",
    region: "abdomen" as AnatomicalRegionIdentifier, // Changed to use AnatomicalRegionIdentifier
    position: { x: 50, y: 340 },
    category: "energy",
    difficulty: 0.4,
    damageMultiplier: 1.4,
    effects: [
      {
        type: "ki_disruption", // Changed from ki_boost with negative magnitude
        duration: 3000,
        magnitude: 0.6,
        source: "vital_point",
      },
      {
        type: "vital_weakness",
        duration: 4000,
        magnitude: 0.5, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "에너지 중심 - 내부 기운을 방해합니다.",
      english: "Energy center - disrupts internal power",
    },
  } as VitalPoint,

  zhongwan: {
    id: "zhongwan",
    name: { korean: "중완", english: "Solar Plexus" },
    koreanName: "중완",
    region: "abdomen" as AnatomicalRegionIdentifier,
    position: { x: 50, y: 280 },
    category: "breathing", // Also nerve related
    difficulty: 0.3, // Often considered easier to hit but very effective
    damageMultiplier: 1.6, // High impact
    effects: [
      {
        type: "stamina_drain", // Or "winded"
        duration: 4000,
        magnitude: 0.6, // Changed from intensity
        source: "vital_point",
      },
      {
        type: "vital_weakness",
        duration: 3000,
        magnitude: 0.5, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "명치 - 상대방의 숨을 막히게 합니다.",
      english: "Solar plexus - winds opponent",
    },
  } as VitalPoint,

  // Arm vital points (상지 급소)
  jianjing: {
    id: "jianjing",
    name: { korean: "견정", english: "Shoulder Well" },
    koreanName: "견정",
    region: "arms" as AnatomicalRegionIdentifier, // Or more specific like "shoulder"
    position: { x: 20, y: 180 }, // Relative to arm/shoulder
    category: "nerve",
    difficulty: 0.5,
    damageMultiplier: 1.2,
    effects: [
      {
        type: "vital_paralysis", // Temporary arm paralysis/numbness
        duration: 2000,
        magnitude: 0.4, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "어깨 신경 다발 - 팔의 마비를 유발합니다.",
      english: "Shoulder nerve cluster - causes arm numbness",
    },
  } as VitalPoint,

  quchi: {
    id: "quchi",
    name: { korean: "곡지", english: "Elbow Pool" },
    koreanName: "곡지",
    region: "arms" as AnatomicalRegionIdentifier, // Or "elbow"
    position: { x: 0, y: 280 }, // Relative to arm
    category: "joint", // Also nerve
    difficulty: 0.4,
    damageMultiplier: 1.15,
    effects: [
      {
        type: "vital_weakness", // Weakens grip or arm strength
        duration: 2500,
        magnitude: 0.3, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "팔꿈치 관절 - 팔의 움직임에 영향을 줍니다.",
      english: "Elbow joint - affects arm mobility",
    },
  } as VitalPoint,

  // Leg vital points (하지 급소)
  zusanli: {
    id: "zusanli",
    name: { korean: "족삼리", english: "Leg Three Miles" },
    koreanName: "족삼리",
    region: "legs" as AnatomicalRegionIdentifier,
    position: { x: 40, y: 520 }, // Relative to leg
    category: "energy", // Also muscle/nerve
    difficulty: 0.3,
    damageMultiplier: 1.1,
    effects: [
      {
        type: "stamina_drain", // Or "slow"
        duration: 3000,
        magnitude: 0.4, // Changed from intensity
        source: "vital_point",
      },
    ],
    description: {
      korean: "하퇴 에너지 포인트 - 체력에 영향을 줍니다.",
      english: "Lower leg energy point - affects stamina",
    },
  } as VitalPoint,

  yongquan: {
    id: "yongquan",
    name: { korean: "용천", english: "Bubbling Spring" },
    koreanName: "용천",
    region: "legs" as AnatomicalRegionIdentifier, // Or "foot"
    position: { x: 50, y: 680 }, // Relative to foot
    category: "balance", // Also energy grounding
    difficulty: 0.6, // Hard to hit effectively
    damageMultiplier: 1.25,
    effects: [
      {
        type: "vital_weakness", // Affects stability
        duration: 2000,
        magnitude: 0.3, // Changed from intensity
        source: "vital_point",
      },
      {
        type: "slow", // Added effect
        duration: 1500,
        magnitude: 0.5,
        source: "vital_point",
      },
    ],
    description: {
      korean: "발바닥 - 균형과 접지력에 영향을 줍니다.",
      english: "Sole of foot - affects balance and grounding",
    },
  } as VitalPoint,
};

/**
 * Get all vital points within a specific anatomical region
 */
export function getVitalPointsInRegion(
  regionId: AnatomicalRegionIdentifier // Changed type
): readonly VitalPoint[] {
  return Object.values(KOREAN_VITAL_POINTS).filter(
    (point) => point.region === regionId
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
  const region = ANATOMICAL_REGIONS_DATA[regionId];
  return region?.vulnerability ?? 1.0;
}

/**
 * Get traditional Korean name for anatomical region
 */
export function getTraditionalRegionName(regionId: string): string {
  const region = ANATOMICAL_REGIONS_DATA[regionId]; // Use renamed const
  return region?.traditionalName ?? regionId;
}

/**
 * Check if a position is within an anatomical region's bounds
 */
export function isPositionInRegion(
  position: { readonly x: number; readonly y: number },
  regionId: string
): boolean {
  const region = ANATOMICAL_REGIONS_DATA[regionId]; // Use renamed const
  if (!region || !region.bounds) return false; // Check for bounds

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
  const difficultyModifier = 1 + (vitalPoint.difficulty || 0.5) * 0.5; // Use difficulty from VitalPoint
  const accuracyModifier = Math.min(accuracy, 1.0);

  // Assuming vitalPoint.damageMultiplier is the intended property
  const vpBaseDamageContribution =
    baseDamage * (vitalPoint.damageMultiplier - 1); // Additional damage from VP

  return Math.round(
    (baseDamage + vpBaseDamageContribution) *
      difficultyModifier *
      accuracyModifier
  );
}

// Export types for use in other files
// These are now imported from types/index.ts, so local export is not needed.
// export type { VitalPoint, AnatomicalRegion, VitalPointCategory };
