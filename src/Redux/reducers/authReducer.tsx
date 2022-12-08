import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthUserPayload,
  setUserPayload,
  UserActionPayload,
} from "../../Utils";

type AuthStateType = {
  user: UserActionPayload | null;
};

const INITIAL_STATE: AuthStateType = {
  user: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    createNewUser: (state, action: PayloadAction<UserActionPayload>) => {
      state.user = action.payload;
    },
  },
});

export default authReducer.reducer;

export const { createNewUser } = authReducer.actions;
