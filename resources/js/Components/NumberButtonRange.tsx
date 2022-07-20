import React, { MouseEvent } from "react";
import NumberButton from "./NumberButton";

interface PropType {
  numPossible: number | null | undefined;
  handSize: number;
  selectedNumber: number | null;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function NumberButtonRange(props: PropType) {
  if (props.numPossible === null || props.numPossible === undefined) {
    return <></>;
  }
  const numberRange = [
    ...Array(Math.min(props.numPossible, props.handSize) + 1).keys(),
  ];
  return (
    <>
      {numberRange.map(num => {
        return (
          <NumberButton
            key={`number-${num}`}
            number={num}
            active={props.selectedNumber === num}
            handleClick={props.handleClick}
          />
        );
      })}
    </>
  );
}
