'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = find;
exports.joinArray = joinArray;
exports.findTree = findTree;
exports.clearChildren = clearChildren;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function find(ds, value) {
  var item = null;
  ds.some(function (i) {
    if (i.value === value) {
      item = i;
      return true;
    }
  });
  return item;
}

function joinArray(arr) {
  return Array.prototype.concat.apply([], arr.filter(function (t) {
    return !!t;
  }));
}

function findTree(data, target) {
  if (!data || !data.length) {
    return null;
  } else {
    var result = find(data, target);
    if (!result) {
      if (data.some(function (child) {
        result = findTree(child.children, target);
        if (result) {
          result = [child].concat(result);
        }
        return !!result;
      })) {
        return result;
      }
    } else {
      return [result];
    }
  }
}

/**
 * 删除省节点下所有的子节点
 *
 * @param {any} [data=[]]
 * @returns
 */
function removeChildren() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var ds = (0, _cloneDeep2.default)(data);
  ds.forEach(function (item) {
    if (item.children) delete item.children;
  });
  return ds;
}

/**
 * 删除市节点下所有的子节点
 *
 * @param {any} [data=[]]
 * @returns
 */
function removeChildrenL2() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var ds = (0, _cloneDeep2.default)(data);
  ds.forEach(function (item) {
    if (item.children) {
      item.children.forEach(function (subItem) {
        if (subItem.children) {
          delete subItem.children;
        }
      });
    }
  });
  return ds;
}

function clearChildren(data, type) {
  if (type === 'province') return removeChildren(data);
  if (type === 'city') return removeChildrenL2(data);
  return data;
}