'use client';

import React from 'react';
import Board from './Board';
import { useGame } from './useGame';

const Game: React.FC = () => {
  const {
    history,
    currentMove,
    sortAscending,
    xIsNext,
    currentSquares,
    handlePlay,
    jumpTo,
    toggleSortOrder
  } = useGame();

  let moves = history.map((step, move) => {
    let description;
    if (move === currentMove) {
      description = `Вы на ходу №${move} ${step.moveLocation || ''}`;
      return (
        <li key={move} className="mb-2">
          <div className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
            {description}
          </div>
        </li>
      );
    } else if (move > 0) {
      description = `Перейти к ходу №${move} ${step.moveLocation}`;
    } else {
      description = "Начало игры";
    }
    
    return (
      <li key={move} className="mb-2">
        <button 
          onClick={() => jumpTo(move)}
          className="text-blue-500 hover:text-blue-700 underline transition-colors px-3 py-1 hover:bg-blue-50 rounded"
        >
          {description}
        </button>
      </li>
    );
  });

  if (!sortAscending) {
    moves = moves.reverse();
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 font-sans max-w-6xl mx-auto">
      <div className="flex-1">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="md:w-80">
        <div className="bg-white rounded-lg shadow-md p-4">
          <button 
            onClick={toggleSortOrder}
            className="w-full mb-4 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            Сортировка: {sortAscending ? "по возрастанию" : "по убыванию"}
          </button>
          <ol className="space-y-2 max-h-96 overflow-y-auto">{moves}</ol>
        </div>
      </div>
    </div>
  );
};

export default Game;