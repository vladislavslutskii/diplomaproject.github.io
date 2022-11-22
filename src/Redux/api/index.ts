import { create } from "apisauce";

const API = create({
  baseURL: "https://api.spaceflightnewsapi.net/",
});

const getPostsList = () => {
  return API.get("/v3/articles", { _limit: 12 });
};

export default {
  getPostsList,
};
