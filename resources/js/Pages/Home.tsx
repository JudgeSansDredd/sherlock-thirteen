import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";
import Lineup from "../Components/Lineup";
import SymbolStatus from "../Components/SymbolStatus";
import { AppStateType } from "../types";
import { getActivePlayer, getSuspectState, getSymbolState } from "../utils";

declare function route(name: string): string;
export default function Home(props: AppStateType) {
  console.log(props);
  const { game, gameState } = props;
  const active_player = getActivePlayer(game);
  const suspectState = getSuspectState(game, gameState);
  const symbolStatusComponents = getSymbolState(gameState).map(symbolstate => {
    const { symbol, found, remaining } = symbolstate;
    const params = {
      symbol: symbol.long_symbol,
      found,
      remaining,
    };
    return <SymbolStatus key={`${symbol.short_symbol}-status`} {...params} />;
  });
  return (
    <>
      <Head title="Home" />
      <div className="flex justify-center">
        <div>{`It is ${active_player?.name}'s turn`}</div>
      </div>
      <div className="flex justify-center">
        <Link
          href={route("create-interrogation")}
          className="mx-2 purple-button"
        >
          Interrogate
        </Link>
        <Link
          href={route("create-investigation")}
          className="mx-2 purple-button"
        >
          Investigate
        </Link>
      </div>
      <div className="flex flex-wrap justify-center">
        {symbolStatusComponents}
      </div>
      <Lineup suspectState={suspectState} />
    </>
  );
}
