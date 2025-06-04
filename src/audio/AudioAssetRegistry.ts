import type { AudioAsset, SoundEffectId, MusicId } from "../types/audio";

/**
 * Comprehensive Audio Asset Registry for Black Trigram (흑괘)
 * Korean martial arts combat simulator with authentic audio integration
 */

// Complete Sound Effects Registry - All SoundEffectId types covered
const SOUND_ASSETS: Readonly<Record<SoundEffectId, AudioAsset>> = {
  // Menu interface sounds
  menu_hover: {
    id: "menu_hover",
    category: "ui",
    basePath: "/audio/ui",
    koreanContext: {
      korean: "메뉴 호버",
      english: "Menu Hover",
      culturalNote: "Subtle traditional percussion meets cyberpunk aesthetics",
    },
    formats: ["webm", "mp3"],
    volume: 0.3,
    preload: true,
  },

  menu_select: {
    id: "menu_select",
    category: "ui",
    basePath: "/audio/ui",
    koreanContext: {
      korean: "메뉴 선택",
      english: "Menu Select",
      culturalNote: "Bamboo flute harmony with digital confirmation",
    },
    formats: ["webm", "mp3"],
    volume: 0.4,
    preload: true,
  },

  menu_back: {
    id: "menu_back",
    category: "ui",
    basePath: "/audio/ui",
    koreanContext: {
      korean: "메뉴 뒤로",
      english: "Menu Back",
      culturalNote: "Temple gong with shadow aesthetic",
    },
    formats: ["webm", "mp3"],
    volume: 0.35,
    preload: true,
  },

  // Combat attack sounds
  attack_light: {
    id: "attack_light",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "가벼운 공격",
      english: "Light Attack",
      culturalNote: "Swift precision reflecting Korean martial arts philosophy",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: true,
  },

  attack_medium: {
    id: "attack_medium",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "중간 공격",
      english: "Medium Attack",
      culturalNote: "Concentrated ki energy with focused intention",
    },
    formats: ["webm", "mp3"],
    volume: 0.6,
    preload: true,
  },

  attack_heavy: {
    id: "attack_heavy",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "강한 공격",
      english: "Heavy Attack",
      culturalNote: "Thunder force representing heavenly power (천둥벽력)",
    },
    formats: ["webm", "mp3"],
    volume: 0.7,
    preload: true,
  },

  attack_critical: {
    id: "attack_critical",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "치명타",
      english: "Critical Attack",
      culturalNote: "Perfect vital point targeting (급소격)",
    },
    formats: ["webm", "mp3"],
    volume: 0.8,
    preload: true,
  },

  // Hit impact sounds
  hit_light: {
    id: "hit_light",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "가벼운 타격",
      english: "Light Hit",
      culturalNote: "Represents a light and glancing blow",
    },
    formats: ["webm", "mp3"],
    volume: 0.4,
    preload: false,
  },

  hit_medium: {
    id: "hit_medium",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "중간 타격",
      english: "Medium Hit",
      culturalNote: "Solid impact with effective technique",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: true,
  },

  hit_heavy: {
    id: "hit_heavy",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "강한 타격",
      english: "Heavy Hit",
      culturalNote: "Devastating impact with bone-breaking force",
    },
    formats: ["webm", "mp3"],
    volume: 0.6,
    preload: true,
  },

  hit_critical: {
    id: "hit_critical",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "치명적 타격",
      english: "Critical Hit",
      culturalNote: "Perfect vital point destruction",
    },
    formats: ["webm", "mp3"],
    volume: 0.7,
    preload: true,
  },

  // Blocking and defensive sounds
  block_success: {
    id: "block_success",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "블록 성공",
      english: "Block Success",
      culturalNote: "Successful defense with resonating impact",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: true,
  },

  block_break: {
    id: "block_break",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "블록 파괴",
      english: "Block Break",
      culturalNote: "Guard broken with overwhelming force",
    },
    formats: ["webm", "mp3"],
    volume: 0.6,
    preload: true,
  },

  // Movement and stance sounds
  stance_change: {
    id: "stance_change",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "자세 변경",
      english: "Stance Change",
      culturalNote: "Eight trigram transformation (팔괘 변화)",
    },
    formats: ["webm", "mp3"],
    volume: 0.4,
    preload: true,
  },

  // Ki energy system sounds
  ki_charge: {
    id: "ki_charge",
    category: "ki_energy",
    basePath: "/audio/ki_energy",
    koreanContext: {
      korean: "기 충전",
      english: "Ki Charge",
      culturalNote: "Accumulation of internal energy (내적 에너지 축적)",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: true,
  },

  ki_release: {
    id: "ki_release",
    category: "ki_energy",
    basePath: "/audio/ki_energy",
    koreanContext: {
      korean: "기 방출",
      english: "Ki Release",
      culturalNote:
        "Explosive release of accumulated energy (에너지 폭발 방출)",
    },
    formats: ["webm", "mp3"],
    volume: 0.6,
    preload: true,
  },

  energy_pulse: {
    id: "energy_pulse",
    category: "ki_energy",
    basePath: "/audio/ki_energy",
    koreanContext: {
      korean: "에너지 파동",
      english: "Energy Pulse",
      culturalNote: "Rhythmic wave of energy reflecting trigram power",
    },
    formats: ["webm", "mp3"],
    volume: 0.4,
    preload: true,
  },

  // Match flow sounds
  match_start: {
    id: "match_start",
    category: "match",
    basePath: "/audio/match",
    koreanContext: {
      korean: "경기 시작",
      english: "Match Start",
      culturalNote: "Ceremonial start of the match with temple bell",
    },
    formats: ["webm", "mp3"],
    volume: 0.7,
    preload: true,
  },

  match_end: {
    id: "match_end",
    category: "match",
    basePath: "/audio/match",
    koreanContext: {
      korean: "경기 종료",
      english: "Match End",
      culturalNote: "Ceremonial conclusion of the match",
    },
    formats: ["webm", "mp3"],
    volume: 0.6,
    preload: true,
  },

  victory: {
    id: "victory",
    category: "match",
    basePath: "/audio/match",
    koreanContext: {
      korean: "승리",
      english: "Victory",
      culturalNote: "Triumphant resolution and honor achieved",
    },
    formats: ["webm", "mp3"],
    volume: 0.7,
    preload: false,
  },

  defeat: {
    id: "defeat",
    category: "match",
    basePath: "/audio/match",
    koreanContext: {
      korean: "패배",
      english: "Defeat",
      culturalNote:
        "Respectful acknowledgment of defeat and learning opportunity",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: false,
  },

  countdown: {
    id: "countdown",
    category: "match",
    basePath: "/audio/match",
    koreanContext: {
      korean: "카운트다운",
      english: "Countdown",
      culturalNote:
        "Match timer countdown with traditional and electronic sounds",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: true,
  },

  // Combo and special effects
  combo_buildup: {
    id: "combo_buildup",
    category: "combo",
    basePath: "/audio/combo",
    koreanContext: {
      korean: "콤보 축적",
      english: "Combo Buildup",
      culturalNote: "Rising tension and energy accumulation for combos",
    },
    formats: ["webm", "mp3"],
    volume: 0.4,
    preload: true,
  },

  combo_finish: {
    id: "combo_finish",
    category: "combo",
    basePath: "/audio/combo",
    koreanContext: {
      korean: "콤보 피니시",
      english: "Combo Finish",
      culturalNote: "Devastating conclusion to a combo with explosive release",
    },
    formats: ["webm", "mp3"],
    volume: 0.8,
    preload: true,
  },

  perfect_strike: {
    id: "perfect_strike",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "완벽한 타격",
      english: "Perfect Strike",
      culturalNote: "Flawless technique with sacred resonance",
    },
    formats: ["webm", "mp3"],
    volume: 0.9,
    preload: true,
  },

  // Status and warning sounds
  health_low: {
    id: "health_low",
    category: "status",
    basePath: "/audio/status",
    koreanContext: {
      korean: "체력 경고",
      english: "Health Low",
      culturalNote: "Critical health warning with urgent alert sounds",
    },
    formats: ["webm", "mp3"],
    volume: 0.6,
    preload: true,
  },

  stamina_depleted: {
    id: "stamina_depleted",
    category: "status",
    basePath: "/audio/status",
    koreanContext: {
      korean: "스태미나 고갈",
      english: "Stamina Depleted",
      culturalNote:
        "Exhaustion and heavy breathing indicating depleted stamina",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: true,
  },

  // Environmental and ambient effects
  dojang_ambience: {
    id: "dojang_ambience",
    category: "ambient",
    basePath: "/audio/ambient",
    koreanContext: {
      korean: "도장 환경음",
      english: "Dojang Ambience",
      culturalNote: "Peaceful atmosphere of a traditional dojang",
    },
    formats: ["webm", "mp3"],
    volume: 0.3,
    preload: false,
  },

  wind_effect: {
    id: "wind_effect",
    category: "ambient",
    basePath: "/audio/ambient",
    koreanContext: {
      korean: "바람 효과",
      english: "Wind Effect",
      culturalNote: "Atmospheric wind effects for immersion",
    },
    formats: ["webm", "mp3"],
    volume: 0.3,
    preload: false,
  },

  // Generic/misc sounds
  body_realistic_sound: {
    id: "body_realistic_sound",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "신체 효과음",
      english: "Body Realistic Sound",
      culturalNote: "Realistic sounds for body impacts and movements",
    },
    formats: ["webm", "mp3"],
    volume: 0.4,
    preload: true,
  },

  // Additional required sound effect IDs
  action_blocked: {
    id: "action_blocked",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "행동 차단",
      english: "Action Blocked",
      culturalNote: "Indicates a successful defensive action",
    },
    formats: ["webm", "mp3"],
    volume: 0.6,
    preload: false,
  },

  critical_hit: {
    id: "critical_hit",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "치명타",
      english: "Critical Hit",
      culturalNote: "Signifies a critical hit with devastating impact",
    },
    formats: ["webm", "mp3"],
    volume: 0.8,
    preload: false,
  },

  heavy_hit: {
    id: "heavy_hit",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "강한 타격",
      english: "Heavy Hit",
      culturalNote: "Indicates a heavy and powerful strike",
    },
    formats: ["webm", "mp3"],
    volume: 0.7,
    preload: false,
  },

  light_hit: {
    id: "light_hit",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "가벼운 타격",
      english: "Light Hit",
      culturalNote: "Represents a light and glancing blow",
    },
    formats: ["webm", "mp3"],
    volume: 0.4,
    preload: false,
  },

  stance_select: {
    id: "stance_select",
    category: "ui",
    basePath: "/audio/ui",
    koreanContext: {
      korean: "자세 선택",
      english: "Stance Select",
      culturalNote: "Selection of stance with trigram activation",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: true,
  },

  technique_execute: {
    id: "technique_execute",
    category: "combat",
    basePath: "/audio/combat",
    koreanContext: {
      korean: "기술 실행",
      english: "Technique Execute",
      culturalNote: "Precise execution of martial arts techniques",
    },
    formats: ["webm", "mp3"],
    volume: 0.6,
    preload: false,
  },
} as const;

// Complete Music Registry - All MusicId types covered
const MUSIC_ASSETS: Readonly<Record<MusicId, AudioAsset>> = {
  combat_theme: {
    id: "combat_theme",
    category: "music",
    basePath: "/audio/music",
    koreanContext: {
      korean: "전투 테마",
      english: "Combat Theme",
      culturalNote: "Traditional Korean percussion with modern combat energy",
    },
    formats: ["webm", "mp3"],
    volume: 0.6,
    preload: false,
    loop: true,
  },

  menu_theme: {
    id: "menu_theme",
    category: "music",
    basePath: "/audio/music",
    koreanContext: {
      korean: "메뉴 테마",
      english: "Menu Theme",
      culturalNote: "Cyberpunk fusion with Korean traditional elements",
    },
    formats: ["webm", "mp3"],
    volume: 0.4,
    preload: true,
    loop: true,
  },

  training_theme: {
    id: "training_theme",
    category: "music",
    basePath: "/audio/music",
    koreanContext: {
      korean: "수련 테마",
      english: "Training Theme",
      culturalNote: "Traditional learning atmosphere for martial arts practice",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: false,
    loop: true,
  },

  intro_theme: {
    id: "intro_theme",
    category: "music",
    basePath: "/audio/music",
    koreanContext: {
      korean: "인트로 테마",
      english: "Intro Theme",
      culturalNote:
        "Meditative atmosphere reflecting Korean martial philosophy",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: false,
    loop: true,
  },

  victory_theme: {
    id: "victory_theme",
    category: "music",
    basePath: "/audio/music",
    koreanContext: {
      korean: "승리 테마",
      english: "Victory Theme",
      culturalNote: "Honor achieved through martial arts mastery",
    },
    formats: ["webm", "mp3"],
    volume: 0.7,
    preload: false,
    loop: false,
  },

  ambient_dojang: {
    id: "ambient_dojang",
    category: "music",
    basePath: "/audio/music",
    koreanContext: {
      korean: "도장 환경음",
      english: "Dojang Ambience",
      culturalNote:
        "Underground training hall with traditional Korean atmosphere",
    },
    formats: ["webm", "mp3"],
    volume: 0.3,
    preload: false,
    loop: true,
  },
} as const;

// Combine all assets into registry
export const AUDIO_ASSET_REGISTRY: Readonly<Record<string, AudioAsset>> = {
  ...SOUND_ASSETS,
  ...MUSIC_ASSETS,
} as const;

// Asset lookup utilities
export function getSoundAsset(id: SoundEffectId): AudioAsset | undefined {
  return SOUND_ASSETS[id];
}

export function getMusicAsset(id: MusicId): AudioAsset | undefined {
  return MUSIC_ASSETS[id];
}

export function getAllSoundAssets(): Record<SoundEffectId, AudioAsset> {
  return SOUND_ASSETS;
}

export function getAllMusicAssets(): Record<MusicId, AudioAsset> {
  return MUSIC_ASSETS;
}

// Asset validation
export function validateAudioAssets(): {
  soundAssets: { valid: number; total: number };
  musicAssets: { valid: number; total: number };
  errors: string[];
} {
  const errors: string[] = [];
  let validSounds = 0;
  let validMusic = 0;

  // Validate sound assets
  Object.entries(SOUND_ASSETS).forEach(([id, asset]) => {
    if (asset.id === id && asset.category && asset.formats.length > 0) {
      validSounds++;
    } else {
      errors.push(`Invalid sound asset: ${id}`);
    }
  });

  // Validate music assets
  Object.entries(MUSIC_ASSETS).forEach(([id, asset]) => {
    if (asset.id === id && asset.category && asset.formats.length > 0) {
      validMusic++;
    } else {
      errors.push(`Invalid music asset: ${id}`);
    }
  });

  return {
    soundAssets: {
      valid: validSounds,
      total: Object.keys(SOUND_ASSETS).length,
    },
    musicAssets: { valid: validMusic, total: Object.keys(MUSIC_ASSETS).length },
    errors,
  };
}
