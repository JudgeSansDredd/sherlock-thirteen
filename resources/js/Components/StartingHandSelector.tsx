import React from "react";
import { suspects } from "../common";

export default function StartingHandSelector() {
  const suspectDivs = suspects.map(suspectData => {
    const { name } = suspectData;
    return (
      <div
        key={`${name.replace(/\W+/, "-").toLowerCase().trim()}`}
        className="purple-button"
      >
        {name}
      </div>
    );
  });
  return <div className="flex flex-wrap">{suspectDivs}</div>;
}
