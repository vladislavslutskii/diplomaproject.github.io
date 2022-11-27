export default {
  getCardsList: (state: any) => state.postsReducer.cardsList,
  getPostsLoading: (state: any) => state.postsReducer.isPostsLoading,
  getSinglePostLoading: (state: any) => state.postsReducer.isPostLoading,
  getSinglePost: (state: any) => state.postsReducer.singlePost,
  getCardsCount: (state: any) => state.postsReducer.cardsCount,
  getSearchedPostsLoading: (state: any) =>
    state.postsReducer.isSearchPostsLoading,
  getSearchedPosts: (state: any) => state.postsReducer.searchedPosts,
  getSearchString: (state: any) => state.postsReducer.searchString,
  getSearchedPostsCount: (state: any) => state.postsReducer.searchedPostsCount,
};
