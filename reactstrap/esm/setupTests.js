"use strict";

var _enzyme = _interopRequireDefault(require("enzyme"));
var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* global jest */

_enzyme["default"].configure({
  adapter: new _enzymeAdapterReact["default"]()
});
global.requestAnimationFrame = function (cb) {
  cb(0);
};
global.window.cancelAnimationFrame = function () {};
global.createSpyObj = function (baseName, methodNames) {
  var obj = {};
  for (var i = 0; i < methodNames.length; i += 1) {
    obj[methodNames[i]] = jest.fn();
  }
  return obj;
};
global.document.createRange = function () {
  return {
    setStart: function setStart() {},
    setEnd: function setEnd() {},
    commonAncestorContainer: {}
  };
};