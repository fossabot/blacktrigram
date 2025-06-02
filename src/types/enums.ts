// String literal union types for Black Trigram Korean martial arts game

// Game flow and state management
export type GamePhase =
  | "intro"
  | "training"
  | "philosophy"
  | "combat"
  | "victory"
  | "defeat";

export type ScreenType =
  | "intro"
  | "menu"
  | "training"
  | "combat"
  | "philosophy"
  | "settings";

// Player archetype specializations (5 Korean martial arts archetypes)
export type PlayerArchetype =
  | "musa" // 무사 - Traditional Warrior
  | "amsalja" // 암살자 - Shadow Assassin
  | "hacker" // 해커 - Cyber Warrior
  | "jeongbo" // 정보요원 - Intelligence Operative
  | "jojik"; // 조직폭력배 - Organized Crime

// Combat states for realistic body mechanics
export type CombatState =
  | "ready" // Combat ready, full capability
  | "attacking" // Currently executing attack
  | "defending" // Defensive posture
  | "stunned" // Temporary incapacitation
  | "recovering" // Recovering from stun/damage
  | "helpless" // Complete vulnerability
  | "shaken"; // Compromised but functional

// Damage types for Korean martial arts
export type DamageType =
  | "blunt" // Blunt force trauma
  | "sharp" // Cutting/piercing damage
  | "energy" // Ki/energy based damage
  | "pressure" // Pressure point damage
  | "nerve" // Nerve disruption
  | "blood" // Blood flow restriction
  | "light" // Added based on usage in DamageCalculator
  | "medium" // Added based on usage in DamageCalculator
  | "heavy" // Added based on usage in DamageCalculator
  | "critical" // Added based on usage in DamageCalculator
  | "piercing" // Added
  | "internal" // Added
  | "impact"; // Added

// Eight Trigram stances (팔괘 - Korean I Ching combat system)
export type TrigramStance =
  | "geon" // ☰ 건 - Heaven: Direct bone-striking force
  | "tae" // ☱ 태 - Lake: Fluid joint manipulation
  | "li" // ☲ 리 - Fire: Precise nerve strikes
  | "jin" // ☳ 진 - Thunder: Stunning techniques
  | "son" // ☴ 손 - Wind: Continuous pressure
  | "gam" // ☵ 감 - Water: Blood flow restriction
  | "gan" // ☶ 간 - Mountain: Defensive counters
  | "gon"; // ☷ 곤 - Earth: Ground techniques

// Vital point categories for anatomical targeting
export type VitalPointCategory =
  | "head" // Head and neck region
  | "neck" // Added neck as a distinct category
  | "torso" // Chest and abdomen
  | "limbs" // Arms and legs
  | "joints" // Joint manipulation points
  | "nerve_points" // Specific nerve targets (renamed from "nerve" to avoid conflict with DamageType)
  | "vascular" // Blood vessel targets
  | "organ_points"; // Specific organ targets (renamed from "organ")

// Vital point severity levels
export type VitalPointSeverity =
  | "minor" // Light discomfort
  | "moderate" // Significant pain/disruption
  | "severe" // Serious incapacitation
  | "critical" // Life-threatening potential
  | "lethal"; // Added for consistency if used, though 'critical' often covers this

// Input action types for Korean martial arts controls
export type InputAction =
  | "move_up"
  | "move_down"
  | "move_left"
  | "move_right"
  | "stance_geon"
  | "stance_tae"
  | "stance_li"
  | "stance_jin"
  | "stance_son"
  | "stance_gam"
  | "stance_gan"
  | "stance_gon"
  | "technique_execute"
  | "guard_activate"
  | "vital_target"
  | "pause"
  | "menu"
  | "settings";

// Korean martial arts technique categories
export type TechniqueCategory =
  | "striking" // 타격기 - Striking techniques
  | "grappling" // 잡기기 - Grappling techniques
  | "pressure_point" // 급소기 - Pressure point techniques
  | "throw" // 던지기 - Throwing techniques
  | "defensive" // 방어기 - Defensive techniques
  | "stunning"; // 특수기 - Special/signature techniques

// Training modes for Korean martial arts education
export type TrainingMode =
  | "fundamentals" // 기본기 - Basic techniques
  | "anatomy" // 해부학 - Vital point study
  | "philosophy" // 철학 - Martial arts philosophy
  | "sparring" // 자유대련 - Free sparring
  | "forms" // 품새 - Traditional forms
  | "meditation" // 명상 - Mental cultivation
  | "conditioning"; // 단련 - Physical conditioning

// Visual effect types for Korean martial arts
export type EffectType =
  | "impact" // Strike impact effects
  | "energy" // Ki energy visualization
  | "blood" // Realistic blood effects
  | "stance_aura" // Trigram stance auras
  | "vital_highlight" // Vital point targeting
  | "damage_number" // Floating damage text
  | "combo_effect" // Combination technique effects
  | "knockout" // Incapacitation effects
  | "buff"
  | "debuff"
  | "damage" // e.g. damage over time
  | "heal"
  | "special"
  // Specific effects from various files, ensure consistency
  | "stun" // Merged from "stunned"
  | "paralysis" // Merged from "paralyzed"
  | "bleed" // Merged from "bleeding"
  | "poison"
  | "blind"
  | "silence"
  | "disarm"
  | "immobilize" // Merged from "immobilized"
  | "fear"
  | "charm"
  | "sleep"
  | "invulnerability"
  | "resistance_change"
  | "stat_modification"
  | "consciousness_loss"
  | "disoriented" // Merged from "disorientation"
  | "pain_severe"
  | "winded"
  | "balance_loss"
  | "mobility_impairment"
  | "knockdown"
  | "flow_state"
  | "burning"
  | "dazzled"
  | "knockback"
  | "evasion_boost"
  | "redirect"
  | "defense_boost"
  | "armor"
  | "ground_slam"
  | "stability_boost"
  | "stamina_drain"
  | "vital_weakness"
  | "vital_stunning"
  | "damage_vulnerability"
  | "vital_paralysis"
  | "exhausted"
  | "focused"
  | "enraged"
  | "ki_regen_boost"
  | "ki_regen_debuff";

// Audio categories for Korean martial arts
export type AudioCategory =
  | "sfx" // Sound effects
  | "music" // Background music
  | "ambient" // Environmental audio
  | "voice"; // Korean voice acting

// Korean font weights and styles
export type KoreanFontWeight =
  | "light" // 300 - Light Korean text
  | "regular" // 400 - Regular Korean text (used instead of 'normal' if 'normal' is not standard)
  | "normal" // Added if it's a distinct weight, otherwise map to regular
  | "medium" // 500 - Medium Korean text
  | "bold" // 700 - Bold Korean text
  | "heavy"; // 900 - Heavy Korean text

// Remove one of the KoreanFontStyle definitions, keep this one:
export type KoreanFontStyle =
  | "traditional" // Traditional Korean styling
  | "modern" // Modern Korean typography
  | "martial" // Martial arts themed
  | "cyberpunk"; // Futuristic Korean styling

// Remove one of the ComponentSize definitions, keep this one:
export type ComponentSize = "small" | "medium" | "large" | "xlarge";

// Animation timing for Korean martial arts techniques
export type AnimationTiming =
  | "instant"
  | "fast"
  | "normal"
  | "slow"
  | "martial_rhythm"; // Traditional martial arts timing

// Difficulty levels for Korean martial arts training
export type DifficultyLevel =
  | "beginner" // 초급 - Beginner level
  | "intermediate" // 중급 - Intermediate level
  | "advanced" // 고급 - Advanced level
  | "expert" // 전문가 - Expert level
  | "master"; // 대가 - Master level

// Match result types
export type MatchResult =
  | "victory" // 승리 - Victory
  | "defeat" // 패배 - Defeat
  | "draw" // 무승부 - Draw
  | "timeout" // 시간초과 - Time out
  | "forfeit"; // 기권 - Forfeit

// Korean martial arts philosophy aspects
export type PhilosophyAspect =
  | "respect" // 존중 - Honor the art and opponent
  | "discipline" // 수련 - Dedicated practice and learning
  | "precision" // 정확 - Exact technique execution
  | "wisdom" // 지혜 - Understanding beyond physical
  | "balance" // 균형 - Harmony of mind, body, spirit
  | "tradition" // 전통 - Respect for martial heritage
  | "innovation" // 혁신 - Modern adaptation of classics
  | "mastery"; // 숙련 - Pursuit of technical perfection

// Status effect types for combat system (enum part)
// This is now part of the main EffectType above.
// export type StatusEffectType =
//     | "stunned"
//     | "bleeding"
//     | "paralyzed"
//     | "disoriented"
//     | "exhausted"
//     | "focused"
//     | "enraged"
//     | "immobilized";

// UI and component enums
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "success"; // Added accent, consolidated
export type LayoutDirection = "horizontal" | "vertical" | "grid";

// Korean typography
export type KoreanTextStyle = "formal" | "casual" | "technical";

// Audio
export type AudioFormat = "webm" | "mp3"; // Removed "ogg" to match audio.ts

// Game screens
export type GameScreen =
  | "intro"
  | "menu"
  | "training"
  | "combat"
  | "settings" // Added "menu" and "settings" to align with the first definition
  | "philosophy"
  | "victory" // Added "victory" and "defeat"
  | "defeat";

// Player archetype enums
export enum CombatReadiness {
  READY = 100, // Combat ready, full capability
  LIGHT_DAMAGE = 80, // Light damage, reduced capability
  MODERATE = 60, // Moderate damage, significant impairment
  HEAVY = 40, // Heavy damage, severe limitation
  CRITICAL = 20, // Critical damage, near incapacitation
  INCAPACITATED = 0, // Incapacitated/Defeated
}

export enum ConsciousnessLevel {
  ALERT = 100,
  AWARE = 75,
  DISORIENTED = 50,
  STUNNED = 25,
  UNCONSCIOUS = 0,
}

export type EffectIntensity =
  | "minimal"
  | "weak"
  | "moderate"
  | "strong"
  | "extreme"
  | "overwhelming";

export type BodyRegion =
  | "head"
  | "neck"
  | "torso"
  | "arms"
  | "legs"
  | "abdomen"
  | "chest"
  | "back"
  | "hands"
  | "feet"
  | "face_upper" // Added from KoreanVitalPoints
  | "solar_plexus" // Added from KoreanVitalPoints
  | "leg_back_knee"; // Added from KoreanVitalPoints

export type StatusKey =
  | "health"
  | "ki"
  | "stamina"
  | "consciousness"
  | "balance";
