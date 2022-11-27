import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardListType, CardPostType, GetPostsPayload } from "../../Utils";

type PostStateType = {
  cardsList: CardListType | [];
  isPostsLoading: boolean;
  singlePost: CardPostType | null;
  isPostLoading: boolean;
  cardsCount: number;
};

const INITIAL_STATE: PostStateType = {
  cardsList: [],
  isPostsLoading: false,
  singlePost: null,
  isPostLoading: false,
  cardsCount: 0,
};

const postsReducer = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    getPosts: (state, action: PayloadAction<GetPostsPayload>) => {},
    getPostsCount: (state, action: PayloadAction<undefined>) => {},
    setCardsCount: (state, action: PayloadAction<number>) => {
      state.cardsCount = action.payload;
    },
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
    searchForPosts: (state, action: PayloadAction<string>) => {},
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
  getPostsCount,
  setCardsCount,
  searchForPosts,
} = postsReducer.actions;
