import { ShortSymbolType, SuspectNameType, SymbolType } from "./types";

export const SUSPECTS: { name: SuspectNameType; symbols: ShortSymbolType[] }[] =
  [
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

export const SYMBOLS: SymbolType[] = [
  { total_in_game: 5, short_symbol: "p", long_symbol: "Pipe" },
  { total_in_game: 5, short_symbol: "l", long_symbol: "Lightbulb" },
  { total_in_game: 5, short_symbol: "f", long_symbol: "Fist" },
  { total_in_game: 5, short_symbol: "b", long_symbol: "Badge" },
  { total_in_game: 4, short_symbol: "j", long_symbol: "Journal" },
  { total_in_game: 3, short_symbol: "n", long_symbol: "Necklace" },
  { total_in_game: 3, short_symbol: "e", long_symbol: "Eye" },
  { total_in_game: 3, short_symbol: "s", long_symbol: "Skull" },
];
