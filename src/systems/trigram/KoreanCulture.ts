import type { TrigramStance, TrigramData } from "../../types";
import { TRIGRAM_DATA, TRIGRAM_STANCES_ORDER } from "../../types";

/**
 * Korean Cultural and Philosophical System
 * Traditional Korean martial arts philosophy, I-Ching wisdom, and cultural authenticity
 */

export interface KoreanPhilosophy {
  readonly principle: string;
  readonly korean: string;
  readonly description: { korean: string; english: string };
  readonly application: string;
  readonly modernInterpretation: string;
}

export interface TraditionalConcept {
  readonly name: { korean: string; english: string };
  readonly origin: string;
  readonly significance: string;
  readonly martialApplication: string;
  readonly relatedStances: TrigramStance[];
}

// Traditional Korean martial arts philosophies
export const KOREAN_PHILOSOPHIES: Record<string, KoreanPhilosophy> = {
  taeguk: {
    principle: "태극 (Taeguk)",
    korean: "태극",
    description: {
      korean: "음양의 조화와 균형",
      english: "Harmony and balance of yin and yang",
    },
    application: "Combat flow and stance transitions",
    modernInterpretation: "Adaptive strategy based on opponent's energy",
  },

  ohang: {
    principle: "오행 (Oh-haeng)",
    korean: "오행",
    description: {
      korean: "다섯 원소의 상호작용",
      english: "Interaction of five elements",
    },
    application: "Elemental stance relationships and combat tactics",
    modernInterpretation: "Strategic advantage through elemental understanding",
  },

  jeongsin: {
    principle: "정신 (Jeongsin)",
    korean: "정신",
    description: {
      korean: "정신력과 의지의 힘",
      english: "Mental strength and willpower",
    },
    application: "Ki management and focus techniques",
    modernInterpretation: "Psychological resilience and concentration",
  },

  hwarang: {
    principle: "화랑도 (Hwarangdo)",
    korean: "화랑도",
    description: {
      korean: "화랑의 무사도 정신",
      english: "Way of the flowering knights",
    },
    application: "Honor and discipline in combat",
    modernInterpretation: "Ethical fighting and respect for opponents",
  },
};

// Traditional Korean concepts in martial arts
export const TRADITIONAL_CONCEPTS: Record<string, TraditionalConcept> = {
  ki: {
    name: { korean: "기", english: "Ki/Qi" },
    origin: "Traditional Korean medicine and Taoism",
    significance: "Life energy that flows through all living beings",
    martialApplication: "Energy cultivation and combat power enhancement",
    relatedStances: ["geon", "gam", "li"],
  },

  dantian: {
    name: { korean: "단전", english: "Dantian" },
    origin: "Korean traditional medicine",
    significance: "Energy center in the lower abdomen",
    martialApplication: "Core strength and ki cultivation",
    relatedStances: ["gon", "gan"],
  },

  poomse: {
    name: { korean: "품새", english: "Poomse" },
    origin: "Traditional Taekwondo",
    significance: "Predetermined sequences of techniques",
    martialApplication: "Pattern practice for muscle memory",
    relatedStances: ["jin", "son"],
  },

  kyuksul: {
    name: { korean: "격술", english: "Kyuksul" },
    origin: "Ancient Korean fighting arts",
    significance: "Comprehensive combat system",
    martialApplication: "Integrated fighting techniques",
    relatedStances: ["tae", "li"],
  },
};

// Korean martial arts terminology
export const KOREAN_TERMINOLOGY = {
  // Basic terms
  dojang: "도장", // Training hall
  dobok: "도복", // Training uniform
  sabum: "사범", // Master/instructor
  jaese: "자세", // Stance/posture

  // Combat terms
  gyeorugi: "겨루기", // Sparring
  hosinsul: "호신술", // Self-defense
  palgwe: "팔괘", // Eight trigrams
  gumgang: "금강", // Diamond (unbreakable)

  // Philosophical terms
  hongik: "홍익", // Benefit all humanity
  innae: "인내", // Patience/endurance
  yegui: "예의", // Courtesy/respect
  baekjul: "백절", // Perseverance
} as const;

export class KoreanCultureSystem {
  /**
   * Get philosophical guidance for stance selection
   */
  public static getPhilosophicalGuidance(
    currentStance: TrigramStance,
    situation: "offensive" | "defensive" | "balanced"
  ): {
    philosophy: KoreanPhilosophy;
    guidance: string;
    recommendedStances: TrigramStance[];
  } {
    const stanceData = TRIGRAM_DATA[currentStance];

    let philosophy: KoreanPhilosophy;
    let guidance: string;
    let recommendedStances: TrigramStance[];

    switch (situation) {
      case "offensive":
        philosophy = KOREAN_PHILOSOPHIES.ohang;
        guidance = `${stanceData.koreanName}에서 공격적 접근: ${stanceData.element}의 힘을 활용하여 적극적으로 전진하세요`;
        recommendedStances = ["li", "jin", "geon"];
        break;

      case "defensive":
        philosophy = KOREAN_PHILOSOPHIES.taeguk;
        guidance = `${stanceData.koreanName}에서 방어적 접근: 음양의 균형을 유지하며 상대의 에너지를 흡수하세요`;
        recommendedStances = ["gan", "gam", "gon"];
        break;

      case "balanced":
        philosophy = KOREAN_PHILOSOPHIES.jeongsin;
        guidance = `${stanceData.koreanName}에서 균형잡힌 접근: 정신을 집중하고 상황에 맞춰 적응하세요`;
        recommendedStances = ["tae", "son", "gam"];
        break;
    }

    return {
      philosophy,
      guidance,
      recommendedStances,
    };
  }

  /**
   * Calculate cultural authenticity score for a combat sequence
   */
  public static calculateAuthenticityScore(
    stanceSequence: TrigramStance[],
    techniques: string[]
  ): {
    score: number;
    feedback: string;
    culturalNotes: string[];
  } {
    let score = 0;
    const culturalNotes: string[] = [];

    // Check for traditional stance flow
    for (let i = 0; i < stanceSequence.length - 1; i++) {
      const fromStance = stanceSequence[i];
      const toStance = stanceSequence[i + 1];

      if (this.isTraditionalTransition(fromStance, toStance)) {
        score += 20;
        culturalNotes.push(
          `전통적 전환: ${TRIGRAM_DATA[fromStance].korean} → ${TRIGRAM_DATA[toStance].korean}`
        );
      }
    }

    // Check for elemental harmony
    const elements = stanceSequence.map(
      (stance) => TRIGRAM_DATA[stance].element
    );
    const uniqueElements = new Set(elements);
    if (uniqueElements.size >= 3) {
      score += 15;
      culturalNotes.push("오행의 조화: 다양한 원소를 활용한 전략");
    }

    // Check for Korean technique names
    techniques.forEach((technique) => {
      if (this.isTraditionalKoreanTechnique(technique)) {
        score += 10;
        culturalNotes.push(`전통 기법: ${technique}`);
      }
    });

    const feedback =
      score >= 70
        ? "뛰어난 전통 무술 실력! (Excellent traditional martial arts skill!)"
        : score >= 50
        ? "좋은 전통 이해도 (Good traditional understanding)"
        : "더 많은 전통 학습이 필요 (More traditional study needed)";

    return {
      score: Math.min(100, score),
      feedback,
      culturalNotes,
    };
  }

  /**
   * Check if a stance transition follows traditional Korean martial arts principles
   */
  private static isTraditionalTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): boolean {
    const traditionalFlows: Record<TrigramStance, TrigramStance[]> = {
      geon: ["tae", "li", "jin"], // Heaven flows to Lake, Fire, Thunder
      tae: ["geon", "son", "gam"], // Lake flows to Heaven, Wind, Water
      li: ["geon", "jin", "gon"], // Fire flows to Heaven, Thunder, Earth
      jin: ["li", "son", "gan"], // Thunder flows to Fire, Wind, Mountain
      son: ["tae", "jin", "gam"], // Wind flows to Lake, Thunder, Water
      gam: ["son", "gan", "gon"], // Water flows to Wind, Mountain, Earth
      gan: ["jin", "gam", "gon"], // Mountain flows to Thunder, Water, Earth
      gon: ["li", "gam", "gan"], // Earth flows to Fire, Water, Mountain
    };

    return traditionalFlows[fromStance]?.includes(toStance) ?? false;
  }

  /**
   * Check if a technique name is authentically Korean
   */
  private static isTraditionalKoreanTechnique(technique: string): boolean {
    const koreanTechniques = [
      "천둥벽력",
      "유수연타",
      "화염지창",
      "벽력일섬",
      "선풍연격",
      "수류반격",
      "반석방어",
      "대지포옹",
    ];

    return koreanTechniques.includes(technique);
  }

  /**
   * Get daily wisdom based on current time and stance
   */
  public static getDailyWisdom(currentStance: TrigramStance): {
    wisdom: string;
    korean: string;
    application: string;
  } {
    const hour = new Date().getHours();
    const stanceData = TRIGRAM_DATA[currentStance];

    // Traditional Korean time periods
    if (hour >= 5 && hour < 7) {
      return {
        wisdom: "Morning brings clarity like the heaven trigram",
        korean: "아침은 하늘괘처럼 명료함을 가져다준다",
        application: `${stanceData.koreanName} 자세로 하루를 시작하여 정신을 맑게 하세요`,
      };
    } else if (hour >= 11 && hour < 13) {
      return {
        wisdom: "Midday fire illuminates all shadows",
        korean: "정오의 불은 모든 그림자를 밝힌다",
        application: `${stanceData.koreanName}의 힘으로 어려움을 극복하세요`,
      };
    } else if (hour >= 17 && hour < 19) {
      return {
        wisdom: "Evening water flows with wisdom",
        korean: "저녁의 물은 지혜와 함께 흐른다",
        application: `${stanceData.koreanName}에서 반성과 학습의 시간을 가지세요`,
      };
    } else {
      return {
        wisdom: "Night earth grounds and centers the spirit",
        korean: "밤의 땅은 정신을 안정시키고 중심을 잡아준다",
        application: `${stanceData.koreanName}으로 마음의 평안을 찾으세요`,
      };
    }
  }

  /**
   * Generate traditional Korean martial arts blessing
   */
  public static generateBlessing(stance: TrigramStance): string {
    const stanceData = TRIGRAM_DATA[stance];
    const blessings = {
      geon: "하늘의 창조적 에너지가 당신과 함께하기를",
      tae: "호수의 기쁨이 당신의 마음을 가득 채우기를",
      li: "불의 밝음이 당신의 길을 밝혀주기를",
      jin: "천둥의 힘이 당신에게 용기를 주기를",
      son: "바람의 유연함이 당신을 인도하기를",
      gam: "물의 지혜가 당신과 함께하기기를",
      gan: "산의 안정이 당신을 지켜주기를",
      gon: "땅의 포용이 당신을 감싸기를",
    };

    return `${blessings[stance]} - ${stanceData.koreanName}의 축복`;
  }
}

// Export TRIGRAM_DATA for external use
export { TRIGRAM_DATA };

/**
 * Get philosophical guidance for stance selection
 */
export function getPhilosophicalGuidance(
  currentStance: TrigramStance,
  situation: "training" | "combat" | "meditation"
): {
  primary: KoreanPhilosophy;
  secondary: KoreanPhilosophy;
  application: KoreanPhilosophy;
} {
  const stanceIndex = TRIGRAM_STANCES_ORDER.indexOf(currentStance);
  const primaryIndex = stanceIndex;
  const secondaryIndex = (stanceIndex + 2) % KOREAN_PHILOSOPHIES.length;
  const applicationIndex = (stanceIndex + 4) % KOREAN_PHILOSOPHIES.length;

  const primary = KOREAN_PHILOSOPHIES[primaryIndex];
  const secondary = KOREAN_PHILOSOPHIES[secondaryIndex];
  const application = KOREAN_PHILOSOPHIES[applicationIndex];

  if (!primary || !secondary || !application) {
    // Fallback to default philosophy
    const defaultPhilosophy = KOREAN_PHILOSOPHIES[0] || {
      id: "default",
      korean: "기본 철학",
      english: "Basic Philosophy",
      concept: "기초",
      principle: "균형",
      application: "조화",
      stance: currentStance,
      description: {
        korean: "기본적인 무술 철학",
        english: "Basic martial arts philosophy",
      },
    };

    return {
      primary: defaultPhilosophy,
      secondary: defaultPhilosophy,
      application: defaultPhilosophy,
    };
  }

  return {
    primary,
    secondary,
    application,
  };
}

/**
 * Get stance wisdom for combat, training, or daily life
 */
export function getStanceWisdom(
  stanceName: TrigramStance | string,
  context: "combat" | "training" | "daily_life" = "training"
): {
  wisdom: string;
  practicalAdvice: string;
} {
  // Convert string to TrigramStance if needed
  const stance =
    typeof stanceName === "string"
      ? TRIGRAM_STANCES_ORDER.find((s) => s === stanceName) || "geon"
      : stanceName;

  const stanceData = TRIGRAM_DATA[stance];
  if (!stanceData) {
    return {
      wisdom: "모든 자세는 배움의 기회입니다",
      practicalAdvice: "기본기를 충실히 연마하세요",
    };
  }

  const wisdomMap: Record<
    TrigramStance,
    Record<string, { wisdom: string; practicalAdvice: string }>
  > = {
    geon: {
      combat: {
        wisdom: "하늘의 기운으로 공격하되, 자만하지 말라",
        practicalAdvice: "강한 공격 후에는 반드시 방어를 준비하라",
      },
      training: {
        wisdom: "창조의 힘은 꾸준한 수련에서 나온다",
        practicalAdvice: "매일 기초 동작을 반복하여 근육 기억을 만들어라",
      },
      daily_life: {
        wisdom: "리더십은 타인을 이끄는 것이 아니라 모범을 보이는 것",
        practicalAdvice: "작은 일부터 완벽하게 처리하는 습관을 기르라",
      },
    },
    // Add other stances...
    tae: {
      combat: {
        wisdom: "호수의 잔잔함 속에 강함이 숨어있다",
        practicalAdvice: "적의 공격을 받아넘기며 기회를 찾아라",
      },
      training: {
        wisdom: "기쁨 속에서 배우는 것이 가장 오래 남는다",
        practicalAdvice: "수련을 즐기되 진지함을 잃지 말라",
      },
      daily_life: {
        wisdom: "소통은 마음의 문을 여는 열쇠다",
        practicalAdvice: "상대방의 말을 끝까지 들어라",
      },
    },
    // Add other stances with similar pattern...
    li: {
      combat: {
        wisdom: "불의 정열로 정확히 공격하라",
        practicalAdvice: "급소를 정확히 노려라",
      },
      training: {
        wisdom: "명확한 목표가 있어야 발전한다",
        practicalAdvice: "기술의 정확성에 집중하라",
      },
      daily_life: {
        wisdom: "밝은 마음은 어둠을 몰아낸다",
        practicalAdvice: "긍정적 사고를 유지하라",
      },
    },
    jin: {
      combat: {
        wisdom: "번개의 속도로 기회를 잡아라",
        practicalAdvice: "결정적 순간을 놓치지 말라",
      },
      training: {
        wisdom: "행동하며 배우는 것이 진정한 학습",
        practicalAdvice: "이론보다 실전을 중시하라",
      },
      daily_life: {
        wisdom: "변화를 두려워하지 말고 맞이하라",
        practicalAdvice: "새로운 도전을 받아들여라",
      },
    },
    son: {
      combat: {
        wisdom: "바람처럼 부드럽되 끈질기게",
        practicalAdvice: "연속 공격으로 압박하라",
      },
      training: {
        wisdom: "온화함 속에 강인함을 기르라",
        practicalAdvice: "인내심을 길러라",
      },
      daily_life: {
        wisdom: "겸손한 마음이 성장의 시작",
        practicalAdvice: "타인의 조언에 귀 기울여라",
      },
    },
    gam: {
      combat: {
        wisdom: "물의 깊이로 적을 감싸라",
        practicalAdvice: "방어에서 공격의 기회를 찾아라",
      },
      training: {
        wisdom: "깊이 있는 수련이 진정한 실력",
        practicalAdvice: "기초를 탄탄히 다져라",
      },
      daily_life: {
        wisdom: "어려움 속에서 지혜가 자란다",
        practicalAdvice: "시련을 성장의 기회로 여겨라",
      },
    },
    gan: {
      combat: {
        wisdom: "산처럼 견고하게 방어하라",
        practicalAdvice: "적절한 때까지 기다려라",
      },
      training: {
        wisdom: "꾸준함이 산을 만든다",
        practicalAdvice: "서두르지 말고 차근차근 익혀라",
      },
      daily_life: {
        wisdom: "침묵은 때로 가장 강한 언어",
        practicalAdvice: "말보다 행동으로 보여라",
      },
    },
    gon: {
      combat: {
        wisdom: "대지의 포용력으로 상대를 제압하라",
        practicalAdvice: "전체적 상황을 파악하라",
      },
      training: {
        wisdom: "겸손한 마음으로 모든 것을 받아들여라",
        practicalAdvice: "스승과 동료로부터 배워라",
      },
      daily_life: {
        wisdom: "포용과 이해가 진정한 힘",
        practicalAdvice: "타인을 이해하려 노력하라",
      },
    },
  };

  const stanceWisdom = wisdomMap[stance]?.[context];
  return (
    stanceWisdom || {
      wisdom: "모든 경험이 스승이다",
      practicalAdvice: "현재에 집중하며 최선을 다하라",
    }
  );
}
