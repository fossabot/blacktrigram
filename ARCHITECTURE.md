# 🏗️ Black Trigram (흑괘) Architecture

This document provides a comprehensive view of the Black Trigram Korean Martial Arts game architecture using the C4 model, illustrating how components interact to deliver an authentic combat simulation experience.

## 📚 Complete Architecture Documentation Map

<div class="documentation-map">

### Current Architecture

| Document                                          | Focus           | Description                               |
| ------------------------------------------------- | --------------- | ----------------------------------------- |
| **Architecture**               | 🏗️ C4 Model     | C4 model showing system structure          |
| **[Game Design](game-design.md)**                 | 🎮 Design       | Korean martial arts game mechanics        |
| **README**                          | 📖 Overview     | Project overview and setup guide         |

### Technical Components

| Document                                       | Focus           | Description                               |
| ---------------------------------------------- | --------------- | ----------------------------------------- |
| **[Audio System](src/audio/)**                | 🔊 Audio        | Damage-based audio feedback system        |
| **[Game Engine](src/components/game/)**       | ⚙️ Engine       | Core combat physics and game loop        |
| **[UI Components](src/components/ui/)**       | 🎨 Interface    | Korean-themed UI components               |
| **[Training Mode](src/components/training/)** | 🥋 Training     | Trigram stance practice system            |

### Testing & Quality

| Document                                       | Focus           | Description                               |
| ---------------------------------------------- | --------------- | ----------------------------------------- |
| **[Testing Strategy](cypress/)**              | 🧪 Testing      | E2E and component testing                 |
| **Performance**                  | ⚡ Performance  | 60fps optimization and monitoring        |
| **[Code Quality](src/types/)**                | 📝 Types        | TypeScript strict typing                  |

</div>

## 🌐 System Context

Black Trigram operates as a web-based Korean martial arts combat simulator, emphasizing authentic traditional techniques and cultural authenticity.

```mermaid
C4Context
  title System Context Diagram for Black Trigram (흑괘)

  Person(player, "Player", "Practices Korean martial arts through trigram-based combat")
  Person(martialArtist, "Martial Arts Enthusiast", "Learns traditional Korean techniques and philosophy")
  Person(gameDevs, "Game Developers", "Develops and maintains the combat simulation")
  
  System(blackTrigram, "Black Trigram (흑괘)", "Korean martial arts combat simulator with trigram-based fighting system")
  
  System_Ext(webBrowser, "Web Browser", "Chrome, Firefox, Safari with WebGL support")
  System_Ext(audioSystem, "Browser Audio API", "Howler.js-based damage-aware audio feedback")
  System_Ext(inputDevices, "Input Devices", "Keyboard, mouse, and gamepad for combat controls")

  Rel(player, blackTrigram, "Practices Korean martial arts combat")
  Rel(martialArtist, blackTrigram, "Studies traditional trigram techniques")
  Rel(gameDevs, blackTrigram, "Develops and maintains")
  
  Rel(blackTrigram, webBrowser, "Runs in")
  Rel(blackTrigram, audioSystem, "Provides immersive audio through")
  Rel(blackTrigram, inputDevices, "Receives combat input from")

  UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")
```

## 🏢 Container View

Black Trigram consists of several specialized containers delivering authentic Korean martial arts combat simulation.

```mermaid
C4Container
    title Container Diagram - Black Trigram (흑괘)

    Person(player, "Player", "Practices Korean martial arts combat")
    
    System_Boundary(blackTrigram, "Black Trigram (흑괘)") {
        Container(gameClient, "Game Client", "React 19, PixiJS 8, TypeScript", "Korean martial arts combat simulation with 60fps physics")
        Container(audioEngine, "Audio Engine", "Howler.js, Web Audio API", "Damage-based audio feedback with Korean martial arts themes")
        Container(gameAssets, "Game Assets", "Static Files", "Korean fonts, trigram symbols, martial arts audio, textures")
        Container(combatEngine, "Combat Engine", "PixiJS, TypeScript", "Real-time martial arts physics with vital point targeting")
    }
    
    System_Ext(webGL, "WebGL", "Hardware-accelerated rendering for 60fps combat")
    
    Rel(player, gameClient, "Practices trigram techniques through")
    Rel(gameClient, audioEngine, "Triggers damage-based audio")
    Rel(gameClient, gameAssets, "Loads Korean cultural assets")
    Rel(gameClient, combatEngine, "Executes martial arts physics")
    Rel(combatEngine, webGL, "Renders through")
    
    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## 🧩 Component View - Game Client

The game client orchestrates Korean martial arts combat through specialized React components integrated with PixiJS.

```mermaid
C4Component
    title Component Diagram - Game Client

    Container_Boundary(gameClient, "Game Client") {
        Component(app, "App", "React 19, TypeScript", "Main application orchestrating game modes")
        
        Component(introScreen, "IntroScreen", "React, PixiJS", "Korean dojang intro with trigram wheel")
        Component(gameEngine, "GameEngine", "React, PixiJS", "Core combat engine with realistic physics")
        Component(trainingScreen, "TrainingScreen", "React, PixiJS", "Trigram stance practice system")
        
        Component(playerSystem, "PlayerSystem", "PixiJS, TypeScript", "Korean martial artist with trigram techniques")
        Component(combatSystem, "CombatSystem", "TypeScript", "Authentic Korean combat calculations")
        Component(audioManager, "AudioManager", "Howler.js, TypeScript", "Damage-aware audio with Korean themes")
        
        Component(uiComponents, "UI Components", "React, PixiJS", "Korean-themed interface components")
        Component(koreanAssets, "Korean Assets", "Fonts, Symbols", "Traditional Korean cultural elements")
    }

    Rel(app, introScreen, "Manages navigation to")
    Rel(app, gameEngine, "Manages navigation to")
    Rel(app, trainingScreen, "Manages navigation to")
    
    Rel(gameEngine, playerSystem, "Orchestrates")
    Rel(gameEngine, combatSystem, "Uses for calculations")
    Rel(gameEngine, audioManager, "Triggers damage-based audio")
    
    Rel(playerSystem, combatSystem, "Executes techniques through")
    Rel(combatSystem, audioManager, "Provides damage data to")
    
    Rel(introScreen, uiComponents, "Displays Korean UI through")
    Rel(trainingScreen, uiComponents, "Displays practice UI through")
    Rel(gameEngine, uiComponents, "Displays combat UI through")
    
    Rel(uiComponents, koreanAssets, "Loads cultural elements from")

    UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="1")
```

## ⚔️ Combat System Component Details

This diagram shows the detailed structure of the Korean martial arts combat system:

```mermaid
C4Component
    title Component Diagram - Combat Engine

    Container_Boundary(combatEngine, "Combat Engine") {
        Component(gameStateManager, "GameStateManager", "TypeScript", "Immutable game state with Korean martial arts rules")
        Component(combatSystem, "CombatSystem", "TypeScript", "Korean technique damage calculations with vital points")
        Component(playerStateManager, "PlayerStateManager", "TypeScript", "Trigram stance and health management")
        
        Component(trigramTechniques, "TrigramTechniques", "TypeScript", "8 traditional Korean fighting techniques")
        Component(vitalPointSystem, "VitalPointSystem", "TypeScript", "70 anatomical vital points for precision combat")
        Component(physicsEngine, "PhysicsEngine", "PixiJS, TypeScript", "Realistic combat physics at 60fps")
        
        Component(aiSystem, "AISystem", "TypeScript", "Korean martial arts AI with stance-based behavior")
        Component(inputSystem, "InputSystem", "TypeScript", "Korean keyboard layout support (1-8 for trigrams)")
    }

    Container_Boundary(visualization, "Visualization Layer") {
        Component(playerVisuals, "PlayerVisuals", "PixiJS, React", "Korean martial artist visualization")
        Component(hitEffects, "HitEffectsLayer", "PixiJS", "Traditional Korean combat effects")
        Component(dojangBackground, "DojangBackground", "PixiJS", "Authentic Korean dojang environment")
        Component(gameUI, "GameUI", "PixiJS, React", "Korean-themed combat interface")
    }

    Rel(gameStateManager, combatSystem, "Manages combat through")
    Rel(gameStateManager, playerStateManager, "Coordinates with")
    
    Rel(combatSystem, trigramTechniques, "Calculates damage using")
    Rel(combatSystem, vitalPointSystem, "Targets precision points through")
    Rel(combatSystem, physicsEngine, "Executes realistic physics via")
    
    Rel(playerStateManager, aiSystem, "Provides AI state to")
    Rel(playerStateManager, inputSystem, "Receives player input from")
    
    Rel(physicsEngine, playerVisuals, "Renders movement through")
    Rel(combatSystem, hitEffects, "Triggers Korean effects via")
    Rel(gameStateManager, gameUI, "Updates interface through")

    UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="1")
```

## 🎵 Audio System Architecture

This diagram illustrates the damage-based audio system with Korean martial arts themes:

```mermaid
C4Component
    title Component Diagram - Audio Engine

    Container_Boundary(audioEngine, "Audio Engine") {
        Component(audioManager, "AudioManager", "Howler.js, TypeScript", "Central audio coordination with damage awareness")
        Component(sfxEngine, "SFXEngine", "Web Audio API", "Dynamic sound effects based on combat damage")
        Component(musicManager, "MusicManager", "Howler.js", "Korean martial arts themed background music")
        Component(spatialAudio, "SpatialAudio", "Web Audio API", "3D positioned audio for dojang immersion")
    }

    Container_Boundary(audioAssets, "Audio Assets") {
        Component(koreanThemes, "Korean Themes", "Audio Files", "Traditional Korean martial arts music")
        Component(combatSounds, "Combat Sounds", "Audio Files", "Damage-scaled attack and impact sounds")
        Component(stanceSounds, "Stance Sounds", "Audio Files", "Trigram stance change audio feedback")
        Component(uiSounds, "UI Sounds", "Audio Files", "Korean-themed menu and interface sounds")
    }

    Container_Boundary(damageSystem, "Damage-Based Audio") {
        Component(damageAnalyzer, "DamageAnalyzer", "TypeScript", "Analyzes combat damage for audio scaling")
        Component(vitalPointAudio, "VitalPointAudio", "TypeScript", "Specialized audio for vital point hits")
        Component(comboAudio, "ComboAudio", "TypeScript", "Progressive audio for technique combinations")
    }

    Rel(audioManager, sfxEngine, "Coordinates effects through")
    Rel(audioManager, musicManager, "Manages themes via")
    Rel(audioManager, spatialAudio, "Positions dojang audio through")
    
    Rel(sfxEngine, combatSounds, "Loads damage-scaled sounds from")
    Rel(musicManager, koreanThemes, "Plays traditional music from")
    Rel(audioManager, stanceSounds, "Triggers stance audio from")
    Rel(audioManager, uiSounds, "Plays interface sounds from")
    
    Rel(audioManager, damageAnalyzer, "Receives damage data from")
    Rel(damageAnalyzer, vitalPointAudio, "Triggers specialized audio via")
    Rel(damageAnalyzer, comboAudio, "Manages combination audio through")

    UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="1")
```

## 🥋 Training System Architecture

This diagram shows the Korean martial arts training and education system:

```mermaid
C4Component
    title Component Diagram - Training System

    Container_Boundary(trainingSystem, "Training System") {
        Component(trigramWheel, "TrigramWheel", "React, PixiJS", "Interactive 8-trigram selection interface")
        Component(stancePractice, "StancePractice", "TypeScript", "Individual trigram stance practice tracking")
        Component(progressTracker, "ProgressTracker", "React, PixiJS", "Korean martial arts progression monitoring")
        Component(techniqueLibrary, "TechniqueLibrary", "TypeScript", "Traditional Korean technique database")
    }

    Container_Boundary(educationalContent, "Educational Content") {
        Component(koreanTerminology, "KoreanTerminology", "TypeScript", "Authentic Korean martial arts terms")
        Component(philosophySystem, "PhilosophySystem", "TypeScript", "I Ching trigram philosophy integration")
        Component(culturalContext, "CulturalContext", "TypeScript", "Korean martial arts history and tradition")
    }

    Container_Boundary(practiceAI, "Practice AI") {
        Component(formCorrection, "FormCorrection", "TypeScript", "AI-guided stance and technique correction")
        Component(adaptiveDifficulty, "AdaptiveDifficulty", "TypeScript", "Personalized training progression")
        Component(masterGuidance, "MasterGuidance", "TypeScript", "Simulated Korean martial arts master guidance")
    }

    Rel(trigramWheel, stancePractice, "Initiates practice for")
    Rel(stancePractice, progressTracker, "Reports progress to")
    Rel(stancePractice, techniqueLibrary, "References techniques from")
    
    Rel(techniqueLibrary, koreanTerminology, "Uses authentic terms from")
    Rel(trigramWheel, philosophySystem, "Displays philosophy through")
    Rel(progressTracker, culturalContext, "Provides cultural context via")
    
    Rel(stancePractice, formCorrection, "Receives guidance from")
    Rel(progressTracker, adaptiveDifficulty, "Adjusts difficulty through")
    Rel(formCorrection, masterGuidance, "Provides master-level feedback via")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## 🎨 Korean UI Component System

This diagram illustrates the Korean-themed user interface components:

```mermaid
C4Component
    title Component Diagram - Korean UI Components

    Container_Boundary(koreanUI, "Korean UI Components") {
        Component(koreanHeader, "KoreanHeader", "React, PixiJS", "Traditional Korean header with dual language support")
        Component(trigramWheel, "TrigramWheel", "React, PixiJS", "8-trigram circular selection interface")
        Component(progressTracker, "ProgressTracker", "React, PixiJS", "Korean martial arts progress visualization")
        Component(dojangBackground, "DojangBackground", "PixiJS", "Authentic Korean dojang training environment")
    }

    Container_Boundary(culturalAssets, "Cultural Assets") {
        Component(koreanFonts, "Korean Fonts", "Noto Sans KR", "Authentic Korean typography")
        Component(trigramSymbols, "Trigram Symbols", "Unicode Symbols", "Traditional I Ching trigram symbols")
        Component(koreanColors, "Korean Colors", "CSS Variables", "Traditional Korean color palette")
        Component(dojanElements, "Dojang Elements", "SVG/PNG", "Traditional Korean training hall elements")
    }

    Container_Boundary(theming, "Theming System") {
        Component(darkTrigram, "DarkTrigram Theme", "CSS/TypeScript", "Dark Korean martial arts aesthetic")
        Component(colorConstants, "Color Constants", "TypeScript", "Korean red, gold, black, cyan color scheme")
        Component(responsiveDesign, "Responsive Design", "CSS", "Mobile-optimized Korean interface")
    }

    Rel(koreanHeader, koreanFonts, "Renders Korean text with")
    Rel(trigramWheel, trigramSymbols, "Displays traditional symbols from")
    Rel(progressTracker, koreanColors, "Uses traditional colors from")
    Rel(dojangBackground, dojanElements, "Renders training environment with")
    
    Rel(koreanHeader, darkTrigram, "Applies theme via")
    Rel(trigramWheel, colorConstants, "Uses color scheme from")
    Rel(progressTracker, responsiveDesign, "Adapts layout through")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## 📊 Key Architecture Decisions

### Architecture Decision Records

| ID | Decision | Rationale |
|----|----------|-----------|
| ADR-001 | PixiJS + React Integration | Enables 60fps WebGL-accelerated combat with React component architecture |
| ADR-002 | Korean Cultural Authenticity | Ensures genuine Korean martial arts representation with proper terminology |
| ADR-003 | Damage-Based Audio System | Provides immersive combat feedback scaled to actual damage calculations |
| ADR-004 | 8-Trigram Fighting System | Authentic I Ching-based martial arts with traditional Korean techniques |
| ADR-005 | Vital Point Targeting | Realistic anatomical precision combat with 70 documented vital points |
| ADR-006 | Strict TypeScript + Vitest | Ensures code quality and reliable combat physics calculations |
| ADR-007 | Mobile-First Responsive | Korean martial arts accessible on all devices with touch controls |

### Key Quality Attributes

| Quality Attribute | Support in Current Architecture |
|-------------------|--------------------------------|
| Performance | 60fps guaranteed through PixiJS WebGL acceleration and optimized game loop |
| Cultural Authenticity | Korean fonts, terminology, colors, and traditional martial arts techniques |
| Immersion | Damage-based audio, realistic physics, and authentic Korean dojang environment |
| Accessibility | Responsive design, keyboard navigation, and dual-language support |
| Maintainability | Strict TypeScript, component architecture, and comprehensive testing |
| Extensibility | Modular combat system allowing additional techniques and training modes |

## 🔍 Business View of Architecture

### Stakeholder Alignment

```mermaid
flowchart TD
    GE[Game Engine] --- P[Players]
    
    TS[Training System] --- MA[Martial Arts Students]
    
    AS[Audio System] --- GE_USERS[Game Enthusiasts]
    
    KUI[Korean UI] --- KC[Korean Culture Enthusiasts]
    
    CS[Combat System] --- CF[Combat Fighters]
    
    VS[Vital Point System] --- ME[Medical/Educational Users]
    
    classDef stakeholder fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    classDef system fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    
    class P,MA,GE_USERS,KC,CF,ME stakeholder
    class GE,TS,AS,KUI,CS,VS system
```

### Educational Value Map

```mermaid
flowchart TD
    KMA[Korean Martial Arts] -->|teaches| TT[Traditional Techniques]
    KMA -->|teaches| CP[Cultural Philosophy]
    KMA -->|teaches| AA[Anatomical Awareness]
    
    TT -->|through| TS[8 Trigram Stances]
    CP -->|through| IC[I Ching Principles]
    AA -->|through| VP[70 Vital Points]
    
    TS & IC & VP -->|create| EV[Educational Value]
    
    EV -->|delivers| MA[Martial Arts Education]
    EV -->|delivers| CH[Cultural Heritage]
    EV -->|delivers| SA[Self-Awareness]
    EV -->|delivers| PR[Precision Training]
    EV -->|delivers| TA[Traditional Authenticity]
    
    classDef input fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef process fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef output fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef value fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef benefit fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    
    class KMA input
    class TT,CP,AA process
    class TS,IC,VP output
    class EV value
    class MA,CH,SA,PR,TA benefit
```

## Current Architecture Constraints

1. **Client-Side Only**: No server-side multiplayer or cloud save functionality
2. **Static Korean Content**: Pre-defined techniques without custom martial arts style creation
3. **WebGL Requirement**: Requires modern browser with WebGL support for optimal performance
4. **Single Player Focus**: No multi-player sparring or collaborative training features
5. **Fixed Technique Set**: 8 traditional trigram techniques without expansion capabilities
6. **Browser Audio Limitations**: Audio feedback limited by Web Audio API capabilities

## Performance Targets

| Metric | Target | Current Architecture Support |
|--------|--------|------------------------------|
| Frame Rate | 60fps steady | PixiJS WebGL acceleration |
| Load Time | <3 seconds | Asset preloading and optimization |
| Memory Usage | <100MB | Efficient PixiJS resource management |
| Audio Latency | <20ms | Howler.js with Web Audio API |
| Input Response | <16ms | Direct keyboard/mouse handling |
| Mobile Performance | 30fps minimum | Responsive design with performance scaling |

## Cultural Authenticity Requirements

| Aspect | Implementation | Verification |
|--------|---------------|--------------|
| Korean Language | Noto Sans KR fonts, authentic terminology | Native speaker review |
| Trigram Philosophy | Authentic I Ching trigram meanings | Traditional martial arts consultation |
| Combat Techniques | Based on traditional Korean martial arts | Historical accuracy verification |
| Visual Design | Traditional Korean dojang aesthetics | Cultural design review |
| Audio Themes | Korean martial arts music and sound design | Cultural audio authenticity |
