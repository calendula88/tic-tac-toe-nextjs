'use client';

import React, { useState } from 'react';
import Board from './Board';
import { GameHistory, BoardState } from '../types/game';

const Game: React.FC = () => {
  const [history, setHistory] = useState<GameHistory[]>([{ 
    squares: Array(9).fill(null), 
    moveLocation: null 
  }]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  
  const xIsNext: boolean = currentMove % 2 === 0;
  const currentSquares: BoardState = history[currentMove].squares;

  function handlePlay(nextSquares: BoardState, moveIndex: number): void {
    const row: number = Math.floor(moveIndex / 3) + 1;
    const col: number = (moveIndex % 3) + 1;
    const nextHistory: GameHistory[] = [
      ...history.slice(0, currentMove + 1), 
      { 
        squares: nextSquares, 
        moveLocation: `(${row}, ${col})` 
      }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder(): void {
    setSortAscending(!sortAscending);
  }

  // Создание списка ходов с возможностью сортировки
  let moves = history.map((step: GameHistory, move: number) => {
    let description: string;
    
    if (move === currentMove) {
      description = `Вы на ходу №${move} ${step.moveLocation || ''}`;
      return (
        <li key={move}>
          <div>{description}</div>
        </li>
      );
    } else if (move > 0) {
      description = `Перейти к ходу №${move} ${step.moveLocation}`;
    } else {
      description = "Начало игры";
    }
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Сортировка ходов
  if (!sortAscending) {
    moves = moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={toggleSortOrder}>
          Сортировка: {sortAscending ? "по возрастанию" : "по убыванию"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;