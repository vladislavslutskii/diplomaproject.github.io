export enum TabsNames {
  All = "Articles",
  Favorites = "News",
}
export enum SortOrder {
  TitleAToZ = "a-z",
  TitleZtoA = "z-a",
}
export type CardPostType = {
  id: number;
  imageUrl: string;
  summary: string;
  publishedAt: string;
  title: string;
};

export type CardListType = Array<CardPostType>;
