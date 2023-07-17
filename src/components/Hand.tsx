import { ICard } from "../interfaces/ICard"
import Card from "./Card"

interface IHandProps {
    cards: ICard[],
}

const Hand = ({ cards }: IHandProps) => {
    return <ul>{cards.map((card: ICard, idx: number) => {
        return <Card key={idx} card={card} />
    })}</ul>
}

export default Hand