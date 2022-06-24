export type ShortSymbolType = "p" | "l" | "f" | "b" | "j" | "n" | "e" | "s";

export type LongSymbolType =
  | "Pipe"
  | "Lightbulb"
  | "Fist"
  | "Badge"
  | "Journal"
  | "Necklace"
  | "Eye"
  | "Skull";

interface SymbolType {
  id: number;
  short_symbol: ShortSymbolType;
  long_symbol: LongSymbolType;
}

interface UserType {
  id: string;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
}

export interface SuspectStateType {
  mustHave: ShortSymbolType[];
  cantHave: ShortSymbolType[];
}

export interface PlayerType {
  id: number;
  name: string;
  is_user: boolean;
}

interface GameStateType {
  id: number;
  num_players: number;
  active_player: PlayerType | null;
  created_at: string;
  updated_at: string;
  suspectState: SuspectStateType;
}

export interface AppStateType {
  user: UserType;
  game: GameStateType;
}

export type SuspectNameType =
  | "Sebastian Moran"
  | "Irene Adler"
  | "Inspector Lestrade"
  | "Inspector Gregson"
  | "Inspector Baynes"
  | "Inspector Bradstreet"
  | "Inspector Hopkins"
  | "Sherlock Holmes"
  | "John Watson"
  | "Mycroft Holmes"
  | "Mrs. Hudson"
  | "Mary Morstan"
  | "James Moriarty";
