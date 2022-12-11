import React, { useEffect } from "react";
import styles from "./PostContent.module.scss";

import Post from "../../Components/Post";
import {
  getSingleBlogPost,
  getSinglePost,
} from "../../Redux/reducers/postsreducer";
import RecomendPostsList from "../../Components/RecomendedPostsList";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import Lottie from "lottie-react";
import animation from "../../lotties/transfer.json";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TabsNames } from "../../Utils";

const PostContent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const post = useSelector(PostsSelectors.getSinglePost);
  const cardsList = useSelector(PostsSelectors.getCardsList);
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

  return !isLoading && post ? (
    <>
      <Post post={post} />
      <RecomendPostsList cardList={cardsList} />
    </>
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
