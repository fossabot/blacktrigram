import React from "react";
import type { TrainingScreenProps } from "../types/game";

const TrainingScreen: React.FC<TrainingScreenProps> = ({
  archetype,
  stance,
  onBack,
  onStartCombat,
}) => {
  return (
    <div className="training-screen" style={{ padding: "2rem" }}>
      <h1>훈련 모드 (Training Mode)</h1>
      <p>아키타입 (Archetype): {archetype}</p>
      <p>자세 (Stance): {stance}</p>

      <div className="training-content">
        {/* Training exercises and practice area */}
      </div>

      <div className="action-buttons">
        <button onClick={onBack}>메뉴로 돌아가기 (Back to Menu)</button>
        <button onClick={onStartCombat}>전투 시작 (Enter Combat)</button>
      </div>
    </div>
  );
};

export default TrainingScreen;
