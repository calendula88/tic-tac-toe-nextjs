// types/game.ts
export type SquareValue = 'X' | 'O' | null;

export type BoardState = SquareValue[];

export interface GameHistory {
  squares: BoardState;
  moveLocation: string | null;
}

export interface WinnerResult {
  winner: SquareValue;
  winningLine: number[] | null;
}

export interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
  isWinning: boolean;
}

export interface BoardProps {
  xIsNext: boolean;
  squares: BoardState;
  onPlay: (nextSquares: BoardState, moveIndex: number) => void;
}

export interface GameProps {}