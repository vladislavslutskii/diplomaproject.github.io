import { combineReducers } from "@reduxjs/toolkit";

import themeReducer from "./themeReducer";
import postsReducer from "./postsreducer";

const reducer = combineReducers({
  themeReducer,
  postsReducer,
});

export default reducer;
