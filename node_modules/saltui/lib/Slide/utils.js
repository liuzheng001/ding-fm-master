'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OFFSET = 'offset';

var prefixClass = function prefixClass(name) {
  if (_Context2.default.prefixClass) {
    return _Context2.default.prefixClass(name);
  }
  return 't-' + name;
};

/**
* 将指定的item切换到不可移动状态，即不参与切换行为。
* @param {element} item 要改变状态的item
* @note 这个函数虽然含义上和_setItemReady对应，但参数直接只用item，
*  是出于性能考虑，因为调用该函数的时候，都是明确知道目标item的。
*/
/* eslint-disable no-param-reassign */
// DOM元素
function _getItemUnready(item) {
  item.classList.remove('ready');
  item.removeAttribute(OFFSET);
  item.style.webkitTransitionDuration = '0';
  item.style.webkitTransform = 'none';
}
/* eslint-enable no-param-reassign */

exports.default = {
  prefixClass: prefixClass,
  _getItemUnready: _getItemUnready
};
module.exports = exports['default'];