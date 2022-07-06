import React, { ChangeEvent } from "react";

interface PropType {
  text: string;
  setPlayerName: (e: ChangeEvent<HTMLInputElement>) => void;
  playerName: string;
  setStartingPlayer: (e: ChangeEvent<HTMLInputElement>) => void;
  isStartingPlayer: boolean;
  visible?: boolean;
}

export default function PlayerNameCollector(props: PropType) {
  const {
    text,
    setPlayerName,
    playerName,
    setStartingPlayer,
    isStartingPlayer,
    visible,
  } = props;
  return (
    <div className={`flex items-center my-1 ${visible ? "" : "hidden"}`}>
      <div className={`mr-1`}>{text}</div>
      <input
        id={`${text.replace(" ", "").toLowerCase()}name`}
        type="text"
        onChange={setPlayerName}
        value={playerName}
        className="border-2 border-purple-900 border-solid rounded-lg"
      />
      <input
        type="checkbox"
        className="mx-2 rounded-full"
        onChange={setStartingPlayer}
        checked={isStartingPlayer}
        value={parseInt(text.toLowerCase().replace("player", "").trim()) - 1}
      />
    </div>
  );
}

PlayerNameCollector.defaultProps = {
  visible: true,
};
