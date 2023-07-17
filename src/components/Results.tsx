import { useEffect, SetStateAction } from "react"
import { GameState } from "../App"

interface IResultProps{
    result: string,
    setGameState: React.Dispatch<SetStateAction<GameState>>
}

const Results = ({ result, setGameState }: IResultProps) => {
    const handleTimeOut = () => {
        setGameState(GameState.bet)
    }
    useEffect(() => {
        const timer = setTimeout(() => handleTimeOut(), 3000);
        return () => clearTimeout(timer);
    }, []);

    return <p>{result}</p>
}

export default Results