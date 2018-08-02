'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * PickerField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author longyan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var alphabet = _utils2.default.alphabet.split('');

var GroupingBar = function (_React$Component) {
  _inherits(GroupingBar, _React$Component);

  function GroupingBar(props) {
    _classCallCheck(this, GroupingBar);

    var _this = _possibleConstructorReturn(this, (GroupingBar.__proto__ || Object.getPrototypeOf(GroupingBar)).call(this, props));

    _this.state = {
      holding: null,
      indicatorPos: 0
    };
    return _this;
  }

  _createClass(GroupingBar, [{
    key: 'hold',
    value: function hold(e) {
      var t = this;
      var clientX = _utils2.default.getPageSize().width - 10;
      var clientY = e.touches[0].clientY;

      var target = document.elementFromPoint(clientX, clientY);
      var key = target && target.getAttribute('data-key');

      e.preventDefault();
      if (t.state.key !== key) {
        t.setState({
          holding: key,
          indicatorPos: target.offsetTop
        });
        this.props.onSelect(key);
      }
    }
  }, {
    key: 'release',
    value: function release() {
      var t = this;
      t.setState({
        holding: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      return _react2.default.createElement(
        'div',
        {
          className: _Context2.default.prefixClass('picker-field-grouping-bar'),
          onTouchStart: t.hold.bind(t),
          onTouchMove: t.hold.bind(t),
          onTouchEnd: t.release.bind(t),
          onTouchCancel: t.release.bind(t),
          onContextMenu: function onContextMenu(e) {
            return e.preventDefault();
          }
        },
        alphabet.map(function (key) {
          return _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)(_Context2.default.prefixClass('picker-field-group'), t.props.keys.indexOf(key) > -1 ? _Context2.default.prefixClass('picker-field-avilible-group') : null, t.state.holding === key ? _Context2.default.prefixClass('picker-field-active-group') : null),
              key: key,
              'data-key': key
            },
            key
          );
        }),
        t.props.indicator ? _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(_Context2.default.prefixClass('picker-field-grouping-indicator'), t.state.holding ? null : _Context2.default.prefixClass('picker-field-grouping-indicator-hide'), t.props.keys.indexOf(t.state.holding) > -1 ? _Context2.default.prefixClass('picker-field-avilible-group') : null),
            style: { transform: 'translateY(' + t.state.indicatorPos + 'px)', WebkitTransform: 'translateY(' + t.state.indicatorPos + 'px)' }
          },
          t.state.holding
        ) : null
      );
    }
  }]);

  return GroupingBar;
}(_react2.default.Component);

GroupingBar.defaultProps = {
  keys: [],
  onSelect: function onSelect() {},

  indicator: undefined
};

// http://facebook.github.io/react/docs/reusable-components.html
GroupingBar.propTypes = {
  keys: _propTypes2.default.array,
  indicator: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func
};

GroupingBar.displayName = 'GroupingBar';

exports.default = GroupingBar;
module.exports = exports['default'];