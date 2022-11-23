import { create } from "apisauce";

const API = create({
  baseURL: "https://api.spaceflightnewsapi.net/",
});

const getPostsList = () => {
  return API.get("/v3/articles", { _limit: 12 });
};

const getPost = (id: string) => {
  return API.get(`/v3/articles/${id}`);
};

export default {
  getPostsList,
  getPost,
};
