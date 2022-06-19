import React from "react";
import { ShortSymbol } from "../types";
import { shortToLongSymbol } from "../utils";

interface PropType {
  name: string;
  symbols: ShortSymbol[];
}

export default function SuspectStatus(props: PropType) {
  // Add .suspect-cleared when the suspect can't be it

  const symbols = props.symbols.map(symbol => {
    return <div className="mx-1">{shortToLongSymbol(symbol)}</div>;
  });
  return (
    <div className="card-styling suspect-status">
      <div>{props.name}</div>
      <div className="flex">{symbols}</div>
    </div>
  );
}
