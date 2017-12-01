import symb from "../constants";
import { getBoardInfo } from "../util/boardUtil";


export default (zeroTurnMove, otherMoves = []) =>
  (board, turn, ai) => {
    if (turn === 0) {
      return zeroTurnMove();
    }

    const other = ai === symb.x ? symb.o : symb.x;
    const boardInfo = getBoardInfo(board);
    let move = -1;

    for (let otherMove of otherMoves) {
      move = otherMove(board, boardInfo, ai, other, turn);
      if (move > -1) {
        return move;
      }
    }

    //something went wrong...
    let errMessage = turn >= 9 ?
      "this function shouldn't be called on a filled board" :
      "ai logic error";

    //recovery: try to return an empty cell if present
    const emptyCells = Array.prototype.reduce.call(
      board,
      (aggr, next, index) => aggr > -1 ?
        aggr :
        next === symb.empty ?
          index :
          aggr,
      -1
    );

    if (emptyCells.length > 0) {
      errMessage += "\nrecovery: picked an empty cell";

      move = emptyCells[0];
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn(errMessage);
    }
    return move;
  };