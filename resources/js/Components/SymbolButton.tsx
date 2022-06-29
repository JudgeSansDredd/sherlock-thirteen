import React, { MouseEvent } from "react";
import { SymbolType } from "../types";
import SelectButton from "./SelectButton";

interface PropType {
  symbol: SymbolType;
  active: boolean;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function SymbolButton(props: PropType) {
  const { symbol, active, handleClick } = props;
  const params = { active, handleClick, buttonText: symbol.long_symbol };
  return <SelectButton {...params} />;
}
