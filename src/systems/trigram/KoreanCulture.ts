import type { KoreanText, TrigramStance } from "../../types";

/**
 * Korean cultural elements and philosophy for martial arts
 */
export class KoreanCulture {
  /**
   * Traditional Korean martial arts values
   */
  static readonly MARTIAL_VALUES = {
    honor: { korean: "명예", english: "Honor" },
    respect: { korean: "존경", english: "Respect" },
    discipline: { korean: "절제", english: "Discipline" },
    perseverance: { korean: "인내", english: "Perseverance" },
    loyalty: { korean: "충성", english: "Loyalty" },
    righteousness: { korean: "의", english: "Righteousness" },
  } as const;

  /**
   * Trigram philosophical meanings
   */
  static readonly TRIGRAM_PHILOSOPHY: Record<TrigramStance, KoreanText> = {
    geon: {
      korean: "하늘의 창조력과 무한한 가능성",
      english: "Heaven's creative force and infinite possibilities",
    },
    tae: {
      korean: "호수의 평온함과 유연한 적응",
      english: "Lake's tranquility and flexible adaptation",
    },
    li: {
      korean: "불의 밝음과 정확한 판단",
      english: "Fire's brightness and precise judgment",
    },
    jin: {
      korean: "천둥의 역동성과 순간적 행동",
      english: "Thunder's dynamism and instantaneous action",
    },
    son: {
      korean: "바람의 지속성과 점진적 변화",
      english: "Wind's persistence and gradual change",
    },
    gam: {
      korean: "물의 깊이와 흐르는 지혜",
      english: "Water's depth and flowing wisdom",
    },
    gan: {
      korean: "산의 견고함과 정적인 힘",
      english: "Mountain's solidity and static strength",
    },
    gon: {
      korean: "땅의 포용과 양육하는 힘",
      english: "Earth's embrace and nurturing power",
    },
  };

  /**
   * Korean martial arts terminology
   */
  static readonly MARTIAL_TERMS = {
    techniques: {
      strike: { korean: "타격", english: "Strike" },
      block: { korean: "막기", english: "Block" },
      throw: { korean: "던지기", english: "Throw" },
      lock: { korean: "꺾기", english: "Lock" },
      pressure: { korean: "압박", english: "Pressure" },
    },
    body_parts: {
      head: { korean: "머리", english: "Head" },
      neck: { korean: "목", english: "Neck" },
      torso: { korean: "몸통", english: "Torso" },
      arm: { korean: "팔", english: "Arm" },
      leg: { korean: "다리", english: "Leg" },
    },
    concepts: {
      ki: { korean: "기", english: "Ki/Energy" },
      balance: { korean: "균형", english: "Balance" },
      harmony: { korean: "조화", english: "Harmony" },
      flow: { korean: "흐름", english: "Flow" },
      center: { korean: "중심", english: "Center" },
    },
  } as const;

  /**
   * Get cultural wisdom for a stance
   */
  static getStanceWisdom(stance: TrigramStance): KoreanText {
    return this.TRIGRAM_PHILOSOPHY[stance];
  }

  /**
   * Get martial arts greeting
   */
  static getMartialGreeting(): KoreanText {
    return {
      korean: "태권도!",
      english: "Taekwondo!",
    };
  }

  /**
   * Get respect bow phrase
   */
  static getRespectPhrase(): KoreanText {
    return {
      korean: "경례!",
      english: "Bow with respect!",
    };
  }

  /**
   * Get training motivation phrases
   */
  static getMotivationPhrases(): readonly KoreanText[] {
    return [
      {
        korean: "마음을 비우고 수련하라",
        english: "Empty your mind and train",
      },
      { korean: "강한 의지로 극복하라", english: "Overcome with strong will" },
      {
        korean: "겸손함이 진정한 힘이다",
        english: "Humility is true strength",
      },
      {
        korean: "끊임없는 노력이 완성을 만든다",
        english: "Continuous effort creates perfection",
      },
    ];
  }
}
