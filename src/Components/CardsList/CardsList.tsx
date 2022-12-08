import { FC } from "react";
import styles from "./CardsList.module.scss";

import classNames from "classnames";
import Card from "../Card";
import { CardListProps } from "./types";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";

const CardsList: FC<CardListProps> = ({ cardList }) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  return (
    <div
      className={classNames(styles.listWrap, {
        [styles.listWrap_Dark]: isDarkTheme,
      })}
    >
      <div
        className={classNames(styles.listWrap_Card, {
          [styles.listWrap_Card_Dark]: isDarkTheme,
        })}
      >
        {cardList.map((post, id) => {
          if (id >= 0 && id <= 12) {
            return <Card post={post} key={post.id} />;
          }
        })}
      </div>
    </div>
  );
};

export default CardsList;
