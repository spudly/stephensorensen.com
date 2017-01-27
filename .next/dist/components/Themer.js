'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('/home/ubuntu/workspace/spudly.github.io/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Themer = function (_React$Component) {
  (0, _inherits3.default)(Themer, _React$Component);

  function Themer(props) {
    (0, _classCallCheck3.default)(this, Themer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Themer.__proto__ || (0, _getPrototypeOf2.default)(Themer)).call(this, props));

    _this._injectTheme = function () {
      document.body.setAttribute('data-theme', _this.state.theme);
    };

    _this._handleChange = function (event) {
      localStorage.setItem('theme', event.target.value);
      _this.setState((0, _defineProperty3.default)({}, event.target.name, event.target.value));
    };

    _this.state = {
      theme: 'default'
    };
    return _this;
  }

  (0, _createClass3.default)(Themer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        theme: localStorage.getItem('theme') || 'default'
      }, this._injectTheme());
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._injectTheme();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'themer' },
        'Theme:',
        ' ',
        _react2.default.createElement(
          'select',
          {
            name: 'theme',
            onBlur: this._handleChange,
            onChange: this._handleChange,
            value: this.state.theme
          },
          _react2.default.createElement(
            'option',
            { value: 'default' },
            'Default'
          ),
          _react2.default.createElement(
            'option',
            { value: '90s' },
            '90s'
          )
        )
      );
    }
  }]);
  return Themer;
}(_react2.default.Component); /* global localStorage */

Themer.displayName = 'Themer';
exports.default = Themer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvVGhlbWVyLmpzIl0sIm5hbWVzIjpbIlRoZW1lciIsInByb3BzIiwiX2luamVjdFRoZW1lIiwiZG9jdW1lbnQiLCJib2R5Iiwic2V0QXR0cmlidXRlIiwic3RhdGUiLCJ0aGVtZSIsIl9oYW5kbGVDaGFuZ2UiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNldFN0YXRlIiwibmFtZSIsImdldEl0ZW0iLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7OztJQUVNQSxNOzs7QUFHSixrQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHNJQUNYQSxLQURXOztBQUFBLFVBaUJuQkMsWUFqQm1CLEdBaUJKLFlBQU07QUFDbkJDLGVBQVNDLElBQVQsQ0FBY0MsWUFBZCxDQUEyQixZQUEzQixFQUF5QyxNQUFLQyxLQUFMLENBQVdDLEtBQXBEO0FBQ0QsS0FuQmtCOztBQUFBLFVBcUJuQkMsYUFyQm1CLEdBcUJILGlCQUFTO0FBQ3ZCQyxtQkFBYUMsT0FBYixDQUFxQixPQUFyQixFQUE4QkMsTUFBTUMsTUFBTixDQUFhQyxLQUEzQztBQUNBLFlBQUtDLFFBQUwsbUNBQ0dILE1BQU1DLE1BQU4sQ0FBYUcsSUFEaEIsRUFDdUJKLE1BQU1DLE1BQU4sQ0FBYUMsS0FEcEM7QUFHRCxLQTFCa0I7O0FBRWpCLFVBQUtQLEtBQUwsR0FBYTtBQUNYQyxhQUFPO0FBREksS0FBYjtBQUZpQjtBQUtsQjs7Ozt3Q0FFbUI7QUFDbEIsV0FBS08sUUFBTCxDQUFjO0FBQ1pQLGVBQU9FLGFBQWFPLE9BQWIsQ0FBcUIsT0FBckIsS0FBaUM7QUFENUIsT0FBZCxFQUVHLEtBQUtkLFlBQUwsRUFGSDtBQUdEOzs7eUNBRW9CO0FBQ25CLFdBQUtBLFlBQUw7QUFDRDs7OzZCQWFRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFFBQWY7QUFBQTtBQUVHLFdBRkg7QUFHRTtBQUFBO0FBQUE7QUFDRSxrQkFBSyxPQURQO0FBRUUsb0JBQVEsS0FBS00sYUFGZjtBQUdFLHNCQUFVLEtBQUtBLGFBSGpCO0FBSUUsbUJBQU8sS0FBS0YsS0FBTCxDQUFXQztBQUpwQjtBQU1FO0FBQUE7QUFBQSxjQUFRLE9BQU0sU0FBZDtBQUFBO0FBQUEsV0FORjtBQU9FO0FBQUE7QUFBQSxjQUFRLE9BQU0sS0FBZDtBQUFBO0FBQUE7QUFQRjtBQUhGLE9BREY7QUFlRDs7O0VBL0NrQixnQkFBTVUsUyxHQUozQjs7QUFJTWpCLE0sQ0FDR2tCLFcsR0FBYyxRO2tCQWlEUmxCLE0iLCJmaWxlIjoiVGhlbWVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3VidW50dS93b3Jrc3BhY2Uvc3B1ZGx5LmdpdGh1Yi5pbyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBsb2NhbFN0b3JhZ2UgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVGhlbWVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ1RoZW1lcic7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRoZW1lOiAnZGVmYXVsdCcsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGhlbWU6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpIHx8ICdkZWZhdWx0JyxcbiAgICB9LCB0aGlzLl9pbmplY3RUaGVtZSgpKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl9pbmplY3RUaGVtZSgpO1xuICB9XG5cbiAgX2luamVjdFRoZW1lID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgdGhpcy5zdGF0ZS50aGVtZSk7XG4gIH1cblxuICBfaGFuZGxlQ2hhbmdlID0gZXZlbnQgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZScsIGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBbZXZlbnQudGFyZ2V0Lm5hbWVdOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRoZW1lclwiPlxuICAgICAgICBUaGVtZTpcbiAgICAgICAgeycgJ31cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIG5hbWU9XCJ0aGVtZVwiXG4gICAgICAgICAgb25CbHVyPXt0aGlzLl9oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS50aGVtZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJkZWZhdWx0XCI+RGVmYXVsdDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI5MHNcIj45MHM8L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRoZW1lcjtcbiJdfQ==