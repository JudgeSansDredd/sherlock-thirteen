import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import NumPlayerSelector from "../Components/NumPlayerSelector";
import PlayerNameCollector from "../Components/PlayerNameCollector";
import StartingHandSelector from "../Components/StartingHandSelector";

interface GameSetupType {
  numPlayers: 3 | 4 | null;
  startingPlayer: 0 | 1 | 2 | 3 | null;
  players: string[];
}

declare function route(name: string): string;

export default function CreateGame() {
  const [gameSetup, setGameSetup] = useState<GameSetupType>({
    numPlayers: 4,
    startingPlayer: null,
    players: [],
  });

  const startGameApi = () => {
    const url = route("create-game");
    axios
      .post(url, gameSetup)
      .then(res => {
        Inertia.get("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const setNumPlayers = (e: MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;
    const startingPlayer = null;
    let numPlayers: 3 | 4;
    switch (id) {
      case "numPlayers3":
        numPlayers = 3;
        break;
      case "numPlayers4":
        numPlayers = 4;
        break;
      default:
        throw new Error("ID of passed numPlayer div not set or sent correctly");
    }
    const players = Array(numPlayers).fill("", 0, numPlayers);
    setGameSetup({ numPlayers, startingPlayer, players });
  };

  const setPlayerName = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    const { id, value } = currentTarget;
    let { players } = gameSetup;
    switch (id) {
      case "player1name":
        players[0] = value;
        break;
      case "player2name":
        players[1] = value;
        break;
      case "player3name":
        players[2] = value;
        break;
      case "player4name":
        players[3] = value;
        break;
      default:
        throw new Error(
          "ID of passed playerName div not set or sent correctly",
        );
    }
    setGameSetup(prev => {
      return { ...prev, players };
    });
  };

  const setStartingPlayer = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setGameSetup(prev => {
        return {
          ...prev,
          startingPlayer: parseInt(e.target.value) as 0 | 1 | 2 | 3,
        };
      });
    }
  };

  return (
    <>
      <Head title="Create Game" />
      <div className="flex flex-col grow items-center">
        <NumPlayerSelector
          numPlayers={gameSetup.numPlayers}
          setNumPlayers={setNumPlayers}
        />
        <div
          className={`mt-2 grow flex flex-col items-center ${
            gameSetup.numPlayers === null ? "hidden" : ""
          }`}
        >
          <PlayerNameCollector
            text="Player 1"
            playerName={gameSetup.players[0] || ""}
            setPlayerName={setPlayerName}
            isStartingPlayer={gameSetup.startingPlayer === 0}
            setStartingPlayer={setStartingPlayer}
          />
          <PlayerNameCollector
            text="Player 2"
            playerName={gameSetup.players[1] || ""}
            setPlayerName={setPlayerName}
            isStartingPlayer={gameSetup.startingPlayer === 1}
            setStartingPlayer={setStartingPlayer}
          />
          <PlayerNameCollector
            text="Player 3"
            playerName={gameSetup.players[2] || ""}
            setPlayerName={setPlayerName}
            isStartingPlayer={gameSetup.startingPlayer === 2}
            setStartingPlayer={setStartingPlayer}
          />
          <PlayerNameCollector
            text="Player 4"
            playerName={gameSetup.players[3] || ""}
            setPlayerName={setPlayerName}
            isStartingPlayer={gameSetup.startingPlayer === 3}
            setStartingPlayer={setStartingPlayer}
            visible={gameSetup.numPlayers === 4}
          />
          <StartingHandSelector />
          <button className="mt-8 purple-button" onClick={startGameApi}>
            Start Game
          </button>
        </div>
      </div>
    </>
  );
}
