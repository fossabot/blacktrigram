import type {
  AudioAssetRegistry,
  AudioAsset,
  SoundEffectId,
  MusicTrackId,
} from "../types/audio";
import { constructAudioUrl } from "./AudioUtils"; // Assuming AudioUtils is in the same directory or path is correct

// Helper to create asset data with less repetition
const createAsset = (
  id: string,
  basePathSuffix: string,
  korean: string,
  english: string,
  category: AudioAsset["category"], // Added category parameter
  isMusic: boolean = false,
  volume: number = 0.7,
  loop: boolean = false,
  preload: boolean = true
): AudioAsset => {
  const assetData = {
    id,
    basePath: `assets/audio/${basePathSuffix}`, // Example base path structure
    koreanContext: { korean, english },
    formats: ["webm", "mp3"] as ("webm" | "mp3")[],
    volume,
    preload,
    loop: isMusic ? loop || true : loop, // Music often loops by default
    category, // Assign category
  };
  // The URL will be constructed by Howler or dynamically if needed,
  // but if required by AudioAsset, construct one format as a placeholder/default.
  // This specific URL construction might vary based on how AudioUtils.getPreferredFormat and Howler work.
  // For placeholder-sounds, we might not need to resolve the full URL here if Howler does it.
  // However, if AudioAsset requires 'url', we provide one.
  // The error was in constructAudioUrl call, let's assume it's:
  // constructAudioUrl(basePath: string, fileName: string, format: AudioFormat | null, variant?: string)
  // For a generic URL, we can pick the first format.
  const exampleUrl = constructAudioUrl(
    assetData.basePath,
    assetData.id,
    assetData.formats[0]
  );

  return { ...assetData, url: exampleUrl };
};

// Define SFX assets
const sfxAssets: Record<SoundEffectId, AudioAsset> = {
  menu_hover: createAsset(
    "menu_hover",
    "sfx/ui",
    "메뉴 호버",
    "Menu Hover",
    "ui",
    false,
    0.5
  ),
  menu_select: createAsset(
    "menu_select",
    "sfx/ui",
    "메뉴 선택",
    "Menu Select",
    "ui",
    false,
    0.6
  ),
  menu_back: createAsset(
    "menu_back",
    "sfx/ui",
    "메뉴 뒤로",
    "Menu Back",
    "ui",
    false,
    0.5
  ),

  attack_light: createAsset(
    "attack_light",
    "sfx/combat",
    "가벼운 공격",
    "Light Attack",
    "combat"
  ),
  attack_medium: createAsset(
    "attack_medium",
    "sfx/combat",
    "중간 공격",
    "Medium Attack",
    "combat"
  ),
  attack_heavy: createAsset(
    "attack_heavy",
    "sfx/combat",
    "강한 공격",
    "Heavy Attack",
    "combat"
  ),
  attack_critical: createAsset(
    "attack_critical",
    "sfx/combat",
    "치명적 공격",
    "Critical Attack",
    "combat",
    false,
    0.8
  ),

  hit_light: createAsset(
    "hit_light",
    "sfx/combat",
    "가벼운 타격",
    "Light Hit",
    "combat"
  ),
  hit_medium: createAsset(
    "hit_medium",
    "sfx/combat",
    "중간 타격",
    "Medium Hit",
    "combat"
  ),
  hit_heavy: createAsset(
    "hit_heavy",
    "sfx/combat",
    "강한 타격",
    "Heavy Hit",
    "combat"
  ),
  hit_critical: createAsset(
    "hit_critical",
    "sfx/combat",
    "치명적 타격",
    "Critical Hit",
    "combat",
    false,
    0.9
  ),

  critical_hit: createAsset(
    "critical_hit",
    "sfx/combat",
    "치명타",
    "Critical Hit Sound",
    "combat",
    false,
    0.9
  ), // Duplicate of hit_critical?
  heavy_hit: createAsset(
    "heavy_hit",
    "sfx/combat",
    "강타",
    "Heavy Hit Sound",
    "combat"
  ), // Duplicate of hit_heavy?
  light_hit: createAsset(
    "light_hit",
    "sfx/combat",
    "경타",
    "Light Hit Sound",
    "combat"
  ), // Duplicate of hit_light?

  block_success: createAsset(
    "block_success",
    "sfx/combat",
    "방어 성공",
    "Block Success",
    "combat"
  ),
  block_break: createAsset(
    "block_break",
    "sfx/combat",
    "방어 파괴",
    "Block Break",
    "combat",
    false,
    0.8
  ),
  action_blocked: createAsset(
    "action_blocked",
    "sfx/combat",
    "행동 방해됨",
    "Action Blocked",
    "combat"
  ),

  stance_change: createAsset(
    "stance_change",
    "sfx/combat",
    "자세 변경",
    "Stance Change",
    "combat"
  ),
  stance_select: createAsset(
    "stance_select",
    "sfx/ui",
    "자세 선택",
    "Stance Select",
    "ui"
  ),
  technique_execute: createAsset(
    "technique_execute",
    "sfx/combat",
    "기술 실행",
    "Technique Execute",
    "combat"
  ),

  ki_charge: createAsset(
    "ki_charge",
    "sfx/combat/ki",
    "기 충전",
    "Ki Charge",
    "ki_energy"
  ),
  ki_release: createAsset(
    "ki_release",
    "sfx/combat/ki",
    "기 방출",
    "Ki Release",
    "ki_energy"
  ),
  energy_pulse: createAsset(
    "energy_pulse",
    "sfx/combat/ki",
    "에너지 파동",
    "Energy Pulse",
    "ki_energy"
  ),

  match_start: createAsset(
    "match_start",
    "sfx/match",
    "경기 시작",
    "Match Start",
    "match",
    false,
    0.8
  ),
  match_end: createAsset(
    "match_end",
    "sfx/match",
    "경기 종료",
    "Match End",
    "match",
    false,
    0.8
  ),
  combat_end: createAsset(
    "combat_end",
    "sfx/match",
    "전투 종료",
    "Combat End",
    "match",
    false,
    0.8
  ),
  victory: createAsset(
    "victory",
    "sfx/match",
    "승리",
    "Victory",
    "match",
    false,
    0.9
  ),
  defeat: createAsset(
    "defeat",
    "sfx/match",
    "패배",
    "Defeat",
    "match",
    false,
    0.7
  ),
  countdown: createAsset(
    "countdown",
    "sfx/match",
    "카운트다운",
    "Countdown",
    "match",
    false,
    0.6
  ),

  miss: createAsset(
    "miss",
    "sfx/combat",
    "빗나감",
    "Miss",
    "combat",
    false,
    0.4
  ),
  guard: createAsset(
    "guard",
    "sfx/combat",
    "가드",
    "Guard",
    "combat",
    false,
    0.6
  ),
  technique: createAsset(
    "technique",
    "sfx/combat",
    "특수 기술",
    "Technique Sound",
    "combat",
    false,
    0.7
  ),

  combo_buildup: createAsset(
    "combo_buildup",
    "sfx/combat/combo",
    "콤보 빌드업",
    "Combo Buildup",
    "combo"
  ),
  combo_finish: createAsset(
    "combo_finish",
    "sfx/combat/combo",
    "콤보 마무리",
    "Combo Finish",
    "combo",
    false,
    0.8
  ),
  perfect_strike: createAsset(
    "perfect_strike",
    "sfx/combat/combo",
    "완벽한 일격",
    "Perfect Strike",
    "combo",
    false,
    0.9
  ),

  health_low: createAsset(
    "health_low",
    "sfx/status",
    "체력 낮음",
    "Health Low",
    "status",
    false,
    0.7
  ),
  stamina_depleted: createAsset(
    "stamina_depleted",
    "sfx/status",
    "스태미나 고갈",
    "Stamina Depleted",
    "status",
    false,
    0.7
  ),

  dojang_ambience: createAsset(
    "dojang_ambience",
    "ambient",
    "도장 주변음",
    "Dojang Ambience",
    "ambient",
    true,
    0.3,
    true
  ), // Loop ambient sounds
  wind_effect: createAsset(
    "wind_effect",
    "ambient",
    "바람 소리",
    "Wind Effect",
    "ambient",
    true,
    0.4,
    true
  ),

  body_realistic_sound: createAsset(
    "body_realistic_sound",
    "sfx/combat/realistic",
    "사실적인 몸체 소리",
    "Realistic Body Sound",
    "combat"
  ),
};

// Define Music assets
const musicAssets: Record<MusicTrackId, AudioAsset> = {
  combat_theme: createAsset(
    "combat_theme",
    "music",
    "전투 테마",
    "Combat Theme",
    "music",
    true,
    0.5,
    true
  ),
  menu_theme: createAsset(
    "menu_theme",
    "music",
    "메인 메뉴 테마",
    "Main Menu Theme",
    "music",
    true,
    0.4,
    true
  ),
  training_theme: createAsset(
    "training_theme",
    "music",
    "훈련 테마",
    "Training Theme",
    "music",
    true,
    0.45,
    true
  ),
  intro_theme: createAsset(
    "intro_theme",
    "music",
    "소개 테마",
    "Intro Theme",
    "music",
    true,
    0.4,
    true
  ),
  victory_theme: createAsset(
    "victory_theme",
    "music",
    "승리 테마",
    "Victory Theme",
    "music",
    true,
    0.6,
    false
  ), // Victory usually doesn't loop
  ambient_dojang: createAsset(
    "ambient_dojang",
    "music",
    "도장 배경 음악",
    "Ambient Dojang Music",
    "ambient",
    true,
    0.3,
    true
  ),
};

export const PLACEHOLDER_AUDIO_ASSETS: AudioAssetRegistry = {
  sfx: sfxAssets,
  music: musicAssets,
};

// Example of how constructAudioUrl was likely intended to be used if url was not part of createAsset
// This is for reference, the createAsset helper now includes a basic URL.
export const getExampleSfxUrl = (
  id: SoundEffectId,
  format: "webm" | "mp3"
): string => {
  const asset = sfxAssets[id];
  if (!asset) throw new Error(`SFX asset ${id} not found`);
  // Original problematic call: constructAudioUrl(asset, format)
  // Corrected call:
  return constructAudioUrl(asset.basePath, asset.id, format);
};

export const getExampleMusicUrl = (
  id: MusicTrackId,
  format: "webm" | "mp3"
): string => {
  const asset = musicAssets[id];
  if (!asset) throw new Error(`Music asset ${id} not found`);
  // Original problematic call: constructAudioUrl(asset, format)
  // Corrected call:
  return constructAudioUrl(asset.basePath, asset.id, format);
};
