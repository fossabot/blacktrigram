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
  GEON = "geon",
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
  VERSUS = "versus", // 대전 - Player vs Player
  TRAINING = "training", // 훈련 - Training mode
  SURVIVAL = "survival", // 생존 - Endless combat
  TUTORIAL = "tutorial", // 튜토리얼 - Tutorial mode
  STORY = "story", // 스토리 - Story mode
  SPARRING = "sparring", // 스파링 - Sparring mode
}

// Combat attack types for techniques
export enum EnumCombatAttackType {
  STRIKE = "strike",
  THRUST = "thrust", // 찌르기 - Thrusting attacks
  BLOCK = "block", // 막기 - Defensive blocks
  COUNTER_ATTACK = "counter_attack", // 반격 - Counter attacks
  THROW = "throw", // 던지기 - Throwing techniques
  GRAPPLE = "grapple", // 잡기 - Grappling moves
  PRESSURE_POINT = "pressure_point", // 혈점 - Vital point strikes
  NERVE_STRIKE = "nerve_strike", // 신경타격 - Nerve attacks
  PUNCH = "punch", // 주먹 - Punching attacks
}

// Damage types for combat calculation
export enum DamageType {
  BLUNT = "blunt", // 타격 - Blunt force damage
  PIERCING = "piercing", // 관통 - Piercing damage
  SLASHING = "slashing", // 베기 - Slashing damage
  PRESSURE = "pressure", // 압력 - Pressure damage
  NERVE = "nerve", // 신경 - Nerve damage
  JOINT = "joint", // 관절 - Joint damage
  INTERNAL = "internal", // 내부 - Internal damage
  IMPACT = "impact", // 충격 - Impact damage
  CRUSHING = "crushing", // 분쇄 - Crushing damage
  SHARP = "sharp", // 날카로운 - Sharp damage
  ELECTRIC = "electric", // 전기 - Electric damage
  FIRE = "fire", // 불 - Fire damage
  ICE = "ice", // 얼음 - Ice damage
  POISON = "poison", // 독 - Poison damage
  PSYCHIC = "psychic", // 정신적 - Psychic damage
  BLOOD = "blood", // 출혈 - Blood damage
}

// Damage types for combat calculation
export enum BodyRegion {
  HEAD = "head", // 머리 - Head region
  FACE_UPPER = "face_upper", // 얼굴(상) - Upper face region
  NECK = "neck", // 목 - Neck region
  CHEST = "chest", // 가슴 - Chest region
  ABDOMEN = "abdomen", // 복부 - Abdomen region
  TORSO = "torso", // 상체 - Torso region
  LEFT_ARM = "left_arm", // 왼팔 - Left arm
  RIGHT_ARM = "right_arm", // 오른팔 - Right arm
  LEFT_LEG = "left_leg", // 왼쪽 다리 - Left leg
  RIGHT_LEG = "right_leg", // 오른쪽 다리 - Right leg
}

// Vital point categories for targeted attacks
export enum VitalPointCategory {
  NEUROLOGICAL = "neurological",
  VASCULAR = "vascular",
  RESPIRATORY = "respiratory",
  MUSCULAR = "muscular",
  SKELETAL = "skeletal",
  ORGAN = "organ",
  PRESSURE = "pressure",
  NERVE = "nerve",
}

// Severity levels for vital point damage
export enum VitalPointSeverity {
  MINOR = "minor", // 경미 - Minor severity
  MODERATE = "moderate", // 보통 - Moderate severity
  MAJOR = "major", // 주요 - Major severity
  SEVERE = "severe", // 심각 - Severe severity
  CRITICAL = "critical", // 위기 - Critical severity
  LETHAL = "lethal", // 치명적 - Lethal severity
}

// Effect intensity levels for status effects
export enum EffectIntensity {
  VERY_LOW = "very_low", // 매우 낮음 - Very low intensity
  LOW = "low", // 낮음 - Low intensity
  MEDIUM = "medium", // 보통 - Moderate intensity
  HIGH = "high", // 높음 - High intensity
  VERY_HIGH = "very_high", // 매우 높음 - Very high intensity
  EXTREME = "extreme", // 극단적 - Extreme intensity
}

// Types of effects that can occur in combat
export enum EffectType {
  STUN = "stun", // 기절 - Stun effect
  PAIN = "pain", // 통증 - Pain effect
  PARALYSIS = "paralysis", // 마비 - Paralysis effect
  WEAKNESS = "weakness", // 약화 - Weakness effect
  DISORIENTATION = "disorientation", // 방향감각상실 - Disorientation effect
  UNCONSCIOUSNESS = "unconsciousness", // 의식불명 - Unconsciousness effect
  BLEEDING = "bleeding", // 출혈 - Bleeding effect
  EXHAUSTED = "exhausted", // 탈진 - Exhausted effect
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

// Fix: Add missing enum values
export enum VitalPointEffectType {
  PAIN = "pain",
  STUN = "stun",
  UNCONSCIOUSNESS = "unconsciousness",
  PARALYSIS = "paralysis",
  BLEEDING = "bleeding",
  NERVE_DAMAGE = "nerve_damage",
  JOINT_LOCK = "joint_lock",
  PRESSURE = "pressure",
}

export enum GameEventType {
  ROUND_START = "round_start",
  ROUND_END = "round_end",
  MATCH_START = "match_start",
  MATCH_END = "match_end",
  PLAYER_HIT = "player_hit",
  PLAYER_DEFEATED = "player_defeated",
  TECHNIQUE_EXECUTED = "technique_executed",
  STANCE_CHANGED = "stance_changed",
}

// export default {
//   PlayerArchetype,
//   TrigramStance,
//   GameMode,
//   EnumCombatAttackType,
//   DamageType,
//   CombatState,
//   GamePhase,
//   InputType,
//   AudioCategory,
//   GraphicsQuality,
//   Difficulty,
//   AchievementType,
//   StatusEffectType,
// };
