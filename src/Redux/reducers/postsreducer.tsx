import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardListType } from "../../Utils";

type PostStateType = {
  cardsList: CardListType | [];
  isPostsLoading: boolean;
};

const INITIAL_STATE: PostStateType = {
  cardsList: [],
  isPostsLoading: false,
};

const postsReducer = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    getPosts: (state, action: PayloadAction<undefined>) => {},
    setCardsList: (state, action: PayloadAction<CardListType>) => {
      state.cardsList = action.payload.map((card) => {
        return {
          ...card,
        };
      });
    },
    setPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostsLoading = action.payload;
    },
  },
});

export default postsReducer.reducer;

export const { getPosts, setCardsList, setPostsLoading } = postsReducer.actions;
