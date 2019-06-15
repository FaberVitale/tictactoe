import { OPEN_MODAL, CLOSE_MODAL } from '../constants/actions';

const initState = false;

export default (state = initState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return true;
    case CLOSE_MODAL:
      return false;
    default:
      return state;
  }
};
