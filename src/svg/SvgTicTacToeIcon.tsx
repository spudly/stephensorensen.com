import * as React from 'react';

interface Props {
  size?: number;
}

const TicTacToeIcon = ({size = 32}: Props) => (
  <svg
    viewBox="0 0 32 32"
    className="svg-icon tic-tac-toe-icon"
    style={{width: size, height: size}}
  >
    <path className="tic-tac-toe-icon__grid" d="M 10 0 L 10 32" />
    <path className="tic-tac-toe-icon__grid" d="M 21 0 L 21 32" />
    <path className="tic-tac-toe-icon__grid" d="M 0 10 L 32 10" />
    <path className="tic-tac-toe-icon__grid" d="M 0 21 L 32 21" />
  </svg>
);

export default TicTacToeIcon;
