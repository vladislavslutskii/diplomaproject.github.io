import { combineReducers } from "@reduxjs/toolkit";

import themeReducer from "./themeReducer";
import postsReducer from "./postsreducer";
import authReducer from "./authReducer";

const reducer = combineReducers({
  themeReducer,
  postsReducer,
  authReducer,
});

export default reducer;
