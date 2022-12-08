import { FC } from "react";
import styles from "./Card.module.scss";

import classNames from "classnames";
import {
  setPostModalImgVisible,
  setSelectedPost,
} from "../../Redux/reducers/postsreducer";
import { CardPostProps } from "./types";
import { useNavigate } from "react-router-dom";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { useDispatch } from "react-redux";

const Card: FC<CardPostProps> = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const { imageUrl, title, updatedAt, id } = post;

  function convertDate(updatedAt: string | number | Date) {
    const data = new Date(updatedAt);
    return data.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  const onNavigateToPost = () => {
    navigate(`/content/${id}`);
  };

  const onOpenModalImg = () => {
    dispatch(setSelectedPost(post));
    dispatch(setPostModalImgVisible(true));
  };

  return (
    <div
      className={classNames(styles.cardWrap, {
        [styles.cardWrap_Dark]: isDarkTheme,
      })}
    >
      <div className={styles.cardWrap_imgWrap}>
        <img
          className={styles.cardWrap_imgWrap_img}
          onClick={onOpenModalImg}
          src={imageUrl}
          alt="#"
        />
      </div>
      <div
        className={classNames(styles.cardWrap_textWrap, {
          [styles.cardWrap_textWrap_Dark]: isDarkTheme,
        })}
        onClick={onNavigateToPost}
      >
        <div
          className={classNames(styles.cardWrap_textWrap_dateText, {
            [styles.cardWrap_textWrap_dateText_Dark]: isDarkTheme,
          })}
        >
          {convertDate(updatedAt)}
        </div>
        <div
          className={classNames(styles.cardWrap_textWrap_titleText, {
            [styles.cardWrap_textWrap_titleText_Dark]: isDarkTheme,
          })}
          onClick={onNavigateToPost}
        >
          {title.length > 67 ? title.substr(0, 67) + "..." : title}
        </div>
      </div>
    </div>
  );
};
export default Card;
