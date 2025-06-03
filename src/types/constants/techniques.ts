// Korean martial arts technique constants

// Basic technique templates for each archetype
export const ARCHETYPE_TECHNIQUES = {
  MUSA: {
    PRIMARY: "정면돌파", // Direct breakthrough
    SECONDARY: "명예일격", // Honor strike
    SPECIAL: "무사도정신", // Warrior spirit
  },
  AMSALJA: {
    PRIMARY: "은밀제압", // Stealth takedown
    SECONDARY: "그림자일격", // Shadow strike
    SPECIAL: "완벽암살", // Perfect assassination
  },
  HACKER: {
    PRIMARY: "시스템분석", // System analysis
    SECONDARY: "데이터해킹", // Data hacking
    SPECIAL: "사이버공격", // Cyber attack
  },
  JEONGBO: {
    PRIMARY: "정보수집", // Intelligence gathering
    SECONDARY: "심리전술", // Psychological tactics
    SPECIAL: "비밀작전", // Covert operation
  },
  JOJIK: {
    PRIMARY: "거친싸움", // Rough fighting
    SECONDARY: "생존본능", // Survival instinct
    SPECIAL: "무자비타격", // Ruthless strike
  },
} as const;

// Technique damage ranges by type
export const TECHNIQUE_DAMAGE_RANGES = {
  LIGHT: { min: 5, max: 15 },
  MEDIUM: { min: 15, max: 25 },
  HEAVY: { min: 25, max: 35 },
  CRITICAL: { min: 35, max: 50 },
} as const;

// Korean technique naming patterns
export const KOREAN_TECHNIQUE_PATTERNS = {
  DESCRIPTIVE: ["천둥", "번개", "바람", "물결", "산", "땅", "불꽃", "호수"],
  ACTION: ["벽력", "타격", "일섬", "연타", "포옹", "반격", "지창", "방어"],
  INTENSITY: ["일", "연", "천", "지", "무", "절", "완", "극"],
} as const;

// Technique execution timings (in milliseconds)
export const TECHNIQUE_TIMINGS = {
  INSTANT: 100,
  FAST: 200,
  NORMAL: 400,
  SLOW: 600,
  DELIBERATE: 800,
} as const;
