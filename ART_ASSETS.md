Below is a focused breakdown of **exactly which art‐ and animation‐related assets** you’ll need for:

1. **Backgrounds** (especially the Intro/Main Menu & Dojang/Training Hall),
2. **UI Icons** (stances, trigrams, HUD elements), and
3. **Technique Animations** (attack, hit, finisher sequences)

Additionally, we call out the **Pixi.js modules** (dependencies) you’ll actually use when wiring everything together in code. Think of this as a “shopping list” for your 2D combat game’s art and animation pipeline, paired with the Pixi features you’ll need to load, display, and animate them.

## CURRENT STATE

assets/vfx/animations
assets/vfx
assets/dojang_wall_neon_flicker.png
assets/visual/overlays
assets/visual/bg/intro/intro_bg_loop.png
assets/visual/bg/intro
assets/visual/bg/dojang/dojang_wall_tex.png
assets/visual/bg/dojang/dojang_floor_tex.png
assets/visual/bg/dojang
assets/visual/bg/archetyples/PlayerArchetypesExplained.png
assets/visual/bg/archetyples/CyberpunkTeamDynamics.png
assets/visual/bg/archetyples/PlayerArchetypesOverview.png
assets/visual/bg/archetyples
assets/visual/bg/props
assets/visual/bg
assets/visual/logo/black-trigram-256.png
assets/visual/logo/black-trigram.png
assets/visual/logo
assets/visual
assets/audio/music/intro_theme.webm
assets/audio/music/combat_theme.webm
assets/audio/music
assets/audio/sfx/combat/attack_punch_light_7.mp3
assets/audio/sfx/combat/attack_punch_light_1.mp3
assets/audio/sfx/combat/attack_punch_light_5.mp3
assets/audio/sfx/combat/attack_punch_medium_1.mp3
assets/audio/sfx/combat/attack_medium_4.mp3
assets/audio/sfx/combat/attack_punch_light_7.webm
assets/audio/sfx/combat/attack_special_geon_3.webm
assets/audio/sfx/combat/attack_punch_medium_4.mp3
assets/audio/sfx/combat/attack_special_geon_4.webm
assets/audio/sfx/combat/attack_medium.webm
assets/audio/sfx/combat/attack_critical_1.webm
assets/audio/sfx/combat/attack_special_geon.webm
assets/audio/sfx/combat/attack_special_geon_2.mp3
assets/audio/sfx/combat/attack_punch_light.webm
assets/audio/sfx/combat/attack_heavy.webm
assets/audio/sfx/combat/attack_medium_1.webm
assets/audio/sfx/combat/attack_critical_3.webm
assets/audio/sfx/combat/attack_punch_light_2.mp3
assets/audio/sfx/combat/attack_punch_light_6.webm
assets/audio/sfx/combat/attack_punch_light_3.mp3
assets/audio/sfx/combat/attack_punch_light.mp3
assets/audio/sfx/combat/attack_light.webm
assets/audio/sfx/combat/attack_light_1.mp3
assets/audio/sfx/combat/attack_light_3.mp3
assets/audio/sfx/combat/attack_punch_medium.mp3
assets/audio/sfx/combat/attack_punch_medium_2.mp3
assets/audio/sfx/combat/attack_punch_medium_2.webm
assets/audio/sfx/combat/attack_medium.mp3
assets/audio/sfx/combat/attack_punch_light_5.webm
assets/audio/sfx/combat/attack_medium_1.mp3
assets/audio/sfx/combat/attack_special_geon_1.webm
assets/audio/sfx/combat/attack_punch_light_3.webm
assets/audio/sfx/combat/attack_special_geon_2.webm
assets/audio/sfx/combat/attack_critical_4.webm
assets/audio/sfx/combat/attack_punch_light_6.mp3
assets/audio/sfx/combat/attack_punch_light_1.webm
assets/audio/sfx/combat/attack_special_geon_1.mp3
assets/audio/sfx/combat/attack_critical_3.mp3
assets/audio/sfx/combat/attack_punch_medium_3.mp3
assets/audio/sfx/combat/attack_special_geon.mp3
assets/audio/sfx/combat/attack_light_3.webm
assets/audio/sfx/combat/attack_punch_medium_1.webm
assets/audio/sfx/combat/attack_punch_light_4.mp3
assets/audio/sfx/combat/attack_punch_light_8.mp3
assets/audio/sfx/combat/attack_special_geon_4.mp3
assets/audio/sfx/combat/attack_critical.webm
assets/audio/sfx/combat/attack_light.mp3
assets/audio/sfx/combat/attack_punch_light_4.webm
assets/audio/sfx/combat/attack_light_4.webm
assets/audio/sfx/combat/attack_critical.mp3
assets/audio/sfx/combat/attack_critical_1.mp3
assets/audio/sfx/combat/attack_special_geon_3.mp3
assets/audio/sfx/combat/attack_medium_3.mp3
assets/audio/sfx/combat/attack_light_2.mp3
assets/audio/sfx/combat/attack_punch_medium.webm
assets/audio/sfx/combat/attack_critical_2.webm
assets/audio/sfx/combat/attack_punch_medium_4.webm
assets/audio/sfx/combat/attack_punch_medium_3.webm
assets/audio/sfx/combat/attack_punch_light_8.webm
assets/audio/sfx/combat/attack_punch_light_2.webm
assets/audio/sfx/combat/attack_medium_3.webm
assets/audio/sfx/combat/attack_critical_2.mp3
assets/audio/sfx/combat
assets/audio/sfx/movement/dodge_3.mp3
assets/audio/sfx/movement/dodge_4.mp3
assets/audio/sfx/movement/stance_change_3.mp3
assets/audio/sfx/movement/dodge_1.mp3
assets/audio/sfx/movement/dodge_2.mp3
assets/audio/sfx/movement/stance_change_4.webm
assets/audio/sfx/movement/dodge_8.webm
assets/audio/sfx/movement/dodge.mp3
assets/audio/sfx/movement/dodge.webm
assets/audio/sfx/movement/dodge_8.mp3
assets/audio/sfx/movement/dodge_7.mp3
assets/audio/sfx/movement/dodge_5.mp3
assets/audio/sfx/movement/stance_change_4.mp3
assets/audio/sfx/movement/dodge_3.webm
assets/audio/sfx/movement/stance_change_3.webm
assets/audio/sfx/movement/stance_change.mp3
assets/audio/sfx/movement/stance_change_1.webm
assets/audio/sfx/movement/dodge_6.mp3
assets/audio/sfx/movement/dodge_6.webm
assets/audio/sfx/movement/stance_change.webm
assets/audio/sfx/movement/stance_change_2.mp3
assets/audio/sfx/movement/dodge_7.webm
assets/audio/sfx/movement/dodge_4.webm
assets/audio/sfx/movement/stance_change_2.webm
assets/audio/sfx/movement/dodge_5.webm
assets/audio/sfx/movement/dodge_1.webm
assets/audio/sfx/movement/stance_change_1.mp3
assets/audio/sfx/movement/dodge_2.webm
assets/audio/sfx/movement
assets/audio/sfx/blocks/block_success_3.mp3
assets/audio/sfx/blocks/block_success_4.webm
assets/audio/sfx/blocks/block_success_1.webm
assets/audio/sfx/blocks/block_success_4.mp3
assets/audio/sfx/blocks/block_break_1.mp3
assets/audio/sfx/blocks/block_break_4.mp3
assets/audio/sfx/blocks/block_break_2.mp3
assets/audio/sfx/blocks/block_success_1.mp3
assets/audio/sfx/blocks/block_break.mp3
assets/audio/sfx/blocks/block_break_4.webm
assets/audio/sfx/blocks/block_success_3.webm
assets/audio/sfx/blocks/block_break_3.mp3
assets/audio/sfx/blocks/block_success_2.mp3
assets/audio/sfx/blocks/block_break_3.webm
assets/audio/sfx/blocks/block_success_2.webm
assets/audio/sfx/blocks/block_success.webm
assets/audio/sfx/blocks/block_break.webm
assets/audio/sfx/blocks/block_success.mp3
assets/audio/sfx/blocks/block_break_1.webm
assets/audio/sfx/blocks/block_break_2.webm
assets/audio/sfx/blocks
assets/audio/sfx/generate-missing-audio.sh
assets/audio/sfx/match/match_start_4.mp3
assets/audio/sfx/match/match_start.webm
assets/audio/sfx/match/match_start_3.mp3
assets/audio/sfx/match/match_start.mp3
assets/audio/sfx/match/match_start_3.webm
assets/audio/sfx/match/match_start_2.webm
assets/audio/sfx/match/match_start_4.webm
assets/audio/sfx/match/match_start_1.mp3
assets/audio/sfx/match/match_start_2.mp3
assets/audio/sfx/match/match_start_1.webm
assets/audio/sfx/match
assets/audio/sfx/misc/victory_4.webm
assets/audio/sfx/misc/combo_finish_3.mp3
assets/audio/sfx/misc/footstep_3.webm
assets/audio/sfx/misc/menu_navigate_4.webm
assets/audio/sfx/misc/hit_flesh_4.webm
assets/audio/sfx/misc/health_low.mp3
assets/audio/sfx/misc/stamina_depleted_2.mp3
assets/audio/sfx/misc/health_low.webm
assets/audio/sfx/misc/hit_flesh_3.webm
assets/audio/sfx/misc/defeat_2.mp3
assets/audio/sfx/misc/countdown_3.mp3
assets/audio/sfx/misc/body_realistic_sound.webm
assets/audio/sfx/misc/victory.webm
assets/audio/sfx/misc/health_low_3.webm
assets/audio/sfx/misc/health_low_3.mp3
assets/audio/sfx/misc/menu_navigate.webm
assets/audio/sfx/misc/victory.mp3
assets/audio/sfx/misc/hit_flesh.mp3
assets/audio/sfx/misc/hit_flesh_1.mp3
assets/audio/sfx/misc/hit_flesh_2.webm
assets/audio/sfx/misc/stamina_depleted_4.mp3
assets/audio/sfx/misc/stamina_depleted.webm
assets/audio/sfx/misc/countdown_4.mp3
assets/audio/sfx/misc/combo_buildup_3.webm
assets/audio/sfx/misc/victory_4.mp3
assets/audio/sfx/misc/footstep_4.webm
assets/audio/sfx/misc/defeat_4.mp3
assets/audio/sfx/misc/stamina_depleted_3.webm
assets/audio/sfx/misc/combo_finish.webm
assets/audio/sfx/misc/match_end.webm
assets/audio/sfx/misc/menu_navigate_3.mp3
assets/audio/sfx/misc/combo_buildup_2.mp3
assets/audio/sfx/misc/stamina_depleted_2.webm
assets/audio/sfx/misc/combo_finish_4.webm
assets/audio/sfx/misc/countdown_2.webm
assets/audio/sfx/misc/combo_finish_2.webm
assets/audio/sfx/misc/match_end_1.webm
assets/audio/sfx/misc/defeat_4.webm
assets/audio/sfx/misc/combo_finish_1.mp3
assets/audio/sfx/misc/footstep.mp3
assets/audio/sfx/misc/hit_block.webm
assets/audio/sfx/misc/match_end_4.mp3
assets/audio/sfx/misc/menu_click_3.mp3
assets/audio/sfx/misc/victory_3.webm
assets/audio/sfx/misc/match_end.mp3
assets/audio/sfx/misc/combo_buildup_1.webm
assets/audio/sfx/misc/health_low_1.mp3
assets/audio/sfx/misc/combo_finish_4.mp3
assets/audio/sfx/misc/hit_block_2.webm
assets/audio/sfx/misc/hit_block_3.webm
assets/audio/sfx/misc/footstep.webm
assets/audio/sfx/misc/defeat.mp3
assets/audio/sfx/misc/defeat_3.webm
assets/audio/sfx/misc/countdown_3.webm
assets/audio/sfx/misc/countdown_1.webm
assets/audio/sfx/misc/menu_click_4.webm
assets/audio/sfx/misc/countdown_2.mp3
assets/audio/sfx/misc/countdown.webm
assets/audio/sfx/misc/footstep_1.webm
assets/audio/sfx/misc/menu_click_3.webm
assets/audio/sfx/misc/footstep_2.webm
assets/audio/sfx/misc/footstep_3.mp3
assets/audio/sfx/misc/body_realistic_sound.mp3
assets/audio/sfx/misc/combo_buildup_1.mp3
assets/audio/sfx/misc/victory_2.webm
assets/audio/sfx/misc/footstep_1.mp3
assets/audio/sfx/misc/hit_flesh_4.mp3
assets/audio/sfx/misc/combo_finish_2.mp3
assets/audio/sfx/misc/stamina_depleted.mp3
assets/audio/sfx/misc/countdown_4.webm
assets/audio/sfx/misc/menu_click.webm
assets/audio/sfx/misc/menu_click_1.webm
assets/audio/sfx/misc/combo_buildup_2.webm
assets/audio/sfx/misc/victory_2.mp3
assets/audio/sfx/misc/menu_navigate_3.webm
assets/audio/sfx/misc/countdown.mp3
assets/audio/sfx/misc/health_low_2.webm
assets/audio/sfx/misc/menu_navigate_4.mp3
assets/audio/sfx/misc/menu_click_1.mp3
assets/audio/sfx/misc/victory_1.mp3
assets/audio/sfx/misc/match_end_3.webm
assets/audio/sfx/misc/hit_block.mp3
assets/audio/sfx/misc/stamina_depleted_4.webm
assets/audio/sfx/misc/combo_finish.mp3
assets/audio/sfx/misc/combo_buildup.webm
assets/audio/sfx/misc/hit_flesh.webm
assets/audio/sfx/misc/countdown_1.mp3
assets/audio/sfx/misc/menu_click_2.mp3
assets/audio/sfx/misc/menu_click_4.mp3
assets/audio/sfx/misc/menu_navigate.mp3
assets/audio/sfx/misc/combo_buildup_4.webm
assets/audio/sfx/misc/hit_flesh_1.webm
assets/audio/sfx/misc/menu_navigate_2.mp3
assets/audio/sfx/misc/hit_block_3.mp3
assets/audio/sfx/misc/combo_finish_1.webm
assets/audio/sfx/misc/match_end_2.webm
assets/audio/sfx/misc/match_end_1.mp3
assets/audio/sfx/misc/combo_buildup.mp3
assets/audio/sfx/misc/match_end_3.mp3
assets/audio/sfx/misc/footstep_2.mp3
assets/audio/sfx/misc/health_low_2.mp3
assets/audio/sfx/misc/victory_1.webm
assets/audio/sfx/misc/menu_click_2.webm
assets/audio/sfx/misc/hit_block_4.webm
assets/audio/sfx/misc/menu_navigate_2.webm
assets/audio/sfx/misc/body_realistic_sound_1.mp3
assets/audio/sfx/misc/body_realistic_sound_1.webm
assets/audio/sfx/misc/hit_flesh_2.mp3
assets/audio/sfx/misc/combo_finish_3.webm
assets/audio/sfx/misc/match_end_2.mp3
assets/audio/sfx/misc/health_low_4.webm
assets/audio/sfx/misc/hit_block_1.webm
assets/audio/sfx/misc/match_end_4.webm
assets/audio/sfx/misc/victory_3.mp3
assets/audio/sfx/misc/combo_buildup_4.mp3
assets/audio/sfx/misc/hit_block_2.mp3
assets/audio/sfx/misc/menu_click.mp3
assets/audio/sfx/misc/hit_block_4.mp3
assets/audio/sfx/misc/stamina_depleted_3.mp3
assets/audio/sfx/misc/defeat_1.webm
assets/audio/sfx/misc/health_low_1.webm
assets/audio/sfx/misc/defeat.webm
assets/audio/sfx/misc/stamina_depleted_1.webm
assets/audio/sfx/misc/defeat_3.mp3
assets/audio/sfx/misc/menu_navigate_1.webm
assets/audio/sfx/misc/hit_block_1.mp3
assets/audio/sfx/misc/stamina_depleted_1.mp3
assets/audio/sfx/misc/defeat_1.mp3
assets/audio/sfx/misc/combo_buildup_3.mp3
assets/audio/sfx/misc/defeat_2.webm
assets/audio/sfx/misc/menu_navigate_1.mp3
assets/audio/sfx/misc/health_low_4.mp3
assets/audio/sfx/misc/hit_flesh_3.mp3
assets/audio/sfx/misc
assets/audio/sfx/special/perfect_strike_1.mp3
assets/audio/sfx/special/perfect_strike_3.webm
assets/audio/sfx/special/perfect_strike.mp3
assets/audio/sfx/special/perfect_strike_1.webm
assets/audio/sfx/special/perfect_strike_3.mp3
assets/audio/sfx/special/perfect_strike_2.mp3
assets/audio/sfx/special/perfect_strike_4.webm
assets/audio/sfx/special/perfect_strike_4.mp3
assets/audio/sfx/special/perfect_strike_2.webm
assets/audio/sfx/special/perfect_strike.webm
assets/audio/sfx/special
assets/audio/sfx/menu/menu_hover_1.mp3
assets/audio/sfx/menu/menu_hover_2.mp3
assets/audio/sfx/menu/menu_select_5.mp3
assets/audio/sfx/menu/menu_select_8.mp3
assets/audio/sfx/menu/menu_hover.mp3
assets/audio/sfx/menu/menu_select_5.webm
assets/audio/sfx/menu/menu_select.webm
assets/audio/sfx/menu/menu_select_1.mp3
assets/audio/sfx/menu/menu_select_6.webm
assets/audio/sfx/menu/menu_select.mp3
assets/audio/sfx/menu/menu_back_1.mp3
assets/audio/sfx/menu/menu_select_3.mp3
assets/audio/sfx/menu/menu_select_7.webm
assets/audio/sfx/menu/menu_select_6.mp3
assets/audio/sfx/menu/menu_hover_1.webm
assets/audio/sfx/menu/menu_select_7.mp3
assets/audio/sfx/menu/menu_back.mp3
assets/audio/sfx/menu/menu_select_1.webm
assets/audio/sfx/menu/menu_hover_4.mp3
assets/audio/sfx/menu/menu_back_3.mp3
assets/audio/sfx/menu/menu_select_2.mp3
assets/audio/sfx/menu/menu_hover_3.webm
assets/audio/sfx/menu/menu_hover_3.mp3
assets/audio/sfx/menu/menu_back_4.webm
assets/audio/sfx/menu/menu_select_8.webm
assets/audio/sfx/menu/menu_back_1.webm
assets/audio/sfx/menu/menu_back.webm
assets/audio/sfx/menu/menu_back_3.webm
assets/audio/sfx/menu/menu_back_2.webm
assets/audio/sfx/menu/menu_select_4.mp3
assets/audio/sfx/menu/menu_back_4.mp3
assets/audio/sfx/menu/menu_select_3.webm
assets/audio/sfx/menu/menu_select_2.webm
assets/audio/sfx/menu/menu_hover.webm
assets/audio/sfx/menu/menu_select_4.webm
assets/audio/sfx/menu/menu_back_2.mp3
assets/audio/sfx/menu/menu_hover_4.webm
assets/audio/sfx/menu/menu_hover_2.webm
assets/audio/sfx/menu
assets/audio/sfx/hits/hit_light.mp3
assets/audio/sfx/hits/hit_critical_3.webm
assets/audio/sfx/hits/hit_medium_1.mp3
assets/audio/sfx/hits/hit_heavy.mp3
assets/audio/sfx/hits/hit_critical_2.mp3
assets/audio/sfx/hits/hit_critical_4.mp3
assets/audio/sfx/hits/hit_light_3.mp3
assets/audio/sfx/hits/hit_medium_1.webm
assets/audio/sfx/hits/hit_critical_3.mp3
assets/audio/sfx/hits/hit_critical_1.webm
assets/audio/sfx/hits/hit_medium.webm
assets/audio/sfx/hits/hit_critical_4.webm
assets/audio/sfx/hits/hit_heavy_4.webm
assets/audio/sfx/hits/hit_critical_2.webm
assets/audio/sfx/hits/hit_heavy_3.mp3
assets/audio/sfx/hits/hit_light_1.mp3
assets/audio/sfx/hits/hit_heavy_3.webm
assets/audio/sfx/hits/hit_heavy.webm
assets/audio/sfx/hits/hit_medium_4.mp3
assets/audio/sfx/hits/hit_medium_2.mp3
assets/audio/sfx/hits/hit_heavy_1.mp3
assets/audio/sfx/hits/hit_light_4.webm
assets/audio/sfx/hits/hit_light_2.webm
assets/audio/sfx/hits/hit_light_4.mp3
assets/audio/sfx/hits/hit_light_2.mp3
assets/audio/sfx/hits/hit_heavy_2.webm
assets/audio/sfx/hits/hit_medium.mp3
assets/audio/sfx/hits/hit_medium_4.webm
assets/audio/sfx/hits/hit_light.webm
assets/audio/sfx/hits/hit_medium_3.webm
assets/audio/sfx/hits/hit_medium_3.mp3
assets/audio/sfx/hits/hit_medium_2.webm
assets/audio/sfx/hits/hit_critical.mp3
assets/audio/sfx/hits/hit_light_1.webm
assets/audio/sfx/hits/hit_light_3.webm
assets/audio/sfx/hits/hit_critical_1.mp3
assets/audio/sfx/hits/hit_critical.webm
assets/audio/sfx/hits/hit_heavy_2.mp3
assets/audio/sfx/hits/hit_heavy_1.webm
assets/audio/sfx/hits
assets/audio/sfx/ki_energy/ki_release_2.webm
assets/audio/sfx/ki_energy/ki_release_3.mp3
assets/audio/sfx/ki_energy/ki_release_2.mp3
assets/audio/sfx/ki_energy/ki_release_3.webm
assets/audio/sfx/ki_energy/ki_release_1.mp3
assets/audio/sfx/ki_energy/energy_pulse_4.webm
assets/audio/sfx/ki_energy/ki_charge_4.mp3
assets/audio/sfx/ki_energy/energy_pulse_3.webm
assets/audio/sfx/ki_energy/energy_pulse_3.mp3
assets/audio/sfx/ki_energy/energy_pulse_4.mp3
assets/audio/sfx/ki_energy/ki_charge_4.webm
assets/audio/sfx/ki_energy/ki_charge.mp3
assets/audio/sfx/ki_energy/energy_pulse_2.webm
assets/audio/sfx/ki_energy/energy_pulse.webm
assets/audio/sfx/ki_energy/ki_charge_3.mp3
assets/audio/sfx/ki_energy/ki_release_4.mp3
assets/audio/sfx/ki_energy/ki_charge_2.mp3
assets/audio/sfx/ki_energy/ki_charge.webm
assets/audio/sfx/ki_energy/energy_pulse_1.mp3
assets/audio/sfx/ki_energy/ki_release_4.webm
assets/audio/sfx/ki_energy/ki_charge_1.mp3
assets/audio/sfx/ki_energy/energy_pulse.mp3
assets/audio/sfx/ki_energy/ki_charge_1.webm
assets/audio/sfx/ki_energy/ki_charge_2.webm
assets/audio/sfx/ki_energy/ki_release.mp3
assets/audio/sfx/ki_energy/energy_pulse_2.mp3
assets/audio/sfx/ki_energy/ki_release.webm
assets/audio/sfx/ki_energy/energy_pulse_1.webm
assets/audio/sfx/ki_energy/ki_release_1.webm
assets/audio/sfx/ki_energy/ki_charge_3.webm
assets/audio/sfx/ki_energy
assets/audio/sfx/fix-1-version.sh
assets/audio/sfx
assets/audio
assets/ui/panels
assets/ui/icons/trigrams
assets/ui/icons/stances
assets/ui/icons
assets/ui/tooltips
assets/ui/hud
assets/ui
assets/characters/animations/techniques/light
assets/characters/animations/techniques
assets/characters/animations
assets/characters
assets


---

## 1. Backgrounds & Environments

### 1.1 Intro / Main Menu Background

* **Asset Name:** `intro_bg_loop.png`

  * **Description:** A seamless 1920×1080 loopable tile of a rain‐slicked concrete floor with neon pipes and drifting data‐line grid.
  * **File Format:** PNG (plus normal/roughness if you want subtle 3D lighting on flat sprites, but PNG is usually enough).
  * **Folder:** `assets/visual/bg/intro/`
  * **Visual Style Notes:**

    * Base color: Obsidian (`#0A0F12`) with subtle film‐grain overlay.
    * Neon accents: teal/cyan reflections on puddles, flickering Hangul glyphs on pipes.
    * Animation: small “rain drip” loop in shader or flipbook.

* **Asset Name:** `mainmenu_foreground_overlay.png`

  * **Description:** A semi‐transparent obsidian vignette (20px “soft edge”) to darken screen edges, helping text/logo pop.
  * **File Format:** PNG (alpha)
  * **Folder:** `assets/visual/overlays/`
  * **Usage:** Placed above `intro_bg_loop` to darken corners.

### 1.2 Dojang / Training Hall Background

* **Asset Name:** `dojang_floor_tex.png`

  * **Description:** 2048×2048 PBR‐style image of matte‐black tatami mats, with subtle water puddle normals (if you want dynamic reflections).
  * **File Format:** PNG (or PNG + normal/roughness if desired)
  * **Folder:** `assets/visual/bg/dojang/`
  * **Style Notes:**

    * Tileable so it can fill any resolution.
    * Slight neon cyan reflections at edges where wall meets floor.

* **Asset Name:** `dojang_wall_tex.png`

  * **Description:** 1024×1024 tile of corrugated metal with pipelines and emissive Hangul trigrams (☰, ☲, etc.) behind semi‐opaque panels.
  * **File Format:** PNG (with separate emissive mask channel if you plan to animate neon flicker).
  * **Folder:** `assets/visual/bg/dojang/`
  * **Style Notes:**

    * The emissive mask will let you “pulse” each trigram glyph via a simple shader or a flicker sprite.

* **Asset Name:** `dojang_wall_neon_flicker.png` (optional flipbook)

  * **Description:** A small flipbook (e.g. 4 frames at 256×256) showing a neon glyph flicker (cycle through 0%, 50%, 100% brightness).
  * **File Format:** PNG sprite sheet
  * **Folder:** `assets/vfx/animations/`

* **Asset Name:** `training_console_model.png`

  * **Description:** 512×512 stylized grayscale sprite of a holo‐console (flat sprite) with cyan emissive accents (for real‐time data display).
  * **File Format:** PNG
  * **Folder:** `assets/visual/props/`
  * **Notes:** Use this as a static background element; you can overlay bitmaps of gauge bars, or simply let the console glow.

* **Asset Name:** `stance_pad_circle.png`

  * **Description:** 256×256 semi‐transparent PNG of a glowing floor circle. Pulses from 0 → 100% opacity in a 1s loop.
  * **File Format:** PNG (alpha)
  * **Folder:** `assets/visual/props/`

---

## 2. UI Icons & HUD Elements

### 2.1 Stance Icons

Each icon is a 64×64 px SVG (so it scales crisply). We’ll load them as textures in Pixi and tint/animate as needed.

1. **`icon_stance_defensive.svg`**

   * Outline style in Slate Gray (`#2E3538`) when inactive.
   * Filled with Teal Neon (`#00FFC8`) + soft glow when active.

2. **`icon_stance_balanced.svg`**

   * Outline in Slate Gray; filled with Teal Neon on hover/active.

3. **`icon_stance_aggressive.svg`**

   * Outline in Slate Gray; filled with Crimson (`#FF0044`) on “charged” or “ready” state, or Teal Neon when selected.

   **Folder:** `assets/ui/icons/stances/`

### 2.2 Trigram Icons

* **File Names:**

  ```
  icon_trigram_1.svg  
  icon_trigram_2.svg  
  …  
  icon_trigram_8.svg  
  ```
* **Each icon:** 48×48 px, dark background (Gunmetal `#424A50`) with the trigram glyph in Teal Neon.
* **States:**

  * Inactive: no glow, just basic fill.
  * Active: slight outer glow + subtle 1.1× scale “pulse.”
  * Hover: 1.05× scale + quick glow (0.2 s).

  **Folder:** `assets/ui/icons/trigrams/`

### 2.3 HUD Bars & Overlays

* **`hud_health_bar.png`** (800×32 px PNG)

  * 10 segmented blocks. Each filled segment is Cyan Glow (`#1BE7FF`); empty is Slate Gray.
  * **Folder:** `assets/ui/hud/`

* **`hud_pain_bar.png`** (800×16 px PNG)

  * 10 segments. Filled segments are Crimson (`#FF0044`); empty Slate Gray.
  * **Folder:** `assets/ui/hud/`

* **`ui_button_start_idle.png` & `ui_button_start_hover.png`** (256×64 px each)

  * Idle: Slate Gray panel with “▶ Start Combat” in Hangul+English.
  * Hover: Underline in Teal Neon + icon (“▶”) glows.
  * **Folder:** `assets/ui/buttons/`

* **`ui_panel_slate.png`** (1024×512 px)

  * A semi-opaque Slate Gray panel (70% opacity) with a subtle noise texture.
  * **Folder:** `assets/ui/panels/`

* **`tooltip_arrow.png`** (32×32 px PNG)

  * Small triangle arrow in Cyan Glow for tooltips.
  * **Folder:** `assets/ui/tooltips/`

---

## 3. Technique Animations (AnimatedSprite Sprite Sheets)

Any time you see code like:

```js
await Assets.load('path/to/spritesheet.json');
const frames = [];
for (let i = 0; i < N; i++) {
  frames.push(Texture.from(`frame${i}.png`));
}
const anim = new AnimatedSprite(frames);
```

…you need a **sprite sheet JSON** + **corresponding PNG atlas** for each “technique.” Below is a minimal required set of technique animations:

### 3.1 Light Strike Animation (All Archetypes)

* **Sprite Sheet JSON:** `strike_light_spritesheet.json`
* **Texture Atlas:** `strike_light_spritesheet.png` (e.g., 512×512 containing all 6 frames laid out in a grid).
* **Frame Count:** 6 frames, each \~128×256 (portrait orientation).
* **Animation Speed:** 0.6 (adjust per archetype).
* **Visual Content:** Character winds up → quick punch/kick → recoil. No background in atlas (transparent).
* **Folder:** `assets/characters/animations/techniques/light/`

### 3.2 Medium Strike Animation

* **Sprite Sheet JSON:** `strike_medium_spritesheet.json`
* **Texture Atlas:** `strike_medium_spritesheet.png` (6–8 frames, \~128×256 each).
* **Description:** More wind-up, more impact frames, a small dust puff frame integrated (see VFX).
* **Folder:** `assets/characters/animations/techniques/medium/`

### 3.3 Heavy Strike Animation

* **Sprite Sheet JSON:** `strike_heavy_spritesheet.json`
* **Texture Atlas:** `strike_heavy_spritesheet.png` (8 frames, \~256×256 each).
* **Description:** Big wind-up, slow-mo pause on impact, splash of embedded VFX dust/blood.
* **Folder:** `assets/characters/animations/techniques/heavy/`

### 3.4 Critical Strike / Finisher Animation

* **Sprite Sheet JSON:** `strike_critical_spritesheet.json`
* **Texture Atlas:** `strike_critical_spritesheet.png` (10–12 frames, \~256×256).
* **Description:** Slow-mo bone-breaking blow → flash frame → slowdown.
* **Folder:** `assets/characters/animations/techniques/critical/`

### 3.5 Dodge / Evade Animation

* **Sprite Sheet JSON:** `dodge_spritesheet.json`
* **Texture Atlas:** `dodge_spritesheet.png` (4–6 frames, \~128×256).
* **Description:** Quick sidestep/backflip frames, subtle afterimage.
* **Folder:** `assets/characters/animations/techniques/dodge/`

### 3.6 Block / Parry Animation

* **Sprite Sheet JSON:** `block_spritesheet.json`
* **Texture Atlas:** `block_spritesheet.png` (5 frames, \~128×256).
* **Description:** Character raises arm/weapon to block → recoil if successful.
* **Folder:** `assets/characters/animations/techniques/block/`

### 3.7 Hit Reaction Animation

* **Sprite Sheet JSON:** `hit_reaction_spritesheet.json`
* **Texture Atlas:** `hit_reaction_spritesheet.png` (4 frames, \~128×256).
* **Description:** Character flinches backwards, tinted red on final frame.
* **Folder:** `assets/characters/animations/techniques/hit/`

### 3.8 Finisher Sequence (All Archetypes)

* **Sprite Sheet JSON:** `finisher_musa_spritesheet.json`, `finisher_amsalja_spritesheet.json`, etc.
* **Texture Atlas:** `finisher_musa_spritesheet.png` (12 frames, \~256×256), etc.
* **Description:** A multi-stage “cinematic” finisher (pause → bone crushing → slow fade).
* **Folder:** `assets/characters/animations/finisher/`

---

## 4. Pixi.js Dependencies & Modules Needed

Below is a minimal list of **Pixi.js modules** (from `pixi.js/lib`) that you will rely on to load, animate, and render everything above. In your `package.json`, you’ve already installed `pixi.js`. At runtime, you’ll import exactly the pieces you use:

```ts
import {
  Application,
  TickerPlugin,           // core ticker
  ResizePlugin,           // auto resizes to window
  Assets,                 // for loading JSON/PNG atlases
  Texture,
  Sprite,
  AnimatedSprite,
  Container,
  TilingSprite,           // if you want parallax/tiled backgrounds
  Loader,                 // older API if you prefer Loader instead of Assets
} from 'pixi.js';
```

* **`Application`** (from `app/Application.mjs`)

  * Creates the Pixi canvas, WebGL context, stage, etc.

* **`TickerPlugin`** & **`ResizePlugin`**

  * Ensures your app’s ticker (main game loop) and auto-resize functionality.

* **`Assets`** (from `assets/Assets.mjs`)

  * The new recommended loader for JSON sprite sheets, PNGs, audio, etc.
  * Example:

    ```ts
    await Assets.load('assets/characters/animations/techniques/light/strike_light_spritesheet.json');
    ```

* **`Texture`** (from `rendering/texture/Texture.mjs`)

  * Create textures from loaded assets:

    ```ts
    const frameTex = Texture.from('strike_light_000.png');
    ```

* **`Sprite`** & **`AnimatedSprite`** (from `scene/sprite/Sprite.mjs` & `scene/sprite-animated/AnimatedSprite.mjs`)

  * `Sprite` for static images (UI icons, backgrounds).
  * `AnimatedSprite` for flipbook animations (techniques, VFX).

* **`Container`** (from `scene/container/Container.mjs`)

  * Use a parent `Container` for grouping layers:

    * `backgroundContainer`
    * `characterContainer`
    * `uiContainer`
    * `vfxContainer`

* **`TilingSprite`** (from `scene/sprite-tiling/TilingSprite.mjs`)

  * If you want to scroll/loop the `intro_bg_loop.png` or tile `dojang_floor_tex.png` seamlessly across a larger stage.

* **`Loader`** (from `assets/loader/Loader.mjs`)

  * If you prefer the older PIXI.Loader API to Assets. Both are possible; `Assets` is recommended for newer Pixi versions.

* **`Filter`** / **`BlurFilter`** / **`DisplacementFilter`** (from `filters/defaults/*`)

  * Useful for adding real-time blur afterimages (for `dodge`), screen shakes, or ripples when powering up Ki (`ki_charge`).

---

## 5. Directory Structure & Final Checklist

Below is a **consolidated folder structure** showing where each of the above assets live. This is what your repo (or build pipeline) needs before you start coding the Pixi setup:

```
/assets
│
├─ characters/
│  ├─ animations/
│  │   ├─ techniques/
│  │   │   ├─ light/
│  │   │   │   ├─ strike_light_spritesheet.json
│  │   │   │   └─ strike_light_spritesheet.png
│  │   │   ├─ medium/
│  │   │   │   ├─ strike_medium_spritesheet.json
│  │   │   │   └─ strike_medium_spritesheet.png
│  │   │   ├─ heavy/
│  │   │   │   ├─ strike_heavy_spritesheet.json
│  │   │   │   └─ strike_heavy_spritesheet.png
│  │   │   ├─ critical/
│  │   │   │   ├─ strike_critical_spritesheet.json
│  │   │   │   └─ strike_critical_spritesheet.png
│  │   │   ├─ dodge/
│  │   │   │   ├─ dodge_spritesheet.json
│  │   │   │   └─ dodge_spritesheet.png
│  │   │   ├─ block/
│  │   │   │   ├─ block_spritesheet.json
│  │   │   │   └─ block_spritesheet.png
│  │   │   └─ hit/
│  │   │       ├─ hit_reaction_spritesheet.json
│  │   │       └─ hit_reaction_spritesheet.png
│  │   └─ finisher/
│  │       ├─ musa_finisher_spritesheet.json
│  │       └─ musa_finisher_spritesheet.png
│  │       ├─ amsalja_finisher_spritesheet.json
│  │       └─ amsalja_finisher_spritesheet.png
│  │       └─ … (one per archetype)
│  └─ portraits/
│      ├─ portrait_musa.png
│      ├─ portrait_amsalja.png
│      └─ … (other archetypes)
│
├─ fonts/
│  ├─ BlackTrigram-Hangul.woff2
│  ├─ NotoSansKR-Regular.woff2
│  └─ Roboto-Regular.woff2
│
├─ i18n/
│  ├─ ko.json
│  └─ en.json
│
├─ props/
│  ├─ training_console_model.png
│  ├─ stance_pad_circle.png
│  └─ dummy_target_overlay.svg
│
├─ shaders/
│  ├─ rim_light.shader
│  ├─ blood_decal.shader
│  └─ neon_flicker.shader
│
├─ ui/
│  ├─ buttons/
│  │   ├─ ui_button_start_idle.png
│  │   └─ ui_button_start_hover.png
│  ├─ icons/
│  │   ├─ stances/
│  │   │   ├─ icon_stance_defensive.svg
│  │   │   ├─ icon_stance_balanced.svg
│  │   │   └─ icon_stance_aggressive.svg
│  │   ├─ trigrams/
│  │   │   ├─ icon_trigram_1.svg
│  │   │   ├─ icon_trigram_2.svg
│  │   │   └─ … up to icon_trigram_8.svg
│  │   └─ tooltip_arrow.png
│  └─ hud/
│      ├─ hud_health_bar.png
│      └─ hud_pain_bar.png
│
├─ vfx/
│  ├─ animations/
│  │   ├─ anim_logo_pulse.json
│  │   ├─ anim_menu_slide_0.png … anim_menu_slide_7.png
│  │   ├─ anim_strike_impact_0.png … anim_strike_impact_15.png
│  │   └─ anim_finisher_musa_0.png … anim_finisher_musa_11.png
│  ├─ particles/
│  │   ├─ vfx_dust_puff.png
│  │   ├─ vfx_blood_splatter.png
│  │   └─ confetti_sprites.png
│  └─ shaders/
│      ├─ vfx_impact_ring.png
│      ├─ vfx_neon_glow.png
│      └─ vfx_critical_flash.png
│
├─ visual/
│  ├─ bg/
│  │   ├─ intro/
│  │   │   ├─ intro_bg_loop.png
│  │   │   └─ mainmenu_foreground_overlay.png
│  │   └─ dojang/
│  │       ├─ dojang_floor_tex.png
│  │       └─ dojang_wall_tex.png
│  └─ overlays/
│      ├─ vital_region_head.png
│      ├─ vital_region_neck.png
│      ├─ vital_region_torso.png
│      ├─ vital_region_arms.png
│      ├─ vital_region_chest.png
│      └─ vital_region_legs.png
│
└─ public/
   └─ assets/
       └─ audio/
           ├─ music/
           │   ├─ intro_theme.webm
           │   ├─ combat_theme.webm
           │   ├─ combat_theme_geon.webm
           │   ├─ training_theme.webm
           │   ├─ meditation_theme.webm
           │   ├─ victory_theme.webm
           │   ├─ underground_rave_theme.webm
           │   └─ ambient_loop.webm
           └─ sfx/
               ├─ ambient/
               │   ├─ dojang_ambience.webm
               │   ├─ wind_effect.webm
               │   └─ dojo_crowd.webm
               ├─ attacks/
               │   ├─ attack_punch_light.webm
               │   ├─ attack_punch_medium.webm
               │   ├─ attack_kick_heavy.webm
               │   ├─ attack_light.webm
               │   ├─ attack_medium.webm
               │   ├─ attack_critical.webm
               │   ├─ attack_special_geon.webm
               │   ├─ dodge.webm
               │   ├─ block_success.webm
               │   ├─ block_break.webm
               │   └─ perfect_strike.webm
               ├─ hit/
               │   ├─ hit_light.webm
               │   ├─ hit_medium.webm
               │   ├─ hit_heavy.webm
               │   ├─ hit_critical.webm
               │   ├─ hit_flesh.webm
               │   └─ hit_block.webm
               ├─ combo/
               │   ├─ combo_buildup.webm
               │   ├─ combo_finish.webm
               │   └─ energy_pulse.webm
               ├─ match/
               │   ├─ match_start.webm
               │   ├─ countdown.webm
               │   ├─ match_end.webm
               │   ├─ victory.webm
               │   └─ defeat.webm
               ├─ movement/
               │   ├─ footstep.webm
               │   └─ stance_change.webm
               ├─ ki/
               │   ├─ ki_charge.webm
               │   └─ ki_release.webm
               ├─ stamina/
               │   └─ stamina_depleted.webm
               ├─ health/
               │   └─ health_low.webm
               └─ ui/
                   ├─ menu_click.webm
                   ├─ menu_navigate.webm
                   ├─ menu_select.webm
                   ├─ menu_hover.webm
                   └─ menu_back.webm
```

---

### 5.1 “What do I need to write in code?”

When you actually initialize Pixi in your game, you’ll do something like:

```ts
import {
  Application,
  Assets,
  Texture,
  Sprite,
  AnimatedSprite,
  TilingSprite,
  Container,
  Filter,
} from 'pixi.js';

(async () => {
  // 1) Create the Pixi Application
  const app = new Application({
    backgroundColor: 0x0a0f12,      // Obsidian
    resizeTo: window,
  });

  document.body.appendChild(app.view);

  // 2) Preload Backgrounds & UI
  await Assets.load({
    introBg: 'assets/visual/bg/intro/intro_bg_loop.png',
    introOverlay: 'assets/visual/overlays/mainmenu_foreground_overlay.png',
    dojangFloor: 'assets/visual/bg/dojang/dojang_floor_tex.png',
    dojangWall: 'assets/visual/bg/dojang/dojang_wall_tex.png',
    stanceDef: 'assets/ui/icons/stances/icon_stance_defensive.svg',
    stanceBal: 'assets/ui/icons/stances/icon_stance_balanced.svg',
    stanceAgg: 'assets/ui/icons/stances/icon_stance_aggressive.svg',
    trigram1: 'assets/ui/icons/trigrams/icon_trigram_1.svg',
    // … all UI icons …
    hudHealth: 'assets/ui/hud/hud_health_bar.png',
    hudPain: 'assets/ui/hud/hud_pain_bar.png',
    buttonStartIdle: 'assets/ui/buttons/ui_button_start_idle.png',
    buttonStartHover: 'assets/ui/buttons/ui_button_start_hover.png',
  });

  // 3) Display Intro Background
  const introBgSprite = new TilingSprite(
    Texture.from('introBg'),
    app.screen.width,
    app.screen.height,
  );
  app.stage.addChild(introBgSprite);

  const overlaySprite = new Sprite(Texture.from('introOverlay'));
  overlaySprite.width = app.screen.width;
  overlaySprite.height = app.screen.height;
  app.stage.addChild(overlaySprite);

  // 4) Build UI Container
  const uiContainer = new Container();
  app.stage.addChild(uiContainer);

  // Logo (e.g., a centered Sprite)
  const logo = new Sprite(Texture.from('mainLogo')); // If you have `mainLogo.png` loaded
  logo.anchor.set(0.5);
  logo.x = app.screen.width / 2;
  logo.y = app.screen.height * 0.2;
  uiContainer.addChild(logo);

  // “Start Combat” button
  const startBtn = new Sprite(Texture.from('buttonStartIdle'));
  startBtn.interactive = true;
  startBtn.buttonMode = true;
  startBtn.anchor.set(0.5);
  startBtn.x = app.screen.width / 2;
  startBtn.y = app.screen.height * 0.5;
  startBtn.on('pointerover', () => {
    startBtn.texture = Texture.from('buttonStartHover');
    // Play hover SFX:
    AudioManager.playSFX('menu_hover');
  });
  startBtn.on('pointerout', () => {
    startBtn.texture = Texture.from('buttonStartIdle');
  });
  startBtn.on('pointerdown', () => {
    AudioManager.playSFX('menu_click');
    // … transition to Game/Dojo …
  });
  uiContainer.addChild(startBtn);

  // 5) When switching to Dojang/Training Hall:
  // Remove intro sprites, then:
  // Background layer:
  const floor = new TilingSprite(
    Texture.from('dojangFloor'),
    app.screen.width,
    app.screen.height
  );
  const wall = new TilingSprite(
    Texture.from('dojangWall'),
    app.screen.width,
    app.screen.height
  );
  app.stage.removeChild(introBgSprite, overlaySprite, uiContainer);
  app.stage.addChild(floor, wall);

  // 6) Show Stance Icons (top-left)
  const stanceIconsContainer = new Container();
  stanceIconsContainer.x = 32;
  stanceIconsContainer.y = 32;
  app.stage.addChild(stanceIconsContainer);

  const defIcon = new Sprite(Texture.from('stanceDef'));
  const balIcon = new Sprite(Texture.from('stanceBal'));
  const aggIcon = new Sprite(Texture.from('stanceAgg'));
  defIcon.x = 0;      defIcon.y = 0;
  balIcon.x = 80;     balIcon.y = 0;
  aggIcon.x = 160;    aggIcon.y = 0;
  stanceIconsContainer.addChild(defIcon, balIcon, aggIcon);

  defIcon.interactive = balIcon.interactive = aggIcon.interactive = true;
  defIcon.buttonMode = balIcon.buttonMode = aggIcon.buttonMode = true;

  defIcon.on('pointerdown', () => {
    // Set current stance = Defensive
    AudioManager.playSFX('stance_change');
    // Visually indicate Active: tint to Teal, scale up 1.1, etc.
    defIcon.tint = 0x00ffc8;
    balIcon.tint = 0x2e3538;
    aggIcon.tint = 0x2e3538;
  });
  balIcon.on('pointerdown', () => {
    AudioManager.playSFX('stance_change');
    defIcon.tint = 0x2e3538;
    balIcon.tint = 0x00ffc8;
    aggIcon.tint = 0x2e3538;
  });
  aggIcon.on('pointerdown', () => {
    AudioManager.playSFX('stance_change');
    defIcon.tint = 0x2e3538;
    balIcon.tint = 0x2e3538;
    aggIcon.tint = 0x00ffc8;
  });

  // 7) Technique Animations (illustrative)
  //   - Preload a “light strike” atlas:
  await Assets.load(
    'assets/characters/animations/techniques/light/strike_light_spritesheet.json'
  );

  //   - Create an AnimatedSprite when the player actually attacks:
  function playLightStrike(x: number, y: number) {
    // Build frame array from loaded atlas
    const lightFrames: Texture[] = [];
    for (let i = 0; i < 6; i++) {
      const frameName = `strike_light_${i.toString().padStart(3, '0')}.png`;
      lightFrames.push(Texture.from(frameName));
    }
    const anim = new AnimatedSprite(lightFrames);
    anim.anchor.set(0.5);
    anim.x = x;
    anim.y = y;
    anim.animationSpeed = 0.6;
    anim.loop = false;
    anim.onComplete = () => {
      app.stage.removeChild(anim);
    };

    //  - Before playing, play corresponding SFX and VFX:
    AudioManager.playAttackSound(10);         // picks `attack_punch_light.webm`
    // spawn VFX sprite at (x,y):
    const dust = new AnimatedSprite([
      Texture.from('vfx_dust_puff_00.png'),
      Texture.from('vfx_dust_puff_01.png'),
      // … etc up to 7 frames …
    ]);
    dust.anchor.set(0.5);
    dust.x = x;
    dust.y = y + 16; // slightly below impact
    dust.animationSpeed = 0.8;
    dust.loop = false;
    dust.onComplete = () => app.stage.removeChild(dust);
    app.stage.addChild(dust);

    app.stage.addChild(anim);
    anim.play();
  }

  // 8) Use Ticker to update any per‐frame logic (e.g. background parallax):
  app.ticker.add((delta) => {
    // subtle floor scroll:
    floor.tilePosition.x -= 0.5 * delta;
    wall.tilePosition.x += 0.2 * delta;
  });
})();
```

> **Comments on the above code snippet:**
>
> 1. **Loading Backgrounds, UI, & Animations** uses `Assets.load({ key: path, … })`.
> 2. **TilingSprite** is used for repeating/scrolling backgrounds (intro & dojang).
> 3. **AnimatedSprite** is used for any “technique” flipbook (light/medium/heavy strikes, VFX dust puffs, finishers, etc.).
> 4. **AudioManager** calls (`playAttackSound`, `playSFX`, etc.) correspond to exactly the SFX files we listed earlier.
> 5. **UI Interactivity** (pointer events) drives sound, tint, scale changes on icons.

---

## 6. Final Checklist

Before you write any more code, make sure you have:

1. **All PNG & JSON sprite sheets for each technique** (light/medium/heavy/critical/dodge/block/hit/finisher), placed exactly in:

   ```
   assets/characters/animations/techniques/{light, medium, heavy, critical, dodge, block, hit}/{…}.json + .png
   ```

2. **Intro & Dojang background PNGs** (and any tileable maps if needed), in:

   ```
   assets/visual/bg/intro/intro_bg_loop.png  
   assets/visual/bg/intro/mainmenu_foreground_overlay.png  
   assets/visual/bg/dojang/dojang_floor_tex.png  
   assets/visual/bg/dojang/dojang_wall_tex.png  
   ```

3. **UI Icons & HUD elements** (Stance icons, Trigram icons, HUD bars, Buttons, Tooltip arrow) in:

   ```
   assets/ui/icons/stances/*.svg  
   assets/ui/icons/trigrams/*.svg  
   assets/ui/hud/hud_health_bar.png  
   assets/ui/hud/hud_pain_bar.png  
   assets/ui/buttons/ui_button_start_idle.png  
   assets/ui/buttons/ui_button_start_hover.png  
   assets/ui/tooltips/tooltip_arrow.png  
   ```

4. **VFX sprite sheets** for dust puffs, blood splatter, impact rings, neon glow, critical flashes, confetti, etc.:

   ```
   assets/vfx/particles/vfx_dust_puff.png  
   assets/vfx/particles/vfx_blood_splatter.png  
   assets/vfx/particles/confetti_sprites.png  
   assets/vfx/shaders/vfx_impact_ring.png  
   assets/vfx/shaders/vfx_neon_glow.png  
   assets/vfx/shaders/vfx_critical_flash.png  
   ```

5. **Fonts & Localization JSON**:

   ```
   assets/fonts/BlackTrigram-Hangul.woff2  
   assets/fonts/NotoSansKR-Regular.woff2  
   assets/fonts/Roboto-Regular.woff2  
   assets/i18n/ko.json  
   assets/i18n/en.json  
   ```

6. **Audio Assets** (placed under `public/assets/audio/…`) exactly matching the names used in `AudioManager` calls.

7. **Pixi Dependencies** installed as part of `pixi.js` (no additional plugin installations beyond standard `pixi.js` package).
   Your imports will be roughly:

   ```ts
   import {
     Application,
     ResizePlugin,
     TickerPlugin,
     Assets,
     Texture,
     Sprite,
     AnimatedSprite,
     TilingSprite,
     Container,
     Filter,
   } from 'pixi.js';
   ```

8. **Update your Webpack/Rollup/Vite configuration** (if using bundler) to handle `.png`, `.json`, `.svg`, and `.webm` imports.

---

### 👉 Summary of “What You Actually Need” for the **2D Combat Game**:

* **Background PNGs** for Intro/Main Menu & Dojang (with tiling ability).
* **UI Icons** (stances, trigrams, HUD bars, buttons, tooltip arrow).
* **Animated Sprite Sheets (JSON + PNG)** for each technique category (light/medium/heavy/critical/dodge/block/hit/finisher).
* **VFX Sprite Sheets** (dust puffs, blood splatter, neon rings, critical flashes, confetti).
* **Fonts** for Korean headings + Latin/Korean UI text.
* **Localization JSONs** (ko.json, en.json).
* **Pixi.js Modules**: `Application`, `Assets`, `Texture`, `Sprite`, `AnimatedSprite`, `TilingSprite`, `Container`, `Filter` (and their core plugins, `ResizePlugin` & `TickerPlugin`).
* **Audio Files** (organized under `public/assets/audio/…`) that correspond to the SFX calls in your code.

With **exactly** the above assets in place, and the Pixi code boilerplate sketched out, you have **everything required** to run a 2D cyber-Korean combat demo with:

1. A looping intro background + main-menu UI,
2. A tiled Dojang training hall with stance icons & HUD,
3. Fully animated strike/dodge/block/hit/finisher sequences (via `AnimatedSprite`),
4. Synchronized VFX (dust puffs, impact rings, flashes) whenever a technique plays,
5. Crisp UI interaction (buttons, hover, tooltips) with matching “menu\_hover.webm” and “menu\_click.webm” SFX,
6. Real-time background scrolling via `TilingSprite` + `app.ticker` updates.

Once these assets are “checked off,” you can focus purely on **game logic** (hit detection, health/pain states, AI, input mapping) without worrying about missing art or missing Pixi features.


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
