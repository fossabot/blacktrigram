import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

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

const UI_THEME = {
  TRADITIONAL_RED: 0x8b0000,
  TRADITIONAL_GOLD: 0xffd700,
  TRADITIONAL_BLACK: 0x000000,
  TRADITIONAL_WHITE: 0xffffff,
  KOREAN_GRAY: 0x666666,
  ACCENT_BLUE: 0x4a90e2,
  ENERGY_PURPLE: 0x9370db,
  HEALTH_GREEN: 0x4caf50,
  DANGER_RED: 0xff4444,
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
        g.setFillStyle({ color: UI_THEME.TRADITIONAL_BLACK, alpha: 0.7 });
        g.rect(0, 0, GAME_CONFIG.ARENA_WIDTH, GAME_CONFIG.ARENA_HEIGHT);
        g.fill();

        // Subtle Korean-inspired border pattern
        g.setStrokeStyle({
          color: UI_THEME.TRADITIONAL_RED,
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
  return (
    <pixiContainer x={window.innerWidth / 2} y={50}>
      {/* Enhanced background with iconic elements */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          // Traditional Korean title background
          g.setFillStyle({ color: UI_THEME.TRADITIONAL_BLACK, alpha: 0.9 });
          g.roundRect(-200, -25, 400, 80, 15);
          g.fill();

          // Decorative border with traditional patterns
          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_RED, width: 3 });
          g.roundRect(-200, -25, 400, 80, 15);
          g.stroke();

          // Inner golden accent
          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_GOLD, width: 1 });
          g.roundRect(-195, -20, 390, 70, 12);
          g.stroke();

          // Corner decorative elements (icon-like)
          const corners: Array<[number, number]> = [
            [-190, -15],
            [190, -15],
            [-190, 45],
            [190, 45],
          ];
          corners.forEach(([x, y]) => {
            g.setFillStyle({ color: UI_THEME.TRADITIONAL_GOLD, alpha: 0.8 });
            g.circle(x, y, 4);
            g.fill();
          });
        }}
      />

      {/* Enhanced title with better typography */}
      <pixiText
        text="⚔️ 흑괘 무술 도장 ⚔️"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 28,
          fill: UI_THEME.TRADITIONAL_RED,
          fontWeight: "bold",
          stroke: { color: UI_THEME.TRADITIONAL_WHITE, width: 1 },
        }}
      />
      <pixiText
        text="🥋 BLACK TRIGRAM MARTIAL DOJANG 🥋"
        y={25}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 14,
          fill: UI_THEME.TRADITIONAL_GOLD,
          letterSpacing: 1,
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
      {/* Enhanced health bar frame with icons */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Main frame with gradient-like effect
          g.setFillStyle({ color: UI_THEME.TRADITIONAL_BLACK, alpha: 0.95 });
          g.roundRect(-10, -10, 240, 80, 12);
          g.fill();

          // Traditional border
          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_RED, width: 3 });
          g.roundRect(-10, -10, 240, 80, 12);
          g.stroke();

          // Inner accent border
          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_GOLD, width: 1 });
          g.roundRect(-5, -5, 230, 70, 8);
          g.stroke();
        }}
      />

      {/* Player label with icon */}
      <pixiText
        text={`${COMBAT_ICONS.HEALTH} ${label}`}
        x={10}
        y={5}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: UI_THEME.TRADITIONAL_WHITE,
          fontWeight: "bold",
        }}
      />

      {/* Enhanced health bar with better visual feedback */}
      <pixiGraphics
        y={25}
        draw={(g: PixiGraphics) => {
          g.clear();

          // Background with subtle texture
          g.setFillStyle({ color: 0x2a2a2a });
          g.roundRect(10, 0, 200, 22, 11);
          g.fill();

          // Health fill with dynamic color
          const healthColor =
            health > 60
              ? UI_THEME.HEALTH_GREEN
              : health > 30
              ? UI_THEME.WARNING_ORANGE
              : UI_THEME.DANGER_RED;

          g.setFillStyle({ color: healthColor });
          g.roundRect(12, 2, health * 1.96, 18, 9);
          g.fill();

          // Health bar shine effect
          g.setFillStyle({ color: UI_THEME.TRADITIONAL_WHITE, alpha: 0.3 });
          g.roundRect(12, 2, health * 1.96, 8, 4);
          g.fill();

          // Border with player-specific color
          const borderColor = isPlayerOne
            ? UI_THEME.ACCENT_BLUE
            : UI_THEME.TRADITIONAL_RED;
          g.setStrokeStyle({ color: borderColor, width: 2 });
          g.roundRect(10, 0, 200, 22, 11);
          g.stroke();
        }}
      />

      {/* Health percentage text */}
      <pixiText
        text={`${health}%`}
        x={110}
        y={55}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 12,
          fill: UI_THEME.TRADITIONAL_WHITE,
          fontWeight: "bold",
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
      {/* Enhanced timer background */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          const bgColor = isUrgent
            ? UI_THEME.DANGER_RED
            : UI_THEME.TRADITIONAL_BLACK;
          g.setFillStyle({ color: bgColor, alpha: 0.9 });
          g.roundRect(-80, -20, 160, 40, 12);
          g.fill();

          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_GOLD, width: 2 });
          g.roundRect(-80, -20, 160, 40, 12);
          g.stroke();
        }}
      />

      <pixiText
        text={`⏱️ ${Math.ceil(gameState.roundTime)}초`}
        anchor={{ x: 0.5, y: 0.5 }}
        alpha={pulse}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: isUrgent ? 22 : 20,
          fill: isUrgent
            ? UI_THEME.TRADITIONAL_WHITE
            : UI_THEME.TRADITIONAL_GOLD,
          fontWeight: "bold",
          stroke: { color: UI_THEME.TRADITIONAL_BLACK, width: 2 },
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
      {/* Enhanced control panel */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Main panel background
          g.setFillStyle({ color: UI_THEME.TRADITIONAL_BLACK, alpha: 0.95 });
          g.roundRect(0, 0, 380, 140, 15);
          g.fill();

          // Traditional Korean border
          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_RED, width: 3 });
          g.roundRect(0, 0, 380, 140, 15);
          g.stroke();

          // Inner decorative border
          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_GOLD, width: 1 });
          g.roundRect(5, 5, 370, 130, 12);
          g.stroke();

          // Section dividers
          g.setStrokeStyle({
            color: UI_THEME.KOREAN_GRAY,
            width: 1,
            alpha: 0.5,
          });
          g.moveTo(20, 35);
          g.lineTo(360, 35);
          g.stroke();
        }}
      />

      {/* Enhanced control labels with icons */}
      <pixiText
        text="🎮 조작법 (Combat Controls)"
        x={20}
        y={20}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: UI_THEME.TRADITIONAL_GOLD,
          fontWeight: "bold",
        }}
      />

      <pixiText
        text="🏃 이동: WASD / 방향키"
        x={20}
        y={45}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 13,
          fill: UI_THEME.TRADITIONAL_WHITE,
        }}
      />

      <pixiText
        text="⚔️ 팔괘기술: 1-8 (Trigram Techniques)"
        x={20}
        y={65}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 13,
          fill: UI_THEME.TRADITIONAL_WHITE,
        }}
      />

      <pixiText
        text="🛡️ 방어: 스페이스 | 💨 급공: 마우스 클릭"
        x={20}
        y={85}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 13,
          fill: UI_THEME.TRADITIONAL_WHITE,
        }}
      />

      <pixiText
        text="🎯 정확한 타이밍으로 급소를 노려라!"
        x={20}
        y={110}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: UI_THEME.WARNING_ORANGE,
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
          g.setFillStyle({ color: UI_THEME.TRADITIONAL_BLACK, alpha: 0.8 });
          g.rect(0, 0, window.innerWidth, 50);
          g.fill();

          g.setStrokeStyle({
            color: UI_THEME.TRADITIONAL_RED,
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
              g.setFillStyle({ color: UI_THEME.TRADITIONAL_RED, alpha: 0.3 });
              g.circle(0, 0, 20);
              g.fill();

              g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_GOLD, width: 1 });
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
              fill: UI_THEME.TRADITIONAL_WHITE,
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
  return (
    <pixiContainer
      x={window.innerWidth / 2}
      y={window.innerHeight / 2 + 100}
      interactive={true}
      cursor="pointer"
      onPointerDown={onStartMatch}
    >
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          const pulse = Math.sin(gameTime * 0.1) * 0.3 + 0.7;
          g.setFillStyle({ color: 0x8b0000, alpha: pulse });
          g.roundRect(-120, -40, 240, 80, 15);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 3 });
          g.roundRect(-120, -40, 240, 80, 15);
          g.stroke();
        }}
      />
      <pixiText
        text="대련 시작!"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 24,
          fill: 0xffffff,
          fontWeight: "bold",
        }}
      />
      <pixiText
        text="Begin Combat"
        y={25}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 16,
          fill: 0xcccccc,
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
  return (
    <pixiContainer>
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: 0x000000, alpha: 0.8 });
          g.rect(0, 0, window.innerWidth, window.innerHeight);
          g.fill();
        }}
      />

      <pixiText
        text={`${winner} 승리! (Victory!)`}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 50}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 32,
          fill: 0x8b0000,
          fontWeight: "bold",
        }}
      />

      <pixiText
        text="무예의 도를 완성하였다 (The martial way is complete)"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: 0xffffff,
        }}
      />

      <pixiContainer
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 80}
        interactive={true}
        cursor="pointer"
        onPointerDown={onResetMatch}
      >
        <pixiGraphics
          draw={(g: PixiGraphics) => {
            g.clear();
            g.setFillStyle({ color: 0x666666 });
            g.roundRect(-60, -20, 120, 40, 8);
            g.fill();
            g.setStrokeStyle({ color: 0xffffff, width: 2 });
            g.roundRect(-60, -20, 120, 40, 8);
            g.stroke();
          }}
        />
        <pixiText
          text="다시 대련 (Rematch)"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: 0xffffff,
          }}
        />
      </pixiContainer>
    </pixiContainer>
  );
}
