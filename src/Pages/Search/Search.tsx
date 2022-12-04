import classNames from "classnames";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Paginate from "../../Components/Paginate";
import SearchList from "../../Components/SearchList";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import styles from "./Search.module.scss";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import { PathNames } from "../Router";

type LocationState = {
  searchElement: string;
};

const Search = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const location = useLocation();
  const navigate = useNavigate();

  const { searchElement } = location.state as LocationState;

  const searchedPosts = useSelector(PostsSelectors.getSearchedPosts);
  const isSearchPostsLoading = useSelector(
    PostsSelectors.getSearchedPostsLoading
  );

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
            <Paginate pagesCount={`16`}></Paginate>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
