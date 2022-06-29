import React, { MouseEvent } from "react";

interface PropType {
  player: string;
  numberPossible: number;
  reportSelection: (e: MouseEvent<HTMLDivElement>) => {};
}
export default function PlayerInterrogation(props: PropType) {
  return (
    <div className="flex flex-col items-center">
      <div>{`${props.player} claims`}</div>
    </div>
  );
}
