import { Head } from "@inertiajs/inertia-react";
import React from "react";
import SuspectStatus from "../Components/SuspectStatus";
import SymbolStatus from "../Components/SymbolStatus";
import { AppStateType } from "../types";

export default function Home(props: AppStateType) {
  const { user, gameState } = props;
  const { suspectState } = gameState;
  console.log(suspectState);
  return (
    <>
      <Head title="Home" />
      <div>User: {user.name}</div>
      <div className="flex flex-wrap justify-center">
        <SymbolStatus symbol="Pipe" found={0} remaining={5} />
        <SymbolStatus symbol="Lightbulb" found={0} remaining={5} />
        <SymbolStatus symbol="Fist" found={0} remaining={5} />
        <SymbolStatus symbol="Badge" found={0} remaining={5} />
        <SymbolStatus symbol="Journal" found={0} remaining={4} />
        <SymbolStatus symbol="Necklace" found={0} remaining={3} />
        <SymbolStatus symbol="Eye" found={0} remaining={3} />
        <SymbolStatus symbol="Skull" found={0} remaining={3} />
      </div>
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
    </>
  );
}
