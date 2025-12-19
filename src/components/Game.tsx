import { useEffect, useState } from "react";
import Board from "./Board";

const winnerCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [6, 4, 2],
        [0, 3, 6],
        [2, 5, 8],
        [1, 4, 7]
    ]

export default function Game() {
    const [squares, setSquares] = useState<(string | null)[]>(
        Array(9).fill(null)
    );
    const [time, setTime] = useState(10);
    const [isXNext, setIsXNext] = useState(true);
    

    useEffect(() => {
        if (time === 0) {
            setIsXNext((prev) => !prev);
            setTime(10);
            return;
        }

        const timer = setInterval(() => {
            setTime((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer);

    }, [time, squares])


    function handleSquareClick(index: number) {
        if (calculateWinner() || squares[index] != null)
            return;

        const nextSquares = [...squares];
        nextSquares[index] = isXNext ? "X" : "O";
        setSquares(nextSquares);
        setIsXNext(!isXNext);
        setTime(10);

    }

    function calculateWinner() {
        for (let i = 0; i < winnerCombination.length; i++) {
            const [a, b, c] = winnerCombination[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
                return squares[a];
        }
        return null;
    }

    function playAgain() {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setTime(10);
    }

    return (
        <div className="game-container">
            <h1>Tic Tac Toe</h1>
            <p>Turn timer: {time}</p>
            <Board squares={squares} onSquareClick={handleSquareClick} />
            <p>Next Player: {isXNext ? "X" : "O"}</p>
            {calculateWinner() && <p>Winner: {calculateWinner()}</p>}
            <button onClick={playAgain}>Play again</button>
        </div>
    );
}