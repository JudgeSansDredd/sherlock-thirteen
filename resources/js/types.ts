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
}

export interface PlayerType {
  id: number;
  name: string;
  is_user: boolean;
  created_at: string;
  updated_at: string;
  interrogations: InterrogationType[];
  investigations: InvestigationType[];
}

export interface InvestigationType {
  player_id: number;
  hidden_card: number;
  symbol: SymbolType;
  number_claimed: number;
}

export interface InterrogationType {
  player_id: number;
  hidden_card: number;
  symbol: SymbolType;
  number_claimed: number;
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
