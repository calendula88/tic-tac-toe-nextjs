'use client';

import React from 'react';
import Square from './Square';
import { useBoard } from './useBoard';

const Board: React.FC<{ xIsNext: boolean; squares: ('X' | 'O' | null)[]; onPlay: (nextSquares: ('X' | 'O' | null)[], moveIndex: number) => void }> = ({ xIsNext, squares, onPlay }) => {
  const { handleClick, calculateWinner } = useBoard();

  const { winner, winningLine } = calculateWinner(squares);
  
  let status: string;
  if (winner) {
    status = "Победитель: " + winner;
  } else if (squares.every(square => square !== null)) {
    status = "Ничья!";
  } else {
    status = "Следующий игрок: " + (xIsNext ? "X" : "O");
  }

  // Создаем доску 3x3 с помощью вложенных циклов
  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      squaresInRow.push(
        <Square 
          key={index}
          value={squares[index]} 
          onSquareClick={() => handleClick(index, squares, xIsNext, onPlay)}
          isWinning={!!winningLine && winningLine.includes(index)}
        />
      );
    }
    boardRows.push(
      <div key={row} className="flex justify-center">
        {squaresInRow}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold mb-4 text-gray-800">{status}</div>
      <div className="inline-block border-2 border-gray-800 rounded-lg overflow-hidden">
        {boardRows}
      </div>
    </div>
  );
};

export default Board;