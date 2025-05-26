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

export function GameUI({
  gameState,
  gameTime,
  combatLog,
  onStartMatch,
  onResetMatch,
}: GameUIProps): JSX.Element {
  return (
    <pixiContainer>
      <pixiText
        text="흑괘 무술 대련 (Black Trigram Martial Combat)"
        x={GAME_CONFIG.ARENA_WIDTH / 2}
        y={30}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 20,
          fill: 0x8b0000,
          fontWeight: "bold",
        }}
      />
      <HealthBar
        label="선수 1 (Player 1)"
        health={gameState.player1Health}
        x={80}
        y={50}
      />
      <HealthBar
        label="선수 2 (Player 2)"
        health={gameState.player2Health}
        x={520}
        y={50}
      />
      <Timer gameState={gameState} gameTime={gameTime} />
      <CombatLog combatLog={combatLog} />
      {!gameState.matchStarted && !gameState.winner && <ControlInstructions />}
      {!gameState.matchStarted && !gameState.winner && (
        <StartButton onStartMatch={onStartMatch} gameTime={gameTime} />
      )}
      {gameState.winner && (
        <VictoryScreen winner={gameState.winner} onResetMatch={onResetMatch} />
      )}
    </pixiContainer>
  );
}

interface HealthBarProps {
  readonly label: string;
  readonly health: number;
  readonly x: number;
  readonly y: number;
}

function HealthBar({ label, health, x, y }: HealthBarProps): JSX.Element {
  return (
    <pixiContainer x={x} y={y}>
      <pixiText
        text={label}
        style={{ fontFamily: "Noto Sans KR", fontSize: 14, fill: 0xffffff }}
      />
      <pixiGraphics
        y={20}
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: 0x333333 });
          g.rect(0, 0, 200, 25);
          g.fill();
          g.setFillStyle({
            color: health > 30 ? 0x4caf50 : 0xff4444,
          });
          g.rect(2, 2, health * 1.96, 21);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 2 });
          g.rect(0, 0, 200, 25);
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
      x={GAME_CONFIG.ARENA_WIDTH / 2}
      y={55}
      anchor={{ x: 0.5, y: 0.5 }}
      alpha={
        gameState.roundTime < 10 ? Math.sin(gameTime * 0.2) * 0.5 + 0.5 : 1.0
      }
      style={{
        fontFamily: "Noto Sans KR",
        fontSize: 18,
        fill: gameState.roundTime < 10 ? 0xff0000 : 0xffffff,
        fontWeight: "bold",
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

function ControlInstructions(): JSX.Element {
  return (
    <pixiContainer>
      <pixiText
        text="조작법 (Controls): WASD-이동 | 1-8-팔괘기술 | 스페이스-방어"
        x={GAME_CONFIG.ARENA_WIDTH / 2}
        y={520}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: 0xcccccc,
        }}
      />
      <pixiText
        text="Player 1: WASD+1-8 | Click/Touch for quick attack"
        x={GAME_CONFIG.ARENA_WIDTH / 2}
        y={540}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          fill: 0x999999,
        }}
      />
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
      x={GAME_CONFIG.ARENA_WIDTH / 2}
      y={350}
      interactive={true}
      cursor="pointer"
      onPointerDown={onStartMatch}
    >
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          const pulse = Math.sin(gameTime * 0.1) * 0.2 + 0.8;
          g.setFillStyle({ color: 0x8b0000, alpha: pulse });
          g.roundRect(-80, -30, 160, 60, 10);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 2 });
          g.roundRect(-80, -30, 160, 60, 10);
          g.stroke();
        }}
      />
      <pixiText
        text="대련 시작!"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: 0xffffff,
          fontWeight: "bold",
        }}
      />
      <pixiText
        text="Begin Combat"
        y={20}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: 12,
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
          g.rect(0, 0, GAME_CONFIG.ARENA_WIDTH, GAME_CONFIG.ARENA_HEIGHT);
          g.fill();
        }}
      />

      <pixiText
        text={`${winner} 승리! (Victory!)`}
        x={GAME_CONFIG.ARENA_WIDTH / 2}
        y={GAME_CONFIG.ARENA_HEIGHT / 2 - 50}
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
        x={GAME_CONFIG.ARENA_WIDTH / 2}
        y={GAME_CONFIG.ARENA_HEIGHT / 2}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: 0xffffff,
        }}
      />

      <pixiContainer
        x={GAME_CONFIG.ARENA_WIDTH / 2}
        y={GAME_CONFIG.ARENA_HEIGHT / 2 + 80}
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
