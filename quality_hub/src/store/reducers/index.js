import { combineReducers } from "redux";
// import your reducers here

const appReducer = combineReducers({
  // add your reducers here
});

const rootReducer = (state, action) => {
  //clears state on logout
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
