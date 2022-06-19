import { Head } from "@inertiajs/inertia-react";
import React from "react";
import SuspectStatus from "../Components/SuspectStatus";
import SymbolStatus from "../Components/SymbolStatus";
import { User } from "../types";

interface PropType {
  user: User;
}

export default function Home(props: PropType) {
  /*
              Suspect('Sebastian Moran', ['s', 'f']),
            Suspect('Irene Adler', ['s', 'l', 'n']),
            Suspect('Inspector Lestrade', ['b', 'e', 'j']),
            Suspect('Inspector Gregson', ['b', 'f', 'j']),
            Suspect('Inspector Baynes', ['b', 'l']),
            Suspect('Inspector Bradstreet', ['b', 'f']),
            Suspect('Inspector Hopkins', ['b', 'p', 'e']),
            Suspect('Sherlock Holmes', ['p', 'l', 'f']),
            Suspect('John Watson', ['p', 'e', 'f']),
            Suspect('Mycroft Holmes', ['p', 'l', 'j']),
            Suspect('Mrs. Hudson', ['p', 'n']),
            Suspect('Mary Morstan', ['j', 'n']),
            Suspect('James Moriarty', ['s', 'l'])

            */

  return (
    <>
      <Head title="Home" />
      <div className="flex flex-wrap justify-center">
        <SymbolStatus symbol="Pipe" found={0} remaining={5} />
        <SymbolStatus symbol="Lightbulb" found={0} remaining={5} />
        <SymbolStatus symbol="Fist" found={0} remaining={5} />
        <SymbolStatus symbol="Badge" found={0} remaining={5} />
        <SymbolStatus symbol="Journal" found={0} remaining={4} />
        <SymbolStatus symbol="Necklace" found={0} remaining={3} />
        <SymbolStatus symbol="Eye" found={0} remaining={3} />
        <SymbolStatus symbol="Skull" found={0} remaining={3} />
      </div>
      <div className="flex flex-col items-center p-2">
        <SuspectStatus name="Sebastian Moran" symbols={["s", "f"]} />
        <SuspectStatus name="Irene Adler" symbols={["s", "l", "n"]} />
        <SuspectStatus name="Inspector Lestrade" symbols={["b", "e", "j"]} />
        <SuspectStatus name="Inspector Gregson" symbols={["b", "f", "j"]} />
        <SuspectStatus name="Inspector Baynes" symbols={["b", "l"]} />
        <SuspectStatus name="Inspector Bradstreet" symbols={["b", "f"]} />
        <SuspectStatus name="Inspector Hopkins" symbols={["b", "p", "e"]} />
        <SuspectStatus name="Sherlock Holmes" symbols={["p", "l", "f"]} />
        <SuspectStatus name="John Watson" symbols={["p", "e", "f"]} />
        <SuspectStatus name="Mycroft Holmes" symbols={["p", "l", "j"]} />
        <SuspectStatus name="Mrs. Hudson" symbols={["p", "n"]} />
        <SuspectStatus name="James Moriarty" symbols={["s", "l"]} />
      </div>
    </>
  );
}
