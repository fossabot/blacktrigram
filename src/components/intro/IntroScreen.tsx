import { useState, useEffect, useCallback } from "react";
import type { JSX } from "react";
import { useAudio } from "../../audio/AudioManager";
import { useTexture } from "../../hooks/useTexture";
import type { Graphics as PixiGraphics } from "pixi.js";

// Type definitions
type SelectedOption = "sparring" | "training";

export interface IntroScreenProps {
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
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
  GRAY_MEDIUM: 0x666666,
  GRAY_DARK: 0x444444,
  GRAY_DARKER: 0x999999,
  GRAY_LIGHT: 0xcccccc, // Added missing color
  CYAN_LIGHT: 0x7accd4,
  DARK_PANEL: 0x10171e,
} as const;

const GRID_SIZE = 50;
const BUTTON_ANIMATION_SPEED = 0.1;

export function IntroScreen({
  onStartGame,
  onStartTraining,
}: IntroScreenProps): JSX.Element {
  const [time, setTime] = useState<number>(0);
  const [selectedOption, setSelectedOption] =
    useState<SelectedOption>("sparring");
  const [initialized, setInitialized] = useState<boolean>(false);
  const audio = useAudio();

  // Updated to use black-trigram consistently
  const { texture: logoTexture } = useTexture("/black-trigram-256.png");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.016);
    }, 16);

    if (!initialized) {
      setInitialized(true);
    }

    return () => clearInterval(interval);
  }, [initialized]);

  useEffect(() => {
    if (!initialized) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      event.preventDefault();

      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        audio.playSFX("menu_hover");
        setSelectedOption("sparring");
      }
      if (event.code === "ArrowRight" || event.code === "KeyD") {
        audio.playSFX("menu_hover");
        setSelectedOption("training");
      }

      if (event.code === "Space" || event.code === "Enter") {
        audio.playSFX("menu_select");
        if (selectedOption === "sparring") {
          onStartGame();
        } else {
          onStartTraining();
        }
      }

      if (event.code === "AltLeft" || event.code === "AltRight") {
        audio.playSFX("menu_select");
        onStartTraining();
      }

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
    window.focus();
    document.body.click();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOption, onStartGame, onStartTraining, audio, initialized]);

  const drawBackground = useCallback((graphics: PixiGraphics) => {
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

  return (
    <pixiContainer>
      <pixiGraphics draw={drawBackground} />

      <BlackTrigramLogo logoTexture={logoTexture} />
      <GameSubtitle />
      <CenterCircleWithSymbols time={time} />
      <PhilosophyText />
      <ControlsText />
      <MenuButtons
        selectedOption={selectedOption}
        time={time}
        onOptionChange={setSelectedOption}
        audio={audio}
        onStartGame={onStartGame}
        onStartTraining={onStartTraining}
      />
    </pixiContainer>
  );
}

function BlackTrigramLogo({ logoTexture }: { logoTexture: any }): JSX.Element {
  return (
    <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2 - 200}>
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: COLORS.DARK_BLUE, alpha: 0.95 });
          g.roundRect(-300, -100, 600, 200, 25);
          g.fill();

          g.setStrokeStyle({ color: COLORS.CYAN, width: 3 });
          g.roundRect(-300, -100, 600, 200, 25);
          g.stroke();

          g.setStrokeStyle({ color: COLORS.CYAN, width: 1, alpha: 0.7 });
          g.roundRect(-290, -90, 580, 180, 20);
          g.stroke();

          // Corner accents
          g.setStrokeStyle({ color: COLORS.CYAN, width: 1, alpha: 0.4 });
          g.moveTo(-300, -60);
          g.lineTo(-250, -100);
          g.moveTo(300, -60);
          g.lineTo(250, -100);
          g.stroke();
        }}
      />

      {/* Prominent Black Trigram logo */}
      {logoTexture && (
        <pixiSprite
          texture={logoTexture}
          scale={{ x: 0.5, y: 0.5 }}
          anchor={{ x: 0.5, y: 0.5 }}
          y={-30}
          alpha={0.9}
        />
      )}

      {/* Updated title to use Black Trigram consistently */}
      <pixiText
        text="🥋 흑괘 무술 도장 🥋"
        anchor={{ x: 0.5, y: 0.5 }}
        y={60}
        style={{
          fontFamily: "Orbitron, Noto Sans KR",
          fontSize: 32,
          fill: COLORS.WHITE,
          fontWeight: "400",
          dropShadow: {
            color: COLORS.CYAN,
            blur: 8,
            distance: 0,
          },
        }}
      />

      <pixiText
        text="BLACK TRIGRAM MARTIAL ARTS DOJANG"
        anchor={{ x: 0.5, y: 0.5 }}
        y={85}
        style={{
          fontFamily: "Orbitron",
          fontSize: 16,
          fill: COLORS.CYAN_LIGHT,
          letterSpacing: 2,
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
        y={window.innerHeight / 2 - 80}
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
        y={window.innerHeight / 2 - 55}
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

function CenterCircleWithSymbols({ time }: { time: number }): JSX.Element {
  const drawCenterCircle = useCallback(
    (graphics: PixiGraphics) => {
      graphics.clear();
      const centerX = 0;
      const centerY = 0;

      // Main circle
      graphics.setStrokeStyle({ color: COLORS.CYAN, width: 4 });
      graphics.circle(centerX, centerY, 120);
      graphics.stroke();

      graphics.setStrokeStyle({ color: COLORS.CYAN, width: 2, alpha: 0.7 });
      graphics.circle(centerX, centerY, 100);
      graphics.stroke();

      // Pulsing center
      const pulse = Math.sin(time * 1.5) * 0.4 + 0.6;
      graphics.setFillStyle({ color: COLORS.CYAN, alpha: pulse });
      graphics.circle(centerX, centerY, 15);
      graphics.fill();

      // 8 trigram symbols around the circle
      const trigrams = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];
      const radius = 140;

      trigrams.forEach((_, index) => {
        const angle = (index * Math.PI * 2) / 8 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const symbolPulse = Math.sin(time * 0.8 + index * 0.5) * 0.3 + 0.7;

        // Symbol background
        graphics.setFillStyle({ color: COLORS.DARK_BLUE, alpha: 0.8 });
        graphics.circle(x, y, 25);
        graphics.fill();

        graphics.setStrokeStyle({
          color: COLORS.CYAN,
          width: 1,
          alpha: symbolPulse,
        });
        graphics.circle(x, y, 25);
        graphics.stroke();
      });
    },
    [time]
  );

  return (
    <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2 + 50}>
      <pixiGraphics draw={drawCenterCircle} />

      {/* Add trigram symbols as text */}
      {["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"].map((symbol, index) => {
        const angle = (index * Math.PI * 2) / 8 - Math.PI / 2;
        const x = Math.cos(angle) * 140;
        const y = Math.sin(angle) * 140;

        return (
          <pixiText
            key={index}
            text={symbol}
            x={x}
            y={y}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "serif",
              fontSize: 24,
              fill: COLORS.WHITE,
              fontWeight: "bold",
            }}
          />
        );
      })}
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

// Define the missing interface
interface MenuButtonProps {
  readonly isSelected: boolean;
  readonly time: number;
  readonly onSelect: () => void;
  readonly title: string;
  readonly subtitle: string;
  readonly keyBinding: string;
}

interface MenuButtonsProps {
  selectedOption: SelectedOption;
  time: number;
  onOptionChange: (option: SelectedOption) => void;
  audio: ReturnType<typeof useAudio>;
  onStartGame: () => void; // Added for click handling
  onStartTraining: () => void; // Added for click handling
}

interface ExtendedMenuButtonProps extends MenuButtonProps {
  readonly onClickAction: () => void;
}

function MenuButtons({
  selectedOption,
  time,
  onOptionChange,
  audio,
  onStartGame,
  onStartTraining,
}: MenuButtonsProps): JSX.Element {
  return (
    <>
      <MenuButton
        isSelected={selectedOption === "sparring"}
        time={time}
        onSelect={() => {
          audio.playSFX("menu_hover");
          onOptionChange("sparring");
        }}
        onClickAction={() => {
          audio.playSFX("menu_select");
          onStartGame();
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
        onClickAction={() => {
          audio.playSFX("menu_select");
          onStartTraining();
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
  onClickAction,
}: ExtendedMenuButtonProps): JSX.Element {
  const xPosition = title.includes("대련")
    ? window.innerWidth / 2 - 150
    : window.innerWidth / 2 + 150;

  return (
    <pixiContainer
      x={xPosition}
      y={window.innerHeight / 2 + 180}
      interactive={true}
      cursor="pointer"
      onPointerDown={onClickAction} // Use onClickAction
      onPointerEnter={onSelect} // Corrected prop name
    >
      <pixiGraphics
        draw={(g: PixiGraphics) => {
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
