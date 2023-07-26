import { ICard } from "../interfaces/ICard";
import "./Card.css";

interface ICardProps {
  card: ICard;
}

const Card = ({ card }: ICardProps) => {
  const convertStringToSuitSymbol = (suit: string) => {
    switch (suit) {
      case "Clubs":
        return "♣";
      case "Diamonds":
        return "♦";
      case "Hearts":
        return "♥";
      case "Spades":
        return "♠";
    }
  };

  const getCardColor = (suit: string): string => {
    if (suit == "Diamonds" || suit == "Hearts") {
      return "#d12d36";
    } else {
      return "#141414";
    }
  };

  return (
    <li>
        <div className="card" style={{ color: getCardColor(card.suit) }}>
          {card.isFaceDown ? (
            <div className="pattern"></div>
          ) : (
            <>
              <div className="corner tl">
                <span className="suit">
                  {convertStringToSuitSymbol(card.suit)}
                </span>
                <span className="value">{card.rank}</span>
              </div>
              <div className="inner">
                <span>{card.rank}</span>
              </div>
              <div className="corner br">
                <span className="suit">
                  {convertStringToSuitSymbol(card.suit)}
                </span>
                <span className="value">{card.rank}</span>
              </div>
            </>
          )}
        </div>
    </li>
  );
};

export default Card;
