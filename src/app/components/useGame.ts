import { useState, useCallback } from 'react';

export const useGame = () => {
  const [history, setHistory] = useState<{ squares: ('X' | 'O' | null)[], moveLocation: string | null }[]>([{ 
    squares: Array(9).fill(null), 
    moveLocation: null 
  }]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  const handlePlay = useCallback((nextSquares: ('X' | 'O' | null)[], moveIndex: number) => {
    const row = Math.floor(moveIndex / 3) + 1;
    const col = (moveIndex % 3) + 1;
    const nextHistory = [
      ...history.slice(0, currentMove + 1), 
      { 
        squares: nextSquares, 
        moveLocation: `(${row}, ${col})` 
      }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }, [history, currentMove]);

  const jumpTo = useCallback((nextMove: number) => {
    setCurrentMove(nextMove);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortAscending(prev => !prev);
  }, []);

  return {
    history,
    currentMove,
    sortAscending,
    xIsNext,
    currentSquares,
    handlePlay,
    jumpTo,
    toggleSortOrder
  };
};