import { CHANGE_GAME_MODE } from "../constants/actions";
const initState = "PVAI_MEDIUM";

export default (state = initState, action) => {
  if (action.type === CHANGE_GAME_MODE) {
    return action.payload;
  }
  return state;
}