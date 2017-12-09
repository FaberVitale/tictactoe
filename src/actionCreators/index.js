import {
  PLACE_SIGN,
  CHANGE_GAME_MODE,
  UNDO,
  UNDO_AI,
  REDO,
  REDO_AI,
  PLACE_SIGN_AI
} from "../constants/actions";
import {
  getNextPlayer,
  getBoard,
  getTurn,
  shouldAiAct,
  canPlayerPlaceSymb,
  getGameModeKey,
  isPVP,
  isGameOver,
  isCellEmpty
} from "../selectors";
import { aiMove } from "../ai";
import { symb, gameModeInv } from "../constants";
import { warn } from "../util/functionUtil";

export const setGameMode = val => (dispatch, getState) => {
  const key = gameModeInv[val];
  if (key && getGameModeKey(getState()) !== key) {
    dispatch({
      type: CHANGE_GAME_MODE,
      payload: key
    });
  }
};

export const undoRedoAction = actionType => (dispatch, getState) => {
  const state = getState();
  if (!canPlayerPlaceSymb(state) && !isGameOver(state)) {
    return;
  }

  if (!isPVP(state)) {
    switch (actionType) {
      case UNDO:
        dispatch({ type: UNDO_AI });
        break;
      case REDO:
        dispatch({ type: REDO_AI });
        break;
      default:
        warn(
          `undoRedoAction recieved an unknown action: ${
            actionType
          }\nit accepts only UNDO, REDO actions`
        );
    }
  } else if (actionType) {
    dispatch({ type: actionType });
  }
};

export const placeSign = pos => (dispatch, getState) => {
  const state = getState();

  const nextPlayer = getNextPlayer(state);

  if (!(canPlayerPlaceSymb(state) && isCellEmpty(state)(pos))) {
    return;
  }

  dispatch({
    type: PLACE_SIGN,
    payload: {
      pos,
      symb: nextPlayer
    }
  });

  const newState = getState();

  if (shouldAiAct(newState)) {
    const aiTimeoutCb = () => {
      const pos = aiMove(
        getBoard(newState),
        getTurn(newState),
        symb.o,
        newState.gameMode
      );

      dispatch({
        type: PLACE_SIGN_AI,
        payload: {
          pos,
          symb: symb.o
        }
      });
    };

    setTimeout(aiTimeoutCb, 100);
  }
};
