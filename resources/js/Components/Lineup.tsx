import React from "react";
import { SuspectStateType } from "../types";
import SuspectStatus from "./SuspectStatus";

interface PropType {
  suspectState: SuspectStateType;
}
export default function Lineup({ suspectState }: PropType) {
  return (
    <div className="flex flex-col items-center p-2">
      <SuspectStatus
        suspectState={suspectState}
        name="Sebastian Moran"
        symbols={["s", "f"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="Irene Adler"
        symbols={["s", "l", "n"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="Inspector Lestrade"
        symbols={["b", "e", "j"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="Inspector Gregson"
        symbols={["b", "f", "j"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="Inspector Baynes"
        symbols={["b", "l"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="Inspector Bradstreet"
        symbols={["b", "f"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="Inspector Hopkins"
        symbols={["b", "p", "e"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="Sherlock Holmes"
        symbols={["p", "l", "f"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="John Watson"
        symbols={["p", "e", "f"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="Mycroft Holmes"
        symbols={["p", "l", "j"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="Mrs. Hudson"
        symbols={["p", "n"]}
      />
      <SuspectStatus
        suspectState={suspectState}
        name="James Moriarty"
        symbols={["s", "l"]}
      />
    </div>
  );
}
