import { useTick } from "@pixi/react";
import { useState, useCallback } from "react";
import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { Player } from "./Player";

interface GameState {
  player1Health: number;
  player2Health: number;
  roundTime: number;
  round: number;
  winner: string | null;
  isPaused: boolean;
  matchStarted: boolean;
}

interface AttackData {
  attacker: "player1" | "player2";
  technique: string;
  damage: number;
  position: { x: number; y: number };
}

export function GameEngine(): JSX.Element {
  const [gameState, setGameState] = useState<GameState>({
    player1Health: 100,
    player2Health: 100,
    roundTime: 90, // 90 seconds per round
    round: 1,
    winner: null,
    isPaused: false,
    matchStarted: false,
  });

  const [player1Pos, setPlayer1Pos] = useState({ x: 200, y: 400 });
  const [player2Pos, setPlayer2Pos] = useState({ x: 600, y: 400 });
  const [attacks, setAttacks] = useState<AttackData[]>([]);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  // Game loop with proper useTick typing
  useTick((ticker) => {
    const delta = ticker.deltaTime;

    if (!gameState.matchStarted || gameState.isPaused || gameState.winner)
      return;

    // Update round timer
    setGameState((prev) => ({
      ...prev,
      roundTime: Math.max(0, prev.roundTime - delta / 60),
    }));

    // Check for time out
    if (gameState.roundTime <= 0) {
      determineWinner();
    }

    // Process attacks
    processAttacks();
  });

  const startMatch = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      matchStarted: true,
      isPaused: false,
    }));

    setCombatLog([
      "경기 시작! (Match Start!)",
      "무예의 정신으로 싸우십시오 (Fight with martial spirit)",
    ]);
  }, []);

  const processAttacks = useCallback(() => {
    attacks.forEach((attack) => {
      const { attacker, technique, position } = attack;
      const defenderPos = attacker === "player1" ? player2Pos : player1Pos;

      // Check if attack hits (distance-based)
      const distance = Math.abs(position.x - defenderPos.x);
      const hitRange = 80; // Attack range

      if (distance <= hitRange) {
        // Calculate damage based on technique and positioning
        const actualDamage = calculateDamage(technique, distance, hitRange);

        if (attacker === "player1") {
          setGameState((prev) => ({
            ...prev,
            player2Health: Math.max(0, prev.player2Health - actualDamage),
          }));
        } else {
          setGameState((prev) => ({
            ...prev,
            player1Health: Math.max(0, prev.player1Health - actualDamage),
          }));
        }

        // Add to combat log
        const logMessage = `${technique} 적중! ${actualDamage} 피해 (${technique} Hit! ${actualDamage} damage)`;
        setCombatLog((prev) => [logMessage, ...prev].slice(0, 5));

        // Check for knockout
        if (gameState.player1Health <= 0 || gameState.player2Health <= 0) {
          determineWinner();
        }
      }
    });

    // Clear processed attacks
    setAttacks([]);
  }, [
    attacks,
    player1Pos,
    player2Pos,
    gameState.player1Health,
    gameState.player2Health,
  ]);

  const calculateDamage = useCallback(
    (technique: string, distance: number, maxRange: number): number => {
      // Base damage from technique name (Korean martial arts techniques)
      const baseDamages: Record<string, number> = {
        천둥벽력: 25, // Thunder Strike
        유수연타: 15, // Flowing Water Combo
        화염지창: 30, // Flame Spear
        벽력일섬: 35, // Lightning Flash
        선풍연격: 12, // Whirlwind Barrage
        수류반격: 20, // Water Return Strike
        반석방어: 10, // Bedrock Defense
        대지포옹: 22, // Earth's Embrace
      };

      const baseDamage = baseDamages[technique] || 10;

      // Distance-based accuracy multiplier (closer = more damage)
      const accuracyMultiplier = 1 - (distance / maxRange) * 0.5;

      return Math.floor(baseDamage * accuracyMultiplier);
    },
    []
  );

  const determineWinner = useCallback(() => {
    let winner: string;

    if (gameState.player1Health <= 0) {
      winner = "Player 2 승리! (Player 2 Victory!)";
    } else if (gameState.player2Health <= 0) {
      winner = "Player 1 승리! (Player 1 Victory!)";
    } else if (gameState.player1Health > gameState.player2Health) {
      winner = "Player 1 판정승! (Player 1 Decision Victory!)";
    } else if (gameState.player2Health > gameState.player1Health) {
      winner = "Player 2 판정승! (Player 2 Decision Victory!)";
    } else {
      winner = "무승부! (Draw!)";
    }

    setGameState((prev) => ({ ...prev, winner }));
    setCombatLog((prev) =>
      [winner, "경기 종료 (Match End)", ...prev].slice(0, 5)
    );
  }, [gameState.player1Health, gameState.player2Health]);

  const handleAttack = useCallback(
    (
      attacker: "player1" | "player2",
      technique: string,
      damage: number,
      position: { x: number; y: number }
    ) => {
      setAttacks((prev) => [
        ...prev,
        { attacker, technique, damage, position },
      ]);
    },
    []
  );

  const drawDojo = useCallback((graphics: PixiGraphics) => {
    graphics.clear();

    // Dojo floor (traditional Korean training hall)
    graphics.setFillStyle({ color: 0x8b4513 }); // Brown wood
    graphics.rect(0, 450, 800, 150);
    graphics.fill();

    // Dojo grid pattern
    graphics.setStrokeStyle({ color: 0x654321, width: 2 });
    for (let x = 0; x < 800; x += 100) {
      graphics.moveTo(x, 450);
      graphics.lineTo(x, 600);
      graphics.stroke();
    }

    // Center line
    graphics.setStrokeStyle({ color: 0xffffff, width: 3 });
    graphics.moveTo(400, 450);
    graphics.lineTo(400, 600);
    graphics.stroke();

    // Fighting area boundaries
    graphics.setStrokeStyle({ color: 0x8b0000, width: 4 });
    graphics.rect(50, 200, 700, 250);
    graphics.stroke();

    // Traditional Korean decoration (simplified)
    graphics.setFillStyle({ color: 0x8b0000 });
    graphics.circle(400, 100, 30);
    graphics.fill();

    graphics.setFillStyle({ color: 0xffffff });
    graphics.circle(400, 100, 20);
    graphics.fill();
  }, []);

  const resetMatch = useCallback(() => {
    setGameState({
      player1Health: 100,
      player2Health: 100,
      roundTime: 90,
      round: 1,
      winner: null,
      isPaused: false,
      matchStarted: false,
    });

    setPlayer1Pos({ x: 200, y: 400 });
    setPlayer2Pos({ x: 600, y: 400 });
    setAttacks([]);
    setCombatLog([]);
  }, []);

  return (
    <pixiContainer>
      {/* Dojo background */}
      <pixiGraphics draw={drawDojo} />

      {/* Players */}
      <Player
        x={player1Pos.x}
        y={player1Pos.y}
        isPlayerOne={true}
        onAttack={(technique, damage, position) =>
          handleAttack("player1", technique, damage, position)
        }
        onMove={setPlayer1Pos}
        opponentPosition={player2Pos}
      />

      <Player
        x={player2Pos.x}
        y={player2Pos.y}
        isPlayerOne={false}
        onAttack={(technique, damage, position) =>
          handleAttack("player2", technique, damage, position)
        }
        onMove={setPlayer2Pos}
        opponentPosition={player1Pos}
      />

      {/* UI Elements */}
      {/* Game title */}
      <pixiText
        text="흑괘 (Black Trigram)"
        x={400}
        y={30}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 24,
          fill: 0x8b0000,
          fontWeight: "bold",
        }}
      />

      {/* Health bars */}
      <pixiText
        text="Player 1"
        x={100}
        y={50}
        style={{ fontFamily: "Noto Sans KR", fontSize: 16, fill: 0xffffff }}
      />
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: 0x4caf50 });
          g.rect(0, 0, gameState.player1Health * 2, 20);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 2 });
          g.rect(0, 0, 200, 20);
          g.stroke();
        }}
        x={100}
        y={70}
      />

      <pixiText
        text="Player 2"
        x={500}
        y={50}
        style={{ fontFamily: "Noto Sans KR", fontSize: 16, fill: 0xffffff }}
      />
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: 0x4caf50 });
          g.rect(0, 0, gameState.player2Health * 2, 20);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 2 });
          g.rect(0, 0, 200, 20);
          g.stroke();
        }}
        x={500}
        y={70}
      />

      {/* Timer */}
      <pixiText
        text={`시간: ${Math.ceil(gameState.roundTime)}초`}
        x={400}
        y={50}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: gameState.roundTime < 10 ? 0xff0000 : 0xffffff,
          fontWeight: "bold",
        }}
      />

      {/* Combat log */}
      {combatLog.map((log, index) => (
        <pixiText
          key={index}
          text={log}
          x={20}
          y={500 + index * 20}
          alpha={1 - index * 0.2}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: 0xffffff,
          }}
        />
      ))}

      {/* Controls hint */}
      {!gameState.matchStarted && !gameState.winner && (
        <pixiContainer>
          <pixiText
            text="조작법 (Controls):"
            x={400}
            y={500}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 16,
              fill: 0xffffff,
              fontWeight: "bold",
            }}
          />
          <pixiText
            text="이동: WASD 또는 화살표 키 (Move: WASD or Arrow Keys)"
            x={400}
            y={520}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{ fontFamily: "Noto Sans KR", fontSize: 12, fill: 0xcccccc }}
          />
          <pixiText
            text="공격: 숫자키 1-8 (팔괘 기술) (Attack: Number Keys 1-8 - Eight Trigram Techniques)"
            x={400}
            y={540}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{ fontFamily: "Noto Sans KR", fontSize: 12, fill: 0xcccccc }}
          />
          <pixiText
            text="방어: 스페이스바 (Block: Spacebar)"
            x={400}
            y={560}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{ fontFamily: "Noto Sans KR", fontSize: 12, fill: 0xcccccc }}
          />
        </pixiContainer>
      )}

      {/* Start button */}
      {!gameState.matchStarted && !gameState.winner && (
        <pixiContainer
          interactive={true}
          onPointerDown={startMatch}
          cursor="pointer"
        >
          <pixiGraphics
            draw={(g: PixiGraphics) => {
              g.clear();
              g.setFillStyle({ color: 0x8b0000 });
              g.roundRect(-60, -20, 120, 40, 10);
              g.fill();
              g.setStrokeStyle({ color: 0xffffff, width: 2 });
              g.roundRect(-60, -20, 120, 40, 10);
              g.stroke();
            }}
            x={400}
            y={350}
          />
          <pixiText
            text="경기 시작"
            x={400}
            y={350}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 16,
              fill: 0xffffff,
              fontWeight: "bold",
            }}
          />
        </pixiContainer>
      )}

      {/* Winner announcement */}
      {gameState.winner && (
        <pixiContainer>
          <pixiGraphics
            draw={(g: PixiGraphics) => {
              g.clear();
              g.setFillStyle({ color: 0x000000, alpha: 0.8 });
              g.rect(0, 0, 800, 600);
              g.fill();
            }}
          />
          <pixiText
            text={gameState.winner}
            x={400}
            y={250}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 32,
              fill: 0xffd700,
              fontWeight: "bold",
            }}
          />
          <pixiContainer
            interactive={true}
            onPointerDown={resetMatch}
            cursor="pointer"
          >
            <pixiGraphics
              draw={(g: PixiGraphics) => {
                g.clear();
                g.setFillStyle({ color: 0x8b0000 });
                g.roundRect(-80, -25, 160, 50, 10);
                g.fill();
                g.setStrokeStyle({ color: 0xffffff, width: 2 });
                g.roundRect(-80, -25, 160, 50, 10);
                g.stroke();
              }}
              x={400}
              y={350}
            />
            <pixiText
              text="다시 시작"
              x={400}
              y={350}
              anchor={{ x: 0.5, y: 0.5 }}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 18,
                fill: 0xffffff,
                fontWeight: "bold",
              }}
            />
          </pixiContainer>
        </pixiContainer>
      )}
    </pixiContainer>
  );
}
