import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

// if state is ever undefined it will fall back to INITIAL_STATE as a default value
// a switch statement; has case statement and a default value
//if the case statement condition is met, it will render the code following
// else it will render a default
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
