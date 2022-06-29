import { Link } from "@inertiajs/inertia-react";
import React, { MouseEvent, useState } from "react";
import SymbolButton from "../Components/SymbolButton";
import { SYMBOLS } from "../constants";
import { AppStateType, LongSymbolType, SymbolType } from "../types";
import { getNonActivePlayers, getSymbol } from "../utils";

interface InvestigateStateType {
  symbol: SymbolType | null;
  results: Array<{
    player_id: number;
    number_claimed: number;
  }>;
}

declare function route(name: string): string;
export default function Investigate(props: AppStateType) {
  const [investigateState, setInvestigateState] =
    useState<InvestigateStateType>({ symbol: null, results: [] });

  if (!props.game.active_player) {
    return (
      <Link href={route("home")}>
        <div className="purple-button">Home</div>
      </Link>
    );
  }

  const handleSymbolClick = (e: MouseEvent<HTMLDivElement>) => {
    const clicked = e.currentTarget.innerHTML as LongSymbolType;
    const symbol = getSymbol(clicked);
    setInvestigateState(prev => {
      return { ...prev, symbol };
    });
  };

  const symbolButtons = SYMBOLS.map(symbol => {
    return (
      <SymbolButton
        key={`symbol-${symbol.short_symbol}`}
        symbol={symbol}
        active={
          (investigateState.symbol &&
            investigateState.symbol.short_symbol === symbol.short_symbol) ??
          false
        }
        handleClick={handleSymbolClick}
      />
    );
  });

  const players = getNonActivePlayers(props.game);

  return (
    <div className="flex flex-col items-center">
      <div>{`${props.game.active_player.name} is investigating the whereabouts of`}</div>
      <div className="flex flex-wrap justify-center">{symbolButtons}</div>
    </div>
  );
}
