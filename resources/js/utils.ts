import { SYMBOLS } from "./constants";
import {
  GameStateType,
  LongSymbolType,
  ShortSymbolType,
  SuspectStateType,
  SymbolType,
} from "./types";

function shortToSymbol(shortSymbol: ShortSymbolType): SymbolType {
  const symbol = SYMBOLS.filter(symbol => {
    return symbol.short_symbol === shortSymbol;
  });
  if (!symbol.length) {
    throw new Error(`Short symbol provided (${shortSymbol}) is not valid`);
  }
  return symbol[0];
}

function longToSymbol(longSymbol: LongSymbolType): SymbolType {
  const symbol = SYMBOLS.filter(symbol => {
    return symbol.long_symbol === longSymbol;
  });
  if (!symbol.length) {
    throw new Error(`Long symbol provided (${longSymbol}) is not valid`);
  }
  return symbol[0];
}

export function getSymbol(val: ShortSymbolType | LongSymbolType): SymbolType {
  try {
    return shortToSymbol(val as ShortSymbolType);
  } catch (err) {
    try {
      return longToSymbol(val as LongSymbolType);
    } catch (err) {
      throw new Error(
        `Value provided (${val}) does not match a short or long symbol type`,
      );
    }
  }
}

export function getSuspectState(): SuspectStateType {
  return { mustHave: [], cantHave: [] };
}

export function getNonActivePlayers(game: GameStateType) {
  const { active_player_id, players } = game;
  if (!active_player_id) {
    return players;
  }

  return players.filter(player => {
    return player.id !== active_player_id && !player.is_user;
  });
}

export function getActivePlayer(game: GameStateType) {
  const { active_player_id, players } = game;
  if (!active_player_id) {
    return null;
  }

  return players.filter(player => {
    return player.id === active_player_id;
  })[0];
}
