import React, { useEffect } from "react";
import styles from "./Search.module.scss";

import classNames from "classnames";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import Paginate from "../../Components/Paginate";
import SearchList from "../../Components/SearchList";
import { PathNames } from "../Router";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { LocationState } from "./type";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const searchedPosts = useSelector(PostsSelectors.getSearchedPosts);
  const isSearchPostsLoading = useSelector(
    PostsSelectors.getSearchedPostsLoading
  );
  const { searchElement } = location.state as LocationState;

  useEffect(() => {
    if (searchElement.length === 0) {
      navigate(PathNames.Home);
    }
  }, [searchElement]);

  return (
    <div
      className={classNames(styles.Search, {
        [styles.Search_Dark]: isDarkTheme,
      })}
    >
      <div
        className={classNames(styles.Search_container, {
          [styles.Search_container_Dark]: isDarkTheme,
        })}
      >
        <div
          className={classNames(styles.Search_container_titleWrap, {
            [styles.Search_container_titleWrap_Dark]: isDarkTheme,
          })}
        >
          Search results "{searchElement}"
        </div>
        <div className={styles.Search_container_CardsListWrap}>
          <SearchList searchedPosts={searchedPosts}></SearchList>
        </div>

        {!isSearchPostsLoading && !searchedPosts ? (
          <div className={classNames(styles.Search__container__Paginate, {})}>
            <Paginate pagesCount={16}></Paginate>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
