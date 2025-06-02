import React from "react";
import type { EndScreenProps } from "../../types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY_PRIMARY } from "../../types";
import { KoreanText } from "./base";

const endScreenStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  backgroundColor: `rgba(${parseInt(
    KOREAN_COLORS.BLACK.toString(16).slice(0, 2),
    16
  )}, ${parseInt(KOREAN_COLORS.BLACK.toString(16).slice(2, 4), 16)}, ${parseInt(
    KOREAN_COLORS.BLACK.toString(16).slice(4, 6),
    16
  )}, 0.85)`,
  fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
  color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
  textAlign: "center",
  padding: "20px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "3em",
  color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
  marginBottom: "30px",
};

const messageStyle: React.CSSProperties = {
  fontSize: "1.5em",
  marginBottom: "40px",
};

const buttonStyle: React.CSSProperties = {
  padding: "15px 30px",
  fontSize: "1.2em",
  margin: "10px",
  cursor: "pointer",
  border: `2px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
  borderRadius: "5px",
  backgroundColor: "transparent", // Transparent background
  color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`, // Cyan text
  transition: "background-color 0.3s ease, color 0.3s ease",
};

const buttonHoverStyle: React.CSSProperties = {
  backgroundColor: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`, // Cyan background on hover
  color: `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`, // Black text on hover
};

export function EndScreen({
  winnerId,
  onRestart,
  onMenu,
}: EndScreenProps): React.ReactElement {
  const [hoverRestart, setHoverRestart] = React.useState(false);
  const [hoverMenu, setHoverMenu] = React.useState(false);

  let message: React.ReactNode;
  if (winnerId) {
    message = (
      <KoreanText
        korean={`승리자: 플레이어 ${winnerId === "player1" ? "1" : "2"}`}
        english={`Winner: Player ${winnerId === "player1" ? "1" : "2"}`}
        size="large"
      />
    );
  } else {
    message = <KoreanText korean="무승부" english="Match Draw" size="large" />;
  }

  return (
    <div style={endScreenStyle}>
      <div style={titleStyle}>
        <KoreanText korean="경기 종료" english="Match Over" size="title" />
      </div>
      <div style={messageStyle}>{message}</div>
      <div>
        <button
          style={{ ...buttonStyle, ...(hoverRestart ? buttonHoverStyle : {}) }}
          onMouseEnter={() => setHoverRestart(true)}
          onMouseLeave={() => setHoverRestart(false)}
          onClick={onRestart}
        >
          <KoreanText korean="다시 시작" english="Restart" />
        </button>
        <button
          style={{ ...buttonStyle, ...(hoverMenu ? buttonHoverStyle : {}) }}
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          onClick={onMenu}
        >
          <KoreanText korean="메인 메뉴" english="Main Menu" />
        </button>
      </div>
    </div>
  );
}
