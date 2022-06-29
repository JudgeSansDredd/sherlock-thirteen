import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import NumberButton from "../Components/NumberButton";
import PlayerButton from "../Components/PlayerButton";
import SymbolButton from "../Components/SymbolButton";
import { SYMBOLS } from "../constants";
import { AppStateType, LongSymbolType, SymbolType } from "../types";
import { getNonActivePlayers, getSymbol } from "../utils";

interface InterrogateStateType {
  interrogatee: string | null;
  symbol: SymbolType | null;
  numberClaimed: number | null;
}

declare function route(name: string): string;
export default function Interrogate(props: AppStateType) {
  const { game } = props;
  const interrogatees = getNonActivePlayers(game);
  const [interrogateState, setInterrogateState] =
    useState<InterrogateStateType>({
      interrogatee: null,
      symbol: null,
      numberClaimed: null,
    });

  if (!game.active_player) {
    return (
      <Link href="/" className="purple-button">
        Go Home
      </Link>
    );
  }

  useEffect(() => {
    setInterrogateState(prev => {
      return { ...prev, numberClaimed: null };
    });
  }, [interrogateState.symbol]);

  useEffect(() => {
    setInterrogateState(prev => {
      return { ...prev, symbol: null, numberClaimed: null };
    });
  }, [interrogateState.interrogatee]);

  const handleSubmitClick = () => {
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
      <PlayerButton
        key={`interrogatee-${interrogatee.name}`}
        name={interrogatee.name}
        active={interrogateState.interrogatee === interrogatee.name}
        handleClick={handleInterrogateeClick}
      />
    );
  });

  const symbolButtons = SYMBOLS.map(symbol => {
    const active =
      (interrogateState.symbol &&
        interrogateState.symbol.short_symbol === symbol.short_symbol) ??
      false;
    return (
      <SymbolButton
        key={`symbol-${symbol.short_symbol}`}
        symbol={symbol}
        active={active}
        handleClick={handleSymbolClick}
      />
    );
  });

  const numberOptions = interrogateState.symbol
    ? [...Array(interrogateState.symbol?.total_in_game + 1).keys()]
    : [];
  const numberButtons = numberOptions.map(num => {
    return (
      <NumberButton
        key={`number-${num}`}
        number={num}
        active={interrogateState.numberClaimed === num}
        handleClick={handleNumberclick}
      />
    );
  });

  const readyToSubmit =
    interrogateState.interrogatee !== null &&
    interrogateState.numberClaimed !== null &&
    interrogateState.symbol !== null;

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
        className={`purple-button ${readyToSubmit ? "" : "hidden"}`}
        onClick={handleSubmitClick}
      >
        Submit
      </div>
    </div>
  );
}
