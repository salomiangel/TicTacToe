import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png.jpg';
import cross_icon from '../Assets/cross.png.jpg';

const TicTacToe = () => {
    const [data, setData] = useState(Array(9).fill(""));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState("");

    // Function to check for a winner
    const checkWinner = (newData) => {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                setWinner(newData[a]);
                setLock(true);
                return;
            }
        }

        if (!newData.includes("") && !winner) {
            setWinner("Draw"); // If all boxes are filled and no winner
        }
    };

    const toggle = (num) => {
        if (lock || data[num] !== "") return;

        let newData = [...data];
        newData[num] = count % 2 === 0 ? "X" : "O";
        setCount(count + 1);
        setData(newData);

        checkWinner(newData);
    };

    const resetGame = () => {
        setData(Array(9).fill(""));
        setCount(0);
        setLock(false);
        setWinner("");
    };

    return (
        <div className='container'>
            <h1 className="title">Tic Tac Toe Game In <span>React</span></h1>
            
            {winner && <h2 className="winner-message">🎉 {winner === "Draw" ? "It's a Draw!" : `${winner} Wins! 🎉`}</h2>}

            <div className="board">
                {data.map((value, index) => (
                    <div key={index} className="boxes" onClick={() => toggle(index)}>
                        {value && <img src={value === "X" ? cross_icon : circle_icon} alt={value} />}
                    </div>
                ))}
            </div>
            
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
