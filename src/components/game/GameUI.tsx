import { useState, useEffect } from "react";
import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { useTexture } from "../../hooks/useTexture";

interface GameState {
  readonly player1Health: number;
  readonly player2Health: number;
  readonly roundTime: number;
  readonly round: number;
  readonly winner: string | null;
  readonly isPaused: boolean;
  readonly matchStarted: boolean;
  readonly gamePhase: "preparation" | "combat" | "victory";
}

interface GameUIProps {
  readonly gameState: GameState;
  readonly gameTime: number;
  readonly combatLog: readonly string[];
  readonly onStartMatch: () => void;
  readonly onResetMatch: () => void;
}

const GAME_CONFIG = {
  ARENA_WIDTH: 800,
  ARENA_HEIGHT: 600,
} as const;

const DARK_TRIGRAM_UI_THEME = {
  PRIMARY_CYAN: 0x00ffd0,
  DARK_BG: 0x0a0e12,
  DARKER_BG: 0x181c20,
  MEDIUM_BG: 0x23272b,
  VITAL_ORANGE: 0xff4400,
  CRITICAL_RED: 0xff3030,
  WHITE: 0xffffff,
  GRAY: 0x666666,
  HEALTH_CYAN: 0x00ffd0,
  WARNING_ORANGE: 0xff9800,
} as const;

// Add icon mappings for better visual representation
const COMBAT_ICONS = {
  HEALTH: "❤️",
  STAMINA: "⚡",
  ATTACK: "⚔️",
  DEFENSE: "🛡️",
  PRECISION: "🎯",
  POWER: "💥",
  SPEED: "💨",
  BALANCE: "⚖️",
} as const;

export function GameUI({
  gameState,
  gameTime,
  combatLog,
  onStartMatch,
  onResetMatch,
}: GameUIProps): JSX.Element {
  return (
    <pixiContainer>
      {/* Traditional Korean background overlay */}
      <BackgroundOverlay />

      {/* Centered game title with Korean styling */}
      <GameTitle />

      {/* Enhanced health bars with traditional styling */}
      <HealthBar
        label="선수 1 (Player 1)"
        health={gameState.player1Health}
        isPlayerOne={true}
      />
      <HealthBar
        label="선수 2 (Player 2)"
        health={gameState.player2Health}
        isPlayerOne={false}
      />

      {/* Centered timer with Korean styling */}
      <Timer gameState={gameState} gameTime={gameTime} />

      {/* Traditional Korean control legend */}
      <ControlLegend gameStarted={gameState.matchStarted} />

      {/* Enhanced combat log with Korean styling */}
      <CombatLog combatLog={combatLog} />

      {/* Trigram symbols as decorative elements */}
      <TrigramDecorations />

      {!gameState.matchStarted && !gameState.winner && (
        <StartButton onStartMatch={onStartMatch} gameTime={gameTime} />
      )}

      {gameState.winner && (
        <VictoryScreen winner={gameState.winner} onResetMatch={onResetMatch} />
      )}
    </pixiContainer>
  );
}

function BackgroundOverlay(): JSX.Element {
  return (
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();
        // Traditional Korean pattern background
        g.setFillStyle({ color: DARK_TRIGRAM_UI_THEME.DARKER_BG, alpha: 0.7 });
        g.rect(0, 0, GAME_CONFIG.ARENA_WIDTH, GAME_CONFIG.ARENA_HEIGHT);
        g.fill();

        // Subtle Korean-inspired border pattern
        g.setStrokeStyle({
          color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
          width: 2,
          alpha: 0.3,
        });
        g.rect(
          10,
          10,
          GAME_CONFIG.ARENA_WIDTH - 20,
          GAME_CONFIG.ARENA_HEIGHT - 20
        );
        g.stroke();
      }}
    />
  );
}

function GameTitle(): JSX.Element {
  const { texture: logoTexture } = useTexture("/dark-trigram-256.png");

  return (
    <pixiContainer x={window.innerWidth / 2} y={50}>
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Dark background with deeper panel
          g.setFillStyle({ color: 0x000a12, alpha: 0.95 });
          g.roundRect(-220, -30, 440, 85, 15);
          g.fill();

          // Cyan glowing border with futuristic style
          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 3,
          });
          g.roundRect(-220, -30, 440, 85, 15);
          g.stroke();

          // Inner glow with tech accent
          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 1,
            alpha: 0.7,
          });
          g.roundRect(-210, -20, 420, 65, 12);
          g.stroke();

          // Add tech-looking diagonal slashes
          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 1,
            alpha: 0.4,
          });
          g.moveTo(-220, 0);
          g.lineTo(-190, -30);
          g.moveTo(220, 0);
          g.lineTo(190, -30);
          g.stroke();
        }}
      />

      {/* Use the game logo sprite instead of text */}
      {logoTexture && (
        <pixiSprite
          texture={logoTexture}
          scale={{ x: 0.2, y: 0.2 }}
          anchor={{ x: 0.5, y: 0.5 }}
          y={-7}
          alpha={0.9}
        />
      )}

      <pixiText
        text="🥋 DARK TRIGRAM MARTIAL DOJANG 🥋"
        y={25}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Orbitron, monospace",
          fontSize: 14,
          fill: DARK_TRIGRAM_UI_THEME.WHITE,
          letterSpacing: 1,
          dropShadow: {
            color: 0x00ffd0,
            blur: 4,
            distance: 0,
          },
        }}
      />
    </pixiContainer>
  );
}

interface HealthBarProps {
  readonly label: string;
  readonly health: number;
  readonly isPlayerOne: boolean;
}

function HealthBar({
  label,
  health,
  isPlayerOne,
}: HealthBarProps): JSX.Element {
  const centeredX = isPlayerOne ? 100 : window.innerWidth - 320;
  const centeredY = 100;

  return (
    <pixiContainer x={centeredX} y={centeredY}>
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Dark frame
          g.setFillStyle({ color: DARK_TRIGRAM_UI_THEME.DARK_BG, alpha: 0.95 });
          g.roundRect(-10, -10, 240, 80, 12);
          g.fill();

          // Cyan border
          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 3,
          });
          g.roundRect(-10, -10, 240, 80, 12);
          g.stroke();

          // Inner glow
          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 1,
            alpha: 0.7,
          });
          g.roundRect(-5, -5, 230, 70, 8);
          g.stroke();
        }}
      />

      <pixiText
        text={`${COMBAT_ICONS.HEALTH} ${label}`}
        x={10}
        y={5}
        style={{
          fontFamily: "Orbitron, Noto Sans KR",
          fontSize: 14,
          fill: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
          fontWeight: "bold",
          dropShadow: {
            color: 0x00ffd0,
            blur: 4,
            distance: 0,
          },
        }}
      />

      <pixiGraphics
        y={25}
        draw={(g: PixiGraphics) => {
          g.clear();

          // Dark background
          g.setFillStyle({ color: DARK_TRIGRAM_UI_THEME.MEDIUM_BG });
          g.roundRect(10, 0, 200, 22, 11);
          g.fill();

          // Health fill with dynamic color
          const healthColor =
            health > 60
              ? DARK_TRIGRAM_UI_THEME.HEALTH_CYAN
              : health > 30
              ? DARK_TRIGRAM_UI_THEME.WARNING_ORANGE
              : DARK_TRIGRAM_UI_THEME.CRITICAL_RED;

          g.setFillStyle({ color: healthColor });
          g.roundRect(12, 2, health * 1.96, 18, 9);
          g.fill();

          // Cyan glow border
          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 2,
          });
          g.roundRect(10, 0, 200, 22, 11);
          g.stroke();
        }}
      />

      <pixiText
        text={`${health}%`}
        x={110}
        y={55}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Orbitron, monospace",
          fontSize: 12,
          fill: DARK_TRIGRAM_UI_THEME.WHITE,
          fontWeight: "bold",
          dropShadow: {
            color: 0x00ffd0,
            blur: 2,
            distance: 0,
          },
        }}
      />
    </pixiContainer>
  );
}

interface TimerProps {
  readonly gameState: GameState;
  readonly gameTime: number;
}

function Timer({ gameState, gameTime }: TimerProps): JSX.Element {
  const isUrgent = gameState.roundTime < 15;
  const pulse = isUrgent ? Math.sin(gameTime * 0.3) * 0.4 + 0.6 : 1.0;

  return (
    <pixiContainer x={window.innerWidth / 2} y={140}>
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          const bgColor = isUrgent
            ? DARK_TRIGRAM_UI_THEME.CRITICAL_RED
            : DARK_TRIGRAM_UI_THEME.DARK_BG;
          g.setFillStyle({ color: bgColor, alpha: 0.9 });
          g.roundRect(-80, -20, 160, 40, 12);
          g.fill();

          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 2,
          });
          g.roundRect(-80, -20, 160, 40, 12);
          g.stroke();
        }}
      />

      <pixiText
        text={`⏱️ ${Math.ceil(gameState.roundTime)}초`}
        anchor={{ x: 0.5, y: 0.5 }}
        alpha={pulse}
        style={{
          fontFamily: "Orbitron, Noto Sans KR",
          fontSize: isUrgent ? 22 : 20,
          fill: isUrgent
            ? DARK_TRIGRAM_UI_THEME.WHITE
            : DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
          fontWeight: "bold",
          dropShadow: {
            color: 0x00ffd0,
            blur: 6,
            distance: 0,
          },
        }}
      />
    </pixiContainer>
  );
}

interface CombatLogProps {
  readonly combatLog: readonly string[];
}

function CombatLog({ combatLog }: CombatLogProps): JSX.Element {
  return (
    <pixiContainer x={20} y={480}>
      {combatLog.slice(-5).map((message, index) => (
        <pixiText
          key={index}
          text={message}
          y={index * 15}
          alpha={1 - index * 0.15}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: 0xffffff,
          }}
        />
      ))}
    </pixiContainer>
  );
}

function ControlLegend({ gameStarted }: { gameStarted: boolean }): JSX.Element {
  if (!gameStarted) return <></>;

  return (
    <pixiContainer x={50} y={window.innerHeight - 180}>
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Dark panel background
          g.setFillStyle({ color: DARK_TRIGRAM_UI_THEME.DARK_BG, alpha: 0.95 });
          g.roundRect(0, 0, 380, 140, 15);
          g.fill();

          // Cyan border
          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 3,
          });
          g.roundRect(0, 0, 380, 140, 15);
          g.stroke();

          // Inner glow
          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 1,
            alpha: 0.7,
          });
          g.roundRect(5, 5, 370, 130, 12);
          g.stroke();
        }}
      />

      <pixiText
        text="🎮 조작법 (Combat Controls)"
        x={20}
        y={20}
        style={{
          fontFamily: "Orbitron, Noto Sans KR",
          fontSize: 16,
          fill: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
          fontWeight: "bold",
          dropShadow: {
            color: 0x00ffd0,
            blur: 4,
            distance: 0,
          },
        }}
      />

      <pixiText
        text="🏃 이동: WASD / 방향키"
        x={20}
        y={45}
        style={{
          fontFamily: "Orbitron, Noto Sans KR",
          fontSize: 13,
          fill: DARK_TRIGRAM_UI_THEME.WHITE,
          dropShadow: {
            color: 0x00ffd0,
            blur: 2,
            distance: 0,
          },
        }}
      />

      <pixiText
        text="⚔️ 팔괘기술: 1-8 (Trigram Techniques)"
        x={20}
        y={65}
        style={{
          fontFamily: "Orbitron, Noto Sans KR",
          fontSize: 13,
          fill: DARK_TRIGRAM_UI_THEME.WHITE,
          dropShadow: {
            color: 0x00ffd0,
            blur: 2,
            distance: 0,
          },
        }}
      />

      <pixiText
        text="🛡️ 방어: 스페이스 | 💨 급공: 마우스 클릭"
        x={20}
        y={85}
        style={{
          fontFamily: "Orbitron, Noto Sans KR",
          fontSize: 13,
          fill: DARK_TRIGRAM_UI_THEME.WHITE,
          dropShadow: {
            color: 0x00ffd0,
            blur: 2,
            distance: 0,
          },
        }}
      />

      <pixiText
        text="🎯 정확한 타이밍으로 급소를 노려라!"
        x={20}
        y={110}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: DARK_TRIGRAM_UI_THEME.WARNING_ORANGE,
          fontStyle: "italic",
        }}
      />
    </pixiContainer>
  );
}

function TrigramDecorations(): JSX.Element {
  const trigramData = [
    { symbol: "☰", icon: "🔥", name: "Heaven" },
    { symbol: "☱", icon: "🌊", name: "Lake" },
    { symbol: "☲", icon: "⚡", name: "Fire" },
    { symbol: "☳", icon: "💥", name: "Thunder" },
    { symbol: "☴", icon: "🌪️", name: "Wind" },
    { symbol: "☵", icon: "🛡️", name: "Water" },
    { symbol: "☶", icon: "🗿", name: "Mountain" },
    { symbol: "☷", icon: "🤜", name: "Earth" },
  ];

  return (
    <pixiContainer x={0} y={window.innerHeight - 60}>
      {/* Enhanced decorative background */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({
            color: DARK_TRIGRAM_UI_THEME.DARKER_BG,
            alpha: 0.8,
          });
          g.rect(0, 0, window.innerWidth, 50);
          g.fill();

          g.setStrokeStyle({
            color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
            width: 2,
            alpha: 0.6,
          });
          g.moveTo(0, 0);
          g.lineTo(window.innerWidth, 0);
          g.stroke();
        }}
      />

      {trigramData.map((trigram, index) => (
        <pixiContainer key={index} x={80 + index * 120} y={25}>
          {/* Individual trigram background */}
          <pixiGraphics
            draw={(g: PixiGraphics) => {
              g.clear();
              g.setFillStyle({
                color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
                alpha: 0.3,
              });
              g.circle(0, 0, 20);
              g.fill();

              g.setStrokeStyle({
                color: DARK_TRIGRAM_UI_THEME.PRIMARY_CYAN,
                width: 1,
              });
              g.circle(0, 0, 20);
              g.stroke();
            }}
          />

          <pixiText
            text={`${trigram.icon}${trigram.symbol}`}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "serif",
              fontSize: 14,
              fill: DARK_TRIGRAM_UI_THEME.WHITE,
            }}
          />
        </pixiContainer>
      ))}
    </pixiContainer>
  );
}

interface StartButtonProps {
  readonly onStartMatch: () => void;
  readonly gameTime: number;
}

function StartButton({
  onStartMatch,
  gameTime,
}: StartButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <pixiContainer
      x={window.innerWidth / 2}
      y={window.innerHeight / 2 + 100}
      interactive={true}
      cursor="pointer"
      onPointerDown={onStartMatch}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          const pulse = Math.sin(gameTime * 0.1) * 0.3 + 0.7;

          // Cyberpunk-style button with deeper background
          g.setFillStyle({ color: 0x000a12, alpha: 0.95 });
          g.roundRect(-140, -50, 280, 100, 15);
          g.fill();

          // Dynamic border
          g.setStrokeStyle({
            color: isHovered ? 0x00ffd0 : 0x005566,
            width: isHovered ? 3 : 2,
            alpha: pulse,
          });
          g.roundRect(-140, -50, 280, 100, 15);
          g.stroke();

          // Inner tech accent
          g.setStrokeStyle({
            color: 0x00ffd0,
            width: 1,
            alpha: isHovered ? 0.7 : 0.4,
          });
          g.roundRect(-130, -40, 260, 80, 12);
          g.stroke();

          // Tech accent triangles on corners
          g.setFillStyle({ color: 0x00ffd0, alpha: isHovered ? 0.7 : 0.4 });
          g.moveTo(-140, -30);
          g.lineTo(-120, -50);
          g.lineTo(-140, -50);
          g.lineTo(-140, -30);
          g.fill();

          g.moveTo(140, -30);
          g.lineTo(120, -50);
          g.lineTo(140, -50);
          g.lineTo(140, -30);
          g.fill();

          g.moveTo(-140, 30);
          g.lineTo(-120, 50);
          g.lineTo(-140, 50);
          g.lineTo(-140, 30);
          g.fill();

          g.moveTo(140, 30);
          g.lineTo(120, 50);
          g.lineTo(140, 50);
          g.lineTo(140, 30);
          g.fill();

          // Add pulsing glow effect when hovered
          if (isHovered) {
            g.setStrokeStyle({
              color: 0x00ffd0,
              width: 2,
              alpha: pulse * 0.5,
            });
            g.roundRect(-150, -60, 300, 120, 20);
            g.stroke();
          }
        }}
      />
      <pixiText
        text="대련 시작!"
        anchor={{ x: 0.5, y: 0.5 }}
        y={-15}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 28,
          fill: isHovered ? 0x00ffd0 : 0xffffff,
          fontWeight: "bold",
          ...(isHovered && {
            dropShadow: {
              color: 0x00ffd0,
              blur: 6,
              distance: 0,
            },
          }),
        }}
      />
      <pixiText
        text="Begin Combat"
        y={15}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Orbitron",
          fontSize: 18,
          fill: isHovered ? 0xffffff : 0xaaaaaa,
          letterSpacing: 2,
        }}
      />
    </pixiContainer>
  );
}

interface VictoryScreenProps {
  readonly winner: string;
  readonly onResetMatch: () => void;
}

function VictoryScreen({
  winner,
  onResetMatch,
}: VictoryScreenProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState<number>(0);
  const { texture: logoTexture } = useTexture("/dark-trigram-256.png");

  // Add animation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t: number) => t + 0.016);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <pixiContainer>
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: 0x000000, alpha: 0.8 });
          g.rect(0, 0, window.innerWidth, window.innerHeight);
          g.fill();

          // Add cyberpunk scan lines effect
          g.setStrokeStyle({ color: 0x00ffd0, width: 1, alpha: 0.05 });
          for (let y = 0; y < window.innerHeight; y += 3) {
            g.moveTo(0, y);
            g.lineTo(window.innerWidth, y);
            g.stroke();
          }

          // Dynamic energy particles
          for (let i = 0; i < 20; i++) {
            const x =
              (Math.sin(time * 0.01 + i * 0.8) * window.innerWidth) / 2 +
              window.innerWidth / 2;
            const y =
              (Math.cos(time * 0.012 + i * 1.2) * window.innerHeight) / 2 +
              window.innerHeight / 2;
            const alpha = Math.sin(time * 0.02 + i) * 0.2 + 0.2;

            g.setFillStyle({ color: 0x00ffd0, alpha });
            g.circle(x, y, 2 + Math.sin(time * 0.03 + i) * 1);
            g.fill();
          }
        }}
      />

      {/* Victory logo */}
      {logoTexture && (
        <pixiSprite
          texture={logoTexture}
          x={window.innerWidth / 2}
          y={window.innerHeight / 2 - 130}
          scale={{ x: 0.3, y: 0.3 }}
          anchor={{ x: 0.5, y: 0.5 }}
          alpha={0.9}
        />
      )}

      <pixiText
        text={`${winner} 승리! (Victory!)`}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 20}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 32,
          fill: 0x00ffd0,
          fontWeight: "bold",
          dropShadow: {
            color: 0x00ffd0,
            blur: 10,
            distance: 0,
          },
        }}
      />

      <pixiText
        text="무예의 도를 완성하였다 (The martial way is complete)"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 20}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: 0xffffff,
          dropShadow: {
            color: 0x00ffd0,
            blur: 4,
            distance: 0,
          },
        }}
      />

      <pixiContainer
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 100}
        interactive={true}
        cursor="pointer"
        onPointerDown={onResetMatch}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <pixiGraphics
          draw={(g: PixiGraphics) => {
            g.clear();
            const pulse = Math.sin(time * 0.1) * 0.3 + 0.7;

            // Cyberpunk button
            g.setFillStyle({ color: 0x000a12, alpha: 0.95 });
            g.roundRect(-80, -25, 160, 50, 10);
            g.fill();

            g.setStrokeStyle({
              color: isHovered ? 0x00ffd0 : 0x005566,
              width: isHovered ? 3 : 2,
              alpha: pulse,
            });
            g.roundRect(-80, -25, 160, 50, 10);
            g.stroke();

            // Tech accent corners
            g.setFillStyle({ color: 0x00ffd0, alpha: isHovered ? 0.6 : 0.3 });
            g.moveTo(-80, -15);
            g.lineTo(-70, -25);
            g.lineTo(-80, -25);
            g.lineTo(-80, -15);
            g.fill();

            g.moveTo(80, -15);
            g.lineTo(70, -25);
            g.lineTo(80, -25);
            g.lineTo(80, -15);
            g.fill();

            if (isHovered) {
              g.setStrokeStyle({
                color: 0x00ffd0,
                width: 2,
                alpha: pulse * 0.5,
              });
              g.roundRect(-90, -35, 180, 70, 15);
              g.stroke();
            }
          }}
        />
        <pixiText
          text="다시 대련 (Rematch)"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: isHovered ? 0x00ffd0 : 0xffffff,
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
    </pixiContainer>
  );
}
