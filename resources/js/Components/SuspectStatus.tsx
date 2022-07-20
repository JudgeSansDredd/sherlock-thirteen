import React from "react";
import { ShortSymbolType, SuspectStateType } from "../types";
import { getSymbol } from "../utils";

interface PropType {
  name: string;
  symbols: ShortSymbolType[];
  suspectState: SuspectStateType;
}

export default function SuspectStatus(props: PropType) {
  // Add .suspect-cleared when the suspect can't be it
  const { name, symbols, suspectState } = props;
  const { mustHave, cantHave, cantBe } = suspectState;

  const startingHandSuspect = cantBe
    .map(cantBeName => cantBeName.toLowerCase())
    .includes(name.toLowerCase());

  const getCantHaveCleared = (symbol: ShortSymbolType): boolean => {
    return cantHave.includes(symbol);
  };
  const cantHaveCleared = symbols.some(getCantHaveCleared);

  const getMusthaveCleared = (mustHave: ShortSymbolType): boolean => {
    return !symbols.includes(mustHave);
  };
  const mustHaveCleared = mustHave.some(getMusthaveCleared);

  const symbolEls = symbols.map(symbol => {
    const murdererDoesntHave = getCantHaveCleared(symbol);
    const murdererDoesHave = mustHave.includes(symbol);
    return (
      <div
        key={`${name}-${symbol}`}
        className={`mx-1 ${
          murdererDoesntHave ? "text-gray-300 line-through" : ""
        } ${murdererDoesHave ? "underline" : ""}`}
      >
        {getSymbol(symbol).long_symbol}
      </div>
    );
  });

  const murdererHasEls = mustHave
    .filter(mustHave => {
      return !symbols.includes(mustHave);
    })
    .map(mustHave => {
      return (
        <div
          key={`${name}-${mustHave}`}
          className={`mx-1 text-gray-300 underline`}
        >
          {getSymbol(mustHave).long_symbol}
        </div>
      );
    });

  return (
    <div
      className={`card-styling suspect-status ${
        startingHandSuspect || cantHaveCleared || mustHaveCleared
          ? "suspect-cleared"
          : ""
      }`}
    >
      <div>{name}</div>
      <div className="flex">{[...symbolEls, murdererHasEls]}</div>
    </div>
  );
}
