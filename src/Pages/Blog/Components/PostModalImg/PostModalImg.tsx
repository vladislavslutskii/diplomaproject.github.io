import React from "react";
import styles from "./PostModalImg.module.scss";

import classnames from "classnames";
import PostsSelectors from "../../../../Redux/selectors/postsSelectors";
import ModalWindow from "../../../../Components/ModalWindow/ModalWindow";
import {
  setPostModalImgVisible,
  setSelectedPost,
} from "../../../../Redux/reducers/postsreducer";
import { useDispatch, useSelector } from "react-redux";
import {
  Theme,
  useThemeContext,
} from "../../../../Context/ThemeContext/Context";

const PostModalImg = () => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const post = useSelector(PostsSelectors.getSelectedPost);
  const isVisible = useSelector(PostsSelectors.getIsModalImgVisible);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setPostModalImgVisible(!isVisible));
    dispatch(setSelectedPost(null));
  };

  return post ? (
    <ModalWindow active={isVisible} closeModal={onClose}>
      <img
        className={classnames(styles.modalImg, {
          [styles.modalImg__Dark]: isDarkTheme,
        })}
        src={post.imageUrl}
        alt=""
      />
    </ModalWindow>
  ) : null;
};
export default PostModalImg;
