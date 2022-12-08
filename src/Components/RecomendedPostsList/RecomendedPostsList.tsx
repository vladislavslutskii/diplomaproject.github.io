import React, { FC } from "react";
import styles from "./RecomendedPostsList.module.scss";

import classNames from "classnames";
import Card from "../Card";
import { CardListProps } from "./types";

const RecomendPostsList: FC<CardListProps> = ({ cardList }) => {
  return cardList && cardList.length > 0 ? (
    <div className={classNames(styles.listWrapper)}>
      {cardList.map((post, id) => {
        if (id >= 0 && id <= 2) {
          return <Card post={post} key={post.id} />;
        }
      })}
    </div>
  ) : null;
};
export default RecomendPostsList;
