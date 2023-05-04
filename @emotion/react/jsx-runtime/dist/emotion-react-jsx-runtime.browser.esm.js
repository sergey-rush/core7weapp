import 'react';
import '@emotion/cache';
import { h as hasOwnProperty, E as Emotion, c as createEmotionProps } from '../../dist/emotion-element-6a883da9.browser.esm.js';
import '@babel/runtime/helpers/extends';
import '@emotion/weak-memoize';
import 'hoist-non-react-statics';
import '../../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js';
import '@emotion/utils';
import '@emotion/serialize';
import '@emotion/use-insertion-effect-with-fallbacks';
import { Fragment as Fragment$1, jsx as jsx$1, jsxs as jsxs$1 } from 'react/jsx-runtime';

var Fragment = Fragment$1;
function jsx(type, props, key) {
  if (!hasOwnProperty.call(props, 'css')) {
    return jsx$1(type, props, key);
  }

  return jsx$1(Emotion, createEmotionProps(type, props), key);
}
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, 'css')) {
    return jsxs$1(type, props, key);
  }

  return jsxs$1(Emotion, createEmotionProps(type, props), key);
}

export { Fragment, jsx, jsxs };
