import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const introMusicStarted = useRef(false);
  const [currentSection, setCurrentSection] = useState<string>("menu");
  const [bgTexture, setBgTexture] = useState<PIXI.Texture | null>(null);
  const [logoTexture, setLogoTexture] = useState<PIXI.Texture | null>(null);
  const [dojangWallTexture, setDojangWallTexture] =
    useState<PIXI.Texture | null>(null);
  const [archetypeTextures, setArchetypeTextures] = useState<{
    overview: PIXI.Texture | null;
    explained: PIXI.Texture | null;
    dynamics: PIXI.Texture | null;
  }>({ overview: null, explained: null, dynamics: null });
  const [selectedArchetype, setSelectedArchetype] = useState(0);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const { width, height } = useWindowSize();

  // Enhanced asset loading with all available textures
  useEffect(() => {
    let destroyed = false;
    const loadAssets = async () => {
      try {
        const [
          bg,
          logo,
          dojangWall,
          archetypeOverview,
          archetypeExplained,
          archetypeDynamics,
        ] = await Promise.all([
          PIXI.Assets.load("/src/assets/visual/bg/intro/intro_bg_loop.png"),
          PIXI.Assets.load("/src/assets/visual/logo/black-trigram.png"), // Use larger logo
          PIXI.Assets.load("/src/assets/dojang_wall_neon_flicker.png"),
          PIXI.Assets.load(
            "/src/assets/visual/bg/archetyples/PlayerArchetypesOverview.png"
          ),
          PIXI.Assets.load(
            "/src/assets/visual/bg/archetyples/PlayerArchetypesExplained.png"
          ),
          PIXI.Assets.load(
            "/src/assets/visual/bg/archetyples/CyberpunkTeamDynamics.png"
          ),
        ]);
        if (destroyed) return;
        setBgTexture(bg as PIXI.Texture);
        setLogoTexture(logo as PIXI.Texture);
        setDojangWallTexture(dojangWall as PIXI.Texture);
        setArchetypeTextures({
          overview: archetypeOverview as PIXI.Texture,
          explained: archetypeExplained as PIXI.Texture,
          dynamics: archetypeDynamics as PIXI.Texture,
        });
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

  // Responsive logo and layout calculations
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const logoSize = isMobile
    ? Math.min(width, height) * 0.35
    : isTablet
    ? Math.min(width, height) * 0.25
    : Math.min(width, height) * 0.2;

  const menuStartY = height * (isMobile ? 0.65 : isTablet ? 0.6 : 0.55);

  // Enhanced cyberpunk background with neon grid
  const drawEnhancedBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Base dark gradient
      const gradient = new PIXI.FillGradient(0, 0, width, height);
      gradient.addColorStop(0, 0x0a0a0f);
      gradient.addColorStop(0.5, 0x1a1a2e);
      gradient.addColorStop(1, 0x0f0f23);
      g.fill(gradient);
      g.rect(0, 0, width, height);
      g.fill();

      // Cyberpunk neon grid
      g.stroke({ width: 1, color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.15 });
      const gridSize = isMobile ? 30 : 40;
      for (let i = 0; i < width; i += gridSize) {
        g.moveTo(i, 0);
        g.lineTo(i, height);
      }
      for (let i = 0; i < height; i += gridSize) {
        g.moveTo(0, i);
        g.lineTo(width, i);
      }
      g.stroke();

      // Pulsing accent lines
      g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.3 });
      g.moveTo(0, height * 0.2);
      g.lineTo(width, height * 0.2);
      g.moveTo(0, height * 0.8);
      g.lineTo(width, height * 0.8);
      g.stroke();
    },
    [width, height, isMobile]
  );

  return (
    <pixiContainer width={width} height={height} data-testid="intro-screen">
      {/* Enhanced Background Layers */}
      <pixiGraphics
        draw={drawEnhancedBackground}
        data-testid="intro-background"
      />

      {/* Main background texture */}
      {bgTexture && (
        <pixiSprite
          texture={bgTexture}
          x={0}
          y={0}
          width={width}
          height={height}
          alpha={0.4}
          data-testid="intro-bg-texture"
        />
      )}

      {/* Dojang wall accent texture */}
      {dojangWallTexture && (
        <pixiSprite
          texture={dojangWallTexture}
          x={width * 0.8}
          y={0}
          width={width * 0.3}
          height={height}
          alpha={0.2}
          data-testid="dojang-wall-accent"
        />
      )}

      {/* Large Logo Section - Responsive positioning */}
      <pixiContainer
        x={width / 2}
        y={height * (isMobile ? 0.25 : 0.3)}
        data-testid="logo-section"
      >
        {logoTexture && (
          <pixiSprite
            texture={logoTexture}
            x={0}
            y={0}
            scale={{ x: logoSize / 512, y: logoSize / 512 }} // Assuming 512px source
            anchor={{ x: 0.5, y: 0.5 }}
            alpha={1}
            data-testid="main-logo"
          />
        )}

        {/* Enhanced glow effect around logo */}
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.circle(0, 0, logoSize * 0.6);
            g.fill({
              color: KOREAN_COLORS.PRIMARY_CYAN,
              alpha: 0.1,
            });
            g.circle(0, 0, logoSize * 0.8);
            g.stroke({
              width: 2,
              color: KOREAN_COLORS.ACCENT_GOLD,
              alpha: 0.6,
            });
          }}
          data-testid="logo-glow-effect"
        />

        {/* Trigram Symbols with Better Spacing */}
        <pixiContainer y={logoSize * 0.7} data-testid="trigram-symbols">
          <pixiText
            text="☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷"
            style={{
              fontSize: isMobile ? 20 : 28,
              fill: KOREAN_COLORS.PRIMARY_CYAN,
              align: "center",
              letterSpacing: isMobile ? 8 : 12,
            }}
            anchor={0.5}
            data-testid="trigram-symbols-text"
          />
        </pixiContainer>
      </pixiContainer>

      {/* Enhanced Title with Better Typography */}
      <KoreanHeader
        title={{ korean: "흑괘", english: "Black Trigram" }}
        subtitle={{
          korean: "한국 무술 시뮬레이터",
          english: "Korean Martial Arts Simulator",
        }}
        align="center"
        x={width / 2}
        y={height * (isMobile ? 0.45 : 0.48)}
        data-testid="main-title"
      />

      {/* Main Menu Section - Responsive Layout */}
      {currentSection === "menu" && (
        <>
          <MenuSection
            selectedMode={MENU_ITEMS[selectedMenuIndex].mode}
            onModeSelect={handleMenuClick}
            onStartGame={() =>
              handleMenuClick(MENU_ITEMS[selectedMenuIndex].mode)
            }
            onShowPhilosophy={handleShowPhilosophy}
            onShowControls={handleShowControls}
            width={isMobile ? width * 0.9 : isTablet ? width * 0.7 : 480}
            height={isMobile ? height * 0.25 : height * 0.3}
            x={
              width / 2 -
              (isMobile ? width * 0.45 : isTablet ? width * 0.35 : 240)
            }
            y={menuStartY}
            menuItems={MENU_ITEMS}
            data-testid="main-menu-section"
          />

          {/* Enhanced Archetype Selection - Mobile-Responsive */}
          <pixiContainer
            x={isMobile ? 20 : 40}
            y={height - (isMobile ? 220 : 250)}
            data-testid="archetype-selection"
          >
            {/* Archetype Toggle with Better Visual Design */}
            <pixiContainer data-testid="archetype-toggle">
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  g.fill({
                    color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                    alpha: 0.9,
                  });
                  g.roundRect(0, 0, isMobile ? 140 : 180, 45, 8);
                  g.fill();
                  g.stroke({
                    width: 2,
                    color: KOREAN_COLORS.ACCENT_GOLD,
                    alpha: 0.8,
                  });
                  g.roundRect(0, 0, isMobile ? 140 : 180, 45, 8);
                  g.stroke();
                }}
                interactive={true}
                onPointerDown={() => audio.playSoundEffect("menu_hover")}
              />
              <pixiText
                text="무사 유형 선택"
                style={{
                  fontSize: isMobile ? 12 : 14,
                  fill: KOREAN_COLORS.TEXT_PRIMARY,
                  align: "center",
                  fontWeight: "bold",
                }}
                x={(isMobile ? 140 : 180) / 2}
                y={22}
                anchor={0.5}
                data-testid="archetype-toggle-text"
              />
            </pixiContainer>

            {/* Enhanced Archetype List with Icons */}
            <pixiContainer y={55} data-testid="archetype-list">
              {[
                {
                  id: "musa",
                  korean: "무사",
                  english: "Warrior",
                  color: KOREAN_COLORS.TRIGRAM_GEON_PRIMARY,
                },
                {
                  id: "amsalja",
                  korean: "암살자",
                  english: "Assassin",
                  color: KOREAN_COLORS.TRIGRAM_SON_PRIMARY,
                },
                {
                  id: "hacker",
                  korean: "해커",
                  english: "Hacker",
                  color: KOREAN_COLORS.PRIMARY_CYAN,
                },
                {
                  id: "jeongbo_yowon",
                  korean: "정보요원",
                  english: "Agent",
                  color: KOREAN_COLORS.TRIGRAM_TAE_PRIMARY,
                },
                {
                  id: "jojik_pokryeokbae",
                  korean: "조직폭력배",
                  english: "Gangster",
                  color: KOREAN_COLORS.TRIGRAM_JIN_PRIMARY,
                },
              ].map((archetype, index) => (
                <pixiContainer
                  key={archetype.id}
                  y={index * (isMobile ? 32 : 38)}
                  data-testid={`archetype-option-${archetype.id}`}
                >
                  <pixiGraphics
                    draw={(g) => {
                      g.clear();
                      g.fill({
                        color:
                          selectedArchetype === index
                            ? KOREAN_COLORS.ACCENT_GOLD
                            : KOREAN_COLORS.UI_BACKGROUND_LIGHT,
                        alpha: 0.8,
                      });
                      g.roundRect(
                        0,
                        0,
                        isMobile ? 160 : 200,
                        isMobile ? 28 : 32,
                        4
                      );
                      g.fill();
                      g.stroke({
                        width: 1,
                        color: archetype.color,
                        alpha: 0.8,
                      });
                      g.roundRect(
                        0,
                        0,
                        isMobile ? 160 : 200,
                        isMobile ? 28 : 32,
                        4
                      );
                      g.stroke();
                    }}
                    interactive={true}
                    onPointerDown={() => {
                      setSelectedArchetype(index);
                      audio.playSoundEffect("menu_select");
                    }}
                  />

                  {/* Archetype icon/symbol */}
                  <pixiGraphics
                    draw={(g) => {
                      g.clear();
                      g.fill({ color: archetype.color, alpha: 0.8 });
                      g.circle(12, (isMobile ? 28 : 32) / 2, 6);
                      g.fill();
                    }}
                    data-testid={`archetype-icon-${archetype.id}`}
                  />

                  <pixiText
                    text={`${archetype.korean} - ${archetype.english}`}
                    style={{
                      fontSize: isMobile ? 10 : 12,
                      fill:
                        selectedArchetype === index
                          ? KOREAN_COLORS.BLACK_SOLID
                          : KOREAN_COLORS.TEXT_PRIMARY,
                      fontWeight:
                        selectedArchetype === index ? "bold" : "normal",
                    }}
                    x={25}
                    y={(isMobile ? 28 : 32) / 2}
                    anchor={{ x: 0, y: 0.5 }}
                    data-testid={`archetype-text-${archetype.id}`}
                  />
                </pixiContainer>
              ))}
            </pixiContainer>

            {/* Selected Archetype Display */}
            <pixiContainer
              y={isMobile ? 180 : 210}
              data-testid="selected-archetype"
            >
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  g.fill({
                    color: KOREAN_COLORS.ACCENT_GOLD,
                    alpha: 0.2,
                  });
                  g.roundRect(0, 0, isMobile ? 160 : 200, 40, 6);
                  g.fill();
                }}
              />
              <pixiText
                text="선택된 무사 유형"
                style={{
                  fontSize: isMobile ? 10 : 12,
                  fill: KOREAN_COLORS.TEXT_SECONDARY,
                }}
                x={8}
                y={8}
                data-testid="selected-archetype-label"
              />
              <pixiText
                text={
                  ["무사", "암살자", "해커", "정보요원", "조직폭력배"][
                    selectedArchetype
                  ]
                }
                style={{
                  fontSize: isMobile ? 12 : 14,
                  fill: KOREAN_COLORS.ACCENT_GOLD,
                  fontWeight: "bold",
                }}
                x={8}
                y={22}
                data-testid="selected-archetype-value"
              />
            </pixiContainer>
          </pixiContainer>

          {/* Enhanced Archetype Display with Image Cycling */}
          <pixiContainer
            x={width - (isMobile ? width * 0.95 : isTablet ? 350 : 400)}
            y={height / 2 - (isMobile ? 100 : 150)}
            data-testid="archetype-display"
          >
            {!isMobile && (
              <>
                <pixiText
                  text="무사 유형 가이드"
                  style={{
                    fontSize: isTablet ? 16 : 18,
                    fill: KOREAN_COLORS.ACCENT_GOLD,
                    fontWeight: "bold",
                  }}
                  y={-35}
                  data-testid="archetype-display-title"
                />

                {/* Cycle through archetype images */}
                {Object.values(archetypeTextures).filter(Boolean).length >
                  0 && (
                  <pixiSprite
                    texture={
                      Object.values(archetypeTextures).filter(Boolean)[
                        selectedArchetype %
                          Object.values(archetypeTextures).filter(Boolean)
                            .length
                      ]!
                    }
                    width={isTablet ? 280 : 320}
                    height={isTablet ? 200 : 240}
                    interactive={true}
                    onPointerDown={() => {
                      setSelectedArchetype((prev) => (prev + 1) % 5);
                      audio.playSoundEffect("menu_hover");
                    }}
                    data-testid="archetype-display-image"
                  />
                )}

                <pixiText
                  text={`${selectedArchetype + 1} / 5`}
                  style={{
                    fontSize: 14,
                    fill: KOREAN_COLORS.TEXT_SECONDARY,
                    align: "center",
                  }}
                  x={(isTablet ? 280 : 320) / 2}
                  y={isTablet ? 220 : 260}
                  anchor={0.5}
                  data-testid="archetype-display-counter"
                />
              </>
            )}
          </pixiContainer>
        </>
      )}

      {/* Philosophy and Controls sections remain similar but with responsive positioning */}
      {currentSection === "philosophy" && (
        <PhilosophySection
          onBack={handleBackToMenu}
          width={width * 0.9}
          height={height * 0.8}
          x={width * 0.05}
          y={height * 0.1}
          data-testid="philosophy-section"
        />
      )}

      {currentSection === "controls" && (
        <ControlsSection
          onBack={handleBackToMenu}
          width={width * 0.9}
          height={height * 0.8}
          x={width * 0.05}
          y={height * 0.1}
          data-testid="controls-section"
        />
      )}

      {/* Enhanced Footer with Better Mobile Layout */}
      <pixiContainer
        x={width / 2}
        y={height - (isMobile ? 60 : 80)}
        data-testid="intro-footer"
      >
        <pixiText
          text="흑괘의 길을 걸어라 - Walk the Path of the Black Trigram"
          style={{
            fontSize: isMobile ? 10 : 14,
            fill: KOREAN_COLORS.ACCENT_CYAN,
            align: "center",
            fontStyle: "italic",
          }}
          x={0}
          y={isMobile ? -30 : -35}
          anchor={0.5}
          data-testid="footer-motto"
        />

        <pixiText
          text="Open Source Korean Martial Arts Game by Hack23"
          style={{
            fontSize: isMobile ? 9 : 12,
            fill: KOREAN_COLORS.SECONDARY_MAGENTA,
            align: "center",
            fontWeight: "bold",
          }}
          interactive={true}
          onPointerTap={() =>
            window.open("https://github.com/Hack23/blacktrigram", "_blank")
          }
          x={0}
          y={isMobile ? -15 : -18}
          anchor={0.5}
          data-testid="footer-link"
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default IntroScreen;
