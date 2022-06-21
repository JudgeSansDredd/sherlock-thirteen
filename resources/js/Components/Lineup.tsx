import React from "react";
import { suspects } from "../common";
import { SuspectStateType } from "../types";
import SuspectStatus from "./SuspectStatus";

interface PropType {
  suspectState: SuspectStateType;
}
export default function Lineup({ suspectState }: PropType) {
  const suspectComponents = suspects.map(suspectData => {
    return (
      <SuspectStatus
        key={`suspect-status-${suspectData.name
          .replace(/\W/, "-")
          .toLowerCase()}`}
        {...{ suspectState, ...suspectData }}
      />
    );
  });

  return (
    <div className="flex flex-col items-center p-2">{suspectComponents}</div>
  );
}
