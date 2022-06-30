import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";
import Lineup from "../Components/Lineup";
import SymbolStatus from "../Components/SymbolStatus";
import { AppStateType } from "../types";
import { getActivePlayer, getSuspectState } from "../utils";

declare function route(name: string): string;
export default function Home(props: AppStateType) {
  const { game } = props;
  console.log(game);
  const active_player = getActivePlayer(game);
  const suspectState = getSuspectState();
  return (
    <>
      <Head title="Home" />
      <div className="flex justify-center">
        <div>{`It is ${active_player?.name}'s turn`}</div>
      </div>
      <div className="flex justify-center">
        <Link
          href={route("create-interrogation")}
          className="purple-button mx-2"
        >
          Interrogate
        </Link>
        <Link
          href={route("create-investigation")}
          className="purple-button mx-2"
        >
          Investigate
        </Link>
      </div>
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
      <Lineup suspectState={suspectState} />
    </>
  );
}
