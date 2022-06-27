import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { MouseEvent, useState } from "react";
import { SYMBOLS } from "../constants";
import { AppStateType, LongSymbolType, SymbolType } from "../types";
import { getNonActivePlayers, getSymbol } from "../utils";

interface InterrogateStateType {
  interrogatee: string | null;
  symbol: SymbolType | null;
  numberClaimed: number;
}

declare function route(name: string): string;
export default function Interrogate(props: AppStateType) {
  const { game } = props;
  const interrogatees = getNonActivePlayers(game);
  const [interrogateState, setInterrogateState] =
    useState<InterrogateStateType>({
      interrogatee: null,
      symbol: null,
      numberClaimed: 0,
    });

  if (!game.active_player) {
    return (
      <Link href="/" className="purple-button">
        Go Home
      </Link>
    );
  }

  const handleSubmit = () => {
    const { interrogatee, symbol, numberClaimed } = interrogateState;
    if (interrogatee === null || symbol === null) {
      throw new Error("Not ready to submit!");
    }
    const payload = {
      interrogatee,
      symbol: symbol.short_symbol,
      numberClaimed,
    };
    axios
      .post(route("save-interrogation"), payload)
      .then(res => {
        Inertia.get("/");
      })
      .catch(err => console.log(err));
  };

  const handleInterrogateeClick = (e: MouseEvent<HTMLDivElement>) => {
    const clicked = e.currentTarget.innerHTML;
    setInterrogateState(prev => {
      return { ...prev, interrogatee: clicked };
    });
  };

  const handleSymbolClick = (e: MouseEvent<HTMLDivElement>) => {
    const clicked = e.currentTarget.innerHTML as LongSymbolType;
    const shortSymbol = getSymbol(clicked);
    setInterrogateState(prev => {
      return { ...prev, symbol: shortSymbol };
    });
  };

  const handleNumberclick = (e: MouseEvent<HTMLDivElement>) => {
    const numberClaimed = parseInt(e.currentTarget.innerHTML);
    setInterrogateState(prev => {
      return { ...prev, numberClaimed };
    });
  };

  const interrogateeButtons = interrogatees.map(interrogatee => {
    return (
      <div
        key={`interrogatee-${interrogatee.name}`}
        className={`${
          interrogateState.interrogatee === interrogatee.name
            ? "bg-purple-300"
            : "bg-gray-300"
        } p-2 m-1 hover:cursor-pointer rounded-full`}
        onClick={handleInterrogateeClick}
      >
        {interrogatee.name}
      </div>
    );
  });

  const symbolButtons = SYMBOLS.map(symbol => {
    return (
      <div
        key={`symbol-${symbol.short_symbol}`}
        className={`${
          interrogateState.symbol &&
          interrogateState.symbol.short_symbol === symbol.short_symbol
            ? "bg-purple-300"
            : "bg-gray-300"
        } p-2 m-1 hover:cursor-pointer rounded-full`}
        onClick={handleSymbolClick}
      >
        {symbol.long_symbol}
      </div>
    );
  });

  const numberOptions = interrogateState.symbol
    ? [...Array(interrogateState.symbol?.total_in_game + 1).keys()]
    : [];
  const numberButtons = numberOptions.map(num => {
    return (
      <div
        key={`number-${num}`}
        className={`${
          interrogateState.numberClaimed === num
            ? "bg-purple-300"
            : "bg-gray-300"
        } py-2 px-8 m-1 hover:cursor-pointer rounded-full`}
        onClick={handleNumberclick}
      >
        {num}
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center">
      <div>{`${game.active_player.name} is interrogating`}</div>
      <div className="flex justify-center flex-wrap">{interrogateeButtons}</div>
      <div className={interrogateState.interrogatee ? "" : "hidden"}>
        about this symbol:
      </div>
      <div
        className={`flex justify-center flex-wrap ${
          interrogateState.interrogatee ? "" : "hidden"
        }`}
      >
        {symbolButtons}
      </div>
      <div className={interrogateState.symbol ? "" : "hidden"}>
        and they claimed to have
      </div>
      <div
        className={`${
          interrogateState.symbol ? "" : "hidden"
        } flex justify-center flex-wrap`}
      >
        {numberButtons}
      </div>
      <div
        className={`purple-button ${interrogateState.symbol ? "" : "hidden"}`}
        onClick={handleSubmit}
      >
        Submit
      </div>
    </div>
  );
}
