import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import undoRedo from "./undoRedo";
import gameModeReducer from "./gameModeReducer";
import modalStateReducer from "./modalStateReducer";

export default combineReducers({
  gameMode: gameModeReducer,
  game: undoRedo(gameReducer),
  isModalOpen: modalStateReducer
});