import type { TrigramStance, StatusEffect } from "../../types/GameTypes";

/**
 * KoreanCulture - Cultural and philosophical context for Korean martial arts
 * Provides traditional Korean martial arts knowledge and philosophy
 */
export class KoreanCulture {
  // Traditional Korean martial arts philosophy
  public static readonly MARTIAL_PHILOSOPHY = {
    geon: {
      element: "天 (하늘)",
      virtue: "강건 (Strength)",
      principle: "창조와 리더십의 기운",
      traditional: "하늘의 기운을 담은 강인한 자세",
      modernApplication: "적극적 공격과 주도권 장악에 특화",
    },
    tae: {
      element: "澤 (못)",
      virtue: "기쁨 (Joy)",
      principle: "유연성과 적응력의 조화",
      traditional: "물의 흐름처럼 부드럽고 유연한 움직임",
      modernApplication: "상대의 공격을 받아 흘리는 수성 기법",
    },
    li: {
      element: "火 (불)",
      virtue: "광명 (Brightness)",
      principle: "명료함과 신속한 판단력",
      traditional: "불꽃처럼 빠르고 정확한 타격",
      modernApplication: "연속 공격과 빠른 콤보에 최적화",
    },
    jin: {
      element: "雷 (우뢰)",
      virtue: "진동 (Movement)",
      principle: "순간적 폭발력과 기습",
      traditional: "천둥처럼 갑작스럽고 강력한 일격",
      modernApplication: "카운터 어택과 기습 공격 전문",
    },
    son: {
      element: "風 (바람)",
      virtue: "순종 (Gentleness)",
      principle: "지속적 압박과 침투",
      traditional: "바람처럼 지속적이고 끈질긴 공격",
      modernApplication: "지구전과 상대 체력 소모 전략",
    },
    gam: {
      element: "水 (물)",
      virtue: "함정 (Danger)",
      principle: "깊이와 신중함의 지혜",
      traditional: "물처럼 깊고 예측하기 어려운 기법",
      modernApplication: "방어 위주와 반격 타이밍 포착",
    },
    gan: {
      element: "山 (산)",
      virtue: "정지 (Stillness)",
      principle: "불동의 의지와 확고함",
      traditional: "산처럼 흔들리지 않는 철벽 방어",
      modernApplication: "강력한 방어력과 끈기 있는 플레이",
    },
    gon: {
      element: "地 (땅)",
      virtue: "순응 (Receptiveness)",
      principle: "포용과 지지의 힘",
      traditional: "대지처럼 모든 것을 품는 포용력",
      modernApplication: "밸런스 있는 공수 겸비 스타일",
    },
  } as const;

  // Traditional Korean martial arts techniques and their cultural significance
  public static readonly TECHNIQUE_CULTURE = {
    천둥벽력: {
      korean: "천둥벽력",
      hanja: "天雷霹靂",
      meaning: "천둥과 벼락의 위력",
      culturalContext: "자연의 강력한 힘을 무술에 응용한 전통 기법",
      philosophy: "하늘의 진노를 담은 일격필살의 무공",
      historical: "조선시대 궁중 무예에서 전해진 최고급 기법",
    },
    화염지창: {
      korean: "화염지창",
      hanja: "火焰指槍",
      meaning: "불꽃처럼 빠른 손가락 공격",
      culturalContext: "불의 정수를 담은 신속한 급소 타격법",
      philosophy: "번개같은 속도로 적의 급소를 노리는 지혜",
      historical: "사찰에서 전해진 비전 무예의 핵심 기법",
    },
    유수연타: {
      korean: "유수연타",
      hanja: "流水連打",
      meaning: "흐르는 물처럼 연속된 타격",
      culturalContext: "물의 유연함과 지속성을 무술로 승화",
      philosophy: "끊임없는 흐름으로 상대를 압도하는 기법",
      historical: "강가에서 수행하며 완성된 전통 무예",
    },
  } as const;

  // Korean martial arts meditation and training philosophy
  public static readonly TRAINING_PHILOSOPHY = {
    meditation: {
      korean: "명상 수련",
      purpose: "마음의 평정과 기운의 순환",
      method: "자연과 하나되는 호흡법",
      benefit: "정신력 강화와 집중력 향상",
    },
    physicalTraining: {
      korean: "체력 단련",
      purpose: "신체의 균형과 조화 추구",
      method: "전통 기공과 현대 훈련의 조합",
      benefit: "지구력과 유연성의 동시 발달",
    },
    technicalMastery: {
      korean: "기술 숙련",
      purpose: "완벽한 기법의 체득",
      method: "반복 수련과 실전 응용",
      benefit: "무의식적 반응과 정확성 획득",
    },
    spiritualDevelopment: {
      korean: "정신 수양",
      purpose: "무도인의 품격과 도덕성",
      method: "선후배 관계와 예의 교육",
      benefit: "인격 완성과 사회적 책임감",
    },
  } as const;

  /**
   * Get cultural information about a specific trigram stance
   */
  public static getStanceCulture(stance: TrigramStance): {
    korean: string;
    philosophy: string;
    application: string;
    element: string;
    virtue: string;
  } {
    const culture = this.MARTIAL_PHILOSOPHY[stance];

    return {
      korean: `${stance.toUpperCase()} - ${culture.element}`,
      philosophy: culture.traditional,
      application: culture.modernApplication,
      element: culture.element,
      virtue: culture.virtue,
    };
  }

  /**
   * Get technique cultural background
   */
  public static getTechniqueCulture(techniqueId: string): {
    korean: string;
    meaning: string;
    philosophy: string;
    historical: string;
  } | null {
    const culture =
      this.TECHNIQUE_CULTURE[
        techniqueId as keyof typeof this.TECHNIQUE_CULTURE
      ];

    if (!culture) return null;

    return {
      korean: culture.korean,
      meaning: culture.meaning,
      philosophy: culture.philosophy,
      historical: culture.historical,
    };
  }

  /**
   * Generate status effects based on Korean martial arts philosophy
   */
  public static generatePhilosophicalEffects(
    stance: TrigramStance,
    intensity: number
  ): StatusEffect[] {
    const culture = this.MARTIAL_PHILOSOPHY[stance];
    const effects: StatusEffect[] = [];

    // Base effect based on stance philosophy
    switch (stance) {
      case "geon": // Heaven - Strength and leadership
        effects.push({
          type: "damage_boost",
          intensity: intensity * 0.2,
          duration: 3000,
          description: `${culture.virtue}의 기운으로 공격력 증가`,
        });
        break;

      case "tae": // Lake - Joy and adaptability
        effects.push({
          type: "evasion_boost",
          intensity: intensity * 0.15,
          duration: 4000,
          description: `${culture.virtue}의 흐름으로 회피력 향상`,
        });
        break;

      case "li": // Fire - Brightness and speed
        effects.push({
          type: "speed_boost",
          intensity: intensity * 0.25,
          duration: 2500,
          description: `${culture.virtue}의 빛으로 속도 증가`,
        });
        break;

      case "jin": // Thunder - Movement and surprise
        effects.push({
          type: "critical_boost",
          intensity: intensity * 0.3,
          duration: 2000,
          description: `${culture.virtue}의 힘으로 치명타 확률 증가`,
        });
        break;

      case "son": // Wind - Gentleness and persistence
        effects.push({
          type: "stamina_efficiency",
          intensity: intensity * 0.2,
          duration: 5000,
          description: `${culture.virtue}의 지속력으로 체력 효율 향상`,
        });
        break;

      case "gam": // Water - Danger and depth
        effects.push({
          type: "counter_boost",
          intensity: intensity * 0.2,
          duration: 3500,
          description: `${culture.virtue}의 깊이로 반격력 강화`,
        });
        break;

      case "gan": // Mountain - Stillness and firmness
        effects.push({
          type: "defense_boost",
          intensity: intensity * 0.3,
          duration: 4000,
          description: `${culture.virtue}의 견고함으로 방어력 증가`,
        });
        break;

      case "gon": // Earth - Receptiveness and support
        effects.push({
          type: "balance_boost",
          intensity: intensity * 0.15,
          duration: 4500,
          description: `${culture.virtue}의 포용으로 전체적 균형 향상`,
        });
        break;
    }

    return effects;
  }

  /**
   * Get traditional Korean training advice
   */
  public static getTrainingAdvice(
    currentLevel: number,
    preferredStance: TrigramStance
  ): string {
    const stanceCulture = this.MARTIAL_PHILOSOPHY[preferredStance];
    const level = Math.floor(currentLevel / 10);

    const adviceByLevel = [
      `초심자는 ${stanceCulture.element}의 기본 원리를 이해하는 것이 중요합니다.`,
      `${stanceCulture.virtue}의 의미를 체득하며 기초를 다지세요.`,
      `${stanceCulture.traditional}를 반복 수련하여 자연스럽게 만드세요.`,
      `다른 괘와의 상성을 이해하며 전략적 사고를 기르세요.`,
      `${stanceCulture.modernApplication}을 실전에 응용해보세요.`,
      `진정한 무도인은 기술을 넘어 마음을 수양합니다.`,
    ];

    return (
      adviceByLevel[Math.min(level, adviceByLevel.length - 1)] ||
      adviceByLevel[0]
    );
  }

  /**
   * Get status effects buffs for a specific trigram stance
   */
  public static getStanceBuffs(stance: TrigramStance): StatusEffect[] {
    const culture = this.getStanceCulture(stance);
    const effects: StatusEffect[] = [];

    // All stances get a basic power boost
    effects.push({
      type: "boost",
      intensity: 0.1,
      duration: 5000,
      description: `${culture.virtue}의 기운으로 공격력 증가`,
    });

    // Specific stance bonuses with corrected types
    switch (stance) {
      case "geon": // Heaven - damage boost
        effects.push({
          type: "boost", // Using valid type instead of damage_boost
          intensity: 0.15,
          duration: 4000,
          description: `${culture.virtue}의 힘으로 공격력 증가`,
        });
        break;

      case "son": // Wind - speed boost
        effects.push({
          type: "boost", // Using valid type instead of speed_boost
          intensity: 0.15,
          duration: 4000,
          description: `${culture.virtue}의 빠름으로 속도 증가`,
        });
        break;

      case "gan": // Mountain - defense boost
        effects.push({
          type: "shield", // Using valid type instead of defense_boost
          intensity: 0.25,
          duration: 8000,
          description: `${culture.virtue}의 견고함으로 방어력 증가`,
        });
        break;

      // ...existing cases with corrected types...
    }

    return effects;
  }

  public static getTechniqueDescription(techniqueId: string): string {
    // Fix the method to work without koreanTechniques property
    const techniques = [
      { id: "cheonjin_strike", korean: "천진격" },
      { id: "tae_flow", korean: "태류" },
      { id: "li_fire_spear", korean: "리화창" },
      { id: "jin_thunder", korean: "진뢰" },
      { id: "son_wind_palm", korean: "손풍장" },
      { id: "gam_water_flow", korean: "감수류" },
      { id: "gan_mountain_guard", korean: "간산방" },
      { id: "gon_earth_slam", korean: "곤지타" },
    ];

    const technique = techniques.find((t) => t.id === techniqueId);
    return technique?.korean || "알 수 없는 기술";
  }
}
