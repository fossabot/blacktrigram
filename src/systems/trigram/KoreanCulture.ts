import type { TrigramStance } from "../../types";
import type { KoreanText } from "../../types/korean-text"; // Ensure KoreanText is imported

/**
 * Korean Martial Arts Philosophy and Cultural Integration
 * Traditional Korean wisdom applied to trigram combat system
 */

export interface KoreanPhilosophy {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly concept: string;
  readonly principle: string;
  readonly application: string;
  readonly stance: TrigramStance;
  readonly description: KoreanText; // Use KoreanText type
  readonly modernInterpretation: string;
}

export interface StanceWisdom {
  readonly korean: string;
  readonly english: string;
  readonly advice: string;
  readonly category: "basic" | "intermediate" | "advanced" | "master";
}

// Korean martial arts philosophies for each trigram stance
export const KOREAN_PHILOSOPHIES: readonly KoreanPhilosophy[] = [
  {
    id: "geon_heaven",
    korean: "건괘 - 천",
    english: "Heaven Trigram",
    concept: "Creative Force",
    principle: "Strong and persistent action",
    application: "Leadership through moral strength",
    stance: "geon",
    description: {
      korean: "하늘의 기운으로 강인함을 나타내며 창조적 에너지의 근원이다",
      english:
        "Represents strength through heavenly energy and source of creative power",
    },
    modernInterpretation: "Taking initiative with unwavering determination",
  },
  {
    id: "tae_lake",
    korean: "태괘 - 택",
    english: "Lake Trigram",
    concept: "Joyful Expression",
    principle: "Gentle yet powerful influence",
    application: "Achieving goals through charisma and persuasion",
    stance: "tae",
    description: {
      korean: "호수의 기운으로 기쁨과 소통을 나타내며 부드러운 힘을 상징한다",
      english:
        "Represents joy and communication through lake energy, symbolizing gentle power",
    },
    modernInterpretation: "Leading through inspiration and positive influence",
  },
  {
    id: "li_fire",
    korean: "리괘 - 화",
    english: "Fire Trigram",
    concept: "Illumination",
    principle: "Brightness and clarity of purpose",
    application: "Revealing truth through direct action",
    stance: "li",
    description: {
      korean: "불의 기운으로 밝음과 명료함을 나타내며 진실을 드러낸다",
      english:
        "Represents brightness and clarity through fire energy, revealing truth",
    },
    modernInterpretation:
      "Pursuing goals with clarity and passionate determination",
  },
  {
    id: "jin_thunder",
    korean: "진괘 - 뇌",
    english: "Thunder Trigram",
    concept: "Shocking Movement",
    principle: "Swift and decisive action",
    application: "Breaking through obstacles with sudden force",
    stance: "jin",
    description: {
      korean: "천둥의 기운으로 움직임과 충격을 나타내며 돌파력을 상징한다",
      english:
        "Represents movement and shock through thunder energy, symbolizing breakthrough power",
    },
    modernInterpretation: "Acting decisively when opportunities arise",
  },
  {
    id: "son_wind",
    korean: "손괘 - 풍",
    english: "Wind Trigram",
    concept: "Gentle Penetration",
    principle: "Persistent gentle influence",
    application: "Achieving goals through patience and consistency",
    stance: "son",
    description: {
      korean: "바람의 기운으로 부드러운 침투력을 나타내며 끈기를 상징한다",
      english:
        "Represents gentle penetration through wind energy, symbolizing persistence",
    },
    modernInterpretation: "Making gradual progress through consistent effort",
  },
  {
    id: "gam_water",
    korean: "감괘 - 수",
    english: "Water Trigram",
    concept: "Dangerous Depth",
    principle: "Flowing around obstacles",
    application: "Overcoming challenges through adaptability",
    stance: "gam",
    description: {
      korean: "물의 기운으로 깊이와 위험을 나타내며 적응력을 상징한다",
      english:
        "Represents depth and danger through water energy, symbolizing adaptability",
    },
    modernInterpretation: "Adapting strategy to overcome difficult situations",
  },
  {
    id: "gan_mountain",
    korean: "간괘 - 산",
    english: "Mountain Trigram",
    concept: "Stillness",
    principle: "Knowing when to stop and wait",
    application: "Strategic patience and timing",
    stance: "gan",
    description: {
      korean: "산의 기운으로 정지와 견고함을 나타내며 인내력을 상징한다",
      english:
        "Represents stillness and solidity through mountain energy, symbolizing endurance",
    },
    modernInterpretation:
      "Choosing the right moment for action through patience",
  },
  {
    id: "gon_earth",
    korean: "곤괘 - 지",
    english: "Earth Trigram",
    concept: "Receptive Devotion",
    principle: "Supporting and nurturing growth",
    application: "Achieving through cooperation and support",
    stance: "gon",
    description: {
      korean: "땅의 기운으로 수용과 순응을 나타내며 포용력을 상징한다",
      english:
        "Represents receptivity and devotion through earth energy, symbolizing inclusiveness",
    },
    modernInterpretation:
      "Building success through collaboration and mutual support",
  },
];

// TRIGRAM_STANCES_ORDER for ordering operations
const TRIGRAM_STANCES_ORDER: readonly TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
] as const;

const DEFAULT_PHILOSOPHY: KoreanPhilosophy = {
  id: "default",
  korean: "기본 철학",
  english: "Basic Philosophy",
  concept: "Balance",
  principle: "Harmony",
  application: "Practical wisdom",
  stance: "geon", // Default stance, can be overridden
  description: {
    korean: "기본적인 무술 철학",
    english: "Basic martial philosophy",
  },
  modernInterpretation: "Fundamental principles",
};

/**
 * Get philosophy for specific trigram stance
 */
export function getPhilosophyForStance(
  stance: TrigramStance
): KoreanPhilosophy {
  const philosophy = KOREAN_PHILOSOPHIES.find((p) => p.stance === stance);
  return philosophy ?? { ...DEFAULT_PHILOSOPHY, stance: stance }; // Return default if not found, with correct stance
}

/**
 * Get philosophy by elemental concept
 */
export function getPhilosophyByElement(
  elementConcept: string
): KoreanPhilosophy {
  // Renamed parameter for clarity
  const philosophy = KOREAN_PHILOSOPHIES.find(
    (p) => p.concept === elementConcept
  );
  // Find a stance that matches this concept or default
  const foundStance = philosophy ? philosophy.stance : "geon";
  return (
    philosophy ?? {
      ...DEFAULT_PHILOSOPHY,
      concept: elementConcept,
      stance: foundStance,
    }
  );
}

/**
 * Generate tactical wisdom based on combat situation
 */
export function getStanceWisdom(
  playerStance: TrigramStance,
  opponentStance: TrigramStance
): StanceWisdom {
  // Ensure stances are valid before proceeding
  if (
    !TRIGRAM_STANCES_ORDER.includes(playerStance) ||
    !TRIGRAM_STANCES_ORDER.includes(opponentStance)
  ) {
    return {
      korean: "자세를 확인하세요",
      english: "Please check your stance",
      advice: "Maintain proper form",
      category: "basic",
    };
  }

  const playerPhilosophy = getPhilosophyForStance(playerStance); // Ensured non-null
  const opponentPhilosophy = getPhilosophyForStance(opponentStance); // Ensured non-null

  // More sophisticated wisdom generation could be added here
  // For now, using a simple map or a default
  const wisdomKey = `${playerStance}_vs_${opponentStance}`;
  const specificWisdom: Record<string, StanceWisdom> = {
    // Example specific advice
    geon_vs_tae: {
      korean: `${playerPhilosophy.korean}의 강함으로 ${opponentPhilosophy.korean}의 유연함을 압도하라.`,
      english: `Overwhelm ${opponentPhilosophy.english}'s flexibility with ${playerPhilosophy.english}'s strength.`,
      advice: `Apply ${playerPhilosophy.application} to disrupt ${opponentPhilosophy.principle}.`,
      category: "intermediate",
    },
  };

  return (
    specificWisdom[wisdomKey] || {
      // Default wisdom if no specific entry
      korean: `${playerPhilosophy.korean}(으)로 ${opponentPhilosophy.korean}에 대응하라`,
      english: `Use ${playerPhilosophy.english} principles against ${opponentPhilosophy.english}`,
      advice: `Consider ${playerPhilosophy.modernInterpretation} when facing ${opponentPhilosophy.modernInterpretation}.`,
      category: "basic",
    }
  );
}

/**
 * Generate recommended philosophies for training scenarios
 * Fix: Remove unused opponentStance parameter
 */
export function generateRecommendedPhilosophies(currentStance: TrigramStance): {
  primary: KoreanPhilosophy;
  secondary: KoreanPhilosophy;
  application: KoreanPhilosophy;
} {
  if (KOREAN_PHILOSOPHIES.length === 0) {
    return {
      primary: { ...DEFAULT_PHILOSOPHY, stance: currentStance },
      secondary: { ...DEFAULT_PHILOSOPHY, stance: currentStance },
      application: { ...DEFAULT_PHILOSOPHY, stance: currentStance },
    };
  }

  const stanceIndex = TRIGRAM_STANCES_ORDER.indexOf(currentStance);

  if (stanceIndex === -1) {
    // Should not happen if currentStance is valid
    const defaultWithStance = { ...DEFAULT_PHILOSOPHY, stance: currentStance };
    return {
      primary: defaultWithStance,
      secondary: defaultWithStance,
      application: defaultWithStance,
    };
  }

  // Ensure indices wrap around correctly and handle small KOREAN_PHILOSOPHIES array
  const numPhilosophies = KOREAN_PHILOSOPHIES.length;
  const primaryPhilosophy = KOREAN_PHILOSOPHIES[
    stanceIndex % numPhilosophies
  ] || { ...DEFAULT_PHILOSOPHY, stance: currentStance };

  // Find philosophies for different stances if possible, or fallback
  let secondaryStance =
    TRIGRAM_STANCES_ORDER[(stanceIndex + 2) % TRIGRAM_STANCES_ORDER.length];
  let applicationStance =
    TRIGRAM_STANCES_ORDER[(stanceIndex + 4) % TRIGRAM_STANCES_ORDER.length];

  // Ensure we get philosophies for distinct stances if possible
  if (secondaryStance === currentStance && numPhilosophies > 1) {
    secondaryStance =
      TRIGRAM_STANCES_ORDER[(stanceIndex + 1) % TRIGRAM_STANCES_ORDER.length];
  }
  if (applicationStance === currentStance && numPhilosophies > 2) {
    applicationStance =
      TRIGRAM_STANCES_ORDER[(stanceIndex + 3) % TRIGRAM_STANCES_ORDER.length];
  }
  if (applicationStance === secondaryStance && numPhilosophies > 2) {
    applicationStance =
      TRIGRAM_STANCES_ORDER[(stanceIndex + 5) % TRIGRAM_STANCES_ORDER.length];
  }

  return {
    primary: primaryPhilosophy,
    secondary: getPhilosophyForStance(secondaryStance),
    application: getPhilosophyForStance(applicationStance),
  };
}

/**
 * Generate random philosophy for training scenarios
 */
export function generateRandomPhilosophy(): KoreanPhilosophy {
  if (KOREAN_PHILOSOPHIES.length === 0) {
    return DEFAULT_PHILOSOPHY;
  }
  const randomIndex = Math.floor(Math.random() * KOREAN_PHILOSOPHIES.length);
  return KOREAN_PHILOSOPHIES[randomIndex]!; // Non-null assertion due to length check
}

/**
 * Export all Korean philosophies for external use
 */
export function getAllPhilosophies(): readonly KoreanPhilosophy[] {
  return KOREAN_PHILOSOPHIES;
}

/**
 * Get philosophical guidance for training
 */
export function getTrainingGuidance(stance: TrigramStance): {
  korean: string;
  english: string;
  focus: string;
} {
  const philosophy = getPhilosophyForStance(stance);

  return {
    korean: `${philosophy.korean}의 정신을 수련하라`,
    english: `Cultivate the spirit of ${philosophy.english}`,
    focus: philosophy.modernInterpretation,
  };
}
