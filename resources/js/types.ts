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

export interface SuspectType {
  name: SuspectNameType;
  symbols: SymbolType[];
}

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

export interface PlayerType {
  id: number;
  name: string;
  is_user: boolean;
  created_at: string;
  updated_at: string;
}

export interface GameType {
  id: number;
  num_players: number;
  active_player_id: number | null;
  hard_mode: boolean;
  starting_suspects: SuspectType[];
  created_at: string;
  updated_at: string;
  players: PlayerType[];
}

interface MinMax {
  minimum: number;
  maximum: number;
}

export interface PlayerSymbolType {
  handSize: number;
  hardMode: boolean;
  player: PlayerType;
  symbolStates: Record<ShortSymbolType, MinMax>;
}

export interface AppStateType {
  auth: {
    user: UserType;
  };
  game: GameType;
  gameState: PlayerSymbolType[];
}

export interface SymbolStateType {
  symbol: SymbolType;
  found: number;
  remaining: number;
}
