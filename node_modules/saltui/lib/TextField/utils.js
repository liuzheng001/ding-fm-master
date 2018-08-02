"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function renderRight(addons) {
  if (addons.right) {
    return addons.right;
  }
  if (addons.count) {
    return addons.count;
  }
  return null;
}
function renderLeft(addons) {
  if (addons.left) {
    return addons.left;
  }
  return null;
}
exports.renderRight = renderRight;
exports.renderLeft = renderLeft;