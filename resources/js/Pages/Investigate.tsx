import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import PlayerInvestigation from "../Components/PlayerInvestigation";
import SymbolButton from "../Components/SymbolButton";
import { SYMBOLS } from "../constants";
import { AppStateType, LongSymbolType, SymbolType } from "../types";
import { getActivePlayer, getNonActivePlayers, getSymbol } from "../utils";

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

  if (!props.game.active_player_id) {
    return (
      <Link href={route("home")}>
        <div className="purple-button">Home</div>
      </Link>
    );
  }

  const activePlayer = getActivePlayer(props.game);

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
        active={investigateState.symbol?.short_symbol === symbol.short_symbol}
        handleClick={handleSymbolClick}
      />
    );
  });

  const updatePlayerReports = (player_id: number, number_claimed: number) => {
    const otherReports = investigateState.results.filter(report => {
      return report.player_id !== player_id;
    });
    setInvestigateState(prev => {
      return {
        ...prev,
        results: [...otherReports, { player_id, number_claimed }],
      };
    });
  };

  const players = getNonActivePlayers(props.game);
  const playerComponents = players.map(player => {
    const { id, name } = player;
    const playerParams = { id, name };
    const numPossible = investigateState.symbol?.total_in_game;
    const matchingResult = investigateState.results.filter(reuslt => {
      return reuslt.player_id === player.id;
    });
    const selected = matchingResult.length
      ? matchingResult[0].number_claimed
      : null;
    return (
      <PlayerInvestigation
        key={`player-investigate-${player.name}`}
        player={playerParams}
        numberPossible={numPossible}
        reportSelection={updatePlayerReports}
        selection={selected}
      />
    );
  });

  useEffect(() => {
    setInvestigateState(prev => {
      return { ...prev, results: [] };
    });
  }, [investigateState.symbol]);

  const readyToSubmit = investigateState.results.length === players.length;
  const handleSubmitClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { results } = investigateState;
    if (!investigateState.symbol) {
      return;
    }
    const symbol = investigateState.symbol.short_symbol;
    const payload = { results, symbol };
    axios
      .post(route("save-investigation"), payload)
      .then(res => {
        Inertia.get("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex flex-col items-center">
      <div>{`${activePlayer?.name} is investigating the whereabouts of`}</div>
      <div className="flex flex-wrap justify-center">{symbolButtons}</div>
      <div
        className={`flex flex-col items-center ${
          investigateState.symbol ? "" : "hidden"
        }`}
      >
        {playerComponents}
      </div>
      <button
        className={`purple-button ${readyToSubmit ? "" : "hidden"}`}
        onClick={handleSubmitClick}
      >
        Submit
      </button>
    </div>
  );
}
