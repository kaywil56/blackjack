import { ICard } from "../interfaces/ICard"

interface ICardProps{
    card: ICard
}

const Card = ({ card }: ICardProps) => {
    return <li>{card.isFaceDown ? "Face down" : `${card.suit} | ${card.value}`}</li>
}

export default Card