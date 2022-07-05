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
  id: number;
  created_at: string;
  updated_at: string;
}

export interface SuspectStateType {
  mustHave: ShortSymbolType[];
  cantHave: ShortSymbolType[];
  cantBe: SuspectNameType[];
}

export interface PlayerSymbolStateType {
  player: PlayerType;
  minimum: number;
  maximum: number;
}

export interface PlayerType {
  id: number;
  name: string;
  is_user: boolean;
  created_at: string;
  updated_at: string;
}

export interface GameStateType {
  id: number;
  num_players: number;
  active_player_id: number | null;
  hard_mode: boolean;
  created_at: string;
  updated_at: string;
  players: PlayerType[];
}

export interface AppStateType {
  auth: {
    user: UserType;
  };
  game: GameStateType;
}
