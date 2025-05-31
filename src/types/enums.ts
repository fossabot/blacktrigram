// Enum-like string literal union types

export type TrigramStance =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

export type VitalPointCategory =
  | "nerve"
  | "joint"
  | "meridian"
  | "organ"
  | "vessel"
  | "primary"
  | "secondary"
  | "consciousness"
  | "circulation"
  | "breathing"
  | "energy"
  | "balance";

export type DamageType = "light" | "medium" | "heavy" | "critical" | "block";

export type AttackType =
  | "punch"
  | "kick"
  | "elbow"
  | "knee"
  | "grapple"
  | "throw"
  | "pressure_point"
  | "combination"
  | "strike";

export type AnatomicalRegionIdentifier =
  | "head"
  | "torso"
  | "arms"
  | "legs"
  | "neck"
  | "chest";

export type GamePhase =
  | "intro"
  | "training"
  | "combat"
  | "philosophy"
  | "result"
  | "victory"
  | "defeat";
