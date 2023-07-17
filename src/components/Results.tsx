import { useEffect, SetStateAction } from "react"
import { Result } from "../App";

interface IResultsProps {
    result: string,
    setResult: React.Dispatch<SetStateAction<Result | undefined>>;
}

const Results = ({ result, setResult }: IResultsProps) => {
    const handleTimeOut = () => {
        setResult(undefined)
    }
    useEffect(() => {
        const timer = setTimeout(() => handleTimeOut, 3000);
        return () => clearTimeout(timer);
    }, []);

    return <p>{result}</p>
}

export default Results