// Korean vital points for Black Trigram (흑괘)
// Complete, culturally accurate, bilingual (Korean, English, Romanization)
import { VitalPointEffect } from "@/types/anatomy";
import { EffectIntensity } from "@/types/enums";
import type {
  VitalPoint,
  KoreanText,
  EffectType,
  BodyRegion,
  VitalPointCategory,
  VitalPointSeverity,
} from "../../types";

// Helper to create VitalPointEffect objects
function createEffect(
  id: string,
  type: EffectType,
  duration: number,
  intensity: EffectIntensity,
  descriptionKorean: string,
  descriptionEnglish: string,
  stackable: boolean = false
): VitalPointEffect {
  return {
    id,
    type,
    duration,
    intensity,
    description: {
      korean: descriptionKorean,
      english: descriptionEnglish,
    } as KoreanText,
    stackable,
  };
}

export const KOREAN_VITAL_POINTS: readonly VitalPoint[] = [
  {
    id: "KP001",
    name: {
      korean: "인중",
      english: "Philtrum",
      romanized: "Injoong",
    } as KoreanText,
    korean: "인중",
    english: "Philtrum",
    category: "head" as VitalPointCategory,
    description: {
      korean: "코와 윗입술 사이의 홈. 강타 시 심한 통증과 방향 감각 상실 유발.",
      english:
        "Groove between the nose and upper lip. Strong impact causes severe pain and disorientation.",
      romanized:
        "Ko-wa wit-ib-sul sai-ui hom. Gangta si simhan tongjeung-gwa banghyang gamgak sangsil yubal.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP001_Effect1",
        "disorientation" as EffectType,
        10,
        "strong" as EffectIntensity,
        "방향 감각 상실",
        "Disorientation"
      ),
      createEffect(
        "KP001_Effect2",
        "pain_severe" as EffectType,
        15,
        "strong" as EffectIntensity,
        "극심한 통증",
        "Severe Pain"
      ),
    ],
    location: { x: 0.5, y: 0.15, region: "face_upper" as BodyRegion },
    severity: "severe" as VitalPointSeverity,
    technique: ["striking", "pressure"],
    baseAccuracy: 0.65,
    baseDamage: 15,
    baseStun: 2,
    damageMultiplier: 1.6,
  },
  {
    id: "KP002",
    name: {
      korean: "명치",
      english: "Solar Plexus",
      romanized: "Myeongchi",
    } as KoreanText,
    korean: "명치",
    english: "Solar Plexus",
    category: "torso" as VitalPointCategory,
    description: {
      korean: "가슴 중앙 바로 아래. 강타 시 호흡 곤란 및 일시적 마비 유발.",
      english:
        "Just below the center of the chest. Strong impact causes difficulty breathing and temporary paralysis.",
      romanized:
        "Gaseum jungang baro arae. Gangta si hoheup gollan mit ilsijeok mabi yubal.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP002_Effect1",
        "winded" as EffectType,
        12,
        "extreme" as EffectIntensity,
        "호흡 곤란",
        "Winded"
      ),
      createEffect(
        "KP002_Effect2",
        "paralysis" as EffectType,
        5,
        "moderate" as EffectIntensity,
        "일시적 마비",
        "Temporary Paralysis",
        true
      ),
    ],
    location: { x: 0.5, y: 0.4, region: "solar_plexus" as BodyRegion },
    severity: "critical" as VitalPointSeverity,
    technique: ["striking", "pressure"],
    baseAccuracy: 0.75,
    baseDamage: 25,
    baseStun: 3,
    damageMultiplier: 1.8,
  },
  {
    id: "KP003",
    name: {
      korean: "오금",
      english: "Hollow of Knee",
      romanized: "Ogeum",
    } as KoreanText,
    korean: "오금",
    english: "Hollow of Knee",
    category: "limbs" as VitalPointCategory,
    description: {
      korean: "무릎 뒤쪽 오목한 부분. 타격 시 다리 기능 상실 및 균형 잃음.",
      english:
        "Hollow area behind the knee. Impact causes loss of leg function and balance.",
      romanized:
        "Mureup dwijjok omokhan bubun. Tagyeok si dari gineung sangsil mit gyunhyeong il-eum.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP003_Effect1",
        "balance_loss" as EffectType,
        8,
        "strong" as EffectIntensity,
        "균형 상실",
        "Balance Loss"
      ),
      createEffect(
        "KP003_Effect2",
        "mobility_impairment" as EffectType,
        20,
        "severe" as EffectIntensity,
        "다리 기능 저하",
        "Leg Mobility Impairment"
      ),
    ],
    location: { x: 0.5, y: 0.75, region: "leg_back_knee" as BodyRegion },
    severity: "severe" as VitalPointSeverity,
    technique: ["striking", "kicking"],
    baseAccuracy: 0.7,
    baseDamage: 18,
    baseStun: 1,
    damageMultiplier: 1.5,
  },
  {
    id: "KP004",
    name: {
      korean: "관자놀이",
      english: "Temple",
      romanized: "Gwanja-nori",
    } as KoreanText,
    korean: "관자놀이",
    english: "Temple",
    category: "head" as VitalPointCategory,
    description: {
      korean:
        "머리 측면의 얇은 뼈와 신경이 집중된 부위. 강타 시 뇌진탕 및 의식 상실 유발.",
      english:
        "Thin bone and nerve concentration on the side of the head. Strong blow can cause concussion or loss of consciousness.",
      romanized:
        "Meori cheukmyeon-ui yalbeun ppyeowa singyeongi jipjungdoen buwi. Gangta si noejintang mit uisik sangsil yubal.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP004_Effect1",
        "stun" as EffectType,
        8,
        "severe" as EffectIntensity,
        "뇌진탕",
        "Concussion"
      ),
      createEffect(
        "KP004_Effect2",
        "consciousness_loss" as EffectType,
        12,
        "extreme" as EffectIntensity,
        "의식 상실",
        "Loss of Consciousness"
      ),
    ],
    location: { x: 0.15, y: 0.08, region: "head_side" as BodyRegion },
    severity: "critical" as VitalPointSeverity,
    technique: ["striking", "pressure"],
    baseAccuracy: 0.6,
    baseDamage: 30,
    baseStun: 4,
    damageMultiplier: 2.2,
  },
  {
    id: "KP005",
    name: {
      korean: "유돌",
      english: "Mastoid Process",
      romanized: "Yudol",
    } as KoreanText,
    korean: "유돌",
    english: "Mastoid Process",
    category: "head" as VitalPointCategory,
    description: {
      korean: "귀 뒤의 돌출된 뼈. 강타 시 균형 상실 및 의식 저하 유발.",
      english:
        "Bony prominence behind the ear. Strong blow can cause loss of balance and reduced consciousness.",
      romanized:
        "Gwi dwieui dolchuldoen ppyeo. Gangta si gyunhyeong sangsil mit uisik jeoha yubal.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP005_Effect1",
        "balance_loss" as EffectType,
        7,
        "strong" as EffectIntensity,
        "균형 상실",
        "Balance Loss"
      ),
      createEffect(
        "KP005_Effect2",
        "consciousness_loss" as EffectType,
        5,
        "moderate" as EffectIntensity,
        "의식 저하",
        "Reduced Consciousness"
      ),
    ],
    location: { x: 0.2, y: 0.2, region: "head_side" as BodyRegion },
    severity: "severe" as VitalPointSeverity,
    technique: ["striking", "pressure"],
    baseAccuracy: 0.6,
    baseDamage: 18,
    baseStun: 2,
    damageMultiplier: 1.7,
  },
  {
    id: "KP006",
    name: {
      korean: "경동맥",
      english: "Carotid Artery",
      romanized: "Gyeongdongmaek",
    } as KoreanText,
    korean: "경동맥",
    english: "Carotid Artery",
    category: "neck" as VitalPointCategory,
    description: {
      korean:
        "목 옆을 따라 흐르는 주요 동맥. 압박 시 의식 상실 및 뇌 손상 위험.",
      english:
        "Major artery running along the side of the neck. Compression can cause loss of consciousness and risk of brain injury.",
      romanized:
        "Mok yeopeul ttara heureuneun ju-yo dongmaek. Abbak si uisik sangsil mit noe sonsang wihyeom.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP006_Effect1",
        "consciousness_loss" as EffectType,
        10,
        "extreme" as EffectIntensity,
        "의식 상실",
        "Loss of Consciousness"
      ),
      createEffect(
        "KP006_Effect2",
        "blood_flow_restriction" as EffectType,
        15,
        "severe" as EffectIntensity,
        "혈류 제한",
        "Blood Flow Restriction"
      ),
    ],
    location: { x: 0.55, y: 0.22, region: "neck" as BodyRegion },
    severity: "critical" as VitalPointSeverity,
    technique: ["choking", "pressure"],
    baseAccuracy: 0.55,
    baseDamage: 22,
    baseStun: 3,
    damageMultiplier: 2.0,
  },
  {
    id: "KP007",
    name: {
      korean: "쇄골",
      english: "Clavicle",
      romanized: "Swaegol",
    } as KoreanText,
    korean: "쇄골",
    english: "Clavicle",
    category: "chest" as VitalPointCategory,
    description: {
      korean: "목과 어깨 사이의 뼈. 타격 시 팔 기능 저하 및 극심한 통증 유발.",
      english:
        "Bone between the neck and shoulder. Impact impairs arm function and causes severe pain.",
      romanized:
        "Mok-gwa eokkae sai-ui ppyeo. Tagyeok si pal gineung jeoha mit geuksimhan tongjeung yubal.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP007_Effect1",
        "pain_severe" as EffectType,
        10,
        "severe" as EffectIntensity,
        "극심한 통증",
        "Severe Pain"
      ),
      createEffect(
        "KP007_Effect2",
        "mobility_impairment" as EffectType,
        12,
        "strong" as EffectIntensity,
        "팔 기능 저하",
        "Arm Mobility Impairment"
      ),
    ],
    location: { x: 0.48, y: 0.28, region: "clavicle" as BodyRegion },
    severity: "severe" as VitalPointSeverity,
    technique: ["striking", "joint_lock"],
    baseAccuracy: 0.7,
    baseDamage: 16,
    baseStun: 2,
    damageMultiplier: 1.4,
  },
  {
    id: "KP008",
    name: {
      korean: "늑골",
      english: "Floating Rib",
      romanized: "Neukgol",
    } as KoreanText,
    korean: "늑골",
    english: "Floating Rib",
    category: "ribs" as VitalPointCategory,
    description: {
      korean:
        "몸통 하부의 자유롭게 움직이는 갈비뼈. 타격 시 장기 손상 및 극심한 통증 유발.",
      english:
        "Lower rib that moves freely. Impact can cause organ damage and severe pain.",
      romanized:
        "Momtong habu-ui jayurobge umjigineun galbippyeo. Tagyeok si janggi sonsang mit geuksimhan tongjeung yubal.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP008_Effect1",
        "pain_severe" as EffectType,
        12,
        "severe" as EffectIntensity,
        "극심한 통증",
        "Severe Pain"
      ),
      createEffect(
        "KP008_Effect2",
        "organ_damage" as EffectType,
        15,
        "extreme" as EffectIntensity,
        "장기 손상",
        "Organ Damage"
      ),
    ],
    location: { x: 0.6, y: 0.5, region: "floating_ribs" as BodyRegion },
    severity: "critical" as VitalPointSeverity,
    technique: ["striking", "kicking"],
    baseAccuracy: 0.6,
    baseDamage: 24,
    baseStun: 3,
    damageMultiplier: 1.9,
  },
  {
    id: "KP009",
    name: {
      korean: "팔꿈치 척골",
      english: "Ulnar Nerve (Elbow)",
      romanized: "Palkkumchi Cheokgol",
    } as KoreanText,
    korean: "팔꿈치 척골",
    english: "Ulnar Nerve (Elbow)",
    category: "arms" as VitalPointCategory,
    description: {
      korean: "팔꿈치 안쪽의 신경. 타격 시 팔 저림과 일시적 마비 유발.",
      english:
        "Nerve on the inside of the elbow. Impact causes numbness and temporary paralysis in the arm.",
      romanized:
        "Palkkumchi anjjok-ui singyeong. Tagyeok si pal jeorim-gwa ilsijeok mabi yubal.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP009_Effect1",
        "numbness" as EffectType,
        10,
        "moderate" as EffectIntensity,
        "팔 저림",
        "Arm Numbness"
      ),
      createEffect(
        "KP009_Effect2",
        "paralysis" as EffectType,
        6,
        "moderate" as EffectIntensity,
        "일시적 마비",
        "Temporary Paralysis"
      ),
    ],
    location: { x: 0.7, y: 0.35, region: "arms" as BodyRegion },
    severity: "moderate" as VitalPointSeverity,
    technique: ["striking", "joint_lock"],
    baseAccuracy: 0.8,
    baseDamage: 12,
    baseStun: 1,
    damageMultiplier: 1.3,
  },
  {
    id: "KP010",
    name: {
      korean: "아킬레스건",
      english: "Achilles Tendon",
      romanized: "Achilles Geon",
    } as KoreanText,
    korean: "아킬레스건",
    english: "Achilles Tendon",
    category: "legs" as VitalPointCategory,
    description: {
      korean:
        "발뒤꿈치와 종아리 사이의 힘줄. 절단 또는 강한 타격 시 이동 불가.",
      english:
        "Tendon between the heel and calf. Severing or strong impact disables movement.",
      romanized:
        "Baldwiggumchi-wa jongari sai-ui himjul. Jeoldan ttoneun ganghan tagyeok si idong bulga.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP010_Effect1",
        "mobility_impairment" as EffectType,
        20,
        "extreme" as EffectIntensity,
        "이동 불가",
        "Movement Disabled"
      ),
      createEffect(
        "KP010_Effect2",
        "pain_severe" as EffectType,
        10,
        "severe" as EffectIntensity,
        "극심한 통증",
        "Severe Pain"
      ),
    ],
    location: { x: 0.5, y: 0.95, region: "left_leg" as BodyRegion },
    severity: "critical" as VitalPointSeverity,
    technique: ["kicking", "striking"],
    baseAccuracy: 0.7,
    baseDamage: 20,
    baseStun: 2,
    damageMultiplier: 1.8,
  },
  // ... add more vital points as needed, following this structure
];
