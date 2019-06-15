/* symb values should be single characters part of Unicode BMP.
 * if character outside BMP are used, it should be added another object
 *  that maps symb keys to the characters to display in the BoardCells
 */
export const symb = {
  x: "✗", //\u2717
  o: "O",
  empty: " " //\u0020 a simple white space
};

export const symbToA11y = {
  [symb.x]: "X",
  [symb.o]: "O",
  [symb.empty]: "empty"
};

export const symbScore = {
  [symb.x]: 10,
  [symb.o]: -1,
  [symb.empty]: 0
};

export const gameMode = {
  PVAI_EASY: "easy",
  PVAI_MEDIUM: "medium",
  PVAI_UNFAIR: "unfair",
  PVP: "pvp"
};

export const gameModeValues = Object.keys(gameMode).map(function value(key) {
  return gameMode[key];
});

export const gameModeInv = {
  easy: "PVAI_EASY",
  medium: "PVAI_MEDIUM",
  unfair: "PVAI_UNFAIR",
  pvp: "PVP"
};

export const mediaQueryWidth = "(min-width: 769px)";

export const cellAriaLabel = [
  "cell 1,1",
  "cell 1,2",
  "cell 1,3",
  "cell 2,1",
  "cell 2,2",
  "cell 2,3",
  "cell 3,1",
  "cell 3,2",
  "cell 3,3"
];

export const rootId = "root";

export const throttleTime = 150;

/* board constants*/

export const opposingEdges = {
  "0": 8,
  "8": 0,
  "2": 6,
  "6": 2
};

export const lines = [
  [0, 4, 8],
  [2, 4, 6],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

export const forkSpecialCases = [
  [
    symb.x,
    symb.empty,
    symb.empty,
    symb.empty,
    symb.o,
    symb.empty,
    symb.empty,
    symb.empty,
    symb.x
  ].join(""),
  [
    symb.empty,
    symb.empty,
    symb.x,
    symb.empty,
    symb.o,
    symb.empty,
    symb.x,
    symb.empty,
    symb.empty
  ].join("")
];

export const sides = [1, 5, 7, 4];

export const edges = [0, 2, 8, 6];
