import React from "react";
import type { MenuSectionProps } from "../../../types/ui";

export function MenuSection({
  onGamePhaseChange,
}: MenuSectionProps): React.ReactElement {
  return (
    <div>
      <button onClick={() => onGamePhaseChange("training")}>
        무술 수련 (Training)
      </button>
      <button onClick={() => onGamePhaseChange("combat")}>
        실전 대련 (Combat)
      </button>
    </div>
  );
}
