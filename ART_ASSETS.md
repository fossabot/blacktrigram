# 🎨 Black Trigram — Art & Asset Style Guide

**Goal:** Capture the dark, cyberpunk-meets-traditional Korean martial-arts vibe shown in the concept art, and translate it into a cohesive set of game assets—UI elements, icons, character silhouettes, environment textures, VFX, and more.

## Executive Summary

Black Trigram is a sophisticated 2D precision combat simulator deeply rooted in Korean martial arts and modern combat technology, set against a cyberpunk backdrop. It emphasizes anatomical realism, precise targeting, authentic martial techniques, and dark futuristic aesthetics.

Game Identity
Genre:
2D Realistic Precision Combat Simulator / Traditional Korean Martial Arts Training (Cyberpunk Style)

Platforms:

Web-based (HTML5/WebGL via PixiJS)

Optimized for authentic 60fps combat physics

Audience:

Fans of precise combat gameplay (Budokan, IK+)

Practitioners and enthusiasts of Korean martial arts

Cyberpunk aesthetics and narrative enthusiasts

Players seeking realistic and anatomical combat precision

Visual and Thematic Direction (Cyberpunk Korean Martial Arts)
Based on the concept art:

Dark cyberpunk aesthetic, blending traditional Korean martial attire with tactical modern gear.

Each archetype distinctly presented with unique visual cues reflective of their philosophy and combat style.

Neon-enhanced, shadow-filled environments reflecting futuristic underground training spaces.

Refined Player Archetypes (Enhanced Visual and Thematic Integration)

1. 무사 (Musa) - Traditional Warrior
   Combat Philosophy: Honor through strength

Visual: Armored, disciplined, militaristic attire, enhanced with cyberpunk armor.

Specialties: Direct confrontation, overwhelming force, bone-crushing strikes.

2. 암살자 (Amsalja) - Shadow Assassin
   Combat Philosophy: Efficiency through invisibility

Visual: Cloaked in dark tactical stealth suits, masked face.

Specialties: Silent takedowns, instantaneous nerve strikes.

3. 해커 (Hacker) - Cyber Warrior
   Combat Philosophy: Information as power

Visual: High-tech gear, cybernetic glasses, sleek modern attire.

Specialties: Precision strikes assisted by digital analytics, environmental hacking.

4. 정보요원 (Jeongbo Yowon) - Intelligence Operative
   Combat Philosophy: Knowledge through observation

Visual: Sharp suits, subtle cyber-enhancements, professional appearance.

Specialties: Psychological manipulation, precise timing, pressure-point control.

5. 조직폭력배 (Jojik Pokryeokbae) - Organized Crime
   Combat Philosophy: Survival through ruthlessness

Visual: Rugged, streetwise attire, visibly intimidating presence.

Specialties: Brutal street combat, improvised weapons, dirty fighting tactics.

Combat Mechanics Enhancements (from Images)
Realistic Combat System
Combat States:

Fully Operational (100%) - Optimal performance

Lightly Damaged (80%) - Minor capability reduction

Moderately Damaged (60%) - Noticeable combat impairment

Heavily Damaged (40%) - Significant incapacitation risk

Critically Damaged (20%) - Severe vulnerability

Incapacitated (0%) - Combat ineffective

Pain Response System:

Instant reaction (Shock Pain)

Progressive damage (Cumulative Trauma)

Full incapacitation (Pain Overload)

Tactical Combat Specializations (Inspired by Concepts)
Joint Manipulation: Precise and methodical joint breaks

Vital Point Strikes: Anatomical pressure-point targeting

Silent Takedowns: Immediate stealth incapacitation

Tech-Assisted Strikes: Advanced anatomical analytics

Environmental Manipulation: Utilizing surroundings tactically

Street Fighting Tactics: Adaptive, improvisational methods

Enhanced Trigram Integration (Cybernetic Interpretation)
Heaven (건): Direct, powerful strikes causing bone fractures
Lake (태): Fluid joint manipulation causing dislocations
Thunder (진): Electric-like nerve strikes causing paralysis
Wind (손): Continuous pressure techniques for gradual incapacitation
Water (감): Adaptation and flow techniques for escape and redirection
Mountain (간): Immovable defense and counters
Earth (곤): Ground control and positional dominance
Fire (리): Precision-targeted nerve strikes for instantaneous effects

Underground Cyberpunk Dojang Environment
Visual: Neon-lit Korean characters, dark urban subterranean aesthetics

Audio: Dark Korean musical themes blended with cybernetic sounds and traditional instruments

Gameplay: Realistic blood, injury, and trauma visualizations enhancing combat realism

---

## 1. Color Palette & Lighting

| Role           | Hex       | Usage                               |
| -------------- | --------- | ----------------------------------- |
| **Obsidian**   | `#0A0F12` | Backgrounds, deep shadows           |
| **Teal Neon**  | `#00FFC8` | Trigram glyphs, UI highlights, VFX  |
| **Cyan Glow**  | `#1BE7FF` | Vital-point outlines, cursor pulses |
| **Crimson**    | `#FF0044` | Blood splatter, damage indicators   |
| **Slate Gray** | `#2E3538` | Character base shading, UI panels   |
| **Gunmetal**   | `#424A50` | UI frames, subtle backgrounds       |

- **Lighting:** harsh rim light (teal/cyan), heavy falloff into obsidian.
- **Vignette:** darkened edges to focus on center action.

---

## 2. UI Elements

### 2.1 HUD Panels

- **Style:** semi-opaque slate panels with teal border, slight noise texture.
- **Font:** pixel-crisp Hangul for headings (e.g. “체력”), clean sans serif for numeric/data.
- **Bars:** segmented, 10-block style with neon fill.

```
╔═══════╦═══════╗
║ 체력 □□■■■□□ ║
║ 통증 □■■□□□□ ║
╚═══════╩═══════╝
```

### 2.2 Trigram Wheel

- **Layout:** horizontal ribbon of 8 glyphs at bottom-center.
- **Inactive:** slate‐gray icon; **active:** teal neon glow + subtle pulse.
- **Tooltip:** on hover, show small data-slate: “☲ 리 (Li) – Fire: nerve strike +40% paralysis.”

### 2.3 Stance Icons

- **Position:** top-left, three icons (🛡️/⚖️/⚔️).
- **Style:** minimalist line-art filled on active state, outline when inactive.
- **Transition:** quick fade + “snap” SFX on switch.

---

## 3. Iconography & Glyphs

| Asset              | Style                                                    | Notes                                  |
| ------------------ | -------------------------------------------------------- | -------------------------------------- |
| **Vital-Point**    | small cyan circles (r=8px)                               | pulsing outline on hover; lock = solid |
| **Finishers**      | trigram glyph + slash overlay                            | animated “ink smear” reveal            |
| **Balance States** | colored dots (🟢🟡🟠🔴)                                  | correspond to fill color of UI bar     |
| **Consciousness**  | brain icon + blur bars                                   | icon fills as awareness drops          |
| **Pain Response**  | lightning ⚡ (shock), droplet (trauma), skull (overload) | appears next to “통증” label           |

---

## 4. Characters & Portraits

- **Silhouette:** crisp outlines with strong rim lighting in teal/cyan.
- **Uniforms:** matte-black tactical wear with glowing chest nodes.
- **Accessories:**

  - Musa: skull-etched helmet, heavy gloves
  - Amsalja: hooded mask, wrist-blade silhouette
  - Hacker: visor with HUD projections, subdermal tracings
  - Jeongbo: sleek suit, subtle shoulder augments
  - Jojik: rugged jacket, knuckledusters

**Sprite Sheet:**

- **Idle:** 4 frames (breathing subtle nod)
- **Strike:** 6 frames per strike type (light, med, heavy)
- **Stance-Switch:** 3-frame parry pose
- **Finisher:** 10-frame slow-mo flourish + blood splash overlay

---

## 5. Effects & VFX

### 5.1 Hit Effects

- **Bone Impact:** dusty white splinters + cyan spark
- **Flesh Impact:** crimson fluid particle + radial smear
- **Joint Pop:** quick white crackflash + brief slow-mo

### 5.2 Vital-Point Lock

- **On Lock:** small pulsating cyan circle + faint trigram glyph watermark behind character
- **On Hit:** circle shatters into jagged shards that fade to blood droplets

### 5.3 Stance & Ki Flow

- **Stance Switch:** quick cyan wipe across bottom UI, flicker on character armor nodes
- **Black Ki Meter:** purple-cyan gradient bar that “fills” with electric arc animation

---

## 6. Environment Textures

- **Floor:** wet concrete with subtle neon reflections; tile grid visible.
- **Walls:** corrugated metal + exposed pipes + flickering Hangul glyph graffiti (☰, ☲, etc.)
- **Backdrop:** city-grid silhouette with drifting data-lines, slight chromatic aberration

**Tiling Textures:**

- **Concrete:** 512×512 repeating with normal & roughness maps
- **Metal Plates:** 256×256 with grunge + emissive specs behind pipes

---

## 7. Font & Typography

- **Headings (Hangul):** custom pixel‐aligned font (`BlackTrigram-Hangul`)
- **Body (Latin/Korean):** `Noto Sans KR` or `Roboto` light for clarity
- **Trigram Glyphs:** hand-tuned to match font weight

---

## 8. Audio-Visual Synchrony

- **UI Clicks:** 1-2 ms teal whoosh
- **Stance Switch:** low mechanical snap + subtle gong
- **Vital Lock:** soft digital “ping” + heart-beat subwoofer rumble
- **Finishers:** crescendo + single bone-crack tail

---

## 9. Directory Structure

```
public/assets/
├── fonts/
│   ├── BlackTrigram-Hangul.woff2
│   └── NotoSansKR-Regular.woff2
├── images/
│   ├── ui/
│   │   ├── panel_slate.png
│   │   ├── trigram_[1-8].png
│   │   └── stance_[def|bal|agg].png
│   ├── icons/
│   │   ├── vp_lock.png
│   │   ├── balance_[0-3].png
│   │   └── finish_[1-8].png
│   └── vfx/
│       ├── hit_bone_spritesheet.png
│       ├── blood_splash.png
│       └── ki_flow.png
└── textures/
    ├── floor_concrete_512.jpg
    ├── wall_metal_256.jpg
    └── graffiti_trigram_set.png
```

---

### 👉 **Result:**

This guide ensures every visual and audio asset—UI panels, icons, VFX, character sprites, environment textures—speaks the same language: **lethal, precise, cyber-Korean noir**, just as the concept images promise.

🎬 10. Intro Screen (Main Menu)
Objective: Nail the game’s mood from first glance—lethal precision in a cyberpunk undercity.

10.1 Layout & Composition
Section Content Style
Background Looping pan of rain-slick concrete floor & neon-etched pipes, subtle data-line grid shifting behind 1920×1080, obsidian base, teal/cyan neon reflections, slight film grain
Logo Centered “BLACK TRIGRAM” (흑괘) text + trigram wheel 2000 × 300px SVG, cyan glow + inner shadow, slow pulse
Menu Options

▶ Start Combat

⚙ Settings

📜 Lore Archive

❌ Exit
| Vertical list, right-aligned, each item in pixel-sharp Hangul + English; hover: teal underline, soft “ping” SFX |
| Footer | Version, copyright, social icons 🔗 | Small slate panel, gunmetal text, hover: icons glow cyan |

10.2 Animations & Transitions
Background Loop: 5 s slow scroll of rain droplets; neon glyphs flicker (random 1 – 4 s intervals).

Logo Entrance: Fade in (1 s), then scale from 90→100% (0.5 s) with “woosh” SFX.

Menu Reveal: Each item slides in from right (staggered 0.1 s), easing-out.

Selection: Active item glows cyan, subtle scale-up (1.05×) on hover.

10.3 Audio
Ambience: Distant machinery hum + rhythmic dripping (loop).

Music: Low-tempo industrial percussion (30 BPM) with distorted gayageum motif.

SFX:

Menu hover: soft digital “ping” (12 kHz sine).

Menu select: low mechanical “clack.”

🥋 11. Dojang Scene (Training Hall)
Objective: Immersive practice space—raw, functional, lethal.

11.1 Environment Layout
Element Description Asset Notes
Floor Large matte-black tatami mats, subtle rain – water puddles in corners 2048×2048 PBR texture, normal + roughness maps
Walls Corrugated metal panels with neon Hangul trigrams (☰,☲…) 1024×1024 tiled, emissive mask for glyphs
Props

Training dummy (wooden post + vinyl padding)

Minimalistic strike pads on walls

Overhead cyber-rig supports
| Low-poly (2k tris), grayscale base with emissive teal accents on targets |

11.2 Camera & Lighting
Camera: Fixed side-on orthographic, slight 10° tilt for depth.

Key Light: Off-screen top-left teal rim light (70% intensity).

Fill Light: Low-intensity cyan from bottom-right.

Shadows: Soft, 512 px map; characters cast crisp silhouette.

11.3 Interactive Zones
Vital-Point Target Panel: Faint outline on mat where practice overlay appears.

Stance Switch Pad: Glowing circle on floor—step onto to auto-switch stance (training aid).

Feedback Console: Wall-mounted holo-screen showing real-time metrics (accuracy %, combo count).

11.4 VFX & Audio Cues
Strike Impact: Dust puff + tiny sparks where the dummy is hit.

Perfect Hit: Cyan flash + “chime” SFX.

Wrong Zone: Brief red tint + low “buzz.”

Ambient: Soft echo of distant drills, dripping water, metallic hum.

🎓 12. Training Module Screens
Objective: Clear, data-driven UI for learning and mastery.

12.1 Anatomical Study
Panel Content Style
Anatomy Grid 2D transparent body schematic with 70 static VP markers Vector SVG overlay on semi-opaque slate background
Instruction Box

VP Name (Hangul + ENG)

Effects: “Consciousness ↓ 30%”

Difficulty bar (1–5 stars)
| Floating tooltip in top-right, teal header, black body text |

Interaction
Hover VP: Pulsing cyan halo + outline.

Select VP: Lock icon appears, details populate instruction box.

12.2 Precision Striking
Section Content Behavior
Strike Timer Countdown bar (5 s) Depletes left→right, crimson tint when <1 s
Target Sequence Highlighted VP markers in order Fade-in/fade-out each marker; player must click to match
Score Panel Hits/Misses, accuracy %, combo streak Updates after each attempt; pulsing green on combos

12.3 Advanced Techniques
Category List Selection
Strikes Light, Medium, Heavy VP combos Icon + name; hover shows damage & ki cost tooltip
Sequences 3–5 strike chains Animated preview GIF in slider
Counters Parry + riposte patterns Side-by-side skeleton demo

UI Behavior
Filter Tabs: ⚔️ “Strikes” / 🤼 “Grapples” / 🛡️ “Defenses”

Detail View: Click technique → full description + “Practice Now” button

12.4 Combat Training
Mode Settings Preview
1-on-1 Spar Opponent archetype, aggression level, VP focus Small live preview window shows selected AI stance
Endurance Duration (30s/60s), pain threshold Timer + pain gauge overlay
Balance Drill Hit intervals, recovery window Flashing balance icon on failure

Controls Overlay
Key Reminder: small translucent panel bottom-left: “1–8: Switch Trigram”

Help Tooltip: “Press H for control cheat sheet”

# 🎨 Asset Specification & Creation Guide

A comprehensive list of every asset needed for **Black Trigram**—from the intro screen to training modules to in-match combat—organized by category. Use this as your single source of truth for art, audio, UI, VFX, animation, and localization.

---

## 1. Visual Assets

### 1.1 Backgrounds & Environments

| Asset Name               | Description                                       | Resolution / Size    | Format | Folder                     | Style Notes                                  |
| ------------------------ | ------------------------------------------------- | -------------------- | ------ | -------------------------- | -------------------------------------------- |
| `intro_bg_loop`          | Rain-slick concrete + neon glyph pan loop         | 1920×1080 (seamless) | .PNG   | `assets/visual/bg/intro/`  | Obsidian base, teal/cyan accents, film grain |
| `dojang_floor_tex`       | Matte-black tatami mat with water puddle normals  | 2048×2048            | .PNG   | `assets/visual/bg/dojang/` | PBR: albedo, normal, roughness maps          |
| `dojang_wall_tex`        | Corrugated metal + emissive Hangul trigram glyphs | 1024×1024 (tiled)    | .PNG   | `assets/visual/bg/dojang/` | Emissive mask for glyph shine                |
| `training_console_model` | Low-poly holo-console (static mesh snapshot)      | 512×512 sprite sheet | .PNG   | `assets/visual/props/`     | Grayscale base, cyan emissive elements       |
| `stance_pad_circle`      | Glowing floor pad for stance switch               | 256×256              | .PNG   | `assets/visual/props/`     | Teal glow, pulsating alpha animation         |
| `dummy_target_overlay`   | Vector outline of vital-point target zones        | SVG (responsive)     | .SVG   | `assets/visual/overlays/`  | Semi-opaque slate, cyan highlights           |

---

### 1.2 Character Portraits & Sprites

| Asset Name                    | Role                    | Frames / Variations     | Format | Folder                             | Notes                                 |
| ----------------------------- | ----------------------- | ----------------------- | ------ | ---------------------------------- | ------------------------------------- |
| `portrait_musa`               | Main menu & UI          | Single 2048×2048 image  | .PNG   | `assets/characters/portraits/`     | Rim-lit, cyber-helm visor             |
| `portrait_amsalja`            | —                       | Single 2048×2048 image  | .PNG   | `assets/characters/portraits/`     | Hooded assassin with blade silhouette |
| `sprite_musa_idle`            | In-match idle animation | 8 frames (128×256 each) | .PNG   | `assets/characters/sprites/musa/`  | Bare-fist stance                      |
| `sprite_musa_strike1`         | Light strike            | 6 frames                | .PNG   | `assets/characters/sprites/musa/`  | Applies ☰ Geon bone-strike VFX        |
| `sprite_musa_strike2`         | Heavy strike            | 8 frames                | .PNG   | `assets/characters/sprites/musa/`  |                                       |
| `sprite_musa_hit`             | Hit reaction            | 4 frames                | .PNG   | `assets/characters/sprites/musa/`  | Flinch + red flash overlay            |
| `sprite_musa_finisher1`       | Finisher animation (☰)  | 12 frames               | .PNG   | `assets/characters/finisher/musa/` | Cinematic skull-cracker combo         |
| _(repeat for each archetype)_ |                         |                         |        |                                    |                                       |

---

### 1.3 UI Elements & Icons

| Asset Name               | Description                        | Size        | Format | Folder                      | Style Notes                       |
| ------------------------ | ---------------------------------- | ----------- | ------ | --------------------------- | --------------------------------- |
| `icon_stance_defensive`  | 🛡️ Defensive stance icon           | 64×64 px    | .SVG   | `assets/ui/icons/stances/`  | Cyan outline, filled on active    |
| `icon_stance_balanced`   | ⚖️ Balanced stance                 | 64×64 px    | .SVG   | `assets/ui/icons/stances/`  | Default grey fill                 |
| `icon_stance_aggressive` | ⚔️ Aggressive stance               | 64×64 px    | .SVG   | `assets/ui/icons/stances/`  | Red accent on hover               |
| `icon_trigram_1` … `8`   | ☰…☷ Trigram belt icons             | 48×48 px    | .SVG   | `assets/ui/icons/trigrams/` | Teal glyph, dark backdrop         |
| `hud_health_bar`         | Segmented health bar (10 segments) | 800×32 px   | .PNG   | `assets/ui/hud/`            | Teal→black gradient               |
| `hud_pain_bar`           | Segmented pain bar                 | 800×16 px   | .PNG   | `assets/ui/hud/`            | Orange→black gradient             |
| `ui_button_start`        | ▶ Start Combat button (idle/hover) | 256×64 px   | .PNG   | `assets/ui/buttons/`        | Hover: cyan underline + glow      |
| `ui_panel_slate`         | Semi-opaque slate panel background | 1024×512 px | .PNG   | `assets/ui/panels/`         | 70% opacity, subtle noise texture |
| `tooltip_arrow`          | Pointer for tooltips               | 32×32 px    | .PNG   | `assets/ui/tooltips/`       | Cyan fill, subtle drop shadow     |

---

### 1.4 VFX & Particle Assets

| Asset Name           | Type               | Parameters                       | Format | Folder                  | Notes                    |
| -------------------- | ------------------ | -------------------------------- | ------ | ----------------------- | ------------------------ |
| `vfx_dust_puff`      | Particle Sprite    | 16×16 frames, 8 fps              | .PNG   | `assets/vfx/particles/` | White→grey fade          |
| `vfx_blood_splatter` | Sprite sheet       | 128×128 (4 frames)               | .PNG   | `assets/vfx/particles/` | Crimson, semi-opaque     |
| `vfx_impact_ring`    | Shader overlay     | Radial mask, expands 0→1 in 0.2s | .PNG   | `assets/vfx/shaders/`   | Cyan outline             |
| `vfx_neon_glow`      | Bloom pass overlay | 256×256 pulse alpha              | .PNG   | `assets/vfx/shaders/`   | For glyph flicker        |
| `vfx_critical_flash` | Full-screen flash  | 1 frame, white→red blend (0.1s)  | .PNG   | `assets/vfx/overlays/`  | Trigger on crit/finisher |

---

## 2. Audio Assets

### 2.1 Music Tracks

| File Name            | Purpose                    | Length | Format | Folder                       | Notes                                      |
| -------------------- | -------------------------- | ------ | ------ | ---------------------------- | ------------------------------------------ |
| `intro_theme.webm`   | Main menu BGM              | 90 s   | .webm  | `public/assets/audio/music/` | Industrial percussion + distorted gayageum |
| `combat_theme.webm`  | In-combat loop             | 120 s  | .webm  | `public/assets/audio/music/` | Driving low-tempo beat, 60 BPM             |
| `finisher_cue.webm`  | Finisher execution stinger | 4 s    | .webm  | `public/assets/audio/music/` | Single crescendo hit                       |
| `victory_theme.webm` | Post-match victory         | 30 s   | .webm  | `public/assets/audio/music/` | Triumphant distorted gayageum riff         |

---

### 2.2 Sound Effects

| File Name                 | Category  | Description         | Format | Folder                             | Notes                   |
| ------------------------- | --------- | ------------------- | ------ | ---------------------------------- | ----------------------- |
| `menu_click.webm`         | UI        | Button click        | .webm  | `public/assets/audio/sfx/ui/`      | 12 kHz “ping”           |
| `attack_punch_light.webm` | Combat    | Light punch         | .webm  | `public/assets/audio/sfx/attacks/` | Thud + subtle breath    |
| `attack_punch_heavy.webm` | Combat    | Heavy punch         | .webm  | `public/assets/audio/sfx/attacks/` | Deep thud + crunch      |
| `hit_flesh.webm`          | Impact    | Body hit            | .webm  | `public/assets/audio/sfx/hit/`     | Mid-range impact        |
| `hit_block.webm`          | Impact    | Block impact        | .webm  | `public/assets/audio/sfx/hit/`     | Metallic clang          |
| `hit_critical.webm`       | Impact    | Critical bone/crack | .webm  | `public/assets/audio/sfx/hit/`     | Dual-layer thud + crack |
| `ambient_dojo.webm`       | Ambient   | Dojo echo + drip    | .webm  | `public/assets/audio/sfx/ambient/` | Low hum + water drip    |
| `stance_switch.webm`      | UI/Combat | Quick stance toggle | .webm  | `public/assets/audio/sfx/ui/`      | Short electronic blip   |
| `trigram_select.webm`     | UI        | Trigram mode select | .webm  | `public/assets/audio/sfx/ui/`      | Soft click + glow fade  |

---

## 3. UI & Typography

| Asset Name              | Purpose         | Format | Folder          | Notes                                     |
| ----------------------- | --------------- | ------ | --------------- | ----------------------------------------- |
| `font_hangul_pixel.otf` | Korean headings | .OTF   | `assets/fonts/` | Pixel-sharp, monospaced, for headers only |
| `font_sans_ui.ttf`      | UI body text    | .TTF   | `assets/fonts/` | Clean sans-serif, legible at small sizes  |
| `localization_ko.json`  | Korean strings  | .JSON  | `assets/i18n/`  | Key-value pairs for UI & tooltips         |
| `localization_en.json`  | English strings | .JSON  | `assets/i18n/`  | Complete UI translation                   |

---

## 4. Animation & Motion

| Asset Name           | Type             | Frames / Duration         | Format  | Folder                             | Notes                          |
| -------------------- | ---------------- | ------------------------- | ------- | ---------------------------------- | ------------------------------ |
| `anim_logo_pulse`    | Logo intro       | 60 fps, 1.5 s             | .Lottie | `assets/animations/intro/`         | Scale + opacity Lottie JSON    |
| `anim_menu_slide`    | Menu item reveal | 8 frames, staggered 0.1 s | .PNG    | `assets/animations/ui/`            | Horizontal slide-in            |
| `anim_strike_impact` | Impact VFX       | 16 frames, 0.2 s          | .PNG    | `assets/animations/vfx/`           | Dust puff + ring               |
| `anim_finisher_musa` | Musa finisher    | 12 frames                 | .PNG    | `assets/animations/finisher/musa/` | Crisp key poses + smear frames |

---

## 5. Shader & Material Assets

| Shader Name           | Purpose                       | Parameters                         | Folder            | Notes                             |
| --------------------- | ----------------------------- | ---------------------------------- | ----------------- | --------------------------------- |
| `rim_light.shader`    | Character rim lighting        | Color, intensity, edge softness    | `assets/shaders/` | Cyan rim for silhouettes          |
| `blood_decal.shader`  | Dynamic blood overlay         | Spread radius, opacity falloff     | `assets/shaders/` | Fragment shader with mask texture |
| `neon_flicker.shader` | Flickering Hangul neon glyphs | Flicker speed, brightness variance | `assets/shaders/` | Uses time-based sine function     |

---

## 6. Localization & UI Data

| File Name              | Content                      | Format | Notes                                     |
| ---------------------- | ---------------------------- | ------ | ----------------------------------------- |
| `i18n/ko.json`         | Korean UI strings & tooltips | JSON   | All user-facing text                      |
| `i18n/en.json`         | English UI strings           | JSON   | Mirror of ko.json                         |
| `controls_layout.json` | Key & gamepad binding maps   | JSON   | Default & customizable mapping            |
| `training_config.json` | Drill parameters & prompts   | JSON   | Timers, sequence orders, difficulty tiers |

---

## 7. Folder Structure Overview

```
/assets
├─ characters/
│  ├─ portraits/
│  ├─ sprites/
│  └─ finisher/
├─ fonts/
├─ i18n/
├─ props/
├─ shaders/
├─ sprites/
├─ ui/
│  ├─ buttons/
│  ├─ icons/
│  ├─ hud/
│  └─ panels/
├─ vfx/
│  ├─ animations/
│  └─ particles/
└─ visual/
   ├─ bg/
   └─ overlays/

/public/assets/audio
├─ music/
└─ sfx/
   ├─ ambient/
   ├─ attacks/
   ├─ hit/
   └─ ui/
```

---

> This master asset list ensures **all** visual, audio, UI, VFX, animation, shader, and localization resources are fully specified—complete with names, formats, resolutions, folders, and style notes—so your pipeline can deliver **Black Trigram**’s lethal, cyber-Korean combat experience in pixel-perfect detail.
