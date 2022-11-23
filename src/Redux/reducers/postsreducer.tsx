import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardListType, CardPostType } from "../../Utils";

type PostStateType = {
  cardsList: CardListType | [];
  isPostsLoading: boolean;
  singlePost: CardPostType | null;
  isPostLoading: boolean;
};

const INITIAL_STATE: PostStateType = {
  cardsList: [],
  isPostsLoading: false,
  singlePost: null,
  isPostLoading: false,
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
    getSinglePost: (state, action: PayloadAction<string>) => {},
    setSinglePost: (state, action: PayloadAction<CardPostType>) => {
      state.singlePost = action.payload;
    },
    setSinglePostLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostLoading = action.payload;
    },
  },
});

export default postsReducer.reducer;

export const {
  getPosts,
  setCardsList,
  setPostsLoading,
  getSinglePost,
  setSinglePost,
  setSinglePostLoading,
} = postsReducer.actions;
