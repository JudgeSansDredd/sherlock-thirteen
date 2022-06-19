import { Head } from "@inertiajs/inertia-react";
import React from "react";
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
      <div className="flex justify-center">
        <div>Text here, for sure</div>
      </div>
    </>
  );
}
