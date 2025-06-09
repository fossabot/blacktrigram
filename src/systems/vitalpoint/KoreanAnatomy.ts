import { StatusEffect, TrigramStance } from "@/types";
import type { VitalPoint } from "../../types/anatomy"; // AnatomicalLocation and VitalPointEffect were removed as they are unused locally
import type { KoreanText } from "../../types/korean-text"; // Import KoreanText
import type {
  VitalPointCategory,
  VitalPointSeverity,
  EffectType,
  EffectIntensity,
  BodyRegion,
} from "../../types/enums";
import type { AnatomicalRegion } from "../../types/anatomy";
import { KOREAN_VITAL_POINTS } from "./KoreanVitalPoints";

/**
 * Korean Martial Arts Anatomy System
 * Traditional Korean medical knowledge applied to vital point targeting
 * Based on TCM meridian theory and Korean martial arts philosophy
 */

// Enhanced energy meridian for Korean martial arts Ki flow
export interface EnergyMeridian {
  readonly id: string;
  readonly koreanName: string;
  readonly chineseName: string;
  readonly englishName: string;
  readonly element: string;
  readonly direction: "ascending" | "descending" | "bilateral";
  readonly points: readonly string[]; // Vital point IDs along this meridian
  readonly kiFlow: number; // Energy flow rate (0-100)
  readonly description: {
    readonly korean: string;
    readonly english: string;
  };
  // Add missing properties for meridian effects
  readonly effectType?: string;
  readonly duration?: number;
  readonly intensity?: number;
  readonly relatedVitalPoints: readonly string[]; // Add missing property
}

interface ElementalRelationDetail {
  [element: string]: string; // e.g. fire: "화재" (Fire produces Ash/Earth)
}
interface ElementalRelations {
  producing: ElementalRelationDetail;
  controlling: ElementalRelationDetail;
  // element property was redundant here, it's the key in the main record
}

interface KoreanAnatomicalZone {
  id: string;
  koreanName: string; // Plain string
  englishName: string; // Plain string
  vitalPoints: string[]; // IDs of VitalPoints in this zone
  meridians: string[]; // IDs of EnergyMeridians passing through
  description: KoreanText; // Object { korean, english }
  vulnerabilityNotes?: KoreanText;
  boundaries: { top: number; bottom: number; left: number; right: number }; // Added
  vulnerability: number; // Added
  traditionalImportance: number; // Added
}

export const KOREAN_ANATOMICAL_ZONES_ARRAY: readonly KoreanAnatomicalZone[] = [
  // Renamed to avoid conflict if used as map key
  {
    id: "upper_torso",
    koreanName: "상체",
    englishName: "Upper Torso",
    boundaries: { top: 120, bottom: 300, left: 10, right: 90 },
    vulnerability: 1.6,
    meridians: ["lung", "heart", "large_intestine"],
    vitalPoints: ["tanzhong", "yunmen", "jiquan"],
    traditionalImportance: 0.9,
    description: {
      korean: "심장과 폐의 중요 혈자리가 위치한 치명적인 부위입니다.",
      english: "Critical region housing heart and lung vital points",
    },
  },
  {
    id: "lower_torso",
    koreanName: "하체",
    englishName: "Lower Torso",
    boundaries: { top: 300, bottom: 450, left: 15, right: 85 },
    vulnerability: 1.4,
    meridians: ["stomach", "spleen", "kidney"],
    vitalPoints: ["qihai", "guanyuan", "zhongwan"],
    traditionalImportance: 0.8,
    description: {
      korean: "단전과 소화기관이 포함된 에너지 중심부입니다.",
      english: "Energy center containing dan tian and digestive organs",
    },
  },
  {
    id: "head_neck",
    koreanName: "두경부",
    englishName: "Head and Neck",
    boundaries: { top: 0, bottom: 150, left: 20, right: 80 },
    vulnerability: 2.0,
    meridians: ["bladder", "gallbladder", "governing_vessel"],
    vitalPoints: ["baihui", "yintang", "fengchi"],
    traditionalImportance: 1.0,
    description: {
      korean: "의식에 영향을 미치는 중요 혈자리가 있는 가장 취약한 부위입니다.",
      english: "Most vulnerable region with consciousness-affecting points",
    },
  },
  {
    id: "arms",
    koreanName: "상지",
    englishName: "Upper Limbs",
    boundaries: { top: 120, bottom: 400, left: -30, right: 130 },
    vulnerability: 1.0,
    meridians: ["lung", "large_intestine", "heart", "small_intestine"],
    vitalPoints: ["hegu", "quchi", "shenmen"],
    traditionalImportance: 0.6,
    description: {
      korean: "관절 잠금 및 신경 타격에 사용되는 팔다리 끝 혈자리입니다.",
      english: "Extremity points for joint locks and nerve strikes",
    },
  },
  {
    id: "legs",
    koreanName: "하지",
    englishName: "Lower Limbs",
    boundaries: { top: 400, bottom: 700, left: 10, right: 90 },
    vulnerability: 0.8,
    meridians: ["stomach", "spleen", "bladder", "kidney"],
    vitalPoints: ["zusanli", "sanyinjiao", "yongquan"],
    traditionalImportance: 0.7,
    description: {
      korean: "안정성과 이동성에 영향을 미치는 기초 혈자리입니다.",
      english: "Foundation points affecting stability and mobility",
    },
  },
];

// Convert array to Record for easier lookup by ID
export const KOREAN_ANATOMICAL_ZONES: Record<string, KoreanAnatomicalZone> =
  KOREAN_ANATOMICAL_ZONES_ARRAY.reduce((acc, zone) => {
    acc[zone.id] = zone;
    return acc;
  }, {} as Record<string, KoreanAnatomicalZone>);

export const ENERGY_MERIDIANS_ARRAY: readonly EnergyMeridian[] = [
  // Renamed
  {
    id: "lung",
    koreanName: "수태음폐경",
    chineseName: "手太陰肺經",
    englishName: "Lung Meridian",
    element: "metal",
    direction: "descending",
    points: ["LU1", "LU5", "LU9", "LU11"],
    kiFlow: 85,
    description: {
      korean: "호흡과 기 순환을 담당하는 경락",
      english: "Meridian governing breathing and Ki circulation",
    },
    relatedVitalPoints: ["philtrum", "throat", "clavicle"], // Fix: Add missing property
  },
  {
    id: "large_intestine",
    koreanName: "수양명대장경",
    chineseName: "手陽明大腸經",
    englishName: "Large Intestine Meridian",
    element: "metal",
    direction: "ascending",
    points: ["LI4", "LI11", "LI15", "LI20"],
    kiFlow: 75,
    description: {
      korean: "배설과 정화를 담당하는 경락",
      english: "Meridian governing elimination and purification",
    },
    relatedVitalPoints: ["shoulder", "face_upper", "nose"], // Fix: Add missing property
  },
  {
    id: "stomach",
    koreanName: "족양명위경",
    chineseName: "足陽明胃經",
    englishName: "Stomach Meridian",
    element: "earth",
    direction: "descending",
    points: ["ST3", "ST9", "ST25", "ST36"],
    kiFlow: 90,
    description: {
      korean: "소화와 영양 흡수를 담당하는 경락",
      english: "Meridian governing digestion and nutrient absorption",
    },
    relatedVitalPoints: ["solar_plexus", "ribs", "floating_ribs"], // Fix: Add missing property
  },
  {
    id: "spleen",
    koreanName: "족태음비경",
    chineseName: "足太陰脾經",
    englishName: "Spleen Meridian",
    element: "earth",
    direction: "ascending",
    points: ["SP3", "SP6", "SP10", "SP21"],
    kiFlow: 80,
    description: {
      korean: "혈액 생성과 면역을 담당하는 경락",
      english: "Meridian governing blood formation and immunity",
    },
    relatedVitalPoints: ["spleen", "upper_abdomen_center", "liver"], // Fix: Add missing property
  },
  {
    id: "heart",
    koreanName: "수소음심경",
    chineseName: "手少陰心經",
    englishName: "Heart Meridian",
    element: "fire",
    direction: "descending",
    points: ["HE3", "HE5", "HE7", "HE9"],
    kiFlow: 95,
    description: {
      korean: "순환과 정신을 담당하는 경락",
      english: "Meridian governing circulation and mental activity",
    },
    relatedVitalPoints: ["temples", "chest", "kidneys"], // Fix: Add missing property
  },
  {
    id: "small_intestine",
    koreanName: "수태양소장경",
    chineseName: "手太陽小腸經",
    englishName: "Small Intestine Meridian",
    element: "fire",
    direction: "ascending",
    points: ["SI3", "SI8", "SI11", "SI19"],
    kiFlow: 70,
    description: {
      korean: "영양분 흡수와 분별을 담당하는 경락",
      english: "Meridian governing nutrient absorption and discernment",
    },
    relatedVitalPoints: ["mastoid_process", "jaw", "occiput"], // Fix: Add missing property
  },
  {
    id: "bladder",
    koreanName: "족태양방광경",
    chineseName: "足太陽膀胱經",
    englishName: "Bladder Meridian",
    element: "water",
    direction: "descending",
    points: ["BL2", "BL10", "BL23", "BL67"],
    kiFlow: 85,
    description: {
      korean: "배설과 정화를 담당하는 경락",
      english: "Meridian governing excretion and purification",
    },
    relatedVitalPoints: ["eyes", "back", "leg_back_knee"], // Fix: Add missing property
  },
  {
    id: "kidney",
    koreanName: "족소음신경",
    chineseName: "足少陰腎經",
    englishName: "Kidney Meridian",
    element: "water",
    direction: "ascending",
    points: ["KI1", "KI3", "KI7", "KI27"],
    kiFlow: 100,
    description: {
      korean: "생명력과 정기를 담당하는 경락",
      english: "Meridian governing vital essence and life force",
    },
    relatedVitalPoints: ["kidneys", "lower_back", "feet"], // Fix: Add missing property
  },
];

export const ENERGY_MERIDIANS: Record<string, EnergyMeridian> =
  ENERGY_MERIDIANS_ARRAY.reduce((acc, meridian) => {
    acc[meridian.id] = meridian;
    return acc;
  }, {} as Record<string, EnergyMeridian>);

export const ELEMENTAL_RELATIONS: Record<string, ElementalRelations> = {
  wood: {
    producing: { fire: "화생토 (Wood creates Fire)" }, // Example: Wood produces Fire
    controlling: { earth: "목극토 (Wood controls Earth)" }, // Example: Wood controls Earth
  },
  fire: {
    producing: { earth: "화생토 (Fire creates Earth/Ash)" },
    controlling: { metal: "화극금 (Fire controls Metal)" },
  },
  earth: {
    producing: { metal: "토생금 (Earth creates Metal)" },
    controlling: { water: "토극수 (Earth controls Water)" },
  },
  metal: {
    producing: { water: "금생수 (Metal creates Water)" },
    controlling: { wood: "금극목 (Metal controls Wood)" },
  },
  water: {
    producing: { wood: "수생목 (Water creates Wood)" },
    controlling: { fire: "수극화 (Water controls Fire)" },
  },
};

/**
 * Get meridian information by ID
 */
export function getMeridian(meridianId: string): EnergyMeridian | null {
  return ENERGY_MERIDIANS[meridianId] || null;
}

/**
 * Get all meridians associated with a specific element
 */
export function getMeridiansByElement(
  element: string
): readonly EnergyMeridian[] {
  return Object.values(ENERGY_MERIDIANS).filter(
    (meridian) => meridian.element === element
  );
}

/**
 * Calculate meridian flow effectiveness based on time of day
 * Traditional Korean medicine considers meridian peak hours
 */
export function calculateMeridianFlow(
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
export function findOptimalVitalPoints(
  attackerElement: string,
  allVitalPoints: readonly VitalPoint[] // Pass all VPs
): readonly VitalPoint[] {
  const elementalRelation = ELEMENTAL_RELATIONS[attackerElement];
  if (!elementalRelation) return [];

  const optimalPoints: VitalPoint[] = [];

  const controlledElement = Object.keys(elementalRelation.controlling)[0]; // Get the element it controls

  allVitalPoints.forEach((vp) => {
    // Find meridians related to this vital point
    const relatedMeridians = Object.values(ENERGY_MERIDIANS).filter((m) =>
      m.relatedVitalPoints.includes(vp.id)
    );
    // If any related meridian belongs to the element controlled by the attacker's element
    if (relatedMeridians.some((m) => m.element === controlledElement)) {
      optimalPoints.push(vp);
    }
  });

  return optimalPoints;
}

/**
 * Calculate anatomical vulnerability based on position and meridian flow
 */
export function calculateAnatomicalVulnerability(
  position: { x: number; y: number },
  meridianStates: Record<string, number> // flow effectiveness (0-1)
): number {
  let totalVulnerability = 1.0;

  const zone = getZoneByPosition(position);
  if (zone) {
    totalVulnerability *= zone.vulnerability;

    zone.meridians.forEach((meridianId) => {
      const meridianFlowEffectiveness = meridianStates[meridianId] || 1.0; // Default to 1.0 if not specified
      // Vulnerability increases if meridian flow is weak (e.g., 1 / flow_effectiveness)
      // Or some other logic, e.g. if flow is high, it's more sensitive.
      // Let's assume higher flow (closer to 1.0) means normal, lower flow means more vulnerable.
      // So, if flow is 0.5, vulnerability multiplier is 1 / 0.5 = 2.
      // To prevent extreme values, cap it.
      const flowModifier =
        meridianFlowEffectiveness > 0.1 ? 1 / meridianFlowEffectiveness : 10;
      totalVulnerability *= Math.min(flowModifier, 2.5); // Cap modifier
    });
  }

  return Math.max(0.5, Math.min(3.0, totalVulnerability)); // Overall cap
}

/**
 * Check if position is within anatomical zone
 */
function isPositionInZone(
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
export function generateMeridianEffects(
  meridianId: string,
  disruptionLevel: number // 0-1, how much it's disrupted
): readonly StatusEffect[] {
  const meridian = ENERGY_MERIDIANS[meridianId];
  if (!meridian) return [];

  const effects: StatusEffect[] = [];
  const intensityValue = Math.min(1.0, disruptionLevel);
  const baseDuration = 3000; // ms

  let effectIntensity: StatusEffect["intensity"] = "weak";
  if (intensityValue > 0.7) effectIntensity = "strong";
  else if (intensityValue > 0.4) effectIntensity = "moderate";

  let effectType: EffectType | null = null;

  switch (meridian.element) {
    case "metal": // Lung, Large Intestine - Related to breath, skin
      if (disruptionLevel > 0.5) effectType = "stamina_drain";
      break;
    case "water": // Kidney, Bladder - Related to fear, cold, essence
      if (disruptionLevel > 0.4) effectType = "vital_weakness";
      break;
    case "fire": // Heart, Small Intestine - Related to joy, heat, consciousness
      if (disruptionLevel > 0.6) effectType = "vital_stunning";
      break;
    case "earth": // Spleen, Stomach - Related to worry, digestion, stability
      if (disruptionLevel > 0.3) effectType = "damage_vulnerability";
      break;
    case "wood": // Liver, Gallbladder - Related to anger, sinews, decision
      if (disruptionLevel > 0.4) effectType = "vital_paralysis";
      break;
  }

  if (effectType) {
    effects.push({
      id: `${meridian.id}_disruption_${Date.now()}`,
      type: effectType,
      duration: baseDuration * intensityValue,
      intensity: effectIntensity,
      description: {
        korean: `${meridian.koreanName} 경락 교란: ${effectType}`,
        english: `${meridian.englishName} Meridian Disruption: ${effectType}`,
      },
      stackable: false,
    });
  }

  return effects;
}

/**
 * Get all anatomical zones
 */
export function getAnatomicalZones(): readonly KoreanAnatomicalZone[] {
  // Return array
  return KOREAN_ANATOMICAL_ZONES_ARRAY;
}

/**
 * Get zone by position
 */
export function getZoneByPosition(position: {
  x: number;
  y: number;
}): KoreanAnatomicalZone | null {
  for (const zone of KOREAN_ANATOMICAL_ZONES_ARRAY) {
    // Iterate array
    if (isPositionInZone(position, zone)) {
      return zone;
    }
  }
  return null;
}

export class KoreanAnatomySystem {
  // ... (constructor and methods)

  getZoneForVitalPoint(vitalPointId: string): KoreanAnatomicalZone | undefined {
    return KOREAN_ANATOMICAL_ZONES_ARRAY.find(
      (
        zone // Iterate array
      ) => zone.vitalPoints.includes(vitalPointId)
    );
  }

  getMeridiansInZone(zoneId: string): EnergyMeridian[] {
    const zone = KOREAN_ANATOMICAL_ZONES[zoneId]; // Use Record for direct lookup
    if (!zone) return [];
    return ENERGY_MERIDIANS_ARRAY.filter(
      (
        meridian // Iterate array
      ) => zone.meridians.includes(meridian.id)
    );
  }

  getTrigramRelatedEffects(
    vitalPoint: VitalPoint,
    stance: TrigramStance
  ): StatusEffect[] {
    const effects: StatusEffect[] = [];
    // const stanceData = TRIGRAM_DATA[stance]; // Unused

    if (stance === "geon" && vitalPoint.category === "head") {
      effects.push({
        id: `geon_head_strike_buff_${Date.now()}`,
        type: "buff",
        intensity: "moderate",
        duration: 10000, // ms
        description: {
          korean: "건의 기운: 머리 공격 강화",
          english: "Geon Ki: Head attack enhanced",
        },
        stackable: false,
      });
    }

    if (stance === "gam" && vitalPoint.category === "joints") {
      // "joints" is now a valid category
      effects.push({
        id: `gam_joint_drain_${Date.now()}`,
        type: "debuff", // "stamina_drain" is a valid EffectType, but "debuff" is more generic for the effect's role
        // If you want to apply a specific "stamina_drain" effect, its properties would be defined here.
        // For example, if "stamina_drain" is a type of debuff that specifically targets stamina:
        // type: "stamina_drain", // This is now a valid EffectType
        intensity: "moderate",
        duration: 15000, // ms
        description: {
          korean: "감의 기운: 관절 타격 시 체력 흡수",
          english: "Gam Ki: Stamina drain on joint hit",
        },
        stackable: true,
        // Modifiers for the "stamina_drain" effect could be here if StatusEffect supports them
        // e.g. modifiers: [{ attribute: "stamina", value: -10, type: "flat" }]
      });
    }
    return effects;
  }
}

export const VITAL_POINTS_DATA: readonly VitalPoint[] = [
  {
    id: "head_philtrum_injoong",
    name: { korean: "인중", english: "Philtrum" },
    korean: "인중",
    englishName: "Philtrum", // Added required property
    koreanName: "인중", // Added required property
    category: "head",
    description: {
      korean:
        "코와 윗입술 사이의 정중선 오목한 부분. 충격 시 심한 통증과 방향 감각 상실을 유발한다.",
      english:
        "The midline groove between the nose and upper lip. Impact causes severe pain and disorientation.",
    },
    effects: [
      {
        id: "disorientation_philtrum",
        type: "disoriented" as EffectType,
        duration: 5000,
        intensity: "strong" as EffectIntensity,
        description: {
          korean: "심한 방향 감각 상실",
          english: "Severe disorientation",
        },
        stackable: false,
      },
      {
        id: "pain_philtrum",
        type: "pain_severe" as EffectType,
        duration: 10000,
        intensity: "high" as EffectIntensity,
        description: { korean: "극심한 통증", english: "Excruciating pain" },
        stackable: true,
      },
    ],
    location: { x: 0.5, y: 0.15, region: "face_upper" },
    severity: "severe",
    techniques: ["pressure", "strike"], // Fixed: renamed from technique
    baseAccuracy: 0.65,
    baseDamage: 15, // Added required property
    baseStun: 2500,
    damageMultiplier: 1.8,
    damage: 15, // Added required property
  },
  {
    id: "chest_sternum_base",
    name: { korean: "단중혈 부근", english: "Base of Sternum (CV17 area)" },
    korean: "단중혈 부근",
    englishName: "Base of Sternum (CV17 area)", // Added required property
    koreanName: "단중혈 부근", // Added required property
    category: "torso",
    description: {
      korean: "가슴 중앙, 흉골 하단부.",
      english: "Center of chest, lower part of the sternum.",
    },
    effects: [
      {
        id: "sternum_winded",
        type: "winded" as EffectType,
        intensity: "strong" as EffectIntensity,
        duration: 10000,
        description: {
          korean: "심한 호흡 곤란 유발",
          english: "Causes severe difficulty breathing",
        },
        stackable: true,
      },
      {
        id: "sternum_pain",
        type: "pain_severe" as EffectType,
        intensity: "strong" as EffectIntensity,
        duration: 20000,
        description: {
          korean: "극심한 흉부 통증",
          english: "Intense chest pain",
        },
        stackable: false,
      },
    ],
    location: { x: 0.5, y: 0.45, region: "chest" },
    severity: "severe",
    techniques: ["striking", "pressure"], // Fixed: renamed from technique
    baseAccuracy: 0.75,
    baseDamage: 25, // Added required property
    baseStun: 3000,
    damageMultiplier: 1.4,
    damage: 25, // Added required property
  },
  {
    id: "vp_head_temple_kanjanori",
    name: { korean: "관자놀이", english: "Temple (Kanjanori)" } as KoreanText,
    korean: "관자놀이",
    englishName: "Temple (Kanjanori)", // Added required property
    koreanName: "관자놀이", // Added required property
    category: "head" as VitalPointCategory,
    description: {
      korean:
        "머리 측두부의 얇은 뼈와 신경이 집중된 부위. 강타 시 심각한 뇌진탕이나 의식 상실을 유발할 수 있음.",
      english:
        "Thin bone and nerve concentration on the temporal region of the head. A strong blow can cause severe concussion or loss of consciousness.",
    } as KoreanText,
    location: { x: 0.15, y: 0.08, region: "head_side" as BodyRegion },
    effects: [
      {
        id: "eff_concussion_strong",
        type: "stun" as EffectType,
        duration: 3000,
        intensity: "strong" as EffectIntensity,
        description: {
          korean: "강한 뇌진탕",
          english: "Strong Concussion",
        } as KoreanText,
        stackable: false,
      },
      {
        id: "eff_disorientation_severe",
        type: "disoriented" as EffectType,
        duration: 5000,
        intensity: "severe" as EffectIntensity,
        description: {
          korean: "심각한 방향감각 상실",
          english: "Severe Disorientation",
        } as KoreanText,
        stackable: true,
      },
    ],
    severity: "critical" as VitalPointSeverity,
    baseAccuracy: 0.75,
    baseDamage: 25, // Added required property
    damageMultiplier: 2.5,
    baseStun: 3000,
    techniques: ["striking", "pressure"], // Fixed: renamed from technique
    damage: 25, // Added required property
  },
  {
    id: "vp_solar_plexus_myungchi",
    name: { korean: "명치", english: "Solar Plexus (Myungchi)" } as KoreanText,
    korean: "명치",
    englishName: "Solar Plexus (Myungchi)", // Added required property
    koreanName: "명치", // Added required property
    category: "torso" as VitalPointCategory,
    description: {
      korean:
        "흉골 바로 아래 위치한 신경총. 강타 시 호흡곤란과 극심한 고통을 유발.",
      english:
        "Nerve plexus located just below the sternum. A strong blow causes difficulty breathing and extreme pain.",
    } as KoreanText,
    location: {
      x: 0.5,
      y: 0.35,
      region: "upper_abdomen_center" as BodyRegion,
    },
    effects: [
      {
        id: "eff_winded_severe",
        type: "stamina_drain" as EffectType,
        duration: 6000,
        intensity: "severe" as EffectIntensity,
        description: {
          korean: "심한 호흡 곤란",
          english: "Severe Windedness",
        } as KoreanText,
        stackable: false,
      },
      {
        id: "eff_pain_extreme",
        type: "pain_severe" as EffectType,
        duration: 4000,
        intensity: "extreme" as EffectIntensity,
        description: {
          korean: "극심한 고통",
          english: "Extreme Pain",
        } as KoreanText,
        stackable: true,
      },
    ],
    severity: "severe" as VitalPointSeverity,
    baseAccuracy: 0.85,
    baseDamage: 20, // Added required property
    damageMultiplier: 1.8,
    baseStun: 1500,
    techniques: ["striking", "pressure"], // Fixed: renamed from technique
    damage: 20, // Added required property
  },
  {
    id: "head_mastoid_process_wangu",
    name: { korean: "완골", english: "Mastoid Process" },
    korean: "완골",
    englishName: "Mastoid Process", // Added required property
    koreanName: "완골", // Added required property
    category: "head",
    description: {
      korean:
        "귀 뒤의 돌출된 뼈. 강타 시 균형 상실 및 의식 저하를 유발할 수 있다.",
      english:
        "Bony prominence behind the ear. A strong blow can cause loss of balance and reduced consciousness.",
    },
    effects: [
      {
        id: "balance_loss_mastoid",
        type: "balance_loss" as EffectType,
        duration: 7000,
        intensity: "strong" as EffectIntensity,
        description: {
          korean: "심각한 균형 상실",
          english: "Severe loss of balance",
        },
        stackable: false,
      },
      {
        id: "consciousness_reduction_mastoid",
        type: "consciousness_loss" as EffectType,
        duration: 3000,
        intensity: "moderate" as EffectIntensity,
        description: {
          korean: "의식 저하",
          english: "Reduced consciousness",
        },
        stackable: true,
      },
    ],
    location: { x: 0.2, y: 0.2, region: "head_side" },
    severity: "severe",
    techniques: ["strike", "pressure"], // Fixed: renamed from technique
    baseAccuracy: 0.6,
    baseDamage: 18, // Added required property
    baseStun: 3000,
    damageMultiplier: 1.7,
    damage: 18, // Added required property
  },
];

export const ANATOMICAL_REGIONS: Record<string, AnatomicalRegion> = {
  head: {
    id: "head",
    name: { korean: "머리", english: "Head" },
    vitalPoints: KOREAN_VITAL_POINTS.filter((vp) => vp.region === "head"),
  },
  neck: {
    id: "neck",
    name: { korean: "목", english: "Neck" },
    vitalPoints: KOREAN_VITAL_POINTS.filter((vp) => vp.region === "neck"),
  },
  torso: {
    id: "torso",
    name: { korean: "몸통", english: "Torso" },
    vitalPoints: KOREAN_VITAL_POINTS.filter((vp) => vp.region === "torso"),
  },
  arms: {
    id: "arms",
    name: { korean: "팔", english: "Arms" },
    vitalPoints: KOREAN_VITAL_POINTS.filter((vp) => vp.region === "arms"),
  },
  legs: {
    id: "legs",
    name: { korean: "다리", english: "Legs" },
    vitalPoints: KOREAN_VITAL_POINTS.filter((vp) => vp.region === "legs"),
  },
} as const;

export const getRegionByName = (name: string): AnatomicalRegion | undefined => {
  return ANATOMICAL_REGIONS[name];
};

export const getAllRegions = (): AnatomicalRegion[] => {
  return Object.values(ANATOMICAL_REGIONS);
};
