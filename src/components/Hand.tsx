import { ICard } from "../interfaces/ICard"
import Card from "./Card"

interface IHandProps{
    cards: ICard[]
}

const Hand = ({ cards }: IHandProps) => {
    return <ul>{cards.map((card: ICard) => {
        return <Card card={card} />
    })}</ul>
}

export default Hand