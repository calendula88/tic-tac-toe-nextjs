import { useCallback } from 'react';
import { SquareValue, WinnerResult } from '../types/game';

export function useBoard() {
  const calculateWinner = useCallback((squares: SquareValue[]): WinnerResult => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { 
          winner: squares[a], 
          winningLine: [a, b, c] 
        };
      }
    }
    return { winner: null, winningLine: null };
  }, []);

  const handleClick = useCallback((
    index: number, 
    squares: SquareValue[], 
    xIsNext: boolean, 
    onPlay: (nextSquares: SquareValue[], moveIndex: number) => void
  ) => {
    if (calculateWinner(squares).winner || squares[index]) {
      return;
    }
    
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares, index);
  }, [calculateWinner]);

  return {
    calculateWinner,
    handleClick
  };
}