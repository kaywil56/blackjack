import { useEffect, SetStateAction } from "react"
import { GameState } from "../App"
import './Results.css'

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

    return <div className="overlay">
    <h1>Results</h1>
    <p>{result}</p>
    </div>
}

export default Results