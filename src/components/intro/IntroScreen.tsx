import React, { useState, useEffect, useCallback, useRef } from "react";
import * as PIXI from "pixi.js";
import { MenuSection } from "./components/MenuSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ControlsSection } from "./components/ControlsSection";
import { KoreanHeader } from "../ui/base/KoreanHeader";
import { KOREAN_COLORS } from "../../types/constants";
import { GameMode } from "../../types/enums";
import { useAudio } from "../../audio/AudioProvider";

export interface IntroScreenProps {
  readonly onMenuSelect: (mode: GameMode) => void;
}

const MENU_ITEMS: { mode: GameMode; korean: string; english: string }[] = [
  { mode: GameMode.VERSUS, korean: "대전", english: "Versus" },
  { mode: GameMode.TRAINING, korean: "훈련", english: "Training" },
  { mode: GameMode.PRACTICE, korean: "연습", english: "Practice" },
];

export const IntroScreen: React.FC<IntroScreenProps> = ({ onMenuSelect }) => {
  const audio = useAudio();
  const [currentSection, setCurrentSection] = useState<string>("menu");
  const [bgTexture, setBgTexture] = useState<PIXI.Texture | null>(null);
  const [logoTexture, setLogoTexture] = useState<PIXI.Texture | null>(null);
  const [archetypeTextures, setArchetypeTextures] = useState<PIXI.Texture[]>(
    []
  );
  const introMusicStarted = useRef(false);

  // Menu navigation state
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  // Load background and logo images using PIXI.Assets (PixiJS v7+)
  useEffect(() => {
    let destroyed = false;
    const loadAssets = async () => {
      try {
        const [bg, logo, archetype1, archetype2, archetype3] =
          await Promise.all([
            PIXI.Assets.load("/assets/visual/bg/intro/intro_bg_loop.png"),
            PIXI.Assets.load("/assets/visual/logo/black-trigram-256.png"),
            PIXI.Assets.load(
              "/assets/visual/bg/archetyples/CyberpunkTeamDynamics.png"
            ),
            PIXI.Assets.load(
              "/assets/visual/bg/archetyples/PlayerArchetypesExplained.png"
            ),
            PIXI.Assets.load(
              "/assets/visual/bg/archetyples/PlayerArchetypesOverview.png"
            ),
          ]);
        if (destroyed) return;
        setBgTexture(bg as PIXI.Texture);
        setLogoTexture(logo as PIXI.Texture);
        setArchetypeTextures(
          [archetype1, archetype2, archetype3].filter(Boolean) as PIXI.Texture[]
        );
      } catch (err) {
        console.warn("Failed to load intro assets", err);
      }
    };
    loadAssets();
    return () => {
      destroyed = true;
    };
  }, []);

  // Play intro music after first user interaction
  useEffect(() => {
    const startMusic = () => {
      if (audio.isInitialized && !introMusicStarted.current) {
        introMusicStarted.current = true;
        audio.playMusic("intro_theme");
      }
      window.removeEventListener("keydown", startMusic);
      window.removeEventListener("mousedown", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
    window.addEventListener("keydown", startMusic, { once: true });
    window.addEventListener("mousedown", startMusic, { once: true });
    window.addEventListener("touchstart", startMusic, { once: true });
    return () => {
      window.removeEventListener("keydown", startMusic);
      window.removeEventListener("mousedown", startMusic);
      window.removeEventListener("touchstart", startMusic);
      audio.stopMusic();
    };
    // eslint-disable-next-line
  }, [audio.isInitialized, audio]);

  // Keyboard input for menu navigation and controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentSection !== "menu" && event.key === "Escape") {
        setCurrentSection("menu");
        audio.playSoundEffect("menu_back");
        return;
      }
      if (currentSection === "menu") {
        if (event.key === "ArrowUp") {
          setSelectedMenuIndex((prev) => {
            const next = prev === 0 ? MENU_ITEMS.length - 1 : prev - 1;
            audio.playSoundEffect("menu_hover");
            return next;
          });
        } else if (event.key === "ArrowDown") {
          setSelectedMenuIndex((prev) => {
            const next = prev === MENU_ITEMS.length - 1 ? 0 : prev + 1;
            audio.playSoundEffect("menu_hover");
            return next;
          });
        } else if (event.key === " " || event.key === "Enter") {
          audio.playSoundEffect("menu_select");
          onMenuSelect(MENU_ITEMS[selectedMenuIndex].mode);
        } else {
          switch (event.key) {
            case "1":
              setSelectedMenuIndex(0);
              audio.playSoundEffect("menu_hover");
              audio.playSoundEffect("menu_select");
              onMenuSelect(GameMode.VERSUS);
              break;
            case "2":
              setSelectedMenuIndex(1);
              audio.playSoundEffect("menu_hover");
              audio.playSoundEffect("menu_select");
              onMenuSelect(GameMode.TRAINING);
              break;
            case "3":
              setSelectedMenuIndex(2);
              audio.playSoundEffect("menu_hover");
              audio.playSoundEffect("menu_select");
              onMenuSelect(GameMode.PRACTICE);
              break;
            case "F1":
              setCurrentSection("controls");
              audio.playSoundEffect("menu_select");
              break;
            case "4":
              setCurrentSection("philosophy");
              audio.playSoundEffect("menu_select");
              break;
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onMenuSelect, currentSection, audio, selectedMenuIndex]);

  // Menu click handler with audio feedback
  const handleMenuClick = useCallback(
    (mode: GameMode) => {
      const idx = MENU_ITEMS.findIndex((item) => item.mode === mode);
      setSelectedMenuIndex(idx >= 0 ? idx : 0);
      audio.playSoundEffect("menu_select");
      onMenuSelect(mode);
    },
    [onMenuSelect, audio]
  );

  // Section navigation with audio feedback
  const handleShowPhilosophy = useCallback(() => {
    setCurrentSection("philosophy");
    audio.playSoundEffect("menu_select");
  }, [audio]);
  const handleShowControls = useCallback(() => {
    setCurrentSection("controls");
    audio.playSoundEffect("menu_select");
  }, [audio]);
  const handleBackToMenu = useCallback(() => {
    setCurrentSection("menu");
    audio.playSoundEffect("menu_back");
  }, [audio]);

  // Draws the intro background with art assets
  const drawBackground = useCallback((g: PIXI.Graphics) => {
    g.clear();
    // Fill with dark color as fallback
    g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 1 });
    g.rect(0, 0, 1200, 800);
    g.fill();
    // Cyberpunk grid overlay
    g.setStrokeStyle({
      width: 1,
      color: KOREAN_COLORS.PRIMARY_CYAN,
      alpha: 0.08,
    });
    for (let i = 0; i < 1200; i += 40) {
      g.moveTo(i, 0);
      g.lineTo(i, 800);
    }
    for (let i = 0; i < 800; i += 40) {
      g.moveTo(0, i);
      g.lineTo(1200, i);
    }
    g.setStrokeStyle({ width: 0 });
  }, []);

  return (
    <pixiContainer
      width={1200}
      height={800}
      data-testid="intro-screen"
      tabIndex={0}
    >
      {/* Layered background: grid, bg image, archetype overlays */}
      <pixiGraphics draw={drawBackground} />
      {bgTexture && (
        <pixiSprite
          texture={bgTexture}
          x={0}
          y={0}
          width={1200}
          height={800}
          alpha={0.4}
          anchor={{ x: 0, y: 0 }}
        />
      )}
      {archetypeTextures.length > 0 && (
        <>
          <pixiSprite
            texture={archetypeTextures[0]}
            x={1200 - 320}
            y={800 - 320}
            scale={{ x: 0.45, y: 0.45 }}
            alpha={0.18}
            anchor={{ x: 1, y: 1 }}
          />
          <pixiSprite
            texture={archetypeTextures[1]}
            x={320}
            y={800 - 220}
            scale={{ x: 0.38, y: 0.38 }}
            alpha={0.13}
            anchor={{ x: 0, y: 1 }}
          />
          <pixiSprite
            texture={archetypeTextures[2]}
            x={1200 / 2}
            y={800 / 2 + 120}
            scale={{ x: 0.32, y: 0.32 }}
            alpha={0.1}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        </>
      )}
      {logoTexture && (
        <pixiSprite
          texture={logoTexture}
          x={600}
          y={180}
          scale={{ x: 0.45, y: 0.45 }}
          anchor={{ x: 0.5, y: 0.5 }}
          alpha={1}
        />
      )}
      <KoreanHeader
        title={{ korean: "흑괘", english: "Black Trigram" }}
        subtitle={{
          korean: "한국 무술 시뮬레이터",
          english: "Korean Martial Arts Simulator",
        }}
        align="center"
        x={600}
        y={80}
      />
      {/* Current Section */}
      {(() => {
        switch (currentSection) {
          case "philosophy":
            return (
              <PhilosophySection
                onBack={handleBackToMenu}
                width={1200}
                height={600}
                y={100}
              />
            );
          case "controls":
            return (
              <ControlsSection
                onBack={handleBackToMenu}
                width={1200}
                height={600}
                y={100}
              />
            );
          default:
            return (
              <MenuSection
                selectedMode={MENU_ITEMS[selectedMenuIndex].mode}
                onModeSelect={handleMenuClick}
                onStartGame={() =>
                  handleMenuClick(MENU_ITEMS[selectedMenuIndex].mode)
                }
                onShowPhilosophy={handleShowPhilosophy}
                onShowControls={handleShowControls}
                width={1200}
                height={600}
                y={100}
              />
            );
        }
      })()}
      {/* Footer */}
      <pixiText
        text="흑괘의 길을 걸어라 - Walk the Path of the Black Trigram"
        style={
          new PIXI.TextStyle({
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_TERTIARY,
            align: "center",
            fontStyle: "italic",
          })
        }
        x={600}
        y={770}
        anchor={0.5}
      />
    </pixiContainer>
  );
};

export default IntroScreen;
