import React from 'react';

class Iterator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.count ? 0 : null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.count && nextProps.count) {
      this.setState({index: 0});
    } else if (this.props.count && !nextProps.count) {
      this.setState({index: null});
    }
  }

  render() {
    const {count} = this.props;
    const {index} = this.state;
    return this.props.children({
      index,
      prevIndex: this._getPrevIndex(),
      nextIndex: this._getNextIndex(),
      isFirst: count > 0 && index === 0,
      isLast: count > 0 && index === count - 1,
      next: this._handleNext,
      prev: this._handlePrev,
    });
  }

  _getPrevIndex() {
    const {index} = this.state;
    const {count, loop} = this.props;
    if (index === null) {
      return null;
    }
    if (index <= 0) {
      return loop ? count - 1 : null;
    }
    return index - 1;
  }

  _getNextIndex() {
    const {index} = this.state;
    const {count, loop} = this.props;
    if (index === null) {
      return null;
    }
    if (index >= count - 1) {
      return loop ? 0 : null;
    }
    return index + 1;
  }

  _handleNext = () => this.setState({index: this._getNextIndex()});

  _handlePrev = () => this.setState({index: this._getPrevIndex()});
}

export default Iterator;
