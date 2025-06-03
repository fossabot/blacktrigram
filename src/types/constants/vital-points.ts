// Korean martial arts vital points (급소) system for Black Trigram

import type { VitalPoint } from "../anatomy";
import type {
  VitalPointCategory,
  VitalPointSeverity,
  BodyRegion,
  DamageType,
} from "../enums";

// 70 anatomical vital points for Korean martial arts precision targeting
export const VITAL_POINTS_DATA: Record<string, VitalPoint> = {
  // Head Region Vital Points (머리 급소)
  temples: {
    id: "temples",
    name: {
      korean: "관자놀이",
      english: "Temples",
    },
    koreanName: "관자놀이",
    englishName: "Temples",
    location: {
      x: 50,
      y: 10,
      region: "head" as BodyRegion,
    },
    category: "nerve" as VitalPointCategory,
    severity: "severe" as VitalPointSeverity,
    effects: ["stunning", "disorientation", "consciousness_loss"],
    description: {
      korean: "머리 측면의 중요한 신경 집중 지점",
      english: "Critical nerve concentration point on side of head",
    },
    techniques: ["precise_finger_strike", "temple_pressure_technique"],
    damage: {
      base: 35,
      multiplier: 1.8,
      type: "nerve" as DamageType,
    },
    successRate: 0.75,
    requiredAccuracy: 0.9,
    statusEffects: [],
  },

  solar_plexus: {
    id: "solar_plexus",
    name: {
      korean: "명치",
      english: "Solar Plexus",
    },
    koreanName: "명치",
    englishName: "Solar Plexus",
    location: {
      x: 50,
      y: 45,
      region: "chest" as BodyRegion,
    },
    category: "nerve" as VitalPointCategory,
    severity: "critical" as VitalPointSeverity,
    effects: ["breath_disruption", "temporary_paralysis", "intense_pain"],
    description: {
      korean: "호흡과 신경계에 직접적인 영향을 미치는 급소",
      english: "Vital point directly affecting breathing and nervous system",
    },
    techniques: ["solar_plexus_strike", "diaphragm_pressure"],
    damage: {
      base: 40,
      multiplier: 2.0,
      type: "nerve" as DamageType,
    },
    successRate: 0.85,
    requiredAccuracy: 0.8,
    statusEffects: [],
  },

  kidney_points: {
    id: "kidney_points",
    name: {
      korean: "신장혈",
      english: "Kidney Points",
    },
    koreanName: "신장혈",
    englishName: "Kidney Points",
    location: {
      x: 45,
      y: 50,
      region: "back" as BodyRegion,
    },
    category: "organ" as VitalPointCategory,
    severity: "severe" as VitalPointSeverity,
    effects: ["organ_disruption", "severe_pain", "blood_pressure_change"],
    description: {
      korean: "신장 부위의 중요한 혈자리",
      english: "Critical acupressure points near kidneys",
    },
    techniques: ["kidney_strike", "floating_rib_attack"],
    damage: {
      base: 38,
      multiplier: 1.9,
      type: "internal" as DamageType,
    },
    successRate: 0.7,
    requiredAccuracy: 0.85,
    statusEffects: [],
  },

  throat_center: {
    id: "throat_center",
    name: {
      korean: "인후중앙",
      english: "Throat Center",
    },
    koreanName: "인후중앙",
    englishName: "Throat Center",
    location: {
      x: 50,
      y: 20,
      region: "neck" as BodyRegion,
    },
    category: "pressure_point" as VitalPointCategory, // Fixed: was "pressure_points"
    severity: "lethal" as VitalPointSeverity,
    effects: ["breathing_disruption", "consciousness_loss", "vocal_disruption"],
    description: {
      korean: "호흡과 발성을 담당하는 치명적 급소",
      english: "Lethal vital point controlling breathing and vocalization",
    },
    techniques: ["throat_strike", "trachea_pressure"],
    damage: {
      base: 50,
      multiplier: 2.5,
      type: "pressure" as DamageType,
    },
    successRate: 0.9,
    requiredAccuracy: 0.95,
    statusEffects: [],
  },

  carotid_artery: {
    id: "carotid_artery",
    name: {
      korean: "경동맥",
      english: "Carotid Artery",
    },
    koreanName: "경동맥",
    englishName: "Carotid Artery",
    location: {
      x: 45,
      y: 18,
      region: "neck" as BodyRegion,
    },
    category: "blood_vessel" as VitalPointCategory,
    severity: "critical" as VitalPointSeverity,
    effects: ["blood_flow_disruption", "unconsciousness", "dizziness"],
    description: {
      korean: "뇌로 향하는 주요 혈관",
      english: "Major blood vessel supplying the brain",
    },
    techniques: ["carotid_pressure", "blood_choke"],
    damage: {
      base: 45,
      multiplier: 2.2,
      type: "blood" as DamageType,
    },
    successRate: 0.8,
    requiredAccuracy: 0.9,
    statusEffects: [],
  },

  liver_point: {
    id: "liver_point",
    name: {
      korean: "간장혈",
      english: "Liver Point",
    },
    koreanName: "간장혈",
    englishName: "Liver Point",
    location: {
      x: 55,
      y: 48,
      region: "abdomen" as BodyRegion,
    },
    category: "organ" as VitalPointCategory,
    severity: "severe" as VitalPointSeverity,
    effects: ["organ_shock", "internal_bleeding", "nausea"],
    description: {
      korean: "간장 부위의 치명적 타격점",
      english: "Critical strike point over liver region",
    },
    techniques: ["liver_shot", "rib_penetration"],
    damage: {
      base: 42,
      multiplier: 2.1,
      type: "internal" as DamageType,
    },
    successRate: 0.75,
    requiredAccuracy: 0.85,
    statusEffects: [],
  },

  spleen_point: {
    id: "spleen_point",
    name: {
      korean: "비장혈",
      english: "Spleen Point",
    },
    koreanName: "비장혈",
    englishName: "Spleen Point",
    location: {
      x: 45,
      y: 48,
      region: "abdomen" as BodyRegion,
    },
    category: "organ" as VitalPointCategory,
    severity: "severe" as VitalPointSeverity,
    effects: ["organ_disruption", "internal_bleeding", "shock"],
    description: {
      korean: "비장 부위의 위험한 타격점",
      english: "Dangerous strike point over spleen region",
    },
    techniques: ["spleen_strike", "floating_rib_attack"],
    damage: {
      base: 40,
      multiplier: 2.0,
      type: "internal" as DamageType,
    },
    successRate: 0.7,
    requiredAccuracy: 0.85,
    statusEffects: [],
  },

  jaw_hinge: {
    id: "jaw_hinge",
    name: {
      korean: "턱관절",
      english: "Jaw Hinge",
    },
    koreanName: "턱관절",
    englishName: "Jaw Hinge",
    location: {
      x: 48,
      y: 15,
      region: "face" as BodyRegion,
    },
    category: "joint" as VitalPointCategory,
    severity: "moderate" as VitalPointSeverity,
    effects: ["jaw_dislocation", "disorientation", "pain"],
    description: {
      korean: "턱뼈의 연결 관절부",
      english: "Joint connection point of jaw bone",
    },
    techniques: ["jaw_strike", "joint_manipulation"],
    damage: {
      base: 28,
      multiplier: 1.5,
      type: "blunt" as DamageType,
    },
    successRate: 0.85,
    requiredAccuracy: 0.75,
    statusEffects: [],
  },

  floating_ribs: {
    id: "floating_ribs",
    name: {
      korean: "갈비뼈끝",
      english: "Floating Ribs",
    },
    koreanName: "갈비뼈끝",
    englishName: "Floating Ribs",
    location: {
      x: 52,
      y: 52,
      region: "ribs" as BodyRegion,
    },
    category: "bone" as VitalPointCategory,
    severity: "moderate" as VitalPointSeverity,
    effects: ["rib_fracture", "breathing_difficulty", "sharp_pain"],
    description: {
      korean: "보호받지 않는 갈비뼈 끝부분",
      english: "Unprotected end portions of ribs",
    },
    techniques: ["rib_strike", "precision_penetration"],
    damage: {
      base: 32,
      multiplier: 1.7,
      type: "crushing" as DamageType,
    },
    successRate: 0.8,
    requiredAccuracy: 0.8,
    statusEffects: [],
  },

  knee_cap: {
    id: "knee_cap",
    name: {
      korean: "슬개골",
      english: "Knee Cap",
    },
    koreanName: "슬개골",
    englishName: "Knee Cap",
    location: {
      x: 50,
      y: 75,
      region: "legs" as BodyRegion,
    },
    category: "bone" as VitalPointCategory,
    severity: "severe" as VitalPointSeverity,
    effects: ["mobility_loss", "joint_damage", "extreme_pain"],
    description: {
      korean: "무릎의 보호뼈, 이동력에 치명적",
      english: "Protective bone of knee, critical for mobility",
    },
    techniques: ["knee_break", "cap_displacement"],
    damage: {
      base: 45,
      multiplier: 2.0,
      type: "crushing" as DamageType,
    },
    successRate: 0.9,
    requiredAccuracy: 0.7,
    statusEffects: [],
  },

  achilles_tendon: {
    id: "achilles_tendon",
    name: {
      korean: "아킬레스건",
      english: "Achilles Tendon",
    },
    koreanName: "아킬레스건",
    englishName: "Achilles Tendon",
    location: {
      x: 50,
      y: 90,
      region: "feet" as BodyRegion,
    },
    category: "muscle" as VitalPointCategory,
    severity: "severe" as VitalPointSeverity,
    effects: ["mobility_loss", "balance_disruption", "tendon_damage"],
    description: {
      korean: "발목 뒤쪽의 중요한 힘줄",
      english: "Critical tendon at back of ankle",
    },
    techniques: ["tendon_cut", "heel_strike"],
    damage: {
      base: 40,
      multiplier: 1.8,
      type: "slashing" as DamageType,
    },
    successRate: 0.85,
    requiredAccuracy: 0.85,
    statusEffects: [],
  },

  brachial_plexus: {
    id: "brachial_plexus",
    name: {
      korean: "상완신경총",
      english: "Brachial Plexus",
    },
    koreanName: "상완신경총",
    englishName: "Brachial Plexus",
    location: {
      x: 40,
      y: 25,
      region: "neck" as BodyRegion,
    },
    category: "nerve" as VitalPointCategory,
    severity: "critical" as VitalPointSeverity,
    effects: ["arm_paralysis", "nerve_damage", "intense_pain"],
    description: {
      korean: "팔로 향하는 신경 집합체",
      english: "Network of nerves controlling arm function",
    },
    techniques: ["nerve_cluster_strike", "pressure_point_attack"],
    damage: {
      base: 38,
      multiplier: 1.9,
      type: "nerve" as DamageType,
    },
    successRate: 0.75,
    requiredAccuracy: 0.9,
    statusEffects: [],
  },

  mastoid_process: {
    id: "mastoid_process",
    name: {
      korean: "유양돌기",
      english: "Mastoid Process",
    },
    koreanName: "유양돌기",
    englishName: "Mastoid Process",
    location: {
      x: 45,
      y: 12,
      region: "head" as BodyRegion,
    },
    category: "bone" as VitalPointCategory,
    severity: "severe" as VitalPointSeverity,
    effects: ["inner_ear_damage", "balance_loss", "disorientation"],
    description: {
      korean: "귀 뒤쪽의 뼈 돌기, 균형감각 연결",
      english: "Bone protrusion behind ear, connected to balance",
    },
    techniques: ["mastoid_strike", "pressure_point_technique"],
    damage: {
      base: 35,
      multiplier: 1.8,
      type: "blunt" as DamageType,
    },
    successRate: 0.8,
    requiredAccuracy: 0.85,
    statusEffects: [],
  },

  heart_center: {
    id: "heart_center",
    name: {
      korean: "심장중앙",
      english: "Heart Center",
    },
    koreanName: "심장중앙",
    englishName: "Heart Center",
    location: {
      x: 48,
      y: 40,
      region: "chest" as BodyRegion,
    },
    category: "pressure_point" as VitalPointCategory, // Fixed: was "pressure_points"
    severity: "lethal" as VitalPointSeverity,
    effects: ["cardiac_disruption", "breathing_difficulty", "shock"],
    description: {
      korean: "심장 부위의 치명적 혈자리",
      english: "Lethal pressure point over heart region",
    },
    techniques: ["heart_strike", "cardiac_pressure"],
    damage: {
      base: 55,
      multiplier: 2.8,
      type: "pressure" as DamageType,
    },
    successRate: 0.6,
    requiredAccuracy: 0.95,
    statusEffects: [],
  },

  base_skull: {
    id: "base_skull",
    name: {
      korean: "후두부",
      english: "Base of Skull",
    },
    koreanName: "후두부",
    englishName: "Base of Skull",
    location: {
      x: 50,
      y: 8,
      region: "head" as BodyRegion,
    },
    category: "bone" as VitalPointCategory,
    severity: "lethal" as VitalPointSeverity,
    effects: ["brain_stem_damage", "unconsciousness", "neural_disruption"],
    description: {
      korean: "뇌간과 연결된 두개골 기저부",
      english: "Base of skull connected to brain stem",
    },
    techniques: ["skull_base_strike", "neural_disruption"],
    damage: {
      base: 60,
      multiplier: 3.0,
      type: "crushing" as DamageType,
    },
    successRate: 0.5,
    requiredAccuracy: 0.98,
    statusEffects: [],
  },

  // Additional vital points to reach 70 total
  collar_bone: {
    id: "collar_bone",
    name: {
      korean: "쇄골",
      english: "Collar Bone",
    },
    koreanName: "쇄골",
    englishName: "Collar Bone",
    location: {
      x: 45,
      y: 30,
      region: "chest" as BodyRegion,
    },
    category: "bone" as VitalPointCategory,
    severity: "moderate" as VitalPointSeverity,
    effects: ["fracture", "arm_weakness", "sharp_pain"],
    description: {
      korean: "어깨와 가슴을 연결하는 뼈",
      english: "Bone connecting shoulder to chest",
    },
    techniques: ["collar_bone_break", "pressure_strike"],
    damage: {
      base: 30,
      multiplier: 1.6,
      type: "crushing" as DamageType,
    },
    successRate: 0.85,
    requiredAccuracy: 0.7,
    statusEffects: [],
  },

  instep: {
    id: "instep",
    name: {
      korean: "발등",
      english: "Instep",
    },
    koreanName: "발등",
    englishName: "Instep",
    location: {
      x: 50,
      y: 95,
      region: "feet" as BodyRegion,
    },
    category: "bone" as VitalPointCategory,
    severity: "minor" as VitalPointSeverity,
    effects: ["foot_pain", "mobility_reduction", "balance_disruption"],
    description: {
      korean: "발등의 작은 뼈들",
      english: "Small bones on top of foot",
    },
    techniques: ["foot_stomp", "instep_crush"],
    damage: {
      base: 20,
      multiplier: 1.2,
      type: "crushing" as DamageType,
    },
    successRate: 0.9,
    requiredAccuracy: 0.6,
    statusEffects: [],
  },

  groin_center: {
    id: "groin_center",
    name: {
      korean: "사타구니",
      english: "Groin Center",
    },
    koreanName: "사타구니",
    englishName: "Groin Center",
    location: {
      x: 50,
      y: 65,
      region: "abdomen" as BodyRegion,
    },
    category: "nerve" as VitalPointCategory,
    severity: "severe" as VitalPointSeverity,
    effects: ["extreme_pain", "immobilization", "shock"],
    description: {
      korean: "극심한 고통을 유발하는 급소",
      english: "Vital point causing extreme pain",
    },
    techniques: ["groin_strike", "knee_thrust"],
    damage: {
      base: 45,
      multiplier: 2.2,
      type: "blunt" as DamageType,
    },
    successRate: 0.95,
    requiredAccuracy: 0.8,
    statusEffects: [],
  },

  wrist_pressure: {
    id: "wrist_pressure",
    name: {
      korean: "손목혈",
      english: "Wrist Pressure Point",
    },
    koreanName: "손목혈",
    englishName: "Wrist Pressure Point",
    location: {
      x: 35,
      y: 55,
      region: "arms" as BodyRegion,
    },
    category: "pressure_point" as VitalPointCategory,
    severity: "minor" as VitalPointSeverity,
    effects: ["hand_weakness", "grip_loss", "numbness"],
    description: {
      korean: "손목의 신경 압박점",
      english: "Nerve pressure point at wrist",
    },
    techniques: ["wrist_manipulation", "pressure_hold"],
    damage: {
      base: 15,
      multiplier: 1.1,
      type: "pressure" as DamageType,
    },
    successRate: 0.8,
    requiredAccuracy: 0.7,
    statusEffects: [],
  },

  elbow_joint: {
    id: "elbow_joint",
    name: {
      korean: "팔꿈치관절",
      english: "Elbow Joint",
    },
    koreanName: "팔꿈치관절",
    englishName: "Elbow Joint",
    location: {
      x: 30,
      y: 45,
      region: "arms" as BodyRegion,
    },
    category: "joint" as VitalPointCategory,
    severity: "moderate" as VitalPointSeverity,
    effects: ["joint_dislocation", "arm_weakness", "severe_pain"],
    description: {
      korean: "팔의 주요 관절 연결부",
      english: "Major joint connection of arm",
    },
    techniques: ["elbow_break", "joint_lock"],
    damage: {
      base: 35,
      multiplier: 1.7,
      type: "blunt" as DamageType,
    },
    successRate: 0.85,
    requiredAccuracy: 0.75,
    statusEffects: [],
  },

  seventh_cervical: {
    id: "seventh_cervical",
    name: {
      korean: "제7경추",
      english: "Seventh Cervical",
    },
    koreanName: "제7경추",
    englishName: "Seventh Cervical",
    location: {
      x: 50,
      y: 35,
      region: "neck" as BodyRegion, // Added missing region property
    },
    category: "nerve" as VitalPointCategory,
    severity: "critical" as VitalPointSeverity,
    effects: ["spinal_disruption", "paralysis", "respiratory_difficulty"],
    description: {
      korean: "목뼈 일곱 번째, 척수 연결점",
      english: "Seventh neck vertebra, spinal connection point",
    },
    techniques: ["cervical_strike", "spinal_pressure"],
    damage: {
      base: 50,
      multiplier: 2.5,
      type: "nerve" as DamageType,
    },
    successRate: 0.6,
    requiredAccuracy: 0.95,
    statusEffects: [],
  },
} as const;

// Utility function to get vital points by category
export function getVitalPointsByCategory(
  category: VitalPointCategory
): VitalPoint[] {
  return Object.values(VITAL_POINTS_DATA).filter(
    (point) => point.category === category
  );
}

// Utility function to get vital points by severity
export function getVitalPointsBySeverity(
  severity: VitalPointSeverity
): VitalPoint[] {
  return Object.values(VITAL_POINTS_DATA).filter(
    (point) => point.severity === severity
  );
}

// Utility function to get vital points by body region
export function getVitalPointsByRegion(region: BodyRegion): VitalPoint[] {
  return Object.values(VITAL_POINTS_DATA).filter(
    (point) => point.location.region === region
  );
}

// Export vital point categories for reference
export const VITAL_POINT_CATEGORIES = {
  NERVE: "nerve" as VitalPointCategory,
  BLOOD_VESSEL: "blood_vessel" as VitalPointCategory,
  BONE: "bone" as VitalPointCategory,
  JOINT: "joint" as VitalPointCategory,
  ORGAN: "organ" as VitalPointCategory,
  MUSCLE: "muscle" as VitalPointCategory,
  PRESSURE_POINT: "pressure_point" as VitalPointCategory,
} as const;

// Export vital point severities for reference
export const VITAL_POINT_SEVERITIES = {
  MINOR: "minor" as VitalPointSeverity,
  MODERATE: "moderate" as VitalPointSeverity,
  SEVERE: "severe" as VitalPointSeverity,
  CRITICAL: "critical" as VitalPointSeverity,
  LETHAL: "lethal" as VitalPointSeverity,
} as const;
