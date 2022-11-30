import React, { FC } from "react";

import styles from "./SearchList.module.scss";
import classNames from "classnames";

import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import Card from "../Card";
import { CardListType } from "../../Utils";
import EmptyState from "../EmptyState";

type SearchListProps = {
  searchedPosts: CardListType;
};

const SearchList: FC<SearchListProps> = ({ searchedPosts }) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  return searchedPosts && searchedPosts.length > 0 ? (
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
        {searchedPosts.map((post, id) => {
          return <Card post={post} key={post.id} />;
        })}
      </div>
    </div>
  ) : (
    <EmptyState></EmptyState>
  );
};

export default SearchList;
