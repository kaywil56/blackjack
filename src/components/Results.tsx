import { useEffect, SetStateAction } from "react"

interface IResultsProps {
    result: string,
    setResult: React.Dispatch<SetStateAction<string>>;
}

const Results = ({ result, setResult }: IResultsProps) => {
    const handleTimeOut = () => {
        setResult("")
    }
    useEffect(() => {
        const timer = setTimeout(() => handleTimeOut, 3000);
        return () => clearTimeout(timer);
    }, []);

    return <p>{result}</p>
}

export default Results