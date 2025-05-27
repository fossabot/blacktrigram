import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text, Sprite } from "pixi.js";
import type { Texture } from "pixi.js";
import { useState, useEffect, useCallback, useMemo } from "react";
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

// Type definitions
type GameMode = "intro" | "game" | "training";

type SelectedOption = "sparring" | "training";

interface TrigramSymbol {
  readonly name: string;
  readonly korean: string;
  readonly symbol: string;
  readonly meaning: string;
  readonly icon: string;
  readonly combatStyle: string;
  readonly x: number;
  readonly y: number;
  readonly alpha: number;
}

interface IntroScreenProps {
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
}

interface BackButtonProps {
  readonly onBack: () => void;
}

interface MenuButtonProps {
  readonly isSelected: boolean;
  readonly time: number;
  readonly onSelect: () => void;
  readonly title: string;
  readonly subtitle: string;
  readonly keyBinding: string;
}

// Constants
const COLORS = {
  BLACK: 0x000000,
  CYAN: 0x00ffd0,
  WHITE: 0xffffff,
  DARK_BLUE: 0x000a12,
  ACCENT_BLUE: 0x004455,
  GRID_DARK: 0x003333,
  RED: 0x8b0000,
  GRAY_LIGHT: 0x888888,
  GRAY_MEDIUM: 0x666666,
  GRAY_DARK: 0x444444,
  GRAY_DARKER: 0x999999,
  GRAY_TEXT: 0xcccccc,
  CYAN_LIGHT: 0x7accd4,
  DARK_PANEL: 0x10171e,
} as const;

const GRID_SIZE = 50;
const BUTTON_ANIMATION_SPEED = 0.1;

function App(): JSX.Element {
  const [gameMode, setGameMode] = useState<GameMode>("intro");
  const audio = useAudio();

  const startGame = useCallback((): void => {
    audio.playSFX("menu_select");
    setGameMode("game");
  }, [audio]);

  const startTraining = useCallback((): void => {
    audio.playSFX("menu_select");
    setGameMode("training");
  }, [audio]);

  const returnToIntro = useCallback((): void => {
    audio.playSFX("menu_back");
    setGameMode("intro");
  }, [audio]);

  return (
    <div className="app-container">
      <Application
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundColor={COLORS.BLACK}
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
}: IntroScreenProps): JSX.Element {
  const [hoveredTrigram, setHoveredTrigram] = useState<string | null>(null);
  const [time, setTime] = useState<number>(0);
  const [selectedOption, setSelectedOption] =
    useState<SelectedOption>("sparring");
  const [initialized, setInitialized] = useState<boolean>(false);
  const audio = useAudio();
  const { texture: logoTexture } = useTexture("/dark-trigram-256.png");

  // Memoized trigram symbols
  const trigrams = useMemo(
    (): readonly TrigramSymbol[] => [
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
    ],
    []
  );

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
    graphics.setFillStyle({ color: COLORS.BLACK });
    graphics.rect(0, 0, window.innerWidth, window.innerHeight);
    graphics.fill();

    graphics.setStrokeStyle({ color: COLORS.GRID_DARK, width: 1, alpha: 0.3 });
    for (let x = 0; x < window.innerWidth; x += GRID_SIZE) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, window.innerHeight);
      graphics.stroke();
    }
    for (let y = 0; y < window.innerHeight; y += GRID_SIZE) {
      graphics.moveTo(0, y);
      graphics.lineTo(window.innerWidth, y);
      graphics.stroke();
    }
  }, []);

  const drawTrigramLines = useCallback(
    (graphics: Graphics) => {
      graphics.clear();
      trigrams.forEach((trigram) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const alpha =
          0.15 + Math.sin(time + trigrams.indexOf(trigram) * 0.8) * 0.1;
        const isHovered = hoveredTrigram === trigram.name;

        graphics.setStrokeStyle({
          color: isHovered ? COLORS.RED : 0x333333,
          width: isHovered ? 2 : 1,
          alpha: isHovered ? 0.6 : alpha,
        });

        graphics.moveTo(centerX, centerY);
        graphics.lineTo(trigram.x, trigram.y);
        graphics.stroke();

        if (isHovered) {
          const steps = 5;
          for (let i = 1; i < steps; i++) {
            const t = i / steps;
            const dotX = centerX + (trigram.x - centerX) * t;
            const dotY = centerY + (trigram.y - centerY) * t;
            graphics.setFillStyle({ color: COLORS.RED, alpha: 0.8 });
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
      <pixiGraphics draw={drawBackground} />
      <pixiGraphics draw={drawTrigramLines} />

      <GameLogo logoTexture={logoTexture} />
      <GameSubtitle />
      <CenterCircle time={time} />
      <TrigramSymbols
        trigrams={trigrams}
        hoveredTrigram={hoveredTrigram}
        onTrigramHover={setHoveredTrigram}
        audio={audio}
      />
      <PhilosophyText />
      <ControlsText />
      <MenuButtons
        selectedOption={selectedOption}
        time={time}
        onOptionChange={setSelectedOption}
        audio={audio}
      />
    </pixiContainer>
  );
}

// Extracted components
function GameLogo({
  logoTexture,
}: {
  logoTexture: Texture | null;
}): JSX.Element {
  return (
    <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2 - 250}>
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({ color: COLORS.DARK_BLUE, alpha: 0.95 });
          g.roundRect(-270, -70, 540, 140, 20);
          g.fill();

          g.setStrokeStyle({ color: COLORS.CYAN, width: 3 });
          g.roundRect(-270, -70, 540, 140, 20);
          g.stroke();

          g.setStrokeStyle({ color: COLORS.CYAN, width: 1, alpha: 0.7 });
          g.roundRect(-260, -60, 520, 120, 16);
          g.stroke();

          g.setStrokeStyle({ color: COLORS.CYAN, width: 1, alpha: 0.4 });
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
          fill: COLORS.WHITE,
          fontWeight: "400",
          dropShadow: {
            color: COLORS.CYAN,
            blur: 6,
            distance: 0,
          },
        }}
      />
    </pixiContainer>
  );
}

function GameSubtitle(): JSX.Element {
  return (
    <>
      <pixiText
        text="🎯 정격자 · ⚔️ 비수 · 🥷 암살자 · 💀 급소격 · 🏯 도장"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 120}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: COLORS.WHITE,
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
          fill: COLORS.GRAY_DARKER,
          letterSpacing: 1,
        }}
      />
    </>
  );
}

function CenterCircle({ time }: { time: number }): JSX.Element {
  const drawCenterCircle = useCallback(
    (graphics: Graphics) => {
      graphics.clear();
      graphics.setStrokeStyle({ color: COLORS.CYAN, width: 4 });
      graphics.circle(0, 0, 140);
      graphics.stroke();

      graphics.setStrokeStyle({ color: COLORS.CYAN, width: 2, alpha: 0.7 });
      graphics.circle(0, 0, 120);
      graphics.stroke();

      const pulse = Math.sin(time * 1.5) * 0.4 + 0.6;
      graphics.setFillStyle({ color: COLORS.CYAN, alpha: pulse });
      graphics.circle(0, 0, 12);
      graphics.fill();
    },
    [time]
  );

  return (
    <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2}>
      <pixiGraphics draw={drawCenterCircle} />
    </pixiContainer>
  );
}

function TrigramSymbols({
  trigrams,
  hoveredTrigram,
  onTrigramHover,
  audio,
}: {
  trigrams: readonly TrigramSymbol[];
  hoveredTrigram: string | null;
  onTrigramHover: (name: string | null) => void;
  audio: ReturnType<typeof useAudio>;
}): JSX.Element {
  return (
    <>
      {trigrams.map((trigram) => (
        <TrigramSymbol
          key={trigram.name}
          trigram={trigram}
          isHovered={hoveredTrigram === trigram.name}
          onPointerEnter={() => {
            audio.playSFX("menu_hover");
            onTrigramHover(trigram.name);
          }}
          onPointerLeave={() => onTrigramHover(null)}
        />
      ))}
    </>
  );
}

function TrigramSymbol({
  trigram,
  isHovered,
  onPointerEnter,
  onPointerLeave,
}: {
  trigram: TrigramSymbol;
  isHovered: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}): JSX.Element {
  return (
    <pixiContainer
      x={trigram.x}
      y={trigram.y}
      interactive={true}
      cursor="pointer"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear();
          const scale = isHovered ? 1.2 : 1.0;
          const alpha = isHovered ? 0.9 : 0.7;

          g.setFillStyle({ color: COLORS.BLACK, alpha });
          g.circle(0, 0, 35 * scale);
          g.fill();

          g.setStrokeStyle({
            color: isHovered ? COLORS.RED : COLORS.GRAY_MEDIUM,
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
          fontSize: isHovered ? 28 : 24,
          fill: COLORS.WHITE,
        }}
      />

      <pixiText
        text={trigram.symbol}
        anchor={{ x: 0.5, y: 0.5 }}
        y={5}
        style={{
          fontFamily: "serif",
          fontSize: isHovered ? 32 : 24,
          fill: isHovered ? COLORS.RED : COLORS.WHITE,
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
          fill: isHovered ? COLORS.WHITE : 0xaaaaaa,
          fontWeight: "400",
        }}
      />

      {isHovered && (
        <>
          <pixiText
            text={trigram.meaning}
            y={45}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: COLORS.GRAY_LIGHT,
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
              fill: COLORS.GRAY_MEDIUM,
              letterSpacing: 0.5,
            }}
          />
        </>
      )}
    </pixiContainer>
  );
}

function PhilosophyText(): JSX.Element {
  return (
    <>
      <pixiText
        text="🧘 도장에서 무예는 몸과 마음, 그리고 영혼의 조화이다"
        x={window.innerWidth / 2}
        y={window.innerHeight - 120}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: COLORS.GRAY_MEDIUM,
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
          fill: COLORS.GRAY_DARK,
          fontStyle: "italic",
        }}
      />
    </>
  );
}

function ControlsText(): JSX.Element {
  return (
    <>
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
          fill: COLORS.GRAY_DARK,
          letterSpacing: 1,
        }}
      />
    </>
  );
}

function MenuButtons({
  selectedOption,
  time,
  onOptionChange,
  audio,
}: {
  selectedOption: SelectedOption;
  time: number;
  onOptionChange: (option: SelectedOption) => void;
  audio: ReturnType<typeof useAudio>;
}): JSX.Element {
  return (
    <>
      <MenuButton
        isSelected={selectedOption === "sparring"}
        time={time}
        onSelect={() => {
          audio.playSFX("menu_hover");
          onOptionChange("sparring");
        }}
        title="⚔️ 대련 (Sparring)"
        subtitle="🎯 정밀 전투 (Precision Combat)"
        keyBinding="[1]"
      />

      <MenuButton
        isSelected={selectedOption === "training"}
        time={time}
        onSelect={() => {
          audio.playSFX("menu_hover");
          onOptionChange("training");
        }}
        title="🏃 수련 (Training)"
        subtitle="🧘 기술 연마 (Skill Development)"
        keyBinding="[2] [Alt]"
      />
    </>
  );
}

function MenuButton({
  isSelected,
  time,
  onSelect,
  title,
  subtitle,
  keyBinding,
}: MenuButtonProps): JSX.Element {
  const xPosition = title.includes("대련")
    ? window.innerWidth / 2 - 150
    : window.innerWidth / 2 + 150;

  const onAction = title.includes("대련")
    ? () => {} // Will be handled by parent
    : () => {}; // Will be handled by parent

  return (
    <pixiContainer
      x={xPosition}
      y={window.innerHeight / 2 + 180}
      interactive={true}
      cursor="pointer"
      onPointerDown={onAction}
      onPointerEnter={onSelect}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear();
          const pulse = isSelected
            ? Math.sin(time * BUTTON_ANIMATION_SPEED) * 0.2 + 0.8
            : 1.0;

          g.setFillStyle({ color: COLORS.DARK_BLUE, alpha: 0.9 });
          g.roundRect(-100, -45, 200, 90, 18);
          g.fill();

          g.setFillStyle({ color: COLORS.DARK_PANEL, alpha: 0.7 });
          g.roundRect(-100, -45, 200, 25, 18);
          g.fill();

          g.setStrokeStyle({
            color: isSelected ? COLORS.CYAN : COLORS.ACCENT_BLUE,
            width: isSelected ? 3 : 2,
            alpha: pulse,
          });
          g.roundRect(-100, -45, 200, 90, 18);
          g.stroke();

          g.setStrokeStyle({
            color: COLORS.CYAN,
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
              color: COLORS.CYAN,
              width: 2,
              alpha: pulse * 0.5,
            });
            g.roundRect(-105, -50, 210, 100, 22);
            g.stroke();
          }
        }}
      />
      <pixiText
        text={title}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-15}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: isSelected ? COLORS.CYAN : COLORS.CYAN_LIGHT,
          fontWeight: "bold",
          ...(isSelected && {
            dropShadow: {
              color: COLORS.CYAN,
              blur: 6,
              distance: 0,
            },
          }),
        }}
      />
      <pixiText
        text={subtitle}
        anchor={{ x: 0.5, y: 0.5 }}
        y={10}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: isSelected ? COLORS.WHITE : COLORS.GRAY_LIGHT,
        }}
      />
      <pixiText
        text={keyBinding}
        anchor={{ x: 0.5, y: 0.5 }}
        y={30}
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          fill: COLORS.CYAN,
        }}
        alpha={0.7}
      />
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
          fill: COLORS.WHITE,
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
          fill: COLORS.GRAY_DARKER,
        }}
      />
    </pixiContainer>
  );
}

function BackButton({ onBack }: BackButtonProps): JSX.Element {
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
          g.setFillStyle({ color: COLORS.DARK_BLUE, alpha: 0.9 });
          g.roundRect(-40, -20, 80, 40, 5);
          g.fill();

          g.setStrokeStyle({
            color: isHovered ? COLORS.CYAN : COLORS.ACCENT_BLUE,
            width: isHovered ? 2 : 1,
            alpha: isHovered ? 0.9 : 0.7,
          });
          g.roundRect(-40, -20, 80, 40, 5);
          g.stroke();

          g.setStrokeStyle({ color: COLORS.CYAN, width: 1, alpha: 0.4 });
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
          fill: isHovered ? COLORS.CYAN : COLORS.GRAY_TEXT,
          ...(isHovered && {
            dropShadow: {
              color: COLORS.CYAN,
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
