"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("/home/ubuntu/workspace/spudly.github.io/node_modules/babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("/home/ubuntu/workspace/spudly.github.io/node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _document = require("/home/ubuntu/workspace/spudly.github.io/node_modules/next/dist/server/document.js");

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// GOTCHA: next.js requires this to be a class :(
var MyDocument = function (_Document) {
  (0, _inherits3.default)(MyDocument, _Document);

  function MyDocument() {
    (0, _classCallCheck3.default)(this, MyDocument);
    return (0, _possibleConstructorReturn3.default)(this, (MyDocument.__proto__ || (0, _getPrototypeOf2.default)(MyDocument)).apply(this, arguments));
  }

  (0, _createClass3.default)(MyDocument, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "html",
        null,
        _react2.default.createElement(
          _document.Head,
          null,
          _react2.default.createElement("link", { rel: "stylesheet", href: "/static/styles/index.css" }),
          _react2.default.createElement("link", { rel: "stylesheet", href: "/static/styles/themes/default/index.css" }),
          _react2.default.createElement("link", { rel: "stylesheet", href: "/static/styles/themes/90s/index.css" })
        ),
        _react2.default.createElement(
          "body",
          null,
          _react2.default.createElement(_document.Main, null),
          _react2.default.createElement(_document.NextScript, null)
        )
      );
    }
  }]);
  return MyDocument;
}(_document2.default);

exports.default = MyDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL19kb2N1bWVudC5qcz9lbnRyeSJdLCJuYW1lcyI6WyJNeURvY3VtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7SUFDTUEsVTs7Ozs7Ozs7Ozs2QkFDTTtBQUNSLGFBQ0M7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0Msa0RBQU0sS0FBSSxZQUFWLEVBQXVCLE1BQUssMEJBQTVCLEdBREQ7QUFFQyxrREFBTSxLQUFJLFlBQVYsRUFBdUIsTUFBSyx5Q0FBNUIsR0FGRDtBQUdDLGtEQUFNLEtBQUksWUFBVixFQUF1QixNQUFLLHFDQUE1QjtBQUhELFNBREY7QUFNRTtBQUFBO0FBQUE7QUFDRSw2REFERjtBQUVFO0FBRkY7QUFORixPQUREO0FBYUQ7Ozs7O2tCQUdZQSxVIiwiZmlsZSI6Il9kb2N1bWVudC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvaG9tZS91YnVudHUvd29ya3NwYWNlL3NwdWRseS5naXRodWIuaW8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRG9jdW1lbnQsIHtIZWFkLCBNYWluLCBOZXh0U2NyaXB0fSBmcm9tICduZXh0L2RvY3VtZW50J1xuXG4vLyBHT1RDSEE6IG5leHQuanMgcmVxdWlyZXMgdGhpcyB0byBiZSBhIGNsYXNzIDooXG5jbGFzcyBNeURvY3VtZW50IGV4dGVuZHMgRG9jdW1lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgIDxodG1sPlxuICAgICAgIDxIZWFkPlxuICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9zdGF0aWMvc3R5bGVzL2luZGV4LmNzc1wiIC8+XG4gICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL3N0YXRpYy9zdHlsZXMvdGhlbWVzL2RlZmF1bHQvaW5kZXguY3NzXCIgLz5cbiAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvc3RhdGljL3N0eWxlcy90aGVtZXMvOTBzL2luZGV4LmNzc1wiIC8+XG4gICAgICAgPC9IZWFkPlxuICAgICAgIDxib2R5PlxuICAgICAgICAgPE1haW4gLz5cbiAgICAgICAgIDxOZXh0U2NyaXB0IC8+XG4gICAgICAgPC9ib2R5PlxuICAgICA8L2h0bWw+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15RG9jdW1lbnQ7Il19