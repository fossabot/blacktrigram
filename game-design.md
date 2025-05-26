# Black Trigram (흑괘) - Game Design Document

## Executive Summary

**Black Trigram** is a 2D precision combat game inspired by Korean martial arts philosophy and the I Ching (주역). Players embody elite martial artists who master the dark arts of vital point striking, combining deadly precision with philosophical depth rooted in trigram symbolism.

### Core Pillars

- **정격자 (Jeonggyeokja)** - Precision Attacker: Every strike must be calculated and deliberate
- **비수 (Bisu)** - Lethal Blade: Metaphorical lethality in unarmed combat
- **암살자 (Amsalja)** - Assassin: Focus on finishing techniques over prolonged combat
- **급소격 (Geupsogyeok)** - Vital Point Strike: Core combat mechanic

## Game Overview

### Genre

2D Action-Combat / Precision Fighter

### Platform

Web-based (HTML5/WebGL via PixiJS)

### Target Audience

- Martial arts enthusiasts
- Precision action game players
- Players interested in Korean culture and philosophy

### Unique Selling Points

1. **Trigram-based combat system** with 8 distinct fighting styles
2. **Vital point targeting** requiring anatomical knowledge
3. **Korean martial arts authenticity** with proper terminology
4. **Philosophical depth** connecting combat to I Ching principles
5. **One-hit potential** emphasizing precision over button mashing

## Core Mechanics

### 1. Trigram Combat System (팔괘 무술체계)

Each of the 8 trigrams represents a unique fighting philosophy and moveset:

#### ☰ 건 (Geon) - Heaven/Sky

- **Philosophy**: Pure yang energy, overwhelming force
- **Combat Style**: Power strikes, breaking guards
- **Vital Points**: Solar plexus, sternum
- **Special**: "천둥벽력" (Thunder Strike) - devastating overhead attacks

#### ☱ 태 (Tae) - Lake/Marsh

- **Philosophy**: Joy and flexibility, adaptive combat
- **Combat Style**: Flowing combinations, redirection
- **Vital Points**: Joints, pressure points
- **Special**: "유수연타" (Flowing Water Combo) - chain attacks

#### ☲ 리 (Li) - Fire

- **Philosophy**: Clarity and intensity, precise strikes
- **Combat Style**: Fast, accurate attacks
- **Vital Points**: Eyes, temples, throat
- **Special**: "화염지창" (Flame Spear) - penetrating strikes

#### ☳ 진 (Jin) - Thunder

- **Philosophy**: Sudden movement, shock attacks
- **Combat Style**: Explosive bursts, stunning moves
- **Vital Points**: Nervous system points
- **Special**: "벽력일섬" (Lightning Flash) - instant counters

#### ☴ 손 (Son) - Wind

- **Philosophy**: Gentle persistence, wearing down
- **Combat Style**: Light, continuous pressure
- **Vital Points**: Breathing points, energy meridians
- **Special**: "선풍연격" (Whirlwind Barrage) - rapid strikes

#### ☵ 감 (Gam) - Water

- **Philosophy**: Adaptation and flow, defensive mastery
- **Combat Style**: Evasion and counter-attacks
- **Vital Points**: Circulation points
- **Special**: "수류반격" (Water Return Strike) - perfect counters

#### ☶ 간 (Gan) - Mountain

- **Philosophy**: Stillness and endurance, defensive stance
- **Combat Style**: Solid defense, immovable positions
- **Vital Points**: Structural weak points
- **Special**: "반석방어" (Bedrock Defense) - damage reduction

#### ☷ 곤 (Gon) - Earth

- **Philosophy**: Receptive yin energy, grounding techniques
- **Combat Style**: Throws, takedowns, ground control
- **Vital Points**: Balance points, lower body
- **Special**: "대지포옹" (Earth's Embrace) - grappling finishers

### 2. Vital Point System (급소 시스템)

#### Anatomical Targeting

Players must learn actual martial arts vital points:

- **머리 (Meori)** - Head: 12 target points
- **목 (Mok)** - Neck/Throat: 8 target points
- **몸통 (Momtong)** - Torso: 20 target points
- **팔 (Pal)** - Arms: 14 target points
- **다리 (Dari)** - Legs: 16 target points

#### Strike Precision Mechanics

- **Perfect Hit**: Direct vital point contact (150% damage)
- **Good Hit**: Near vital point (100% damage)
- **Glancing Blow**: Off-target (50% damage)
- **Miss**: No contact (0% damage)

#### Targeting Interface

- **Precision Cursor**: Cross-hair targeting system
- **Anatomical Overlay**: Shows vital points during slow-motion
- **Knowledge System**: Unlocks new vital points through study

### 3. Combat Flow

#### Initiative System

Combat begins with **기선제압 (Giseon Jeap)** - seizing the initiative:

1. **Read Phase**: Analyze opponent's stance and trigram
2. **Approach Phase**: Choose distance and angle
3. **Strike Phase**: Execute technique with precision timing
4. **Follow-up Phase**: Capitalize on successful hits or recover from misses

#### Timing Mechanics

- **호흡 (Hoheup)** - Breathing rhythm affects precision
- **간격 (Gangyeok)** - Distance management is crucial
- **박자 (Bakja)** - Rhythm and timing windows for attacks

### 4. Character Progression

#### Trigram Mastery Levels

Each trigram has 5 mastery levels:

1. **입문 (Ipmun)** - Beginner: Basic techniques
2. **초급 (Chogeup)** - Novice: Combination attacks
3. **중급 (Junggeup)** - Intermediate: Advanced techniques
4. **고급 (Gogeup)** - Advanced: Master techniques
5. **사범 (Sabeom)** - Master: Secret techniques

#### Knowledge Acquisition

- **고서 연구 (Goseo Yeongu)** - Ancient text study for new techniques
- **실전 경험 (Siljeon Gyeongheom)** - Combat experience
- **명상 수련 (Myeongsang Suryeon)** - Meditation for focus improvement

## Visual Design

### Art Style

- **Korean Traditional Art** influence with modern 2D animation
- **Ink Brush Aesthetics** for UI elements and effects
- **Muted Color Palette** emphasizing blacks, whites, and deep reds
- **Geometric Trigram Patterns** integrated into environmental design

### Character Design

#### Player Archetypes

1. **정격자 (Jeonggyeokja)** - Precision Attacker

   - Lean, focused appearance
   - Traditional Korean martial arts uniform (도복)
   - Minimal, functional design

2. **암살자 (Amsalja)** - Shadow Assassin

   - Dark, flowing garments
   - Hidden face/mask elements
   - Emphasis on stealth aesthetics

3. **무사 (Musa)** - Traditional Warrior
   - Classical Korean warrior appearance
   - Honor-bound visual elements
   - Traditional weapons as decoration (unused in combat)

### Environment Design

- **전통 무관 (Jeongtong Mugwan)** - Traditional Training Halls
- **산속 수련장 (Sansok Suryeonjang)** - Mountain Training Grounds
- **도성 뒷골목 (Doseong Dwitgolmok)** - City Back Alleys
- **궁궐 비밀실 (Gunggweol Bimil-sil)** - Palace Secret Chambers

### UI/UX Design

- **한글 Typography** with English subtitles
- **Trigram Iconography** for navigation and status
- **Ink Brush Transitions** between screens
- **Traditional Korean Color Schemes** (오방색 - Five Direction Colors)

## Audio Design

### Music Style

- **Traditional Korean Instruments**: 가야금 (Gayageum), 대금 (Daegeum), 장구 (Janggu)
- **Modern Electronic Fusion** for contemporary feel
- **Dynamic Scoring** that responds to combat intensity
- **Trigram-specific Themes** for each fighting style

### Sound Effects

- **Realistic Combat Audio**: Authentic martial arts impact sounds
- **Environmental Ambience**: Traditional Korean architecture acoustics
- **Voice Acting**: Korean language with proper martial arts terminology
- **Breathing Effects**: Emphasis on 호흡 (breathing) in combat

## Technical Implementation

### PixiJS Architecture

#### Core Game Systems

```typescript
// Game state management using trigram principles
interface TrigramState {
  currentTrigram: TrigramType;
  masteryLevel: number;
  availableTechniques: Technique[];
  vitalPointKnowledge: VitalPoint[];
}

// Combat system with precision mechanics
interface CombatSystem {
  targetingPrecision: number;
  timingWindow: number;
  breathingRhythm: number;
  currentStance: StanceType;
}
```

#### React Component Structure

```
src/
├── components/
│   ├── combat/
│   │   ├── TrigramSelector.tsx
│   │   ├── VitalPointOverlay.tsx
│   │   ├── PrecisionCursor.tsx
│   │   └── CombatInterface.tsx
│   ├── character/
│   │   ├── CharacterSelect.tsx
│   │   ├── TrigramMastery.tsx
│   │   └── ProgressionTree.tsx
│   └── ui/
│       ├── KoreanUI.tsx
│       ├── TrigramNavigation.tsx
│       └── TraditionalDialogs.tsx
├── systems/
│   ├── CombatEngine.ts
│   ├── TrigramLogic.ts
│   ├── VitalPointSystem.ts
│   └── PrecisionCalculator.ts
└── assets/
    ├── characters/
    ├── environments/
    ├── ui/
    └── audio/
```

### Performance Considerations

- **Sprite Batching** for character animations
- **Texture Atlasing** for UI elements
- **Audio Optimization** using Howler.js
- **State Management** with efficient React patterns

## Game Modes

### 1. 수련 모드 (Suryeon Mode) - Training

- **Vital Point Study**: Learn anatomical targets
- **Trigram Practice**: Master individual styles
- **Precision Training**: Improve targeting accuracy
- **Breathing Exercises**: Develop rhythm and timing

### 2. 대련 모드 (Daeryeon Mode) - Sparring

- **Single Combat**: One-on-one precision duels
- **Tournament**: Progressive difficulty challenges
- **Master Challenges**: Face legendary martial artists

### 3. 철학 모드 (Cheolhak Mode) - Philosophy

- **I Ching Study**: Learn trigram meanings and applications
- **Historical Lessons**: Korean martial arts history
- **Meditation Practice**: Improve focus and precision

### 4. 암살 모드 (Amsal Mode) - Assassination

- **Stealth Missions**: Eliminate targets without detection
- **One-Strike Challenges**: Perfect precision requirements
- **Environmental Kills**: Use surroundings tactically

## Progression Systems

### Mastery Paths

1. **Knowledge Acquisition**

   - Study ancient martial arts texts
   - Learn new vital points
   - Understand trigram philosophy

2. **Physical Development**

   - Improve strike precision
   - Develop faster reaction times
   - Build stamina for extended combat

3. **Spiritual Growth**
   - Balance yin/yang energies
   - Achieve mental clarity
   - Master breath control

### Unlockable Content

- **New Trigram Techniques**: Advanced combinations
- **Historical Scenarios**: Famous martial arts encounters
- **Master Costumes**: Traditional Korean martial arts attire
- **Legendary Opponents**: Face historical martial arts masters

## Cultural Authenticity

### Korean Language Integration

- **Proper Terminology**: Authentic martial arts vocabulary
- **Cultural Context**: Historical and philosophical background
- **Respectful Representation**: Accurate portrayal of traditions

### Educational Elements

- **Martial Arts History**: Korean fighting traditions
- **Philosophical Depth**: I Ching principles in combat
- **Cultural Values**: Honor, precision, and discipline

## Monetization Strategy

### Base Game

- Complete single-player experience
- 8 trigram fighting styles
- Training and sparring modes

### DLC/Expansion Content

- **Historical Campaigns**: Famous Korean martial artists
- **Advanced Techniques**: Master-level trigram combinations
- **Customization Packs**: Traditional Korean clothing and accessories
- **New Environments**: Additional training locations

## Success Metrics

### Player Engagement

- **Precision Improvement**: Track targeting accuracy over time
- **Trigram Mastery**: Monitor style progression
- **Cultural Learning**: Test knowledge of Korean martial arts
- **Retention Rate**: Long-term player engagement

### Educational Impact

- **Cultural Awareness**: Understanding of Korean traditions
- **Martial Arts Interest**: Inspiration for real-world practice
- **Philosophical Growth**: Application of I Ching principles

## Risk Assessment

### Technical Risks

- **Performance Optimization**: Ensuring smooth 60fps gameplay
- **Cross-platform Compatibility**: Web browser variations
- **Audio Synchronization**: Precise timing for combat feedback

### Cultural Risks

- **Authenticity Concerns**: Accurate representation of traditions
- **Language Barriers**: Proper Korean language implementation
- **Cultural Sensitivity**: Respectful treatment of martial arts heritage

### Market Risks

- **Niche Appeal**: Limited to martial arts enthusiasts
- **Learning Curve**: Complex mechanics may deter casual players
- **Competition**: Existing fighting game franchises

## Development Timeline

### Phase 1: Core Systems (Months 1-3)

- Basic combat mechanics
- Trigram system implementation
- Vital point targeting
- Character movement and animation

### Phase 2: Content Creation (Months 4-6)

- 8 trigram fighting styles
- Training modes
- Basic AI opponents
- UI/UX implementation

### Phase 3: Polish & Testing (Months 7-9)

- Audio integration
- Visual effects
- Balance testing
- Cultural authenticity review

### Phase 4: Launch Preparation (Months 10-12)

- Performance optimization
- Localization
- Marketing materials
- Community building

## Post-Launch Support

### Content Updates

- **Monthly Technique Releases**: New trigram combinations
- **Seasonal Events**: Traditional Korean holidays
- **Community Challenges**: Precision tournaments

### Community Features

- **Replay Sharing**: Show perfect technique executions
- **Knowledge Base**: Player-contributed martial arts insights
- **Cultural Exchange**: Connect with Korean martial arts practitioners

---

_"무예는 몸과 마음, 그리고 영혼의 조화이다"_  
_"Martial arts are the harmony of body, mind, and spirit"_

---

**Game Design Document Version**: 1.0  
**Last Updated**: December 2024  
**Document Status**: Draft for Development
