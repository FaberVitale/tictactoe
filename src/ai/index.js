import logicRunner from "./logicRunner";
import { turnZeroLogic, takeIfEmpty, lineLogic } from "./logicSteps";
import { gameMode } from "../constants";

const aiProfiles = {
  [gameMode.PVAI_EASY]: logicRunner(turnZeroLogic.takeRandomCell, [
    takeIfEmpty.side,
    takeIfEmpty.center,
    takeIfEmpty.edge
  ]),
  [gameMode.PVAI_MEDIUM]: logicRunner(turnZeroLogic.takeCenterOrEdges, [
    lineLogic.twoInLine,
    takeIfEmpty.center,
    takeIfEmpty.edge,
    takeIfEmpty.side
  ]),
  [gameMode.PVAI_UNFAIR]: logicRunner(turnZeroLogic.takeCenterOrEdges, [
    lineLogic.twoInLine,
    lineLogic.fork,
    takeIfEmpty.center,
    takeIfEmpty.edge,
    takeIfEmpty.side
  ])
};

export const aiMove = (board, turn, ai, difficulty) => {
  return aiProfiles[gameMode[difficulty]](board, turn, ai);
};
