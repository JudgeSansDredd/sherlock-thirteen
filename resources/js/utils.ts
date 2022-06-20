import { LongSymbolType, ShortSymbolType } from "./types";

export function shortToLongSymbol(
  shortSymbol: ShortSymbolType,
): LongSymbolType {
  switch (shortSymbol) {
    case "p":
      return "Pipe";
    case "l":
      return "Lightbulb";
    case "f":
      return "Fist";
    case "b":
      return "Badge";
    case "j":
      return "Journal";
    case "n":
      return "Necklace";
    case "e":
      return "Eye";
    case "s":
      return "Skull";
    default:
      break;
  }
  throw new Error(`Short symbol provided (${shortSymbol}) is not valid`);
}
