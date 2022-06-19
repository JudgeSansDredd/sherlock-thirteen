import React from "react";

interface PropType {
  symbol: string;
  found: number;
  remaining: number;
}

export default function SymbolStatus(props: PropType) {
  return (
    <div className="card-styling symbol-status">
      <div>{props.symbol}</div>
      <div className="flex">
        <div className="flex flex-col items-center mx-1">
          <div>Found</div>
          <div>{props.found}</div>
        </div>
        <div className="flex flex-col items-center mx-1">
          <div>Remaining</div>
          <div>{props.remaining}</div>
        </div>
      </div>
    </div>
  );
}
