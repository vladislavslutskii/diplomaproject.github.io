export enum TabsNames {
  All = "Articles",
  Favorites = "News",
}
export enum SortOrder {
  Initial = "",
  Title = "title",
  Date = "publishedAt",
}
export type CardPostType = {
  id: number;
  imageUrl: string;
  summary: string;
  publishedAt: string;
  title: string;
};
export type GetPostsPayload = {
  _start: number;
  _sort: string;
};
export type CardListType = Array<CardPostType>;
