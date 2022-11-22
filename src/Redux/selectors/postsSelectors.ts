export default {
  getCardsList: (state: any) => state.postsReducer.cardsList,
  getPostsLoading: (state: any) => state.postsReducer.isPostsLoading,
};
