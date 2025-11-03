import React from 'react';
import { SquareProps } from '../types/game';

const Square: React.FC<SquareProps> = ({ value, onSquareClick, isWinning }) => {
  return (
    <button 
      className={`square ${isWinning ? 'winning-square' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;