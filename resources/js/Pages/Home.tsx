import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";
import Lineup from "../Components/Lineup";
import SymbolStatus from "../Components/SymbolStatus";
import { AppStateType } from "../types";

export default function Home(props: AppStateType) {
  const { game } = props;
  const { suspectState, active_player } = game;
  return (
    <>
      <Head title="Home" />
      <Link href="/">Go home</Link>
      <div>{`It is ${active_player?.name}'s turn`}</div>
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
