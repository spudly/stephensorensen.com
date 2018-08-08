import preact from '/preact.js';
const {h, Component} = preact;

const bin = {
  help: (...argv) =>
    "Help isn't ready yet. In the meantime, call 911 if you have a medical emergency.",
};

const welcome = `
#######################################################
# stephensorensen.com                                 #
#######################################################
`;

class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: welcome,
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return h('div', {className: 'terminal', onClick: () => this.input.focus()}, [
      h('pre', {className: 'terminal--output'}, this.state.output),
      h('div', {className: 'terminal--prompt'}, '> '),
      h('input', {
        ref: el => (this.input = el),
        className: 'terminal--input',
        value: this.state.input || '',
        onBlur: () => this.input.focus(),
        onInput: e => this.setState({input: e.currentTarget.value}),
        onKeyDown: e => {
          if (e.which === 13) {
            console.log(this.state);
            const argv = this.state.input.split(' ');
            console.log('argv:', argv);
            const [cmd] = argv;
            const fn = bin[cmd];
            const out = fn ? fn(...argv) : `${cmd}: command not found`;
            this.setState(state => ({input: '', output: state.output + '\n' + out}));
          }
        },
      }),
    ]);
  }
}

export default Terminal;
