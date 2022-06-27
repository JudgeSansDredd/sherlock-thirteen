import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import NumPlayerSelector from "../Components/NumPlayerSelector";
import PlayerNameCollector from "../Components/PlayerNameCollector";
import StartingHandSelector from "../Components/StartingHandSelector";
import { SuspectNameType } from "../types";

interface GameSetupType {
  numPlayers: 3 | 4 | null;
  startingPlayer: 0 | 1 | 2 | 3 | null;
  players: string[];
  startingHand: SuspectNameType[];
}

declare function route(name: string): string;

export default function CreateGame() {
  const [gameSetup, setGameSetup] = useState<GameSetupType>({
    numPlayers: null,
    startingPlayer: null,
    players: [],
    startingHand: [],
  });

  useEffect(() => {
    const { numPlayers, startingHand } = gameSetup;
    const maxSelectable = numPlayers ? 12 / numPlayers : 0;
    const currentSelected = startingHand.length;
    let newStartingHand: SuspectNameType[];
    if (currentSelected > maxSelectable) {
      newStartingHand = startingHand;
      newStartingHand.length = maxSelectable;
    } else {
      return;
    }
    setGameSetup(prev => {
      return { ...prev, startingHand: newStartingHand };
    });
  }, [gameSetup.numPlayers]);

  const toggleSuspectStartingHand = (name: SuspectNameType) => {
    const { numPlayers, startingHand } = gameSetup;
    const maxSelectable = numPlayers ? 12 / numPlayers : 0;
    const currentSelected = startingHand.length;

    let newStartingHand: SuspectNameType[];

    if (startingHand.includes(name)) {
      // Remove from starting hand
      newStartingHand = startingHand.filter(el => el !== name);
    } else if (currentSelected < maxSelectable) {
      // Add to starting hand, if allowed
      newStartingHand = [...startingHand, name];
    } else {
      return;
    }
    setGameSetup(prev => {
      return { ...prev, startingHand: newStartingHand };
    });
  };

  const startGameApi = () => {
    const url = route("save-game");
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
    setGameSetup(prev => {
      return { ...prev, numPlayers, startingPlayer, players };
    });
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
          <StartingHandSelector
            selected={gameSetup.startingHand}
            toggleSuspectStartingHand={toggleSuspectStartingHand}
          />
          <button className="mt-8 purple-button" onClick={startGameApi}>
            Start Game
          </button>
        </div>
      </div>
    </>
  );
}
