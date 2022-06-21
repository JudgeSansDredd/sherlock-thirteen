import { Head } from "@inertiajs/inertia-react";
import React, { ChangeEvent, useState } from "react";
import { AppStateType } from "../types";

interface GameSetupType {
  numPlayers: 3 | 4 | null;
  startingPlayer: 0 | 1 | 2 | 3 | null;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
}

export default function CreateGame(props: AppStateType) {
  const [gameSetup, setGameSetup] = useState<GameSetupType>({
    numPlayers: 4,
    startingPlayer: null,
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  });

  const setNumPlayersThree = () => {
    setGameSetup(prev => {
      return { ...prev, numPlayers: 3 };
    });
  };

  const setNumPlayersFour = () => {
    setGameSetup(prev => {
      return { ...prev, numPlayers: 4 };
    });
  };

  const setStartingPlayer = (c: ChangeEvent<HTMLInputElement>) => {
    if (c.target.checked) {
      setGameSetup(prev => {
        return {
          ...prev,
          startingPlayer: parseInt(c.target.value) as 0 | 1 | 2 | 3,
        };
      });
      console.log(parseInt(c.target.value));
    }
  };

  return (
    <>
      <Head title="Create Game" />
      <div className="flex flex-col items-center">
        <div>How Many Players?</div>
        <div className="flex">
          <div
            className={`rounded-l-lg num-player-styling ${
              gameSetup.numPlayers === 3
                ? "bg-purple-300 font-bold"
                : "bg-purple-100"
            }`}
            onClick={setNumPlayersThree}
          >
            3
          </div>
          <div
            className={`rounded-r-lg num-player-styling ${
              gameSetup.numPlayers === 4
                ? "bg-purple-300 font-bold"
                : "bg-purple-100"
            }`}
            onClick={setNumPlayersFour}
          >
            4
          </div>
        </div>
        <div
          className={`mt-2 flex flex-col items-center ${
            gameSetup.numPlayers === null ? "hidden" : ""
          }`}
        >
          <div className={`flex items-center my-1`}>
            <div className={`mr-1`}>Player 1</div>
            <input
              type="text"
              className="border-solid border-2 border-purple-900 rounded-lg"
            />
            <input
              type="checkbox"
              className="mx-2 rounded-full"
              onChange={setStartingPlayer}
              checked={gameSetup.startingPlayer === 0}
              value={0}
            />
          </div>
          <div className={`flex items-center my-1`}>
            <div className={`mr-1`}>Player 2</div>
            <input
              type="text"
              className="border-solid border-2 border-purple-900 rounded-lg"
            />
            <input
              type="checkbox"
              className="mx-2 rounded-full"
              onChange={setStartingPlayer}
              checked={gameSetup.startingPlayer === 1}
              value={1}
            />
          </div>
          <div className={`flex items-center my-1`}>
            <div className={`mr-1`}>Player 3</div>
            <input
              type="text"
              className="border-solid border-2 border-purple-900 rounded-lg"
            />
            <input
              type="checkbox"
              className="mx-2 rounded-full"
              onChange={setStartingPlayer}
              checked={gameSetup.startingPlayer === 2}
              value={2}
            />
          </div>
          <div
            className={`flex items-center my-1 ${
              gameSetup.numPlayers === 4 ? "" : "hidden"
            }`}
          >
            <div className={`mr-1`}>Player 4</div>
            <input
              type="text"
              className="border-solid border-2 border-purple-900 rounded-lg"
            />
            <input
              type="checkbox"
              className="mx-2 rounded-full"
              onChange={setStartingPlayer}
              checked={gameSetup.startingPlayer === 3}
              value={3}
            />
          </div>
        </div>
      </div>
    </>
  );
}
