import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { forwardRef } from 'react';
import { S as Select } from '../../dist/Select-54ac8379.esm.js';
import { u as useStateManager } from '../../dist/useStateManager-68425271.esm.js';
import { u as useAsync } from '../../dist/useAsync-9deee0fa.esm.js';
export { u as useAsync } from '../../dist/useAsync-9deee0fa.esm.js';
import '../../dist/index-a7690a33.esm.js';
import '@emotion/react';
import '@babel/runtime/helpers/taggedTemplateLiteral';
import '@babel/runtime/helpers/objectWithoutProperties';
import '@babel/runtime/helpers/slicedToArray';
import '@babel/runtime/helpers/typeof';
import '@babel/runtime/helpers/classCallCheck';
import '@babel/runtime/helpers/createClass';
import '@babel/runtime/helpers/inherits';
import '@babel/runtime/helpers/defineProperty';
import 'react-dom';
import '@babel/runtime/helpers/toConsumableArray';
import 'memoize-one';

var AsyncSelect = /*#__PURE__*/forwardRef(function (props, ref) {
  var stateManagedProps = useAsync(props);
  var selectProps = useStateManager(stateManagedProps);
  return /*#__PURE__*/React.createElement(Select, _extends({
    ref: ref
  }, selectProps));
});

export default AsyncSelect;
