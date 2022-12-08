export enum TabsNames {
  Articles = "articles",
  News = "news",
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
  updatedAt: string;
  title: string;
};
export type GetPostsPayload = {
  _start: number;
  _sort?: string;
  publishedAt_gt?: string;
};
export type CardListType = Array<CardPostType>;

export type SearchPostsPayload = {
  title_contains: string;
  _start: number;
  isOverwrite: boolean;
};
export type SetSearchedPostsPayload = {
  data: CardListType;
  isOverwrite: boolean;
};
export enum ButtonSort {
  Day = "day",
  Week = "week",
  Month = "month",
  Year = "year",
}
export type UserActionPayload = {
  username: string;
  password: string;
  email: string;
};

export type AuthUserPayload = {
  email: string;
  password: string;
};
export type setUserPayload = {
  username: string;
  id: number;
  email: string;
};
