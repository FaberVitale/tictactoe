import { createSelector } from "reselect";
import { symb, gameMode } from "../constants";
import { winnerLine } from "../util/boardUtil";
import { countNot } from "../util/stringUtil";

/* -- simple selectors -- */
export const getBoard = state => state.game.present;

export const getModalState = state => state.isModalOpen;

export const getRow =
  ind => state => state.game.present.slice(3 * ind, 3 * ind + 3);

export const isCellEmpty = state => ind => getBoard(state)[ind] === symb.empty;

export const isPVP = state => state.gameMode === "PVP";

export const shouldAiAct = state => !(isPVP(state) || isGameOver(state));

export const canPlayerPlaceSymb = state =>
  (isPVP(state) || getNextPlayer(state) === symb.x) && !isGameOver(state);

export const getGameModeVal = state => gameMode[getGameModeKey(state)];
export const getGameModeKey = state => state.gameMode;
export const getGameModeIndex = state =>
  Object.keys(gameMode).indexOf(getGameModeKey(state));

/* -- reselect selectors -- */
export const getCol = [
  createSelector(getBoard, (board) => `${board[0]}${board[3]}${board[6]}`),
  createSelector(getBoard, (board) => `${board[1]}${board[4]}${board[7]}`),
  createSelector(getBoard, (board) => `${board[2]}${board[5]}${board[8]}`),
];

export const getMainDiag = createSelector(
  getBoard,
  (board) => `${board[0]}${board[4]}${board[8]}`
);

export const getAntiDiag = createSelector(
  getBoard,
  (board) => `${board[2]}${board[4]}${board[6]}`
);

export const getTurn = createSelector(
  getBoard,
  countNot(symb.empty)
);

export const getNextPlayer = createSelector(
  getTurn,
  (turn) => turn % 2 === 0 ? symb.x : symb.o
);

export const getWinnerLine = createSelector(
  getMainDiag,
  getAntiDiag,
  getRow(0),
  getRow(1),
  getRow(2),
  ...getCol,
  winnerLine
);

export const isGameOver = createSelector(
  getWinnerLine,
  getTurn,
  (winLine, turn) => winLine !== -1 || turn > 8
);
