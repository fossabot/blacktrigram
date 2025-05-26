import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { useState, useEffect, useCallback } from "react";
import type { JSX } from "react";
import "./App.css";
import { GameEngine } from "./components/game/GameEngine";

// Extend @pixi/react with the Pixi components we want to use
extend({
  Container,
  Graphics,
  Text,
});

type GameMode = "intro" | "game" | "training";

interface TrigramSymbol {
  name: string;
  korean: string;
  symbol: string;
  meaning: string;
  x: number;
  y: number;
  alpha: number;
}

function App(): JSX.Element {
  const [gameMode, setGameMode] = useState<GameMode>("intro");

  const startGame = (): void => {
    setGameMode("game");
  };

  const startTraining = (): void => {
    setGameMode("training");
  };

  const returnToIntro = (): void => {
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

  // Enhanced trigram positioning in octagon formation for better visual balance
  const trigrams: TrigramSymbol[] = [
    {
      name: "Geon",
      korean: "건",
      symbol: "☰",
      meaning: "Heaven",
      x: window.innerWidth / 2,
      y: 100,
      alpha: 0.9,
    },
    {
      name: "Tae",
      korean: "태",
      symbol: "☱",
      meaning: "Lake",
      x: window.innerWidth / 2 + 200,
      y: 150,
      alpha: 0.9,
    },
    {
      name: "Li",
      korean: "리",
      symbol: "☲",
      meaning: "Fire",
      x: window.innerWidth / 2 + 250,
      y: window.innerHeight / 2,
      alpha: 0.9,
    },
    {
      name: "Jin",
      korean: "진",
      symbol: "☳",
      meaning: "Thunder",
      x: window.innerWidth / 2 + 200,
      y: window.innerHeight / 2 + 200,
      alpha: 0.9,
    },
    {
      name: "Son",
      korean: "손",
      symbol: "☴",
      meaning: "Wind",
      x: window.innerWidth / 2,
      y: window.innerHeight - 100,
      alpha: 0.9,
    },
    {
      name: "Gam",
      korean: "감",
      symbol: "☵",
      meaning: "Water",
      x: window.innerWidth / 2 - 200,
      y: window.innerHeight / 2 + 200,
      alpha: 0.9,
    },
    {
      name: "Gan",
      korean: "간",
      symbol: "☶",
      meaning: "Mountain",
      x: window.innerWidth / 2 - 250,
      y: window.innerHeight / 2,
      alpha: 0.9,
    },
    {
      name: "Gon",
      korean: "곤",
      symbol: "☷",
      meaning: "Earth",
      x: window.innerWidth / 2 - 200,
      y: 150,
      alpha: 0.9,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.016); // ~60fps
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const drawBackground = useCallback((graphics: Graphics) => {
    graphics.clear();
    // Deep black background
    graphics.setFillStyle({ color: 0x000000 });
    graphics.rect(0, 0, window.innerWidth, window.innerHeight);
    graphics.fill();

    // Subtle grid pattern for traditional Korean aesthetic
    graphics.setStrokeStyle({ color: 0x111111, width: 1, alpha: 0.3 });
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

      // Outer ring - traditional Korean red (단색)
      graphics.setStrokeStyle({ color: 0x8b0000, width: 4 });
      graphics.circle(0, 0, 140);
      graphics.stroke();

      // Middle ring - white for balance
      graphics.setStrokeStyle({ color: 0xffffff, width: 2 });
      graphics.circle(0, 0, 120);
      graphics.stroke();

      // Inner ring - darker red
      graphics.setStrokeStyle({ color: 0x660000, width: 2 });
      graphics.circle(0, 0, 100);
      graphics.stroke();

      // Center yin-yang inspired circle - pulsing
      const pulse = Math.sin(time * 1.5) * 0.4 + 0.6;
      graphics.setFillStyle({ color: 0x8b0000, alpha: pulse });
      graphics.circle(0, 0, 12);
      graphics.fill();

      // Small white dot for balance
      graphics.setFillStyle({ color: 0xffffff, alpha: pulse });
      graphics.circle(3, 0, 3);
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
          const steps = 8;
          for (let i = 1; i < steps; i++) {
            const t = i / steps;
            const x = centerX + (trigram.x - centerX) * t;
            const y = centerY + (trigram.y - centerY) * t;
            graphics.setFillStyle({ color: 0x8b0000, alpha: 0.4 });
            graphics.circle(x, y, 1);
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

      {/* Connecting lines */}
      <pixiGraphics draw={drawTrigramLines} />

      {/* Main title - Chinese characters */}
      <pixiText
        text="黑卦"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 220}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "serif",
          fontSize: 84,
          fill: 0xffffff,
          fontWeight: "bold",
          stroke: 0x8b0000,
        }}
      />

      {/* Korean title */}
      <pixiText
        text="흑괘"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 140}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 36,
          fill: 0x8b0000,
          fontWeight: "400",
        }}
      />

      {/* Subtitle */}
      <pixiText
        text="BLACK TRIGRAM"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 100}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 18,
          fill: 0x666666,
          letterSpacing: 6,
        }}
      />

      {/* Enhanced center circle */}
      <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2}>
        <pixiGraphics draw={drawCenterCircle} />
      </pixiContainer>

      {/* Core concepts with better typography */}
      <pixiText
        text="정격자 · 비수 · 암살자 · 급소격"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 90}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 20,
          fill: 0xffffff,
          fontWeight: "300",
        }}
      />

      <pixiText
        text="Precision Attacker · Lethal Blade · Assassin · Vital Point Strike"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 120}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 13,
          fill: 0x999999,
          letterSpacing: 1,
        }}
      />

      {/* Enhanced trigram symbols */}
      {trigrams.map((trigram) => (
        <pixiContainer
          key={trigram.name}
          x={trigram.x}
          y={trigram.y}
          interactive={true}
          cursor="pointer"
          onPointerEnter={() => setHoveredTrigram(trigram.name)}
          onPointerLeave={() => setHoveredTrigram(null)}
        >
          {/* Trigram symbol with enhanced styling */}
          <pixiText
            text={trigram.symbol}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "serif",
              fontSize: hoveredTrigram === trigram.name ? 42 : 32,
              fill: hoveredTrigram === trigram.name ? 0x8b0000 : 0xffffff,
              fontWeight: "bold",
              stroke: hoveredTrigram === trigram.name ? 0xffffff : 0x000000,
            }}
          />

          {/* Korean name with better positioning */}
          <pixiText
            text={trigram.korean}
            y={30}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 16,
              fill: hoveredTrigram === trigram.name ? 0xffffff : 0xaaaaaa,
              fontWeight: "400",
            }}
          />

          {/* English meaning with better styling */}
          {hoveredTrigram === trigram.name && (
            <pixiText
              text={trigram.meaning}
              y={50}
              anchor={{ x: 0.5, y: 0.5 }}
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                fill: 0x888888,
                letterSpacing: 1,
              }}
            />
          )}
        </pixiContainer>
      ))}

      {/* Enhanced philosophy quote */}
      <pixiText
        text="무예는 몸과 마음, 그리고 영혼의 조화이다"
        x={window.innerWidth / 2}
        y={window.innerHeight - 100}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: 0x666666,
          fontStyle: "italic",
          fontWeight: "300",
        }}
      />

      <pixiText
        text="Martial arts are the harmony of body, mind, and spirit"
        x={window.innerWidth / 2}
        y={window.innerHeight - 70}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "serif",
          fontSize: 14,
          fill: 0x444444,
          fontStyle: "italic",
        }}
      />

      {/* Enhanced call to action */}
      <pixiText
        text="Press any key to begin your journey"
        x={window.innerWidth / 2}
        y={window.innerHeight - 30}
        anchor={{ x: 0.5, y: 0.5 }}
        alpha={Math.sin(time * 2) * 0.4 + 0.6}
        style={{
          fontFamily: "monospace",
          fontSize: 12,
          fill: 0x555555,
          letterSpacing: 2,
        }}
      />

      {/* Game mode selection */}
      <pixiContainer
        x={window.innerWidth / 2 - 100}
        y={window.innerHeight / 2 + 150}
        interactive={true}
        cursor="pointer"
        onPointerDown={onStartGame}
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.setFillStyle({ color: 0x8b0000 });
            g.roundRect(-80, -25, 160, 50, 10);
            g.fill();
            g.setStrokeStyle({ color: 0xffffff, width: 2 });
            g.roundRect(-80, -25, 160, 50, 10);
            g.stroke();
          }}
        />
        <pixiText
          text="대련 (Sparring)"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: 0xffffff,
            fontWeight: "bold",
          }}
        />
      </pixiContainer>

      <pixiContainer
        x={window.innerWidth / 2 + 100}
        y={window.innerHeight / 2 + 150}
        interactive={true}
        cursor="pointer"
        onPointerDown={onStartTraining}
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.setFillStyle({ color: 0x4a4a4a });
            g.roundRect(-80, -25, 160, 50, 10);
            g.fill();
            g.setStrokeStyle({ color: 0xffffff, width: 2 });
            g.roundRect(-80, -25, 160, 50, 10);
            g.stroke();
          }}
        />
        <pixiText
          text="수련 (Training)"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: 0xffffff,
            fontWeight: "bold",
          }}
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
  return (
    <pixiContainer
      x={50}
      y={50}
      interactive={true}
      cursor="pointer"
      onPointerDown={onBack}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({ color: 0x666666 });
          g.roundRect(-30, -15, 60, 30, 5);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 1 });
          g.roundRect(-30, -15, 60, 30, 5);
          g.stroke();
        }}
      />
      <pixiText
        text="뒤로"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: 0xffffff,
        }}
      />
    </pixiContainer>
  );
}

export default App;
