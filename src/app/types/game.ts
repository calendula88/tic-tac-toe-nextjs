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

export interface UseBoardReturn {
  squares: BoardState;
  handleClick: (index: number, xIsNext: boolean, onPlay: (squares: BoardState, moveIndex: number) => void) => void;
  calculateWinner: (squares: SquareValue[]) => WinnerResult;
  resetBoard: (newSquares?: BoardState) => void;
}

export interface UseGameReturn {
  history: GameHistory[];
  currentMove: number;
  sortAscending: boolean;
  xIsNext: boolean;
  currentSquares: BoardState;
  handlePlay: (nextSquares: BoardState, moveIndex: number) => void;
  jumpTo: (nextMove: number) => void;
  toggleSortOrder: () => void;
}