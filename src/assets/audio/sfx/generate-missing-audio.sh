#!/bin/bash

echo "🎵 Generating Missing Audio Files for Black Trigram"
echo "=================================================="

# Set base directory
SFX_DIR="public/assets/audio/sfx"
MUSIC_DIR="public/assets/audio/music"

# Function to generate placeholder WebM files using ffmpeg
generate_placeholder_audio() {
    local output_file="$1"
    local duration="$2"
    local frequency="$3"
    local description="$4"
    
    if [[ ! -f "$output_file" ]]; then
        echo "🔧 Generating: $output_file ($description)"
        
        # Generate tone using ffmpeg
        ffmpeg -f lavfi -i "sine=frequency=${frequency}:duration=${duration}" \
               -c:a libopus -b:a 64k \
               -af "volume=0.3,afade=in:st=0:d=0.1,afade=out:st=$((duration-1)):d=0.1" \
               "$output_file" -y 2>/dev/null
        
        if [[ $? -eq 0 ]]; then
            echo "  ✅ Created: $output_file"
        else
            echo "  ❌ Failed: $output_file"
        fi
    else
        echo "  ⏭️  Exists: $output_file"
    fi
}

# Function to convert WebM to MP3
convert_to_mp3() {
    local webm_file="$1"
    local mp3_file="${webm_file%.webm}.mp3"
    
    if [[ -f "$webm_file" && ! -f "$mp3_file" ]]; then
        echo "🔄 Converting: $webm_file -> $mp3_file"
        ffmpeg -i "$webm_file" -c:a libmp3lame -b:a 128k "$mp3_file" -y 2>/dev/null
        
        if [[ $? -eq 0 ]]; then
            echo "  ✅ Converted: $mp3_file"
        else
            echo "  ❌ Failed conversion: $mp3_file"
        fi
    fi
}

echo ""
echo "🎯 Generating missing sound effects..."

# Menu sounds (traditional Korean instrument inspired)
generate_placeholder_audio "$SFX_DIR/menu/menu_hover.webm" 0.15 800 "Menu hover - wood block"
generate_placeholder_audio "$SFX_DIR/menu/menu_select.webm" 0.25 1000 "Menu select - bamboo flute"
generate_placeholder_audio "$SFX_DIR/menu/menu_back.webm" 0.20 600 "Menu back - soft gong"

# Combat sounds (varying intensity)
generate_placeholder_audio "$SFX_DIR/combat/attack_light.webm" 0.12 400 "Light attack - swift cut"
generate_placeholder_audio "$SFX_DIR/combat/attack_medium.webm" 0.18 300 "Medium attack - focused energy"
generate_placeholder_audio "$SFX_DIR/combat/attack_heavy.webm" 0.25 200 "Heavy attack - thunder impact"
generate_placeholder_audio "$SFX_DIR/combat/attack_critical.webm" 0.35 150 "Critical attack - vital point"

# Hit sounds (impact feedback)
generate_placeholder_audio "$SFX_DIR/hits/hit_light.webm" 0.08 500 "Light hit - glancing"
generate_placeholder_audio "$SFX_DIR/hits/hit_medium.webm" 0.12 350 "Medium hit - solid"
generate_placeholder_audio "$SFX_DIR/hits/hit_heavy.webm" 0.18 250 "Heavy hit - devastating"
generate_placeholder_audio "$SFX_DIR/hits/hit_critical.webm" 0.25 180 "Critical hit - vital point"

# Block sounds
generate_placeholder_audio "$SFX_DIR/blocks/block_success.webm" 0.15 600 "Successful block"
generate_placeholder_audio "$SFX_DIR/blocks/block_break.webm" 0.22 400 "Block broken"

# Movement sounds
generate_placeholder_audio "$SFX_DIR/movement/stance_change.webm" 0.30 450 "Stance transition"
generate_placeholder_audio "$SFX_DIR/movement/dodge.webm" 0.10 700 "Evasive movement"

# Ki energy sounds
generate_placeholder_audio "$SFX_DIR/ki_energy/ki_charge.webm" 1.50 300 "Ki energy building"
generate_placeholder_audio "$SFX_DIR/ki_energy/ki_release.webm" 0.40 250 "Ki energy burst"
generate_placeholder_audio "$SFX_DIR/ki_energy/energy_pulse.webm" 0.30 350 "Energy wave"

# Match sounds
generate_placeholder_audio "$SFX_DIR/match/match_start.webm" 1.20 200 "Temple bell - match start"

# Special sounds
generate_placeholder_audio "$SFX_DIR/special/perfect_strike.webm" 0.50 220 "Perfect technique"

# Status sounds
generate_placeholder_audio "$SFX_DIR/status/health_low.webm" 0.80 80 "Low health warning"
generate_placeholder_audio "$SFX_DIR/status/stamina_depleted.webm" 0.60 120 "Stamina exhausted"

# Environmental sounds
generate_placeholder_audio "$SFX_DIR/environment/dojang_ambience.webm" 10.0 60 "Peaceful dojang atmosphere"
generate_placeholder_audio "$SFX_DIR/environment/wind_effect.webm" 8.0 100 "Gentle wind"

echo ""
echo "🎼 Generating missing music tracks..."

# Music tracks (longer duration, more complex)
generate_placeholder_audio "$MUSIC_DIR/intro_theme.webm" 120.0 220 "Contemplative Korean traditional"
generate_placeholder_audio "$MUSIC_DIR/menu_theme.webm" 90.0 250 "Traditional Korean melody"
generate_placeholder_audio "$MUSIC_DIR/combat_theme.webm" 180.0 180 "Intense combat rhythm"
generate_placeholder_audio "$MUSIC_DIR/victory_theme.webm" 30.0 300 "Triumphant victory"
generate_placeholder_audio "$MUSIC_DIR/training_theme.webm" 240.0 200 "Focused meditation"
generate_placeholder_audio "$MUSIC_DIR/meditation_theme.webm" 300.0 150 "Deep contemplative"

echo ""
echo "🔄 Converting WebM files to MP3..."

# Convert all generated WebM files to MP3
find "$SFX_DIR" -name "*.webm" | while read webm_file; do
    convert_to_mp3 "$webm_file"
done

find "$MUSIC_DIR" -name "*.webm" | while read webm_file; do
    convert_to_mp3 "$webm_file"
done

echo ""
echo "📊 Generation complete! Summary:"
echo "==============================="

webm_count=$(find "public/assets/audio" -name "*.webm" | wc -l)
mp3_count=$(find "public/assets/audio" -name "*.mp3" | wc -l)

echo "WebM files: $webm_count"
echo "MP3 files: $mp3_count"
echo ""
echo "✅ All missing audio files have been generated!"
echo "🎯 Ready for AudioManager testing"
