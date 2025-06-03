import type {
  AudioAsset,
  AudioAssetRegistry,
  AudioCategory,
  SoundEffectId,
  MusicTrackId,
} from "../types/audio";

// Audio asset registry matching actual file structure
export const AUDIO_ASSET_REGISTRY: AudioAssetRegistry = {
  sfx: {
    // Menu Interface Sounds (variants 1-8 available)
    menu_hover: {
      id: "menu_hover",
      category: "sfx",
      basePath: "public/assets/audio/sfx/menu/menu_hover",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.3,
      preload: true,
      description: "Subtle wood block tap - traditional Korean percussion",
      koreanContext: "메뉴 호버 - 전통 타악기 소리",
    },
    menu_select: {
      id: "menu_select",
      category: "sfx",
      basePath: "public/assets/audio/sfx/menu/menu_select",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4", "5", "6", "7", "8"], // Based on actual files
      volume: 0.5,
      preload: true,
      description: "Bamboo flute note - decisive selection",
      koreanContext: "메뉴 선택 - 대나무 피리 소리",
    },
    menu_back: {
      id: "menu_back",
      category: "sfx",
      basePath: "public/assets/audio/sfx/menu/menu_back",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.4,
      preload: true,
      description: "Soft gong resonance - returning to previous state",
      koreanContext: "메뉴 뒤로 - 부드러운 징 소리",
    },
    menu_navigate: {
      id: "menu_navigate",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/menu_navigate",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.35,
      preload: true,
      description: "Interface navigation sound - subtle click/swoosh",
      koreanContext: "메뉴 탐색 - 인터페이스 소리",
    },
    menu_click: {
      id: "menu_click",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/menu_click",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.45,
      preload: true,
      description: "Interface click confirmation sound",
      koreanContext: "메뉴 클릭 - 확인 소리",
    },

    // Combat Attack Sounds (variants available)
    attack_light: {
      id: "attack_light",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_light",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.5,
      preload: true,
      description: "Swift air cut - precise light strike",
      koreanContext: "가벼운 공격 - 정밀한 타격",
    },
    attack_medium: {
      id: "attack_medium",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_medium",
      formats: ["webm", "mp3"],
      variants: ["1", "3", "4"], // Based on actual files (missing 2)
      volume: 0.6,
      preload: true,
      description: "Focused energy release - medium power",
      koreanContext: "중간 공격 - 집중된 기력",
    },
    attack_heavy: {
      id: "attack_heavy",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_heavy",
      formats: ["webm", "mp3"],
      volume: 0.8,
      preload: true,
      description: "Thunderous impact - maximum force",
      koreanContext: "강한 공격 - 최대 위력",
    },
    attack_critical: {
      id: "attack_critical",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_critical",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.9,
      preload: true,
      description: "Perfect vital point strike - devastating precision",
      koreanContext: "치명타 - 급소 타격",
    },
    attack_punch_light: {
      id: "attack_punch_light",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_punch_light",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4", "5", "6", "7", "8"], // Based on actual files
      volume: 0.55,
      preload: true,
      description: "Quick, sharp punch impact - light",
      koreanContext: "가벼운 주먹 공격",
    },
    attack_punch_medium: {
      id: "attack_punch_medium",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_punch_medium",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.65,
      preload: true,
      description: "Solid punch impact - medium",
      koreanContext: "중간 주먹 공격",
    },
    attack_special_geon: {
      id: "attack_special_geon",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_special_geon",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.85,
      preload: true,
      description: "Geon trigram special technique sound",
      koreanContext: "건괘 특수 기법",
    },
    // Add missing special attack sounds for all trigrams
    attack_special_tae: {
      id: "attack_special_tae",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_special_tae",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"],
      volume: 0.85,
      preload: true,
      description: "Tae trigram special technique sound",
      koreanContext: "태괘 특수 기법",
    },
    attack_special_li: {
      id: "attack_special_li",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_special_li",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"],
      volume: 0.85,
      preload: true,
      description: "Li trigram special technique sound",
      koreanContext: "리괘 특수 기법",
    },
    attack_special_jin: {
      id: "attack_special_jin",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_special_jin",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"],
      volume: 0.85,
      preload: true,
      description: "Jin trigram special technique sound",
      koreanContext: "진괘 특수 기법",
    },
    attack_special_son: {
      id: "attack_special_son",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_special_son",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"],
      volume: 0.85,
      preload: true,
      description: "Son trigram special technique sound",
      koreanContext: "손괘 특수 기법",
    },
    attack_special_gam: {
      id: "attack_special_gam",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_special_gam",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"],
      volume: 0.85,
      preload: true,
      description: "Gam trigram special technique sound",
      koreanContext: "감괘 특수 기법",
    },
    attack_special_gan: {
      id: "attack_special_gan",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_special_gan",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"],
      volume: 0.85,
      preload: true,
      description: "Gan trigram special technique sound",
      koreanContext: "간괘 특수 기법",
    },
    attack_special_gon: {
      id: "attack_special_gon",
      category: "sfx",
      basePath: "public/assets/audio/sfx/combat/attack_special_gon",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"],
      volume: 0.85,
      preload: true,
      description: "Gon trigram special technique sound",
      koreanContext: "곤괘 특수 기법",
    },

    // Hit Impact Sounds (variants available)
    hit_light: {
      id: "hit_light",
      category: "sfx",
      basePath: "public/assets/audio/sfx/hits/hit_light",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.5,
      preload: true,
      description: "Light contact - glancing blow",
      koreanContext: "가벼운 타격 - 스치는 타격",
    },
    hit_medium: {
      id: "hit_medium",
      category: "sfx",
      basePath: "public/assets/audio/sfx/hits/hit_medium",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.6,
      preload: true,
      description: "Solid impact - effective strike",
      koreanContext: "중간 타격 - 효과적인 타격",
    },
    hit_heavy: {
      id: "hit_heavy",
      category: "sfx",
      basePath: "public/assets/audio/sfx/hits/hit_heavy",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.8,
      preload: true,
      description: "Devastating blow - severe damage",
      koreanContext: "강한 타격 - 심각한 피해",
    },
    hit_critical: {
      id: "hit_critical",
      category: "sfx",
      basePath: "public/assets/audio/sfx/hits/hit_critical",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.9,
      preload: true,
      description: "Vital point struck - critical damage",
      koreanContext: "급소 타격 - 치명적 피해",
    },
    hit_flesh: {
      id: "hit_flesh",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/hit_flesh",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.6,
      preload: true,
      description: "Impact sound on flesh",
      koreanContext: "육체 타격음",
    },
    hit_block: {
      id: "hit_block",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/hit_block",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.65,
      preload: true,
      description: "Sound of an attack hitting a block",
      koreanContext: "막기 타격음",
    },

    // Blocking and Defensive Sounds (variants available)
    block_success: {
      id: "block_success",
      category: "sfx",
      basePath: "public/assets/audio/sfx/blocks/block_success",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.6,
      preload: true,
      description: "Solid defensive contact - successful block",
      koreanContext: "성공적인 막기",
    },
    block_break: {
      id: "block_break",
      category: "sfx",
      basePath: "public/assets/audio/sfx/blocks/block_break",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.7,
      preload: true,
      description: "Defense shattered - guard broken",
      koreanContext: "막기 파괴 - 가드 붕괴",
    },

    // Movement and Stance Sounds (variants available)
    stance_change: {
      id: "stance_change",
      category: "sfx",
      basePath: "public/assets/audio/sfx/movement/stance_change",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.4,
      preload: true,
      description: "Trigram transition + energy wave",
      koreanContext: "팔괘 자세 변환",
    },
    footstep: {
      id: "footstep",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/footstep",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.3,
      preload: true,
      description: "Soft dojang floor contact",
      koreanContext: "도장 발소리",
    },
    dodge: {
      id: "dodge",
      category: "sfx",
      basePath: "public/assets/audio/sfx/movement/dodge",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4", "5", "6", "7", "8"], // Based on actual files
      volume: 0.4,
      preload: true,
      description: "Quick air displacement - evasive movement",
      koreanContext: "회피 동작",
    },

    // Ki Energy System Sounds (variants available)
    ki_charge: {
      id: "ki_charge",
      category: "sfx",
      basePath: "public/assets/audio/sfx/ki_energy/ki_charge",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.5,
      loop: true,
      preload: true,
      description: "Building internal energy - ki accumulation",
      koreanContext: "기 충전 - 내공 축적",
    },
    ki_release: {
      id: "ki_release",
      category: "sfx",
      basePath: "public/assets/audio/sfx/ki_energy/ki_release",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.7,
      preload: true,
      description: "Explosive energy release - ki burst",
      koreanContext: "기 방출 - 기력 폭발",
    },
    energy_pulse: {
      id: "energy_pulse",
      category: "sfx",
      basePath: "public/assets/audio/sfx/ki_energy/energy_pulse",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.4,
      preload: true,
      description: "Rhythmic energy wave - trigram power",
      koreanContext: "에너지 파동 - 팔괘 힘",
    },

    // Match Flow Sounds (variants available)
    match_start: {
      id: "match_start",
      category: "sfx",
      basePath: "public/assets/audio/sfx/match/match_start",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.8,
      preload: true,
      description: "Temple bell strike - beginning of combat",
      koreanContext: "경기 시작 - 사원 종소리",
    },
    match_end: {
      id: "match_end",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/match_end",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.7,
      preload: true,
      description: "Ceremonial gong - end of combat",
      koreanContext: "경기 종료 - 의식용 징",
    },
    victory: {
      id: "victory",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/victory",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.9,
      preload: true,
      description: "Triumphant Korean traditional music chord",
      koreanContext: "승리 - 전통 음악 화음",
    },
    defeat: {
      id: "defeat",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/defeat",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.6,
      preload: true,
      description: "Somber traditional melody - learning from defeat",
      koreanContext: "패배 - 전통적 애조 선율",
    },
    countdown: {
      id: "countdown",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/countdown",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.6,
      preload: true,
      description: "Rhythmic drum beat - building tension",
      koreanContext: "카운트다운 - 장단 북소리",
    },

    // Combo and Special Effects (variants available)
    combo_buildup: {
      id: "combo_buildup",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/combo_buildup",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.6,
      preload: true,
      description: "Rising tension - combo building",
      koreanContext: "연속기 축적",
    },
    combo_finish: {
      id: "combo_finish",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/combo_finish",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.8,
      preload: true,
      description: "Explosive finale - combo completion",
      koreanContext: "연속기 완성",
    },
    perfect_strike: {
      id: "perfect_strike",
      category: "sfx",
      basePath: "public/assets/audio/sfx/special/perfect_strike",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.9,
      preload: true,
      description: "Flawless technique - perfect execution",
      koreanContext: "완벽한 기법 - 완벽한 실행",
    },

    // Status and Warning Sounds (variants available)
    health_low: {
      id: "health_low",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/health_low",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.5,
      loop: true,
      preload: true,
      description: "Heartbeat intensifying - low health warning",
      koreanContext: "체력 부족 경고",
    },
    stamina_depleted: {
      id: "stamina_depleted",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/stamina_depleted",
      formats: ["webm", "mp3"],
      variants: ["1", "2", "3", "4"], // Based on actual files
      volume: 0.4,
      preload: true,
      description: "Heavy breathing - exhaustion",
      koreanContext: "체력 고갈 - 피로",
    },

    // Environmental and Ambient Effects (placeholder for future)
    dojang_ambience: {
      id: "dojang_ambience",
      category: "sfx",
      basePath: "public/assets/audio/sfx/environment/dojang_ambience",
      formats: ["webm", "mp3"],
      volume: 0.3,
      loop: true,
      preload: true,
      description: "Peaceful dojang atmosphere - meditation space",
      koreanContext: "도장 분위기 - 명상 공간",
    },
    wind_effect: {
      id: "wind_effect",
      category: "sfx",
      basePath: "public/assets/audio/sfx/environment/wind_effect",
      formats: ["webm", "mp3"],
      volume: 0.2,
      loop: true,
      preload: true,
      description: "Gentle wind through dojang - natural harmony",
      koreanContext: "도장을 지나는 바람 - 자연의 조화",
    },

    // Generic/misc sounds (variants available)
    body_realistic_sound: {
      id: "body_realistic_sound",
      category: "sfx",
      basePath: "public/assets/audio/sfx/misc/body_realistic_sound",
      formats: ["webm", "mp3"],
      variants: ["1"], // Based on actual files
      volume: 0.7,
      preload: true,
      description: "Generic realistic body impact or movement sound",
      koreanContext: "현실적인 몸 충격 소리",
    },
  },

  music: {
    intro_theme: {
      id: "intro_theme",
      category: "music",
      basePath: "public/assets/audio/music/intro_theme",
      formats: ["webm", "mp3"], // Only MP3 and WebM
      volume: 0.6,
      loop: true,
      preload: true,
      description:
        "Contemplative Korean traditional music - setting the philosophical mood",
      koreanContext: "철학적 분위기 - 한국 전통 음악",
    },
    menu_theme: {
      id: "menu_theme",
      category: "music",
      basePath: "public/assets/audio/music/menu_theme",
      formats: ["webm", "mp3"], // Only MP3 and WebM
      volume: 0.5,
      loop: true,
      preload: true,
      description: "Traditional Korean melody - menu ambiance",
      koreanContext: "메뉴 분위기 - 전통 한국 선율",
    },
    combat_theme: {
      id: "combat_theme",
      category: "music",
      basePath: "public/assets/audio/music/combat_theme",
      formats: ["webm", "mp3"], // Only MP3 and WebM
      volume: 0.5,
      loop: true,
      preload: true,
      description: "Intense rhythmic composition - driving combat energy",
      koreanContext: "격렬한 전투 에너지",
    },
    victory_theme: {
      id: "victory_theme",
      category: "music",
      basePath: "public/assets/audio/music/victory_theme",
      formats: ["webm", "mp3"], // Only MP3 and WebM
      volume: 0.7,
      loop: false,
      preload: true,
      description: "Triumphant melody - celebrating martial mastery",
      koreanContext: "승리 선율 - 무술 숙련도 축하",
    },
    training_theme: {
      id: "training_theme",
      category: "music",
      basePath: "public/assets/audio/music/training_theme",
      formats: ["webm", "mp3"], // Only MP3 and WebM
      volume: 0.4,
      loop: true,
      preload: true,
      description: "Focused meditation music - disciplined practice",
      koreanContext: "수련 음악 - 규율적 연습",
    },
    meditation_theme: {
      id: "meditation_theme",
      category: "music",
      basePath: "public/assets/audio/music/meditation_theme",
      formats: ["webm", "mp3"], // Only MP3 and WebM
      volume: 0.3,
      loop: true,
      preload: true,
      description: "Deep contemplative sounds - inner harmony",
      koreanContext: "명상 음악 - 내적 조화",
    },
  },
};

// Utility functions for audio asset management
export class AudioAssetUtils {
  // Get file paths for an audio asset with format fallbacks
  static getAssetPaths(asset: AudioAsset): string[] {
    return asset.formats.map((format) => `${asset.basePath}.${format}`);
  }

  // Get variant path for specific variant and format
  static getVariantPath(
    asset: AudioAsset,
    variant: string,
    format: string
  ): string {
    return `${asset.basePath}_${variant}.${format}`;
  }

  // Get all assets by category
  static getAssetsByCategory(category: AudioCategory): AudioAsset[] {
    if (category === "music") {
      return Object.values(AUDIO_ASSET_REGISTRY.music);
    } else {
      return Object.values(AUDIO_ASSET_REGISTRY.sfx).filter(
        (asset) => asset.category === category
      );
    }
  }

  // Get asset by ID
  static getAssetById(id: string): AudioAsset | undefined {
    return (
      AUDIO_ASSET_REGISTRY.sfx[id as SoundEffectId] ||
      AUDIO_ASSET_REGISTRY.music[id as MusicTrackId]
    );
  }

  // Get all preloadable assets
  static getPreloadableAssets(): AudioAsset[] {
    const allAssets = [
      ...Object.values(AUDIO_ASSET_REGISTRY.sfx),
      ...Object.values(AUDIO_ASSET_REGISTRY.music),
    ];
    return allAssets.filter((asset) => asset.preload);
  }
}
