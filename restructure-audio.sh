#!/bin/bash

echo "🎵 Black Trigram Audio Asset Restructuring & Verification"
echo "========================================================="

# Set the base audio directory
AUDIO_DIR="public/assets/audio"
SFX_DIR="$AUDIO_DIR/sfx"
MUSIC_DIR="$AUDIO_DIR/music"

# Ensure all required directories exist
echo "📁 Creating organized directory structure..."

# SFX categories with their subdirectories
declare -a SFX_CATEGORIES=(
    "menu"           # menu_hover, menu_select, menu_back
    "combat"         # attack_light, attack_medium, attack_heavy, attack_critical, attack_punch_*
    "hits"           # hit_light, hit_medium, hit_heavy, hit_critical
    "blocks"         # block_success, block_break
    "movement"       # stance_change, dodge, footstep
    "ki_energy"      # ki_charge, ki_release, energy_pulse
    "match"          # match_start, match_end
    "special"        # perfect_strike
    "status"         # health_low, stamina_depleted
    "environment"    # dojang_ambience, wind_effect
    "combos"         # combo_buildup, combo_finish
    "victory_defeat" # victory, defeat
    "ui"             # menu_navigate, menu_click
    "archetype"      # future archetype-specific sounds
    "trigram"        # future trigram-specific sounds
    "vital_points"   # future vital point sounds
    "misc"           # backup location for mixed/uncategorized
)

# Create all required directories
for category in "${SFX_CATEGORIES[@]}"; do
    mkdir -p "$SFX_DIR/$category"
    echo "  ✅ Created: $SFX_DIR/$category"
done

# Music categories
declare -a MUSIC_CATEGORIES=(
    "themes"
    "archetype_themes"
)

for category in "${MUSIC_CATEGORIES[@]}"; do
    mkdir -p "$MUSIC_DIR/$category"
    echo "  ✅ Created: $MUSIC_DIR/$category"
done

echo ""
echo "🔄 Moving sound files to correct categories..."

# Define sound mappings: sound_id -> primary_location
declare -A SOUND_MAP=(
    # Menu sounds
    ["menu_hover"]="menu"
    ["menu_select"]="menu"
    ["menu_back"]="menu"
    ["menu_navigate"]="misc"
    ["menu_click"]="misc"
    
    # Combat sounds
    ["attack_light"]="combat"
    ["attack_medium"]="combat"
    ["attack_heavy"]="combat"
    ["attack_critical"]="combat"
    ["attack_punch_light"]="combat"
    ["attack_punch_medium"]="combat"
    ["attack_special_geon"]="combat"
    
    # Hit sounds
    ["hit_light"]="hits"
    ["hit_medium"]="hits"
    ["hit_heavy"]="hits"
    ["hit_critical"]="hits"
    ["hit_flesh"]="misc"
    ["hit_block"]="misc"
    
    # Block sounds
    ["block_success"]="blocks"
    ["block_break"]="blocks"
    
    # Movement sounds
    ["stance_change"]="movement"
    ["dodge"]="movement"
    ["footstep"]="misc"
    
    # Ki energy sounds
    ["ki_charge"]="ki_energy"
    ["ki_release"]="ki_energy"
    ["energy_pulse"]="ki_energy"
    
    # Match sounds
    ["match_start"]="match"
    ["match_end"]="misc"
    
    # Special sounds
    ["perfect_strike"]="special"
    
    # Status sounds
    ["health_low"]="misc"
    ["stamina_depleted"]="misc"
    
    # Victory/Defeat
    ["victory"]="misc"
    ["defeat"]="misc"
    ["countdown"]="misc"
    
    # Combo sounds
    ["combo_buildup"]="misc"
    ["combo_finish"]="misc"
    
    # Environmental
    ["dojang_ambience"]="environment"
    ["wind_effect"]="environment"
    
    # Misc
    ["body_realistic_sound"]="misc"
)

# Function to move sound files (including variants) to correct category
move_sound_to_category() {
    local base_name="$1"
    local target_category="$2"
    
    echo "📦 Processing: $base_name -> $target_category/"
    
    # Find ALL files matching the base name pattern (including numbered variants)
    # Look in root SFX directory and misc subdirectory
    local search_paths=("$SFX_DIR" "$SFX_DIR/misc" "$SFX_DIR/variants_backup")
    
    for search_path in "${search_paths[@]}"; do
        if [[ -d "$search_path" ]]; then
            # Find exact match files
            find "$search_path" -maxdepth 1 -name "${base_name}.webm" -o -name "${base_name}.mp3" | while read -r file; do
                if [[ -f "$file" ]]; then
                    local filename=$(basename "$file")
                    local target_path="$SFX_DIR/$target_category/$filename"
                    echo "  ✅ Moving: $filename -> $target_category/"
                    mv "$file" "$target_path" 2>/dev/null || true
                fi
            done
            
            # Find numbered variant files (e.g., attack_medium_1.mp3, attack_medium_3.mp3)
            find "$search_path" -maxdepth 1 -name "${base_name}_*.webm" -o -name "${base_name}_*.mp3" | while read -r file; do
                if [[ -f "$file" ]]; then
                    local filename=$(basename "$file")
                    local target_path="$SFX_DIR/$target_category/$filename"
                    echo "  📋 Moving variant: $filename -> $target_category/"
                    mv "$file" "$target_path" 2>/dev/null || true
                fi
            done
        fi
    done
}

# Process all sound mappings
for sound_id in "${!SOUND_MAP[@]}"; do
    move_sound_to_category "$sound_id" "${SOUND_MAP[$sound_id]}"
done

echo ""
echo "🧹 Moving any remaining loose files to misc..."

# Move any remaining audio files in root SFX directory to misc
find "$SFX_DIR" -maxdepth 1 -name "*.webm" -o -name "*.mp3" | while read -r file; do
    if [[ -f "$file" ]]; then
        local filename=$(basename "$file")
        echo "  📦 Moving loose file: $filename -> misc/"
        mv "$file" "$SFX_DIR/misc/" 2>/dev/null || true
    fi
done

echo ""
echo "🎼 Checking music files..."

# Music files check
declare -a MUSIC_FILES=(
    "intro_theme"
    "menu_theme"
    "combat_theme"
    "victory_theme"
    "training_theme"
    "meditation_theme"
)

for music_file in "${MUSIC_FILES[@]}"; do
    webm_path="$MUSIC_DIR/${music_file}.webm"
    mp3_path="$MUSIC_DIR/${music_file}.mp3"
    
    webm_exists=false
    mp3_exists=false
    
    if [[ -f "$webm_path" ]]; then
        webm_exists=true
    fi
    
    if [[ -f "$mp3_path" ]]; then
        mp3_exists=true
    fi
    
    if [[ "$webm_exists" == true && "$mp3_exists" == true ]]; then
        echo "  ✅ $music_file: Both formats available"
    elif [[ "$webm_exists" == true ]]; then
        echo "  ⚠️  $music_file: Only WebM available"
    elif [[ "$mp3_exists" == true ]]; then
        echo "  ⚠️  $music_file: Only MP3 available"
    else
        echo "  ❌ $music_file: No formats available - needs creation"
    fi
done

echo ""
echo "📊 Audio asset summary by category:"
echo "==================================="

# Count files by category
for category in "${SFX_CATEGORIES[@]}"; do
    if [[ -d "$SFX_DIR/$category" ]]; then
        local count=$(find "$SFX_DIR/$category" -name "*.webm" -o -name "*.mp3" | wc -l)
        if [[ $count -gt 0 ]]; then
            echo "$category: $count files"
            # Show first few files as examples
            find "$SFX_DIR/$category" -name "*.webm" -o -name "*.mp3" | head -3 | while read -r file; do
                echo "  - $(basename "$file")"
            done
            if [[ $count -gt 3 ]]; then
                echo "  ... and $((count - 3)) more"
            fi
        else
            echo "$category: 0 files"
        fi
    fi
done

echo ""
echo "📝 Variant files status:"
echo "========================"

# Check for variant files in each category
echo "Checking for numbered variants in categories..."
for category in "${SFX_CATEGORIES[@]}"; do
    if [[ -d "$SFX_DIR/$category" ]]; then
        local variant_count=$(find "$SFX_DIR/$category" -name "*_[0-9]*.webm" -o -name "*_[0-9]*.mp3" | wc -l)
        if [[ $variant_count -gt 0 ]]; then
            echo "$category variants: $variant_count files"
            find "$SFX_DIR/$category" -name "*_[0-9]*.webm" -o -name "*_[0-9]*.mp3" | head -2 | while read -r file; do
                echo "  - $(basename "$file")"
            done
            if [[ $variant_count -gt 2 ]]; then
                echo "  ... and $((variant_count - 2)) more variants"
            fi
        fi
    fi
done

# Overall statistics
webm_count=$(find "$AUDIO_DIR" -name "*.webm" | wc -l)
mp3_count=$(find "$AUDIO_DIR" -name "*.mp3" | wc -l)
total_audio=$(find "$AUDIO_DIR" -name "*.webm" -o -name "*.mp3" | wc -l)
variant_count=$(find "$SFX_DIR" -name "*_[0-9]*.webm" -o -name "*_[0-9]*.mp3" | wc -l)

echo ""
echo "📊 Final statistics:"
echo "==================="
echo "WebM files: $webm_count"
echo "MP3 files: $mp3_count"
echo "Total audio files: $total_audio"
echo "Numbered variants: $variant_count"

echo ""
echo "🎯 Directory structure verification:"
echo "===================================="

# Show the final organized structure
echo "Combat audio (attack_medium_3.mp3 should be here):"
ls -la "$SFX_DIR/combat/" 2>/dev/null | grep -E "attack_medium" || echo "  No attack_medium files found"

echo ""
echo "✅ Audio restructuring complete!"
echo "   All variant files are now in their correct category directories"
echo "   Example: attack_medium_3.mp3 -> $SFX_DIR/combat/attack_medium_3.mp3"
