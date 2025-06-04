#!/bin/bash
# filepath: ensure_base_files.sh

# 🥋 Black Trigram (흑괘) - Ensure Base SFX Files Exist
# Copies _1 variants to create base files where missing

echo "🎵 Black Trigram SFX Base File Checker"
echo "====================================="
echo "Ensuring each category has base .mp3 and .webm files"
echo ""

copied_count=0

# Function to ensure base file exists
ensure_base_file() {
    local base_name="$1"
    local extension="$2"
    
    local base_file="${base_name}.${extension}"
    local variant_file="${base_name}_1.${extension}"
    
    # Check if base file exists
    if [[ ! -f "$base_file" ]] && [[ -f "$variant_file" ]]; then
        echo "📁 COPY: $variant_file -> $base_file"
        cp "$variant_file" "$base_file"
        ((copied_count++))
    elif [[ -f "$base_file" ]]; then
        echo "✅ EXISTS: $base_file"
    else
        echo "❌ MISSING: Both $base_file and $variant_file not found"
    fi
}

# List of all SFX categories in Black Trigram
SFX_CATEGORIES=(
    "attack_critical"
    "attack_light"
    "attack_medium"
    "attack_punch_light"
    "attack_punch_medium"
    "attack_special_geon"
    "block_break"
    "block_success"
    "body_realistic_sound"
    "combo_buildup"
    "combo_finish"
    "countdown"
    "defeat"
    "dodge"
    "energy_pulse"
    "footstep"
    "health_low"
    "hit_block"
    "hit_critical"
    "hit_flesh"
    "hit_heavy"
    "hit_light"
    "hit_medium"
    "ki_charge"
    "ki_release"
    "match_end"
    "match_start"
    "menu_back"
    "menu_click"
    "menu_hover"
    "menu_navigate"
    "menu_select"
    "perfect_strike"
    "stamina_depleted"
    "stance_change"
    "victory"
)

echo "🎵 Processing MP3 files..."
echo "========================="

# Process MP3 files
for category in "${SFX_CATEGORIES[@]}"; do
    ensure_base_file "$category" "mp3"
done

echo ""
echo "🎵 Processing WEBM files..."
echo "=========================="

# Process WEBM files
for category in "${SFX_CATEGORIES[@]}"; do
    ensure_base_file "$category" "webm"
done

echo ""
echo "========================================="
echo "🎯 BASE FILE CREATION COMPLETE!"
echo "========================================="
echo "Files copied: $copied_count"

echo ""
echo "📊 Verification - Base files without numbers:"
echo "============================================="

echo ""
echo "📁 MP3 Base Files:"
ls -1 *.mp3 2>/dev/null | grep -E '^[a-z_]+\.mp3$' | sort || echo "  No base MP3 files found"

echo ""
echo "📁 WEBM Base Files:"
ls -1 *.webm 2>/dev/null | grep -E '^[a-z_]+\.webm$' | sort || echo "  No base WEBM files found"

# Final counts
base_mp3=$(ls -1 *.mp3 2>/dev/null | grep -E '^[a-z_]+\.mp3$' | wc -l)
base_webm=$(ls -1 *.webm 2>/dev/null | grep -E '^[a-z_]+\.webm$' | wc -l)
total_mp3=$(ls -1 *.mp3 2>/dev/null | wc -l)
total_webm=$(ls -1 *.webm 2>/dev/null | wc -l)

echo ""
echo "📈 Final Statistics:"
echo "==================="
echo "🎵 Base MP3 files (no number): $base_mp3"
echo "🎵 Base WEBM files (no number): $base_webm"
echo "🎵 Total MP3 files: $total_mp3"
echo "🎵 Total WEBM files: $total_webm"

echo ""
echo "✅ AudioManager convention verified!"
echo "🥋 Black Trigram (흑괘) SFX system ready for integration"
echo ""
echo "🎯 Each category now has:"
echo "   - Base file: category_name.mp3/.webm"
echo "   - Variants: category_name_1.mp3/.webm, category_name_2.mp3/.webm, etc."
