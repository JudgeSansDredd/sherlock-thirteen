import { ShortSymbolType } from "./types";

export const suspects: { name: string; symbols: ShortSymbolType[] }[] = [
  { name: "Sebastian Moran", symbols: ["s", "f"] },
  { name: "Irene Adler", symbols: ["s", "l", "n"] },
  { name: "Inspector Lestrade", symbols: ["b", "e", "j"] },
  { name: "Inspector Gregson", symbols: ["b", "f", "j"] },
  { name: "Inspector Baynes", symbols: ["b", "l"] },
  { name: "Inspector Bradstreet", symbols: ["b", "f"] },
  { name: "Inspector Hopkins", symbols: ["b", "p", "e"] },
  { name: "Sherlock Holmes", symbols: ["p", "l", "f"] },
  { name: "John Watson", symbols: ["p", "e", "f"] },
  { name: "Mycroft Holmes", symbols: ["p", "l", "j"] },
  { name: "Mrs. Hudson", symbols: ["p", "n"] },
  { name: "Mary Morstan", symbols: ["j", "n"] },
  { name: "James Moriarty", symbols: ["s", "l"] },
];

export const symbols: Record<
  ShortSymbolType,
  { totalInGame: number; name: string }
> = {
  p: { totalInGame: 5, name: "Pipe" },
  l: { totalInGame: 5, name: "Lightbulb" },
  f: { totalInGame: 5, name: "Fist" },
  b: { totalInGame: 5, name: "Badge" },
  j: { totalInGame: 4, name: "Journal" },
  n: { totalInGame: 3, name: "Necklace" },
  e: { totalInGame: 3, name: "Eye" },
  s: { totalInGame: 3, name: "Skull" },
};
