'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AngleLeft = require('salt-icon/lib/AngleLeft');

var _AngleLeft2 = _interopRequireDefault(_AngleLeft);

var _Context = require('../Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NavBar Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author ruiyang.dry
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NavBar = function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar(props) {
    _classCallCheck(this, NavBar);

    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

    _this.state = {
      isShow: _this.props.isShow
    };
    return _this;
  }

  _createClass(NavBar, [{
    key: 'handleBackClick',
    value: function handleBackClick() {
      this.props.onLeftClick();
    }
  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick() {
      this.props.onRightClick();
    }
  }, {
    key: 'handleCloseView',
    value: function handleCloseView() {
      this.props.closeViewClick();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(c) {
            _this2.root = c;
          },
          className: (0, _classnames3.default)((0, _Context.prefixClass)('nav-bar'), _defineProperty({}, t.props.className, !!t.props.className))
        },
        _react2.default.createElement(
          'div',
          { className: (0, _Context.prefixClass)('nav-bar-left FAL') },
          _react2.default.createElement(
            'div',
            { className: (0, _Context.prefixClass)('nav-bar-left-option'), onClick: this.handleBackClick.bind(this) },
            _react2.default.createElement(_AngleLeft2.default, { className: (0, _Context.prefixClass)('nav-bar-arrow-left') }),
            _react2.default.createElement(
              'span',
              null,
              '\u8FD4\u56DE'
            )
          ),
          this.state.isShow ? _react2.default.createElement(
            'span',
            {
              className: (0, _Context.prefixClass)('nav-bar-close'),
              onClick: this.handleCloseView.bind(this)
            },
            '\u5173\u95ED'
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _Context.prefixClass)('nav-bar-center nav-bar-center-text omit3 FAC') },
          this.props.title
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _Context.prefixClass)('nav-bar-right FAR'), onClick: this.handleOptionClick.bind(this) },
          _react2.default.createElement(
            'span',
            { className: (0, _Context.prefixClass)('nav-bar-right-text') },
            this.props.rightText
          )
        )
      );
    }
  }]);

  return NavBar;
}(_react2.default.Component);

NavBar.defaultProps = {
  className: '',
  title: '',
  rightText: '更多',
  isShow: true,
  onLeftClick: function onLeftClick() {},
  onRightClick: function onRightClick() {},
  closeViewClick: function closeViewClick() {}
};

// http://facebook.github.io/react/docs/reusable-components.html
NavBar.propTypes = {
  className: _propTypes2.default.string,
  title: _propTypes2.default.string,
  rightText: _propTypes2.default.string,
  onLeftClick: _propTypes2.default.func,
  onRightClick: _propTypes2.default.func,
  closeViewClick: _propTypes2.default.func,
  isShow: _propTypes2.default.bool
};

NavBar.displayName = 'NavBar';

exports.default = NavBar;
module.exports = exports['default'];