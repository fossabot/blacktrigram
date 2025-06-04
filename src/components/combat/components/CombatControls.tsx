import React, { useState, useCallback, useEffect } from "react";
import { KoreanText } from "../../ui/base/korean-text";
import type { PlayerState, TrigramStance, CombatState } from "../../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../../types/constants";
import { useAudio } from "../../../audio/AudioManager";
import { convertKoreanColorForCSS } from "../../../utils/colorUtils";

interface CombatControlsProps {
  readonly player: PlayerState;
  readonly onStanceChange: (stance: TrigramStance) => Promise<void>;
  readonly onExecuteAttack: () => Promise<void>;
  readonly onBlock: () => void;
  readonly onSpecialTechnique: () => Promise<void>;
  readonly disabled: boolean;
  readonly showVitalPoints: boolean;
  readonly currentOpponent: PlayerState;
}

export function CombatControls({
  player,
  onStanceChange,
  onExecuteAttack,
  onBlock,
  onSpecialTechnique,
  disabled,
  showVitalPoints,
  currentOpponent,
}: CombatControlsProps): React.JSX.Element {
  const audio = useAudio();
  const [selectedStance, setSelectedStance] = useState<TrigramStance>(
    player.stance
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [actionCooldown, setActionCooldown] = useState(0);

  const trigrams: TrigramStance[] = [
    "geon",
    "tae",
    "li",
    "jin",
    "son",
    "gam",
    "gan",
    "gon",
  ];

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      if (disabled || isExecuting) return;

      const key = event.key;

      // Stance changes (1-8 keys)
      if (key >= "1" && key <= "8") {
        const stanceIndex = parseInt(key) - 1;
        const newStance = trigrams[stanceIndex];
        if (newStance && newStance !== player.stance) {
          await handleStanceChange(newStance);
        }
        return;
      }

      // Combat actions
      switch (key) {
        case " ": // Space for attack
          event.preventDefault();
          await handleAttack();
          break;
        case "Shift":
          event.preventDefault();
          handleBlock();
          break;
        case "Control":
          event.preventDefault();
          await handleSpecialTechnique();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [disabled, isExecuting, player.stance, trigrams]);

  // Cooldown timer
  useEffect(() => {
    if (actionCooldown > 0) {
      const timer = setTimeout(() => {
        setActionCooldown((prev) => Math.max(0, prev - 100));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [actionCooldown]);

  const startCooldown = (duration: number) => {
    setActionCooldown(duration);
  };

  const handleStanceChange = useCallback(
    async (stance: TrigramStance) => {
      if (disabled || isExecuting || actionCooldown > 0) return;

      setIsExecuting(true);
      startCooldown(1000);

      try {
        await onStanceChange(stance);
        setSelectedStance(stance);

        if (audio?.playTechniqueSound) {
          audio.playTechniqueSound(TRIGRAM_DATA[stance].technique.koreanName);
        }
      } catch (error) {
        console.error("Stance change failed:", error);
      } finally {
        setIsExecuting(false);
      }
    },
    [disabled, isExecuting, actionCooldown, onStanceChange, audio]
  );

  const handleAttack = useCallback(async () => {
    if (disabled || isExecuting || actionCooldown > 0) return;

    setIsExecuting(true);
    startCooldown(800);

    try {
      await onExecuteAttack();
    } catch (error) {
      console.error("Attack failed:", error);
    } finally {
      setIsExecuting(false);
    }
  }, [disabled, isExecuting, actionCooldown, onExecuteAttack]);

  const handleBlock = useCallback(() => {
    if (disabled || isExecuting || actionCooldown > 0) return;

    startCooldown(500);
    onBlock();
  }, [disabled, isExecuting, actionCooldown, onBlock]);

  const handleSpecialTechnique = useCallback(async () => {
    if (disabled || isExecuting || actionCooldown > 0 || player.ki < 30) return;

    setIsExecuting(true);
    startCooldown(1500);

    try {
      await onSpecialTechnique();
    } catch (error) {
      console.error("Special technique failed:", error);
    } finally {
      setIsExecuting(false);
    }
  }, [disabled, isExecuting, actionCooldown, player.ki, onSpecialTechnique]);

  const getStanceButtonStyle = (
    stance: TrigramStance,
    isSelected: boolean
  ) => ({
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: `3px solid ${
      isSelected ? KOREAN_COLORS.GOLD : KOREAN_COLORS.WHITE
    }`,
    backgroundColor: isSelected
      ? KOREAN_COLORS[stance]
      : `${KOREAN_COLORS[stance]}66`,
    color: KOREAN_COLORS.WHITE,
    fontSize: "24px",
    fontWeight: "bold",
    cursor: disabled || isExecuting ? "not-allowed" : "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    opacity: disabled || isExecuting ? 0.5 : 1,
    transform: isSelected ? "scale(1.1)" : "scale(1)",
    boxShadow: isSelected ? `0 0 20px ${KOREAN_COLORS.GOLD}66` : "none",
  });

  const getActionButtonStyle = (canUse: boolean, isSpecial = false) => ({
    padding: "12px 24px",
    borderRadius: "8px",
    border: `2px solid ${
      canUse
        ? isSpecial
          ? KOREAN_COLORS.TRADITIONAL_RED
          : KOREAN_COLORS.CYAN
        : KOREAN_COLORS.WHITE
    }`,
    backgroundColor: canUse
      ? isSpecial
        ? KOREAN_COLORS.TRADITIONAL_RED
        : KOREAN_COLORS.CYAN
      : "rgba(255, 255, 255, 0.1)",
    color: canUse ? KOREAN_COLORS.BLACK : KOREAN_COLORS.WHITE,
    fontSize: "16px",
    fontWeight: "bold",
    cursor: canUse ? "pointer" : "not-allowed",
    opacity: canUse ? 1 : 0.5,
    transition: "all 0.3s ease",
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    minWidth: "120px",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "200px",
        background: `linear-gradient(0deg, ${KOREAN_COLORS.BLACK}dd, transparent)`,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        zIndex: 100,
      }}
    >
      {/* Stance Selection */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <KoreanText
          korean="자세 선택:"
          english="Stance:"
          size="medium"
          weight="bold"
          color={KOREAN_COLORS.WHITE}
        />

        {trigrams.map((stance, index) => (
          <button
            key={stance}
            style={getStanceButtonStyle(stance, selectedStance === stance)}
            onClick={() => handleStanceChange(stance)}
            disabled={disabled || isExecuting || actionCooldown > 0}
            title={`${index + 1}: ${TRIGRAM_DATA[stance].name.korean} (${
              TRIGRAM_DATA[stance].name.english
            })`}
          >
            <div>{TRIGRAM_DATA[stance].symbol}</div>
            <div style={{ fontSize: "10px", marginTop: "2px" }}>
              {index + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <button
          style={getActionButtonStyle(
            !disabled && !isExecuting && actionCooldown === 0
          )}
          onClick={handleAttack}
          disabled={disabled || isExecuting || actionCooldown > 0}
          title="Space: Execute attack with current stance"
        >
          <KoreanText
            korean="공격"
            english="Attack"
            size="medium"
            weight="bold"
          />
        </button>

        <button
          style={getActionButtonStyle(
            !disabled && !isExecuting && actionCooldown === 0
          )}
          onClick={handleBlock}
          disabled={disabled || isExecuting || actionCooldown > 0}
          title="Shift: Defensive block"
        >
          <KoreanText
            korean="방어"
            english="Block"
            size="medium"
            weight="bold"
          />
        </button>

        <button
          style={getActionButtonStyle(
            !disabled &&
              !isExecuting &&
              actionCooldown === 0 &&
              player.ki >= 30,
            true
          )}
          onClick={handleSpecialTechnique}
          disabled={
            disabled || isExecuting || actionCooldown > 0 || player.ki < 30
          }
          title="Ctrl: Special technique (30 Ki required)"
        >
          <KoreanText
            korean="특기"
            english="Special"
            size="medium"
            weight="bold"
          />
        </button>
      </div>

      {/* Status Information */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          color: KOREAN_COLORS.CYAN,
        }}
      >
        <div>
          현재 자세: {TRIGRAM_DATA[player.stance].name.korean} (
          {TRIGRAM_DATA[player.stance].name.english})
        </div>

        {actionCooldown > 0 && (
          <div>쿨다운: {(actionCooldown / 1000).toFixed(1)}초</div>
        )}

        <div>상대: {TRIGRAM_DATA[currentOpponent.stance].name.korean}</div>
      </div>

      {/* Instructions */}
      <div
        style={{
          textAlign: "center",
          fontSize: "10px",
          color: KOREAN_COLORS.WHITE,
          opacity: 0.7,
        }}
      >
        키보드: 1-8 (자세), 스페이스 (공격), Shift (방어), Ctrl (특기) |
        Keyboard: 1-8 (Stance), Space (Attack), Shift (Block), Ctrl (Special)
      </div>

      {/* Stance selection */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        {Object.entries(TRIGRAM_DATA).map(([stance, data]) => {
          const isCurrentStance = stance === player.stance;
          return (
            <button
              key={stance}
              onClick={() => onStanceChange(stance as TrigramStance)}
              disabled={disabled}
              style={{
                width: "100%",
                height: "60px",
                borderRadius: "8px",
                border: `2px solid ${convertKoreanColorForCSS(
                  KOREAN_COLORS.GOLD
                )}`,
                backgroundColor: isCurrentStance
                  ? convertKoreanColorForCSS(KOREAN_COLORS.GOLD)
                  : convertKoreanColorForCSS(KOREAN_COLORS.BLACK),
                color: isCurrentStance
                  ? convertKoreanColorForCSS(KOREAN_COLORS.BLACK)
                  : convertKoreanColorForCSS(KOREAN_COLORS.WHITE),
                fontSize: "12px",
                fontFamily: "Noto Sans KR, Arial, sans-serif",
                fontWeight: "bold",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.6 : 1,
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: isCurrentStance
                  ? "0 0 10px rgba(255, 215, 0, 0.5)"
                  : "none",
              }}
            >
              <div style={{ fontSize: "16px", marginBottom: "4px" }}>
                {data.symbol}
              </div>
              <div style={{ fontSize: "10px" }}>{data.name.korean}</div>
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={onExecuteAttack}
          disabled={disabled}
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            border: `1px solid ${convertKoreanColorForCSS(
              KOREAN_COLORS.TRADITIONAL_RED
            )}`,
            backgroundColor: disabled
              ? convertKoreanColorForCSS(KOREAN_COLORS.BLACK)
              : convertKoreanColorForCSS(KOREAN_COLORS.TRADITIONAL_RED),
            color: disabled
              ? convertKoreanColorForCSS(KOREAN_COLORS.GRAY)
              : convertKoreanColorForCSS(KOREAN_COLORS.WHITE),
            fontSize: "14px",
            fontWeight: "bold",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            transition: "all 0.2s ease",
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            minWidth: "80px",
          }}
        >
          <KoreanText
            korean="공격"
            english="Attack"
            size="small"
            weight="bold"
            color={
              disabled
                ? convertKoreanColorForCSS(KOREAN_COLORS.GRAY)
                : convertKoreanColorForCSS(KOREAN_COLORS.WHITE)
            }
          />
        </button>

        <button
          onClick={onBlock}
          disabled={disabled}
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            border: `1px solid ${convertKoreanColorForCSS(
              KOREAN_COLORS.DOJANG_BLUE
            )}`,
            backgroundColor: disabled
              ? convertKoreanColorForCSS(KOREAN_COLORS.BLACK)
              : convertKoreanColorForCSS(KOREAN_COLORS.DOJANG_BLUE),
            color: disabled
              ? convertKoreanColorForCSS(KOREAN_COLORS.GRAY)
              : convertKoreanColorForCSS(KOREAN_COLORS.WHITE),
            fontSize: "14px",
            fontWeight: "bold",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            transition: "all 0.2s ease",
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            minWidth: "80px",
          }}
        >
          <KoreanText
            korean="방어"
            english="Block"
            size="small"
            weight="bold"
            color={
              disabled
                ? convertKoreanColorForCSS(KOREAN_COLORS.GRAY)
                : convertKoreanColorForCSS(KOREAN_COLORS.WHITE)
            }
          />
        </button>

        <button
          onClick={onSpecialTechnique}
          disabled={disabled || player.ki < 30}
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            border: `1px solid ${convertKoreanColorForCSS(KOREAN_COLORS.GOLD)}`,
            backgroundColor:
              disabled || player.ki < 30
                ? convertKoreanColorForCSS(KOREAN_COLORS.BLACK)
                : convertKoreanColorForCSS(KOREAN_COLORS.GOLD),
            color:
              disabled || player.ki < 30
                ? convertKoreanColorForCSS(KOREAN_COLORS.GRAY)
                : convertKoreanColorForCSS(KOREAN_COLORS.BLACK),
            fontSize: "14px",
            fontWeight: "bold",
            cursor: disabled || player.ki < 30 ? "not-allowed" : "pointer",
            opacity: disabled || player.ki < 30 ? 0.6 : 1,
            transition: "all 0.2s ease",
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            minWidth: "80px",
          }}
        >
          <KoreanText
            korean="특수기"
            english="Special"
            size="small"
            weight="bold"
            color={
              disabled || player.ki < 30
                ? convertKoreanColorForCSS(KOREAN_COLORS.GRAY)
                : convertKoreanColorForCSS(KOREAN_COLORS.BLACK)
            }
          />
        </button>
      </div>

      {/* Current technique info */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "12px",
          borderRadius: "6px",
          border: `1px solid ${convertKoreanColorForCSS(KOREAN_COLORS.GOLD)}`,
        }}
      >
        <KoreanText
          korean="현재 기술"
          english="Current Technique"
          size="small"
          weight="semibold"
          color={convertKoreanColorForCSS(KOREAN_COLORS.GOLD)}
        />

        <div style={{ marginTop: "8px" }}>
          <KoreanText
            korean={currentTechnique.koreanName}
            english={currentTechnique.englishName}
            size="medium"
            weight="bold"
            color={convertKoreanColorForCSS(KOREAN_COLORS.WHITE)}
          />
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: convertKoreanColorForCSS(KOREAN_COLORS.CYAN),
          }}
        >
          기 소모: {currentTechnique.kiCost || 0} | 체력 소모:{" "}
          {currentTechnique.staminaCost || 0}
        </div>
      </div>
    </div>
  );
}

export default CombatControls;
