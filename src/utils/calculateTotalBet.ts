import { IChip } from "../interfaces/IChip";

export const calculateTotalBet = (placedChips: IChip[]): number => {
    const sum = placedChips.reduce((totalBet, chip) => {
      return totalBet + chip.value;
    }, 0);

    return sum;
  };