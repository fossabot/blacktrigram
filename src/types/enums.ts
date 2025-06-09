// Core enumerations for Black Trigram Korean martial arts game

// Player archetypes representing different martial arts philosophies
export enum PlayerArchetype {
  MUSA = "musa", // 무사 - Traditional Warrior
  AMSALJA = "amsalja", // 암살자 - Shadow Assassin
  HACKER = "hacker", // 해커 - Cyber Warrior
  JEONGBO_YOWON = "jeongbo_yowon", // 정보요원 - Intelligence Operative
  JOJIK_POKRYEOKBAE = "jojik_pokryeokbae", // 조직폭력배 - Organized Crime
}

// Eight trigram stances based on I Ching
export enum TrigramStance {
  GEON = "geon", // 건 ☰ - Heaven
  TAE = "tae", // 태 ☱ - Lake
  LI = "li", // 리 ☲ - Fire
  JIN = "jin", // 진 ☳ - Thunder
  SON = "son", // 손 ☴ - Wind
  GAM = "gam", // 감 ☵ - Water
  GAN = "gan", // 간 ☶ - Mountain
  GON = "gon", // 곤 ☷ - Earth
}

// Game modes for different play styles
export enum GameMode {
  TRAINING = "training", // 훈련 - Training mode
  SPARRING = "sparring", // 대련 - Practice combat
  TOURNAMENT = "tournament", // 토너먼트 - Competitive play
  STORY = "story", // 스토리 - Story campaign
  VERSUS = "versus", // 대전 - Player vs Player
  SURVIVAL = "survival", // 생존 - Endless combat
}

// Combat attack types for techniques
export enum EnumCombatAttackType {
  STRIKE = "strike", // 타격 - Direct strikes
  THRUST = "thrust", // 찌르기 - Thrusting attacks
  BLOCK = "block", // 막기 - Defensive blocks
  COUNTER_ATTACK = "counter_attack", // 반격 - Counter attacks
  THROW = "throw", // 던지기 - Throwing techniques
  GRAPPLE = "grapple", // 잡기 - Grappling moves
  PRESSURE_POINT = "pressure_point", // 혈점 - Vital point strikes
  NERVE_STRIKE = "nerve_strike", // 신경타격 - Nerve attacks
}

// Damage types for combat calculation
export enum DamageType {
  PHYSICAL = "physical", // 물리 - Physical damage
  ENERGY = "energy", // 기력 - Ki/energy damage
  MENTAL = "mental", // 정신 - Mental/psychological
  VITAL_POINT = "vital_point", // 급소 - Vital point damage
  ELEMENTAL = "elemental", // 원소 - Elemental damage
}

// Combat states for player status
export enum CombatState {
  READY = "ready", // 준비 - Ready to fight
  ATTACKING = "attacking", // 공격 - Currently attacking
  DEFENDING = "defending", // 방어 - Defensive stance
  STUNNED = "stunned", // 기절 - Stunned/disabled
  RECOVERING = "recovering", // 회복 - Recovery phase
  DEFEATED = "defeated", // 패배 - Defeated
}

// Game phases for state management
export enum GamePhase {
  MENU = "menu", // 메뉴 - Main menu
  CHARACTER_SELECT = "character_select", // 캐릭터선택 - Character selection
  PRE_ROUND = "pre_round", // 라운드전 - Pre-round preparation
  COMBAT = "combat", // 전투 - Active combat
  POST_ROUND = "post_round", // 라운드후 - Post-round results
  MATCH_END = "match_end", // 경기종료 - Match conclusion
  PAUSE = "pause", // 일시정지 - Paused state
}

// Input types for control system
export enum InputType {
  KEYBOARD = "keyboard", // 키보드 - Keyboard input
  MOUSE = "mouse", // 마우스 - Mouse input
  GAMEPAD = "gamepad", // 게임패드 - Controller input
  TOUCH = "touch", // 터치 - Touch/mobile input
}

// Audio categories for sound management
export enum AudioCategory {
  MUSIC = "music", // 음악 - Background music
  SFX = "sfx", // 효과음 - Sound effects
  VOICE = "voice", // 음성 - Voice acting
  AMBIENCE = "ambience", // 환경음 - Ambient sounds
}

// Graphics quality levels
export enum GraphicsQuality {
  LOW = "low", // 낮음 - Low quality
  MEDIUM = "medium", // 보통 - Medium quality
  HIGH = "high", // 높음 - High quality
  ULTRA = "ultra", // 최고 - Ultra quality
}

// Difficulty levels for AI
export enum Difficulty {
  BEGINNER = "beginner", // 초보 - Beginner level
  INTERMEDIATE = "intermediate", // 중급 - Intermediate level
  ADVANCED = "advanced", // 고급 - Advanced level
  MASTER = "master", // 고수 - Master level
  GRANDMASTER = "grandmaster", // 종사 - Grandmaster level
}

// Achievement types
export enum AchievementType {
  COMBAT = "combat", // 전투 - Combat achievements
  TRAINING = "training", // 훈련 - Training achievements
  STORY = "story", // 스토리 - Story achievements
  COLLECTION = "collection", // 수집 - Collection achievements
  SPECIAL = "special", // 특별 - Special achievements
}

// Status effect types
export enum StatusEffectType {
  BUFF = "buff", // 강화 - Positive effects
  DEBUFF = "debuff", // 약화 - Negative effects
  NEUTRAL = "neutral", // 중립 - Neutral effects
  TEMPORARY = "temporary", // 임시 - Temporary effects
  PERMANENT = "permanent", // 영구 - Permanent effects
}

export default {
  PlayerArchetype,
  TrigramStance,
  GameMode,
  EnumCombatAttackType,
  DamageType,
  CombatState,
  GamePhase,
  InputType,
  AudioCategory,
  GraphicsQuality,
  Difficulty,
  AchievementType,
  StatusEffectType,
};
