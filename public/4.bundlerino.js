webpackJsonp([4],{

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(5);

var CreatePoll = function (_React$Component) {
  _inherits(CreatePoll, _React$Component);

  function CreatePoll(props) {
    _classCallCheck(this, CreatePoll);

    var _this = _possibleConstructorReturn(this, (CreatePoll.__proto__ || Object.getPrototypeOf(CreatePoll)).call(this, props));

    _this.state = { value: '' };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    return _this;
  }

  _createClass(CreatePoll, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleAddOption',
    value: function handleAddOption(event) {
      React.createElement('input', []);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { method: 'post', action: '/create-poll' },
        React.createElement(
          'p',
          null,
          'Create A Poll'
        ),
        React.createElement(
          'button',
          { onClick: this.handleAddOption },
          'Add Option'
        ),
        React.createElement(
          'label',
          null,
          'Name: ',
          React.createElement('input', { type: 'text', name: 'poll[name]' })
        ),
        React.createElement(
          'label',
          null,
          'Option 1: ',
          React.createElement('input', { type: 'text', name: 'poll[option1]' })
        ),
        React.createElement(
          'label',
          null,
          'Option 2: ',
          React.createElement('input', { type: 'text', name: 'poll[option2]' })
        ),
        React.createElement('input', { type: 'submit', value: 'Submit' })
      );
    }
  }]);

  return CreatePoll;
}(React.Component);

module.exports = CreatePoll;

/***/ })

});