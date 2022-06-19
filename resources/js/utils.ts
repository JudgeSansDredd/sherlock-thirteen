import { LongSymbol, ShortSymbol } from "./types";

export function shortToLongSymbol(shortSymbol: ShortSymbol): LongSymbol {
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
