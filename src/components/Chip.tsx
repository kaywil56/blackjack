import { IChip } from "../interfaces/IChip";
import { shadeColor } from "../utils/shadeColor";
import "./Chip.css";

interface IChipProps {
  chip: IChip;
  handleChip: (chip: IChip) => void;
  isPlaced: boolean;
}

const Chip = ({ chip, handleChip, isPlaced }: IChipProps) => {
  return (
    <li onClick={() => handleChip(chip)}>
      <div
        className={isPlaced ? "poker-chip placed-chip" : "poker-chip"}
        style={{
          backgroundColor: chip.color,
        }}
      >
        <div
          style={{ backgroundColor: shadeColor(chip.color, -30) }}
          className="poker-chip-grove"
        >
          <div
            style={{ backgroundColor: chip.color }}
            className="poker-chip-inner-circle"
          >
            {chip.value}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Chip;
