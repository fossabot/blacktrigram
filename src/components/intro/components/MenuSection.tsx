import type { JSX } from "react";
import { BaseButton } from "../../ui/base/BaseButton";

interface MenuSectionProps {
  readonly title: string;
  readonly options: MenuOption[];
  readonly onOptionActivate: (optionId: string) => void;
  readonly showKeyBindings?: boolean;
}

interface MenuOption {
  readonly id: string;
  readonly text: string;
  readonly keyBinding: string;
}

export function MenuSection({
  title,
  options,
  onOptionActivate,
  showKeyBindings = true,
}: MenuSectionProps): JSX.Element {
  return (
    <pixiContainer>
      <pixiText
        text={title}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-60}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 20,
          fill: 0xffd700,
          fontWeight: "bold",
        }}
      />

      {options.map((option, index) => (
        <pixiContainer key={option.id} y={index * 60}>
          <BaseButton
            width={300}
            height={50}
            text={option.text}
            onSelect={() => {}}
            onActivate={() => onOptionActivate(option.id)}
            keyBinding={option.keyBinding}
            showKeyBinding={showKeyBindings}
            isEnabled={true}
          />
        </pixiContainer>
      ))}
    </pixiContainer>
  );
}
