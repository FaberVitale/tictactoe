import { getEmptyCellIndex, getCellThatCreatesFork } from '../util/boardUtil';
import { symb, forkSpecialCases, opposingEdges } from '../constants';

export const lineLogic = {
  twoInLine: (board, boardInfo, ai, other, turn) => {
    if (turn < 3) {
      return -1;
    }
    //twoInLine ai
    if (boardInfo.lines[ai].double.length > 0) {
      return getEmptyCellIndex(board, boardInfo.lines[ai].double[0]);
    }

    //twoinLine other
    if (boardInfo.lines[other].double.length > 0) {
      return getEmptyCellIndex(board, boardInfo.lines[other].double[0]);
    }
    return -1;
  },

  fork: (board, boardInfo, ai, other, turn) => {
    if (turn < 3) {
      return -1;
    }

    if (boardInfo.lines[ai].single.length > 1) {
      const [a, b] = boardInfo.lines[ai].single;
      let possibleForkInd = -1;

      if (boardInfo.lines[ai].single.length > 2) {
        const c = boardInfo.lines[ai].single[2];
        possibleForkInd = getCellThatCreatesFork(board, b, c);

        if (possibleForkInd < 0) {
          possibleForkInd = getCellThatCreatesFork(board, a, c);
        }
      }
      if (possibleForkInd < 0) {
        possibleForkInd = getCellThatCreatesFork(board, a, b);
      }

      if (possibleForkInd > 0) {
        return possibleForkInd;
      }
    }

    //fork other
    if (boardInfo.lines[other].single.length > 1) {
      const [a, b] = boardInfo.lines[other].single;
      let possibleForkInd = getCellThatCreatesFork(board, a, b);

      if (boardInfo.lines[other].single.length > 2 && possibleForkInd < 0) {
        const c = boardInfo.lines[other].single[2];
        possibleForkInd = getCellThatCreatesFork(board, b, c);

        if (possibleForkInd < 0) {
          possibleForkInd = getCellThatCreatesFork(board, a, c);
        }
      }

      if (possibleForkInd >= 0) {
        //check if it is a special case
        if (forkSpecialCases.filter(fBoard => fBoard === board).length > 0) {
          return boardInfo.sides[symb.empty][0];
        } else {
          //place the symb on the forking cell
          return possibleForkInd;
        }
      }
    }
    return -1;
  },
};

export const takeIfEmpty = {
  center: board => (board[4] === symb.empty ? 4 : -1),

  edge: (board, boardInfo, ai, other, turn) => {
    //take opposite edge of an opponent if empty
    for (let corner of boardInfo.corners[other]) {
      const opposite = opposingEdges[corner];
      if (board[opposite] === symb.empty) {
        return opposite;
      }
    }
    //take 1st empty edge
    if (boardInfo.corners[symb.empty].length > 0) {
      return boardInfo.corners[symb.empty][0];
    }
    return -1;
  },

  side: (board, boardInfo, ai, other, turn) => {
    if (boardInfo.sides[symb.empty].length > 0) {
      return boardInfo.sides[symb.empty][0];
    }
    return -1;
  },
};

export const turnZeroLogic = {
  takeCenterOrEdges: () => (Math.random() * 5) << 1,
  takeRandomCell: () => (Math.random * 9) >>> 0,
};
