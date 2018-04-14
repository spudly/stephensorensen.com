// @flow
import * as React from 'react';
import {assocPath} from 'ramda';
import Window from '../widgets/Window';
import OsContext, {OsContextValues} from '../OsContext';
import TicTacToeIcon from '../svg/SvgTicTacToeIcon';

export const PLAYER_X = 1;
export const PLAYER_O = -1;

const Center = ({children, style}: {children: React.ReactNode; style: Object}) => (
  <div style={Object.assign({}, style, {display: 'grid', placeItems: 'center'})}>{children}</div>
);

type Props = {
  width?: number;
  height?: number;
};

type BoardValue = -1 | 0 | 1;
type BoardRow = [BoardValue, BoardValue, BoardValue];
type Board = [BoardRow, BoardRow, BoardRow];

type State = {
  board: Board;
  player: -1 | 1;
  winner: -1 | 1 | null;
  blackout: boolean;
};

class TicTacToe extends React.Component<Props, State> {
  state = this._getInitialState();

  render() {
    const {props: {width: _width, height}, state: {board, winner, blackout}} = this;
    const widthAndHeight = Math.min(_width || 300, height || 300);
    return (
      <Center
        style={{
          fontSize: `${widthAndHeight / 5}px`,
          fontFamily: 'sans-serif',
        }}
      >
        {(winner || blackout) && (
          <Center style={{height: widthAndHeight}}>
            {winner ? `Winner: ${winner === PLAYER_X ? 'X' : 'O'}` : 'Blackout'}
            <button style={{fontSize: '.5em'}} onClick={this._reset}>
              Play Again
            </button>
          </Center>
        )}
        {!winner &&
          !blackout && (
            <div
              style={{
                width: widthAndHeight,
                height: widthAndHeight,
                display: 'grid',
                gridTemplateRows: '1fr '.repeat(3).trim(),
                gridTemplateColumns: '1fr '.repeat(3).trim(),
                fontSize: `${widthAndHeight / 5}px`,
                fontFamily: 'sans-serif',
              }}
            >
              {this.state.board.map((row, i) =>
                row.map((value, j) => (
                  /* eslint-disable react/no-array-index-key */
                  <div
                    key={`${i};${j}`}
                    style={{
                      border: '1px solid black',
                      borderWidth: this._getBorderWidth(i, j, 5),
                      cursor: board[i][j] ? 'default' : 'pointer',
                      display: 'grid',
                      justifyItems: 'center',
                      alignItems: 'center',
                    }}
                    onClick={this._handleRegionClick(i, j)}
                  >
                    {value === PLAYER_X ? 'x' : value === PLAYER_O ? 'o' : null}
                  </div>
                  /* eslint-enable react/no-array-index-key */
                ))
              )}
            </div>
          )}
      </Center>
    );
  }

  _getBorderWidth(rowIndex: number, colIndex: number, lineWidth: number): string {
    const top = 0;
    const bottom = rowIndex < 2 ? lineWidth : 0;
    const left = 0;
    const right = colIndex < 2 ? lineWidth : 0;
    return `${top}px ${right}px ${bottom}px ${left}px`;
  }

  _handleRegionClick = (rowIndex: number, colIndex: number) => () => {
    const {state: {board, player}} = this;
    if (board[rowIndex][colIndex] !== 0) {
      return;
    }

    const newBoard = assocPath([rowIndex, colIndex], player, board);
    const winner = this._findWinner(newBoard);
    const blackout = newBoard.every((row: BoardRow) => row.every(value => value !== 0));
    this.setState({
      board: newBoard,
      player: player === PLAYER_X ? PLAYER_O : PLAYER_X,
      winner,
      blackout,
    });
  };

  _reset = () => {
    this.setState(this._getInitialState());
  };

  _getInitialState(): State {
    return {
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      player: PLAYER_X,
      winner: null,
      blackout: false,
    };
  }

  _findWinner(rows: Board) {
    const sums = Array(8).fill(0);
    rows.forEach((row, rowIndex) =>
      row.forEach((value, colIndex) => {
        sums[rowIndex] += value;
        sums[3 + colIndex] += value;
        if (rowIndex === colIndex) {
          sums[6] += value;
        }
        if (rowIndex + colIndex === 3 - 1) {
          sums[7] += value;
        }
      })
    );
    if (sums.includes(3)) {
      return PLAYER_X;
    }
    if (sums.includes(-3)) {
      return PLAYER_O;
    }
    return null;
  }
}

const TicTacToeProcess = ({id}: {id: string}) => (
  <OsContext.Consumer>
    {({killProcess}: OsContextValues) => (
      <Window title="Tic Tac Toe" close={() => killProcess(id)} icon={TicTacToeIcon}>
        <div style={{padding: 10}}>
          <TicTacToe />
        </div>
      </Window>
    )}
  </OsContext.Consumer>
);

export default TicTacToeProcess;
