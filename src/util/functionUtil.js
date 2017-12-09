import { getBoard } from "../selectors";

export const throttle = (span, func, thisArg) => {
  let last = 0;
  let context = thisArg || null;
  return function throttler(...args) {
    let now = Date.now();
    if (now - last >= span) {
      last = now;
      return func.apply(context, args);
    }
  };
};

export const $id = id => document.getElementById(id);

export const $disabled = elem => elem.hasAttribute("disabled");

export const defaultMergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps);

export const areBoardsEqual = (next, prev) => getBoard(next) === getBoard(prev);

export const warn = (function() {
  if (process.env.NODE_ENV === "production") {
    return () => {}; //noop
  }
  return console.warn.bind(console);
})();
