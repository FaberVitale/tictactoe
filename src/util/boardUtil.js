import {
  symb,
  lines,
  symbScore,
  sides,
  edges
} from "../constants";

export const winnerLine = (...lines) => {
  for (let i = 0, len = lines.length; i < len; i++) {
    const [cell0, cell1, cell2] = lines[i];

    const isWinLine = cell0 !== symb.empty &&
      cell1 === cell0 &&
      cell2 === cell0;

    if (isWinLine) {
      return i;
    }
  }
  return -1;
};

export const getCellThatCreatesFork = (board, thisInd, thatInd) => {
  const thisLine = lines[thisInd], thatLine = lines[thatInd];

  for (let i = 0; i < 3; i++) {
    const thisCellInd = thisLine[i];

    for (let j = 0; j < 3; j++) {
      const thatCellInd = thatLine[j];
      if (thisCellInd === thatCellInd && board[thisCellInd] === symb.empty) {
        return thisCellInd;
      }
    }
  }
  return -1;
}

export const getCommonEmptyCellIndex = (board, thisLineInd, thatLineInd) => {
  for (let i = 0, len = lines[thisLineInd].length; i < len; i++) {
    const cellInd = lines[thisLineInd][i];
    if (board[cellInd] === symb.empty &&
      lines[thatLineInd].indexOf(cellInd) > -1
    ) {
      return cellInd;
    }
  }
  return -1;
};

export const getEmptyCellIndex = (board, lineIndex) => {
  const line = lines[lineIndex];

  for (let i = 0, len = line.length; i < len; i++) {
    if (board[line[i]] === symb.empty) {
      return line[i];
    }
  }
  return -1;
}

export const getBoardInfo = board => {
  const xSingleScore = symbScore[symb.x], xDoubleScore = 2 * xSingleScore;
  const oSingleScore = symbScore[symb.o], oDoubleScore = 2 * oSingleScore;

  const res = {
    lines: {
      [symb.x]: {
        single: [],
        double: []
      },
      [symb.o]: {
        single: [],
        double: []
      }
    },
    corners: {
      [symb.x]: [],
      [symb.o]: [],
      [symb.empty]: []
    },

    sides: {
      [symb.x]: [],
      [symb.o]: [],
      [symb.empty]: []
    }
  };

  for (let i = 0, len = lines.length; i < len; i++) {
    const score = lines[i].reduce(
      (acc, next) => acc + symbScore[board[next]], 0
    );

    switch (score) {
      case xSingleScore:
        res.lines[symb.x].single.push(i);
        break;
      case xDoubleScore:
        res.lines[symb.x].double.push(i);
        break;
      case oSingleScore:
        res.lines[symb.o].single.push(i)
        break;
      case oDoubleScore:
        res.lines[symb.o].double.push(i);
        break;
      default: // not added to res
    }
  }

  //corners
  for (let i = 0, len = edges.length; i < len; i++) {
    const edge = edges[i];
    res.corners[board[edge]].push(edge);
  }

  //sides
  for (let i = 0, len = sides.length; i < len; i++) {
    const side = sides[i];
    res.sides[board[side]].push(side);
  }

  return res;
};
