//UNDO REDO SELECTORS
import { isPVP } from './gameSelectors';

export const canUndo = state =>
  isPVP(state) ? state.game.past.length > 0 : state.game.past.length > 1;

export const canRedo = state =>
  isPVP(state) ? state.game.future.length > 0 : state.game.future.length > 0;

export const isNew = state => !(canUndo(state) || canRedo(state));
