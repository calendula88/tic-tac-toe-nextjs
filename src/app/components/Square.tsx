import React from 'react';
import { SquareProps } from '../types/game';

const Square: React.FC<SquareProps> = ({ value, onSquareClick, isWinning }) => {
  return (
    <button 
      className={`
        w-20 h-20 
        flex items-center justify-center
        text-4xl font-bold 
        transition-all duration-200
        border border-gray-300
        ${isWinning 
          ? 'bg-green-200 border-green-600 shadow-lg scale-105' 
          : 'bg-white hover:bg-gray-50 active:bg-gray-100'
        }
        ${value ? 'text-gray-800' : 'text-transparent hover:text-gray-300'}
      `} 
      onClick={onSquareClick}
    >
      {value || '•'}
    </button>
  );
};

export default Square;