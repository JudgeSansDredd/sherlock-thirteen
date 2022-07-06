import React, { MouseEvent } from "react";
import NumberButtonRange from "./NumberButtonRange";

interface PropType {
  player: {
    id: number;
    name: string;
  };
  numberPossible: number | undefined;
  selection: number | null;
  reportSelection: (player_id: number, number_claimed: number) => void;
}
export default function PlayerInvestigation(props: PropType) {
  const handleNumberClick = (e: MouseEvent<HTMLDivElement>) => {
    const clicked = parseInt(e.currentTarget.innerHTML);
    props.reportSelection(props.player.id, clicked);
  };

  return (
    <div className="flex items-center justify-center p-2">
      <div className="mx-2">{`${props.player.name} claims`}</div>
      <NumberButtonRange
        numPossible={props.numberPossible}
        selectedNumber={props.selection}
        handleClick={handleNumberClick}
      />
    </div>
  );
}
