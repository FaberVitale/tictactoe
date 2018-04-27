import { getBoard } from "../selectors";

const noop = () => {};

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

export const warn =
  process.env.NODE_ENV !== "production" &&
  typeof window !== "undefined" &&
  window.console != null &&
  typeof window.console.warn === "function"
    ? window.console.warn
    : noop;
