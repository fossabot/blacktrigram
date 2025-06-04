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
