import React, { MouseEvent } from "react";
import SelectButton from "./SelectButton";

interface PropType {
  number: number;
  active: boolean;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function NumberButton(props: PropType) {
  const { number, active, handleClick } = props;
  const params = {
    active,
    handleClick,
    buttonText: number.toString(),
    extraPadding: true,
  };
  return <SelectButton {...params} />;
}
