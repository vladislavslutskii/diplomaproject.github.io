import React, { useEffect } from "react";

import styles from "./PostContent.module.scss";
import Post from "../../Components/Post";
import { POST_MOCK } from "../../App";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import {
  getSingleBlogPost,
  getSinglePost,
} from "../../Redux/reducers/postsreducer";
import Lottie from "lottie-react";
import animation from "../../lotties/transfer.json";
import { TabsNames } from "../../Utils";

const PostContent = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const post = useSelector(PostsSelectors.getSinglePost);

  const isLoading = useSelector(PostsSelectors.getSinglePostLoading);
  const activeTab = useSelector(PostsSelectors.getActiveTab);

  const { id } = params;

  useEffect(() => {
    if (id) {
      dispatch(
        activeTab === TabsNames.News ? getSingleBlogPost(id) : getSinglePost(id)
      );
    }
  }, [id]);
  console.log(post);

  return !isLoading && post ? (
    <Post post={post} />
  ) : (
    <div className={styles.lottie_container}>
      <Lottie
        className={styles.lottie_container_animation}
        animationData={animation}
        loop={true}
      ></Lottie>
    </div>
  );
};
export default PostContent;
