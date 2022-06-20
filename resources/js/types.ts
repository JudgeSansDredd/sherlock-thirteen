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

interface UserType {
  name: string;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
}

export interface SuspectStateType {
  mustHave: ShortSymbolType[];
  cantHave: ShortSymbolType[];
}

interface GameStateType {
  suspectState: SuspectStateType;
}

export interface AppStateType {
  user: UserType;
  gameState: GameStateType;
}
