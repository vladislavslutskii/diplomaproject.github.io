import React, { FC } from "react";
import styles from "./Card.module.scss";
import { CardPostProps } from "./types";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const Card: FC<CardPostProps> = ({ post }) => {
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
    <div className={styles.cardWrap} onClick={onNavigateToPost}>
      <div className={styles.cardWrap__imgWrap}>
        <img className={styles.cardWrap__imgWrap__img} src={imageUrl} alt="#" />
      </div>
      <div className={styles.cardWrap__textWrap}>
        <div className={styles.cardWrap__textWrap__dateText}>
          {convertDate(publishedAt)}
        </div>
        <div className={classNames(styles.cardWrap__textWrap__titleText, {})}>
          {title.length > 67 ? title.substr(0, 67) + "..." : title}
        </div>
      </div>
    </div>
  );
};
export default Card;
