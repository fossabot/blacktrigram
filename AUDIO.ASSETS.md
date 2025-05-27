# Audio Assets

This document outlines the structure and organization of audio assets for the Black Trigram game.

## Directory Structure

The audio assets are located within the `public/assets/audio/` directory and are organized as follows:

```
public/assets/audio/
├── sfx/              # Sound effects
│   ├── menu_*.webm   # Menu interactions (e.g., button clicks, navigation sounds)
│   ├── attack_*.webm # Combat-related attack sounds (e.g., punches, kicks, special moves)
│   ├── hit_*.webm    # Sounds for impacts and hits (e.g., successful block, character taking damage)
│   └── ambient_*.webm # Environmental and ambient background sounds (e.g., wind, dojo sounds)
└── music/            # Background music
    ├── intro_theme.webm   # Music for the game's introduction or main menu
    ├── combat_theme.webm  # Music for active combat sequences
    └── victory_theme.webm # Music played upon winning a match or completing a challenge
```

## File Format

All audio assets should be in the `.webm` format for optimal web performance and compatibility.

## Naming Conventions

- **Sound Effects (sfx):**
    - `menu_*.webm`: For menu interactions. Examples: `menu_click.webm`, `menu_navigate.webm`.
    - `attack_*.webm`: For combat attacks. Examples: `attack_punch_light.webm`, `attack_kick_heavy.webm`, `attack_special_geon.webm`.
    - `hit_*.webm`: For impact sounds. Examples: `hit_flesh.webm`, `hit_block.webm`, `hit_critical.webm`.
    - `ambient_*.webm`: For ambient sounds. Examples: `ambient_dojo.webm`, `ambient_wind.webm`.
- **Music:**
    - Descriptive names like `intro_theme.webm`, `combat_theme_geon.webm`, `victory_theme.webm`.

## Guidelines

- Keep audio files optimized for web (consider file size vs. quality).
- Ensure consistent volume levels across similar types of sounds.
- Use stereo or mono appropriately based on the sound type (e.g., music in stereo, some SFX in mono).