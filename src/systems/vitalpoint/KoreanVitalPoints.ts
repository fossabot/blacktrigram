import type { VitalPoint } from "../../types";

export const KOREAN_VITAL_POINTS_DATA: Record<string, VitalPoint> = {
  in_jung: {
    id: "in_jung",
    name: { korean: "인중", english: "Philtrum", chinese: "人中" },
    koreanName: "인중 (Injung)",
    position: { x: 0, y: -70 }, // Example position relative to a character model center/head
    region: "head",
    difficulty: 0.8,
    damageMultiplier: 2.5,
    effects: [
      {
        type: "consciousness_loss",
        duration: 5000,
        magnitude: 0.8,
        chance: 0.7,
        source: "in_jung_hit",
      },
      {
        type: "disorientation",
        duration: 10000,
        magnitude: 1.0,
        chance: 0.9,
        source: "in_jung_hit",
      },
    ],
    category: "nerve",
    description: {
      korean:
        "코와 윗입술 사이의 급소. 강타 시 의식 불명 또는 방향 감각 상실을 유발할 수 있음.",
      english:
        "Vital point between the nose and upper lip. A strong hit can cause unconsciousness or disorientation.",
    },
    meridian: "GV", // Governor Vessel
  },
  myung_chi: {
    id: "myung_chi",
    name: { korean: "명치", english: "Solar Plexus", chinese: "鸠尾" },
    koreanName: "명치 (Myungchi)",
    position: { x: 0, y: -20 }, // Example position
    region: "torso",
    difficulty: 0.6,
    damageMultiplier: 2.0,
    effects: [
      {
        type: "winded",
        duration: 8000,
        magnitude: 1.0,
        chance: 0.85,
        source: "myung_chi_hit",
      },
      {
        type: "pain_severe",
        duration: 12000,
        magnitude: 0.7,
        chance: 0.75,
        source: "myung_chi_hit",
      },
    ],
    category: "organ", // Related to diaphragm and internal organs
    description: {
      korean:
        "가슴 중앙 바로 아래 오목한 부분. 강타 시 호흡 곤란 및 극심한 고통 유발.",
      english:
        "Hollow spot just below the center of the chest. A strong hit causes difficulty breathing and severe pain.",
    },
    meridian: "CV", // Conception Vessel
  },
  // Add more vital points here following the VitalPoint interface
  // For example, a joint-related vital point:
  oh_geum: {
    id: "oh_geum",
    name: { korean: "오금", english: "Hollow of Knee", chinese: "委中" },
    koreanName: "오금 (Ohgeum)",
    position: { x: 0, y: 80 }, // Example position for back of knee
    region: "legs",
    difficulty: 0.5,
    damageMultiplier: 1.8,
    effects: [
      {
        type: "balance_loss",
        duration: 3000,
        magnitude: 0.9,
        chance: 0.9,
        source: "oh_geum_hit",
      },
      {
        type: "mobility_impairment",
        duration: 7000,
        magnitude: 0.6,
        chance: 0.7,
        source: "oh_geum_hit",
      },
    ],
    category: "joint",
    description: {
      korean:
        "무릎 뒤쪽 오목한 부분. 타격 시 균형 상실 및 일시적 다리 사용 불능 유발.",
      english:
        "Hollow area at the back of the knee. A strike can cause loss of balance and temporary leg immobility.",
    },
    meridian: "BL", // Bladder Meridian
  },
};
