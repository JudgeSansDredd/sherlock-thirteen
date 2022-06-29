import React, { MouseEvent } from "react";

interface PropType {
  active: boolean;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
  buttonText: string;
}

export default function SelectButton(props: PropType) {
  const { active, handleClick, buttonText } = props;
  return (
    <div
      className={`${
        active ? "bg-purple-300" : "bg-gray-300"
      } p-2 m-1 hover:cursor-pointer rounded-full`}
      onClick={handleClick}
    >
      {buttonText}
    </div>
  );
}
