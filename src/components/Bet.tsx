import { IChip } from "../interfaces/IChip";
import "./Bet.css";
import { SetStateAction } from "react";
import { calculateTotalBet } from "../utils/calculateTotalBet";

interface IBetProps {
  placeBet: () => void;
  bank: number;
  setBank: React.Dispatch<SetStateAction<number>>
  placedChips: IChip[]
  setPlacedChips: React.Dispatch<SetStateAction<IChip[]>>
}

const Bet = ({ placeBet, bank, setBank, placedChips, setPlacedChips }: IBetProps) => {
  const pokerChips = [
    { id: 1, color: "#FFFFFF", value: 1 },
    { id: 2, color: "#FF0000", value: 5 },
    { id: 3, color: "#0000FF", value: 10 },
    { id: 4, color: "#808080", value: 20 },
    { id: 5, color: "#008000", value: 25 },
    { id: 6, color: "#FFA500", value: 50 },
    { id: 7, color: "#000000", value: 100 },
    { id: 8, color: "#f05582", value: 250 },
    { id: 9, color: "#800080", value: 500 },
    { id: 10, color: "#f99e4d", value: 1000 },
    { id: 11, color: "#ADD8E6", value: 2000 },
    { id: 12, color: "#A52A2A", value: 5000 },
  ];

  const placeChip = (selectedChip: IChip) => {
    setPlacedChips((prevPlacedChips) => [...prevPlacedChips, selectedChip]);
    setBank(prevBank => prevBank - selectedChip.value)
  };

  const removeChip = (selectedChip: IChip) => {
    const updatedPlacedChips = [...placedChips];
    const selectedChipIdx = updatedPlacedChips.findIndex(
      (chip) => chip.id === selectedChip.id
    );
    updatedPlacedChips.splice(selectedChipIdx, 1);
    setPlacedChips(updatedPlacedChips);
    setBank(prevBank => prevBank + selectedChip.value)
  };

  return (
    <div id="bet-area">
      <p>Bank: {bank}</p>
      <div id="placed-chips-area">
        <p>Bet: {calculateTotalBet(placedChips)}</p>
        <ul id="placed-chips">
          {placedChips.map((chip, idx) => {
            return (
              <li
                onClick={() => removeChip(chip)}
                key={`placed-poker-chip-${chip.id}-${idx}`}
              >
                <div
                  className="poker-chip placed-chip"
                  style={{
                    backgroundColor: chip.color,
                    color: chip.id === 1 ? "#333" : "white",
                  }}
                >
                  {chip.value}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <ul id="poker-chip-list">
        {pokerChips.map((chip) => (
          <>
            {chip.value <= bank && (
              <li onClick={() => placeChip(chip)} key={`poker-chip-${chip.id}`}>
                <div
                  className="poker-chip"
                  style={{
                    backgroundColor: chip.color,
                    color: chip.id === 1 ? "#333" : "white",
                  }}
                >
                  {chip.value}
                </div>
              </li>
            )}
          </>
        ))}
      </ul>

      <button disabled={placedChips.length === 0} onClick={placeBet}>Place bet</button>
    </div>
  );
};

export default Bet;
