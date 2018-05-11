import * as React from 'react';
import OsContext, {OsContextValues} from '../os/OsContext';
import Window from '../os/Window';
import JustifyIcon from './JustifyIcon';
import Menu from '../menubar/Menu';
import MenuItem from '../menubar/MenuItem';

interface Props {
  value?: string;
}

interface State {
  value: string;
}

class Editor extends React.Component<Props, State> {
  state: State = {value: this.props.value || ''};
  foreColor: HTMLInputElement | null = null;

  render() {
    const {
      state: {value},
    } = this;
    return (
      <div className="editor">
        <div className="toolbar">
          <select
            onChange={event => {
              document.execCommand('fontName', false, event.currentTarget.value);
            }}
          >
            <option>serif</option>
            <option>sand-serif</option>
            <option>monospace</option>
          </select>
          <select
            onChange={event =>
              document.execCommand('fontSize', false, Number(event.currentTarget.value))
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>

          <div className="toolbar__spacer" />

          <button type="button" onClick={() => document.execCommand('bold')}>
            <strong>b</strong>
          </button>
          <button type="button" onClick={() => document.execCommand('italic')}>
            <em>i</em>
          </button>
          <button type="button" onClick={() => document.execCommand('underline')}>
            <span style={{textDecoration: 'underline'}}>u</span>
          </button>
          <input
            type="color"
            ref={el => (this.foreColor = el)}
            onChange={event => document.execCommand('foreColor', false, event.currentTarget.value)}
            hidden
          />
          <button
            type="button"
            onClick={() => {
              if (this.foreColor) {
                this.foreColor.click();
              }
            }}
          >
            <span style={{color: '#f00'}}>a</span>
          </button>

          <div className="toolbar__spacer" />

          <button type="button" onClick={() => document.execCommand('justifyLeft')}>
            <JustifyIcon justify="left" />
          </button>
          <button type="button" onClick={() => document.execCommand('justifyCenter')}>
            <JustifyIcon justify="center" />
          </button>
          <button type="button" onClick={() => document.execCommand('justifyRight')}>
            <JustifyIcon justify="right" />
          </button>
          <button type="button" onClick={() => document.execCommand('justifyFull')}>
            <JustifyIcon justify="full" />
          </button>
        </div>
        <div
          className="editor__content"
          contentEditable
          dangerouslySetInnerHTML={{__html: this.props.value || ''}}
          onInput={e => {
            this.setState({value: e.currentTarget.innerHTML});
          }}
        />
      </div>
    );
  }
}

interface EditorProcessProps {
  id: string;
}

const EditorProcess = ({id}: EditorProcessProps) => (
  <OsContext.Consumer>
    {({killProcess}: OsContextValues) => (
      <React.Fragment>
        <Window title="Editor" close={() => killProcess(id)}>
          <React.Fragment>
            <Menu horizontal>
              <MenuItem label="File">
                <Menu dropdown>
                  <MenuItem label="Exit" onSelect={() => killProcess(id)} />
                </Menu>
              </MenuItem>
            </Menu>
            <Editor />
          </React.Fragment>
        </Window>
      </React.Fragment>
    )}
  </OsContext.Consumer>
);

export default EditorProcess;
