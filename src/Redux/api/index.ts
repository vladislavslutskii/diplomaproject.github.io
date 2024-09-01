import { create } from "apisauce";
import { PER_PAGE } from "../../Utils";

const API = create({
  baseURL: "https://studapi.teachmeskills.by/",
});

const getPostsList = (
  _start: number,
  _sort?: string,
  publishedAt_gt?: string
) => {
  return API.get("/v3/articles", {
    _limit: PER_PAGE,
    _start,
    _sort,
    publishedAt_gt,
  });
};
const getBlogPostList = (
  _start: number,
  _sort?: string,
  publishedAt_gt?: string
) => {
  return API.get("/v3/blogs", {
    _limit: PER_PAGE,
    _start,
    _sort,
    publishedAt_gt,
  });
};
const getPostsCount = () => {
  return API.get("/v3/articles/count");
};
const getBlogPostCount = () => {
  return API.get("/v3/blogs/count");
};

const getPost = (id: string) => {
  return API.get(`/v3/articles/${id}`);
};
const getBlogPost = (id: string) => {
  return API.get(`/v3/blogs/${id}`);
};

const getSearchedPosts = (title_contains: string, _start: number) => {
  return API.get("/v3/articles", { title_contains, _limit: PER_PAGE, _start });
};

const getSearchedBlogPosts = (title_contains: string, _start: number) => {
  return API.get("/v3/blogs", { title_contains, _limit: PER_PAGE, _start });
};

const getPostsByButton = (
  _start: number,
  publishedAt_gt?: string,
  _sort?: string
) => {
  return API.get("/v3/articles", {
    _limit: PER_PAGE,
    _start,
    _sort,
    publishedAt_gt,
  });
};
const getPostBlogListByButton = (
  _start: number,
  publishedAt_gt?: string,
  _sort?: string
) => {
  return API.get("/v3/blogs", {
    _limit: PER_PAGE,
    _start,
    _sort,
    publishedAt_gt,
  });
};

export default {
  getPostsList,
  getPost,
  getPostsCount,
  getSearchedPosts,
  getBlogPostList,
  getBlogPostCount,
  getBlogPost,
  getSearchedBlogPosts,
  getPostsByButton,
  getPostBlogListByButton,
};
