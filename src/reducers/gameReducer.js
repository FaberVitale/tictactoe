import { symb } from "../constants";
import { PLACE_SIGN, PLACE_SIGN_AI } from "../constants/actions";
import { setIn } from "../util/stringUtil";

const initState = `${new Array(9).fill(symb.empty).join("")}`;

export default (state = initState, action) => {
  if (action.type === PLACE_SIGN || action.type === PLACE_SIGN_AI) {
    return setIn(state, action.payload.pos, action.payload.symb);
  }
  return state;
};