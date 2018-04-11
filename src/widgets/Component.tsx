// @flow
import * as React from 'react';

const noop = () => {};

class Component extends React.Component<any> {
  static defaultProps = {
    didMount: noop,
    didUpdate: noop,
    willUnmount: noop,
  };

  componentDidMount() {
    this.props.didMount();
  }

  componentDidUpdate(prevProps: {}) {
    this.props.didUpdate(prevProps);
  }

  componentWillUnmount() {
    this.props.willUnmount();
  }

  render() {
    return this.props.children;
  }
}

export default Component;
