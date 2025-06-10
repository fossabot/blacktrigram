import React, { useState, useEffect, useCallback } from "react";
import * as PIXI from "pixi.js";
import { MenuSection } from "./components/MenuSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ControlsSection } from "./components/ControlsSection";
import { KoreanHeader } from "../ui/base/KoreanHeader";
import { KOREAN_COLORS } from "../../types/constants";
import { GameMode } from "../../types/enums";
import { useAudio } from "../../audio/AudioProvider";

// Responsive dimensions
function useWindowSize() {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

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
  const introMusicStarted = React.useRef(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const { width, height } = useWindowSize();

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

  // Cyberpunk grid and glow background
  const drawBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 1 });
      g.rect(0, 0, width, height);
      g.fill();
      g.setStrokeStyle({
        width: 1,
        color: KOREAN_COLORS.PRIMARY_CYAN,
        alpha: 0.08,
      });
      for (let i = 0; i < width; i += 40) {
        g.moveTo(i, 0);
        g.lineTo(i, height);
      }
      for (let i = 0; i < height; i += 40) {
        g.moveTo(0, i);
        g.lineTo(width, i);
      }
      g.setStrokeStyle({ width: 0 });
    },
    [width, height]
  );

  // Responsive logo size
  const logoSize = Math.min(width, height) * 0.28;

  // Menu vertical position
  const menuY = height / 2 + logoSize * 0.3;

  return (
    <pixiContainer width={width} height={height} data-testid="intro-screen">
      {/* Background */}
      <pixiGraphics draw={drawBackground} />
      {bgTexture && (
        <pixiSprite
          texture={bgTexture}
          x={0}
          y={0}
          width={width}
          height={height}
          alpha={0.35}
          anchor={{ x: 0, y: 0 }}
        />
      )}
      {/* Archetype overlays */}
      {archetypeTextures.length > 0 && (
        <>
          <pixiSprite
            texture={archetypeTextures[0]}
            x={width - 320}
            y={height - 320}
            scale={{ x: 0.45, y: 0.45 }}
            alpha={0.13}
            anchor={{ x: 1, y: 1 }}
          />
          <pixiSprite
            texture={archetypeTextures[1]}
            x={320}
            y={height - 220}
            scale={{ x: 0.38, y: 0.38 }}
            alpha={0.1}
            anchor={{ x: 0, y: 1 }}
          />
          <pixiSprite
            texture={archetypeTextures[2]}
            x={width / 2}
            y={height / 2 + 120}
            scale={{ x: 0.32, y: 0.32 }}
            alpha={0.08}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        </>
      )}
      {/* Large centered logo with cyberpunk glow */}
      {logoTexture && (
        <pixiSprite
          texture={logoTexture}
          x={width / 2}
          y={height / 2 - logoSize * 0.7}
          scale={{ x: logoSize / 256, y: logoSize / 256 }}
          anchor={{ x: 0.5, y: 0.5 }}
          alpha={1}
        />
      )}
      {/* Title below logo */}
      <KoreanHeader
        title={{ korean: "흑괘", english: "Black Trigram" }}
        subtitle={{
          korean: "한국 무술 시뮬레이터",
          english: "Korean Martial Arts Simulator",
        }}
        align="center"
        x={width / 2}
        y={height / 2 - logoSize * 0.25}
      />
      {/* Menu Section */}
      {currentSection === "menu" && (
        <MenuSection
          selectedMode={MENU_ITEMS[selectedMenuIndex].mode}
          onModeSelect={handleMenuClick}
          onStartGame={() =>
            handleMenuClick(MENU_ITEMS[selectedMenuIndex].mode)
          }
          onShowPhilosophy={handleShowPhilosophy}
          onShowControls={handleShowControls}
          width={Math.min(480, width * 0.8)}
          height={Math.max(260, height * 0.32)}
          x={width / 2 - Math.min(480, width * 0.8) / 2}
          y={menuY}
          menuItems={MENU_ITEMS}
        />
      )}
      {currentSection === "philosophy" && (
        <PhilosophySection
          onBack={handleBackToMenu}
          width={width}
          height={height * 0.7}
          y={height * 0.15}
        />
      )}
      {currentSection === "controls" && (
        <ControlsSection
          onBack={handleBackToMenu}
          width={width}
          height={height * 0.7}
          y={height * 0.15}
        />
      )}
      {/* Footer with cyberpunk open source links */}
      <pixiContainer x={width / 2} y={height - 40} anchor={{ x: 0.5, y: 0.5 }}>
        <pixiText
          text="흑괘의 길을 걸어라 - Walk the Path of the Black Trigram"
          style={
            new PIXI.TextStyle({
              fontSize: 14,
              fill: KOREAN_COLORS.ACCENT_CYAN,
              align: "center",
              fontStyle: "italic",
              dropShadow: true,
            })
          }
          x={0}
          y={-18}
          anchor={0.5}
        />
        {/* Open source link */}
        <pixiText
          text="Open source, please support Korean martial arts game"
          style={
            new PIXI.TextStyle({
              fontSize: 13,
              fill: KOREAN_COLORS.SECONDARY_MAGENTA, // Fix: Use SECONDARY_MAGENTA
              align: "center",
              fontWeight: "bold",
              dropShadow: true,
              letterSpacing: 1.2,
            })
          }
          interactive={true}
          onPointerTap={() =>
            window.open("https://github.com/Hack23/blacktrigram", "_blank")
          }
          x={0}
          y={6}
          anchor={0.5}
        />
        {/* By Hack23 link */}
        <pixiText
          text="by Hack23"
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: KOREAN_COLORS.ACCENT_BLUE,
              align: "center",
              fontStyle: "italic",
              dropShadow: true,
              letterSpacing: 1.1,
            })
          }
          interactive={true}
          onPointerTap={() => window.open("https://hack23.com/", "_blank")}
          x={0}
          y={28}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default IntroScreen;
