import type {
  KoreanTechnique,
  TrigramStance,
  PlayerArchetype,
  KoreanText,
} from "../../types";

export interface TechniqueVariation {
  readonly name: KoreanText;
  readonly damageModifier: number;
  readonly speedModifier: number;
  readonly kiCostModifier: number;
  readonly effects: readonly string[];
}

export class KoreanTechniques {
  /**
   * Complete Korean technique database organized by stance
   */
  static readonly TECHNIQUE_DATABASE: Record<
    TrigramStance,
    {
      primary: KoreanTechnique;
      secondary: KoreanTechnique;
      advanced: KoreanTechnique;
      archetype_variations: Record<PlayerArchetype, TechniqueVariation>;
    }
  > = {
    geon: {
      primary: {
        id: "geon_primary",
        korean: { korean: "천둥벽력", english: "Thunder Strike" },
        english: { korean: "천둥벽력", english: "Thunder Strike" },
        stance: "geon",
        damage: 25,
        kiCost: 15,
        staminaCost: 20,
        hitChance: 0.85,
        criticalChance: 0.15,
        description: {
          korean: "하늘의 힘으로 강력한 일격을 가한다",
          english: "Deliver a powerful strike with heavenly force",
        },
        targetAreas: ["head", "torso"],
        effects: ["stun"],
        executionTime: 800,
        range: 1.2,
        accuracy: 0.9,
      },
      secondary: {
        id: "geon_secondary",
        korean: { korean: "하늘검", english: "Heaven Sword" },
        english: { korean: "하늘검", english: "Heaven Sword" },
        stance: "geon",
        damage: 20,
        kiCost: 12,
        staminaCost: 15,
        hitChance: 0.9,
        criticalChance: 0.1,
        description: {
          korean: "상단에서 내려치는 검법",
          english: "Overhead sword technique",
        },
        targetAreas: ["head", "shoulders"],
        effects: [],
        executionTime: 600,
        range: 1.5,
        accuracy: 0.85,
      },
      advanced: {
        id: "geon_advanced",
        korean: { korean: "천제강림", english: "Heavenly Emperor's Descent" },
        english: { korean: "천제강림", english: "Heavenly Emperor's Descent" },
        stance: "geon",
        damage: 40,
        kiCost: 30,
        staminaCost: 35,
        hitChance: 0.75,
        criticalChance: 0.25,
        description: {
          korean: "천제의 권위로 적을 압도하는 궁극기",
          english:
            "Ultimate technique overwhelming enemies with heavenly authority",
        },
        targetAreas: ["full_body"],
        effects: ["stun", "knockdown"],
        executionTime: 1200,
        range: 2.0,
        accuracy: 0.95,
      },
      archetype_variations: {
        musa: {
          name: { korean: "무사천검", english: "Warrior Heaven Sword" },
          damageModifier: 1.2,
          speedModifier: 1.0,
          kiCostModifier: 0.9,
          effects: ["honor_bonus"],
        },
        amsalja: {
          name: { korean: "암살천격", english: "Assassination Heaven Strike" },
          damageModifier: 1.5,
          speedModifier: 1.3,
          kiCostModifier: 1.1,
          effects: ["critical_bonus"],
        },
        hacker: {
          name: { korean: "사이버천뢰", english: "Cyber Heaven Thunder" },
          damageModifier: 1.1,
          speedModifier: 1.4,
          kiCostModifier: 0.8,
          effects: ["tech_enhancement"],
        },
        jeongbo_yowon: {
          name: { korean: "정보천술", english: "Intelligence Heaven Art" },
          damageModifier: 1.0,
          speedModifier: 1.2,
          kiCostModifier: 0.7,
          effects: ["precision_bonus"],
        },
        jojik_pokryeokbae: {
          name: { korean: "폭력천권", english: "Violence Heaven Fist" },
          damageModifier: 1.3,
          speedModifier: 0.9,
          kiCostModifier: 1.2,
          effects: ["brutal_force"],
        },
      },
    },

    tae: {
      primary: {
        id: "tae_primary",
        korean: { korean: "유수연타", english: "Flowing Water Strikes" },
        english: { korean: "유수연타", english: "Flowing Water Strikes" },
        stance: "tae",
        damage: 18,
        kiCost: 10,
        staminaCost: 12,
        hitChance: 0.92,
        criticalChance: 0.08,
        description: {
          korean: "물처럼 흘러가며 연속으로 타격한다",
          english: "Strike continuously flowing like water",
        },
        targetAreas: ["arms", "torso"],
        effects: ["combo"],
        executionTime: 500,
        range: 1.0,
        accuracy: 0.88,
      },
      secondary: {
        id: "tae_secondary",
        korean: { korean: "호수반격", english: "Lake Counter" },
        english: { korean: "호수반격", english: "Lake Counter" },
        stance: "tae",
        damage: 22,
        kiCost: 8,
        staminaCost: 10,
        hitChance: 0.88,
        criticalChance: 0.12,
        description: {
          korean: "상대의 공격을 받아넘기며 반격한다",
          english: "Counter-attack while deflecting opponent's strike",
        },
        targetAreas: ["torso"],
        effects: ["counter"],
        executionTime: 400,
        range: 0.8,
        accuracy: 0.9,
      },
      advanced: {
        id: "tae_advanced",
        korean: { korean: "택호삼연", english: "Lake Tiger Triple Strike" },
        english: { korean: "택호삼연", english: "Lake Tiger Triple Strike" },
        stance: "tae",
        damage: 35,
        kiCost: 25,
        staminaCost: 30,
        hitChance: 0.8,
        criticalChance: 0.2,
        description: {
          korean: "호랑이처럼 민첩하게 세 번 연속 공격",
          english: "Tiger-like agile triple consecutive attacks",
        },
        targetAreas: ["multiple"],
        effects: ["combo", "speed_boost"],
        executionTime: 900,
        range: 1.3,
        accuracy: 0.85,
      },
      archetype_variations: {
        musa: {
          name: { korean: "무사유수", english: "Warrior Flowing Water" },
          damageModifier: 1.1,
          speedModifier: 1.1,
          kiCostModifier: 0.9,
          effects: ["discipline"],
        },
        amsalja: {
          name: { korean: "암살연류", english: "Assassination Flow" },
          damageModifier: 1.4,
          speedModifier: 1.5,
          kiCostModifier: 1.0,
          effects: ["stealth_strike"],
        },
        hacker: {
          name: { korean: "디지털류", english: "Digital Flow" },
          damageModifier: 1.0,
          speedModifier: 1.6,
          kiCostModifier: 0.7,
          effects: ["data_stream"],
        },
        jeongbo_yowon: {
          name: { korean: "정보연격", english: "Intelligence Chain Strike" },
          damageModifier: 1.1,
          speedModifier: 1.3,
          kiCostModifier: 0.8,
          effects: ["analysis_bonus"],
        },
        jojik_pokryeokbae: {
          name: { korean: "거리연타", english: "Street Combo" },
          damageModifier: 1.2,
          speedModifier: 1.2,
          kiCostModifier: 1.1,
          effects: ["dirty_fighting"],
        },
      },
    },

    // Continue for other stances...
    li: {
      primary: {
        id: "li_primary",
        korean: { korean: "화염지창", english: "Flame Finger Spear" },
        english: { korean: "화염지창", english: "Flame Finger Spear" },
        stance: "li",
        damage: 28,
        kiCost: 18,
        staminaCost: 22,
        hitChance: 0.83,
        criticalChance: 0.18,
        description: {
          korean: "불처럼 빠르고 정확한 지르기 공격",
          english: "Fire-like fast and precise thrusting attack",
        },
        targetAreas: ["torso", "vital_points"],
        effects: ["burn", "precision"],
        executionTime: 450,
        range: 1.1,
        accuracy: 0.92,
      },
      secondary: {
        id: "li_secondary",
        korean: { korean: "화신장", english: "Fire Spirit Palm" },
        english: { korean: "화신장", english: "Fire Spirit Palm" },
        stance: "li",
        damage: 24,
        kiCost: 14,
        staminaCost: 18,
        hitChance: 0.87,
        criticalChance: 0.13,
        description: {
          korean: "화신의 기운을 담은 장법",
          english: "Palm technique infused with fire spirit energy",
        },
        targetAreas: ["torso", "head"],
        effects: ["energy_drain"],
        executionTime: 550,
        range: 0.9,
        accuracy: 0.89,
      },
      advanced: {
        id: "li_advanced",
        korean: {
          korean: "화룡출수",
          english: "Fire Dragon Emerges from Water",
        },
        english: {
          korean: "화룡출수",
          english: "Fire Dragon Emerges from Water",
        },
        stance: "li",
        damage: 42,
        kiCost: 32,
        staminaCost: 38,
        hitChance: 0.78,
        criticalChance: 0.28,
        description: {
          korean: "화룡이 물에서 나오듯 강력한 상승 공격",
          english:
            "Powerful rising attack like fire dragon emerging from water",
        },
        targetAreas: ["full_body"],
        effects: ["burn", "knockup", "energy_burst"],
        executionTime: 1100,
        range: 1.8,
        accuracy: 0.94,
      },
      archetype_variations: {
        musa: {
          name: { korean: "무사화검", english: "Warrior Fire Sword" },
          damageModifier: 1.15,
          speedModifier: 1.05,
          kiCostModifier: 0.95,
          effects: ["righteous_fire"],
        },
        amsalja: {
          name: { korean: "암살화독", english: "Assassination Fire Poison" },
          damageModifier: 1.6,
          speedModifier: 1.4,
          kiCostModifier: 1.1,
          effects: ["poison_burn"],
        },
        hacker: {
          name: { korean: "플라즈마", english: "Plasma Strike" },
          damageModifier: 1.2,
          speedModifier: 1.5,
          kiCostModifier: 0.8,
          effects: ["electric_burn"],
        },
        jeongbo_yowon: {
          name: { korean: "정보화염", english: "Intelligence Flame" },
          damageModifier: 1.1,
          speedModifier: 1.25,
          kiCostModifier: 0.85,
          effects: ["revealing_fire"],
        },
        jojik_pokryeokbae: {
          name: { korean: "몰토프", english: "Molotov Strike" },
          damageModifier: 1.35,
          speedModifier: 1.0,
          kiCostModifier: 1.15,
          effects: ["explosive_burn"],
        },
      },
    },

    // Add remaining stances with similar structure...
    jin: {
      primary: {
        id: "jin_primary",
        korean: { korean: "벽력일섬", english: "Lightning Flash" },
        english: { korean: "벽력일섬", english: "Lightning Flash" },
        stance: "jin",
        damage: 30,
        kiCost: 20,
        staminaCost: 25,
        hitChance: 0.8,
        criticalChance: 0.2,
        description: {
          korean: "번개처럼 빠른 일격",
          english: "Lightning-fast single strike",
        },
        targetAreas: ["head", "torso"],
        effects: ["shock", "stun"],
        executionTime: 300,
        range: 1.3,
        accuracy: 0.95,
      },
      secondary: {
        id: "jin_secondary",
        korean: { korean: "뇌성벽력", english: "Thunder Roar" },
        english: { korean: "뇌성벽력", english: "Thunder Roar" },
        stance: "jin",
        damage: 26,
        kiCost: 16,
        staminaCost: 20,
        hitChance: 0.85,
        criticalChance: 0.15,
        description: {
          korean: "천둥소리와 함께 강력한 타격",
          english: "Powerful strike with thunder sound",
        },
        targetAreas: ["torso"],
        effects: ["fear", "knockback"],
        executionTime: 650,
        range: 1.2,
        accuracy: 0.87,
      },
      advanced: {
        id: "jin_advanced",
        korean: { korean: "천뢰진동", english: "Heavenly Thunder Tremor" },
        english: { korean: "천뢰진동", english: "Heavenly Thunder Tremor" },
        stance: "jin",
        damage: 45,
        kiCost: 35,
        staminaCost: 40,
        hitChance: 0.75,
        criticalChance: 0.3,
        description: {
          korean: "하늘의 천둥으로 대지를 진동시키는 궁극기",
          english:
            "Ultimate technique that shakes the earth with heavenly thunder",
        },
        targetAreas: ["area_effect"],
        effects: ["shock", "stun", "area_damage"],
        executionTime: 1300,
        range: 2.5,
        accuracy: 0.9,
      },
      archetype_variations: {
        musa: {
          name: { korean: "무사뇌격", english: "Warrior Thunder Strike" },
          damageModifier: 1.2,
          speedModifier: 1.1,
          kiCostModifier: 0.9,
          effects: ["honorable_thunder"],
        },
        amsalja: {
          name: { korean: "암살전격", english: "Assassination Lightning" },
          damageModifier: 1.7,
          speedModifier: 1.6,
          kiCostModifier: 1.0,
          effects: ["silent_lightning"],
        },
        hacker: {
          name: { korean: "EMP파동", english: "EMP Wave" },
          damageModifier: 1.1,
          speedModifier: 1.8,
          kiCostModifier: 0.7,
          effects: ["electronic_disruption"],
        },
        jeongbo_yowon: {
          name: { korean: "정보전격", english: "Intelligence Lightning" },
          damageModifier: 1.15,
          speedModifier: 1.4,
          kiCostModifier: 0.8,
          effects: ["data_shock"],
        },
        jojik_pokryeokbae: {
          name: { korean: "전기봉", english: "Electric Baton" },
          damageModifier: 1.3,
          speedModifier: 1.1,
          kiCostModifier: 1.2,
          effects: ["taser_effect"],
        },
      },
    },

    son: {
      primary: {
        id: "son_primary",
        korean: { korean: "선풍연격", english: "Whirlwind Strikes" },
        english: { korean: "선풍연격", english: "Whirlwind Strikes" },
        stance: "son",
        damage: 20,
        kiCost: 12,
        staminaCost: 15,
        hitChance: 0.9,
        criticalChance: 0.1,
        description: {
          korean: "바람처럼 연속된 공격",
          english: "Wind-like continuous attacks",
        },
        targetAreas: ["arms", "legs", "torso"],
        effects: ["speed_boost", "combo"],
        executionTime: 400,
        range: 1.0,
        accuracy: 0.85,
      },
      secondary: {
        id: "son_secondary",
        korean: { korean: "풍압장", english: "Wind Pressure Palm" },
        english: { korean: "풍압장", english: "Wind Pressure Palm" },
        stance: "son",
        damage: 24,
        kiCost: 14,
        staminaCost: 18,
        hitChance: 0.88,
        criticalChance: 0.12,
        description: {
          korean: "바람의 압력으로 밀어내는 장법",
          english: "Palm technique that pushes with wind pressure",
        },
        targetAreas: ["torso"],
        effects: ["knockback", "breath_disruption"],
        executionTime: 550,
        range: 1.4,
        accuracy: 0.82,
      },
      advanced: {
        id: "son_advanced",
        korean: { korean: "태풍안목", english: "Typhoon Eye" },
        english: { korean: "태풍안목", english: "Typhoon Eye" },
        stance: "son",
        damage: 38,
        kiCost: 28,
        staminaCost: 35,
        hitChance: 0.82,
        criticalChance: 0.22,
        description: {
          korean: "태풍의 눈처럼 주변을 휩쓰는 기술",
          english: "Technique that sweeps surroundings like typhoon's eye",
        },
        targetAreas: ["circular_area"],
        effects: ["area_damage", "dizzy", "knockback"],
        executionTime: 1000,
        range: 2.2,
        accuracy: 0.88,
      },
      archetype_variations: {
        musa: {
          name: { korean: "무사풍검", english: "Warrior Wind Sword" },
          damageModifier: 1.1,
          speedModifier: 1.2,
          kiCostModifier: 0.9,
          effects: ["disciplined_wind"],
        },
        amsalja: {
          name: { korean: "암살질풍", english: "Assassination Gale" },
          damageModifier: 1.4,
          speedModifier: 1.7,
          kiCostModifier: 1.0,
          effects: ["invisible_wind"],
        },
        hacker: {
          name: { korean: "데이터스톰", english: "Data Storm" },
          damageModifier: 1.0,
          speedModifier: 2.0,
          kiCostModifier: 0.6,
          effects: ["information_overload"],
        },
        jeongbo_yowon: {
          name: { korean: "정보순환", english: "Information Circulation" },
          damageModifier: 1.05,
          speedModifier: 1.5,
          kiCostModifier: 0.75,
          effects: ["data_flow"],
        },
        jojik_pokryeokbae: {
          name: { korean: "난투바람", english: "Brawl Wind" },
          damageModifier: 1.25,
          speedModifier: 1.3,
          kiCostModifier: 1.1,
          effects: ["chaotic_strikes"],
        },
      },
    },

    gam: {
      primary: {
        id: "gam_primary",
        korean: { korean: "수류반격", english: "Water Flow Counter" },
        english: { korean: "수류반격", english: "Water Flow Counter" },
        stance: "gam",
        damage: 22,
        kiCost: 10,
        staminaCost: 12,
        hitChance: 0.92,
        criticalChance: 0.08,
        description: {
          korean: "물의 흐름으로 상대의 공격을 흘려보내며 반격",
          english: "Counter by deflecting opponent's attack with water flow",
        },
        targetAreas: ["torso", "arms"],
        effects: ["counter", "defense_boost"],
        executionTime: 350,
        range: 0.9,
        accuracy: 0.93,
      },
      secondary: {
        id: "gam_secondary",
        korean: { korean: "심연장", english: "Abyss Palm" },
        english: { korean: "심연장", english: "Abyss Palm" },
        stance: "gam",
        damage: 26,
        kiCost: 16,
        staminaCost: 20,
        hitChance: 0.85,
        criticalChance: 0.15,
        description: {
          korean: "깊은 바다의 압력을 담은 장법",
          english: "Palm technique containing deep sea pressure",
        },
        targetAreas: ["torso", "vital_points"],
        effects: ["pressure", "breath_disruption"],
        executionTime: 600,
        range: 1.0,
        accuracy: 0.9,
      },
      advanced: {
        id: "gam_advanced",
        korean: { korean: "해일진", english: "Tsunami Formation" },
        english: { korean: "해일진", english: "Tsunami Formation" },
        stance: "gam",
        damage: 40,
        kiCost: 30,
        staminaCost: 35,
        hitChance: 0.8,
        criticalChance: 0.25,
        description: {
          korean: "해일처럼 거대한 기운으로 적을 압도",
          english: "Overwhelm enemies with tsunami-like massive energy",
        },
        targetAreas: ["wave_area"],
        effects: ["knockdown", "area_damage", "water_prison"],
        executionTime: 1200,
        range: 2.8,
        accuracy: 0.85,
      },
      archetype_variations: {
        musa: {
          name: { korean: "무사수검", english: "Warrior Water Sword" },
          damageModifier: 1.1,
          speedModifier: 1.0,
          kiCostModifier: 0.85,
          effects: ["flowing_honor"],
        },
        amsalja: {
          name: { korean: "암살수독", english: "Assassination Water Poison" },
          damageModifier: 1.5,
          speedModifier: 1.3,
          kiCostModifier: 1.0,
          effects: ["poisoned_water"],
        },
        hacker: {
          name: { korean: "액체컴퓨터", english: "Liquid Computer" },
          damageModifier: 1.0,
          speedModifier: 1.4,
          kiCostModifier: 0.7,
          effects: ["data_flow"],
        },
        jeongbo_yowon: {
          name: { korean: "정보심연", english: "Information Abyss" },
          damageModifier: 1.05,
          speedModifier: 1.2,
          kiCostModifier: 0.8,
          effects: ["deep_analysis"],
        },
        jojik_pokryeokbae: {
          name: { korean: "하수도", english: "Sewer Strike" },
          damageModifier: 1.2,
          speedModifier: 1.1,
          kiCostModifier: 1.1,
          effects: ["dirty_water"],
        },
      },
    },

    gan: {
      primary: {
        id: "gan_primary",
        korean: { korean: "반석방어", english: "Rock Defense" },
        english: { korean: "반석방어", english: "Rock Defense" },
        stance: "gan",
        damage: 15,
        kiCost: 8,
        staminaCost: 10,
        hitChance: 0.95,
        criticalChance: 0.05,
        description: {
          korean: "바위처럼 견고한 방어 자세",
          english: "Rock-solid defensive posture",
        },
        targetAreas: ["defensive"],
        effects: ["defense_boost", "counter_ready"],
        executionTime: 200,
        range: 0.7,
        accuracy: 0.98,
      },
      secondary: {
        id: "gan_secondary",
        korean: { korean: "산악붕괴", english: "Mountain Collapse" },
        english: { korean: "산악붕괴", english: "Mountain Collapse" },
        stance: "gan",
        damage: 32,
        kiCost: 22,
        staminaCost: 28,
        hitChance: 0.78,
        criticalChance: 0.18,
        description: {
          korean: "산이 무너지듯 강력한 내려찍기",
          english: "Powerful downward strike like mountain collapse",
        },
        targetAreas: ["head", "shoulders"],
        effects: ["crush", "stun"],
        executionTime: 800,
        range: 1.1,
        accuracy: 0.92,
      },
      advanced: {
        id: "gan_advanced",
        korean: { korean: "태산압정", english: "Mount Tai Pressure" },
        english: { korean: "태산압정", english: "Mount Tai Pressure" },
        stance: "gan",
        damage: 44,
        kiCost: 35,
        staminaCost: 40,
        hitChance: 0.75,
        criticalChance: 0.3,
        description: {
          korean: "태산의 무게로 적을 압박하는 궁극 방어기",
          english:
            "Ultimate defensive technique pressing enemies with Mount Tai's weight",
        },
        targetAreas: ["area_pressure"],
        effects: ["immobilize", "crush", "fear"],
        executionTime: 1400,
        range: 1.5,
        accuracy: 0.95,
      },
      archetype_variations: {
        musa: {
          name: { korean: "무사석벽", english: "Warrior Stone Wall" },
          damageModifier: 1.1,
          speedModifier: 0.9,
          kiCostModifier: 0.8,
          effects: ["unbreakable_will"],
        },
        amsalja: {
          name: { korean: "암살석화", english: "Assassination Petrification" },
          damageModifier: 1.3,
          speedModifier: 1.1,
          kiCostModifier: 1.0,
          effects: ["stone_poison"],
        },
        hacker: {
          name: { korean: "방화벽", english: "Firewall" },
          damageModifier: 0.8,
          speedModifier: 1.2,
          kiCostModifier: 0.6,
          effects: ["cyber_defense"],
        },
        jeongbo_yowon: {
          name: { korean: "정보요새", english: "Information Fortress" },
          damageModifier: 0.9,
          speedModifier: 1.0,
          kiCostModifier: 0.7,
          effects: ["data_protection"],
        },
        jojik_pokryeokbae: {
          name: { korean: "콘크리트", english: "Concrete Strike" },
          damageModifier: 1.4,
          speedModifier: 0.8,
          kiCostModifier: 1.2,
          effects: ["brutal_defense"],
        },
      },
    },

    gon: {
      primary: {
        id: "gon_primary",
        korean: { korean: "대지포옹", english: "Earth Embrace" },
        english: { korean: "대지포옹", english: "Earth Embrace" },
        stance: "gon",
        damage: 28,
        kiCost: 18,
        staminaCost: 22,
        hitChance: 0.88,
        criticalChance: 0.12,
        description: {
          korean: "대지가 품듯 상대를 감싸며 제압",
          english: "Suppress opponent by embracing like earth",
        },
        targetAreas: ["full_body"],
        effects: ["grapple", "drain"],
        executionTime: 700,
        range: 0.8,
        accuracy: 0.9,
      },
      secondary: {
        id: "gon_secondary",
        korean: { korean: "지진파", english: "Earthquake Wave" },
        english: { korean: "지진파", english: "Earthquake Wave" },
        stance: "gon",
        damage: 24,
        kiCost: 15,
        staminaCost: 18,
        hitChance: 0.85,
        criticalChance: 0.1,
        description: {
          korean: "대지를 진동시켜 적의 균형을 무너뜨림",
          english: "Shake the ground to disrupt enemy balance",
        },
        targetAreas: ["legs", "balance"],
        effects: ["knockdown", "dizzy"],
        executionTime: 600,
        range: 2.0,
        accuracy: 0.8,
      },
      advanced: {
        id: "gon_advanced",
        korean: { korean: "천지개벽", english: "Heaven Earth Creation" },
        english: { korean: "천지개벽", english: "Heaven Earth Creation" },
        stance: "gon",
        damage: 48,
        kiCost: 40,
        staminaCost: 45,
        hitChance: 0.7,
        criticalChance: 0.35,
        description: {
          korean: "천지가 갈라지듯 모든 것을 재창조하는 궁극기",
          english:
            "Ultimate technique recreating everything like heaven-earth split",
        },
        targetAreas: ["reality_warp"],
        effects: ["reality_shift", "massive_damage", "reset"],
        executionTime: 1500,
        range: 3.0,
        accuracy: 0.99,
      },
      archetype_variations: {
        musa: {
          name: { korean: "무사대지", english: "Warrior Earth" },
          damageModifier: 1.15,
          speedModifier: 0.95,
          kiCostModifier: 0.85,
          effects: ["grounded_honor"],
        },
        amsalja: {
          name: { korean: "암살매장", english: "Assassination Burial" },
          damageModifier: 1.6,
          speedModifier: 1.2,
          kiCostModifier: 1.05,
          effects: ["underground_kill"],
        },
        hacker: {
          name: { korean: "매트릭스", english: "Matrix Control" },
          damageModifier: 1.2,
          speedModifier: 1.3,
          kiCostModifier: 0.75,
          effects: ["reality_hack"],
        },
        jeongbo_yowon: {
          name: { korean: "정보대지", english: "Information Earth" },
          damageModifier: 1.1,
          speedModifier: 1.1,
          kiCostModifier: 0.8,
          effects: ["data_foundation"],
        },
        jojik_pokryeokbae: {
          name: { korean: "시멘트화", english: "Cement Shoes" },
          damageModifier: 1.3,
          speedModifier: 0.9,
          kiCostModifier: 1.15,
          effects: ["concrete_prison"],
        },
      },
    },
  };

  /**
   * Get technique for specific stance and archetype
   */
  static getTechniqueForStanceAndArchetype(
    stance: TrigramStance,
    archetype: PlayerArchetype,
    level: "primary" | "secondary" | "advanced" = "primary"
  ): KoreanTechnique {
    const stanceData = this.TECHNIQUE_DATABASE[stance];
    const baseTechnique = stanceData[level];
    const variation = stanceData.archetype_variations[archetype];

    // Apply archetype modifications
    return {
      ...baseTechnique,
      id: `${baseTechnique.id}_${archetype}`,
      korean: variation.name,
      english: variation.name,
      damage: Math.round(
        (baseTechnique.damage || 0) * variation.damageModifier
      ),
      kiCost: Math.round(
        (baseTechnique.kiCost || 0) * variation.kiCostModifier
      ),
      executionTime: Math.round(
        (baseTechnique.executionTime || 0) / variation.speedModifier
      ),
      effects: [...(baseTechnique.effects || []), ...variation.effects],
    };
  }

  /**
   * Get all techniques for a stance
   */
  static getAllTechniquesForStance(stance: TrigramStance): {
    primary: KoreanTechnique;
    secondary: KoreanTechnique;
    advanced: KoreanTechnique;
  } {
    const stanceData = this.TECHNIQUE_DATABASE[stance];
    return {
      primary: stanceData.primary,
      secondary: stanceData.secondary,
      advanced: stanceData.advanced,
    };
  }

  /**
   * Calculate technique effectiveness against target stance
   */
  static calculateTechniqueEffectiveness(
    attackStance: TrigramStance,
    defendStance: TrigramStance
  ): number {
    // Trigram interaction matrix based on I Ching principles
    const interactions: Record<TrigramStance, Record<TrigramStance, number>> = {
      geon: {
        geon: 1.0,
        tae: 1.2,
        li: 0.8,
        jin: 1.1,
        son: 0.9,
        gam: 1.3,
        gan: 0.7,
        gon: 1.4,
      },
      tae: {
        geon: 0.8,
        tae: 1.0,
        li: 1.2,
        jin: 0.9,
        son: 1.3,
        gam: 1.1,
        gan: 1.4,
        gon: 0.7,
      },
      li: {
        geon: 1.2,
        tae: 0.8,
        li: 1.0,
        jin: 1.3,
        son: 1.1,
        gam: 0.7,
        gan: 1.4,
        gon: 0.9,
      },
      jin: {
        geon: 0.9,
        tae: 1.1,
        li: 0.7,
        jin: 1.0,
        son: 1.4,
        gam: 1.2,
        gan: 0.8,
        gon: 1.3,
      },
      son: {
        geon: 1.1,
        tae: 0.7,
        li: 0.9,
        jin: 0.6,
        son: 1.0,
        gam: 1.4,
        gam: 1.3,
        gon: 1.2,
      },
      gam: {
        geon: 0.7,
        tae: 0.9,
        li: 1.3,
        jin: 0.8,
        son: 0.6,
        gam: 1.0,
        gan: 1.2,
        gon: 1.4,
      },
      gan: {
        geon: 1.3,
        tae: 0.6,
        li: 0.6,
        jin: 1.2,
        son: 0.7,
        gam: 0.8,
        gan: 1.0,
        gon: 1.1,
      },
      gon: {
        geon: 0.6,
        tae: 1.3,
        li: 1.1,
        jin: 0.7,
        son: 0.8,
        gam: 0.6,
        gan: 0.9,
        gon: 1.0,
      },
    };

    return interactions[attackStance][defendStance] || 1.0;
  }
}
