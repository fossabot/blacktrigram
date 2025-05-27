import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text, Sprite } from "pixi.js";
import { useState, useEffect, useCallback } from "react";
import type { JSX } from "react";
import "./App.css";
import { GameEngine } from "./components/game/GameEngine";
import { useAudio } from "./audio/AudioManager";
import { useTexture } from "./hooks/useTexture";

// Extend @pixi/react with the Pixi components we want to use
extend({
  Container,
  Graphics,
  Text,
  Sprite,
});

type GameMode = "intro" | "game" | "training";

interface TrigramSymbol {
  name: string;
  korean: string;
  symbol: string;
  meaning: string;
  icon: string;
  combatStyle: string;
  x: number;
  y: number;
  alpha: number;
}

function App(): JSX.Element {
  const [gameMode, setGameMode] = useState<GameMode>("intro");
  const audio = useAudio();

  const startGame = (): void => {
    audio.playSFX("menu_select");
    setGameMode("game");
  };

  const startTraining = (): void => {
    audio.playSFX("menu_select");
    setGameMode("training");
  };

  const returnToIntro = (): void => {
    audio.playSFX("menu_back");
    setGameMode("intro");
  };

  return (
    <div className="app-container">
      <Application
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundColor={0x000000}
        antialias={true}
        resizeTo={window}
      >
        {gameMode === "intro" && (
          <IntroScreen
            onStartGame={startGame}
            onStartTraining={startTraining}
          />
        )}
        {gameMode === "game" && (
          <pixiContainer>
            <GameEngine />
            <BackButton onBack={returnToIntro} />
          </pixiContainer>
        )}
        {gameMode === "training" && (
          <pixiContainer>
            <TrainingMode />
            <BackButton onBack={returnToIntro} />
          </pixiContainer>
        )}
      </Application>
    </div>
  );
}

function IntroScreen({
  onStartGame,
  onStartTraining,
}: {
  onStartGame: () => void;
  onStartTraining: () => void;
}): JSX.Element {
  const [hoveredTrigram, setHoveredTrigram] = useState<string | null>(null);
  const [time, setTime] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<"sparring" | "training">(
    "sparring"
  );
  const audio = useAudio();
  const [initialized, setInitialized] = useState<boolean>(false);
  const { texture: logoTexture } = useTexture("/dark-trigram-256.png");

  // Enhanced trigram positioning with combat style icons
  const trigrams: TrigramSymbol[] = [
    {
      name: "Geon",
      korean: "건",
      symbol: "☰",
      meaning: "Heaven",
      icon: "🔥",
      combatStyle: "Power Strikes",
      x: window.innerWidth / 2,
      y: 120,
      alpha: 0.9,
    },
    {
      name: "Tae",
      korean: "태",
      symbol: "☱",
      meaning: "Lake",
      icon: "🌊",
      combatStyle: "Flowing Combos",
      x: window.innerWidth / 2 + 220,
      y: 180,
      alpha: 0.9,
    },
    {
      name: "Li",
      korean: "리",
      symbol: "☲",
      meaning: "Fire",
      icon: "⚡",
      combatStyle: "Fast Attacks",
      x: window.innerWidth / 2 + 280,
      y: window.innerHeight / 2,
      alpha: 0.9,
    },
    {
      name: "Jin",
      korean: "진",
      symbol: "☳",
      meaning: "Thunder",
      icon: "💥",
      combatStyle: "Explosive Bursts",
      x: window.innerWidth / 2 + 220,
      y: window.innerHeight / 2 + 220,
      alpha: 0.9,
    },
    {
      name: "Son",
      korean: "손",
      symbol: "☴",
      meaning: "Wind",
      icon: "🌪️",
      combatStyle: "Continuous Pressure",
      x: window.innerWidth / 2,
      y: window.innerHeight - 120,
      alpha: 0.9,
    },
    {
      name: "Gam",
      korean: "감",
      symbol: "☵",
      meaning: "Water",
      icon: "🛡️",
      combatStyle: "Evasion & Counters",
      x: window.innerWidth / 2 - 220,
      y: window.innerHeight / 2 + 220,
      alpha: 0.9,
    },
    {
      name: "Gan",
      korean: "간",
      symbol: "☶",
      meaning: "Mountain",
      icon: "🗿",
      combatStyle: "Immovable Defense",
      x: window.innerWidth / 2 - 280,
      y: window.innerHeight / 2,
      alpha: 0.9,
    },
    {
      name: "Gon",
      korean: "곤",
      symbol: "☷",
      meaning: "Earth",
      icon: "🤜",
      combatStyle: "Throws & Takedowns",
      x: window.innerWidth / 2 - 220,
      y: 180,
      alpha: 0.9,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.016); // ~60fps
    }, 16);

    // Initialize controls state to prevent first-time issues
    if (!initialized) {
      setInitialized(true);
    }

    return () => clearInterval(interval);
  }, [initialized]);

  // Keyboard controls for intro screen with improved initialization
  useEffect(() => {
    if (!initialized) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      // Ensure control signals are properly triggered
      event.preventDefault();

      // Navigation controls
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        audio.playSFX("menu_hover");
        setSelectedOption("sparring");
      }
      if (event.code === "ArrowRight" || event.code === "KeyD") {
        audio.playSFX("menu_hover");
        setSelectedOption("training");
      }

      // Action controls
      if (event.code === "Space" || event.code === "Enter") {
        audio.playSFX("menu_select");
        if (selectedOption === "sparring") {
          onStartGame();
        } else {
          onStartTraining();
        }
      }

      // Alternative keys
      if (event.code === "AltLeft" || event.code === "AltRight") {
        audio.playSFX("menu_select");
        onStartTraining();
      }

      // Quick start with number keys
      if (event.code === "Digit1") {
        audio.playSFX("menu_select");
        onStartGame();
      }
      if (event.code === "Digit2") {
        audio.playSFX("menu_select");
        onStartTraining();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Ensure app has focus to receive key events
    window.focus();
    document.body.click();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOption, onStartGame, onStartTraining, audio, initialized]);

  const drawBackground = useCallback((graphics: Graphics) => {
    graphics.clear();
    // Deep black background
    graphics.setFillStyle({ color: 0x000000 });
    graphics.rect(0, 0, window.innerWidth, window.innerHeight);
    graphics.fill();

    // Cyan grid pattern
    graphics.setStrokeStyle({ color: 0x003333, width: 1, alpha: 0.3 });
    const gridSize = 50;
    for (let x = 0; x < window.innerWidth; x += gridSize) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, window.innerHeight);
      graphics.stroke();
    }
    for (let y = 0; y < window.innerHeight; y += gridSize) {
      graphics.moveTo(0, y);
      graphics.lineTo(window.innerWidth, y);
      graphics.stroke();
    }
  }, []);

  const drawCenterCircle = useCallback(
    (graphics: Graphics) => {
      graphics.clear();

      // Cyan outer ring
      graphics.setStrokeStyle({ color: 0x00ffd0, width: 4 });
      graphics.circle(0, 0, 140);
      graphics.stroke();

      // Inner cyan ring
      graphics.setStrokeStyle({ color: 0x00ffd0, width: 2, alpha: 0.7 });
      graphics.circle(0, 0, 120);
      graphics.stroke();

      // Pulsing cyan center
      const pulse = Math.sin(time * 1.5) * 0.4 + 0.6;
      graphics.setFillStyle({ color: 0x00ffd0, alpha: pulse });
      graphics.circle(0, 0, 12);
      graphics.fill();
    },
    [time]
  );

  const drawTrigramLines = useCallback(
    (graphics: Graphics) => {
      graphics.clear();
      trigrams.forEach((trigram) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Enhanced connecting lines with Korean aesthetic
        const alpha =
          0.15 + Math.sin(time + trigrams.indexOf(trigram) * 0.8) * 0.1;
        const isHovered = hoveredTrigram === trigram.name;

        graphics.setStrokeStyle({
          color: isHovered ? 0x8b0000 : 0x333333,
          width: isHovered ? 2 : 1,
          alpha: isHovered ? 0.6 : alpha,
        });

        graphics.moveTo(centerX, centerY);
        graphics.lineTo(trigram.x, trigram.y);
        graphics.stroke();

        // Add subtle dots along the line for traditional feel
        if (isHovered) {
          const steps = 5;
          for (let i = 1; i < steps; i++) {
            const t = i / steps;
            const dotX = centerX + (trigram.x - centerX) * t;
            const dotY = centerY + (trigram.y - centerY) * t;
            graphics.setFillStyle({ color: 0x8b0000, alpha: 0.8 });
            graphics.circle(dotX, dotY, 2);
            graphics.fill();
          }
        }
      });
    },
    [time, trigrams, hoveredTrigram]
  );

  return (
    <pixiContainer>
      {/* Enhanced background */}
      <pixiGraphics draw={drawBackground} />
      <pixiGraphics draw={drawTrigramLines} />

      {/* Dark Trigram Logo */}
      <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2 - 250}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            // Dark background with deeper panel
            g.setFillStyle({ color: 0x000a12, alpha: 0.95 });
            g.roundRect(-270, -70, 540, 140, 20);
            g.fill();

            // Cyan glowing border with double-line effect
            g.setStrokeStyle({ color: 0x00ffd0, width: 3 });
            g.roundRect(-270, -70, 540, 140, 20);
            g.stroke();

            g.setStrokeStyle({ color: 0x00ffd0, width: 1, alpha: 0.7 });
            g.roundRect(-260, -60, 520, 120, 16);
            g.stroke();

            // Add tech-looking diagonal slashes
            g.setStrokeStyle({ color: 0x00ffd0, width: 1, alpha: 0.4 });
            g.moveTo(-270, -30);
            g.lineTo(-220, -70);
            g.moveTo(270, -30);
            g.lineTo(220, -70);
            g.stroke();
          }}
        />

        {logoTexture && (
          <pixiSprite
            texture={logoTexture}
            scale={{ x: 0.35, y: 0.35 }}
            anchor={{ x: 0.5, y: 0.5 }}
            y={-10}
            alpha={0.9}
          />
        )}

        <pixiText
          text="🥋 흑괘 무술 도장 🥋"
          anchor={{ x: 0.5, y: 0.5 }}
          y={40}
          style={{
            fontFamily: "Orbitron, Noto Sans KR",
            fontSize: 28,
            fill: 0xffffff,
            fontWeight: "400",
            ...(true && {
              dropShadow: {
                color: 0x00ffd0,
                blur: 6,
                distance: 0,
              },
            }),
          }}
        />
      </pixiContainer>

      {/* Enhanced subtitle with martial arts context */}
      <pixiText
        text="🎯 정격자 · ⚔️ 비수 · 🥷 암살자 · 💀 급소격 · 🏯 도장"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 120}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: 0xffffff,
          fontWeight: "300",
        }}
      />

      <pixiText
        text="🎯 Precision Attacker · ⚔️ Lethal Blade · 🥷 Assassin · 💀 Vital Strike · 🏯 Dojang"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 95}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 12,
          fill: 0x999999,
          letterSpacing: 1,
        }}
      />

      {/* Enhanced center circle */}
      <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2}>
        <pixiGraphics draw={drawCenterCircle} />
      </pixiContainer>

      {/* Enhanced trigram symbols with combat icons */}
      {trigrams.map((trigram) => (
        <pixiContainer
          key={trigram.name}
          x={trigram.x}
          y={trigram.y}
          interactive={true}
          cursor="pointer"
          onPointerEnter={() => {
            audio.playSFX("menu_hover");
            setHoveredTrigram(trigram.name);
          }}
          onPointerLeave={() => setHoveredTrigram(null)}
        >
          <pixiGraphics
            draw={(g) => {
              g.clear();
              const isHovered = hoveredTrigram === trigram.name;
              const scale = isHovered ? 1.2 : 1.0;
              const alpha = isHovered ? 0.9 : 0.7;

              // Background circle
              g.setFillStyle({ color: 0x000000, alpha: alpha });
              g.circle(0, 0, 35 * scale);
              g.fill();

              // Border
              g.setStrokeStyle({
                color: isHovered ? 0x8b0000 : 0x666666,
                width: isHovered ? 3 : 2,
              });
              g.circle(0, 0, 35 * scale);
              g.stroke();
            }}
          />

          <pixiText
            text={trigram.icon}
            anchor={{ x: 0.5, y: 0.5 }}
            y={-15}
            style={{
              fontFamily: "serif",
              fontSize: hoveredTrigram === trigram.name ? 28 : 24,
              fill: 0xffffff,
            }}
          />

          <pixiText
            text={trigram.symbol}
            anchor={{ x: 0.5, y: 0.5 }}
            y={5}
            style={{
              fontFamily: "serif",
              fontSize: hoveredTrigram === trigram.name ? 32 : 24,
              fill: hoveredTrigram === trigram.name ? 0x8b0000 : 0xffffff,
              fontWeight: "bold",
            }}
          />

          <pixiText
            text={trigram.korean}
            y={25}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 14,
              fill: hoveredTrigram === trigram.name ? 0xffffff : 0xaaaaaa,
              fontWeight: "400",
            }}
          />

          {/* Enhanced hover information */}
          {hoveredTrigram === trigram.name && (
            <>
              <pixiText
                text={trigram.meaning}
                y={45}
                anchor={{ x: 0.5, y: 0.5 }}
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  fill: 0x888888,
                  letterSpacing: 1,
                }}
              />
              <pixiText
                text={trigram.combatStyle}
                y={60}
                anchor={{ x: 0.5, y: 0.5 }}
                style={{
                  fontFamily: "monospace",
                  fontSize: 8,
                  fill: 0x666666,
                  letterSpacing: 0.5,
                }}
              />
            </>
          )}
        </pixiContainer>
      ))}

      {/* Enhanced philosophy section with icons */}
      <pixiText
        text="🧘 도장에서 무예는 몸과 마음, 그리고 영혼의 조화이다"
        x={window.innerWidth / 2}
        y={window.innerHeight - 120}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: 0x666666,
          fontStyle: "italic",
          fontWeight: "300",
        }}
      />

      <pixiText
        text="🥋 In the dojang, martial arts are the harmony of body, mind, and spirit"
        x={window.innerWidth / 2}
        y={window.innerHeight - 95}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "serif",
          fontSize: 12,
          fill: 0x444444,
          fontStyle: "italic",
        }}
      />

      {/* Enhanced controls with better iconography */}
      <pixiText
        text="🎮 ← → 또는 A/D 선택 | ⚡ 스페이스/엔터 확인 | 🎯 1-대련, 2-수련"
        x={window.innerWidth / 2}
        y={window.innerHeight - 60}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 11,
          fill: 0x555555,
          letterSpacing: 1,
        }}
      />

      <pixiText
        text="🎮 Arrow Keys/A-D to Select | ⚡ Space/Enter to Confirm | 🏃 Alt for Training"
        x={window.innerWidth / 2}
        y={window.innerHeight - 40}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 9,
          fill: 0x444444,
          letterSpacing: 1,
        }}
      />

      {/* Enhanced game mode selection with better visual feedback */}
      <pixiContainer
        x={window.innerWidth / 2 - 150}
        y={window.innerHeight / 2 + 180}
        interactive={true}
        cursor="pointer"
        onPointerDown={onStartGame}
        onPointerEnter={() => {
          audio.playSFX("menu_hover");
          setSelectedOption("sparring");
        }}
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            const isSelected = selectedOption === "sparring";
            const pulse = isSelected ? Math.sin(time * 0.1) * 0.2 + 0.8 : 1.0;

            // Enhanced button design
            g.setFillStyle({ color: 0x000a12, alpha: 0.9 });
            g.roundRect(-100, -45, 200, 90, 18);
            g.fill();

            // Gradient-like effect
            g.setFillStyle({ color: 0x10171e, alpha: 0.7 });
            g.roundRect(-100, -45, 200, 25, 18);
            g.fill();

            // Enhanced border
            g.setStrokeStyle({
              color: isSelected ? 0x00ffd0 : 0x004455,
              width: isSelected ? 3 : 2,
              alpha: pulse,
            });
            g.roundRect(-100, -45, 200, 90, 18);
            g.stroke();

            // Add tech-looking diagonal slash for visual interest
            g.setStrokeStyle({
              color: 0x00ffd0,
              width: 1,
              alpha: isSelected ? 0.6 : 0.3,
            });
            g.moveTo(-100, -25);
            g.lineTo(-70, -45);
            g.moveTo(100, -25);
            g.lineTo(70, -45);
            g.stroke();

            // Selection glow effect
            if (isSelected) {
              g.setStrokeStyle({
                color: 0x00ffd0,
                width: 2,
                alpha: pulse * 0.5,
              });
              g.roundRect(-105, -50, 210, 100, 22);
              g.stroke();
            }
          }}
        />
        <pixiText
          text="⚔️ 대련 (Sparring)"
          anchor={{ x: 0.5, y: 0.5 }}
          y={-15}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: selectedOption === "sparring" ? 0x00ffd0 : 0x7accd4,
            fontWeight: "bold",
            ...(selectedOption === "sparring" && {
              dropShadow: {
                color: 0x00ffd0,
                blur: 6,
                distance: 0,
              },
            }),
          }}
        />
        <pixiText
          text="🎯 정밀 전투 (Precision Combat)"
          anchor={{ x: 0.5, y: 0.5 }}
          y={10}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: selectedOption === "sparring" ? 0xffffff : 0x888888,
          }}
        />
        <pixiText
          text="[1]"
          anchor={{ x: 0.5, y: 0.5 }}
          y={30}
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            fill: 0x00ffd0,
          }}
          alpha={0.7}
        />
      </pixiContainer>

      <pixiContainer
        x={window.innerWidth / 2 + 150}
        y={window.innerHeight / 2 + 180}
        interactive={true}
        cursor="pointer"
        onPointerDown={onStartTraining}
        onPointerEnter={() => {
          audio.playSFX("menu_hover");
          setSelectedOption("training");
        }}
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            const isSelected = selectedOption === "training";
            const pulse = isSelected ? Math.sin(time * 0.1) * 0.2 + 0.8 : 1.0;

            // Enhanced training button
            g.setFillStyle({ color: 0x000a12, alpha: 0.9 });
            g.roundRect(-100, -45, 200, 90, 18);
            g.fill();

            // Gradient-like effect
            g.setFillStyle({ color: 0x10171e, alpha: 0.7 });
            g.roundRect(-100, -45, 200, 25, 18);
            g.fill();

            // Enhanced border
            g.setStrokeStyle({
              color: isSelected ? 0x00ffd0 : 0x004455,
              width: isSelected ? 3 : 2,
              alpha: pulse,
            });
            g.roundRect(-100, -45, 200, 90, 18);
            g.stroke();

            // Add tech-looking diagonal slash for visual interest
            g.setStrokeStyle({
              color: 0x00ffd0,
              width: 1,
              alpha: isSelected ? 0.6 : 0.3,
            });
            g.moveTo(-100, -25);
            g.lineTo(-70, -45);
            g.moveTo(100, -25);
            g.lineTo(70, -45);
            g.stroke();

            if (isSelected) {
              g.setStrokeStyle({
                color: 0x00ffd0,
                width: 2,
                alpha: pulse * 0.5,
              });
              g.roundRect(-105, -50, 210, 100, 22);
              g.stroke();
            }
          }}
        />
        <pixiText
          text="🏃 수련 (Training)"
          anchor={{ x: 0.5, y: 0.5 }}
          y={-15}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: selectedOption === "training" ? 0x00ffd0 : 0x7accd4,
            fontWeight: "bold",
            ...(selectedOption === "training" && {
              dropShadow: {
                color: 0x00ffd0,
                blur: 6,
                distance: 0,
              },
            }),
          }}
        />
        <pixiText
          text="🧘 기술 연마 (Skill Development)"
          anchor={{ x: 0.5, y: 0.5 }}
          y={10}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: selectedOption === "training" ? 0xffffff : 0x888888,
          }}
        />
        <pixiText
          text="[2] [Alt]"
          anchor={{ x: 0.5, y: 0.5 }}
          y={30}
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            fill: 0x00ffd0,
          }}
          alpha={0.7}
        />
      </pixiContainer>
    </pixiContainer>
  );
}

function TrainingMode(): JSX.Element {
  return (
    <pixiContainer>
      <pixiText
        text="수련 모드 (Training Mode)"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 32,
          fill: 0xffffff,
          fontWeight: "bold",
        }}
      />
      <pixiText
        text="곧 출시됩니다 (Coming Soon)"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 50}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: 0x999999,
        }}
      />
    </pixiContainer>
  );
}

function BackButton({ onBack }: { onBack: () => void }): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const audio = useAudio();

  return (
    <pixiContainer
      x={50}
      y={50}
      interactive={true}
      cursor="pointer"
      onPointerDown={() => {
        audio.playSFX("menu_back");
        onBack();
      }}
      onPointerEnter={() => {
        audio.playSFX("menu_hover");
        setIsHovered(true);
      }}
      onPointerLeave={() => setIsHovered(false)}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear();
          // Cyberpunk back button
          g.setFillStyle({ color: 0x000a12, alpha: 0.9 });
          g.roundRect(-40, -20, 80, 40, 5);
          g.fill();

          // Border
          g.setStrokeStyle({
            color: isHovered ? 0x00ffd0 : 0x004455,
            width: isHovered ? 2 : 1,
            alpha: isHovered ? 0.9 : 0.7,
          });
          g.roundRect(-40, -20, 80, 40, 5);
          g.stroke();

          // Tech accent lines
          g.setStrokeStyle({ color: 0x00ffd0, width: 1, alpha: 0.4 });
          g.moveTo(-40, -10);
          g.lineTo(-30, -20);
          g.moveTo(40, -10);
          g.lineTo(30, -20);
          g.stroke();
        }}
      />
      <pixiText
        text="← 뒤로"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: isHovered ? 0x00ffd0 : 0xcccccc,
          ...(isHovered && {
            dropShadow: {
              color: 0x00ffd0,
              blur: 4,
              distance: 0,
            },
          }),
        }}
      />
    </pixiContainer>
  );
}

export default App;
