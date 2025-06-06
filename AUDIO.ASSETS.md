# Audio Assets Specification (AudioManager Compatible)

This document specifies the **exact audio asset requirements** for the Black Trigram AudioManager system. The assets must be in WebM format with Opus codec for optimal compatibility.

## Critical Issues Identified

Based on the console output, the following issues need to be addressed:

1. **Missing Asset Files**: Some audio files are returning "Decoding audio data failed" errors
2. **Null ID Errors**: The error logs show `null` IDs, indicating improper asset loading
3. **Format Issues**: Some assets may not be in the correct WebM/Opus format

## 🌑 Dark Cyberpunk Korean Martial Arts Audio Design

### Underground Dojang Atmosphere

All audio assets should embody the **Underground Dojang** aesthetic:

- **Neon Light Audio** - Electric hum and cyberpunk ambience
- **Blood Stain Echoes** - Reverb suggesting previous brutal training
- **Depth of Darkness** - Spatial audio creating underground feeling
- **Weight of Combat** - Heavy, realistic impact sounds

### Korean Traditional + Cyberpunk Fusion

- **Cyberpunk Gayageum** - Traditional Korean strings with electronic processing
- **Digital Buk Drums** - War drums with synthetic enhancement
- **Neon Kkwaenggwari** - Small gongs with futuristic resonance
- **Glitched Haegeum** - Korean fiddle with digital distortion

## 📋 Detailed Audio Asset Table

### Core Sound Effects (Required)

| Asset ID          | File Path                          | Type | Priority    | Size (KB) | Duration (s) | Frequency Range         | Description                                     | Korean Context                                |
| ----------------- | ---------------------------------- | ---- | ----------- | --------- | ------------ | ----------------------- | ----------------------------------------------- | --------------------------------------------- |
| `menu_hover`      | `/sfx/menu/menu_hover.webm`        | SFX  | ✅ CRITICAL | 15-25     | 0.1-0.2      | 600-1200Hz              | Subtle neon tone on interface hover             | Soft wood block tap - traditional percussion  |
| `menu_select`     | `/sfx/menu/menu_select.webm`       | SFX  | ✅ CRITICAL | 20-35     | 0.15-0.3     | 800-1600Hz              | Decisive cyber click confirmation               | Bamboo flute note - selection harmony         |
| `menu_back`       | `/sfx/menu/menu_back.webm`         | SFX  | ✅ CRITICAL | 18-30     | 0.1-0.25     | 400-800Hz               | Shadow effect return navigation                 | Soft gong resonance - return to state         |
| `attack_light`    | `/sfx/combat/attack_light.webm`    | SFX  | ✅ CRITICAL | 25-40     | 0.08-0.15    | 200-600Hz               | Quick air cutting + neon glow                   | Swift precision strike - light technique      |
| `attack_medium`   | `/sfx/combat/attack_medium.webm`   | SFX  | ✅ CRITICAL | 30-50     | 0.1-0.2      | 150-500Hz               | Focused energy release                          | Concentrated ki energy - medium power         |
| `attack_heavy`    | `/sfx/combat/attack_heavy.webm`    | SFX  | ✅ CRITICAL | 40-65     | 0.15-0.3     | 100-400Hz               | Thunder-like shockwave                          | Devastating force - heavy technique           |
| `attack_critical` | `/sfx/combat/attack_critical.webm` | SFX  | ✅ CRITICAL | 50-80     | 0.2-0.4      | 80-350Hz + harmonics    | Perfect vital point strike + electronic harmony | Ultimate precision - critical vital strike    |
| `hit_light`       | `/sfx/hits/hit_light.webm`         | SFX  | ✅ CRITICAL | 20-35     | 0.05-0.12    | 300-700Hz               | Light contact + digital pulse                   | Glancing contact - minimal damage             |
| `hit_medium`      | `/sfx/hits/hit_medium.webm`        | SFX  | ✅ CRITICAL | 30-45     | 0.1-0.18     | 200-600Hz               | Solid impact + cyber echo                       | Effective strike - moderate damage            |
| `hit_heavy`       | `/sfx/hits/hit_heavy.webm`         | SFX  | ✅ CRITICAL | 40-60     | 0.15-0.25    | 150-500Hz               | Destructive blow + electronic shock             | Devastating impact - severe damage            |
| `hit_critical`    | `/sfx/hits/hit_critical.webm`      | SFX  | ✅ CRITICAL | 50-75     | 0.2-0.35     | 100-400Hz + neural freq | Vital point strike + nerve destruction          | Perfect vital point contact - critical damage |
| `stance_change`   | `/sfx/movement/stance_change.webm` | SFX  | ✅ CRITICAL | 25-40     | 0.2-0.4      | 400-1000Hz              | Trigram transition + energy wave                | Eight trigram stance transformation           |
| `match_start`     | `/sfx/match/match_start.webm`      | SFX  | ✅ CRITICAL | 60-100    | 0.8-1.5      | 150-800Hz               | Temple bell + combat beginning                  | Sacred combat initiation ceremony             |

### Enhanced Combat Effects (High Priority)

| Asset ID              | File Path                              | Type | Priority | Size (KB) | Duration (s) | Frequency Range       | Description                           | Korean Context                         |
| --------------------- | -------------------------------------- | ---- | -------- | --------- | ------------ | --------------------- | ------------------------------------- | -------------------------------------- |
| `attack_punch_light`  | `/sfx/combat/attack_punch_light.webm`  | SFX  | 🔧 HIGH  | 20-35     | 0.06-0.12    | 250-650Hz             | Light punch impact + cyber echo       | Quick jab technique - precise striking |
| `attack_punch_medium` | `/sfx/combat/attack_punch_medium.webm` | SFX  | 🔧 HIGH  | 30-50     | 0.1-0.18     | 200-550Hz             | Medium punch shock + neon reverb      | Solid punch technique - focused power  |
| `attack_special_geon` | `/sfx/combat/attack_special_geon.webm` | SFX  | 🔧 HIGH  | 45-70     | 0.2-0.4      | 100-400Hz + celestial | Geon trigram special + heavenly power | Heaven trigram ultimate technique      |
| `dodge`               | `/sfx/combat/dodge.webm`               | SFX  | 🔧 HIGH  | 15-30     | 0.08-0.15    | 400-1200Hz            | Shadow movement + air displacement    | Evasive shadow arts - defensive flow   |
| `block_success`       | `/sfx/combat/block_success.webm`       | SFX  | 🔧 HIGH  | 25-40     | 0.1-0.2      | 200-600Hz             | Solid defense + metal resonance       | Successful defensive technique         |
| `block_break`         | `/sfx/combat/block_break.webm`         | SFX  | 🔧 HIGH  | 35-55     | 0.15-0.3     | 150-500Hz             | Defense shattered + desperate crack   | Guard broken - defensive failure       |
| `perfect_strike`      | `/sfx/combat/perfect_strike.webm`      | SFX  | 🔧 HIGH  | 60-90     | 0.3-0.5      | 100-1000Hz + divine   | Flawless technique + sacred resonance | Perfect martial arts execution         |

### Archetype-Specific Audio (New System)

| Asset ID          | File Path                             | Type | Priority | Size (KB) | Duration (s) | Frequency Range        | Description                                      | Korean Context                 |
| ----------------- | ------------------------------------- | ---- | -------- | --------- | ------------ | ---------------------- | ------------------------------------------------ | ------------------------------ |
| `musa_special`    | `/sfx/archetype/musa_special.webm`    | SFX  | 🔧 NEW   | 40-65     | 0.2-0.4      | 150-500Hz + military   | Warrior exclusive technique + military precision | Traditional warrior discipline |
| `amsalja_stealth` | `/sfx/archetype/amsalja_stealth.webm` | SFX  | 🔧 NEW   | 20-35     | 0.1-0.3      | 600-1500Hz + whisper   | Assassin stealth + shadow whispers               | Silent shadow techniques       |
| `hacker_tech`     | `/sfx/archetype/hacker_tech.webm`     | SFX  | 🔧 NEW   | 35-55     | 0.15-0.35    | 200-800Hz + digital    | Hacker technology + digital interference         | Cyber-enhanced combat methods  |
| `jeongbo_psych`   | `/sfx/archetype/jeongbo_psych.webm`   | SFX  | 🔧 NEW   | 30-50     | 0.2-0.4      | 100-400Hz + subliminal | Intelligence operative psychological warfare     | Mental pressure techniques     |
| `jojik_brutal`    | `/sfx/archetype/jojik_brutal.webm`    | SFX  | 🔧 NEW   | 45-70     | 0.15-0.3     | 80-350Hz + harsh       | Organized crime brutality + street noise         | Underground survival brutality |

### Eight Trigram Philosophy Audio (New System)

| Asset ID       | File Path                        | Type | Priority | Size (KB) | Duration (s) | Frequency Range       | Description                                                | Korean Context                      |
| -------------- | -------------------------------- | ---- | -------- | --------- | ------------ | --------------------- | ---------------------------------------------------------- | ----------------------------------- |
| `geon_heaven`  | `/sfx/trigram/geon_heaven.webm`  | SFX  | 🔧 NEW   | 50-80     | 0.3-0.5      | 100-400Hz + celestial | ☰ Heaven trigram + heavenly force + bone destruction       | Direct bone-striking divine power   |
| `tae_lake`     | `/sfx/trigram/tae_lake.webm`     | SFX  | 🔧 NEW   | 40-65     | 0.25-0.45    | 200-600Hz + fluid     | ☱ Lake trigram + flowing manipulation + joint control      | Fluid joint manipulation techniques |
| `li_fire`      | `/sfx/trigram/li_fire.webm`      | SFX  | 🔧 NEW   | 35-60     | 0.2-0.4      | 300-800Hz + sharp     | ☲ Fire trigram + precision flame + nerve strikes           | Precise nerve-targeting fire        |
| `jin_thunder`  | `/sfx/trigram/jin_thunder.webm`  | SFX  | 🔧 NEW   | 45-75     | 0.2-0.4      | 150-500Hz + electric  | ☳ Thunder trigram + stunning shock + electrical disruption | Thunder stunning techniques         |
| `son_wind`     | `/sfx/trigram/son_wind.webm`     | SFX  | 🔧 NEW   | 30-50     | 0.3-0.6      | 250-750Hz + flowing   | ☴ Wind trigram + persistent flow + continuous pressure     | Continuous pressure techniques      |
| `gam_water`    | `/sfx/trigram/gam_water.webm`    | SFX  | 🔧 NEW   | 35-55     | 0.25-0.5     | 180-550Hz + adaptive  | ☵ Water trigram + adaptive flow + blood restriction        | Blood flow restriction methods      |
| `gan_mountain` | `/sfx/trigram/gan_mountain.webm` | SFX  | 🔧 NEW   | 40-70     | 0.2-0.4      | 120-450Hz + solid     | ☶ Mountain trigram + mountain defense + counterattack      | Defensive mountain techniques       |
| `gon_earth`    | `/sfx/trigram/gon_earth.webm`    | SFX  | 🔧 NEW   | 45-75     | 0.3-0.5      | 100-400Hz + grounding | ☷ Earth trigram + earth embrace + throwing techniques      | Ground-based throwing arts          |

### Vital Point System Audio (New System)

| Asset ID        | File Path                              | Type | Priority | Size (KB) | Duration (s) | Frequency Range       | Description                                      | Korean Context                 |
| --------------- | -------------------------------------- | ---- | -------- | --------- | ------------ | --------------------- | ------------------------------------------------ | ------------------------------ |
| `nerve_strike`  | `/sfx/vital_points/nerve_strike.webm`  | SFX  | 🔧 NEW   | 25-45     | 0.1-0.3      | 800-2000Hz + electric | Nervous system strike + electrical paralysis     | Neural disruption techniques   |
| `bone_break`    | `/sfx/vital_points/bone_break.webm`    | SFX  | 🔧 NEW   | 40-65     | 0.15-0.4     | 100-400Hz + crack     | Bone fracture + structural destruction           | Skeletal destruction methods   |
| `blood_flow`    | `/sfx/vital_points/blood_flow.webm`    | SFX  | 🔧 NEW   | 30-50     | 0.2-0.5      | 60-200Hz + pulse      | Blood flow disruption + circulation interference | Vascular control techniques    |
| `consciousness` | `/sfx/vital_points/consciousness.webm` | SFX  | 🔧 NEW   | 35-60     | 0.2-0.6      | 100-300Hz + fading    | Consciousness manipulation + mental shock        | Awareness disruption methods   |
| `respiratory`   | `/sfx/vital_points/respiratory.webm`   | SFX  | 🔧 NEW   | 25-45     | 0.15-0.4     | 300-800Hz + breath    | Breathing disruption + airway pressure           | Respiratory control techniques |

### Ki Energy System Audio (New System)

| Asset ID       | File Path                          | Type | Priority | Size (KB) | Duration (s) | Frequency Range      | Description                                   | Korean Context             |
| -------------- | ---------------------------------- | ---- | -------- | --------- | ------------ | -------------------- | --------------------------------------------- | -------------------------- |
| `ki_charge`    | `/sfx/ki_energy/ki_charge.webm`    | SFX  | 🔧 NEW   | 40-70     | 0.5-2.0      | 100-500Hz + harmonic | Internal energy accumulation + electronic hum | Traditional ki cultivation |
| `ki_release`   | `/sfx/ki_energy/ki_release.webm`   | SFX  | 🔧 NEW   | 50-80     | 0.2-0.5      | 150-600Hz + burst    | Explosive energy release + cyber pulse        | Ki energy burst techniques |
| `energy_pulse` | `/sfx/ki_energy/energy_pulse.webm` | SFX  | 🔧 NEW   | 30-50     | 0.15-0.3     | 200-700Hz + rhythmic | Rhythmic energy wave + trigram power          | Eight trigram energy flow  |
| `ki_depleted`  | `/sfx/ki_energy/ki_depleted.webm`  | SFX  | 🔧 NEW   | 25-40     | 0.2-0.4      | 80-300Hz + declining | Energy depletion + electronic discharge       | Ki exhaustion state        |

### Environmental & Atmospheric Audio

| Asset ID           | File Path                                | Type | Priority    | Size (KB) | Duration (s) | Frequency Range      | Description                                  | Korean Context                 |
| ------------------ | ---------------------------------------- | ---- | ----------- | --------- | ------------ | -------------------- | -------------------------------------------- | ------------------------------ |
| `underground_echo` | `/sfx/environment/underground_echo.webm` | AMB  | 🔧 NEW      | 60-100    | 2.0-5.0      | 40-200Hz + reverb    | Underground space resonance + darkness depth | Hidden dojang atmosphere       |
| `neon_hum`         | `/sfx/environment/neon_hum.webm`         | AMB  | 🔧 NEW      | 40-70     | 3.0-8.0      | 60Hz + harmonics     | Neon electrical hum + cyberpunk ambience     | Futuristic lighting atmosphere |
| `blood_stain_echo` | `/sfx/environment/blood_stain_echo.webm` | AMB  | 🔧 NEW      | 50-80     | 2.0-4.0      | 100-400Hz + haunting | Blood stain echoes + past battle memories    | Previous combat history        |
| `dojang_ambience`  | `/sfx/environment/dojang_ambience.webm`  | AMB  | 🔧 OPTIONAL | 80-120    | 5.0-10.0     | 60-500Hz + peaceful  | Peaceful dojang atmosphere + meditation      | Traditional training space     |

### Music Tracks (Background)

| Asset ID            | File Path                       | Type  | Priority    | Size (MB) | Duration (min) | Style                    | Description                                                    | Korean Context                |
| ------------------- | ------------------------------- | ----- | ----------- | --------- | -------------- | ------------------------ | -------------------------------------------------------------- | ----------------------------- |
| `intro_theme`       | `/music/intro_theme.webm`       | MUSIC | ✅ CRITICAL | 3-6       | 2-4            | Traditional + Electronic | Meditative Korean traditional + philosophical atmosphere       | Philosophy introduction music |
| `combat_theme`      | `/music/combat_theme.webm`      | MUSIC | ✅ CRITICAL | 4-8       | 3-6            | Intense Rhythmic         | Intense rhythm + combat energy + traditional percussion        | Battle intensity soundtrack   |
| `underground_theme` | `/music/underground_theme.webm` | MUSIC | 🔧 NEW      | 5-10      | 4-8            | Dark Ambient             | Underground dojang + darkness atmosphere + neon ambience       | Hidden training facility      |
| `cyberpunk_fusion`  | `/music/cyberpunk_fusion.webm`  | MUSIC | 🔧 NEW      | 6-12      | 5-10           | Traditional + Cyber      | Korean traditional + cyberpunk fusion + electronic enhancement | Cultural-tech harmony         |

### Archetype Theme Music (New System)

| Asset ID         | File Path                                     | Type  | Priority | Size (MB) | Duration (min) | Style                  | Description                                                           | Korean Context              |
| ---------------- | --------------------------------------------- | ----- | -------- | --------- | -------------- | ---------------------- | --------------------------------------------------------------------- | --------------------------- |
| `musa_warrior`   | `/music/archetype_themes/musa_warrior.webm`   | MUSIC | 🔧 NEW   | 4-8       | 3-6            | Military + Traditional | Traditional warrior + military honor + disciplined rhythm             | Military martial discipline |
| `amsalja_shadow` | `/music/archetype_themes/amsalja_shadow.webm` | MUSIC | 🔧 NEW   | 3-6       | 2-5            | Dark + Minimal         | Shadow assassin + stealth melody + minimal instrumentation            | Silent shadow techniques    |
| `hacker_cyber`   | `/music/archetype_themes/hacker_cyber.webm`   | MUSIC | 🔧 NEW   | 5-10      | 4-8            | Electronic + Digital   | Cyber warrior + digital beats + technological enhancement             | Information warfare sound   |
| `jeongbo_intel`  | `/music/archetype_themes/jeongbo_intel.webm`  | MUSIC | 🔧 NEW   | 4-7       | 3-6            | Tension + Strategic    | Intelligence operative + strategic tension + psychological undertones | Mental warfare atmosphere   |
| `jojik_street`   | `/music/archetype_themes/jojik_street.webm`   | MUSIC | 🔧 NEW   | 4-8       | 3-7            | Harsh + Urban          | Organized crime + street brutality + harsh urban sounds               | Underground survival music  |

## 🎵 Enhanced Audio Design Specifications

### Format Specifications (Updated for Dark Aesthetics)

- **Container**: WebM
- **Audio Codec**: Opus (preferred) or Vorbis
- **Sample Rate**: 48kHz (recommended) or 44.1kHz
- **Bit Rate**:
  - SFX: 64-96 kbps (higher for bone impact realism)
  - Music: 128-160 kbps (higher for traditional instrument richness)
  - Ambient: 96-128 kbps (for underground atmosphere depth)
- **Channels**:
  - SFX: Mono (precise positioning) / Stereo (environmental)
  - Music: Stereo (full traditional + cyberpunk soundscape)
  - Combat: Mono (accurate targeting feedback)

### 🌑 Dark Combat Audio Styling Guidelines

#### Bone Impact Realism (골절 현실성)

```
Light Impact (경미한 충격):
- Frequency: 200-400Hz base, 2-4kHz crack
- Duration: 0.05-0.1s
- Reverb: Minimal, tight space
- Effect: Sharp crack + slight electronic pulse

Medium Impact (중간 충격):
- Frequency: 150-300Hz base, 1.5-3kHz crack
- Duration: 0.1-0.15s
- Reverb: Underground echo
- Effect: Solid impact + cyberpunk resonance

Heavy Impact (심각한 충격):
- Frequency: 100-250Hz base, 1-2kHz crack
- Duration: 0.15-0.25s
- Reverb: Deep underground space
- Effect: Devastating break + electronic distortion

Critical/Vital Impact (급소 치명타):
- Frequency: 80-200Hz base, 0.8-1.5kHz crack
- Duration: 0.2-0.4s
- Reverb: Haunting underground echo
- Effect: Perfect strike + divine/electronic harmony
```

#### Traditional Korean + Cyberpunk Fusion

```
가야금 (Gayageum) Enhancement:
- Base: Traditional plucked string resonance
- Enhancement: Subtle digital reverb + neon glow effect
- Processing: Light chorus + cyber echo
- Use: Menu navigation, stance transitions

북 (Buk) War Drums:
- Base: Deep traditional Korean percussion
- Enhancement: Electronic sub-bass + digital compression
- Processing: Industrial reverb + cyber punch
- Use: Combat intensity, match start/end

꽹과리 (Kkwaenggwari) Gongs:
- Base: Bright metallic traditional sound
- Enhancement: Synthetic harmonics + neon shimmer
- Processing: Futuristic delay + spatial effect
- Use: Critical hits, perfect techniques

해금 (Haegeum) Fiddle:
- Base: Traditional Korean string instrument
- Enhancement: Digital glitch + cyberpunk distortion
- Processing: Filtered sweep + electronic modulation
- Use: Atmospheric tension, psychological pressure
```

#### Archetype-Specific Audio Design

##### 🏯 무사 (Musa) - Traditional Warrior

```
Audio Signature: 군사적 절도 (Military Precision)
- Impact Style: Clean, powerful, honorable
- Frequency: Mid-range dominance (300-800Hz)
- Effects: Military drum backing, disciplined strikes
- Reverb: Formal dojang acoustics
- Special: Honor-bound technique sounds with traditional backing
```

##### 🥷 암살자 (Amsalja) - Shadow Assassin

```
Audio Signature: 그림자 속삭임 (Shadow Whispers)
- Impact Style: Silent, precise, deadly
- Frequency: Higher precision (600-1200Hz)
- Effects: Minimal audio, stealth enhancement
- Reverb: Absorbed, muffled, secretive
- Special: Near-silent techniques with sudden sharp impacts
```

##### 💻 해커 (Hacker) - Cyber Warrior

```
Audio Signature: 디지털 간섭 (Digital Interference)
- Impact Style: Tech-enhanced, analytical
- Frequency: Full spectrum with digital processing
- Effects: Electronic glitches, data stream sounds
- Reverb: Digital delay, processed echo
- Special: Tech-assisted combat with electronic overlay
```

##### 🕵️ 정보요원 (Jeongbo Yowon) - Intelligence Operative

```
Audio Signature: 정신적 압박 (Psychological Pressure)
- Impact Style: Calculated, intimidating
- Frequency: Low-mid psychological impact (200-600Hz)
- Effects: Subtle psychological tension, mind games
- Reverb: Interrogation room echo
- Special: Pressure-point strikes with psychological undertones
```

##### ⚡ 조직폭력배 (Jojik Pokryeokbae) - Organized Crime

```
Audio Signature: 거리의 잔혹성 (Street Brutality)
- Impact Style: Brutal, improvised, desperate
- Frequency: Harsh, gritty (100-500Hz + distortion)
- Effects: Environmental usage, desperation sounds
- Reverb: Alley echo, urban harshness
- Special: Dirty fighting with improvised weapon integration
```

### 🎯 Vital Point Audio Design (Vital Point Sound Design)

#### 70 Vital Points Sound Categories

```
신경계 타격 (Nervous System Strikes):
- Base Sound: Electric zap + nerve disruption
- Frequency: 800-2000Hz sharp spike
- Duration: 0.1-0.3s with fade
- Effect: Temporary paralysis audio cue

골격 파괴 (Skeletal Destruction):
- Base Sound: Deep bone crack + structural failure
- Frequency: 100-400Hz base + 1-3kHz crack
- Duration: 0.15-0.4s
- Effect: Fracture realism with cyberpunk enhancement

혈류 차단 (Blood Flow Restriction):
- Base Sound: Circulation cut + pressure point
- Frequency: Low pulsing 60-200Hz + high pressure release
- Duration: 0.2-0.5s with pulse rhythm
- Effect: Vascular disruption with heart rate change

호흡 차단 (Respiratory Disruption):
- Base Sound: Airway compression + breath interruption
- Frequency: Mid-range compression 300-800Hz
- Duration: Variable with breathing pattern
- Effect: Realistic respiratory distress
```

### 🌃 Underground Dojang Environmental Audio

#### Spatial Audio Design

```
지하 공간 울림 (Underground Space Echo):
- Reverb Time: 1.2-2.5 seconds
- Early Reflections: Concrete/stone surfaces
- Late Reverb: Deep underground cavern feel
- Frequency Response: Enhanced low-end (40-200Hz)

네온 전기 웅웅거림 (Neon Electrical Hum):
- Base Frequency: 60Hz electrical + harmonics
- Modulation: Subtle flickering effect
- Spatial: Positioned lighting ambience
- Volume: Very low, atmospheric (5-10% mix)

혈흔의 메아리 (Blood Stain Echoes):
- Reverb Character: Haunting, metallic resonance
- Frequency: Enhanced mid-range reflection
- Decay: Slower, more ominous
- Psychology: Subtle reminder of previous battles
```

## Conversion Commands (Enhanced for Dark Aesthetics)

### High-Quality Combat SFX Conversion

```bash
# Traditional Korean + Cyberpunk fusion conversion
ffmpeg -i input.wav \
  -c:a libopus -b:a 96k \
  -af "acompressor=threshold=0.089:ratio=9:attack=0.003:release=0.03,\
       highpass=f=80,lowpass=f=8000,\
       aecho=0.8:0.9:100:0.1" \
  output.webm

# Bone impact realism enhancement
ffmpeg -i bone_impact.wav \
  -c:a libopus -b:a 128k \
  -af "acompressor=threshold=0.1:ratio=4:attack=0.001:release=0.01,\
       bass=g=3:f=200:w=100,\
       treble=g=2:f=2000:w=500" \
  bone_enhanced.webm

# Underground reverb processing
ffmpeg -i dry_audio.wav \
  -c:a libopus -b:a 96k \
  -af "aecho=0.6:0.4:1000:0.3,\
       aecho=0.4:0.2:2000:0.1,\
       highpass=f=60,\
       volume=0.8" \
  underground_processed.webm
```

### Traditional Instrument + Cyber Enhancement

```bash
# Gayageum cyberpunk enhancement
ffmpeg -i gayageum_traditional.wav \
  -c:a libopus -b:a 128k \
  -af "chorus=0.5:0.9:50:0.4:0.25:2,\
       aecho=0.6:0.4:800:0.15,\
       treble=g=1.5:f=4000:w=1000" \
  gayageum_cyber.webm

# Buk war drums industrial processing
ffmpeg -i buk_drums.wav \
  -c:a libopus -b:a 128k \
  -af "acompressor=threshold=0.125:ratio=6:attack=0.003:release=0.05,\
       bass=g=4:f=100:w=50,\
       aecho=0.7:0.3:150:0.2" \
  buk_industrial.webm
```

## Testing Asset Loading

To verify assets are loading correctly with enhanced combat feedback:

```javascript
// Test Korean martial arts audio integration
const testCombatAudio = async () => {
  // Test basic combat sounds
  const attackAudio = new Audio(
    "./assets/audio/sfx/combat/attack_critical.webm"
  );
  await attackAudio
    .play()
    .then(() => console.log("✅ Critical attack loaded"))
    .catch((e) => console.log("❌ Attack failed:", e));

  // Test archetype-specific sounds
  const musaAudio = new Audio("./assets/audio/sfx/archetype/musa_special.webm");
  await musaAudio
    .play()
    .then(() => console.log("✅ Musa archetype loaded"))
    .catch((e) => console.log("❌ Musa failed:", e));

  // Test trigram philosophy sounds
  const geonAudio = new Audio("./assets/audio/sfx/trigram/geon_heaven.webm");
  await geonAudio
    .play()
    .then(() => console.log("✅ Geon trigram loaded"))
    .catch((e) => console.log("❌ Geon failed:", e));

  // Test vital point precision
  const nerveAudio = new Audio(
    "./assets/audio/sfx/vital_points/nerve_strike.webm"
  );
  await nerveAudio
    .play()
    .then(() => console.log("✅ Nerve strike loaded"))
    .catch((e) => console.log("❌ Nerve failed:", e));
};

// Test underground atmosphere
const testAtmosphere = async () => {
  const undergroundAudio = new Audio(
    "./assets/audio/music/underground_theme.webm"
  );
  await undergroundAudio
    .play()
    .then(() => console.log("✅ Underground theme loaded"))
    .catch((e) => console.log("❌ Underground failed:", e));
};
```

## 🎯 Enhanced Immediate Actions Required

1. **Run the updated asset processing script with Korean martial arts styling**
2. **Implement archetype-specific audio generation** for each fighter type
3. **Create trigram philosophy sound mapping** for ☰☱☲☳☴☵☶☷ stances
4. **Verify vital point precision audio feedback** for 70 target points
5. **Test underground dojang atmospheric integration**
6. **Enable enhanced fallback mode** with Korean traditional + cyberpunk fusion

The enhanced audio system should create an immersive **Underground Dojang** experience that combines authentic Korean martial arts traditions with dark cyberpunk aesthetics, providing realistic combat feedback across 5 distinct fighter archetypes and 8 trigram philosophies.

## 🌑 Dark Enhancement Priority

1. **Critical Combat Audio** - Bone breaking, vital point strikes, archetype signatures
2. **Traditional Fusion** - Korean instruments with cyberpunk processing
3. **Underground Atmosphere** - Neon hum, blood echo, spatial depth
4. **Psychological Warfare** - Intimidation, pressure, mental dominance
5. **Perfect Strike Feedback** - Precise vital point audio confirmation

_"In darkness, hear the sound of the perfect strike"_


## Updated later versions 

[![Run TypeScript Check](https://img.shields.io/badge/npm%20run%20check-blue?logo=npm)](https://docs.npmjs.com/cli/v9/commands/npm-run-script#npm-run-check)

> **game-app\@0.2.5 check**
> `tsc -b`
> *Fix all TS errors before merging!*

---

## 📋 Audio Assets Specification (AudioManager Compatible)

This document specifies the **exact audio asset requirements** for the Black Trigram AudioManager system. All assets must be in WebM format with Opus codec for optimal compatibility.

---

### 🔴 Critical Issues Identified

1. **Missing Asset Files**: Some audio files return “Decoding audio data failed.”
2. **Null ID Errors**: Console logs show `null` IDs, indicating improper asset loading.
3. **Format Issues**: Some assets may not be in the correct WebM/Opus format.

---

## 🌑 Dark Cyberpunk Korean Martial Arts Audio Design

### 🕳️ Underground Dojang Atmosphere

All audio assets should embody the **Underground Dojang** aesthetic:

* **Neon Light Audio**: Electric hum + cyberpunk ambience
* **Blood Stain Echoes**: Reverb suggesting previous brutal training
* **Depth of Darkness**: Spatial audio creating underground feeling
* **Weight of Combat**: Heavy, realistic impact sounds

### 🇰🇷 Korean Traditional + Cyberpunk Fusion

* **Cyberpunk Gayageum**: Traditional Korean strings with electronic processing
* **Digital Buk Drums**: War drums with synthetic enhancement
* **Neon Kkwaenggwari**: Small gongs with futuristic resonance
* **Glitched Haegeum**: Korean fiddle with digital distortion

---

## 📋 Detailed Audio Asset Table

| Asset ID             | File Path                          | Type | Priority   | Size (KB) | Duration (s) | Frequency Range          | Description                                     | Korean Context                                |
| -------------------- | ---------------------------------- | ---- | ---------- | --------- | ------------ | ------------------------ | ----------------------------------------------- | --------------------------------------------- |
| **menu\_hover**      | `/sfx/menu/menu_hover.webm`        | SFX  | ✅ CRITICAL | 15–25     | 0.1–0.2      | 600–1200 Hz              | Subtle neon tone on interface hover             | Soft wood block tap – traditional percussion  |
| **menu\_select**     | `/sfx/menu/menu_select.webm`       | SFX  | ✅ CRITICAL | 20–35     | 0.15–0.3     | 800–1600 Hz              | Decisive cyber click confirmation               | Bamboo flute note – selection harmony         |
| **menu\_back**       | `/sfx/menu/menu_back.webm`         | SFX  | ✅ CRITICAL | 18–30     | 0.1–0.25     | 400–800 Hz               | Shadow effect return navigation                 | Soft gong resonance – return to state         |
| **attack\_light**    | `/sfx/combat/attack_light.webm`    | SFX  | ✅ CRITICAL | 25–40     | 0.08–0.15    | 200–600 Hz               | Quick air cutting + neon glow                   | Swift precision strike – light technique      |
| **attack\_medium**   | `/sfx/combat/attack_medium.webm`   | SFX  | ✅ CRITICAL | 30–50     | 0.1–0.2      | 150–500 Hz               | Focused energy release                          | Concentrated ki energy – medium power         |
| **attack\_heavy**    | `/sfx/combat/attack_heavy.webm`    | SFX  | ✅ CRITICAL | 40–65     | 0.15–0.3     | 100–400 Hz               | Thunder-like shockwave                          | Devastating force – heavy technique           |
| **attack\_critical** | `/sfx/combat/attack_critical.webm` | SFX  | ✅ CRITICAL | 50–80     | 0.2–0.4      | 80–350 Hz + harmonics    | Perfect vital point strike + electronic harmony | Ultimate precision – critical vital strike    |
| **hit\_light**       | `/sfx/hits/hit_light.webm`         | SFX  | ✅ CRITICAL | 20–35     | 0.05–0.12    | 300–700 Hz               | Light contact + digital pulse                   | Glancing contact – minimal damage             |
| **hit\_medium**      | `/sfx/hits/hit_medium.webm`        | SFX  | ✅ CRITICAL | 30–45     | 0.1–0.18     | 200–600 Hz               | Solid impact + cyber echo                       | Effective strike – moderate damage            |
| **hit\_heavy**       | `/sfx/hits/hit_heavy.webm`         | SFX  | ✅ CRITICAL | 40–60     | 0.15–0.25    | 150–500 Hz               | Destructive blow + electronic shock             | Devastating impact – severe damage            |
| **hit\_critical**    | `/sfx/hits/hit_critical.webm`      | SFX  | ✅ CRITICAL | 50–75     | 0.2–0.35     | 100–400 Hz + neural freq | Vital point strike + nerve destruction          | Perfect vital point contact – critical damage |
| **stance\_change**   | `/sfx/movement/stance_change.webm` | SFX  | ✅ CRITICAL | 25–40     | 0.2–0.4      | 400–1000 Hz              | Trigram transition + energy wave                | Eight trigram stance transformation           |
| **match\_start**     | `/sfx/match/match_start.webm`      | SFX  | ✅ CRITICAL | 60–100    | 0.8–1.5      | 150–800 Hz               | Temple bell + combat beginning                  | Sacred combat initiation ceremony             |

### Enhanced Combat Effects (High Priority)

| Asset ID                  | File Path                              | Type | Priority | Size (KB) | Duration (s) | Frequency Range        | Description                           | Korean Context                         |
| ------------------------- | -------------------------------------- | ---- | -------- | --------- | ------------ | ---------------------- | ------------------------------------- | -------------------------------------- |
| **attack\_punch\_light**  | `/sfx/combat/attack_punch_light.webm`  | SFX  | 🔧 HIGH  | 20–35     | 0.06–0.12    | 250–650 Hz             | Light punch impact + cyber echo       | Quick jab technique – precise striking |
| **attack\_punch\_medium** | `/sfx/combat/attack_punch_medium.webm` | SFX  | 🔧 HIGH  | 30–50     | 0.1–0.18     | 200–550 Hz             | Medium punch shock + neon reverb      | Solid punch technique – focused power  |
| **attack\_special\_geon** | `/sfx/combat/attack_special_geon.webm` | SFX  | 🔧 HIGH  | 45–70     | 0.2–0.4      | 100–400 Hz + celestial | Geon trigram special + heavenly power | Heaven trigram ultimate technique      |
| **dodge**                 | `/sfx/combat/dodge.webm`               | SFX  | 🔧 HIGH  | 15–30     | 0.08–0.15    | 400–1200 Hz            | Shadow movement + air displacement    | Evasive shadow arts – defensive flow   |
| **block\_success**        | `/sfx/combat/block_success.webm`       | SFX  | 🔧 HIGH  | 25–40     | 0.1–0.2      | 200–600 Hz             | Solid defense + metal resonance       | Successful defensive technique         |
| **block\_break**          | `/sfx/combat/block_break.webm`         | SFX  | 🔧 HIGH  | 35–55     | 0.15–0.3     | 150–500 Hz             | Defense shattered + desperate crack   | Guard broken – defensive failure       |
| **perfect\_strike**       | `/sfx/combat/perfect_strike.webm`      | SFX  | 🔧 HIGH  | 60–90     | 0.3–0.5      | 100–1000 Hz + divine   | Flawless technique + sacred resonance | Perfect martial arts execution         |

### Archetype-Specific Audio (New System)

| Asset ID             | File Path                             | Type | Priority | Size (KB) | Duration (s) | Frequency Range         | Description                                      | Korean Context                 |
| -------------------- | ------------------------------------- | ---- | -------- | --------- | ------------ | ----------------------- | ------------------------------------------------ | ------------------------------ |
| **musa\_special**    | `/sfx/archetype/musa_special.webm`    | SFX  | 🔧 NEW   | 40–65     | 0.2–0.4      | 150–500 Hz + military   | Warrior exclusive technique + military precision | Traditional warrior discipline |
| **amsalja\_stealth** | `/sfx/archetype/amsalja_stealth.webm` | SFX  | 🔧 NEW   | 20–35     | 0.1–0.3      | 600–1500 Hz + whisper   | Assassin stealth + shadow whispers               | Silent shadow techniques       |
| **hacker\_tech**     | `/sfx/archetype/hacker_tech.webm`     | SFX  | 🔧 NEW   | 35–55     | 0.15–0.35    | 200–800 Hz + digital    | Hacker technology + digital interference         | Cyber-enhanced combat methods  |
| **jeongbo\_psych**   | `/sfx/archetype/jeongbo_psych.webm`   | SFX  | 🔧 NEW   | 30–50     | 0.2–0.4      | 100–400 Hz + subliminal | Intelligence operative psychological warfare     | Mental pressure techniques     |
| **jojik\_brutal**    | `/sfx/archetype/jojik_brutal.webm`    | SFX  | 🔧 NEW   | 45–70     | 0.15–0.3     | 80–350 Hz + harsh       | Organized crime brutality + street noise         | Underground survival brutality |

### Eight Trigram Philosophy Audio (New System)

| Asset ID          | File Path                        | Type | Priority | Size (KB) | Duration (s) | Frequency Range        | Description                                                | Korean Context                      |
| ----------------- | -------------------------------- | ---- | -------- | --------- | ------------ | ---------------------- | ---------------------------------------------------------- | ----------------------------------- |
| **geon\_heaven**  | `/sfx/trigram/geon_heaven.webm`  | SFX  | 🔧 NEW   | 50–80     | 0.3–0.5      | 100–400 Hz + celestial | ☰ Heaven trigram + heavenly force + bone destruction       | Direct bone-striking divine power   |
| **tae\_lake**     | `/sfx/trigram/tae_lake.webm`     | SFX  | 🔧 NEW   | 40–65     | 0.25–0.45    | 200–600 Hz + fluid     | ☱ Lake trigram + flowing manipulation + joint control      | Fluid joint manipulation techniques |
| **li\_fire**      | `/sfx/trigram/li_fire.webm`      | SFX  | 🔧 NEW   | 35–60     | 0.2–0.4      | 300–800 Hz + sharp     | ☲ Fire trigram + precision flame + nerve strikes           | Precise nerve-targeting fire        |
| **jin\_thunder**  | `/sfx/trigram/jin_thunder.webm`  | SFX  | 🔧 NEW   | 45–75     | 0.2–0.4      | 150–500 Hz + electric  | ☳ Thunder trigram + stunning shock + electrical disruption | Thunder stunning techniques         |
| **son\_wind**     | `/sfx/trigram/son_wind.webm`     | SFX  | 🔧 NEW   | 30–50     | 0.3–0.6      | 250–750 Hz + flowing   | ☴ Wind trigram + persistent flow + continuous pressure     | Continuous pressure techniques      |
| **gam\_water**    | `/sfx/trigram/gam_water.webm`    | SFX  | 🔧 NEW   | 35–55     | 0.25–0.5     | 180–550 Hz + adaptive  | ☵ Water trigram + adaptive flow + blood restriction        | Blood flow restriction methods      |
| **gan\_mountain** | `/sfx/trigram/gan_mountain.webm` | SFX  | 🔧 NEW   | 40–70     | 0.2–0.4      | 120–450 Hz + solid     | ☶ Mountain trigram + mountain defense + counterattack      | Defensive mountain techniques       |
| **gon\_earth**    | `/sfx/trigram/gon_earth.webm`    | SFX  | 🔧 NEW   | 45–75     | 0.3–0.5      | 100–400 Hz + grounding | ☷ Earth trigram + earth embrace + throwing techniques      | Ground-based throwing arts          |

### Vital Point System Audio (New System)

| Asset ID          | File Path                              | Type | Priority | Size (KB) | Duration (s) | Frequency Range        | Description                                      | Korean Context                 |
| ----------------- | -------------------------------------- | ---- | -------- | --------- | ------------ | ---------------------- | ------------------------------------------------ | ------------------------------ |
| **nerve\_strike** | `/sfx/vital_points/nerve_strike.webm`  | SFX  | 🔧 NEW   | 25–45     | 0.1–0.3      | 800–2000 Hz + electric | Nervous system strike + electrical paralysis     | Neural disruption techniques   |
| **bone\_break**   | `/sfx/vital_points/bone_break.webm`    | SFX  | 🔧 NEW   | 40–65     | 0.15–0.4     | 100–400 Hz + crack     | Bone fracture + structural destruction           | Skeletal destruction methods   |
| **blood\_flow**   | `/sfx/vital_points/blood_flow.webm`    | SFX  | 🔧 NEW   | 30–50     | 0.2–0.5      | 60–200 Hz + pulse      | Blood flow disruption + circulation interference | Vascular control techniques    |
| **consciousness** | `/sfx/vital_points/consciousness.webm` | SFX  | 🔧 NEW   | 35–60     | 0.2–0.6      | 100–300 Hz + fading    | Consciousness manipulation + mental shock        | Awareness disruption methods   |
| **respiratory**   | `/sfx/vital_points/respiratory.webm`   | SFX  | 🔧 NEW   | 25–45     | 0.15–0.4     | 300–800 Hz + breath    | Breathing disruption + airway pressure           | Respiratory control techniques |

### Ki Energy System Audio (New System)

| Asset ID          | File Path                          | Type | Priority | Size (KB) | Duration (s) | Frequency Range       | Description                                   | Korean Context             |
| ----------------- | ---------------------------------- | ---- | -------- | --------- | ------------ | --------------------- | --------------------------------------------- | -------------------------- |
| **ki\_charge**    | `/sfx/ki_energy/ki_charge.webm`    | SFX  | 🔧 NEW   | 40–70     | 0.5–2.0      | 100–500 Hz + harmonic | Internal energy accumulation + electronic hum | Traditional ki cultivation |
| **ki\_release**   | `/sfx/ki_energy/ki_release.webm`   | SFX  | 🔧 NEW   | 50–80     | 0.2–0.5      | 150–600 Hz + burst    | Explosive energy release + cyber pulse        | Ki energy burst techniques |
| **energy\_pulse** | `/sfx/ki_energy/energy_pulse.webm` | SFX  | 🔧 NEW   | 30–50     | 0.15–0.3     | 200–700 Hz + rhythmic | Rhythmic energy wave + trigram power          | Eight trigram energy flow  |
| **ki\_depleted**  | `/sfx/ki_energy/ki_depleted.webm`  | SFX  | 🔧 NEW   | 25–40     | 0.2–0.4      | 80–300 Hz + declining | Energy depletion + electronic discharge       | Ki exhaustion state        |

### Environmental & Atmospheric Audio

| Asset ID               | File Path                                | Type | Priority    | Size (KB) | Duration (s) | Frequency Range       | Description                                  | Korean Context                 |
| ---------------------- | ---------------------------------------- | ---- | ----------- | --------- | ------------ | --------------------- | -------------------------------------------- | ------------------------------ |
| **underground\_echo**  | `/sfx/environment/underground_echo.webm` | AMB  | 🔧 NEW      | 60–100    | 2.0–5.0      | 40–200 Hz + reverb    | Underground space resonance + darkness depth | Hidden dojang atmosphere       |
| **neon\_hum**          | `/sfx/environment/neon_hum.webm`         | AMB  | 🔧 NEW      | 40–70     | 3.0–8.0      | 60 Hz + harmonics     | Neon electrical hum + cyberpunk ambience     | Futuristic lighting atmosphere |
| **blood\_stain\_echo** | `/sfx/environment/blood_stain_echo.webm` | AMB  | 🔧 NEW      | 50–80     | 2.0–4.0      | 100–400 Hz + haunting | Blood stain echoes + past battle memories    | Previous combat history        |
| **dojang\_ambience**   | `/sfx/environment/dojang_ambience.webm`  | AMB  | 🔧 OPTIONAL | 80–120    | 5.0–10.0     | 60–500 Hz + peaceful  | Peaceful dojang atmosphere + meditation      | Traditional training space     |

### Music Tracks (Background)

| Asset ID               | File Path                       | Type  | Priority   | Size (MB) | Duration (min) | Style                    | Description                                                    | Korean Context                |
| ---------------------- | ------------------------------- | ----- | ---------- | --------- | -------------- | ------------------------ | -------------------------------------------------------------- | ----------------------------- |
| **intro\_theme**       | `/music/intro_theme.webm`       | MUSIC | ✅ CRITICAL | 3–6       | 2–4            | Traditional + Electronic | Meditative Korean traditional + philosophical atmosphere       | Philosophy introduction music |
| **combat\_theme**      | `/music/combat_theme.webm`      | MUSIC | ✅ CRITICAL | 4–8       | 3–6            | Intense Rhythmic         | Intense rhythm + combat energy + traditional percussion        | Battle intensity soundtrack   |
| **underground\_theme** | `/music/underground_theme.webm` | MUSIC | 🔧 NEW     | 5–10      | 4–8            | Dark Ambient             | Underground dojang + darkness atmosphere + neon ambience       | Hidden training facility      |
| **cyberpunk\_fusion**  | `/music/cyberpunk_fusion.webm`  | MUSIC | 🔧 NEW     | 6–12      | 5–10           | Traditional + Cyber      | Korean traditional + cyberpunk fusion + electronic enhancement | Cultural-tech harmony         |

### Archetype Theme Music (New System)

| Asset ID            | File Path                                     | Type  | Priority | Size (MB) | Duration (min) | Style                  | Description                                                           | Korean Context              |
| ------------------- | --------------------------------------------- | ----- | -------- | --------- | -------------- | ---------------------- | --------------------------------------------------------------------- | --------------------------- |
| **musa\_warrior**   | `/music/archetype_themes/musa_warrior.webm`   | MUSIC | 🔧 NEW   | 4–8       | 3–6            | Military + Traditional | Traditional warrior + military honor + disciplined rhythm             | Military martial discipline |
| **amsalja\_shadow** | `/music/archetype_themes/amsalja_shadow.webm` | MUSIC | 🔧 NEW   | 3–6       | 2–5            | Dark + Minimal         | Shadow assassin + stealth melody + minimal instrumentation            | Silent shadow techniques    |
| **hacker\_cyber**   | `/music/archetype_themes/hacker_cyber.webm`   | MUSIC | 🔧 NEW   | 5–10      | 4–8            | Electronic + Digital   | Cyber warrior + digital beats + technological enhancement             | Information warfare sound   |
| **jeongbo\_intel**  | `/music/archetype_themes/jeongbo_intel.webm`  | MUSIC | 🔧 NEW   | 4–7       | 3–6            | Tension + Strategic    | Intelligence operative + strategic tension + psychological undertones | Mental warfare atmosphere   |
| **jojik\_street**   | `/music/archetype_themes/jojik_street.webm`   | MUSIC | 🔧 NEW   | 4–8       | 3–7            | Harsh + Urban          | Organized crime + street brutality + harsh urban sounds               | Underground survival music  |

---

## 🎯 Prompt Style Guide (Brutal / Gore Focus)

Use these guidelines when crafting ElevenLabs text prompts. Each prompt should be **300–400 characters** (including spaces) to achieve hyper-realistic, body-focused, brutal SFX.

### 1. Be Concise & Visceral

* 🎯 **Focus on the core action**—describe flesh, sinew, bone, and blood.
* Use 2–5 vivid nouns/verbs:

  * E.g., “bone-shatter,” “sinew tear,” “flesh collapse,” “blood spurt.”
* Keep under 400 characters so the model packs detail into a short clip.

### 2. Specify Anatomy & Material Texture

* 🍖 **Flesh**: “muscle fibers,” “fat,” “organ matter,” “cartilage.”
* 🦴 **Bone**: “femur snap,” “rib fracture,” “vertebra shear.”
* 💧 **Blood**: “gory gush,” “wet gurgle,” “arterial spray,” “coagulated drip.”
* ⚙️ **Enhancements**: “neon hiss,” “digital glitch,” “cyber echo.”

### 3. Indicate Spatial & Reverb Characteristics

* 🕳️ **Cavernous reverb**: “echo in a dark, underground chamber.”
* 🔊 **Tight space**: “minimal reverb, bone crack is immediate.”
* 🌌 **Ambient darkness**: “under neon flicker, faint drips echo.”

### 4. Layer Electronic/Cyberpunk Elements

* ⚡ **Digital distortion**: “sinewy tissues warp under neon glitch.”
* 🌀 **Whoosh/Hiss**: “flesh sizzles with a neon flame whoosh.”
* 🔊 **Synth Underlay**: “low electronic throb beneath wet crunch.”

### 5. Use Sequential Descriptors for Complex Events

* 🔄 Separate events with commas or “then”:

  * “Bone snaps, then flesh collapses,”
  * “Cartilage creaks followed by arterial spray.”

### 6. Set Duration & Prompt Influence

* ⏱️ **Duration**: 0.1–22 s (cost 40 credits/s if specified). If omitted, model auto-determines.
* 🎨 **Prompt Influence**:

  * **High** → literal interpretation (predictable).
  * **Low** → creative additions (unexpected gore accents).

---

## 📝 Prompt Examples (300–400 Chars Each)

Each row below maps **Asset ID** to a **Prompt Example** that matches the asset’s intended effect and brutal/gore style.

| Asset ID                  | Prompt Example                                                                                                                                                                                                                                                                                                                         |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **menu\_hover**           | “A damp, visceral squelch as a blade’s edge drags lightly over dripping muscle—faint skin-tearing friction under a neon glow. Subtle wet suction, sinewy tissue resistance, and a faint metallic echo as the gore slightly smears, evoking a sliced-finger hover over a pulsating, blood-sleek interface.”                             |
| **menu\_select**          | “A sudden, wet snap as a finger is pinched and crushed; sinew fibers rupture with a brief gory pop. Followed by a low, resonant bone-crack echo under digital distortion—like selecting a hue by slicing flesh. Emphasize dripping blood spatter, sinewy tension release, and neon-tinged distortion for a macabre menu confirmation.” |
| **menu\_back**            | “A muffled, damp thud as a blood-soaked palm slaps a neon-lit surface, compressing quivering flesh. Follow with a hollow, gurgling echo as air escapes torn lungs—like retreating from a gore-soaked interface. Underlying reverb suggests viscera sloshing inside a cramped, shadowy corridor.”                                       |
| **attack\_light**         | “Quick, wet swish of skin slicing open—thin flesh yielding to a razor’s edge. A faint, damp click as sinew parts followed by a soft, gory whisper of tissue separating. Add a brief neon hiss and distant bone-grain resonance for a light but visceral flesh-cutting attack.”                                                         |
| **attack\_medium**        | “Focused mid-range flesh tear: sinew fibers snap with a damp, ripping sound, followed by a throaty gurgle as blood spurts. Underneath, a resonant bone-brush echo and subtle cyber creep modulation. Evoke concentrated gut punch cutting muscle and fraying tissue, layered with cold, neon shimmer.”                                 |
| **attack\_heavy**         | “Thunderous bone-shatter followed by viscous flesh collapse. A deep, cavernous crack as femur or rib snaps, bursting sinew and organ matter with a wet, explosive gush. Underneath, low electronic distortion and cavern echo convey brutal force in a subterranean, neon-lit dojang.”                                                 |
| **attack\_critical**      | “Perfect vital-point impact: a deep, sickening bone-snap with sinew tearing, followed by a high-pitched neural pop and gory flesh splatter. Blood sprays in a wet crescendo, then fades into haunting, cybernetic resonance—divine yet gruesome precision strike with visceral, echoing reverb.”                                       |
| **hit\_light**            | “Glancing flesh-tap: soft skin squelch and subtle, damp tissue shift, as a blade grazes muscle. A gentle, wet suction noise of torn membrane and a faint digital pulse echo. Conveys minimal damage but wet, realistic tissue contact.”                                                                                                |
| **hit\_medium**           | “Solid mid-impact: damp, ripping sinew as a blade meets flesh and subsurface fat. A guttural gurgle sprays blood mist, followed by a crisp, electronic echo. Underneath, a low-frequency thump as muscle mass compresses and rebounds.”                                                                                                |
| **hit\_heavy**            | “Devastating flesh crush: massive muscle fiber rupture and wet, pulpy gurgle as organs collide. A deep, muffled bone crack underscores the blow, layered with sickening squelch and neon distortion. Blood floods with each pulse, conveying severe internal trauma.”                                                                  |
| **hit\_critical**         | “Vital point strike: explosive bone-fracture snap with sinew ripping, followed by a high-pitched nerve zing and wet, throaty gurgle. Blood spurts violently, echoing in a dark, cavernous reverb. Emphasize neural feedback and visceral gore.”                                                                                        |
| **stance\_change**        | “Grotesque sinew stretch and pop as a joint dislocates, shifting body weight with wet cartilage grinding. A deep, fleshy creak under neon shimmer, followed by a damp snapping of tendons as posture transforms violently.”                                                                                                            |
| **match\_start**          | “Ominous temple bell toll transforms into dripping blood echo—wet plop of coagulated gore hitting stone. Low, cavernous floor stomp as sinew compresses under weight, with rhythmic organ gurgle beneath a cyberpunk hum, evoking the start of a brutal, subterranean combat ceremony.”                                                |
| **attack\_punch\_light**  | “Quick, wet knuckle-to-muscle collision: damp flesh fibers tear with a sharp snap, followed by a low gurgle as blood seeps. Add a faint neon crackle and electronic flutter to highlight the sinewy texture of a light, precise punch.”                                                                                                |
| **attack\_punch\_medium** | “Mid-force fist crush: bone-metacarpal crunch and sinew rupture, spraying warm blood droplets. A resonant, wet thud as muscle compresses and rebounds, layered with neon reverb. Convey solid impact with visceral tissue feedback.”                                                                                                   |
| **attack\_special\_geon** | “Heavenly Geon strike: thunderous femur shatter followed by torrential flesh collapse. A massive, wet bone snap bursts sinew and organ matter into a gory spray. Underneath, celestial electronic hum rises, then cascades into a brutal, echoing bone grind.”                                                                         |
| **dodge**                 | “Wet, gelatinous slide of muscle as body twists: sinew strains with a damp squelch, cartilage creaks under pressure. A faint neon whoosh overlays a subtle gory gurgle as viscera shifts, conveying a desperate, fluid dodge in a blood-slick dojang.”                                                                                 |
| **block\_success**        | “Heavy bone-reinforced forearm blocks a blade: thick sinew compresses with a damp, fibrous squelch. A resonant, wet crack as bone absorbs force, then metallic echo and neon shimmer. Blood seeps from crushed flesh beneath a protective guard.”                                                                                      |
| **block\_break**          | “Desperate guard shatters: sickening bone splinter snap as sinew tears and blood spurts. A deep, wet crash echoes through an underground tomb. Follow with a frantic neon glitch as fragmented cartilage and shattered wrist collapse under relentless force.”                                                                         |
| **perfect\_strike**       | “Flawless vital-point blow: clean, divine bone-snap synced with neural pop, followed by torrential gore spurt and wet, pulpy gurgle. Blood erupts in a savage surge, echoing in a dark, cavernous dojang. Sacred resonance meets gruesome gore in one immaculate, brutal audio moment.”                                                |
| **musa\_special**         | “Musa’s Geon technique: resonant war drum rolls mutate into bone-shattering crush. A massive femur snap alongside sinew rupture, blood geysering in slow motion. Under neon war-drum pulses, wet cartilage grind and guttural gurgle evoke disciplined, brutal warrior artistry.”                                                      |
| **amsalja\_stealth**      | “Assassin’s silent kill: near-silent tendon snap and cartilage crack as blade pierces artery. A whisper of wet, pulpy slide of flesh, followed by a faint blood gurgle. Ambient neon flicker and muffled heartbeat underscore lethal, stealthy brutality in a shadowed corridor.”                                                      |
| **hacker\_tech**          | “Cyber-enhanced strike: neon glitch cascades as bone fragments grind with wet, mechanical squelch. Flesh rips digitally, sending a wet, spastic gurgle into static. Underneath, data stream hum morphs into a sinewy, pulsating blood-drip rhythm, merging technology with gore.”                                                      |
| **jeongbo\_psych**        | “Psychological pressure: subtle cartilage creak as fingers press into pressure point. A wet, high-pitched nerve pop followed by throaty, viscous gurgle as brain fluid oozes. Under digital hum, heartbeat slows, then accelerates in panic, blending mental torment with real-time gore.”                                             |
| **jojik\_brutal**         | “Street brute assault: bone-metacarpal snap under dirty knuckles, sinew shredding with each punch. A wet, pulpy gurgle of organs colliding with ribs, followed by ragged, neon-tinged reverb. Concrete rumble under splattering blood evokes vicious, improvised brutality in a dark alley.”                                           |
| **geon\_heaven**          | “☰ Heaven trigram: divine femur-crushing blow—bone shards pulverize sinew in a wet, thunderous fragment. Blood erupts upward, echoing in a cavernous, neon-lit void. Under celestial hum, resonance collapses into visceral gore, embodying direct, bone-striking divine power.”                                                       |
| **tae\_lake**             | “☱ Lake trigram: flowing joint lock twists elbow with damp, cartilage-grinding pop. A wet, sinewy squelch as tendons snap, blood spills like a crimson cascade. Echoing, fluid neon ripples underscore the rhythmic joint destruction and endless flow of gore.”                                                                       |
| **li\_fire**              | “☲ Fire trigram: rapid, nerve-incinerating strike ignites flesh—sizzling sinew crackles like burning muscle. A wet, high-pitched pop as nerve endings fry, followed by dripping blood hiss and scorched tissue slide under a neon flame whoosh.”                                                                                       |
| **jin\_thunder**          | “☳ Thunder trigram: jagged bone-crusher—wet, crackling blast of sinew splitting under electric shock. A torrential blood-splatter roar follows, drenched in neon-tinged distortion. Echoes like distant thunder reverberate through a gore-soaked cavern.”                                                                             |
| **son\_wind**             | “☴ Wind trigram: relentless chest compression—lungs squelch and rupture with a wet, gurgling gasp. Blood-filled breath scatters in a high-frequency hiss, then drifts into a low, echoing whoosh. Under neon currents, continuous pressure yields a morbid wind of gore.”                                                              |
| **gam\_water**            | “☵ Water trigram: crushing vascular lock—arteries collapse in a pulsing, low-frequency throb. Wet, sinewy gush of blood floods with each heartbeat. Echoing neon drip and undercurrent hum evoke adaptive flow of gore, like drowning in your own crimson tide.”                                                                       |
| **gan\_mountain**         | “☶ Mountain trigram: brutal knee-cap smash—patella shatters with a moist, bone-fragments crunch. A deep, pulpy gurgle as sinew rips and blood explodes outward. Under echoing neon boulder echo, conveys solid, unmoving defense collapsing into gore.”                                                                                |
| **gon\_earth**            | “☷ Earth trigram: ground-slam throw—spine compresses into pelvis, vertebrae shear with damp, gritty crack. A massive, wet gurgle of organs sloshing and sinew ripping as body hits stone. Neon vibration and subterranean echo emphasize grounded, earth-embracing throwing technique drowning in gore.”                               |
| **nerve\_strike**         | “Electric zap jolts nerve center—high-pitched, wet pop as neural tissue bursts. A surge of viscous cerebrospinal fluid oozes with a throaty gurgle, followed by a synthetic, pulsing buzz. Blood and neural fragments scatter under neon-tinged sizzle, mimicking instant paralysis.”                                                  |
| **bone\_break**           | “Deep bone-fracture roar: femur or rib snaps under brutal force, sinew and marrow splatter with a wet, crunchy collapse. A low-frequency, pulpy gurgle of flesh and organ matter floods beneath a neon resonance. Echoes of crunching bones and dripping blood create a gruesome, relentless fracture.”                                |
| **blood\_flow**           | “Artery rupture: high-pressure blood gushes with a rhythmic, pulsing squelch. A low, wet throb as vessel walls collapse and sinew tears, followed by continuous, throbbing gurgle of pooling blood. Neon-tinged undercurrent hum evokes circulatory breakdown in slow-motion gore.”                                                    |
| **consciousness**         | “Skull-crushing brain-impact: wet, gory smash as bone fragments tear brain tissue. A deep, viscous gurgle of grey matter and blood flooding skull cracks, followed by muted, echoing drip in a neon-lit void. Add a high-pitched neural sizzle as consciousness fades into a dark, dripping abyss.”                                    |
| **respiratory**           | “Airway compression: trachea snaps with a damp, cracking thud, followed by wet, frantic gurgle of ruptured lungs. A distressed, blood-filled gasp and sputter echo in a dark, neon-shrouded chamber. Underlying low-frequency throb mimics oxygen depletion and gore-laden breathing collapse.”                                        |
| **ki\_charge**            | “Internal energy build-up: low, pulsing humming as veins bulge and sinew tense under neon glow. A wet, subtle squelch as blood rushes, organs compressing. A deep, electronic throb layered with flesh-stretch creaks, evoking visceral ki accumulation in a gore-soaked vessel.”                                                      |
| **ki\_release**           | “Hexagonal energy burst: sinew rips and bone crushes as stored ki explodes—wet, thunderous gurgle of flesh and organs expelling outward. Under neon pulse, a sharp, guttural roar of detached tissues and ripping sinew conveys savage, cathartic release of gore-infused power.”                                                      |
| **energy\_pulse**         | “Rhythmic fist-to-flesh pulses: each strike tears sinew with a damp, tearing snap and blood splurts. A low, pulpy gurgle follows every hit, layered with neon-tinged electronic hiccup. Continuous cycle of gore-driven energy flow, echoing in a damp, cavernous resonance.”                                                          |
| **ki\_depleted**          | “Energy collapse: sinew slackens with a wet, hollow squelch as muscles deflate. Blood recedes with a low, pulpy drip echo, organs settling. A faint neon fizz and faint rumble convey drained ki and draining life force in a gore-laden hush.”                                                                                        |
| **underground\_echo**     | “Deep cavern reverb of dripping blood: water-tainted droplets fall into dark pools with a wet, hollow pop. A low, resonant rumble as distant sinew thuds echo in the abyss. Under neon flicker, ambient gurgles and faint flesh-slide hints evoke the oppressive weight of a gore-soaked subterranean dojang.”                         |
| **neon\_hum**             | “Constant, low neon hum vibrates through damp walls: faint electrical buzz pulsating at 60 Hz. Sporadic, wet drips of blood hit concrete, emitting rapid pops. Underlying, distant sinew-tear echoes and organ squelches underscore eerie, gore-infused cyberpunk ambience.”                                                           |
| **blood\_stain\_echo**    | “Haunting metallic echo of coagulated blood splattering on stone: each drop hits with a wet, gory pop followed by elongated reverb. Underneath, faint sinew-slide squelch as torn flesh drips onto floor. Neon flicker accentuates sinister, blood-soaked memory of past brutality.”                                                   |
| **dojang\_ambience**      | “Cavernous, murky hush of an abandoned dojang: distant drips of pus and blood pooling with soft, wet pops. Faint rustle of decaying flesh shifting under neon shafts, accompanied by slow, gurgling echoes and subterranean wind gusts through cracks—an atmosphere drenched in gore and forgotten violence.”                          |
| **intro\_theme**          | “Meditative fusion begins with distant gayageum strings, warped with subtle digital distortion. Underneath, a slow, wet throb of dripping blood and sinew-stretch pulses. As traditional melody evolves, low, muffled gurgles and bone-fragments clatter, merging philosophical calm with grim, gore-tinged tension.”                  |
| **combat\_theme**         | “Intense rhythmic drumming melds with crushing bone-snaps and sinew tears; each beat triggers a wet gurgle and echoing organ collapse. Under neon pulses, harsh guitar riff slashes through, punctuating gore-splattered onslaught. Evoke brutal martial energy in a relentless, gore-infused combat soundtrack.”                      |
| **underground\_theme**    | “Dark ambient pad swells with subterranean reverb, mingling with distant, wet dripping and flesh-slide squelches. A low, pulpy bass throb mimics heartbeats in a blood-filled cavern. Electronic glitches sporadically puncture the haze, weaving a sinister, gore-laden atmosphere beneath roaring neon echoes.”                      |
| **cyberpunk\_fusion**     | “Kkwaenggwari gongs ring under heavy distortion, merging with wet, squelching sinew rips and neon glitch hits. Buk drum warbeat pulses as bone fragments crunch in rhythm, layered with spectral haegeum bleats twisted in digital feedback. The result is a cyber-Korean fusion bathed in gore and neon noir tension.”                |
| **musa\_warrior**         | “Martial drum cadence builds, intercut with bone-smash hits and sinew tears echoing in neon gloom. Gayageum strings warp into digital distortion as wet, pulpy gurgles punctuate each measure. The theme fuses disciplined warrior honor with visceral, gore-soaked intensity under an underground sky.”                               |
| **amsalja\_shadow**       | “Sparse, eerie atonal strings bleed into near-silence, then crack as cartilage snaps with a wet, sharp pop. Neon glitch whispers flutter over a distant, muffled heartbeat and sinew-slide squelch. Minimal instrumentation highlights the assassin’s lethal, gore-dripping precision in shadowy corridors.”                           |
| **hacker\_cyber**         | “Digital synth pulses fracture into glitch-laden bone-crush samples—wet, crunchy snaps layered with static hiss. Under neon flicker, sinewy tissue rips modulate to a rhythmic, cybernetic beat. The track evokes tech-augmented brutality in a machine-driven, gore-soaked soundscape.”                                               |
| **jeongbo\_intel**        | “Tense, low drone underpins subtle cartilage-crack taps; each resonance echoes a damp, brain-matter gurgle. Distorted haegeum motif warps into sinister frequency sweeps as blood-filled breath hisses and organ-slosh pulses layer beneath a clinical, neon-lit interrogation room vibe.”                                             |
| **jojik\_street**         | “Harsh, distorted guitar riff backed by gritty, wet bone-snap loops and dripping sinew squelches. Concrete rumble of blood splatter under neon streetlights, punctuated by ragged, gory gurgles. The theme channels raw urban brutality, blending street violence with underground gore aesthetics.”                                   |

---

## 🎵 Enhanced Audio Design Specifications

### Format Specifications (Updated for Dark Aesthetics)

* **Container**: WebM
* **Audio Codec**: Opus (preferred) or Vorbis
* **Sample Rate**: 48 kHz (recommended) or 44.1 kHz
* **Bit Rate**:

  * SFX: 64–96 kbps (higher for bone impact realism)
  * Music: 128–160 kbps (higher for traditional instrument richness)
  * Ambient: 96–128 kbps (for underground atmosphere depth)
* **Channels**:

  * SFX: Mono (precise positioning) / Stereo (environmental)
  * Music: Stereo (full traditional + cyberpunk soundscape)
  * Combat: Mono (accurate targeting feedback)

### 🌑 Dark Combat Audio Styling Guidelines

#### Bone Impact Realism (골절 현실성)

```
Light Impact (경미한 충격):
- Frequency: 200–400 Hz base, 2–4 kHz crack
- Duration: 0.05–0.1 s
- Reverb: Minimal, tight space
- Effect: Sharp crack + slight electronic pulse

Medium Impact (중간 충격):
- Frequency: 150–300 Hz base, 1.5–3 kHz crack
- Duration: 0.1–0.15 s
- Reverb: Underground echo
- Effect: Solid impact + cyberpunk resonance

Heavy Impact (심각한 충격):
- Frequency: 100–250 Hz base, 1–2 kHz crack
- Duration: 0.15–0.25 s
- Reverb: Deep underground space
- Effect: Devastating break + electronic distortion

Critical/Vital Impact (급소 치명타):
- Frequency: 80–200 Hz base, 0.8–1.5 kHz crack
- Duration: 0.2–0.4 s
- Reverb: Haunting underground echo
- Effect: Perfect strike + divine/electronic harmony
```

#### Traditional Korean + Cyberpunk Fusion

```
가야금 (Gayageum) Enhancement:
- Base: Traditional plucked string resonance
- Enhancement: Subtle digital reverb + neon glow effect
- Processing: Light chorus + cyber echo
- Use: Menu navigation, stance transitions

북 (Buk) War Drums:
- Base: Deep traditional Korean percussion
- Enhancement: Electronic sub-bass + digital compression
- Processing: Industrial reverb + cyber punch
- Use: Combat intensity, match start/end

꽹과리 (Kkwaenggwari) Gongs:
- Base: Bright metallic traditional sound
- Enhancement: Synthetic harmonics + neon shimmer
- Processing: Futuristic delay + spatial effect
- Use: Critical hits, perfect techniques

해금 (Haegeum) Fiddle:
- Base: Traditional Korean string instrument
- Enhancement: Digital glitch + cyberpunk distortion
- Processing: Filtered sweep + electronic modulation
- Use: Atmospheric tension, psychological pressure
```

#### Archetype-Specific Audio Design

##### 🏯 무사 (Musa) – Traditional Warrior

```
Audio Signature: 군사적 절도 (Military Precision)
- Impact Style: Clean, powerful, honorable
- Frequency: Mid-range dominance (300–800 Hz)
- Effects: Military drum backing, disciplined strikes
- Reverb: Formal dojang acoustics
- Special: Honor-bound technique sounds with traditional backing
```

##### 🥷 암살자 (Amsalja) – Shadow Assassin

```
Audio Signature: 그림자 속삭임 (Shadow Whispers)
- Impact Style: Silent, precise, deadly
- Frequency: Higher precision (600–1200 Hz)
- Effects: Minimal audio, stealth enhancement
- Reverb: Absorbed, muffled, secretive
- Special: Near-silent techniques with sudden sharp impacts
```

##### 💻 해커 (Hacker) – Cyber Warrior

```
Audio Signature: 디지털 간섭 (Digital Interference)
- Impact Style: Tech-enhanced, analytical
- Frequency: Full spectrum with digital processing
- Effects: Electronic glitches, data stream sounds
- Reverb: Digital delay, processed echo
- Special: Tech-assisted combat with electronic overlay
```

##### 🕵️ 정보요원 (Jeongbo Yowon) – Intelligence Operative

```
Audio Signature: 정신적 압박 (Psychological Pressure)
- Impact Style: Calculated, intimidating
- Frequency: Low-mid psychological impact (200–600 Hz)
- Effects: Subtle psychological tension, mind games
- Reverb: Interrogation room echo
- Special: Pressure-point strikes with psychological undertones
```

##### ⚡ 조직폭력배 (Jojik Pokryeokbae) – Organized Crime

```
Audio Signature: 거리의 잔혹성 (Street Brutality)
- Impact Style: Brutal, improvised, desperate
- Frequency: Harsh, gritty (100–500 Hz + distortion)
- Effects: Environmental usage, desperation sounds
- Reverb: Alley echo, urban harshness
- Special: Dirty fighting with improvised weapon integration
```

### 🎯 Vital Point Audio Design (Vital Point Sound Design)

#### 70 Vital Points Sound Categories

```
신경계 타격 (Nervous System Strikes):
- Base Sound: Electric zap + nerve disruption
- Frequency: 800–2000 Hz sharp spike
- Duration: 0.1–0.3 s with fade
- Effect: Temporary paralysis audio cue

골격 파괴 (Skeletal Destruction):
- Base Sound: Deep bone crack + structural failure
- Frequency: 100–400 Hz base + 1–3 kHz crack
- Duration: 0.15–0.4 s
- Effect: Fracture realism with cyberpunk enhancement

혈류 차단 (Blood Flow Restriction):
- Base Sound: Circulation cut + pressure point
- Frequency: Low pulsing 60–200 Hz + high pressure release
- Duration: 0.2–0.5 s with pulse rhythm
- Effect: Vascular disruption with heart rate change

호흡 차단 (Respiratory Disruption):
- Base Sound: Airway compression + breath interruption
- Frequency: Mid-range compression 300–800 Hz
- Duration: Variable with breathing pattern
- Effect: Realistic respiratory distress
```

### 🌃 Underground Dojang Environmental Audio

#### Spatial Audio Design

```
지하 공간 울림 (Underground Space Echo):
- Reverb Time: 1.2–2.5 s
- Early Reflections: Concrete/stone surfaces
- Late Reverb: Deep underground cavern feel
- Frequency Response: Enhanced low-end (40–200 Hz)

네온 전기 웅웅거림 (Neon Electrical Hum):
- Base Frequency: 60 Hz electrical + harmonics
- Modulation: Subtle flickering effect
- Spatial: Positioned lighting ambience
- Volume: Very low, atmospheric (5–10% mix)

혈흔의 메아리 (Blood Stain Echoes):
- Reverb Character: Haunting, metallic resonance
- Frequency: Enhanced mid-range reflection
- Decay: Slower, more ominous
- Psychology: Subtle reminder of previous battles
```

---

## ⚙️ Conversion Commands (Enhanced for Dark Aesthetics)

### High-Quality Combat SFX Conversion

```bash
# Traditional Korean + Cyberpunk fusion conversion
ffmpeg -i input.wav \
  -c:a libopus -b:a 96k \
  -af "acompressor=threshold=0.089:ratio=9:attack=0.003:release=0.03,\
       highpass=f=80,lowpass=f=8000,\
       aecho=0.8:0.9:100:0.1" \
  output.webm

# Bone impact realism enhancement
ffmpeg -i bone_impact.wav \
  -c:a libopus -b:a 128k \
  -af "acompressor=threshold=0.1:ratio=4:attack=0.001:release=0.01,\
       bass=g=3:f=200:w=100,\
       treble=g=2:f=2000:w=500" \
  bone_enhanced.webm

# Underground reverb processing
ffmpeg -i dry_audio.wav \
  -c:a libopus -b:a 96k \
  -af "aecho=0.6:0.4:1000:0.3,\
       aecho=0.4:0.2:2000:0.1,\
       highpass=f=60,\
       volume=0.8" \
  underground_processed.webm
```

### Traditional Instrument + Cyber Enhancement

```bash
# Gayageum cyberpunk enhancement
ffmpeg -i gayageum_traditional.wav \
  -c:a libopus -b:a 128k \
  -af "chorus=0.5:0.9:50:0.4:0.25:2,\
       aecho=0.6:0.4:800:0.15,\
       treble=g=1.5:f=4000:w=1000" \
  gayageum_cyber.webm

# Buk war drums industrial processing
ffmpeg -i buk_drums.wav \
  -c:a libopus -b:a 128k \
  -af "acompressor=threshold=0.125:ratio=6:attack=0.003:release=0.05,\
       bass=g=4:f=100:w=50,\
       aecho=0.7:0.3:150:0.2" \
  buk_industrial.webm
```

---

## 🧪 Testing Asset Loading

```javascript
// Test Korean martial arts audio integration
const testCombatAudio = async () => {
  // Test basic combat sounds
  const attackAudio = new Audio(
    "./assets/audio/sfx/combat/attack_critical.webm"
  );
  await attackAudio
    .play()
    .then(() => console.log("✅ Critical attack loaded"))
    .catch((e) => console.log("❌ Attack failed:", e));

  // Test archetype-specific sounds
  const musaAudio = new Audio("./assets/audio/sfx/archetype/musa_special.webm");
  await musaAudio
    .play()
    .then(() => console.log("✅ Musa archetype loaded"))
    .catch((e) => console.log("❌ Musa failed:", e));

  // Test trigram philosophy sounds
  const geonAudio = new Audio("./assets/audio/sfx/trigram/geon_heaven.webm");
  await geonAudio
    .play()
    .then(() => console.log("✅ Geon trigram loaded"))
    .catch((e) => console.log("❌ Geon failed:", e));

  // Test vital point precision
  const nerveAudio = new Audio(
    "./assets/audio/sfx/vital_points/nerve_strike.webm"
  );
  await nerveAudio
    .play()
    .then(() => console.log("✅ Nerve strike loaded"))
    .catch((e) => console.log("❌ Nerve failed:", e));
};

// Test underground atmosphere
const testAtmosphere = async () => {
  const undergroundAudio = new Audio(
    "./assets/audio/music/underground_theme.webm"
  );
  await undergroundAudio
    .play()
    .then(() => console.log("✅ Underground theme loaded"))
    .catch((e) => console.log("❌ Underground failed:", e));
};
```

---

## 🎯 Enhanced Immediate Actions Required

1. **Run the updated asset processing script** with Korean martial arts styling.
2. **Implement archetype-specific audio generation** for each fighter type.
3. **Create trigram philosophy sound mapping** for ☰☱☲☳☴☵☶☷ stances.
4. **Verify vital point precision audio feedback** for 70 target points.
5. **Test underground dojang atmospheric integration.**
6. **Enable enhanced fallback mode** with Korean traditional + cyberpunk fusion.

The enhanced audio system should create an immersive **Underground Dojang** experience that combines authentic Korean martial arts traditions with dark cyberpunk aesthetics, providing realistic combat feedback across 5 distinct fighter archetypes and 8 trigram philosophies.

---

## 🌑 Dark Enhancement Priority

1. **Critical Combat Audio** – Bone breaking, vital point strikes, archetype signatures
2. **Traditional Fusion** – Korean instruments with cyberpunk processing
3. **Underground Atmosphere** – Neon hum, blood echo, spatial depth
4. **Psychological Warfare** – Intimidation, pressure, mental dominance
5. **Perfect Strike Feedback** – Precise vital point audio confirmation

> *“In darkness, hear the sound of the perfect strike.”*
