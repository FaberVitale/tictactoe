//see http://redux.js.org/docs/recipes/ImplementingUndoHistory.html
import {
  UNDO,
  REDO,
  NEW,
  UNDO_AI,
  REDO_AI,
  CHANGE_GAME_MODE,
} from '../constants/actions';

const UNDO_INIT = '@@UNDOREDO/INIT';

const jumpBack = (past, present, future, times) => {
  if (times === 1) {
    return {
      past: past.slice(0, past.length - 1),
      present: past[past.length - 1],
      future: [present, ...future],
    };
  }
  return {
    past: past.slice(0, past.length - times),
    present: past[past.length - times],
    future: [...past.slice(past.length - times + 1), present, ...future],
  };
};

const jumpForward = (past, present, future, times) => ({
  past: [...past, present, ...future.slice(0, times - 1)],
  present: future[times - 1],
  future: future.slice(times),
});

const advance = (past, present, newPresent) => ({
  past: [...past, present],
  present: newPresent,
  future: [],
});

export default reducer => {
  const initState = {
    past: [],
    present: reducer(undefined, { action: UNDO_INIT }), //the reducer provides the default state
    future: [],
  };

  return (state = initState, action) => {
    const { past, present, future } = state;
    let times;

    switch (action.type) {
      case UNDO:
        if (past.length < 1) {
          return state;
        }

        return jumpBack(past, present, future, 1);

      case REDO:
        if (future.length < 1) {
          return state;
        }

        return jumpForward(past, present, future, 1);

      case NEW:
        return initState;
      case UNDO_AI:
        if (past.length < 2) {
          return state;
        }
        times = past.length % 2 !== 0 ? 1 : 2;

        return jumpBack(past, present, future, times);

      case REDO_AI:
        times = future.length < 2 ? 1 : 2;
        return jumpForward(past, present, future, times);

      case CHANGE_GAME_MODE:
        return initState;
      default:
        const newPresent = reducer(present, action);

        if (newPresent === present) {
          return state;
        }

        return advance(past, present, newPresent);
    }
  };
};
