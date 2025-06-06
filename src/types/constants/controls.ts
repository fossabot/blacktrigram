import type { CombatControlsConfig } from "../controls";

export const COMBAT_CONTROLS: CombatControlsConfig = {
  stanceControls: {
    "1": { stance: "geon", korean: "건", technique: "천둥벽력" },
    "2": { stance: "tae", korean: "태", technique: "유수연타" },
    "3": { stance: "li", korean: "리", technique: "화염지창" },
    "4": { stance: "jin", korean: "진", technique: "벽력일섬" },
    "5": { stance: "son", korean: "손", technique: "선풍연격" },
    "6": { stance: "gam", korean: "감", technique: "수류반격" },
    "7": { stance: "gan", korean: "간", technique: "반석방어" },
    "8": { stance: "gon", korean: "곤", technique: "대지포옹" },
  },
  movement: {
    WASD: "전술적 위치 선정 및 발놀림",
    ArrowKeys: "대체 이동 시스템",
  },
  combat: {
    SPACE: "현재 자세 기술 실행",
    SHIFT: "방어 자세/블록 위치",
    CTRL: "정밀한 급소 타격 모드",
    TAB: "플레이어 전형 전환",
  },
  system: {
    ESC: "일시 정지 메뉴 / 소개로 돌아가기",
    F1: "도움말 / 컨트롤 가이드",
    M: "음소거 / 오디오 설정",
  },
};
