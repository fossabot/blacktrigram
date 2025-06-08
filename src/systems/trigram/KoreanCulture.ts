import type { KoreanText, TrigramStance, PlayerArchetype } from "../../types";

/**
 * Korean Martial Arts Philosophy and Cultural Integration
 * Traditional Korean wisdom applied to trigram combat system
 */

export interface KoreanPhilosophy {
  readonly concept: KoreanText;
  readonly description: KoreanText;
  readonly principle: string;
  readonly application: KoreanText;
}

export interface KoreanMartialTradition {
  readonly name: KoreanText;
  readonly origin: KoreanText;
  readonly techniques: readonly string[];
  readonly philosophy: KoreanPhilosophy;
}

export class KoreanCulture {
  /**
   * Traditional Korean martial arts philosophies
   */
  static readonly MARTIAL_PHILOSOPHIES: Record<string, KoreanPhilosophy> = {
    jeongsin: {
      concept: { korean: "정신", english: "Spirit/Mind" },
      description: {
        korean: "마음의 수양과 정신력 강화",
        english: "Cultivation of mind and strengthening of spirit",
      },
      principle: "mental_discipline",
      application: {
        korean: "모든 기술의 근본은 올바른 정신에서 나온다",
        english: "All techniques originate from proper mental state",
      },
    },

    hwarang: {
      concept: { korean: "화랑도", english: "Way of the Flowering Knights" },
      description: {
        korean: "신라시대 화랑의 정신과 무술",
        english: "Spirit and martial arts of Silla Dynasty's Hwarang",
      },
      principle: "honor_courage",
      application: {
        korean: "명예와 용기로 적을 대한다",
        english: "Face enemies with honor and courage",
      },
    },

    taekkyeon: {
      concept: { korean: "택견", english: "Traditional Korean Fighting" },
      description: {
        korean: "우리나라 고유의 전통 무술",
        english: "Korea's indigenous traditional martial art",
      },
      principle: "flowing_movement",
      application: {
        korean: "유연한 움직임으로 상대를 제압한다",
        english: "Subdue opponents through flowing movements",
      },
    },
  };

  /**
   * Trigram cultural meanings and applications
   */
  static readonly TRIGRAM_CULTURAL_MEANINGS: Record<
    TrigramStance,
    {
      cultural: KoreanText;
      martialApplication: KoreanText;
      modernInterpretation: KoreanText;
    }
  > = {
    geon: {
      cultural: { korean: "하늘의 기운", english: "Energy of Heaven" },
      martialApplication: { korean: "강직한 공격", english: "Rigid Attack" },
      modernInterpretation: {
        korean: "리더십과 결단력",
        english: "Leadership and Decisiveness",
      },
    },
    tae: {
      cultural: { korean: "호수의 유연함", english: "Flexibility of Lake" },
      martialApplication: {
        korean: "유연한 방어",
        english: "Flexible Defense",
      },
      modernInterpretation: {
        korean: "적응력과 소통",
        english: "Adaptability and Communication",
      },
    },
    li: {
      cultural: { korean: "불의 열정", english: "Passion of Fire" },
      martialApplication: { korean: "신속한 타격", english: "Swift Strikes" },
      modernInterpretation: {
        korean: "열정과 창의성",
        english: "Passion and Creativity",
      },
    },
    jin: {
      cultural: { korean: "천둥의 위력", english: "Power of Thunder" },
      martialApplication: { korean: "충격적 공격", english: "Shocking Attack" },
      modernInterpretation: {
        korean: "혁신과 변화",
        english: "Innovation and Change",
      },
    },
    son: {
      cultural: { korean: "바람의 순환", english: "Circulation of Wind" },
      martialApplication: { korean: "연속 공격", english: "Continuous Attack" },
      modernInterpretation: {
        korean: "지속성과 인내",
        english: "Persistence and Patience",
      },
    },
    gam: {
      cultural: { korean: "물의 흐름", english: "Flow of Water" },
      martialApplication: { korean: "흐르는 방어", english: "Flowing Defense" },
      modernInterpretation: {
        korean: "지혜와 깊이",
        english: "Wisdom and Depth",
      },
    },
    gan: {
      cultural: { korean: "산의 견고함", english: "Solidity of Mountain" },
      martialApplication: { korean: "견고한 수비", english: "Solid Defense" },
      modernInterpretation: {
        korean: "안정성과 신뢰",
        english: "Stability and Trust",
      },
    },
    gon: {
      cultural: { korean: "땅의 포용", english: "Embrace of Earth" },
      martialApplication: {
        korean: "포용적 제압",
        english: "Embracing Suppression",
      },
      modernInterpretation: {
        korean: "포용력과 지원",
        english: "Inclusiveness and Support",
      },
    },
  };

  /**
   * Get cultural context for archetype
   */
  static getArchetypeCulturalContext(archetype: PlayerArchetype): {
    tradition: KoreanMartialTradition;
    values: readonly KoreanText[];
    modernRole: KoreanText;
  } {
    switch (archetype) {
      case "musa":
        return {
          tradition: {
            name: { korean: "무사도", english: "Way of the Warrior" },
            origin: {
              korean: "조선시대 무관",
              english: "Joseon Dynasty Military Officers",
            },
            techniques: ["sword", "spear", "archery"],
            philosophy: this.MARTIAL_PHILOSOPHIES.hwarang,
          },
          values: [
            { korean: "충성", english: "Loyalty" },
            { korean: "용기", english: "Courage" },
            { korean: "명예", english: "Honor" },
          ],
          modernRole: {
            korean: "전통 가치 수호자",
            english: "Guardian of Traditional Values",
          },
        };

      case "amsalja":
        return {
          tradition: {
            name: { korean: "암살술", english: "Art of Assassination" },
            origin: {
              korean: "고구려 조의선인",
              english: "Goguryeo Joui Seonin",
            },
            techniques: ["stealth", "poison", "precision_strikes"],
            philosophy: this.MARTIAL_PHILOSOPHIES.jeongsin,
          },
          values: [
            { korean: "정밀성", english: "Precision" },
            { korean: "은밀함", english: "Stealth" },
            { korean: "효율성", english: "Efficiency" },
          ],
          modernRole: { korean: "그림자 전사", english: "Shadow Warrior" },
        };

      case "hacker":
        return {
          tradition: {
            name: { korean: "사이버 무술", english: "Cyber Martial Arts" },
            origin: {
              korean: "현대 기술 융합",
              english: "Modern Technology Integration",
            },
            techniques: [
              "digital_analysis",
              "tech_enhancement",
              "data_warfare",
            ],
            philosophy: this.MARTIAL_PHILOSOPHIES.jeongsin,
          },
          values: [
            { korean: "혁신", english: "Innovation" },
            { korean: "정보", english: "Information" },
            { korean: "기술", english: "Technology" },
          ],
          modernRole: { korean: "디지털 전사", english: "Digital Warrior" },
        };

      case "jeongbo_yowon":
        return {
          tradition: {
            name: { korean: "정보전술", english: "Intelligence Tactics" },
            origin: {
              korean: "조선 암행어사",
              english: "Joseon Secret Inspectors",
            },
            techniques: [
              "observation",
              "infiltration",
              "psychological_warfare",
            ],
            philosophy: this.MARTIAL_PHILOSOPHIES.jeongsin,
          },
          values: [
            { korean: "지혜", english: "Wisdom" },
            { korean: "관찰력", english: "Observation" },
            { korean: "전략", english: "Strategy" },
          ],
          modernRole: {
            korean: "정보 분석가",
            english: "Intelligence Analyst",
          },
        };

      case "jojik_pokryeokbae":
        return {
          tradition: {
            name: { korean: "거리 격투술", english: "Street Fighting Arts" },
            origin: {
              korean: "도시 생존술",
              english: "Urban Survival Techniques",
            },
            techniques: [
              "dirty_fighting",
              "improvised_weapons",
              "survival_instinct",
            ],
            philosophy: this.MARTIAL_PHILOSOPHIES.taekkyeon,
          },
          values: [
            { korean: "생존", english: "Survival" },
            { korean: "적응", english: "Adaptation" },
            { korean: "실용성", english: "Practicality" },
          ],
          modernRole: { korean: "거리의 투사", english: "Street Fighter" },
        };

      default:
        return this.getArchetypeCulturalContext("musa");
    }
  }

  /**
   * Get philosophical guidance for stance transition
   */
  static getStancePhilosophy(
    from: TrigramStance,
    to: TrigramStance
  ): KoreanText {
    const fromMeaning = this.TRIGRAM_CULTURAL_MEANINGS[from];
    const toMeaning = this.TRIGRAM_CULTURAL_MEANINGS[to];

    return {
      korean: `${fromMeaning.cultural.korean}에서 ${toMeaning.cultural.korean}으로`,
      english: `From ${fromMeaning.cultural.english} to ${toMeaning.cultural.english}`,
    };
  }

  /**
   * Generate Korean martial arts wisdom
   */
  static generateMartialWisdom(): KoreanText {
    const wisdoms = [
      {
        korean: "마음이 고요해야 기술이 정확하다",
        english: "Only with a calm mind can techniques be precise",
      },
      {
        korean: "적을 알고 나를 알면 백전백승",
        english:
          "Know your enemy and know yourself, and you will never be defeated",
      },
      {
        korean: "물처럼 흘러야 산을 움직일 수 있다",
        english: "Flow like water to move mountains",
      },
      {
        korean: "진정한 무사는 싸우지 않고도 이긴다",
        english: "A true warrior wins without fighting",
      },
    ];

    return wisdoms[Math.floor(Math.random() * wisdoms.length)];
  }
}
