"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 把 钉钉api 返回的值转换成 key/label 格式
function transToValue(list) {
  return (list || []).map(function (item) {
    return {
      key: item.emplId,
      label: item.nickNameCn || item.name,
      avatar: item.avatar
    };
  });
}

exports.default = { transToValue: transToValue };
module.exports = exports["default"];