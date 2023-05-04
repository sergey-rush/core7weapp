"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _utils = require("./utils");
var _excluded = ["className", "cssModule", "tag"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var propTypes = {
  /** Add custom class */
  className: _propTypes["default"].string,
  /** Change underlying component's CSS base class name */
  cssModule: _propTypes["default"].object,
  /** Set a custom element for this component */
  tag: _utils.tagPropType
};
var defaultProps = {
  tag: 'div'
};
function CardSubtitle(props) {
  var className = props.className,
    cssModule = props.cssModule,
    Tag = props.tag,
    attributes = _objectWithoutProperties(props, _excluded);
  var classes = (0, _utils.mapToCssModules)((0, _classnames["default"])(className, 'card-subtitle'), cssModule);
  return /*#__PURE__*/_react["default"].createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}
CardSubtitle.propTypes = propTypes;
CardSubtitle.defaultProps = defaultProps;
var _default = CardSubtitle;
exports["default"] = _default;