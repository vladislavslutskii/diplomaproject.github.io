import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CardListType,
  CardPostType,
  GetPostsPayload,
  SearchPostsPayload,
  SetSearchedPostsPayload,
  TabsNames,
} from "../../Utils";

type PostStateType = {
  cardsList: CardListType | [];
  isPostsLoading: boolean;
  singlePost: CardPostType | null;
  isPostLoading: boolean;
  cardsCount: number;
  isSearchPostsLoading: boolean;
  searchedPostsCount: number;
  searchedPosts: CardListType;
  activeTab: TabsNames;
};

const INITIAL_STATE: PostStateType = {
  cardsList: [],
  isPostsLoading: false,
  singlePost: null,
  isPostLoading: false,
  cardsCount: 0,
  isSearchPostsLoading: false,
  searchedPostsCount: 0,
  searchedPosts: [],
  activeTab: TabsNames.Articles,
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
    getBlogPosts: (state, action: PayloadAction<GetPostsPayload>) => {},
    getBlogPostsCount: (state, action: PayloadAction<undefined>) => {},

    //   state.cardsCount = action.payload;
    // },
    // setBlogCardsList: (state, action: PayloadAction<CardListType>) => {
    //   state.cardsList = action.payload.map((card) => {
    //     return {
    //       ...card,
    //     };
    //   });
    // },
    // setBlogPostsLoading: (state, action: PayloadAction<boolean>) => {
    //   state.isPostsLoading = action.payload;
    // },

    getSinglePost: (state, action: PayloadAction<string>) => {},
    setSinglePost: (state, action: PayloadAction<CardPostType>) => {
      state.singlePost = action.payload;
    },
    setSinglePostLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostLoading = action.payload;
    },
    getSingleBlogPost: (state, action: PayloadAction<string>) => {},

    searchForPosts: (state, action: PayloadAction<SearchPostsPayload>) => {
      // !! state.searchString = action.payload; для по буквенного поиска
    },
    setSearchPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.isSearchPostsLoading = action.payload;
    },
    setSearchedPosts: (
      state,
      action: PayloadAction<SetSearchedPostsPayload>
    ) => {
      const { isOverwrite, data } = action.payload;
      if (isOverwrite) {
        state.searchedPosts = data;
      } else {
        state.searchedPosts.push(...data);
      }
    },
    setSearchedPostsCount: (state, action: PayloadAction<number>) => {
      state.searchedPostsCount = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<TabsNames>) => {
      state.activeTab = action.payload;
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
  getPostsCount,
  setCardsCount,
  searchForPosts,
  setSearchPostsLoading,
  setSearchedPosts,
  setSearchedPostsCount,
  setActiveTab,
  getBlogPosts,
  getBlogPostsCount,
  getSingleBlogPost,
} = postsReducer.actions;
