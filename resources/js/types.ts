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

export interface SymbolType {
  short_symbol: ShortSymbolType;
  long_symbol: LongSymbolType;
  total_in_game: 3 | 4 | 5;
}

export interface UserType {
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

export interface GameStateType {
  id: number;
  num_players: number;
  active_player: PlayerType | null;
  hard_mode: boolean;
  created_at: string;
  updated_at: string;
  players: PlayerType[];
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
