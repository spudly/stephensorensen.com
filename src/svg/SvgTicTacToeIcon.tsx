import * as React from 'react';

const TicTacToeIcon = () => (
  <svg viewBox="0 0 32 32" className="tic-tac-toe-icon">
    <path className="tic-tac-toe-icon__grid" d="M 10 0 L 10 32" />
    <path className="tic-tac-toe-icon__grid" d="M 21 0 L 21 32" />
    <path className="tic-tac-toe-icon__grid" d="M 0 10 L 32 10" />
    <path className="tic-tac-toe-icon__grid" d="M 0 21 L 32 21" />
  </svg>
);

export default TicTacToeIcon;
