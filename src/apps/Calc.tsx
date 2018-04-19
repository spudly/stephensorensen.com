// @flow
import * as React from 'react';
import Window from '../widgets/Window';
import OsContext, {OsContextValues} from '../OsContext';
import calc from './calc';

interface Props {}

interface State {
  value: string;
}

class Calc extends React.Component<Props, State> {
  state: State = {
    value: '',
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
          height: '100%',
        }}
      >
        <input
          type="text"
          value={this.state.value}
          style={{
            gridColumnStart: 'span 3',
          }}
          onChange={e => this.setState({value: e.currentTarget.value})}
        />
        <button
          type="button"
          onClick={() =>
            this.setState({
              value: this.state.value.slice(0, this.state.value.length - 1),
            })
          }
        >
          &#x2190;
        </button>
        <button type="button" onClick={this._type('7')}>
          7
        </button>
        <button type="button" onClick={this._type('8')}>
          8
        </button>
        <button type="button" onClick={this._type('9')}>
          9
        </button>
        <button type="button" onClick={this._type('/')}>
          &divide;
        </button>
        <button type="button" onClick={this._type('4')}>
          4
        </button>
        <button type="button" onClick={this._type('5')}>
          5
        </button>
        <button type="button" onClick={this._type('6')}>
          6
        </button>
        <button type="button" onClick={this._type('*')}>
          &times;
        </button>
        <button type="button" onClick={this._type('1')}>
          1
        </button>
        <button type="button" onClick={this._type('2')}>
          2
        </button>
        <button type="button" onClick={this._type('3')}>
          3
        </button>
        <button type="button" onClick={this._type('-')}>
          -
        </button>
        <button type="button" onClick={this._type('.')}>
          .
        </button>
        <button type="button" onClick={this._type('0')}>
          0
        </button>
        <button
          type="button"
          onClick={() => {
            console.log(`${this.state.value} => ${calc(this.state.value)}`);
            this.setState({value: String(calc(this.state.value))});
          }}
        >
          =
        </button>
        <button type="button" onClick={this._type('+')}>
          +
        </button>
      </div>
    );
  }

  _type = (char: string) => () => {
    this.setState({value: `${this.state.value}${char}`});
  };
}

const CalcProcess = ({id}: {id: string}) => (
  <OsContext.Consumer>
    {({killProcess}: OsContextValues) => (
      <Window title="Calculator" close={() => killProcess(id)}>
        <Calc />
      </Window>
    )}
  </OsContext.Consumer>
);

export default CalcProcess;
