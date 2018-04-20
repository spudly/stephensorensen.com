import * as React from 'react';
import OsContext, {OsContextValues} from '../OsContext';
import Window from '../widgets/Window';
import TicTacToeIcon from '../svg/SvgTicTacToeIcon';

const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;

const memoize = <P, R>(fn: (...args: Array<P>) => R): ((...args: Array<P>) => R) => {
  const cache = new Map();
  return (...args: Array<P>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result: R = fn(...args);
    cache.set(key, result);
    return result;
  };
};

interface Point {
  x: number;
  y: number;
}
type Direction = 'LEFT' | 'UP' | 'DOWN' | 'RIGHT';

const point = memoize((x: number, y: number): Point => ({x, y}));

interface Props {
  width?: number;
  height?: number;
  size?: number;
}

interface DefaultProps {
  width: number;
  height: number;
  size: number;
}

interface State {
  isDead: boolean;
  tail: Array<Point>;
  position: Point;
  direction: Direction;
}

class Nibbles extends React.Component<Props, State> {
  static defaultProps: DefaultProps = {
    width: 500,
    height: 300,
    size: 20,
  };

  state: State = {
    tail: [point(0, 0)],
    position: {x: 0, y: 0},
    direction: 'RIGHT',
    isDead: false,
  };

  intervalId: NodeJS.Timer | null = null;

  canvas: HTMLCanvasElement | null = null;

  ctx: CanvasRenderingContext2D | null = null;

  componentDidMount() {
    this.intervalId = setInterval(this._move, 500);
    this._draw();
    if (!this.canvas) {
      throw new Error('No Canvas!?');
    }
    this.canvas.focus();
  }

  componentDidUpdate() {
    this._draw();
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const {props: {width, height}, state: {isDead}} = this;
    return (
      <div>
        <canvas
          tabIndex={1}
          width={width}
          height={height}
          ref={this._handleRef}
          onKeyDown={this._handleKeyDown}
        />
        {isDead && `You're dead!`}
      </div>
    );
  }

  _handleRef = (el: HTMLCanvasElement | null) => {
    this.canvas = el;
    this.ctx = el ? el.getContext('2d') : null;
  };

  _draw = () => {
    const {ctx, state: {tail}} = this;
    const {size, width, height} = this.props as Props & DefaultProps;

    if (!ctx) {
      throw new Error('No Canvas Context!?');
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    tail.forEach(({x, y}) => {
      ctx.fillStyle = 'green';
      ctx.fillRect(x * size, y * size, size, size);
    });
  };

  _move = () => {
    const {width, height, size} = this.props as Props & DefaultProps;
    this.setState(({tail, direction}: State) => {
      const {x, y} = tail[tail.length - 1];
      let nextPosition;
      switch (direction) {
        case 'UP':
          nextPosition = point(x, y - 1);
          break;
        case 'DOWN':
          nextPosition = point(x, y + 1);
          break;
        case 'LEFT':
          nextPosition = point(x - 1, y);
          break;
        case 'RIGHT':
          nextPosition = point(x + 1, y);
          break;
        default:
          throw new Error(`Unexpected direction: ${direction}`);
      }

      if (
        nextPosition.x < 0 ||
        nextPosition.x >= width / size ||
        nextPosition.y < 0 ||
        nextPosition.y >= height / size ||
        tail.includes(nextPosition)
      ) {
        if (!this.intervalId) {
          throw new Error('No Interval Id!?');
        }
        clearInterval(this.intervalId);
        return {tail, isDead: true};
      }

      return {tail: [...tail, nextPosition], isDead: false};
    });
  };

  _handleKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    let direction: Direction | undefined;
    switch (e.which) {
      case UP:
        e.preventDefault();
        direction = 'UP';
        break;
      case DOWN:
        e.preventDefault();
        direction = 'DOWN';
        break;
      case LEFT:
        e.preventDefault();
        direction = 'LEFT';
        break;
      case RIGHT:
        e.preventDefault();
        direction = 'RIGHT';
        break;
      default:
        return;
    }
    if (direction) {
      this.setState({direction});
    }
  };
}

const NibblesProcess = ({id}: {id: string}) => (
  <OsContext.Consumer>
    {({killProcess}: OsContextValues) => (
      <Window title="Nibbles" close={() => killProcess(id)} icon={TicTacToeIcon}>
        <Nibbles size={20} />
      </Window>
    )}
  </OsContext.Consumer>
);

export default NibblesProcess;
