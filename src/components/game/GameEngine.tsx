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
  gamePhase: "preparation" | "combat" | "victory";
}

interface AttackData {
  attacker: "player1" | "player2";
  technique: string;
  damage: number;
  position: { x: number; y: number };
  timestamp: number;
}

interface HitEffect {
  id: string;
  x: number;
  y: number;
  damage: number;
  technique: string;
  life: number;
  maxLife: number;
}

export function GameEngine(): JSX.Element {
  const [gameState, setGameState] = useState<GameState>({
    player1Health: 100,
    player2Health: 100,
    roundTime: 90,
    round: 1,
    winner: null,
    isPaused: false,
    matchStarted: false,
    gamePhase: "preparation",
  });

  const [player1Pos, setPlayer1Pos] = useState({ x: 200, y: 400 });
  const [player2Pos, setPlayer2Pos] = useState({ x: 600, y: 400 });
  const [attacks, setAttacks] = useState<AttackData[]>([]);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const [gameTime, setGameTime] = useState<number>(0);

  // Game loop with proper timing
  useTick((ticker) => {
    const delta = ticker.deltaTime;
    setGameTime((prev) => prev + delta);

    if (!gameState.matchStarted || gameState.isPaused || gameState.winner)
      return;

    // Update round timer
    setGameState((prev) => ({
      ...prev,
      roundTime: Math.max(0, prev.roundTime - delta / 60),
    }));

    // Update hit effects
    setHitEffects((prev) =>
      prev
        .map((effect) => ({ ...effect, life: effect.life - delta }))
        .filter((effect) => effect.life > 0)
    );

    // Check for time out
    if (gameState.roundTime <= 0 && gameState.gamePhase === "combat") {
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
      gamePhase: "combat",
    }));

    setCombatLog([
      "경기 시작! (Match Start!)",
      "팔괘 무술로 싸우십시오 (Fight with Eight Trigram techniques)",
      "급소를 노려라! (Target vital points!)",
    ]);
  }, []);

  const processAttacks = useCallback(() => {
    attacks.forEach((attack) => {
      const { attacker, technique, position } = attack;
      const defenderPos = attacker === "player1" ? player2Pos : player1Pos;

      // Check if attack hits (distance and timing based)
      const distance = Math.sqrt(
        Math.pow(position.x - defenderPos.x, 2) +
          Math.pow(position.y - defenderPos.y, 2)
      );
      const hitRange = 100; // Attack range

      if (distance <= hitRange) {
        // Calculate damage based on technique, distance, and timing
        const actualDamage = calculateDamage(technique, distance, hitRange);

        // Create hit effect
        const hitEffect: HitEffect = {
          id: `hit_${Date.now()}_${Math.random()}`,
          x: defenderPos.x,
          y: defenderPos.y - 50,
          damage: actualDamage,
          technique,
          life: 120, // 2 seconds at 60fps
          maxLife: 120,
        };
        setHitEffects((prev) => [...prev, hitEffect]);

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

        // Add to combat log with Korean martial arts terminology
        const logMessage = `${getKoreanTechniqueName(
          technique
        )} 명중! ${actualDamage} 급소타격 피해`;
        setCombatLog((prev) => [logMessage, ...prev].slice(0, 8));

        // Check for knockout
        if (
          gameState.player1Health <= actualDamage ||
          gameState.player2Health <= actualDamage
        ) {
          setTimeout(() => determineWinner(), 100);
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
      // Base damage from Korean trigram techniques
      const baseDamages: Record<string, number> = {
        천둥벽력: 28, // Heaven - Thunder Strike
        유수연타: 18, // Lake - Flowing Combo
        화염지창: 35, // Fire - Flame Spear
        벽력일섬: 40, // Thunder - Lightning Flash
        선풍연격: 15, // Wind - Whirlwind
        수류반격: 25, // Water - Counter Strike
        반석방어: 12, // Mountain - Defense
        대지포옹: 30, // Earth - Grappling
      };

      const baseDamage = baseDamages[technique] || 15;

      // Distance-based precision multiplier (closer = more damage)
      const precisionMultiplier = Math.max(0.5, 1.2 - distance / maxRange);

      // Add some randomness for realistic combat
      const variance = 0.8 + Math.random() * 0.4; // 80% to 120%

      return Math.floor(baseDamage * precisionMultiplier * variance);
    },
    []
  );

  const getKoreanTechniqueName = useCallback((technique: string): string => {
    const translations: Record<string, string> = {
      천둥벽력: "천둥벽력 (Thunder Strike)",
      유수연타: "유수연타 (Flowing Combo)",
      화염지창: "화염지창 (Flame Spear)",
      벽력일섬: "벽력일섬 (Lightning Flash)",
      선풍연격: "선풍연격 (Whirlwind Strike)",
      수류반격: "수류반격 (Water Counter)",
      반석방어: "반석방어 (Mountain Defense)",
      대지포옹: "대지포옹 (Earth Grapple)",
    };
    return translations[technique] || technique;
  }, []);

  const determineWinner = useCallback(() => {
    let winner: string;

    if (gameState.player1Health <= 0) {
      winner =
        "Player 2 승리! 완벽한 급소 공격! (Perfect Vital Strike Victory!)";
    } else if (gameState.player2Health <= 0) {
      winner = "Player 1 승리! 무술의 달인! (Martial Arts Master Victory!)";
    } else if (gameState.player1Health > gameState.player2Health) {
      winner = "Player 1 판정승! 우세한 기술! (Technical Superiority Victory!)";
    } else if (gameState.player2Health > gameState.player1Health) {
      winner = "Player 2 판정승! 뛰어난 전략! (Strategic Victory!)";
    } else {
      winner = "무승부! 호각의 실력! (Perfect Balance - Draw!)";
    }

    setGameState((prev) => ({ ...prev, winner, gamePhase: "victory" }));
    setCombatLog((prev) =>
      [
        winner,
        "경기 종료 - 무예의 정신에 경의를! (Match End - Honor to Martial Spirit!)",
        ...prev,
      ].slice(0, 8)
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
        {
          attacker,
          technique,
          damage,
          position,
          timestamp: Date.now(),
        },
      ]);
    },
    []
  );

  const drawDojo = useCallback(
    (graphics: PixiGraphics) => {
      graphics.clear();

      // Traditional Korean dojo floor with wood pattern
      graphics.setFillStyle({ color: 0x8b4513 });
      graphics.rect(0, 450, 800, 150);
      graphics.fill();

      // Dojo wood grain pattern
      graphics.setStrokeStyle({ color: 0x654321, width: 1 });
      for (let x = 0; x < 800; x += 80) {
        graphics.moveTo(x, 450);
        graphics.lineTo(x, 600);
        graphics.stroke();
      }

      // Fighting area with Korean traditional design
      graphics.setStrokeStyle({ color: 0x8b0000, width: 4 });
      graphics.rect(50, 200, 700, 250);
      graphics.stroke();

      // Center circle for starting positions
      graphics.setStrokeStyle({ color: 0xffffff, width: 3 });
      graphics.circle(400, 325, 50);
      graphics.stroke();

      // Traditional Korean trigram symbols in corners
      graphics.setFillStyle({ color: 0x8b0000 });
      graphics.circle(100, 250, 15);
      graphics.circle(700, 250, 15);
      graphics.circle(100, 400, 15);
      graphics.circle(700, 400, 15);
      graphics.fill();

      // Atmospheric background gradient
      const pulse = Math.sin(gameTime * 0.02) * 0.3 + 0.7;
      graphics.setFillStyle({ color: 0x8b0000, alpha: pulse * 0.1 });
      graphics.rect(0, 0, 800, 600);
      graphics.fill();
    },
    [gameTime]
  );

  const resetMatch = useCallback(() => {
    setGameState({
      player1Health: 100,
      player2Health: 100,
      roundTime: 90,
      round: 1,
      winner: null,
      isPaused: false,
      matchStarted: false,
      gamePhase: "preparation",
    });

    setPlayer1Pos({ x: 200, y: 400 });
    setPlayer2Pos({ x: 600, y: 400 });
    setAttacks([]);
    setCombatLog([]);
    setHitEffects([]);
  }, []);

  return (
    <pixiContainer>
      {/* Enhanced dojo background */}
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
        gameStarted={gameState.matchStarted}
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
        gameStarted={gameState.matchStarted}
      />

      {/* Hit Effects */}
      {hitEffects.map((effect) => {
        const alpha = effect.life / effect.maxLife;
        const scale = 1 + (1 - alpha) * 0.5;
        return (
          <pixiContainer key={effect.id} x={effect.x} y={effect.y}>
            <pixiText
              text={`-${effect.damage}`}
              anchor={{ x: 0.5, y: 0.5 }}
              scale={{ x: scale, y: scale }}
              alpha={alpha}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 24,
                fill: 0xff4444,
                fontWeight: "bold",
                stroke: 0x000000,
              }}
            />
            <pixiText
              text="급소!"
              anchor={{ x: 0.5, y: 0.5 }}
              y={-25}
              scale={{ x: scale * 0.8, y: scale * 0.8 }}
              alpha={alpha * 0.8}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 16,
                fill: 0xffaaaa,
                fontWeight: "bold",
              }}
            />
          </pixiContainer>
        );
      })}

      {/* UI Elements */}
      {/* Game title */}
      <pixiText
        text="흑괘 무술 대련 (Black Trigram Martial Combat)"
        x={400}
        y={30}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 20,
          fill: 0x8b0000,
          fontWeight: "bold",
        }}
      />

      {/* Health bars with Korean styling */}
      <pixiText
        text="선수 1 (Player 1)"
        x={80}
        y={50}
        style={{ fontFamily: "Noto Sans KR", fontSize: 14, fill: 0xffffff }}
      />
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          // Health bar background
          g.setFillStyle({ color: 0x333333 });
          g.rect(0, 0, 200, 25);
          g.fill();
          // Health bar
          g.setFillStyle({
            color: gameState.player1Health > 30 ? 0x4caf50 : 0xff4444,
          });
          g.rect(2, 2, gameState.player1Health * 1.96, 21);
          g.fill();
          // Border
          g.setStrokeStyle({ color: 0xffffff, width: 2 });
          g.rect(0, 0, 200, 25);
          g.stroke();
        }}
        x={80}
        y={70}
      />

      <pixiText
        text="선수 2 (Player 2)"
        x={520}
        y={50}
        style={{ fontFamily: "Noto Sans KR", fontSize: 14, fill: 0xffffff }}
      />
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          // Health bar background
          g.setFillStyle({ color: 0x333333 });
          g.rect(0, 0, 200, 25);
          g.fill();
          // Health bar
          g.setFillStyle({
            color: gameState.player2Health > 30 ? 0x4caf50 : 0xff4444,
          });
          g.rect(2, 2, gameState.player2Health * 1.96, 21);
          g.fill();
          // Border
          g.setStrokeStyle({ color: 0xffffff, width: 2 });
          g.rect(0, 0, 200, 25);
          g.stroke();
        }}
        x={520}
        y={70}
      />

      {/* Timer with pulsing effect when low */}
      <pixiText
        text={`시간: ${Math.ceil(gameState.roundTime)}초`}
        x={400}
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

      {/* Combat log with scrolling effect */}
      <pixiContainer x={20} y={480}>
        {combatLog.slice(0, 6).map((log, index) => (
          <pixiText
            key={`${log}_${index}`}
            text={log}
            y={index * 18}
            alpha={Math.max(0.3, 1 - index * 0.15)}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 11,
              fill: 0xffffff,
            }}
          />
        ))}
      </pixiContainer>

      {/* Controls hint */}
      {!gameState.matchStarted && !gameState.winner && (
        <pixiContainer>
          <pixiText
            text="조작법 (Controls): WASD-이동 | 1-8-팔괘기술 | 스페이스-방어"
            x={400}
            y={520}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{ fontFamily: "Noto Sans KR", fontSize: 12, fill: 0xcccccc }}
          />
          <pixiText
            text="Player 1: WASD+1-8 | Click/Touch for quick attack"
            x={400}
            y={540}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{ fontFamily: "monospace", fontSize: 10, fill: 0x999999 }}
          />
        </pixiContainer>
      )}

      {/* Start button */}
      {!gameState.matchStarted && !gameState.winner && (
        <pixiContainer
          interactive={true}
          onPointerDown={startMatch}
          cursor="pointer"
          x={400}
          y={350}
        >
          <pixiGraphics
            draw={(g: PixiGraphics) => {
              g.clear();
              const pulse = Math.sin(gameTime * 0.1) * 0.1 + 0.9;
              g.setFillStyle({ color: 0x8b0000, alpha: pulse });
              g.roundRect(-70, -25, 140, 50, 12);
              g.fill();
              g.setStrokeStyle({ color: 0xffffff, width: 3 });
              g.roundRect(-70, -25, 140, 50, 12);
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
            style={{ fontFamily: "monospace", fontSize: 12, fill: 0xcccccc }}
          />
        </pixiContainer>
      )}

      {/* Victory screen */}
      {gameState.winner && (
        <pixiContainer>
          <pixiGraphics
            draw={(g: PixiGraphics) => {
              g.clear();
              g.setFillStyle({ color: 0x000000, alpha: 0.85 });
              g.rect(0, 0, 800, 600);
              g.fill();
            }}
          />

          <pixiText
            text={gameState.winner}
            x={400}
            y={200}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 28,
              fill: 0xffd700,
              fontWeight: "bold",
            }}
          />

          <pixiText
            text="무예의 길은 끝이 없다 (The path of martial arts is endless)"
            x={400}
            y={250}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 16,
              fill: 0xaaaaaa,
              fontStyle: "italic",
            }}
          />

          <pixiContainer
            interactive={true}
            onPointerDown={resetMatch}
            cursor="pointer"
            x={400}
            y={320}
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
            />
            <pixiText
              text="다시 대련하기"
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
      )}
    </pixiContainer>
  );
}
