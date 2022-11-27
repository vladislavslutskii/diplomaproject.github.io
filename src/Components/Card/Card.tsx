import React, { FC } from "react";
import styles from "./Card.module.scss";
import { CardPostProps } from "./types";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";

const Card: FC<CardPostProps> = ({ post }) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const { imageUrl, summary, title, publishedAt, id } = post;
  const navigate = useNavigate();

  const onNavigateToPost = () => {
    navigate(`/content/${id}`);
  };

  function convertDate(publishedAt: string | number | Date) {
    const data = new Date(publishedAt);
    return data.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  console.log(convertDate(publishedAt));
  return (
    <div
      className={classNames(styles.cardWrap, {
        [styles.cardWrap_Dark]: isDarkTheme,
      })}
      onClick={onNavigateToPost}
    >
      <div className={styles.cardWrap_imgWrap}>
        <img className={styles.cardWrap_imgWrap_img} src={imageUrl} alt="#" />
      </div>
      <div
        className={classNames(styles.cardWrap_textWrap, {
          [styles.cardWrap_textWrap_Dark]: isDarkTheme,
        })}
      >
        <div
          className={classNames(styles.cardWrap_textWrap_dateText, {
            [styles.cardWrap_textWrap_dateText_Dark]: isDarkTheme,
          })}
        >
          {convertDate(publishedAt)}
        </div>
        <div
          className={classNames(styles.cardWrap_textWrap_titleText, {
            [styles.cardWrap_textWrap_titleText_Dark]: isDarkTheme,
          })}
        >
          {title.length > 67 ? title.substr(0, 67) + "..." : title}
        </div>
      </div>
    </div>
  );
};
export default Card;
