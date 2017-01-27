'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _style = require('/home/ubuntu/workspace/spudly.github.io/node_modules/styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('/home/ubuntu/workspace/spudly.github.io/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _head = require('/home/ubuntu/workspace/spudly.github.io/node_modules/next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = function (_React$Component) {
  (0, _inherits3.default)(Error, _React$Component);

  function Error() {
    (0, _classCallCheck3.default)(this, Error);
    return (0, _possibleConstructorReturn3.default)(this, (Error.__proto__ || (0, _getPrototypeOf2.default)(Error)).apply(this, arguments));
  }

  (0, _createClass3.default)(Error, [{
    key: 'render',
    value: function render() {
      var statusCode = this.props.statusCode;

      var title = statusCode === 404 ? 'This page could not be found' : statusCode ? 'Internal Server Error' : 'An unexpected error has occurred';

      return _react2.default.createElement(
        'div',
        { className: 'error', 'data-jsx': 676398231
        },
        _react2.default.createElement(
          _head2.default,
          null,
          _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0', 'data-jsx': 676398231
          })
        ),
        _react2.default.createElement(
          'div',
          {
            'data-jsx': 676398231
          },
          statusCode ? _react2.default.createElement(
            'h1',
            {
              'data-jsx': 676398231
            },
            statusCode
          ) : null,
          _react2.default.createElement(
            'div',
            { className: 'desc', 'data-jsx': 676398231
            },
            _react2.default.createElement(
              'h2',
              {
                'data-jsx': 676398231
              },
              title,
              '.'
            )
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: 3608526279,
          css: '\n        body { margin: 0 }\n      '
        }),
        _react2.default.createElement(_style2.default, {
          styleId: 965400277,
          css: '.error[data-jsx="676398231"] {color: #000;background: #fff;font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;height: 100vh;text-align: center;display:-webkit-flex; display:flex;-webkit-flex-direction: column;-moz-flex-direction: column;flex-direction: column;align-items: center;justify-content: center;}.desc[data-jsx="676398231"] {display: inline-block;text-align: left;line-height: 49px;height: 49px;vertical-align: middle;}h1[data-jsx="676398231"] {display: inline-block;border-right: 1px solid rgba(0, 0, 0,.3);margin: 0;margin-right: 20px;padding: 10px 23px 10px 0;font-size: 24px;font-weight: 500;vertical-align: top;}h2[data-jsx="676398231"] {font-size: 14px;font-weight: normal;margin: 0;padding: 0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvcGFnZXMvX2Vycm9yLmpzP2VudHJ5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCa0IsQUFDRiw4QkFDTSxZQUNLLGlCQUNzSCx1SUFDekgsY0FDSyxtQkFDTCxtQ0FDUyxrRkFDSCxvQkFDSSx3QkFDekIsQ0FFTSw2QkFDaUIsc0JBQ0wsaUJBQ0Msa0JBQ0wsYUFDVSx1QkFDeEIsQ0FFRywwQkFDb0Isc0JBQ21CLHlDQUMvQixVQUNTLG1CQUNPLDBCQUNWLGdCQUNDLGlCQUNHLG9CQUNyQixDQUVHLDBCQUNjLGdCQUNJLG9CQUNWLFVBQ0MsV0FDWiIsImZpbGUiOiJub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19lcnJvci5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvaG9tZS91YnVudHUvd29ya3NwYWNlL3NwdWRseS5naXRodWIuaW8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldEluaXRpYWxQcm9wcyAoeyByZXMsIHhociB9KSB7XG4gICAgY29uc3Qgc3RhdHVzQ29kZSA9IHJlcyA/IHJlcy5zdGF0dXNDb2RlIDogKHhociA/IHhoci5zdGF0dXMgOiBudWxsKVxuICAgIHJldHVybiB7IHN0YXR1c0NvZGUgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB0aXRsZSA9IHN0YXR1c0NvZGUgPT09IDQwNFxuICAgICAgPyAnVGhpcyBwYWdlIGNvdWxkIG5vdCBiZSBmb3VuZCdcbiAgICAgIDogKHN0YXR1c0NvZGUgPyAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyA6ICdBbiB1bmV4cGVjdGVkIGVycm9yIGhhcyBvY2N1cnJlZCcpXG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2Vycm9yJz5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8bWV0YSBuYW1lPSd2aWV3cG9ydCcgY29udGVudD0nd2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCcgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxkaXY+XG4gICAgICAgIHtzdGF0dXNDb2RlID8gPGgxPntzdGF0dXNDb2RlfTwvaDE+IDogbnVsbH1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Rlc2MnPlxuICAgICAgICAgIDxoMj57dGl0bGV9LjwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICBib2R5IHsgbWFyZ2luOiAwIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmVycm9yIHtcbiAgICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFJvYm90bywgXCJTZWdvZSBVSVwiLCBcIkZpcmEgU2Fuc1wiLCBBdmVuaXIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJMdWNpZGEgR3JhbmRlXCIsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuZGVzYyB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDQ5cHg7XG4gICAgICAgICAgaGVpZ2h0OiA0OXB4O1xuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIH1cblxuICAgICAgICBoMSB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwuMyk7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICAgICAgICBwYWRkaW5nOiAxMHB4IDIzcHggMTBweCAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgIH1cblxuICAgICAgICBoMiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgfVxufVxuIl19 */\n/*@ sourceURL=node_modules/next/dist/pages/_error.js?entry */'
        })
      );
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var res = _ref.res,
          xhr = _ref.xhr;

      var statusCode = res ? res.statusCode : xhr ? xhr.status : null;
      return { statusCode: statusCode };
    }
  }]);
  return Error;
}(_react2.default.Component);

exports.default = Error;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvcGFnZXMvX2Vycm9yLmpzP2VudHJ5Il0sIm5hbWVzIjpbIkVycm9yIiwic3RhdHVzQ29kZSIsInByb3BzIiwidGl0bGUiLCJyZXMiLCJ4aHIiLCJzdGF0dXMiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs2QkFNVDtBQUFBLFVBQ0FDLFVBREEsR0FDZSxLQUFLQyxLQURwQixDQUNBRCxVQURBOztBQUVSLFVBQU1FLFFBQVFGLGVBQWUsR0FBZixHQUNWLDhCQURVLEdBRVRBLGFBQWEsdUJBQWIsR0FBdUMsa0NBRjVDOztBQUlBLGFBQU87QUFBQTtBQUFBLFVBQUssV0FBVSxPQUFmO0FBQUE7QUFDTDtBQUFBO0FBQUE7QUFDRSxrREFBTSxNQUFLLFVBQVgsRUFBc0IsU0FBUSx1Q0FBOUI7QUFBQTtBQURGLFNBREs7QUFJTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0dBLHVCQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBS0E7QUFBTCxXQUFiLEdBQXFDLElBRHhDO0FBRUU7QUFBQTtBQUFBLGNBQUssV0FBVSxNQUFmO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUtFLG1CQUFMO0FBQUE7QUFBQTtBQURGO0FBRkYsU0FKSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFQO0FBcUREOzs7MENBaEVxQztBQUFBLFVBQVpDLEdBQVksUUFBWkEsR0FBWTtBQUFBLFVBQVBDLEdBQU8sUUFBUEEsR0FBTzs7QUFDcEMsVUFBTUosYUFBYUcsTUFBTUEsSUFBSUgsVUFBVixHQUF3QkksTUFBTUEsSUFBSUMsTUFBVixHQUFtQixJQUE5RDtBQUNBLGFBQU8sRUFBRUwsc0JBQUYsRUFBUDtBQUNEOzs7RUFKZ0MsZ0JBQU1NLFM7O2tCQUFwQlAsSyIsImZpbGUiOiJfZXJyb3IuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcHVkbHkuZ2l0aHViLmlvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcnJvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXRJbml0aWFsUHJvcHMgKHsgcmVzLCB4aHIgfSkge1xuICAgIGNvbnN0IHN0YXR1c0NvZGUgPSByZXMgPyByZXMuc3RhdHVzQ29kZSA6ICh4aHIgPyB4aHIuc3RhdHVzIDogbnVsbClcbiAgICByZXR1cm4geyBzdGF0dXNDb2RlIH1cbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdGF0dXNDb2RlIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgdGl0bGUgPSBzdGF0dXNDb2RlID09PSA0MDRcbiAgICAgID8gJ1RoaXMgcGFnZSBjb3VsZCBub3QgYmUgZm91bmQnXG4gICAgICA6IChzdGF0dXNDb2RlID8gJ0ludGVybmFsIFNlcnZlciBFcnJvcicgOiAnQW4gdW5leHBlY3RlZCBlcnJvciBoYXMgb2NjdXJyZWQnKVxuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdlcnJvcic+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPG1ldGEgbmFtZT0ndmlld3BvcnQnIGNvbnRlbnQ9J3dpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAnIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8ZGl2PlxuICAgICAgICB7c3RhdHVzQ29kZSA/IDxoMT57c3RhdHVzQ29kZX08L2gxPiA6IG51bGx9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkZXNjJz5cbiAgICAgICAgICA8aDI+e3RpdGxlfS48L2gyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgYm9keSB7IG1hcmdpbjogMCB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5lcnJvciB7XG4gICAgICAgICAgY29sb3I6ICMwMDA7XG4gICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBSb2JvdG8sIFwiU2Vnb2UgVUlcIiwgXCJGaXJhIFNhbnNcIiwgQXZlbmlyLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiTHVjaWRhIEdyYW5kZVwiLCBzYW5zLXNlcmlmO1xuICAgICAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmRlc2Mge1xuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiA0OXB4O1xuICAgICAgICAgIGhlaWdodDogNDlweDtcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaDEge1xuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsLjMpO1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gICAgICAgICAgcGFkZGluZzogMTBweCAyM3B4IDEwcHggMDtcbiAgICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgaDIge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgPC9kaXY+XG4gIH1cbn1cbiJdfQ==