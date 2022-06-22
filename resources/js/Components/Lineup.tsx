import React from "react";
import { SUSPECTS } from "../constants";
import { SuspectStateType } from "../types";
import SuspectStatus from "./SuspectStatus";

interface PropType {
  suspectState: SuspectStateType;
}
export default function Lineup({ suspectState }: PropType) {
  const suspectComponents = SUSPECTS.map(suspectData => {
    return (
      <SuspectStatus
        key={`suspect-status-${suspectData.name
          .replace(/\W+/, "-")
          .toLowerCase()
          .trim()}`}
        {...{ suspectState, ...suspectData }}
      />
    );
  });

  return (
    <div className="flex flex-col items-center p-2">{suspectComponents}</div>
  );
}
