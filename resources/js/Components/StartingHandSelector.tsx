import React, { MouseEvent } from "react";
import { SUSPECTS } from "../constants";
import { SuspectNameType } from "../types";

interface PropType {
  selected: SuspectNameType[];
}

export default function StartingHandSelector({ selected }: PropType) {
  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    const clicked = e.currentTarget.innerHTML;
    // TODO: Continue, here
  };

  const suspectDivs = SUSPECTS.map(suspectData => {
    const { name } = suspectData;
    return (
      <div
        key={`${name.replace(/\W+/, "-").toLowerCase().trim()}`}
        className={`${
          selected.includes(name) ? "bg-purple-300" : "bg-gray-300"
        } p-2 mx-1 hover:cursor-pointer rounded-full`}
      >
        {name}
      </div>
    );
  });
  return <div className="flex flex-wrap">{suspectDivs}</div>;
}
