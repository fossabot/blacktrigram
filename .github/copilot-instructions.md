# GitHub Copilot Instructions for Black Trigram (흑괘)

## Project Overview

Black Trigram is a **realistic 2D precision combat simulator** deeply rooted in Korean martial arts and the I Ching trigram philosophy. The game emphasizes anatomical realism, precise targeting, authentic martial techniques, and cyberpunk aesthetics.

**Genre**: 2D Realistic Precision Combat Simulator / Traditional Korean Martial Arts Training  
**Platform**: Web-based (HTML5/WebGL via PixiJS + React)  
**Core Focus**: Anatomical targeting, authentic Korean martial arts, 5 player archetypes, 70 vital points

## 🎯 Core Game Concepts

### Player Archetypes (Must Reference in All Combat Code)

- **무사 (Musa)** - Traditional Warrior: Honor through strength
- **암살자 (Amsalja)** - Shadow Assassin: Efficiency through invisibility
- **해커 (Hacker)** - Cyber Warrior: Information as power
- **정보요원 (Jeongbo Yowon)** - Intelligence Operative: Knowledge through observation
- **조직폭력배 (Jojik Pokryeokbae)** - Organized Crime: Survival through ruthlessness

### Eight Trigram Combat System (팔괘)

- **☰ 건 (Geon)** - Heaven: Direct bone-striking force
- **☱ 태 (Tae)** - Lake: Fluid joint manipulation
- **☲ 리 (Li)** - Fire: Precise nerve strikes
- **☳ 진 (Jin)** - Thunder: Stunning techniques
- **☴ 손 (Son)** - Wind: Continuous pressure
- **☵ 감 (Gam)** - Water: Blood flow restriction
- **☶ 간 (Gan)** - Mountain: Defensive counters
- **☷ 곤 (Gon)** - Earth: Ground techniques

### Combat Mechanics

- **70 Anatomical Vital Points** for precise targeting
- **Realistic Body Mechanics**: Health, consciousness, pain, balance, stamina
- **Authentic Korean Techniques** with cultural accuracy
- **Damage Calculation** based on technique precision and force

## 🏗️ Current Architecture Status

### ✅ Implemented Systems

#### Type System (`src/types/` - 60 lines total)

**Status**: ✅ **COMPLETE** - Comprehensive type definitions

- `src/types/index.ts` (4) - Unified type exports
- `src/types/trigram.ts` (12) - Complete trigram system with TRIGRAM_DATA
- `src/types/combat.ts` (4) - Combat mechanics types
- `src/types/player.ts` (4) - Player state and actions
- `src/types/anatomy.ts` (4) - Vital points and anatomical regions
- `src/types/ui.ts` (4) - UI component interfaces
- `src/types/game.ts` (4) - Game flow and screens
- `src/types/enums.ts` (4) - String literal unions
- `src/types/constants.ts` (4) - Global constants including KOREAN_COLORS
- `src/types/effects.ts` (4) - Status effects and conditions
- `src/types/common.ts` (4) - Basic shared types
- `src/types/pixi-react.d.ts` (4) - PixiJS React integration

#### Audio System (`src/audio/` - 108 lines total)

**Status**: ✅ **EXCELLENT** - Professional implementation

- `src/audio/AudioManager.ts` (24) - Main audio management system
- `src/audio/DefaultSoundGenerator.ts` (8) - Procedural sound generation
- `src/audio/AudioUtils.ts` (8) - Audio utility functions
- `src/audio/placeholder-sounds.ts` (4) - Temporary audio placeholders
- `src/audio/AudioManager.tsx` (4) - React component wrapper
- Comprehensive tests in `__tests__/` (56 lines)

#### Core Systems (`src/systems/` - 248 lines total)

**Status**: ✅ **GOOD FOUNDATION** - Core logic implemented

- `src/systems/CombatSystem.ts` (8) - Main combat orchestration
- `src/systems/VitalPointSystem.ts` (8) - Anatomical targeting
- `src/systems/TrigramSystem.ts` (8) - Eight trigram logic
- `src/systems/trigram/` (144) - Detailed trigram mechanics
- `src/systems/vitalpoint/` (56) - Vital point calculations

#### Training System (`src/components/training/` - 36 lines total)

**Status**: ✅ **IMPLEMENTED** - Complete training interface

- `src/components/training/TrainingScreen.tsx` (12) - Main training component
- Comprehensive tests and mock system

### ⚠️ Partially Implemented Systems

#### Game Components (`src/components/game/` - 96 lines total)

**Status**: ⚠️ **PARTIAL** - Structure exists, needs implementation

- `src/components/game/GameEngine.tsx` (8) - Game loop (needs expansion)
- `src/components/game/GameUI.tsx` (12) - UI overlay (basic implementation)
- `src/components/game/Player.tsx` (4) - Player entity (skeleton)
- `src/components/game/PlayerVisuals.tsx` (12) - Visual rendering
- `src/components/game/HitEffectsLayer.tsx` (4) - Combat effects
- `src/components/game/DojangBackground.tsx` (4) - Environment

#### UI Components (`src/components/ui/` - 156 lines total)

**Status**: ⚠️ **MIXED** - Korean text system complete, other components need work

- `src/components/ui/base/korean-text/` (72) - ✅ **COMPLETE** Korean typography
- `src/components/ui/TrigramWheel.tsx` (8) - Stance selection (needs implementation)
- `src/components/ui/ProgressTracker.tsx` (4) - Health/Ki bars (skeleton)
- `src/components/ui/KoreanHeader.tsx` (4) - Header component (skeleton)

#### Introduction System (`src/components/intro/` - 40 lines total)

**Status**: ⚠️ **MINIMAL** - Basic structure, needs content

- `src/components/intro/IntroScreen.tsx` (4) - Main intro (skeleton)
- Philosophy section has some content (12 lines)

## 🎯 Strict TypeScript Usage

**ALWAYS use explicit types from existing type system:**

```typescript
// Import from unified type system
import type {
  PlayerArchetype,
  TrigramStance,
  VitalPoint,
  CombatState,
  KoreanTechnique,
  TRIGRAM_DATA,
  KOREAN_COLORS,
} from "../types";

// Use existing trigram data
const technique = TRIGRAM_DATA[stance].technique;
const color = KOREAN_COLORS.geon; // For stance colors

// Never use 'any' - use 'unknown' if absolutely necessary
function processGameData(data: unknown): CombatResult {
  if (isCombatData(data)) {
    return calculateDamage(data);
  }
  throw new Error("Invalid game data");
}
```

### Component Reuse Strategy

**ALWAYS check existing components before creating new ones:**

#### Korean Text System (✅ Complete - Reuse Extensively)

```typescript
// Use comprehensive Korean text components
import {
  KoreanText,
  KoreanTitle,
  KoreanTechniqueText,
  KoreanMartialText,
  KoreanStatusText,
} from "../ui/base/korean-text";

// Example usage with proper typing
<KoreanTechniqueText
  korean="천둥벽력"
  english="Thunder Strike"
  trigram="geon"
/>;
```

#### Audio Integration (✅ Complete - Use Extensively)

```typescript
// Use existing audio manager
import { useAudio } from "../audio/AudioManager";

const audio = useAudio();
audio.playAttackSound(damage);
audio.playHitSound(damage, isVitalPoint);
audio.playTechniqueSound(technique.korean);
```

#### Combat Systems (✅ Foundation - Build Upon)

```typescript
// Use existing combat systems
import { CombatSystem } from "../systems/CombatSystem";
import { VitalPointSystem } from "../systems/VitalPointSystem";
import { TrigramSystem } from "../systems/TrigramSystem";

// Use trigram data
import { TRIGRAM_DATA, STANCE_EFFECTIVENESS_MATRIX } from "../types/trigram";

const effectiveness =
  STANCE_EFFECTIVENESS_MATRIX[attackerStance][defenderStance];
```

## ⚡ Priority Implementation Areas

### 🚨 Critical Gaps (Implement First)

1. **Game Engine Core** (`src/components/game/GameEngine.tsx`)

   - Expand from 8 lines to full game loop
   - Integrate existing CombatSystem and VitalPointSystem
   - Use existing PlayerState types

2. **Player Component** (`src/components/game/Player.tsx`)

   - Build complete Korean martial artist
   - Use existing TRIGRAM_DATA for techniques
   - Integrate with existing audio system

3. **TrigramWheel Implementation** (`src/components/ui/TrigramWheel.tsx`)
   - Build interactive stance selection
   - Use existing TRIGRAM_DATA and colors
   - Integrate with Korean text system

### 🔧 Enhancement Areas (Build Upon Existing)

1. **GameUI Enhancement** (`src/components/game/GameUI.tsx`)

   - Expand current 12-line implementation
   - Use existing Korean text components
   - Integrate with existing ProgressTracker interface

2. **Hit Effects System** (`src/components/game/HitEffectsLayer.tsx`)
   - Expand from skeleton to full effect system
   - Use existing KOREAN_COLORS
   - Integrate with audio feedback

## 🎨 PixiJS + React Integration

**Use @pixi/react components declaratively:**

```typescript
import { Stage, Container, Sprite, Graphics, Text, useTick } from "@pixi/react";
import { useCallback } from "react";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../types";

// Korean martial artist component following existing patterns
function KoreanMartialArtist({
  archetype,
  stance,
  position,
}: {
  archetype: PlayerArchetype;
  stance: TrigramStance;
  position: { x: number; y: number };
}) {
  const technique = TRIGRAM_DATA[stance].technique;
  const stanceColor = KOREAN_COLORS[stance];

  const drawMartialArtist = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      // Use existing color constants
      g.setFillStyle({ color: KOREAN_COLORS.WHITE, alpha: 0.9 });
      g.rect(-25, -90, 50, 90);
      g.fill();

      // Stance-specific aura using existing data
      g.setStrokeStyle({ color: stanceColor, width: 8 });
      g.circle(0, -45, 45);
      g.stroke();
    },
    [stance, stanceColor]
  );

  return (
    <Container x={position.x} y={position.y}>
      <Graphics draw={drawMartialArtist} />
      {/* Use existing Korean text components */}
      <KoreanTechniqueText
        korean={technique.koreanName}
        english={technique.englishName}
        trigram={stance}
      />
    </Container>
  );
}
```

## 🧪 Testing Strategy

### Existing Test Infrastructure (✅ Excellent)

- **Setup**: `src/test/setup.ts` (8) - PixiJS and audio mocking
- **Utils**: `src/test/test-utils.ts` (4) - Testing utilities
- **Audio Tests**: Comprehensive coverage in `src/audio/__tests__/`
- **System Tests**: Coverage for combat systems

### Test Patterns to Follow

```typescript
// Use existing test utilities
import { renderWithAudio, mockAudioContext } from "../test/test-utils";

describe("CombatSystem Integration", () => {
  it("should execute Korean technique with audio feedback", () => {
    const mockAudio = mockAudioContext();

    // Use existing TRIGRAM_DATA
    const technique = TRIGRAM_DATA.geon.technique;

    // Test with existing audio system
    result.current.playAttackSound(technique.damage);
    expect(mockAudio.playAttackSound).toHaveBeenCalledWith(28);
  });
});
```

## 🎯 Core Game Design Philosophy

### Combat Pillars (Must Guide All Implementation)

- **정격자 (Jeonggyeokja)** - Precision Striker: Every strike targets anatomical vulnerabilities
- **비수 (Bisu)** - Lethal Technique: Realistic application of traditional martial arts
- **암살자 (Amsalja)** - Combat Specialist: Focus on immediate incapacitation
- **급소격 (Geupsogyeok)** - Vital Point Strike: Authentic pressure point combat

### Realistic Combat Mechanics (Implement in All Combat Code)

```typescript
// Authentic combat mechanics structure
interface CombatMechanics {
  health: number; // 0-100 overall condition
  pain: number; // Current pain level affecting performance
  balance: CombatState; // READY | SHAKEN | VULNERABLE | HELPLESS
  consciousness: number; // 0-100 awareness level
  bloodLoss: number; // Cumulative bleeding effects
  stamina: number; // Energy and endurance status
}

// Combat readiness states
enum CombatReadiness {
  READY = 100, // Combat ready, full capability
  LIGHT_DAMAGE = 80, // Light damage, reduced capability
  MODERATE = 60, // Moderate damage, significant impairment
  HEAVY = 40, // Heavy damage, severe limitation
  CRITICAL = 20, // Critical damage, near incapacitation
  INCAPACITATED = 0, // Incapacitated/Defeated
}
```

## 👤 Player Archetypes (Must Reference in All Combat Code)

### Combat Specializations (Implement Unique Mechanics)

#### 1. 무사 (Musa) - Traditional Warrior

```typescript
const MUSA_SPECIALIZATION = {
  philosophy: "Honor through strength, disciplined combat",
  combatStyle: "Direct confrontation, overwhelming force",
  preferredTrigrams: ["geon", "jin"],
  techniques: {
    관절기법: "Joint manipulation and control",
    급소타격: "Military-taught pressure point targeting",
    제압술: "Honor-based control methods",
  },
  bonuses: {
    damageResistance: 1.2,
    jointTechniques: 1.5,
    militaryDiscipline: 1.3,
  },
};
```

#### 2. 암살자 (Amsalja) - Shadow Assassin

```typescript
const AMSALJA_SPECIALIZATION = {
  philosophy: "Efficiency through invisibility, one perfect strike",
  combatStyle: "Stealth approaches, instant takedowns",
  preferredTrigrams: ["son", "gam"],
  techniques: {
    무성제압: "Silent takedowns preventing vocal response",
    신경파괴: "Precise neural disruption for stealth",
    호흡차단: "Silent breathing and consciousness targeting",
  },
  bonuses: {
    stealthMultiplier: 1.8,
    oneStrikeKill: 2.0,
    silentMovement: 1.5,
  },
};
```

#### 3. 해커 (Hacker) - Cyber Warrior

```typescript
const HACKER_SPECIALIZATION = {
  philosophy: "Information as power, technological advantage",
  combatStyle: "Environmental manipulation, tech-assisted strikes",
  preferredTrigrams: ["li", "tae"],
  techniques: {
    해부학적분석: "Data-driven approach to vital points",
    생체역학파괴: "Tech-enhanced body mechanics understanding",
    체계적제압: "Algorithm-based damage accumulation",
  },
  bonuses: {
    precisionAnalysis: 1.6,
    environmentalControl: 1.4,
    dataOptimization: 1.3,
  },
};
```

#### 4. 정보요원 (Jeongbo Yowon) - Intelligence Operative

```typescript
const JEONGBO_SPECIALIZATION = {
  philosophy: "Knowledge through observation, strategic thinking",
  combatStyle: "Psychological manipulation, precise timing",
  preferredTrigrams: ["gan", "gon"],
  techniques: {
    고통순응: "Intelligence-based submission through pain",
    심리적압박: "Mental intimidation through technique",
    정보추출: "Combat methods from interrogation training",
  },
  bonuses: {
    psychologicalWarfare: 1.5,
    strategicAnalysis: 1.4,
    painCompliance: 1.7,
  },
};
```

#### 5. 조직폭력배 (Jojik Pokryeokbae) - Organized Crime

```typescript
const JOJIK_SPECIALIZATION = {
  philosophy: "Survival through ruthlessness, practical violence",
  combatStyle: "Dirty fighting, improvised weapons",
  preferredTrigrams: ["jin", "gam"],
  techniques: {
    환경활용: "Street-smart use of surroundings as weapons",
    더러운기법: "Brutal eye attacks, groin strikes, hair pulling",
    생존격투: "Underground whatever-it-takes combat",
  },
  bonuses: {
    dirtyFighting: 1.8,
    survivalInstinct: 1.6,
    streetSmart: 1.5,
  },
};
```

## 🎨 Visual Design System

### Cyberpunk Korean Aesthetic (Apply to All Visual Components)

#### Color Palette (Use Existing KOREAN_COLORS)

```typescript
// Primary cyberpunk palette
const CYBERPUNK_PALETTE = {
  PRIMARY_CYAN: KOREAN_COLORS.CYAN,
  NEON_RED: KOREAN_COLORS.TRADITIONAL_RED,
  ELECTRIC_BLUE: KOREAN_COLORS.DOJANG_BLUE,
  DIGITAL_GOLD: KOREAN_COLORS.GOLD,
  SHADOW_BLACK: KOREAN_COLORS.BLACK,
  TECH_WHITE: KOREAN_COLORS.WHITE,
};

// Stance-specific visual themes
const STANCE_VISUAL_THEMES = {
  geon: { primary: 0xffd700, secondary: 0x8b7355, glow: 0xffed4e },
  tae: { primary: 0x87ceeb, secondary: 0x4682b4, glow: 0xb0e0e6 },
  li: { primary: 0xff4500, secondary: 0x8b0000, glow: 0xff6347 },
  jin: { primary: 0x9370db, secondary: 0x4b0082, glow: 0xda70d6 },
  son: { primary: 0x98fb98, secondary: 0x228b22, glow: 0x90ee90 },
  gam: { primary: 0x4169e1, secondary: 0x191970, glow: 0x6495ed },
  gan: { primary: 0x8b4513, secondary: 0x654321, glow: 0xd2691e },
  gon: { primary: 0x654321, secondary: 0x8b4513, glow: 0xa0522d },
};
```

#### Underground Dojang Environment

```typescript
// Environment visual config
const DOJANG_ENVIRONMENT = {
  lighting: {
    ambient: 0x0a0a0a,
    neonAccents: [0x00ffff, 0xff0040, 0x00ff00],
    bloodStains: 0x8b0000,
    traditional: 0xffd700,
  },
  atmosphere: {
    shadows: "Deep, dramatic shadows with neon highlights",
    textures: "Worn concrete, traditional Korean patterns",
    mood: "Underground, serious, authentic martial arts",
  },
  elements: {
    koreanCalligraphy: "Traditional characters in neon styling",
    trigramSymbols: "☰☱☲☳☴☵☶☷ with cyberpunk interpretation",
    combatEquipment: "Professional-grade training tools",
  },
};
```

### UI/UX Visual Standards

#### Korean Typography System

```typescript
// Use existing Korean text components with these standards
const KOREAN_TYPOGRAPHY = {
  primary: "Noto Sans KR",
  fallback: "Arial, sans-serif",
  weights: {
    light: 300,
    regular: 400,
    bold: 700,
    heavy: 900,
  },
  sizes: {
    small: 12,
    medium: 16,
    large: 24,
    xlarge: 32,
    title: 48,
  },
};

// Always use bilingual text
<KoreanText
  korean="흑괘 무술 도장"
  english="Black Trigram Dojang"
  size="title"
  style="cyberpunk"
/>;
```

## 🔊 Audio Design Integration

### Realistic Combat Audio (Integrate with Existing AudioManager)

#### Korean Martial Arts Soundscape

```typescript
// Combat audio categories (implement with existing audio system)
const COMBAT_AUDIO_DESIGN = {
  // Authentic Korean martial arts sounds
  traditionalSounds: {
    gayageum: "Dark traditional Korean string instrument",
    buk: "Korean war drums for intensity",
    kkwaenggwari: "Small gongs for technique emphasis",
    haegeum: "Korean fiddle for atmospheric tension",
  },

  // Realistic combat effects
  combatRealism: {
    boneImpact: "Authentic bone fracture and contact sounds",
    fleshContact: "Body impact with appropriate intensity",
    jointManipulation: "Realistic joint stress and popping",
    breathingEffects: "Gasping, wheezing, breath disruption",
    bloodFlow: "Circulation and bleeding audio cues",
  },

  // Cyberpunk integration
  futuristicElements: {
    synthDrones: "Low-frequency electronic tension",
    digitalGlitches: "Tech interference during combat",
    neonHum: "Electric ambience of underground dojang",
  },
};

// Audio feedback based on damage intensity
function playRealisticCombatAudio(damage: number, vitalPoint?: VitalPoint) {
  const audio = useAudio();

  // Damage-based audio selection
  if (damage < 10) {
    audio.playSFX("hit_light");
  } else if (damage < 25) {
    audio.playSFX("hit_medium");
  } else if (damage < 40) {
    audio.playSFX("hit_heavy");
  } else {
    audio.playSFX("hit_critical");
  }

  // Vital point specific audio
  if (vitalPoint) {
    audio.playSFX(`vital_${vitalPoint.category}`);
  }
}
```

### Dynamic Audio Layers

```typescript
// Implement layered audio system
const AUDIO_LAYERS = {
  background: {
    dojangAmbience: "Continuous underground atmosphere",
    traditionalMusic: "Korean instruments with electronic elements",
  },

  combat: {
    stanceChanges: "Audio cues for trigram transitions",
    techniqueExecution: "Korean technique name pronunciation",
    impactFeedback: "Realistic damage and effect sounds",
  },

  ui: {
    menuNavigation: "Cyberpunk-styled interface sounds",
    koreanVoiceover: "Authentic Korean pronunciation guide",
    confirmation: "Traditional Korean chimes with modern twist",
  },
};
```

## 🎮 Combat Controls & UX

### Precision Input System (Implement in All Combat Components)

#### Primary Combat Controls

```typescript
// Combat control mapping
const COMBAT_CONTROLS = {
  // Trigram stance system (1-8 keys)
  stanceControls: {
    "1": { stance: "geon", korean: "건", technique: "천둥벽력" },
    "2": { stance: "tae", korean: "태", technique: "유수연타" },
    "3": { stance: "li", korean: "리", technique: "화염지창" },
    "4": { stance: "jin", korean: "진", technique: "벽력일섬" },
    "5": { stance: "son", korean: "손", technique: "선풍연격" },
    "6": { stance: "gam", korean: "감", technique: "수류반격" },
    "7": { stance: "gan", korean: "간", technique: "반석방어" },
    "8": { stance: "gon", korean: "곤", technique: "대지포옹" },
  },

  // Movement and combat actions
  movement: {
    WASD: "Tactical positioning and footwork",
    ArrowKeys: "Alternative movement system",
  },

  combat: {
    SPACE: "Execute current stance technique",
    SHIFT: "Defensive guard/block position",
    CTRL: "Precision vital point targeting mode",
    TAB: "Cycle through player archetypes",
  },

  // System controls
  system: {
    ESC: "Pause menu / Return to intro",
    F1: "Help / Controls guide",
    M: "Mute / Audio settings",
  },
};

// Implement responsive controls
function handleCombatInput(event: KeyboardEvent, player: PlayerState) {
  const key = event.key;

  // Stance changes (1-8)
  if (key >= "1" && key <= "8") {
    const stanceIndex = parseInt(key) - 1;
    const stance = TRIGRAM_STANCES_ORDER[stanceIndex];
    return executeStanceChange(player, stance);
  }

  // Combat actions
  switch (key) {
    case " ": // Space
      return executeTechnique(player);
    case "Shift":
      return toggleGuard(player);
    case "Control":
      return enterVitalPointMode(player);
  }
}
```

### Advanced UX Features

#### Visual Feedback System

```typescript
// Implement comprehensive visual feedback
const VISUAL_FEEDBACK = {
  // Stance indicators
  stanceDisplay: {
    trigramSymbol: "Large center display of current trigram ☰☱☲☳☴☵☶☷",
    koreanName: "Korean and English stance names",
    techniquePreview: "Available technique preview",
    colorCoding: "Stance-specific color themes",
  },

  // Combat feedback
  damageIndicators: {
    numbers: "Floating damage numbers with Korean styling",
    vitalPoints: "Highlighted anatomical targets",
    effectsText: "Korean descriptions of combat effects",
    bloodEffects: "Realistic trauma visualization",
  },

  // UI polish
  interfaceElements: {
    healthBars: "Traditional Korean-styled progress bars",
    kiEnergy: "Flowing energy visualization",
    stanceWheel: "Interactive trigram selection wheel",
    combatLog: "Bilingual combat narration",
  },
};
```

#### Accessibility & Cultural Sensitivity

```typescript
// Implement cultural respect and accessibility
const ACCESSIBILITY_FEATURES = {
  // Korean language support
  localization: {
    fullKorean: "Complete Korean language option",
    bilingualMode: "Korean with English subtitles",
    pronunciation: "Audio pronunciation guide",
    romanization: "Korean text romanization support",
  },

  // Combat accessibility
  difficulty: {
    precisionAssist: "Vital point targeting assistance",
    techniqueGuides: "Visual combat technique tutorials",
    slowerPaced: "Reduced speed options for learning",
    culturalContext: "Martial arts philosophy education",
  },

  // Visual accessibility
  display: {
    colorBlindSupport: "Alternative color schemes",
    textScaling: "Adjustable Korean font sizes",
    contrastOptions: "High contrast cyberpunk themes",
    motionReduction: "Reduced animation for sensitivity",
  },
};
```

## 🏗️ Implementation Patterns

### Component Structure (Follow These Patterns)

#### Game Component Template

```typescript
// Template for all game components
import { useState, useCallback, useEffect } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { PlayerState, TrigramStance, CombatResult } from "../types";
import { useAudio } from "../audio/AudioManager";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../types";

interface GameComponentProps {
  readonly player: PlayerState;
  readonly archetype: PlayerArchetype;
  readonly onStateChange: (updates: Partial<PlayerState>) => void;
  readonly isActive?: boolean;
}

export function GameComponent({
  player,
  archetype,
  onStateChange,
  isActive = true,
}: GameComponentProps): JSX.Element {
  const audio = useAudio();
  const [localState, setLocalState] = useState<ComponentState>({});

  // Use existing trigram data
  const stanceData = TRIGRAM_DATA[player.stance];
  const stanceColor = KOREAN_COLORS[player.stance];

  // Combat logic using existing systems
  const executeTechnique = useCallback(
    (technique: KoreanTechnique) => {
      // Integrate with existing combat systems
      const result = CombatSystem.calculateTechnique(technique, archetype);

      // Audio feedback using existing audio manager
      audio.playAttackSound(result.damage);
      audio.playSFX(`technique_${technique.stance}`);

      // State update
      onStateChange({
        stamina: player.stamina - technique.staminaCost,
        ki: player.ki - technique.kiCost,
      });
    },
    [player, archetype, audio, onStateChange]
  );

  return <Container>{/* Implement component visuals */}</Container>;
}
```

### Testing Requirements (Follow Existing Patterns)

#### Combat System Tests

```typescript
// Test Korean martial arts authenticity
describe("Korean Martial Arts Combat", () => {
  it("should execute authentic trigram techniques", () => {
    const technique = TRIGRAM_DATA.geon.technique;
    expect(technique.koreanName).toBe("천둥벽력");
    expect(technique.englishName).toBe("Heavenly Thunder Strike");
  });

  it("should apply archetype-specific bonuses", () => {
    const musaDamage = calculateArchetypeDamage("musa", technique);
    const amsaljaDamage = calculateArchetypeDamage("amsalja", technique);
    expect(musaDamage).not.toEqual(amsaljaDamage);
  });

  it("should maintain 60fps during intense combat", () => {
    // Performance testing for combat sequences
  });
});
```

## 🌟 Success Criteria

When following these guidelines, code should:

- ✅ Implement authentic Korean martial arts mechanics
- ✅ Respect traditional Korean culture and terminology
- ✅ Achieve realistic combat physics and feedback
- ✅ Maintain cyberpunk aesthetic integration
- ✅ Provide comprehensive accessibility features
- ✅ Target 60fps performance for all combat
- ✅ Use existing type system and components extensively
- ✅ Include proper Korean-English bilingual support

## 🎯 Philosophy Integration

### Traditional Korean Values (Integrate into All Interactions)

```typescript
// Implement respect for Korean martial arts tradition
const MARTIAL_ARTS_PHILOSOPHY = {
  respect: "존중 (Jonjung) - Honor the art and opponent",
  discipline: "수련 (Suryeon) - Dedicated practice and learning",
  precision: "정확 (Jeonghwak) - Exact technique execution",
  wisdom: "지혜 (Jihye) - Understanding beyond physical technique",
  balance: "균형 (Gyunhyeong) - Harmony of mind, body, spirit",
};

// Cultural authenticity checks
function validateKoreanTechnique(technique: KoreanTechnique): boolean {
  return (
    technique.koreanName &&
    technique.englishName &&
    technique.description.korean &&
    technique.stance in TRIGRAM_DATA
  );
}
```

---

**Remember**: Black Trigram represents the intersection of traditional Korean martial arts wisdom and modern interactive technology. Every implementation should honor this balance while providing authentic, educational, and respectful gameplay.

**흑괘의 길을 걸어라** - _Walk the Path of the Black Trigram_
