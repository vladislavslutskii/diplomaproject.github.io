export default {
  getCardsList: (state: any) => state.postsReducer.cardsList,
  getPostsLoading: (state: any) => state.postsReducer.isPostsLoading,
  getSinglePostLoading: (state: any) => state.postsReducer.isPostLoading,
  getSinglePost: (state: any) => state.postsReducer.singlePost,
};
