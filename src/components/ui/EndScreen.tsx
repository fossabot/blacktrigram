import React from "react";
import { KoreanText } from "./base/korean-text";

interface EndScreenProps {
  readonly winnerId: string | null;
  readonly winner?: string;
  readonly onRestart: () => void;
  readonly onMenu: () => void;
}

/**
 * End Screen Component for victory/defeat display
 */
export function EndScreen({
  winnerId,
  winner,
  onRestart,
  onMenu,
}: EndScreenProps): React.JSX.Element {
  const finalWinner = winnerId || winner || "Unknown";

  return (
    <div className="end-screen">
      <div className="end-content">
        <KoreanText
          korean="대련 종료"
          english="Match End"
          size="xlarge"
          weight="bold"
          className="end-title"
        />

        <KoreanText
          korean={`승리자: ${finalWinner}`}
          english={`Winner: ${finalWinner}`}
          size="large"
          className="winner-text"
        />

        <div className="end-buttons">
          <button onClick={onRestart} className="restart-button">
            <KoreanText korean="다시 시작" english="Restart" size="medium" />
          </button>

          <button onClick={onMenu} className="menu-button">
            <KoreanText korean="메뉴로" english="Menu" size="medium" />
          </button>
        </div>
      </div>

      <style>{`
        .end-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%);
          color: #ffffff;
          font-family: 'Noto Sans KR', Arial, sans-serif;
        }

        .end-content {
          text-align: center;
          max-width: 600px;
          padding: 3rem;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 16px;
          border: 2px solid rgba(0, 255, 255, 0.4);
        }

        .end-title {
          margin-bottom: 2rem;
          color: #ffd700;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        .winner-text {
          margin-bottom: 3rem;
          color: #00ffff;
        }

        .end-buttons {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }

        .restart-button, .menu-button {
          padding: 1rem 2rem;
          border: 2px solid #00ffff;
          border-radius: 8px;
          background: transparent;
          color: #00ffff;
          font-family: 'Noto Sans KR', Arial, sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .restart-button:hover, .menu-button:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default EndScreen;
