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
  created_at: Date;
  updated_at: Date;
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
