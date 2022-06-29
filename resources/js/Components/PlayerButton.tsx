import React, { MouseEvent } from "react";
import SelectButton from "./SelectButton";

interface PropType {
  name: string;
  active: boolean;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function PlayerButton(props: PropType) {
  const { name, active, handleClick } = props;
  const params = { active, handleClick, buttonText: name };
  return <SelectButton {...params} />;
}
