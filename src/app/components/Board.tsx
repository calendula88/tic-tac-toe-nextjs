'use client';

import React from 'react';
import Square from './Square';
import { BoardProps, WinnerResult, SquareValue } from '../types/game';

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  function handleClick(i: number): void {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const { winner, winningLine }: WinnerResult = calculateWinner(squares);
  let status: string;
  
  if (winner) {
    status = "Победитель: " + winner;
  } else if (squares.every(square => square !== null)) {
    status = "Ничья!";
  } else {
    status = "Следующий игрок: " + (xIsNext ? "X" : "O");
  }

  // Создание доски с помощью циклов
  const board: React.ReactElement[] = [];
  for (let row = 0; row < 3; row++) {
    const boardRow: React.ReactElement[] = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      boardRow.push(
        <Square 
          key={index}
          value={squares[index]} 
          onSquareClick={() => handleClick(index)}
          isWinning={!!winningLine && winningLine.includes(index)}
        />
      );
    }
    board.push(
      <div key={row} className="board-row">
        {boardRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
};

function calculateWinner(squares: SquareValue[]): WinnerResult {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { 
        winner: squares[a] as 'X' | 'O',  // Добавляем приведение типа
        winningLine: [a, b, c] 
      };
    }
  }
  
  return { winner: null, winningLine: null };
}

export default Board;