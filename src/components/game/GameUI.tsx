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
    <pixiContainer x={window.innerWidth / 2} y={40}>
      <pixiText
        text="흑괘 무술 도장"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 32,
          fill: UI_THEME.TRADITIONAL_RED,
          fontWeight: "bold",
          stroke: { color: UI_THEME.TRADITIONAL_WHITE, width: 1 },
        }}
      />
      <pixiText
        text="BLACK TRIGRAM MARTIAL DOJANG"
        y={30}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 16,
          fill: UI_THEME.KOREAN_GRAY,
          letterSpacing: 2,
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
  // Center health bars better
  const centeredX = isPlayerOne ? 80 : window.innerWidth - 300;
  const centeredY = 80;

  return (
    <pixiContainer x={centeredX} y={centeredY}>
      {/* Traditional Korean frame */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_RED, width: 3 });
          g.rect(-5, -5, 220, 60);
          g.stroke();

          g.setFillStyle({ color: UI_THEME.TRADITIONAL_BLACK, alpha: 0.9 });
          g.rect(-5, -5, 220, 60);
          g.fill();
        }}
      />

      <pixiText
        text={label}
        x={10}
        y={10}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: UI_THEME.TRADITIONAL_WHITE,
          fontWeight: "bold",
        }}
      />

      <pixiGraphics
        y={30}
        draw={(g: PixiGraphics) => {
          g.clear();
          // Background
          g.setFillStyle({ color: 0x333333 });
          g.rect(10, 0, 200, 20);
          g.fill();

          // Health bar with Korean colors
          const healthColor =
            health > 30
              ? isPlayerOne
                ? UI_THEME.ACCENT_BLUE
                : UI_THEME.TRADITIONAL_RED
              : 0xff4444;
          g.setFillStyle({ color: healthColor });
          g.rect(12, 2, health * 1.96, 16);
          g.fill();

          // Traditional border
          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_GOLD, width: 2 });
          g.rect(10, 0, 200, 20);
          g.stroke();
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
  return (
    <pixiText
      text={`시간: ${Math.ceil(gameState.roundTime)}초`}
      x={window.innerWidth / 2}
      y={120}
      anchor={{ x: 0.5, y: 0.5 }}
      alpha={
        gameState.roundTime < 10 ? Math.sin(gameTime * 0.2) * 0.5 + 0.5 : 1.0
      }
      style={{
        fontFamily: "Noto Sans KR",
        fontSize: 24,
        fill: gameState.roundTime < 10 ? 0xff0000 : 0xffffff,
        fontWeight: "bold",
        stroke: { color: 0x000000, width: 2 },
      }}
    />
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
    <pixiContainer x={40} y={window.innerHeight - 160}>
      {/* Traditional Korean panel background - larger and more visible */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: UI_THEME.TRADITIONAL_BLACK, alpha: 0.95 });
          g.roundRect(0, 0, 320, 120, 10);
          g.fill();

          g.setStrokeStyle({ color: UI_THEME.TRADITIONAL_RED, width: 3 });
          g.roundRect(0, 0, 320, 120, 10);
          g.stroke();
        }}
      />

      <pixiText
        text="조작법 (Controls)"
        x={15}
        y={15}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: UI_THEME.TRADITIONAL_GOLD,
          fontWeight: "bold",
        }}
      />

      <pixiText
        text="이동: WASD / 방향키"
        x={15}
        y={40}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: UI_THEME.TRADITIONAL_WHITE,
        }}
      />

      <pixiText
        text="팔괘기술: 1-8"
        x={15}
        y={60}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: UI_THEME.TRADITIONAL_WHITE,
        }}
      />

      <pixiText
        text="방어: 스페이스 | 급공: 클릭"
        x={15}
        y={80}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: UI_THEME.TRADITIONAL_WHITE,
        }}
      />
    </pixiContainer>
  );
}

function TrigramDecorations(): JSX.Element {
  const symbols = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];

  return (
    <>
      {symbols.map((symbol, index) => (
        <pixiText
          key={index}
          text={symbol}
          x={50 + index * 90}
          y={window.innerHeight - 30}
          style={{
            fontFamily: "serif",
            fontSize: 16,
            fill: UI_THEME.TRADITIONAL_RED,
          }}
          alpha={0.4}
        />
      ))}
    </>
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
