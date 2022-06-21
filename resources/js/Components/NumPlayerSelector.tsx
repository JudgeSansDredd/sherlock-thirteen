import React, { MouseEvent } from "react";

interface PropType {
  numPlayers: 3 | 4 | null;
  setNumPlayers: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function NumPlayerSelector(props: PropType) {
  const { numPlayers, setNumPlayers } = props;
  return (
    <>
      <div>How Many Players?</div>
      <div className="flex">
        <div
          className={`rounded-l-lg num-player-styling ${
            numPlayers === 3 ? "bg-purple-300 font-bold" : "bg-purple-100"
          }`}
          onClick={setNumPlayers}
          id="numPlayers3"
        >
          3
        </div>
        <div
          className={`rounded-r-lg num-player-styling ${
            numPlayers === 4 ? "bg-purple-300 font-bold" : "bg-purple-100"
          }`}
          onClick={setNumPlayers}
          id="numPlayers4"
        >
          4
        </div>
      </div>
    </>
  );
}
