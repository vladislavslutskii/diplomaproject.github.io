import React, { useEffect } from "react";

import styles from "./PostContent.module.scss";
import Post from "../../Components/Post";
import { POST_MOCK } from "../../App";

const PostContent = () => {
  return <Post post={POST_MOCK[0]}></Post>;
};
export default PostContent;
